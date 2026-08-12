import bcrypt from 'bcrypt'
import { prisma } from '../../config/prismaClient'
import { generateToken } from '../../utils/token'

const SALT_ROUNDS = 10

export class AuthService {
  async register(email: string, senha: string) {
    const usuarioExistente = await prisma.user.findUnique({
      where: { email },
    })

    if (usuarioExistente) {
      const error: any = new Error('Email já cadastrado')
      error.statusCode = 409
      throw error
    }

    const senhaHash = await bcrypt.hash(senha, SALT_ROUNDS)

    const usuario = await prisma.user.create({
      data: { email, senha: senhaHash },
      select: { id: true, email: true },
    })

    return usuario
  }

  async login(email: string, senha: string) {
    const usuario = await prisma.user.findUnique({
      where: { email },
    })

    if (!usuario) {
      const error: any = new Error('Credenciais inválidas')
      error.statusCode = 401
      throw error
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha)

    if (!senhaCorreta) {
      const error: any = new Error('Credenciais inválidas')
      error.statusCode = 401
      throw error
    }

    const token = generateToken({ id: usuario.id, email: usuario.email })

    return { token, usuario: { id: usuario.id, email: usuario.email } }
  }
}
