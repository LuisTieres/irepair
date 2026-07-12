import { Header } from './components/Header'
import { ServiceCard } from './components/ServiceCard'
import type { ServiceOrder } from './types/ServiceOrder'

const mockOrder: ServiceOrder = {
  id: '1',
  clientName: 'João Silva',
  deviceModel: 'iPhone 13',
  issue: 'Tela trincada',
  status: 'aberto',
}

export function App() {
  return (
    <div>
      <Header />
      <main className="p-6">
        <ServiceCard order={mockOrder} />
      </main>
    </div>
  )
}

export default App