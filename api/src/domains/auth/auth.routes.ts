import { Router } from 'express'
import { AuthController } from './auth.controller'
import { authMiddleware } from '../../middlewares/authMiddleware'

const authRoutes = Router()
const authController = new AuthController()

authRoutes.post('/register', (req, res) => authController.register(req, res))
authRoutes.post('/login', (req, res) => authController.login(req, res))
authRoutes.post('/logout', (req, res) => authController.logout(req, res))
authRoutes.get('/me', authMiddleware, (req, res) => authController.me(req, res))

export { authRoutes }
