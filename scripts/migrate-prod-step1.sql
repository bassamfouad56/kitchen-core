-- Step 1: Add new enum values (must be in separate transaction)
ALTER TYPE "ProjectCategory" ADD VALUE IF NOT EXISTS 'MODERN_WOODEN';
ALTER TYPE "ProjectCategory" ADD VALUE IF NOT EXISTS 'CLASSIC_WOODEN';
ALTER TYPE "ProjectCategory" ADD VALUE IF NOT EXISTS 'ALUMINUM';
ALTER TYPE "ProjectCategory" ADD VALUE IF NOT EXISTS 'BEDROOMS';
