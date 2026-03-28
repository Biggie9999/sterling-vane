import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
  // @ts-ignore
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Email Login",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "james@holden.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email }
          })

          if (!user || !user.password) {
            return null
          }

          const isPasswordValid = await bcrypt.compare(credentials.password, user.password)

          if (!isPasswordValid) {
            return null
          }

          return user
        } catch (error) {
          console.error("Auth authorize error:", error)
          return null
        }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  events: {
    async createUser({ user }) {
      if (user.id) {
        // Automatically create an investor profile for Google OAuth users
        await prisma.investorProfile.create({
          data: {
            userId: user.id,
            tier: "ENTRY",
            totalInvested: 0,
            applicationStatus: "PENDING"
          }
        })
      }
    }
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        // @ts-ignore
        session.user.id = token.sub
        
        // Ensure profile exists and populate session user with more info if needed
        const dbUser = await prisma.user.findUnique({
             where: { id: token.sub as string },
             include: { investorProfile: true }
        })
        
        if (dbUser) {
             session.user.name = dbUser.name
             // @ts-ignore
             session.user.onboardingComplete = dbUser.onboardingComplete
             // @ts-ignore
             session.user.intent = dbUser.intent
             
             // Robustness: create profile if missing for any reason
             if (!dbUser.investorProfile) {
               await prisma.investorProfile.create({
                 data: {
                   userId: dbUser.id,
                   tier: "ENTRY",
                   totalInvested: 0,
                   applicationStatus: "PENDING"
                 }
               })
             }
        }
      }
      return session
    }
  }
}
