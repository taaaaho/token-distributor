import { User } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// const user = await prisma.user.create({
//     data: {
//       name: 'King nob',
//       email: 'test@example.com',
//     },
//   })
