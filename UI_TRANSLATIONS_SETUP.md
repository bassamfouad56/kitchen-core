# UI Translations CMS Setup Guide

## Overview

All UI labels are now managed in the CMS instead of hardcoded translation files. This allows you to manage all text in both English and Arabic from the admin panel.

## Setup Steps

### 1. Generate Prisma Client

```bash
pnpm prisma generate
```

### 2. Create Database Migration

```bash
pnpm prisma migrate dev --name add-ui-translations
```

### 3. Seed UI Translations

```bash
pnpm tsx prisma/seed-ui-translations.ts
```

## How It Works

### Database Structure

The `UITranslation` model stores all interface labels:

- `key`: Unique identifier (e.g., "portfolio.viewDetails")
- `category`: Organization category (e.g., "portfolio", "navigation")
- `textEn`: English text
- `textAr`: Arabic text
- `published`: Visibility toggle

### API Integration

The homepage API (`/api/cms/homepage`) now includes a `ui` object with all translations:

```typescript
{
  projects: [...],
  testimonials: [...],
  ui: {
    "portfolio.viewDetails": "View Details",  // or "عرض التفاصيل" in Arabic
    "navigation.home": "Home",                 // or "الرئيسية" in Arabic
    // ... all other UI labels
  }
}
```

### Component Usage

Components fetch UI translations from the CMS:

**Before (i18n files):**

```typescript
import { useTranslations } from "next-intl";
const t = useTranslations("Portfolio");
{
  t("viewDetails");
}
```

**After (CMS):**

```typescript
const [ui, setUi] = useState<{ [key: string]: string }>({});

useEffect(() => {
  async function fetchData() {
    const res = await fetch(`/api/cms/homepage?locale=${locale}`);
    const data = await res.json();
    setUi(data.ui || {});
  }
  fetchData();
}, [locale]);

{
  ui["portfolio.viewDetails"] || "View Details";
}
```

## Available Translation Categories

1. **navigation** - Menu items, links
2. **portfolio** - Portfolio section labels
3. **categories** - Project category names and slogans
4. **footer** - Footer text and links
5. **video** - Video showcase section
6. **hero** - Homepage hero section
7. **stats** - Statistics labels
8. **about** - About section
9. **contact** - Contact section

## Managing Translations in Admin

### Access Admin Panel

```
http://localhost:3004/admin
```

### Add/Edit UI Translations

1. Navigate to **Content > UI Translations**
2. Click **Add New Translation**
3. Fill in:
   - **Key**: Unique identifier (use dot notation: `section.label`)
   - **Category**: Organizational category
   - **English Text**: English version
   - **Arabic Text**: Arabic version
   - **Description**: Optional context note
   - **Published**: Toggle visibility

### Example Translation Entry

```
Key: portfolio.engineeringChallenge
Category: portfolio
English Text: Engineering Challenge
Arabic Text: التحدي الهندسي
Description: Label for engineering challenge section in project details
Published: ✓
```

## Migration from i18n Files

The seed script (`seed-ui-translations.ts`) includes all current translations from:

- `messages/en.json`
- `messages/ar.json`

These are automatically imported when you run the seed command.

## Benefits

✅ **No Code Deployments**: Update text without touching code
✅ **Single Source of Truth**: All translations in one database
✅ **Admin Friendly**: Non-developers can update text
✅ **Version Control**: Track changes in database
✅ **Instant Updates**: No need to rebuild/redeploy for text changes
✅ **Bilingual from Start**: English and Arabic built-in

## Adding New Translations

### Method 1: Admin Panel (Recommended)

1. Login to `/admin`
2. Go to UI Translations
3. Add new entry

### Method 2: Seed File (Bulk Import)

1. Edit `prisma/seed-ui-translations.ts`
2. Add to `uiTranslations` array:
   ```typescript
   {
     key: 'newSection.newLabel',
     category: 'newSection',
     textEn: 'English Text',
     textAr: 'نص عربي',
     description: 'Optional description',
   },
   ```
3. Run: `pnpm tsx prisma/seed-ui-translations.ts`

## Troubleshooting

### Translation Not Showing

1. Check `published` is `true` in database
2. Verify `key` matches exactly in component
3. Clear cache and refresh

### Missing Translation

- Fallback will show the key name
- Add translation in admin panel
- Check console for warnings

## Next Steps

After setup:

1. Run migration and seed (steps above)
2. Test in development
3. Update components to use CMS translations
4. Deploy to production
5. Run seed on production database

## Production Deployment

```bash
# On production server
npx prisma migrate deploy
npx tsx prisma/seed-ui-translations.ts
```

---

**Need Help?**

- Check admin panel logs
- Verify database connection
- Review `lib/db/ui-translations.ts` for queries
