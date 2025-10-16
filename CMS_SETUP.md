# Kitchen Core CMS Setup Guide

## Phase 1 Complete! ✅

You now have a complete Sanity CMS infrastructure set up for Kitchen Core. Here's what's been configured:

### What's Been Set Up

1. **Sanity CMS Dependencies** - Installed and configured
2. **Content Schemas** - 8 content types created:
   - Portfolio Projects
   - Gallery Images
   - Testimonials
   - Process Steps
   - Services
   - Statistics
   - Founder Information
   - Site Settings

3. **API Layer** - Query functions for fetching all content
4. **TypeScript Types** - Full type safety for all CMS data
5. **Image Optimization** - Sanity image URL builder configured
6. **Studio Route** - CMS accessible at `/studio`

---

## Next Steps: Complete Setup

### Step 1: Create Sanity Project

1. **Sign up/Login to Sanity**
   ```bash
   npx sanity login
   ```

2. **Initialize Sanity Project**
   ```bash
   npx sanity init --env
   ```

   Choose:
   - Create new project
   - Project name: "Kitchen Core"
   - Dataset: "production"
   - Output path: Use existing files (say yes)

3. **Get Your Project Credentials**
   - After initialization, you'll get a `PROJECT_ID`
   - Note it down!

### Step 2: Configure Environment Variables

1. **Create `.env.local` file** (copy from `.env.local.example`):
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
   NEXT_PUBLIC_SANITY_DATASET=production
   RESEND_API_KEY=re_P65EWgH6_LHj2ff9EHpAtcDLowLdCcuD3
   ```

2. **Update `.env.production`** with the same Sanity credentials

3. **Add to Vercel** (for production):
   ```bash
   vercel env add NEXT_PUBLIC_SANITY_PROJECT_ID
   vercel env add NEXT_PUBLIC_SANITY_DATASET
   ```

### Step 3: Deploy Sanity Studio

1. **Deploy your schemas to Sanity**:
   ```bash
   npx sanity deploy
   ```

   Choose a studio hostname (e.g., `kitchen-core-studio`)

2. **OR** Run locally and access at `http://localhost:3000/studio`:
   ```bash
   npm run dev
   ```

### Step 4: Populate Initial Content

Once the studio is accessible, you'll need to create initial content:

#### Required Content to Create:

1. **Site Settings** (singleton)
   - Site title, hero content, contact info, partnerships

2. **Founder** (singleton)
   - Founder bio, education, recognition

3. **Statistics** (8 total)
   - 4 for "Homepage - Trust Markers"
   - 4 for "Gallery - Stats"

4. **Services** (3 services)
   - Palace Kitchen Design
   - Villa Kitchen Fit-Out
   - Estate Kitchen Systems

5. **Process Steps** (6 steps)
   - Steps 01-06 of your process timeline

6. **Projects** (6 portfolio projects)
   - Upload images for each project

7. **Gallery Images** (12 images)
   - Various categories

8. **Testimonials** (4 testimonials)
   - Client testimonials with images

---

## Using the CMS

### Access the Studio

**Local Development:**
```
http://localhost:3000/studio
```

**Production:**
```
https://your-domain.vercel.app/studio
```

### Content Management

#### Adding a New Project:
1. Go to Studio → Projects → Create
2. Fill in all required fields
3. Upload main image and gallery images
4. Set display order (lower numbers appear first)
5. Mark as "Featured" to show on homepage
6. Publish

#### Managing Gallery:
1. Studio → Gallery Images → Create
2. Upload image
3. Choose category and size (affects layout)
4. Set display order
5. Publish

#### Editing Site Content:
1. Studio → Site Settings
2. Update hero content, contact info, etc.
3. Save

---

## Current Architecture

```
kitchen-core/
├── sanity/
│   ├── schemas/              # Content type definitions
│   │   ├── project.ts
│   │   ├── galleryImage.ts
│   │   ├── testimonial.ts
│   │   ├── processStep.ts
│   │   ├── service.ts
│   │   ├── statistic.ts
│   │   ├── founder.ts
│   │   ├── siteSettings.ts
│   │   └── index.ts
│   └── lib/                  # Client & utilities
│       ├── client.ts         # Sanity client config
│       ├── image.ts          # Image URL builder
│       ├── queries.ts        # Data fetching functions
│       └── types.ts          # TypeScript interfaces
├── app/
│   └── studio/[[...index]]/  # CMS Studio route
│       └── page.tsx
├── sanity.config.ts          # Main Sanity configuration
└── .env.local.example        # Environment variable template
```

---

## Next Phase: Connect Components

After setting up Sanity and populating content, we'll move to **Phase 2** and **Phase 3**:

1. **Migrate existing hardcoded data** to Sanity
2. **Refactor components** to fetch data from CMS
3. **Implement ISR** for optimal performance
4. **Add preview mode** for draft content

---

## Troubleshooting

### Common Issues:

**"projectId is not defined"**
- Make sure `.env.local` exists with correct `NEXT_PUBLIC_SANITY_PROJECT_ID`

**"Schema not found"**
- Run `npx sanity deploy` to deploy your schemas

**Studio not loading**
- Check that `/studio/[[...index]]/page.tsx` exists
- Restart dev server

**Images not displaying**
- Verify image URLs with `getImageUrl()` helper
- Check project ID is correct

---

## Useful Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Deploy Sanity schemas
npx sanity deploy

# Manage Sanity project
npx sanity manage

# Check Sanity documentation
npx sanity docs
```

---

## Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js + Sanity](https://www.sanity.io/docs/next-js)
- [GROQ Query Language](https://www.sanity.io/docs/groq)

---

## Ready for Phase 2?

Once you've completed the setup above and populated initial content, let me know and we'll proceed to:
- Phase 2: Migrate existing content
- Phase 3: Connect components to CMS
- Phase 4-6: Preview, SEO, and optimization

Good luck! 🚀
