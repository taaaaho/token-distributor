import { User } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

import { PrismaClient } from '@prisma/client'
import { getToken } from 'next-auth/jwt'
const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User[] | User | null>
) {
  const { method } = req
  const userId = req.query.userId as string

  const token = await getToken({ req, raw: true })

  if (token) {
    switch (method) {
      case 'GET':
        const user = await prisma.user.findUnique({
          include: {
            projects: true,
          },
          where: {
            id: userId,
          },
        })
        res.status(200).json(user)
        break
      case 'PATCH':
        const updated = await prisma.user.update({
          data: {
            name: 'Updated',
            email: 'test+2@example.com',
          },
          where: {
            id: userId,
          },
        })
        res.status(200).json(updated)
        break
      case 'DELETE':
        const deleted = await prisma.user.delete({
          where: {
            id: userId,
          },
        })
        res.status(200).json(deleted)
        break
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'DELETE'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  } else {
    res.status(400).end(`Not Authorized`)
  }
}
