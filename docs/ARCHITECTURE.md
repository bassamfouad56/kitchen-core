# Kitchen Core - Architecture Documentation

## Overview

Kitchen Core is an enterprise-grade luxury kitchen design platform built with modern web technologies and best practices.

## Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion + GSAP + Lenis
- **3D Graphics**: Three.js + React Three Fiber
- **State Management**: React Server Components + SWR

### Backend
- **Runtime**: Node.js 20
- **Database**: PostgreSQL (Vercel Postgres)
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **API**: Next.js API Routes + Server Actions
- **Rate Limiting**: Upstash Redis

### AI & ML
- **LLM**: Ollama (Mac Mini)
  - Chat: Llama 3.3
  - Embeddings: nomic-embed-text
  - Vision: LLaVA
  - Code: DeepSeek Coder
- **Search**: Semantic search with cosine similarity

### Infrastructure
- **Hosting**: Vercel
- **CI/CD**: GitHub Actions
- **Monitoring**: Sentry
- **Testing**: Vitest + Playwright + Lighthouse CI
- **Backups**: Automated to Mac Mini external drive

## Project Structure

```
kitchen-core/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Internationalized pages
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes
│   ├── components/        # React components
│   │   └── ui/           # shadcn/ui components
│   └── hooks/            # Custom React hooks
├── lib/                   # Core utilities
│   ├── ai/               # AI integration
│   ├── auth.ts           # NextAuth config
│   ├── prisma.ts         # Prisma client
│   └── rate-limit.ts     # Rate limiting
├── types/                 # TypeScript definitions
├── hooks/                 # Shared hooks
├── styles/                # Global styles
├── prisma/                # Database schema
├── tests/                 # Test suites
│   ├── unit/             # Unit tests
│   ├── integration/      # Integration tests
│   └── e2e/              # E2E tests
├── docs/                  # Documentation
├── marketing/             # Marketing materials
└── .github/workflows/     # CI/CD pipelines
```

## Key Design Decisions

### 1. Server-First Architecture
- Use Server Components by default
- Client Components only when needed (`"use client"`)
- Server Actions for mutations
- API Routes for external integrations

### 2. Type Safety
- Strict TypeScript configuration
- Prisma for type-safe database access
- Zod for runtime validation
- API type definitions in `/types/`

### 3. Performance
- Image optimization with Next.js Image
- Code splitting and lazy loading
- Edge Functions where appropriate
- Lighthouse CI with strict budgets (≥90 scores)

### 4. Security
- Rate limiting on all API routes
- CSRF protection via NextAuth
- Security headers in middleware
- Input validation with Zod
- SQL injection prevention via Prisma

### 5. Internationalization
- next-intl for bilingual support (EN/AR)
- Locale-based routing
- RTL support for Arabic

### 6. Testing Strategy
- Unit tests for utilities and components
- Integration tests for API routes
- E2E tests for critical user flows
- Visual regression tests (planned)
- Coverage threshold: 70%

## Data Flow

### 1. User Request
```
User → Middleware → Route Handler → Server Component → Response
                ↓
         Rate Limiting
         Security Headers
         i18n
```

### 2. API Request
```
Client → API Route → Middleware → Handler → Database → Response
                  ↓
           Rate Limiting
           Authentication
           Validation
```

### 3. Authentication Flow
```
User → Login Form → NextAuth → Database → Session → Protected Route
```

## Database Schema

### Core Models
- **User**: Authentication and authorization
- **Project**: Portfolio projects with full details
- **GalleryImage**: Image collections
- **Testimonial**: Client reviews
- **Service**: Service offerings
- **Video**: Video showcase
- **Innovation**: Technology features

### CRM Models
- **Lead**: Customer inquiries
- **Customer**: Converted leads
- **LeadInteraction**: Communication tracking
- **Task**: Follow-ups and project management

### Content Models
- **BlogPost**: Content marketing
- **Subscriber**: Newsletter management
- **AnalyticsEvent**: Custom analytics
- **Embedding**: AI semantic search

## API Design

### REST Principles
- GET: Retrieve resources
- POST: Create resources
- PUT: Update resources
- DELETE: Remove resources

### Rate Limiting
- API routes: 100 req/min per IP
- Contact form: 3 req/hour per IP
- Auth: 5 attempts per 15 min per IP

### Response Format
```typescript
{
  success: boolean;
  data?: any;
  error?: string;
  message?: string;
}
```

## Deployment

### Environments
- **Development**: Local (http://localhost:3000)
- **Preview**: Vercel preview deployments
- **Production**: Vercel production

### CI/CD Pipeline
1. Lint & Type Check
2. Unit Tests
3. E2E Tests
4. Lighthouse Performance Audit
5. Security Scan
6. Build
7. Deploy

### Environment Variables
See `.env.example` for complete list

## Monitoring & Observability

### Error Tracking (Sentry)
- Client-side errors
- Server-side errors
- Performance monitoring
- Session replays

### Analytics
- Vercel Analytics (Web Vitals)
- Custom analytics (Database)
- Google Analytics (Optional)

### Logging
- API request logging
- Rate limit violations
- Authentication events

## Performance Targets

- Lighthouse Mobile: ≥ 90 (all categories)
- FCP: ≤ 2.0s
- LCP: ≤ 2.5s
- CLS: ≤ 0.1
- TTI: ≤ 3.5s
- Bundle Size: ≤ 200KB first load JS

## Future Enhancements

### Phase 2 (Planned)
- React Hook Form + Zod validation
- Dynamic OG image generation
- Stripe payment integration
- Storybook component library
- Advanced analytics dashboard

### Phase 3 (Future)
- Multi-tenancy support
- White-label solution
- Mobile apps (Expo)
- GraphQL API
- Real-time features (WebSockets)

## Contributing

See CONTRIBUTING.md for development guidelines.

## License

MIT License - See LICENSE for details.
