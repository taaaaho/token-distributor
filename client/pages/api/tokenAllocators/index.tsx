import { TokenAllocator, User } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

import { PrismaClient } from '@prisma/client'
import { getCsrfToken, getProviders } from 'next-auth/react'
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
        const tokenAllocator = await prisma.tokenAllocator.create({
          data: {
            name: 'hoge',
            description: 'fuga',
            owner: '0xD53964fEA76812b4c448357F73c9D08DbA5eBBa7',
            contract: '0xD53964fEA76812b4c448357F73c9D08DbA5eBBa7',
            allocations: {
              createMany: {
                data: [
                  {
                    wallet: '0xD53964fEA76812b4c448357F73c9D08DbA5eBB30',
                    proportion: 30,
                  },
                  {
                    wallet: '0xD53964fEA76812b4c448357F73c9D08DbA5eBB70',
                    proportion: 70,
                  },
                ],
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
