import { PrismaClient } from '@prisma/client'
import { getServerSession } from '#auth'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)

  if (!session) {
    return { status: 'unauthenticated!' }
  }

  const posts = await prisma.post.findMany()

  console.log(posts)

  return {
    posts,
  }
})
