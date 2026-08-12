import { useEffect, useState } from 'react'
import { getAllClients, createClient, deleteClient } from '../services/clientService'
import type { Client, CreateClientData } from '../types'

export function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    loadClients()
  }, [])

  async function loadClients() {
    try {
      setIsLoading(true)
      const data = await getAllClients()
      setClients(data)
    } catch (e) {
      setError('Não foi possível carregar os clientes.')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleCreate() {
    if (!name || !phone || !email) return

    const newClient: CreateClientData = { name, phone, email }

    try {
      await createClient(newClient)
      setName('')
      setPhone('')
      setEmail('')
      await loadClients()
    } catch (e) {
      setError('Não foi possível cadastrar o cliente.')
    }
  }

  async function handleDelete(id: number) {
    try {
      await deleteClient(id)
      setClients((prev) => prev.filter((c) => c.id !== id))
    } catch (e) {
      setError('Não foi possível remover o cliente.')
    }
  }

  if (isLoading) return <p>Carregando clientes...</p>
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col gap-3 rounded-lg border p-4 bg-white shadow-sm">
        <h2 className="text-lg font-semibold">Novo Cliente</h2>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 rounded border px-3 py-2 text-sm"
          />
          <input
            type="text"
            placeholder="Telefone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="flex-1 rounded border px-3 py-2 text-sm"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 rounded border px-3 py-2 text-sm"
          />
        </div>
        <button
          onClick={handleCreate}
          className="self-start rounded bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
        >
          Salvar
        </button>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-bold text-slate-800">
          Clientes ({clients.length})
        </h2>
        <ul className="flex flex-col gap-2">
          {clients.map((client) => (
            <li
              key={client.id}
              className="flex items-center justify-between rounded border bg-white px-4 py-2 text-sm"
            >
              <span>
                {client.name} — {client.phone} — {client.email}
              </span>
              <button
                onClick={() => handleDelete(client.id)}
                className="text-red-600 hover:underline"
              >
                Excluir
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}