# Backend API Documentation

## Overview

Kitchen Core backend is built with Next.js 15 App Router, featuring:
- **Type-safe APIs** with Zod validation
- **Authentication** via NextAuth.js
- **Rate limiting** with Upstash Redis
- **Database** with Prisma ORM
- **Server Actions** for form handling
- **Comprehensive error handling**

---

## Architecture

```
Backend Structure:
├── app/api/              # API Routes (REST endpoints)
├── lib/
│   ├── api/             # API utilities (auth, response helpers)
│   ├── validations/     # Zod schemas for validation
│   ├── db/              # Database query helpers
│   └── actions/         # Server Actions
```

---

## API Routes

### Projects API

#### GET /api/projects
Get all projects with filtering and pagination

**Query Parameters:**
```typescript
{
  category?: 'PALACE' | 'VILLA' | 'ESTATE' | 'PENTHOUSE'
  featured?: boolean
  published?: boolean
  page?: number (default: 1)
  pageSize?: number (default: 10, max: 100)
}
```

**Response:**
```typescript
{
  success: true
  data: {
    data: Project[]
    pagination: {
      page: number
      pageSize: number
      totalPages: number
      totalCount: number
      hasNext: boolean
      hasPrev: boolean
    }
  }
}
```

**Example:**
```bash
curl "https://api.example.com/api/projects?category=VILLA&page=1&pageSize=10"
```

#### POST /api/projects
Create a new project (requires authentication)

**Headers:**
```
Authorization: Bearer {session_token}
```

**Body:**
```typescript
{
  title: string
  slug: string
  location: string
  category: ProjectCategory
  image: string (URL)
  gallery?: string[] (URLs)
  description: string
  year: string
  area: string
  budget: string
  materials?: string[]
  appliances?: string[]
  features?: string[]
  duration: string
  challenges: string
  innovations?: string[]
  featured?: boolean
  order?: number
  published?: boolean
}
```

#### GET /api/projects/[id]
Get a single project by ID

#### PUT /api/projects/[id]
Update a project (requires authentication)

#### DELETE /api/projects/[id]
Delete a project (requires authentication)

#### GET /api/projects/slug/[slug]
Get a project by slug (public endpoint)

---

### Leads API (CRM)

#### GET /api/leads
Get all leads with filtering (requires authentication)

**Query Parameters:**
```typescript
{
  status?: 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'PROPOSAL_SENT' | 'NEGOTIATING' | 'WON' | 'LOST' | 'ON_HOLD'
  source?: 'WEBSITE' | 'SOCIAL_MEDIA' | 'REFERRAL' | 'ADVERTISING' | 'SHOWROOM' | 'EVENT' | 'PHONE' | 'EMAIL' | 'OTHER'
  priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  assignedTo?: string (user ID)
  page?: number
  pageSize?: number
}
```

#### POST /api/leads
Create a new lead (requires authentication)

**Body:**
```typescript
{
  firstName: string
  lastName: string
  email: string
  phone?: string
  company?: string
  jobTitle?: string
  projectType?: ProjectCategory
  budget?: string
  timeline?: string
  location?: string
  message: string
  source?: LeadSource (default: 'WEBSITE')
  status?: LeadStatus (default: 'NEW')
  priority?: LeadPriority (default: 'MEDIUM')
  tags?: string[]
}
```

#### GET /api/leads/stats
Get lead statistics and metrics (requires authentication)

**Response:**
```typescript
{
  total: number
  byStatus: {
    new: number
    contacted: number
    qualified: number
    won: number
    lost: number
  }
  conversionRate: string (percentage)
}
```

---

### Gallery API

#### GET /api/gallery
Get gallery images with filtering

**Query Parameters:**
```typescript
{
  category?: ProjectCategory
  size?: 'SMALL' | 'MEDIUM' | 'LARGE' | 'WIDE' | 'TALL'
  published?: boolean
  page?: number
  pageSize?: number
}
```

#### POST /api/gallery
Create a new gallery image (requires authentication)

---

### Testimonials API

#### GET /api/testimonials
Get testimonials with filtering

**Query Parameters:**
```typescript
{
  featured?: boolean
  published?: boolean
  rating?: number (1-5)
  page?: number
  pageSize?: number
}
```

#### POST /api/testimonials
Create a new testimonial (requires authentication)

---

### Services API

#### GET /api/services
Get all services

**Query Parameters:**
```typescript
{
  published?: boolean
}
```

#### POST /api/services
Create a new service (requires authentication)

---

### Contact API

#### POST /api/contact
Submit a contact form (rate limited: 3 per hour per IP)

**Body:**
```typescript
{
  name: string
  email: string (valid email)
  phone?: string
  company?: string
  subject?: string
  message: string (min 10 characters)
}
```

**Rate Limiting:**
- 3 submissions per hour per IP address
- Returns 429 if limit exceeded

**Actions:**
1. Validates input with Zod
2. Creates Lead in CRM
3. Creates ContactSubmission record
4. Sends email via Resend
5. Returns success response

---

## Server Actions

Server Actions are used for form submissions and mutations. They automatically handle authentication and revalidation.

### Contact Form Action

```typescript
import { submitContactForm } from '@/lib/actions'

// In a form component
<form action={submitContactForm}>
  <input name="name" required />
  <input name="email" type="email" required />
  <textarea name="message" required />
  <button type="submit">Submit</button>
</form>
```

### Project Actions

```typescript
import { createProjectAction, updateProjectAction, deleteProjectAction } from '@/lib/actions'

// Create
const result = await createProjectAction(formData)

// Update
const result = await updateProjectAction(projectId, formData)

// Delete
const result = await deleteProjectAction(projectId)
```

