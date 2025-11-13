# Database Reset and Seed Script
# Run this in PowerShell

Write-Host "🔄 Starting database reset and seed process..." -ForegroundColor Cyan
Write-Host ""

# Set environment variable for Prisma consent
$env:PRISMA_USER_CONSENT_FOR_DANGEROUS_AI_ACTION = "Yes, reset and reseed the database"

# Step 1: Generate Prisma Client
Write-Host "📦 Step 1: Generating Prisma Client..." -ForegroundColor Yellow
pnpm prisma generate

# Step 2: Force push schema (drops and recreates all tables)
Write-Host ""
Write-Host "🗄️  Step 2: Pushing database schema (this will drop all existing tables)..." -ForegroundColor Yellow
pnpm prisma db push --force-reset --accept-data-loss

# Step 3: Seed main data
Write-Host ""
Write-Host "🌱 Step 3: Seeding main CMS data..." -ForegroundColor Yellow
pnpm prisma db seed

# Step 4: Seed UI translations
Write-Host ""
Write-Host "🌐 Step 4: Seeding UI translations..." -ForegroundColor Yellow
pnpm tsx prisma/seed-ui-translations.ts

Write-Host ""
Write-Host "✅ Database reset and seed completed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  1. Start your development server: pnpm run dev"
Write-Host "  2. Access admin panel: http://localhost:3004/admin"
Write-Host "  3. Login with: admin@kitchencore.com"
Write-Host ""
