# Kitchen Core CMS Guide

## Overview

The Kitchen Core CMS is a custom-built, bilingual (English/Arabic) content management system built with Next.js 15, Prisma, and PostgreSQL.

## Features

- **Bilingual Support**: Full English and Arabic content management
- **Portfolio Projects**: Manage luxury kitchen projects with galleries
- **Gallery Management**: Curated image galleries with categorization
- **Testimonials**: Client testimonials with ratings
- **Services**: Service offerings management
- **Videos**: Video showcase with thumbnail support
- **Innovations**: Technology and innovation features
- **Settings**: Site-wide configuration
- **Authentication**: Secure NextAuth-based authentication

## Access

**Admin URL**: `http://localhost:3004/admin` (or your-domain.com/admin in production)

**Default Credentials**:
- Email: admin@kitchencore.com
- Password: (set during database seeding)

## Database Setup

1. **Environment Variables**:
   ```env
   POSTGRES_PRISMA_URL="your-postgres-url"
   POSTGRES_URL_NON_POOLING="your-postgres-direct-url"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3004"
   ```

2. **Run Migrations**:
   ```bash
   npx prisma migrate dev
   ```

3. **Seed Database**:
   ```bash
   npx prisma db seed
   ```

## Content Types

### 1. Projects (`/admin/projects`)
Luxury kitchen portfolio projects with:
- Title, location, category (Palace/Villa/Estate/Penthouse)
- Main image + gallery
- Technical specs (area, budget, materials, appliances)
- Features, challenges, innovations
- Published status and display order

### 2. Gallery Images (`/admin/gallery`)
Standalone gallery images with:
- Title, description, location
- Category and size variants
- Display order and published status

### 3. Testimonials (`/admin/testimonials`)
Client testimonials with:
- Name, title, location
- Quote and rating (1-5 stars)
- Client image
- Featured flag and display order

### 4. Services (`/admin/services`)
Service offerings with:
- Title and description
- List of features
- Display order

### 5. Videos (`/admin/videos`)
**Bilingual** video content with:
- Title (EN/AR)
- Description (EN/AR)
- Video URL (Vercel Blob storage)
- Thumbnail image
- Display order

### 6. Innovations (`/admin/innovations`)
**Bilingual** innovation features with:
- Title (EN/AR)
- Description (EN/AR)
- Icon identifier
- Display order

### 7. Site Settings (`/admin/settings`)
Singleton configuration for:
- Site title and hero section content
- Contact information (phone, email, address)
- Social media links (Instagram, Pinterest, LinkedIn, Houzz)
- Brand partnerships
- SEO meta description and keywords

## Content Management Workflow

### Adding Content

1. Navigate to the relevant section (e.g., `/admin/projects`)
2. Click "+ New [Content Type]"
3. Fill in all required fields (marked with *)
4. For bilingual content, provide both English and Arabic translations
5. Set display order (lower numbers appear first)
6. Toggle "Published" to make content live
7. Click "Create" or "Save"

### Editing Content

1. Navigate to content list page
2. Click "Edit" on the item you want to modify
3. Update fields as needed
4. Click "Save Changes"

### Deleting Content

1. Navigate to edit page for the content
2. Click "Delete [Content Type]" button
3. Confirm deletion in the popup

## API Endpoints

All content is available via REST APIs:

### Public APIs (No auth required):
- `GET /api/projects` - Published projects
- `GET /api/gallery` - Published gallery images
- `GET /api/testimonials` - Published testimonials
- `GET /api/services` - Published services
- `GET /api/videos` - Published videos
- `GET /api/innovations` - Published innovations
- `GET /api/settings` - Site settings

### Admin APIs (Auth required):
- `POST /api/projects` - Create project
- `PUT /api/projects/[id]` - Update project
- `DELETE /api/projects/[id]` - Delete project
- _(Same pattern for all content types)_

## Image/Video Upload

### Current Status
Image and video uploads are handled via direct URL input. For production:

1. **Vercel Blob Storage** (Recommended):
   ```bash
   npm install @vercel/blob
   ```

2. **Setup**:
   - Add `BLOB_READ_WRITE_TOKEN` to environment variables
   - Create upload API route at `/api/upload`
   - Update admin forms with file upload inputs

3. **Example Upload Component**:
   ```typescript
   const handleUpload = async (file: File) => {
     const formData = new FormData()
     formData.append('file', file)

     const res = await fetch('/api/upload', {
       method: 'POST',
       body: formData,
     })

     const { url } = await res.json()
     return url
   }
   ```

## Bilingual Content Best Practices

1. **Always provide both translations**: English and Arabic fields are required for bilingual content types
2. **Use RTL-aware inputs**: Arabic text fields have `dir="rtl"` attribute
3. **Test in both locales**: Preview content at `/en` and `/ar` routes
4. **Maintain consistency**: Keep translations contextually equivalent

## Database Schema

Key models:
- `User` - Admin users with roles (ADMIN/EDITOR)
- `Project` - Portfolio projects
- `GalleryImage` - Gallery images
- `Testimonial` - Client testimonials
- `Service` - Service offerings
- `Video` - Video content (bilingual)
- `Innovation` - Innovation features (bilingual)
- `SiteSettings` - Site configuration (singleton)
- `NassGallery` - Special gallery collections (bilingual)
- `HeroSection` - Homepage hero (bilingual, singleton)
- `CTASection` - Call-to-action section (bilingual, singleton)

## Troubleshooting

### Can't login to admin
- Check database connection
- Verify user exists: `npx prisma studio`
- Reset password via Prisma Studio if needed

### Changes not appearing on site
- Check "Published" status is enabled
- Clear Next.js cache: `rm -rf .next`
- Restart dev server

### Database errors
- Run migrations: `npx prisma migrate dev`
- Check connection strings in `.env.local`
- View Prisma logs: `PRISMA_LOG=query npx prisma db push`

## Production Deployment

1. **Environment Variables**: Set all required env vars in Vercel/hosting platform
2. **Database**: Use managed PostgreSQL (Vercel Postgres, Supabase, etc.)
3. **Run Migrations**: `npx prisma migrate deploy`
4. **Seed Data**: Run seed script to create initial admin user
5. **Build**: `npm run build`
6. **Deploy**: Push to Git (auto-deploy with Vercel) or manual deploy

## Security Notes

- Admin routes protected by NextAuth
- API routes check authentication for mutations
- Passwords hashed with bcrypt
- CSRF protection via NextAuth
- Input validation on all forms
- SQL injection protected by Prisma ORM

## Support

For issues or questions:
1. Check this guide first
2. Review Next.js 15 docs: https://nextjs.org/docs
3. Review Prisma docs: https://www.prisma.io/docs
4. Check application logs

## Version History

- **v1.0** (Current) - Initial CMS with Projects, Gallery, Testimonials, Services, Videos, Innovations
- Bilingual support for EN/AR
- NextAuth authentication
- PostgreSQL + Prisma ORM
