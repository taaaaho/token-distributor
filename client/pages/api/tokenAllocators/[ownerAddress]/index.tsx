import { Project, TokenAllocator, User } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

import { PrismaClient } from '@prisma/client'
import { getToken } from 'next-auth/jwt'
const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TokenAllocator[] | TokenAllocator>
) {
  const { method } = req
  const ownerAddress = req.query.ownerAddress as string
  const token = await getToken({ req, raw: true })

  if (token) {
    switch (method) {
      case 'GET':
        const tokenAllocators = await prisma.tokenAllocator.findMany({
          where: {
            owner: ownerAddress,
          },
        })
        res.status(200).json(tokenAllocators)
        break
      default:
        res.setHeader('Allow', ['GET'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  } else {
    res.status(400).end(`Not Authorized`)
  }
}
