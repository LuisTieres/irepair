import { Router } from 'express'
import { ServiceOrdersController } from './service-orders.controller'
import { authMiddleware } from '../../middlewares/authMiddleware'

const serviceOrdersRoutes = Router()
const controller = new ServiceOrdersController()

serviceOrdersRoutes.use(authMiddleware)

serviceOrdersRoutes.get('/', (req, res) => controller.list(req, res))
serviceOrdersRoutes.get('/:id', (req, res) => controller.findById(req, res))
serviceOrdersRoutes.post('/', (req, res) => controller.create(req, res))
serviceOrdersRoutes.delete('/:id', (req, res) => controller.delete(req, res))

export { serviceOrdersRoutes }
