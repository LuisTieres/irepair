import { BrowserRouter, Routes, Route } from 'react-router'
import { AuthProvider } from './contexts/AuthContext'
import { PrivateRoute } from './routes/PrivateRoute'
import { Login } from './pages/Login'
import { MainLayout } from './components/MainLayout'
import { DashboardPage } from './pages/DashboardPage'
import { ClientsPage } from './pages/ClientsPage'
import { ServiceOrdersPage } from './pages/ServiceOrdersPage'

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/clients" element={<ClientsPage />} />
              <Route path="/service-orders" element={<ServiceOrdersPage />} />
            </Route>
          </Route>
          <Route path="*" element={<h1>Página não encontrada 💔</h1>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
