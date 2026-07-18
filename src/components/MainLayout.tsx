import { Outlet, Link } from 'react-router'
import { Header } from './Header'

export function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-100">
      <Header />
      <nav className="flex gap-4 bg-slate-700 px-6 py-2 text-sm text-white">
        <Link to="/" className="hover:underline">Dashboard</Link>
        <Link to="/clients" className="hover:underline">Clientes</Link>
        <Link to="/service-orders" className="hover:underline">Ordens de Serviço</Link>
      </nav>
      <main className="p-6 max-w-4xl mx-auto">
        <Outlet />
      </main>
    </div>
  )
}