import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  const email = "admin@sterlingvane.com"
  const password = "password123"
  const hashedPassword = await bcrypt.hash(password, 10)

  console.log("Creating test admin user...")

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      password: hashedPassword,
      role: "ADMIN",
      onboardingComplete: true
    },
    create: {
      email,
      name: "Sovereign Admin",
      password: hashedPassword,
      role: "ADMIN" as any,
      onboardingComplete: true,
      investorProfile: {
        create: {
          tier: "INSTITUTIONAL" as any,
          totalInvested: 1000000,
          applicationStatus: "READY" as any
        }
      }
    }
  })

  console.log(`Test user created: ${user.email}`)
  console.log(`Password: ${password}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
