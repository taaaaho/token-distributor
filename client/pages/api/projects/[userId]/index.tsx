import { Project, User } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

import { PrismaClient } from '@prisma/client'
import { getToken } from 'next-auth/jwt'
const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Project[] | Project>
) {
  const { method } = req
  const userId = req.query.userId as string
  const token = await getToken({ req, raw: true })

  if (token) {
    switch (method) {
      case 'GET':
        const projects = await prisma.project.findMany({
          where: {
            users: {
              some: {
                userId: userId,
              },
            },
          },
        })
        res.status(200).json(projects)
        break
      default:
        res.setHeader('Allow', ['GET'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  } else {
    res.status(400).end(`Not Authorized`)
  }
}
