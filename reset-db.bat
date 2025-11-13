@echo off
set PRISMA_USER_CONSENT_FOR_DANGEROUS_AI_ACTION=Yes, reset and reseed the database
pnpm prisma migrate reset --force
