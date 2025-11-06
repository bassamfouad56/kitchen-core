#!/usr/bin/env node

import { Command } from 'commander'
import inquirer from 'inquirer'
import chalk from 'chalk'
import fs from 'fs'
import path from 'path'

const program = new Command()

program
  .name('kitchen-core-cli')
  .description('CLI tool for Kitchen Core development')
  .version('1.0.0')

// Generate new component
program
  .command('new:component')
  .description('Create a new React component')
  .action(async () => {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Component name (PascalCase):',
        validate: (input) => /^[A-Z][a-zA-Z0-9]*$/.test(input) || 'Must be PascalCase',
      },
      {
        type: 'list',
        name: 'type',
        message: 'Component type:',
        choices: ['Client Component', 'Server Component'],
      },
    ])

    const { name, type } = answers
    const isClient = type === 'Client Component'
    const filePath = path.join(process.cwd(), 'app', 'components', `${name}.tsx`)

    const template = `${isClient ? '"use client"\n\n' : ''}interface ${name}Props {
  // Add your props here
}

export default function ${name}({ }: ${name}Props) {
  return (
    <div>
      <h2>${name}</h2>
    </div>
  )
}
`

    fs.writeFileSync(filePath, template)
    console.log(chalk.green(`✓ Created ${name} at ${filePath}`))
  })

// Generate new API route
program
  .command('new:api')
  .description('Create a new API route')
  .action(async () => {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'path',
        message: 'API route path (e.g., users, posts/[id]):',
      },
    ])

    const routePath = path.join(process.cwd(), 'app', 'api', answers.path, 'route.ts')
    const dir = path.dirname(routePath)

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    const template = `import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    // Implement GET logic
    return NextResponse.json({ message: 'GET request successful' })
  } catch (error) {
    return NextResponse.json({ error: 'Request failed' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    // Implement POST logic

    return NextResponse.json({ message: 'POST request successful' })
  } catch (error) {
    return NextResponse.json({ error: 'Request failed' }, { status: 500 })
  }
}
`

    fs.writeFileSync(routePath, template)
    console.log(chalk.green(`✓ Created API route at ${routePath}`))
  })

// Generate new page
program
  .command('new:page')
  .description('Create a new Next.js page')
  .action(async () => {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'path',
        message: 'Page path (e.g., about, blog/[slug]):',
      },
      {
        type: 'list',
        name: 'type',
        message: 'Page type:',
        choices: ['Client Page', 'Server Page'],
      },
    ])

    const { path: pagePath, type } = answers
    const isClient = type === 'Client Page'
    const filePath = path.join(process.cwd(), 'app', pagePath, 'page.tsx')
    const dir = path.dirname(filePath)

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    const pageName = pagePath.split('/').pop() || 'Page'
    const componentName = pageName.charAt(0).toUpperCase() + pageName.slice(1) + 'Page'

    const template = `${isClient ? '"use client"\n\n' : ''}export default function ${componentName}() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-serif mb-8">${componentName}</h1>
        {/* Page content here */}
      </div>
    </div>
  )
}
`

    fs.writeFileSync(filePath, template)
    console.log(chalk.green(`✓ Created page at ${filePath}`))
  })

// Database seed
program
  .command('db:seed')
  .description('Seed the database with sample data')
  .action(async () => {
    console.log(chalk.blue('Seeding database...'))
    const { execSync } = await import('child_process')
    try {
      execSync('npx prisma db seed', { stdio: 'inherit' })
      console.log(chalk.green('✓ Database seeded successfully'))
    } catch (error) {
      console.error(chalk.red('✗ Failed to seed database'))
    }
  })

// Database studio
program
  .command('db:studio')
  .description('Open Prisma Studio')
  .action(async () => {
    console.log(chalk.blue('Opening Prisma Studio...'))
    const { execSync } = await import('child_process')
    execSync('npx prisma studio', { stdio: 'inherit' })
  })

// Generate embeddings
program
  .command('ai:index')
  .description('Generate AI embeddings for search')
  .action(async () => {
    console.log(chalk.blue('Generating embeddings...'))
    const { initializeSearchIndexes } = await import('../lib/ai/semantic-search')
    try {
      await initializeSearchIndexes()
      console.log(chalk.green('✓ Embeddings generated successfully'))
    } catch (error) {
      console.error(chalk.red('✗ Failed to generate embeddings'))
    }
  })

// Build for production
program
  .command('build')
  .description('Build for production with checks')
  .action(async () => {
    console.log(chalk.blue('Running pre-build checks...'))
    const { execSync } = await import('child_process')

    try {
      console.log(chalk.blue('1. Type checking...'))
      execSync('tsc --noEmit', { stdio: 'inherit' })

      console.log(chalk.blue('2. Linting...'))
      execSync('npm run lint', { stdio: 'inherit' })

      console.log(chalk.blue('3. Building...'))
      execSync('npm run build', { stdio: 'inherit' })

      console.log(chalk.green('✓ Build completed successfully'))
    } catch (error) {
      console.error(chalk.red('✗ Build failed'))
      process.exit(1)
    }
  })

program.parse()
