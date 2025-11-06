#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import chalk from 'chalk'

const BACKUP_DIR = path.join(process.cwd(), 'backups')
const TIMESTAMP = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0]

// Ensure backup directory exists
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true })
}

async function backupDatabase() {
  console.log(chalk.blue('📦 Backing up database...'))

  const backupFile = path.join(BACKUP_DIR, `database-${TIMESTAMP}.sql`)

  try {
    // For PostgreSQL (adjust for your database)
    const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL

    if (!databaseUrl) {
      throw new Error('DATABASE_URL not found')
    }

    // Parse database URL
    const url = new URL(databaseUrl)
    const host = url.hostname
    const port = url.port || '5432'
    const database = url.pathname.slice(1)
    const username = url.username
    const password = url.password

    // Create pg_dump command
    const command = `PGPASSWORD="${password}" pg_dump -h ${host} -p ${port} -U ${username} -d ${database} -f ${backupFile}`

    execSync(command, { stdio: 'inherit' })
    console.log(chalk.green(`✓ Database backed up to ${backupFile}`))
  } catch (error) {
    console.error(chalk.red('✗ Database backup failed:'), error)
  }
}

async function backupCode() {
  console.log(chalk.blue('📦 Backing up code...'))

  const backupFile = path.join(BACKUP_DIR, `code-${TIMESTAMP}.tar.gz`)

  try {
    // Exclude node_modules, .next, and other large directories
    const excludes = [
      'node_modules',
      '.next',
      'dist',
      'coverage',
      '.vercel',
      'backups',
      '.git',
    ].map(dir => `--exclude=${dir}`).join(' ')

    execSync(`tar -czf ${backupFile} ${excludes} .`, { stdio: 'inherit' })
    console.log(chalk.green(`✓ Code backed up to ${backupFile}`))
  } catch (error) {
    console.error(chalk.red('✗ Code backup failed:'), error)
  }
}

async function backupAssets() {
  console.log(chalk.blue('📦 Backing up assets...'))

  const publicDir = path.join(process.cwd(), 'public')
  const backupFile = path.join(BACKUP_DIR, `assets-${TIMESTAMP}.tar.gz`)

  try {
    if (fs.existsSync(publicDir)) {
      execSync(`tar -czf ${backupFile} -C ${publicDir} .`, { stdio: 'inherit' })
      console.log(chalk.green(`✓ Assets backed up to ${backupFile}`))
    } else {
      console.log(chalk.yellow('⚠ No public directory found'))
    }
  } catch (error) {
    console.error(chalk.red('✗ Assets backup failed:'), error)
  }
}

async function cleanOldBackups() {
  console.log(chalk.blue('🧹 Cleaning old backups...'))

  const DAYS_TO_KEEP = 30
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - DAYS_TO_KEEP)

  try {
    const files = fs.readdirSync(BACKUP_DIR)
    let deletedCount = 0

    files.forEach(file => {
      const filePath = path.join(BACKUP_DIR, file)
      const stats = fs.statSync(filePath)

      if (stats.mtime < cutoffDate) {
        fs.unlinkSync(filePath)
        deletedCount++
      }
    })

    if (deletedCount > 0) {
      console.log(chalk.green(`✓ Deleted ${deletedCount} old backup(s)`))
    } else {
      console.log(chalk.gray('No old backups to delete'))
    }
  } catch (error) {
    console.error(chalk.red('✗ Cleanup failed:'), error)
  }
}

async function syncToRemote() {
  console.log(chalk.blue('☁️  Syncing to remote storage...'))

  // Example: Sync to Mac Mini external drive
  const REMOTE_PATH = process.env.BACKUP_REMOTE_PATH || '/Volumes/LLM_DATA/backups/kitchen-core'

  try {
    if (fs.existsSync(REMOTE_PATH)) {
      execSync(`rsync -av ${BACKUP_DIR}/ ${REMOTE_PATH}/`, { stdio: 'inherit' })
      console.log(chalk.green('✓ Synced to remote storage'))
    } else {
      console.log(chalk.yellow('⚠ Remote path not found, skipping sync'))
    }
  } catch (error) {
    console.error(chalk.red('✗ Remote sync failed:'), error)
  }
}

async function main() {
  console.log(chalk.bold.blue('\n🔄 Kitchen Core Backup Script\n'))
  console.log(chalk.gray(`Backup date: ${TIMESTAMP}\n`))

  await backupDatabase()
  await backupCode()
  await backupAssets()
  await cleanOldBackups()
  await syncToRemote()

  console.log(chalk.bold.green('\n✅ Backup completed successfully!\n'))
}

main().catch(error => {
  console.error(chalk.red('Fatal error:'), error)
  process.exit(1)
})
