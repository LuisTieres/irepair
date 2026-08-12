# Script de teste do fluxo completo - iRepair API (Semana 9)
# Rode com o backend ja ativo (npm run dev dentro de /api)

$baseUrl = "http://localhost:3333"
$email = "smoketest@irepair.com"
$senha = "senha123"

function Test-Step($nome, $bloco) {
    Write-Host "`n--- $nome ---" -ForegroundColor Cyan
    try {
        & $bloco
        Write-Host "OK" -ForegroundColor Green
    } catch {
        Write-Host "FALHOU: $($_.Exception.Message)" -ForegroundColor Red
        if ($_.ErrorDetails.Message) {
            Write-Host $_.ErrorDetails.Message -ForegroundColor Yellow
        }
    }
}

# 1. Rota protegida sem login deve dar 401
Test-Step "1. GET /clients sem login (espera 401)" {
    try {
        Invoke-RestMethod -Uri "$baseUrl/clients" -Method GET
        throw "Deveria ter dado 401, mas nao deu erro"
    } catch [Microsoft.PowerShell.Commands.HttpResponseException] {
        if ($_.Exception.Response.StatusCode -eq 401) {
            Write-Host "Bloqueado corretamente (401)"
        } else {
            throw
        }
    }
}

# 2. Register (pode falhar se o usuario ja existir - tudo bem, seguimos)
Test-Step "2. POST /auth/register" {
    try {
        $result = Invoke-RestMethod -Uri "$baseUrl/auth/register" -Method POST -ContentType "application/json" -Body (@{ email = $email; senha = $senha } | ConvertTo-Json)
        Write-Host "Usuario criado: $($result.email)"
    } catch {
        Write-Host "Usuario provavelmente ja existe, seguindo para login"
    }
}

# 3. Login
$session = $null
Test-Step "3. POST /auth/login" {
    $result = Invoke-RestMethod -Uri "$baseUrl/auth/login" -Method POST -ContentType "application/json" -Body (@{ email = $email; senha = $senha } | ConvertTo-Json) -SessionVariable s
    $script:session = $s
    Write-Host "Logado como: $($result.usuario.email)"
}

# 4. GET /auth/me
Test-Step "4. GET /auth/me (com sessao)" {
    $result = Invoke-RestMethod -Uri "$baseUrl/auth/me" -Method GET -WebSession $session
    Write-Host "Sessao valida para: $($result.usuario.email)"
}

# 5. Criar cliente
$clientId = $null
Test-Step "5. POST /clients" {
    $result = Invoke-RestMethod -Uri "$baseUrl/clients" -Method POST -ContentType "application/json" -Body (@{ name = "Cliente Teste"; phone = "11999999999"; email = "cliente@teste.com" } | ConvertTo-Json) -WebSession $session
    $script:clientId = $result.id
    Write-Host "Cliente criado com id: $clientId"
}

# 6. Criar ordem de servico
$orderId = $null
Test-Step "6. POST /service-orders" {
    $result = Invoke-RestMethod -Uri "$baseUrl/service-orders" -Method POST -ContentType "application/json" -Body (@{ clientId = $clientId; device = "iPhone Teste"; issue = "Defeito teste" } | ConvertTo-Json) -WebSession $session
    $script:orderId = $result.id
    Write-Host "OS criada com id: $orderId"
}

# 7. Listar clientes e OS
Test-Step "7. GET /clients e /service-orders" {
    $clients = Invoke-RestMethod -Uri "$baseUrl/clients" -Method GET -WebSession $session
    $orders = Invoke-RestMethod -Uri "$baseUrl/service-orders" -Method GET -WebSession $session
    Write-Host "Total de clientes: $($clients.Count) | Total de OS: $($orders.Count)"
}

# 8. Logout
Test-Step "8. POST /auth/logout" {
    Invoke-RestMethod -Uri "$baseUrl/auth/logout" -Method POST -WebSession $session | Out-Null
    Write-Host "Logout realizado"
}

# 9. Confirmar bloqueio apos logout
Test-Step "9. GET /auth/me apos logout (espera 401)" {
    try {
        Invoke-RestMethod -Uri "$baseUrl/auth/me" -Method GET -WebSession $session
        throw "Deveria ter dado 401, mas nao deu erro"
    } catch [Microsoft.PowerShell.Commands.HttpResponseException] {
        if ($_.Exception.Response.StatusCode -eq 401) {
            Write-Host "Bloqueado corretamente apos logout (401)"
        } else {
            throw
        }
    }
}

Write-Host "`n=== Teste completo ===" -ForegroundColor Cyan
