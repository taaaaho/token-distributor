import { User } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

import { PrismaClient } from '@prisma/client'
import { getToken } from 'next-auth/jwt'
const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User[] | User>
) {
  const { method } = req
  const token = await getToken({ req, raw: true })

  if (token) {
    switch (method) {
      case 'GET':
        const users = await prisma.user.findMany()
        res.status(200).json(users)
        break
      case 'POST':
        const user = await prisma.user.create({
          data: {
            name: 'King nob',
            email: 'test@example.com',
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
            id: 'cl8hcuc8s0012fk1igyfi6rm8',
          },
        })
        res.status(200).json(updated)
        break
      case 'DELETE':
        const deleted = await prisma.user.delete({
          where: {
            id: 'cl8hcuc8s0012fk1igyfi6rm8',
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
