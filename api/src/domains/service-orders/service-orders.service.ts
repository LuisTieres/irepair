import { prisma } from '../../config/prismaClient'

interface ICriarServiceOrder {
  clientId: number
  device: string
  issue: string
}

export class ServiceOrdersService {
  async getAll() {
    return prisma.serviceOrder.findMany()
  }

  async getById(id: number) {
    const order = await prisma.serviceOrder.findUnique({ where: { id } })
    if (!order) {
      const error: any = new Error('Ordem de servico nao encontrada')
      error.statusCode = 404
      throw error
    }
    return order
  }

  async create(data: ICriarServiceOrder) {
    return prisma.serviceOrder.create({
      data: {
        device: data.device,
        issue: data.issue,
        clientId: data.clientId,
      },
    })
  }

  async delete(id: number) {
    try {
      await prisma.serviceOrder.delete({ where: { id } })
    } catch (error: any) {
      if (error.code === 'P2025') {
        const notFoundError: any = new Error('Ordem de servico nao encontrada')
        notFoundError.statusCode = 404
        throw notFoundError
      }
      throw error
    }
  }
}
