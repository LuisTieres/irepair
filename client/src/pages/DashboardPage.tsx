import { useEffect, useState } from 'react'
import { getAllServiceOrders } from '../services/serviceOrderService'
import { getAllClients } from '../services/clientService'
import { ServiceCard } from '../components/ServiceCard'
import type { ServiceOrder, Client } from '../types'

export function DashboardPage() {
  const [orders, setOrders] = useState<ServiceOrder[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
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
        setError('Não foi possível carregar o dashboard.')
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  function getClientName(id: number): string {
    const client = clients.find((c) => c.id === id)
    return client ? client.name : 'Cliente desconhecido'
  }

  if (isLoading) return <p>Carregando dashboard...</p>
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-slate-800">
        Ordens de Serviço ({orders.length})
      </h2>

      {orders.length === 0 ? (
        <p className="text-sm text-slate-500">Nenhuma ordem de serviço cadastrada ainda.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {orders.map((order) => (
            <ServiceCard
              key={order.id}
              order={order}
              clientName={getClientName(order.clientId)}
            />
          ))}
        </div>
      )}
    </div>
  )
}