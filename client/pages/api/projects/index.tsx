import { Project, User } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'
// import jwt from "jsonwebtoken";

import { PrismaClient } from '@prisma/client'
import { getCsrfToken, getProviders } from 'next-auth/react'
const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Project[] | Project>
) {
  const { method } = req
  const token = await getToken({ req, raw: true })

  if (token) {
    switch (method) {
      case 'GET':
        const projects = await prisma.project.findMany({
          where: {
            users: {
              some: {
                userId: '111066304762315932431',
              },
            },
          },
        })
        res.status(200).json(projects)
        break
      case 'POST':
        const project = await prisma.project.create({
          data: {
            name: 'King nob',
          },
        })
        res.status(200).json(project)
        break
      default:
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  } else {
    res.status(400).end(`Not Authorized`)
  }
}
