import { TokenAllocator } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

import { getToken } from 'next-auth/jwt'
import prisma from '@/helpers/api/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TokenAllocator[] | TokenAllocator>
) {
  const { method } = req
  const ownerAddress = req.query.ownerAddress as string
  const token = await getToken({ req, raw: true })

  if (token) {
    try {
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
    } catch (e: any) {
      res.status(500).end(`Something went wrong... ${e.message}`)
    }
  } else {
    res.status(400).end(`Not Authorized`)
  }
}
