import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../contexts/AuthContext'

export function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState<string | null>(null)
  const [carregando, setCarregando] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setErro(null)
    setCarregando(true)
    try {
      await login(email, senha)
      navigate('/')
    } catch {
      setErro('Email ou senha invalidos.')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 rounded-lg border p-6 bg-white shadow-sm w-80">
        <h1 className="text-xl font-bold text-center">iRepair — Login</h1>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required className="rounded border px-3 py-2 text-sm" />
        <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Senha" required className="rounded border px-3 py-2 text-sm" />
        {erro && <p className="text-red-500 text-sm">{erro}</p>}
        <button type="submit" disabled={carregando} className="rounded bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-50">
          {carregando ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  )
}
