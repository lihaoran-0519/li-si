import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// 检查数据库连接是否可用
const isDatabaseAvailable = () => {
  return process.env.DATABASE_URL && process.env.DATABASE_URL !== 'postgresql://username:password@localhost:5432/li_si_wedding?schema=public'
}

export const prisma = globalForPrisma.prisma ?? (isDatabaseAvailable() ? new PrismaClient() : undefined)

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
