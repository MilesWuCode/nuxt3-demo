import { PrismaClient } from '@prisma/client'
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)

  if (!session) {
    return { status: 'unauthenticated!' }
  }

  const prisma = new PrismaClient()

  const posts = await prisma.user
    .findUnique({ where: { id: session.user.id } })
    .posts()

  return {
    posts,
  }
})
