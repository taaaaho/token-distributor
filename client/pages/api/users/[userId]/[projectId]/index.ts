import { User } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

import { PrismaClient } from '@prisma/client'
import { getToken } from 'next-auth/jwt'
const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User[] | User | null>
) {
  const { method } = req
  const userId = req.query.userId as string
  const projectId = Number(req.query.projectId as string)

  const token = await getToken({ req, raw: true })

  if (token) {
    switch (method) {
      case 'POST':
        // await prisma.user.update({
        //   // 既存ユーザーへProjectを作成して紐付け
        //   where: { id: '113471261565374195312' },
        //   data: {
        //     projects: {
        //       create: {
        //         project: {
        //           create: {
        //             name: 'New',
        //           },
        //         },
        //         assignedBy: 'hage',
        //       },
        //     },
        //   },
        // })
        // await prisma.projectsOnUsers.delete({
        //   where: {
        //     userId_projectId: {
        //       projectId: 7,
        //       userId: 'cl8n6ccsl0015zz1igkeblyv8',
        //     },
        //   },
        // })
        // await prisma.user.update({
        //   where: { id: '113471261565374195312' },
        //   data: {
        //     projects: {
        //       delete: [
        //         {
        //           userId_projectId: {
        //             projectId: 7,
        //             userId: '113471261565374195312',
        //           },
        //         },
        //       ],
        //     },
        //   },
        // })
        // await prisma.user.create({
        //   // UserとProjectを作成 > Success
        //   data: {
        //     name: 'sand',
        //     email: 'test@example.com',
        //     projects: {
        //       create: {
        //         project: {
        //           create: {
        //             name: 'sand Project',
        //           },
        //         },
        //         assignedBy: 'takaho',
        //       },
        //     },
        //   },
        // })
        await prisma.user.update({
          // 既存ユーザーへProjectを紐付け
          where: { id: '111066304762315932431' },
          data: {
            projects: {
              create: {
                project: {
                  connect: { id: 11 },
                },
                assignedBy: 'hage',
              },
            },
          },
        })
        // await prisma.user.update({
        //   where: { id: 'cl8hd0gwd0002jt1i9j5epmrx' },
        //   data: {
        //     projects: {
        //       set: {
        //         userId_projectId: {
        //           projectId: 1,
        //           userId: 'cl8hd0gwd0002jt1i9j5epmrx',
        //         },
        //       },
        //     },
        //   },
        // })
        // const updated = await prisma.user.update({
        //   data: {
        //     name: 'Updated',
        //     email: 'test+2@example.com',
        //   },
        //   where: {
        //     id: userId,
        //   },
        // })
        res.status(200).end('success')
        break
      case 'PATCH':
        const updated = await prisma.user.update({
          data: {
            name: 'Updated',
            email: 'test+2@example.com',
          },
          where: {
            id: userId,
          },
        })
        res.status(200).json(updated)
        break
      case 'DELETE':
        const deleted = await prisma.user.delete({
          where: {
            id: userId,
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
