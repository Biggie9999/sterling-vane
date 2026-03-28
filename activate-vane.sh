#!/bin/bash

# Sterling Vane: Online Property Seeding & Activation Script
# This script will populate your remote database with the 64-property Sovereign Collection.

echo "🚀 Initiating Sterling Vane Online Activation..."

# 1. Synchronize the Local Client with the New PostgreSQL Schema
echo "🛰️  Generating Prisma Client..."
npx prisma generate

# 2. Push the Schema to the Remote Supabase Database
# Note: Using --accept-data-loss because this is a fresh production deployment
echo "📡  Pushing Schema to Remote Supabase..."
npx prisma db push --accept-data-loss

# 3. Deploy the 64-Asset 'Sovereign Collection'
echo "📦  Deploying 64 Institutional Assets..."
npm run seed

# 4. Provision the Administrative Test Account
echo "🔐  Provisioning Administrative Account (admin@sterlingvane.com)..."
npx ts-node -O '{"module":"commonjs"}' scripts/create-user.ts

echo "✅ Deployment Complete! Your platform is now live with the Sovereign Collection."
echo "🔗 View it here: https://sterling-vane.vercel.app/marketplace"
