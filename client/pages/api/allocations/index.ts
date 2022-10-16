import { TokenAllocator } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

import { PrismaClient } from '@prisma/client'
import { getToken } from 'next-auth/jwt'
const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TokenAllocator>
) {
  const { method } = req
  const tid = req.query.tid as string
  const token = await getToken({ req, raw: true })

  if (token) {
    switch (method) {
      case 'GET':
        const tokenAllocator = await fetchData(tid)
        if (tokenAllocator) {
          res.status(200).json(tokenAllocator)
        } else {
          res.status(400).end('Not Found')
        }

        break
      default:
        res.setHeader('Allow', ['GET'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  } else {
    res.status(400).end(`Not Authorized`)
  }
}

export const fetchData = async (tid: string) => {
  const tokenAllocator = await prisma.tokenAllocator.findUnique({
    where: {
      id: tid,
    },
    include: {
      allocations: true,
    },
  })
  return tokenAllocator
}
