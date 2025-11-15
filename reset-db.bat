@echo off
set PRISMA_USER_CONSENT_FOR_DANGEROUS_AI_ACTION=proceed
pnpm prisma migrate reset --force
