import { useState } from 'react'
import { Header } from './components/Header'
import { ServiceCard } from './components/ServiceCard'
import { NewServiceForm } from './components/NewServiceForm'
import type { ServiceOrder } from './types/ServiceOrder'

const initialOrders: ServiceOrder[] = [
  {
    id: '1',
    clientName: 'João Silva',
    deviceModel: 'iPhone 13',
    issue: 'Tela trincada',
    status: 'aberto',
  },
  {
    id: '2',
    clientName: 'Maria Souza',
    deviceModel: 'Samsung A54',
    issue: 'Bateria não carrega',
    status: 'em_andamento',
  },
]

export function App() {
  const [orders, setOrders] = useState<ServiceOrder[]>(initialOrders)

  function handleAddOrder(newOrder: ServiceOrder) {
    setOrders((prevOrders) => [...prevOrders, newOrder])
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <Header />

      <main className="flex flex-col gap-6 p-6 max-w-4xl mx-auto">
        <NewServiceForm onAddOrder={handleAddOrder} />

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold text-slate-800">
            Ordens de Serviço ({orders.length})
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {orders.map((order) => (
              <ServiceCard key={order.id} order={order} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App