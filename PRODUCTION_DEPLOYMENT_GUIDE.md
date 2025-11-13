# Production Deployment Guide

## Current Status

✅ **Code Deployed**: https://kitchen-core-giymkxfmr-bassamfouads-projects.vercel.app
⚠️ **Database**: Needs schema update for UITranslation table

## Issue

The production database is the same as your development database (Neon PostgreSQL), but it appears to be in an inconsistent state. The `Lead` table doesn't exist, which means the database needs to be reset and reseeded.

## ⚠️ CRITICAL DECISION REQUIRED

Since the production database is the same database you're using locally, you have two options:

### Option 1: Use the Local Database Reset (Already Done)

If you **already ran** the PowerShell script `reset-and-seed.ps1` on your local machine, then:

1. The database is already updated with UITranslation table
2. The production site should work immediately
3. Just trigger a new deployment to clear any build caches

```bash
vercel --prod
```

### Option 2: Fresh Production Database Reset (If Not Done Locally)

If you **haven't reset the local database yet**, run this now:

```powershell
# Open PowerShell in D:\wbsite\kitchen-core
.\reset-and-seed.ps1
```

This will:

- ✅ Reset and recreate all database tables
- ✅ Seed all CMS content
- ✅ Add UITranslation table with 60+ labels
- ✅ Work for both local and production (same database)

## Verify Deployment

After the database is updated, verify your production site:

1. **Visit Production**: https://kitchen-core-giymkxfmr-bassamfouads-projects.vercel.app
2. **Test Language Switch**: Toggle between English and Arabic
3. **Check Portfolio**: Verify all labels are translated
4. **Check Footer**: Logo should be larger
5. **Test Videos**: Videos should play when clicked

## What Changed in This Deployment

### ✨ New Features

1. **UI Translations CMS**
   - All interface labels now in database
   - Manageable from admin panel
   - 60+ pre-seeded translations (EN/AR)

2. **Bug Fixes**
   - Fixed duplicate footer/contact sections
   - Fixed missing Arabic translations
   - Fixed video playback issues
   - Enlarged footer logo

### 📁 Files Changed

- `prisma/schema.prisma` - Added UITranslation model
- `lib/db/ui-translations.ts` - Translation helper functions
- `lib/db/homepage.ts` - Include UI translations in API
- `prisma/seed-ui-translations.ts` - Seed script with all labels
- `app/components/EnhancedPortfolio.tsx` - Use CMS translations
- `app/components/Footer.tsx` - Bigger logo, cleanup
- `app/components/VideoShowcase.tsx` - Better playback handling
- `app/[locale]/page.tsx` - Remove duplicate sections
- `messages/en.json` - Translation structure fixes
- `messages/ar.json` - Translation structure fixes

## Troubleshooting

### If Production Site Shows Errors

1. **Database Connection Error**
   - Verify `.env` has correct `POSTGRES_PRISMA_URL`
   - Run `pnpm prisma db push` locally

2. **Missing UITranslation Table**
   - Run `.\reset-and-seed.ps1` locally
   - This updates the shared database

3. **Build Errors in Vercel**
   - Check deployment logs: `vercel inspect --logs`
   - Redeploy: `vercel --prod`

### Verify Database Schema

```bash
# Check if UITranslation table exists
pnpm prisma studio
# Look for "UITranslation" in the left sidebar
```

## Post-Deployment Checklist

- [ ] Database reset and seeded (`.\reset-and-seed.ps1`)
- [ ] Production site loads without errors
- [ ] Language switching works (EN ↔ AR)
- [ ] All UI labels display correctly
- [ ] Videos play when clicked
- [ ] Footer logo is larger
- [ ] No duplicate footer/contact sections
- [ ] Admin panel accessible

## Admin Panel Access

**URL**: https://kitchen-core-giymkxfmr-bassamfouads-projects.vercel.app/admin

**Default Credentials**:

- Email: admin@kitchencore.com
- Password: (set during database seeding)

## Next Steps

1. **Test Production Site** thoroughly
2. **Manage UI Translations** from admin panel
3. **Update content** as needed through CMS
4. **Monitor** for any errors in Vercel dashboard

## Support

If you encounter issues:

1. Check Vercel deployment logs
2. Verify database connection
3. Run `pnpm prisma studio` to inspect database
4. Check browser console for frontend errors

---

**Deployment Date**: 2025-11-13
**Deployment ID**: kitchen-core-giymkxfmr-bassamfouads-projects
