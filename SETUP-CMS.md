# 🚀 CMS Setup Instructions

This guide will help you set up your Kitchen Core website with a fully functional CMS that pulls content from the database.

## ✅ What's Been Fixed

1. **Project Categories Updated** - New 4 categories:
   - Modern Wooden Kitchens (مطابخ عصرية - خشب)
   - Classic Wooden Kitchens (مطابخ كلاسيك - خشب)
   - Aluminum Kitchens (مطابخ ألومنيوم)
   - Bedrooms & Wardrobes (غرف النوم والملابس)

2. **All Brand References Removed**:
   - No "Italian craftsmanship"
   - No "Alpha Wood", "Salko", "Egger"
   - Focus on Kitchen Core's design philosophy

3. **Bilingual Content Ready**:
   - All database content in English AND Arabic
   - Company info, projects, statistics

4. **Homepage Simplified**:
   - From 20+ sections to 7 sections
   - Much less scrolling

5. **CMS Integration Complete**:
   - All validations updated to new categories
   - Type definitions aligned with database schema
   - API endpoints map database enums to frontend keys
   - EnhancedPortfolio component pulls from database
   - All code changes committed and ready

---

## ⚡ Quick Start

**All code updates are complete!** You just need to run 5 commands to populate your database:

1. Stop dev server (Ctrl+C)
2. `pnpm prisma generate`
3. `pnpm db:push`
4. `pnpm db:seed`
5. `pnpm dev`

Then test at `http://localhost:3000`

---

## 📋 Step-by-Step Setup

### Step 1: Stop Development Server

If you have `npm run dev` or `pnpm dev` running, **STOP IT NOW**.

Press `Ctrl+C` in the terminal where it's running.

---

### Step 2: Generate Prisma Client

This updates TypeScript types for the new database schema:

```bash
pnpm prisma generate
```

**Expected output**: `✔ Generated Prisma Client`

---

### Step 3: Push Schema to Database

This updates your database with the new project categories:

```bash
pnpm db:push
```

**Expected output**: `Your database is now in sync with your Prisma schema`

---

### Step 4: Seed the Database

This populates your database with bilingual content:

```bash
pnpm db:seed
```

**Expected output**:

```
🌱 Starting comprehensive database seed...
🗑️  Cleaning existing data...
📝 Creating company information...
📊 Creating statistics...
🏠 Creating sample projects...
✅ Database seeded successfully!
```

---

### Step 5: Start Development Server

```bash
pnpm dev
```

Then open: `http://localhost:3000`

---

## 🎯 What to Test

### 1. Homepage (`/`)

- [ ] Hero shows: "تفرّد بأناقة" / "Distinctive Elegance"
- [ ] Statistics show: 150+ kitchens, 25+ countries, etc.
- [ ] Projects section has 4 categories with slogans
- [ ] Only 7 sections total (not 20+)
- [ ] Single clean footer at bottom

### 2. Projects Section

- [ ] Click "All" - shows all 4 projects
- [ ] Click "Modern Wooden" - shows 1 project
- [ ] Click "Classic Wooden" - shows 1 project
- [ ] Click "Aluminum" - shows 1 project
- [ ] Click "Bedrooms" - shows 1 project
- [ ] Category slogans appear when selected

### 3. Language Switching

- [ ] Switch to Arabic - all text changes
- [ ] Switch to English - all text changes
- [ ] RTL layout works in Arabic

### 4. About Page (`/about`)

- [ ] Company info loads from database
- [ ] Mission/Vision shows new philosophy
- [ ] No Italian references
- [ ] No brand mentions

### 5. Mobile Responsiveness

- [ ] Open Chrome DevTools (F12)
- [ ] Click device icon (phone/tablet view)
- [ ] Test: iPhone, iPad views
- [ ] Footer stacks properly on mobile
- [ ] Navigation works on mobile

---

## 🛠️ Troubleshooting

### Problem: "Prisma Client not generated"

**Solution**:

```bash
pnpm prisma generate
```

### Problem: "Database connection error"

**Solution**: Check your `.env` file has:

```env
POSTGRES_PRISMA_URL=your_connection_string
POSTGRES_URL_NON_POOLING=your_direct_connection_string
```

### Problem: "Seed script fails"

**Solution**: Database might have old data. Clear it:

```bash
pnpm prisma studio
# Open Projects table → Delete all rows
# Then run: pnpm db:seed
```

### Problem: "Type errors about ProjectCategory"

**Solution**: Prisma Client not regenerated. Run:

```bash
pnpm prisma generate
# Then restart your IDE/editor
```

---

## 📦 What's in the Database Now

### Company Table (1 record)

- Kitchen Core info in EN & AR
- Mission: Problem-solving design approach
- Vision: First choice for innovative design
- No Italian references

### Statistics Table (4 records)

- 150+ Luxury Kitchens
- 25+ Countries
- 15 Years Excellence
- 100% Client Satisfaction

### Projects Table (4 records)

1. **Modern Wooden**: Villa Marina kitchen
2. **Classic Wooden**: Royal Estate kitchen
3. **Aluminum**: Urban Loft kitchen
4. **Bedrooms**: Master Suite wardrobe

Each project has:

- Bilingual title, description, challenges
- Images (placeholder paths - you can update)
- Materials, appliances, features
- Duration, location

---

## 🔄 Adding More Projects

### Via Prisma Studio (GUI)

```bash
pnpm db:studio
```

Opens: `http://localhost:5555`

1. Click "Project" table
2. Click "Add record"
3. Fill in:
   - `titleEn` & `titleAr`
   - `category` (dropdown: MODERN_WOODEN, CLASSIC_WOODEN, ALUMINUM, BEDROOMS)
   - `descriptionEn` & `descriptionAr`
   - Upload images to `/public/projects/`
   - Set `image` path: `/projects/your-image.jpg`
4. Click "Save"

### Programmatically

Create a script in `scripts/add-project.ts` or use the admin panel.

---

## 🎨 Customizing Content

### Company Information

```bash
pnpm db:studio
```

1. Open "Company" table
2. Edit the single record
3. Update:
   - `descriptionEn` / `descriptionAr`
   - `missionEn` / `missionAr`
   - `visionEn` / `visionAr`
   - Social media links

### Statistics

```bash
pnpm db:studio
```

1. Open "Statistic" table
2. Edit any record
3. Update `number`, `labelEn`, `labelAr`

---

## 📊 Database Schema Reference

Key tables:

- **Company** - About info (singleton)
- **Project** - Portfolio projects
- **Statistic** - Trust markers
- **GalleryImage** - Gallery photos
- **Testimonial** - Client reviews
- **Service** - Service offerings

All have bilingual fields: `*En` and `*Ar`

---

## ✨ Next Steps

1. **Add Real Images**: Replace placeholder paths in Projects
2. **Add More Projects**: At least 3-5 per category
3. **Update Company Info**: Add real contact details
4. **Test Everything**: Go through the checklist above
5. **Deploy**: Push to production when ready

---

## 🆘 Need Help?

If you encounter issues:

1. Check this file first
2. Run `pnpm db:studio` to inspect database
3. Check browser console (F12) for errors
4. Check server logs in terminal

---

**Ready to test?** Run the 5 steps above and your CMS will be fully operational! 🎉
