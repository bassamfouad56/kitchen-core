-- Migration script to update ProjectCategory enum in production
-- Step 1: Add new enum values
ALTER TYPE "ProjectCategory" ADD VALUE IF NOT EXISTS 'MODERN_WOODEN';
ALTER TYPE "ProjectCategory" ADD VALUE IF NOT EXISTS 'CLASSIC_WOODEN';
ALTER TYPE "ProjectCategory" ADD VALUE IF NOT EXISTS 'ALUMINUM';
ALTER TYPE "ProjectCategory" ADD VALUE IF NOT EXISTS 'BEDROOMS';

-- Step 2: Update existing projects to new categories
UPDATE "Project"
SET category = 'MODERN_WOODEN'
WHERE category IN ('PALACE', 'VILLA');

UPDATE "Project"
SET category = 'CLASSIC_WOODEN'
WHERE category = 'ESTATE';

UPDATE "Project"
SET category = 'ALUMINUM'
WHERE category = 'PENTHOUSE';

-- Step 3: Update GalleryImage if needed
UPDATE "GalleryImage"
SET category = 'MODERN_WOODEN'
WHERE category IN ('PALACE', 'VILLA');

UPDATE "GalleryImage"
SET category = 'CLASSIC_WOODEN'
WHERE category = 'ESTATE';

UPDATE "GalleryImage"
SET category = 'ALUMINUM'
WHERE category = 'PENTHOUSE';

-- Note: Cannot remove old enum values while they're in use
-- The old values (PALACE, VILLA, ESTATE, PENTHOUSE) will be cleaned up by prisma db push
