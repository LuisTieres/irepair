import { Router } from 'express'
import { ClientsController } from './clients.controller'
import { authMiddleware } from '../../middlewares/authMiddleware'

const clientsRoutes = Router()
const controller = new ClientsController()

clientsRoutes.use(authMiddleware)

clientsRoutes.get('/', (req, res) => controller.list(req, res))
clientsRoutes.get('/:id', (req, res) => controller.findById(req, res))
clientsRoutes.post('/', (req, res) => controller.create(req, res))
clientsRoutes.delete('/:id', (req, res) => controller.delete(req, res))

export { clientsRoutes }
