import { useEffect, useState } from 'react'
import {
  getAllServiceOrders,
  createServiceOrder,
  deleteServiceOrder,
} from '../services/serviceOrderService'
import { getAllClients } from '../services/clientService'
import type { ServiceOrder, CreateServiceOrderData, Client } from '../types'
import axios from 'axios';
export function ServiceOrdersPage() {
  const [orders, setOrders] = useState<ServiceOrder[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [clientId, setClientId] = useState('')
  const [device, setDevice] = useState('')
  const [issue, setIssue] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    try {
      setIsLoading(true)
      const [ordersData, clientsData] = await Promise.all([
        getAllServiceOrders(),
        getAllClients(),
      ])
      setOrders(ordersData)
      setClients(clientsData)
    } catch (e) {
      setError('Não foi possível carregar as ordens de serviço.')
    } finally {
      setIsLoading(false)
    }
  }

  function getClientName(id: number): string {
    const client = clients.find((c) => c.id === id)
    return client ? client.name : 'Cliente desconhecido'
  }

  async function handleCreate() {
    if (!clientId || !device || !issue) return

    const newOrder: CreateServiceOrderData = {
      clientId: Number(clientId),
      device,
      issue,
      status: 'open',
    }

    try {
      await createServiceOrder(newOrder)
      setClientId('')
      setDevice('')
      setIssue('')
      await loadData()
    } catch (e) {
      console.error('Erro ao criar OS:', e)
      if (axios.isAxiosError(e)) {
        console.error('Resposta da API:', e.response?.data)
      }
      setError('Não foi possível cadastrar a ordem de serviço.')
    }
  }

  async function handleDelete(id: number) {
    try {
      await deleteServiceOrder(id)
      setOrders((prev) => prev.filter((o) => o.id !== id))
    } catch (e) {
      setError('Não foi possível remover a ordem de serviço.')
    }
  }

  if (isLoading) return <p>Carregando ordens de serviço...</p>
  if (error) return <p className="text-red-500">{error}</p>

  const statusStyles = {
    open: 'bg-green-100 text-green-800 border-green-400',
    in_progress: 'bg-yellow-100 text-yellow-800 border-yellow-400',
    done: 'bg-gray-200 text-gray-700 border-gray-400',
  }

  const statusLabel = {
    open: 'Aberto',
    in_progress: 'Em andamento',
    done: 'Finalizado',
  }

  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col gap-3 rounded-lg border p-4 bg-white shadow-sm">
        <h2 className="text-lg font-semibold">Nova Ordem de Serviço</h2>

        {clients.length === 0 ? (
          <p className="text-sm text-slate-500">
            Cadastre um cliente antes de criar uma OS.
          </p>
        ) : (
          <div className="flex flex-col gap-2 sm:flex-row">
            <select
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              className="flex-1 rounded border px-3 py-2 text-sm"
            >
              <option value="">Selecione o cliente</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Aparelho"
              value={device}
              onChange={(e) => setDevice(e.target.value)}
              className="flex-1 rounded border px-3 py-2 text-sm"
            />
            <input
              type="text"
              placeholder="Defeito"
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              className="flex-1 rounded border px-3 py-2 text-sm"
            />
          </div>
        )}

        <button
          onClick={handleCreate}
          disabled={clients.length === 0}
          className="self-start rounded bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-50"
        >
          Salvar
        </button>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-slate-800">
          Ordens de Serviço ({orders.length})
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          {orders.map((order) => (
            <article
              key={order.id}
              className="flex flex-col gap-2 rounded-lg border p-4 shadow-sm bg-white"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  {getClientName(order.client_id)}
                </h3>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full border ${statusStyles[order.status]}`}
                >
                  {statusLabel[order.status]}
                </span>
              </div>
              <p className="text-sm text-slate-600">
                <span className="font-medium">Aparelho:</span> {order.device}
              </p>
              <p className="text-sm text-slate-600">
                <span className="font-medium">Defeito:</span> {order.issue}
              </p>
              <button
                onClick={() => handleDelete(order.id)}
                className="self-start text-sm text-red-600 hover:underline"
              >
                Excluir
              </button>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}