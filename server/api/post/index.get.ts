import { PrismaClient } from '@prisma/client'
import { getServerSession } from '#auth'

// 建議放在這裡減少連線數
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)

  if (!session) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const data = await prisma.user
    .findUnique({ where: { id: session.user.id as number } })
    .posts()

  return {
    data,
  }
})
