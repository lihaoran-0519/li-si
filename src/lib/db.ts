import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// 检查数据库连接是否可用
const isDatabaseAvailable = () => {
  // 在构建时，如果没有 DATABASE_URL 或连接字符串无效，返回 false
  if (!process.env.DATABASE_URL) return false
  
  // 检查是否是有效的数据库连接字符串
  const isValidUrl = process.env.DATABASE_URL.startsWith('postgresql://') || 
                     process.env.DATABASE_URL.startsWith('postgres://')
  
  return isValidUrl && 
         process.env.DATABASE_URL !== 'postgresql://username:password@localhost:5432/li_si_wedding?schema=public'
}

// 安全地创建 Prisma 客户端
const createPrismaClient = () => {
  try {
    if (isDatabaseAvailable()) {
      return new PrismaClient()
    }
    return undefined
  } catch (error) {
    console.warn('Failed to create Prisma client:', error)
    return undefined
  }
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
