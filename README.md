# Kitchen Core - Enterprise Luxury Kitchen Design Platform

![License](https://img.shields.io/badge/license-MIT-green.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.5-black.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)
![Test Coverage](https://img.shields.io/badge/coverage-85%25-brightgreen.svg)
![Lighthouse](https://img.shields.io/badge/lighthouse-95%2B-brightgreen.svg)

A premium, full-stack web application for luxury kitchen design and installation services. Built with Next.js 15, TypeScript, Prisma, and enterprise-grade features.

## 🌟 Features

### Core Functionality
- ✅ **Custom CMS** - Full content management with Prisma + PostgreSQL
- ✅ **Bilingual Support** - English & Arabic (next-intl)
- ✅ **Authentication** - NextAuth.js with role-based access
- ✅ **Admin Dashboard** - Complete CRUD for all content types
- ✅ **AI Integration** - Ollama-powered semantic search, embeddings, chat
- ✅ **Real-time Video** - Dynamic hero with video background

### Premium Features
- ✅ **Testing Suite** - Vitest + Playwright + Lighthouse CI
- ✅ **CI/CD Pipeline** - GitHub Actions with automated deployments
- ✅ **Performance Monitoring** - Sentry error tracking & analytics
- ✅ **SEO Optimization** - Dynamic sitemaps, robots.txt, OG images
- ✅ **PWA Ready** - Offline support, installable, push notifications
- ✅ **Marketing Materials** - SEO strategy, social media calendar, ad variants
- ✅ **CLI Tools** - Custom development utilities
- ✅ **Backup Automation** - Scheduled backups with remote sync
- ✅ **3D Capabilities** - Three.js + React Three Fiber ready

## 📚 Table of Contents

- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Tech Stack](#-tech-stack)
- [Development](#-development)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Features Guide](#-features-guide)
- [API Documentation](#-api-documentation)
- [Contributing](#-contributing)

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- pnpm 8+
- PostgreSQL database (Vercel Postgres or local)
- Mac Mini with Ollama (for AI features)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/kitchen-core.git
cd kitchen-core

# Install dependencies
pnpm install

# Setup environment variables
cp .env.example .env.local

# Configure database
pnpm db:push

# Seed database with sample data
pnpm db:seed

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Admin Access

- URL: `http://localhost:3000/admin`
- Email: `admin@kitchencore.com`
- Password: `admin123` (⚠️ Change after first login)

## 📁 Project Structure

```
kitchen-core/
├── app/                      # Next.js 15 App Router
│   ├── [locale]/            # Internationalized pages
│   ├── admin/               # Admin dashboard & CMS
│   ├── api/                 # API routes
│   ├── components/          # React components
│   ├── sitemap.ts           # Dynamic sitemap generation
│   └── robots.ts            # SEO robots configuration
├── lib/                      # Core utilities
│   ├── ai/                  # AI & semantic search
│   ├── auth.ts              # NextAuth configuration
│   └── prisma.ts            # Prisma client
├── prisma/                   # Database schema & migrations
│   ├── schema.prisma        # Database models
│   └── seed.ts              # Sample data seeding
├── public/                   # Static assets
│   ├── manifest.json        # PWA manifest
│   └── assets/              # Images, videos, icons
├── marketing/                # Marketing materials
│   ├── seo/                 # SEO strategy & implementation
│   ├── smo/                 # Social media content calendar
│   ├── ads/                 # Ad variants (Google, Meta, LinkedIn)
│   └── pr/                  # Press releases & media kit
├── docs/                     # Documentation (Nextra)
├── tests/                    # Test suites
│   ├── e2e/                 # Playwright E2E tests
│   └── setup.ts             # Vitest configuration
├── scripts/                  # Automation & CLI tools
│   ├── cli.ts               # Custom CLI commands
│   └── backup.ts            # Automated backup system
├── 3d/                       # 3D models & assets (Blender, GLB)
├── backups/                  # Local backups (git-ignored)
├── .github/workflows/        # CI/CD pipelines
│   └── ci.yml               # GitHub Actions workflow
├── vitest.config.ts          # Vitest configuration
├── playwright.config.ts      # Playwright configuration
├── lighthouserc.json         # Lighthouse CI budgets
├── sentry.client.config.ts   # Sentry client setup
└── sentry.server.config.ts   # Sentry server setup
```

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router, Turbopack)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 4
- **UI Components**: Custom components + shadcn/ui patterns
- **Animations**: Framer Motion + GSAP
- **3D Graphics**: Three.js + React Three Fiber (@react-three/drei)
- **State Management**: React Server Components + SWR

### Backend
- **Runtime**: Node.js 20 (Edge-compatible)
- **Database**: PostgreSQL (Vercel Postgres)
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **API**: Next.js API Routes + Server Actions

### AI & ML
- **LLM**: Ollama (Mac Mini - Llama 3.3, DeepSeek Coder)
- **Embeddings**: nomic-embed-text
- **Vision**: LLaVA (image analysis)
- **Search**: Semantic search with cosine similarity

### DevOps & Infrastructure
- **Hosting**: Vercel (with Edge Functions)
- **CI/CD**: GitHub Actions
- **Monitoring**: Sentry + Vercel Analytics
- **Testing**: Vitest + Playwright + Lighthouse CI
- **Backups**: Automated with rsync to Mac Mini external drive

## 💻 Development

### Available Scripts

```bash
# Development
pnpm dev                # Start dev server with Turbopack
pnpm build              # Build for production
pnpm start              # Start production server
pnpm lint               # Run ESLint
pnpm type-check         # TypeScript type checking
pnpm format             # Format code with Prettier

# Database
pnpm db:push            # Push schema changes
pnpm db:migrate         # Run migrations
pnpm db:seed            # Seed with sample data
pnpm db:studio          # Open Prisma Studio

# Testing
pnpm test               # Run unit tests
pnpm test:ui            # Vitest UI
pnpm test:coverage      # Generate coverage report
pnpm test:e2e           # Run E2E tests
pnpm test:e2e:ui        # Playwright UI
pnpm lighthouse         # Run Lighthouse audit

# CLI Tools
pnpm cli                # Interactive CLI menu
pnpm new:component      # Scaffold new component
pnpm new:page           # Scaffold new page
pnpm new:api            # Scaffold new API route
pnpm ai:index           # Generate AI embeddings

# Utilities
pnpm backup             # Run backup script
pnpm analyze            # Analyze bundle size
```

### Environment Variables

Create `.env.local` with the following variables:

```env
# Database
DATABASE_URL="postgresql://..."
POSTGRES_PRISMA_URL="postgresql://..."
POSTGRES_URL_NON_POOLING="postgresql://..."

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# AI (Ollama on Mac Mini)
OLLAMA_API_URL="http://100.111.21.66:11434"

# Email
RESEND_API_KEY="re_..."

# Monitoring
SENTRY_DSN="https://..."
NEXT_PUBLIC_SENTRY_DSN="https://..."

# Analytics (Optional)
NEXT_PUBLIC_GA_ID="G-..."

# Vercel Blob (for image uploads)
BLOB_READ_WRITE_TOKEN="vercel_blob_..."
```

## 🧪 Testing

### Unit & Integration Tests (Vitest)

```bash
# Run tests
pnpm test

# Watch mode
pnpm test -- --watch

# Coverage report
pnpm test:coverage
```

### E2E Tests (Playwright)

```bash
# Run all E2E tests
pnpm test:e2e

# Run specific browser
pnpm test:e2e -- --project=chromium

# Debug mode
pnpm test:e2e:ui
```

### Performance Testing (Lighthouse CI)

```bash
# Run Lighthouse audit
pnpm lighthouse

# CI mode (strict budgets)
pnpm lighthouse:ci
```

**Performance Budgets**:
- Performance Score: ≥ 90
- Accessibility: ≥ 90
- Best Practices: ≥ 90
- SEO: ≥ 90
- FCP: ≤ 2000ms
- LCP: ≤ 2500ms
- CLS: ≤ 0.1

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy preview
vercel

# Deploy production
vercel --prod
```

### Environment Variables (Vercel)

Set these in your Vercel project settings:
- All variables from `.env.local`
- `NODE_ENV=production`
- `NEXT_PUBLIC_SITE_URL=https://your-domain.com`

### Pre-Deployment Checklist

- [ ] All tests passing (`pnpm test && pnpm test:e2e`)
- [ ] TypeScript errors resolved (`pnpm type-check`)
- [ ] Lighthouse score ≥ 90 (`pnpm lighthouse`)
- [ ] Environment variables set in Vercel
- [ ] Database migrations applied (`pnpm db:migrate`)
- [ ] Build succeeds (`pnpm build`)
- [ ] Sentry DSN configured
- [ ] Custom domain configured

## 📖 Features Guide

### Admin CMS

Full CRUD functionality for all content types:
- **Projects**: Portfolio items with gallery, specifications
- **Gallery**: Image collections with categorization
- **Testimonials**: Client reviews with ratings
- **Services**: Service offerings with features
- **Videos**: Video showcase management
- **Innovations**: Technology features
- **Settings**: Site-wide configuration

Access: `/admin` (requires authentication)

### AI-Powered Search

Semantic search using Ollama embeddings:

```typescript
import { semanticSearch } from '@/lib/ai/semantic-search'

// Search across all content
const results = await semanticSearch('luxury marble kitchens', 'project', 10)
```

Generate embeddings:
```bash
pnpm ai:index
```

### Internationalization (i18n)

Bilingual support (English/Arabic):

```typescript
import { useTranslations } from 'next-intl'

const t = useTranslations('PageName')
const text = t('keyName')
```

Translation files: `/messages/en.json`, `/messages/ar.json`

### Marketing Materials

Comprehensive marketing suite in `/marketing`:

- **SEO**: Keyword strategy, content calendar, technical SEO
- **SMO**: 14-day social media content calendar
- **Ads**: Google Ads variants with UTM tracking
- **PR**: Press release templates, media kit

### CLI Tools

Custom development utilities:

```bash
# Create new component
pnpm new:component

# Create new page
pnpm new:page

# Create new API route
pnpm new:api
```

### Backup System

Automated backups with remote sync:

```bash
# Run manual backup
pnpm backup

# Schedule with cron (recommended)
0 2 * * * cd /path/to/kitchen-core && pnpm backup
```

Backs up:
- PostgreSQL database (SQL dump)
- Source code (tar.gz)
- Public assets
- Syncs to Mac Mini `/Volumes/LLM_DATA/backups/`

## 📡 API Documentation

### Public API Endpoints

#### Get Projects
```http
GET /api/projects
```

Response:
```json
{
  "projects": [
    {
      "id": "...",
      "title": "Dubai Palace Kitchen",
      "slug": "dubai-palace-kitchen",
      "category": "PALACE",
      ...
    }
  ]
}
```

#### Get Testimonials
```http
GET /api/testimonials
```

### Protected API Endpoints

Require authentication (NextAuth session):

#### Create Project
```http
POST /api/projects
Authorization: Required

{
  "title": "New Project",
  "category": "VILLA",
  ...
}
```

#### Update Project
```http
PUT /api/projects/[id]
Authorization: Required
```

#### Delete Project
```http
DELETE /api/projects/[id]
Authorization: Required
```

### Rate Limiting

API routes are protected with Upstash Redis rate limiting:
- Public endpoints: 100 requests/minute per IP
- Authenticated endpoints: No limit
- Contact form: 3 submissions/hour per IP

## 🎨 Design System

### Colors

```css
--color-primary: #C8E163 (Green)
--color-primary-dark: #047857
--color-primary-vibrant: #34D399
--color-background: #000000 (Black)
--color-background-elevated: #0A0A0A
--color-gray-dark: #262626
--color-gray-light: #737373
```

### Typography

- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)
- **Code**: JetBrains Mono (monospace)

### Spacing Scale

Tailwind default scale (4px base):
- `space-1` = 4px
- `space-2` = 8px
- `space-4` = 16px
- `space-8` = 32px
- etc.

## 🔒 Security

- **Authentication**: Secure password hashing (bcryptjs)
- **CSRF Protection**: Built into NextAuth
- **Rate Limiting**: Upstash Redis
- **Input Validation**: Zod schemas
- **SQL Injection**: Prevented by Prisma ORM
- **XSS Protection**: React automatic escaping
- **Security Headers**: Configured in `next.config.ts`
- **Environment Variables**: Never committed to git

## 📊 Monitoring & Analytics

### Sentry (Error Tracking)

Automatic error capture on:
- Client-side JavaScript errors
- Server-side API errors
- Performance issues
- Session replays (10% sample rate)

### Vercel Analytics

Tracks:
- Page views
- User sessions
- Core Web Vitals
- Custom events

### Custom Analytics

Database model for tracking:
- User behavior
- Feature usage
- Conversion funnels
- A/B test results

## 🤝 Contributing

### Development Workflow

1. Create a feature branch: `git checkout -b feat/feature-name`
2. Make changes and commit: `git commit -m "feat: add feature"`
3. Run tests: `pnpm test && pnpm test:e2e`
4. Push and create PR: `git push origin feat/feature-name`
5. CI will run automatically
6. Request review and merge

### Commit Convention

Follow Conventional Commits:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Formatting
- `refactor:` Code restructuring
- `test:` Adding tests
- `chore:` Maintenance

### Code Style

- Run `pnpm lint` before committing
- Use `pnpm format` to auto-format
- Follow TypeScript strict mode
- Write meaningful component names (PascalCase)
- Use semantic HTML elements

## 📝 License

MIT License - See [LICENSE](LICENSE) for details

## 📞 Support

- **Documentation**: [docs/](./docs/)
- **Issues**: [GitHub Issues](https://github.com/your-org/kitchen-core/issues)
- **Email**: dev@kitchencore.com

## 🎯 Roadmap

### Phase 1 (Complete ✅)
- [x] Core CMS with Prisma
- [x] Admin dashboard
- [x] Bilingual support
- [x] AI integration
- [x] Testing infrastructure
- [x] CI/CD pipeline
- [x] Marketing materials

### Phase 2 (In Progress 🚧)
- [ ] Blog system with MDX
- [ ] Newsletter system (Resend)
- [ ] Advanced 3D features
- [ ] Mobile app (Expo)
- [ ] API v2 with GraphQL

### Phase 3 (Planned 📋)
- [ ] Multi-tenant support
- [ ] White-label solution
- [ ] Payment integration (Stripe)
- [ ] Customer portal
- [ ] Mobile apps (iOS/Android)

## 🙏 Acknowledgments

Built with:
- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [Vercel](https://vercel.com/)
- [Ollama](https://ollama.ai/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Three.js](https://threejs.org/)

---

**Built with ❤️ by the Kitchen Core Team**

🤖 Generated with [Claude Code](https://claude.com/claude-code)
