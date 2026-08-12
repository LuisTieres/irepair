export type ServiceOrderStatus = 'open' | 'in_progress' | 'done'

export interface ServiceOrder {
  id: number
  clientId: number
  device: string
  issue: string
  status: ServiceOrderStatus
  created_at: string
}

export interface CreateServiceOrderData {
  clientId: number
  device: string
  issue: string
  status: ServiceOrderStatus
}