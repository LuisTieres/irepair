import { api } from './api'
import type { ServiceOrder, CreateServiceOrderData } from '../types'

export async function getAllServiceOrders(): Promise<ServiceOrder[]> {
  const response = await api.get<ServiceOrder[]>('/service-orders')
  return response.data
}

export async function createServiceOrder(data: CreateServiceOrderData): Promise<ServiceOrder> {
  const response = await api.post<ServiceOrder>('/service-orders', data)
  return response.data
}

export async function deleteServiceOrder(id: number): Promise<void> {
  await api.delete(`/service-orders/${id}`)
}