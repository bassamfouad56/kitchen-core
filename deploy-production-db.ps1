# Production Database Migration Script
# This will update the production database schema to include UITranslation table

Write-Host "🚀 Production Database Migration" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "⚠️  WARNING: This will modify the PRODUCTION database!" -ForegroundColor Yellow
Write-Host "    Database: Neon PostgreSQL (ep-snowy-snow-ad2y4rja...)" -ForegroundColor Yellow
Write-Host ""
Write-Host "This script will:" -ForegroundColor White
Write-Host "  1. Generate Prisma Client" -ForegroundColor Gray
Write-Host "  2. Push schema changes (add UITranslation table)" -ForegroundColor Gray
Write-Host "  3. Seed UI translations (60+ labels)" -ForegroundColor Gray
Write-Host ""

$confirmation = Read-Host "Type 'YES' to proceed with production migration"

if ($confirmation -ne "YES") {
    Write-Host "❌ Migration cancelled." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📦 Step 1: Generating Prisma Client..." -ForegroundColor Yellow
pnpm prisma generate

Write-Host ""
Write-Host "🗄️  Step 2: Pushing schema to production database..." -ForegroundColor Yellow
Write-Host "    (This will add the UITranslation table)" -ForegroundColor Gray
pnpm prisma db push

Write-Host ""
Write-Host "🌐 Step 3: Seeding UI translations..." -ForegroundColor Yellow
pnpm tsx prisma/seed-ui-translations.ts

Write-Host ""
Write-Host "✅ Production database migration completed!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  1. Visit: https://kitchen-core-giymkxfmr-bassamfouads-projects.vercel.app" -ForegroundColor Gray
Write-Host "  2. Test Arabic/English language switching" -ForegroundColor Gray
Write-Host "  3. All UI labels should now be translatable from the admin panel" -ForegroundColor Gray
Write-Host ""
