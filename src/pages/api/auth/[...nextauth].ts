import NextAuth, { NextAuthOptions, User } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@/prisma'
import { JWT } from 'next-auth/jwt'
import { AdapterUser } from 'next-auth/adapters'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'abcd@xyz.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async function(credentials) {
        const user = await fetch(
          `${process.env.NEXTAUTH_URL}/api/user/check-credentials`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              accept: 'application/json',
            },
            body: Object.entries(credentials ?? [])
              .map((e) => e.join('='))
              .join('&'),
          },
        )
          .then((res) => res.json())
          .catch((err) => {
            console.log(err)
            return null
          })

        if (user) {
          return user
        } else {
          throw new Error('Wrong credentials. Try again.')
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  secret: process.env.SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  jwt: {
    maxAge: 24 * 60 * 60,
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT, user: (AdapterUser | User) & { userRole?: string } }) {
      if (user) {
        token.userRole = user?.userRole
      }
      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          userRole: token.userRole,
        },
      }
    },
  },

}
export default NextAuth(authOptions)