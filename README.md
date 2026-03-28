# The Sovereign Collection — Sterling Vane

A premier luxury real estate investment platform. We combine private equity hospitality, an elite property marketplace, and a boutique rental engine into a single, unified digital experience.

## 🚀 Getting Started (New PC Setup)

To pick up this project on a new machine, follow these steps:

### 1. Prerequisites
- **Node.js**: v18 or higher.
- **Git**: Installed and configured.
- **Database**: A Supabase project (or any PostgreSQL instance).

### 2. Clone and Install
```bash
git clone https://github.com/Biggie9999/sterling-vane.git
cd sterling-vane
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env` and fill in your credentials:
```bash
cp .env.example .env
```
Ensure `DATABASE_URL` (pooler) and `DIRECT_URL` (direct) are correctly set for Supabase.

### 4. Database Setup
Sync your local Prisma client with the live database and seed the fallback properties:
```bash
npx prisma generate
npx prisma db push
npm run seed
```

### 5. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the platform.

## 🛠 Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **Auth**: NextAuth.js (Google OAuth & Credentials)
- **Styling**: Tailwind CSS / Vanilla CSS
- **Payments**: Stripe (Integration Ready)
- **Email**: Resend

## 📂 Architecture Overview
- `/src/app/api`: Serverless functions for properties, dashboard, and auth.
- `/src/app/marketplace`: Dynamic property listing engine.
- `/src/app/dashboard`: Real-time investment tracking UI.
- `/prisma/seed.ts`: Script to populate the 'Sovereign Collection' from demo data.

## 📄 License
Private and Confidential. (c) 2026 Sterling Vane.
