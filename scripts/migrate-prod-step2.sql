-- Step 2: Update existing data to use new enum values
UPDATE "Project"
SET category = 'MODERN_WOODEN'
WHERE category IN ('PALACE', 'VILLA');

UPDATE "Project"
SET category = 'CLASSIC_WOODEN'
WHERE category = 'ESTATE';

UPDATE "Project"
SET category = 'ALUMINUM'
WHERE category = 'PENTHOUSE';

UPDATE "GalleryImage"
SET category = 'MODERN_WOODEN'
WHERE category IN ('PALACE', 'VILLA');

UPDATE "GalleryImage"
SET category = 'CLASSIC_WOODEN'
WHERE category = 'ESTATE';

UPDATE "GalleryImage"
SET category = 'ALUMINUM'
WHERE category = 'PENTHOUSE';
