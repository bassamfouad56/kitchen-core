# Load environment variables from .env file
Get-Content .env | ForEach-Object {
    if ($_ -match '^([^#].+?)=(.*)$') {
        $name = $matches[1].Trim()
        $value = $matches[2].Trim().Trim('"')
        [Environment]::SetEnvironmentVariable($name, $value, 'Process')
        Write-Host "Set $name" -ForegroundColor Green
    }
}

Write-Host "`n=== Database Connection Info ===" -ForegroundColor Cyan
Write-Host "POSTGRES_PRISMA_URL: $env:POSTGRES_PRISMA_URL" -ForegroundColor Yellow

Write-Host "`n=== Pushing Schema to Database ===" -ForegroundColor Cyan
pnpm prisma db push --accept-data-loss

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n=== Generating Prisma Client ===" -ForegroundColor Cyan
    pnpm prisma generate

    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n=== Seeding Database ===" -ForegroundColor Cyan
        pnpm db:seed

        if ($LASTEXITCODE -eq 0) {
            Write-Host "`n✅ Database setup complete!" -ForegroundColor Green
        } else {
            Write-Host "`n❌ Seeding failed!" -ForegroundColor Red
        }
    } else {
        Write-Host "`n❌ Prisma generate failed!" -ForegroundColor Red
    }
} else {
    Write-Host "`n❌ Database push failed!" -ForegroundColor Red
}
