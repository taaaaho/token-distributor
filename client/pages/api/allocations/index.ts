import { TokenAllocator } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

import { getToken } from 'next-auth/jwt'
import prisma from '@/helpers/api/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TokenAllocator>
) {
  const { method } = req
  const tid = req.query.tid as string
  const token = await getToken({ req, raw: true })

  if (token) {
    try {
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
    } catch (e: any) {
      res.status(500).end(`Something went wrong... ${e.message}`)
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
