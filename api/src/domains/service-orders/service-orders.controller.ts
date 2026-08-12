import type { Request, Response } from 'express'
import { ServiceOrdersService } from './service-orders.service'

const service = new ServiceOrdersService()

export class ServiceOrdersController {
  async list(req: Request, res: Response) {
    const orders = await service.getAll()
    return res.status(200).json(orders)
  }

  async findById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      const order = await service.getById(id)
      return res.status(200).json(order)
    } catch (error: any) {
      return res.status(error.statusCode || 404).json({ erro: error.message })
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { clientId, device, issue } = req.body
      const order = await service.create({ clientId: Number(clientId), device, issue })
      return res.status(201).json(order)
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
