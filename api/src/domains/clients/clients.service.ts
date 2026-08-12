import { prisma } from '../../config/prismaClient'

interface ICriarCliente {
  name: string
  phone: string
  email: string
}

export class ClientsService {
  async getAll() {
    return prisma.client.findMany()
  }

  async getById(id: number) {
    const client = await prisma.client.findUnique({ where: { id } })
    if (!client) {
      const error: any = new Error('Cliente não encontrado')
      error.statusCode = 404
      throw error
    }
    return client
  }

  async create(data: ICriarCliente) {
    return prisma.client.create({ data })
  }

  async delete(id: number) {
    try {
      await prisma.client.delete({ where: { id } })
    } catch (error: any) {
      if (error.code === 'P2025') {
        const notFoundError: any = new Error('Cliente não encontrado')
        notFoundError.statusCode = 404
        throw notFoundError
      }
      throw error
    }
  }
}
