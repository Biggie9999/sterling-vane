import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"

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
        if (!credentials?.email) return null

        try {
          // Standard app behavior: Find or Create user on the fly for demo purposes
          // In production, you'd add password hashing and a formal sign-up route
          let user = await prisma.user.findUnique({
            where: { email: credentials.email }
          })

          if (!user) {
            user = await prisma.user.create({
              data: {
                email: credentials.email,
                name: credentials.email.split("@")[0].charAt(0).toUpperCase() + credentials.email.split("@")[0].slice(1),
                role: "INVESTOR"
              }
            })

            // Also create empty investor profile
            await prisma.investorProfile.create({
              data: {
                userId: user.id,
                tier: "ENTRY",
                totalInvested: 0,
                applicationStatus: "PENDING"
              }
            })
          }

          return user
        } catch (error) {
          console.error("Auth authorize error:", error)
          return null
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        // @ts-ignore
        session.user.id = token.sub
        
        // Populate session user with more info if needed
        const dbUser = await prisma.user.findUnique({
             where: { id: token.sub as string }
        })
        if (dbUser) {
             session.user.name = dbUser.name
        }
      }
      return session
    }
  }
}
