import type { User } from '../../generated/prisma/client'

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string
      DATABASE_URL: string
      JWT_SECRET: string
      JWT_EXPIRES_IN: string
    }
  }

  namespace Express {
    interface Request {
      user?: Pick<User, 'id' | 'email'>
    }
  }
}

export {}
