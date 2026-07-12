export type ServiceStatus = 'aberto' | 'em_andamento' | 'finalizado'

export interface ServiceOrder {
  id: string
  clientName: string
  deviceModel: string
  issue: string
  status: ServiceStatus
}