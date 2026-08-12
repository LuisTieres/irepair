import type { Request, Response } from 'express'
import { AuthService } from './auth.service'

const authService = new AuthService()

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { email, senha } = req.body
      const usuario = await authService.register(email, senha)
      return res.status(201).json(usuario)
    } catch (error: any) {
      return res.status(error.statusCode || 400).json({ erro: error.message })
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, senha } = req.body
      const { token, usuario } = await authService.login(email, senha)

      res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 60 * 60 * 1000,
      })

      return res.status(200).json({ usuario })
    } catch (error: any) {
      return res.status(error.statusCode || 401).json({ erro: error.message })
    }
  }

  async logout(req: Request, res: Response) {
    res.clearCookie('token')
    return res.status(200).json({ message: 'Logout realizado com sucesso' })
  }

  async me(req: Request, res: Response) {
    return res.status(200).json({ usuario: req.user })
  }
}
