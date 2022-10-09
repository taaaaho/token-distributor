import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

import { User } from '@prisma/client'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const res = await prisma.user.findUnique({
        where: {
          id: user.id,
        },
      })
      if (!res) {
        await prisma.user.create({
          data: {
            id: user.id,
            name: user.name,
            email: user.email as string,
          },
        })
      }
      return true
    },
    // Create or update JWT
    async jwt({ token, user, account }) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    // Create or Update session
    async session({ session, token, user }) {
      session.accessToken = token.accessToken
      return session
    },
  },
})
