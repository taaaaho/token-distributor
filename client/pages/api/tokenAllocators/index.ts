import { TokenAllocator } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TokenAllocator[] | TokenAllocator>
) {
  const { method } = req
  const token = await getToken({ req, raw: true })

  if (token) {
    switch (method) {
      case 'GET':
        const tokenAllocators = await prisma.tokenAllocator.findMany({})
        res.status(200).json(tokenAllocators)
        break
      case 'POST':
        const { name, description, owner, contract, allocations } = req.body

        const tokenAllocator = await prisma.tokenAllocator.create({
          data: {
            name,
            description,
            owner,
            contract,
            allocations: {
              createMany: {
                data: allocations,
              },
            },
          },
        })
        res.status(200).json(tokenAllocator)
        break
      default:
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  } else {
    res.status(400).end(`Not Authorized`)
  }
}
