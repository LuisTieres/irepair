import type { Request, Response } from 'express'
import { ClientsService } from './clients.service'

const service = new ClientsService()

export class ClientsController {
  async list(req: Request, res: Response) {
    const clients = await service.getAll()
    return res.status(200).json(clients)
  }

  async findById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      const client = await service.getById(id)
      return res.status(200).json(client)
    } catch (error: any) {
      return res.status(error.statusCode || 404).json({ erro: error.message })
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { name, phone, email } = req.body
      const client = await service.create({ name, phone, email })
      return res.status(201).json(client)
    } catch (error: any) {
      return res.status(400).json({ erro: error.message })
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      await service.delete(id)
      return res.status(204).send()
    } catch (error: any) {
      return res.status(error.statusCode || 404).json({ erro: error.message })
    }
  }
}