### Lead Actions

```typescript
import { createLeadAction, updateLeadAction, deleteLeadAction } from '@/lib/actions'

// Create
const result = await createLeadAction(formData)

// Update
const result = await updateLeadAction(leadId, formData)

// Delete
const result = await deleteLeadAction(leadId)
```

---

## Authentication

All protected routes require authentication via NextAuth.js.

### Require Authentication

```typescript
import { requireAuth } from '@/lib/api/auth'

export async function POST(request: NextRequest) {
  await requireAuth() // Throws if not authenticated
  // ... protected logic
}
```

### Require Admin Role

```typescript
import { requireAdmin } from '@/lib/api/auth'

export async function DELETE(request: NextRequest) {
  await requireAdmin() // Throws if not admin
  // ... admin-only logic
}
```

### Get Current User

```typescript
import { getCurrentUser } from '@/lib/api/auth'

export async function GET() {
  const user = await getCurrentUser()
  if (user) {
    // User is logged in
  }
}
```

---

## Validation

All input validation is done with Zod schemas.

### Example: Validating Contact Form

```typescript
import { contactFormSchema } from '@/lib/validations/contact'

const body = await request.json()
const validatedData = contactFormSchema.parse(body)
// validatedData is now type-safe
```

### Available Schemas

- `projectSchema` - Projects
- `galleryImageSchema` - Gallery images
- `testimonialSchema` - Testimonials
- `serviceSchema` - Services
- `leadSchema` - CRM leads
- `contactFormSchema` - Contact form

---

## Error Handling

All API routes use standardized error handling.

### Success Response

```typescript
import { successResponse } from '@/lib/api/response'

return successResponse(data, 'Operation successful', 201)
```

### Error Response

```typescript
import { errorResponse } from '@/lib/api/response'

return errorResponse('Something went wrong', 500)
```

### Automatic Error Handling

```typescript
import { handleApiError } from '@/lib/api/response'

try {
  // ... API logic
} catch (error) {
  return handleApiError(error) // Auto-detects error type
}
```

**Handles:**
- Zod validation errors → 400 with field details
- "not found" errors → 404
- "Unauthorized" errors → 401
- "Forbidden" errors → 403
- Generic errors → 500

---

## Rate Limiting

Rate limiting is automatically applied via middleware to all `/api/` routes.

### Limits

- **API Routes**: 100 req/min per IP
- **Contact Form**: 3 req/hour per IP
- **Auth Routes**: 5 attempts/15 min per IP

### Custom Rate Limiting

```typescript
import { contactLimiter, checkRateLimit, getClientIP } from '@/lib/rate-limit'

const ip = getClientIP(request)
const { success } = await checkRateLimit(contactLimiter, ip)

if (!success) {
  return errorResponse('Rate limit exceeded', 429)
}
```

---

## Database Queries

Use the query helpers for optimized database access.

### Projects

```typescript
import { getProjects, getProjectById, createProject } from '@/lib/db/projects'

const { projects, total } = await getProjects({ category: 'VILLA', page: 1, pageSize: 10 })
const project = await getProjectById('project_id')
const newProject = await createProject(data)
```

### Leads

```typescript
import { getLeads, createLead, getLeadStats } from '@/lib/db/leads'

const { leads, total } = await getLeads({ status: 'NEW', page: 1 })
const stats = await getLeadStats()
```

### Content

```typescript
import {
  getGalleryImages,
  getTestimonials,
  getServices,
  getBlogPosts
} from '@/lib/db/content'

const { images } = await getGalleryImages({ category: 'VILLA' })
const { testimonials } = await getTestimonials({ featured: true })
const services = await getServices()
```

---

## Testing APIs

### Using curl

```bash
# Get projects
curl https://api.example.com/api/projects?page=1&pageSize=10

# Create project (with auth)
curl -X POST https://api.example.com/api/projects \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token={token}" \
  -d '{"title":"New Project","slug":"new-project",...}'

# Submit contact form
curl -X POST https://api.example.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","message":"Hello"}'
```

### Using fetch

```typescript
// Get projects
const response = await fetch('/api/projects?category=VILLA&page=1')
const data = await response.json()

// Create project
const response = await fetch('/api/projects', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(projectData)
})

// Submit contact form
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, message })
})
```

---

## Best Practices

1. **Always validate input** with Zod schemas
2. **Use query helpers** instead of raw Prisma queries
3. **Handle errors** with `handleApiError`
4. **Require auth** for protected routes
5. **Use Server Actions** for form submissions
6. **Revalidate paths** after mutations
7. **Add rate limiting** for public endpoints
8. **Log important events** for debugging

---

## Environment Variables

Required for backend functionality:

```env
# Database
DATABASE_URL="postgresql://..."
POSTGRES_PRISMA_URL="postgresql://..."
POSTGRES_URL_NON_POOLING="postgresql://..."

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret"

# Rate Limiting
UPSTASH_REDIS_REST_URL="https://..."
UPSTASH_REDIS_REST_TOKEN="..."

# Email
RESEND_API_KEY="re_..."
EMAIL_FROM="noreply@yourdomain.com"
EMAIL_REPLY_TO="support@yourdomain.com"
```

---

## Response Format

All API responses follow this standard format:

```typescript
// Success
{
  success: true
  data: any
  message?: string
}

// Error
{
  success: false
  error: string
  details?: any // For validation errors
}

// Paginated
{
  success: true
  data: {
    data: any[]
    pagination: {
      page: number
      pageSize: number
      totalPages: number
      totalCount: number
      hasNext: boolean
      hasPrev: boolean
    }
  }
}
```

---

**Built with enterprise-grade security and performance in mind. 🚀**
