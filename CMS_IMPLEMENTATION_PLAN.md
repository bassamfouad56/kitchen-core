# CMS Implementation Plan - Phase 1 (Critical Interfaces)

## ✅ Completed

### 1. HeroSection Management

**Status:** ✅ Complete
**Files Created:**

- `/app/[locale]/admin/hero/page.tsx` - Server component
- `/app/[locale]/admin/hero/HeroSectionClient.tsx` - Client form
- `/app/[locale]/api/admin/hero/route.ts` - API endpoints

**Functionality:**

- ✅ Create/Update homepage hero section
- ✅ Bilingual support (EN/AR)
- ✅ Badge, Title, Highlighted word, Description
- ✅ Background image URL
- ✅ 2 CTA buttons with links
- ✅ Published status toggle

**Access:** `http://localhost:3000/[locale]/admin/hero`

---

### 2. ProcessStep Management

**Status:** ✅ Partially Complete
**Files Created:**

- `/app/[locale]/admin/process-steps/page.tsx` - List view
- `/app/[locale]/admin/process-steps/ProcessStepsListClient.tsx` - List client

**Still Needed:**

- [ ] `/app/[locale]/admin/process-steps/new/page.tsx` - Create form
- [ ] `/app/[locale]/admin/process-steps/[id]/page.tsx` - Edit form
- [ ] `/app/[locale]/api/admin/process-steps/route.ts` - API endpoints
- [ ] `/app/[locale]/api/admin/process-steps/[id]/route.ts` - Single item API

---

## 🚧 In Progress

### 3. UITranslation Management

**Priority:** Critical
**Status:** Not Started

**Required Files:**

```
/app/[locale]/admin/translations/
├── page.tsx                    # List all translations by category
├── TranslationsListClient.tsx  # Client list with search/filter
├── new/
│   └── page.tsx               # Create new translation
├── [id]/
│   └── page.tsx               # Edit translation

/app/[locale]/api/admin/translations/
├── route.ts                   # GET (list), POST (create)
└── [id]/
    └── route.ts              # GET, PUT, DELETE

```

**Functionality Needed:**

- List all UI translations grouped by category
- Search/filter by key, category, or text
- Add new translation key
- Edit existing translations (EN/AR)
- Delete unused translations
- Bulk import/export (CSV or JSON)
- Preview changes before publishing

**Database Model:**

```typescript
model UITranslation {
  key             String   @unique  // e.g., "navigation.home"
  category        String             // e.g., "navigation", "footer"
  textEn          String
  textAr          String
  description     String?            // Context for translators
  published       Boolean
}
```

---

### 4. Partnership Management

**Priority:** Critical
**Status:** Not Started

**Required Files:**

```
/app/[locale]/admin/partnerships/
├── page.tsx                      # List partnerships
├── PartnershipsListClient.tsx   # Client list
├── new/
│   └── page.tsx                 # Create partnership
├── [id]/
│   └── page.tsx                 # Edit partnership

/app/[locale]/api/admin/partnerships/
├── route.ts                     # GET, POST
└── [id]/
    └── route.ts                # GET, PUT, DELETE
```

**Functionality Needed:**

- Upload partner logos
- Bilingual partner names
- Optional partner URL (link to website)
- Display order management
- Published status

---

### 5. User Management

**Priority:** Critical
**Status:** Not Started

**Required Files:**

```
/app/[locale]/admin/users/
├── page.tsx               # List all admin users
├── UsersListClient.tsx   # Client list
├── new/
│   └── page.tsx          # Create new user
├── [id]/
│   └── page.tsx          # Edit user

/app/[locale]/api/admin/users/
├── route.ts              # GET, POST (with password hashing)
└── [id]/
    └── route.ts         # GET, PUT, DELETE
```

**Functionality Needed:**

- Create new admin users
- Set role (ADMIN, EDITOR)
- Password management (hashed with bcrypt)
- Email validation
- Disable/enable user accounts
- Change own password
- Cannot delete yourself
- Audit log of user actions

**Security:**

- ⚠️ CRITICAL: Hash passwords with bcrypt before storing
- Require strong passwords (min 8 chars, uppercase, number, symbol)
- Email verification for new users
- Session management
- Rate limiting on login attempts

---

### 6. ContactSubmission Viewing

**Priority:** Critical
**Status:** Not Started

**Required Files:**

```
/app/[locale]/admin/contact-submissions/
├── page.tsx                           # List all submissions
├── ContactSubmissionsListClient.tsx  # Client list with filters
├── [id]/
│   └── page.tsx                      # View submission details

/app/[locale]/api/admin/contact-submissions/
├── route.ts                          # GET list
├── [id]/
│   └── route.ts                     # GET, DELETE
└── [id]/mark-processed/
    └── route.ts                     # POST (mark as processed)
```

**Functionality Needed:**

- List all contact form submissions
- Filter by processed/unprocessed
- Search by name, email, or message
- View full submission details
- Mark as processed/unprocessed
- Add internal notes
- Delete spam submissions
- Export to CSV
- Email notifications for new submissions

---

## 📋 Phase 2 (Secondary Features)

### 7. Customer Management (CRM)

**Priority:** High
**Status:** Not Started

**Required Files:**

```
/app/[locale]/admin/customers/
├── page.tsx                   # List customers
├── CustomersListClient.tsx   # Client list
├── new/
│   └── page.tsx              # Create customer
├── [id]/
│   └── page.tsx              # Customer profile
    └── CustomerDetailClient.tsx

/app/[locale]/api/admin/customers/
├── route.ts                  # GET, POST
└── [id]/
    ├── route.ts             # GET, PUT, DELETE
    └── interactions/
        └── route.ts        # GET interactions, POST new
```

**Functionality:**

- Full customer database
- Link to projects
- Interaction history
- Notes and tags
- Customer status management
- Export customer data

---

### 8. BeforeAfter Management

**Priority:** Medium
**Status:** Not Started

---

### 9. TechnicalSpec Management

**Priority:** Medium
**Status:** Not Started

---

### 10. Credential Management

**Priority:** Medium
**Status:** Not Started

---

## 🎯 Quick Implementation Commands

### To Complete ProcessSteps Interface:

```bash
# 1. Create the new/edit pages following the pattern:
# - Copy structure from /admin/team-members/new/page.tsx
# - Adapt for ProcessStep model
# - Include bilingual fields (titleEn, titleAr, descriptionEn, descriptionAr)
# - Add order field for sorting
# - Add iconName field (text input)

# 2. Create API routes:
# - GET /api/admin/process-steps - List all
# - POST /api/admin/process-steps - Create new
# - GET /api/admin/process-steps/[id] - Get one
# - PUT /api/admin/process-steps/[id] - Update
# - DELETE /api/admin/process-steps/[id] - Delete
```

---

## 📊 Implementation Progress

| Interface           | Priority | Status         | Completeness | Est. Time |
| ------------------- | -------- | -------------- | ------------ | --------- |
| HeroSection         | Critical | ✅ Complete    | 100%         | -         |
| ProcessSteps        | Critical | 🟡 Partial     | 40%          | 1h        |
| UITranslations      | Critical | ❌ Not Started | 0%           | 2h        |
| Partnerships        | Critical | ❌ Not Started | 0%           | 1h        |
| User Management     | Critical | ❌ Not Started | 0%           | 3h        |
| Contact Submissions | Critical | ❌ Not Started | 0%           | 1.5h      |
| Customer (CRM)      | High     | ❌ Not Started | 0%           | 3h        |
| BeforeAfter         | Medium   | ❌ Not Started | 0%           | 1h        |
| TechnicalSpec       | Medium   | ❌ Not Started | 0%           | 1h        |
| Credential          | Medium   | ❌ Not Started | 0%           | 1h        |

**Total Estimated Time:** ~14.5 hours for all critical interfaces

---

## 🚀 Next Steps (Priority Order)

1. **Complete ProcessSteps** (1h)
   - Create form pages
   - Create API routes
   - Test CRUD operations

2. **User Management** (3h) - CRITICAL FOR SECURITY
   - Create admin user interface
   - Password hashing with bcrypt
   - Role-based access control
   - Email validation

3. **ContactSubmission Viewing** (1.5h)
   - View submitted contact forms
   - Mark as processed
   - Add notes

4. **UITranslations** (2h)
   - Full text control
   - Category-based organization
   - Bulk import/export

5. **Partnerships** (1h)
   - Logo upload
   - Partner details
   - Display order

6. **Customer Management** (3h)
   - Complete CRM functionality
   - Interaction tracking
   - Project linking

---

## 💡 Code Generation Template

For each remaining interface, follow this pattern:

### 1. Server Page (page.tsx)

```typescript
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import ClientComponent from "./ClientComponent";

export default async function Page({ params }) {
  const { locale } = await params;
  const session = await getServerSession(authOptions);
  if (!session) redirect(`/${locale}/admin/login`);

  const data = await prisma.model.findMany();
  return <ClientComponent data={data} locale={locale} />;
}
```

### 2. Client Component

```typescript
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ClientComponent({ data, locale }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`/${locale}/api/admin/model`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed');
      router.refresh();
      alert('Success!');
    } catch (error) {
      alert('Failed');
    } finally {
      setLoading(false);
    }
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

### 3. API Route (route.ts)

```typescript
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await prisma.model.findMany();
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await request.json();
  const result = await prisma.model.create({ data });
  return NextResponse.json(result);
}
```

---

## ⚠️ Important Notes

### Security Checklist

- [ ] All routes check authentication via getServerSession
- [ ] Passwords are hashed with bcrypt (never stored plain)
- [ ] Input validation on all forms (use Zod)
- [ ] SQL injection prevention (Prisma handles this)
- [ ] XSS prevention (React escapes by default)
- [ ] Rate limiting on sensitive endpoints
- [ ] CSRF protection (Next.js handles this)

### Testing Checklist

- [ ] Create operation works
- [ ] Read/List operation works
- [ ] Update operation works
- [ ] Delete operation works
- [ ] Bilingual fields save correctly
- [ ] Order/sorting works
- [ ] Published status toggle works
- [ ] Form validation prevents empty submissions
- [ ] Error messages display correctly
- [ ] Success messages display correctly
- [ ] Refresh after save works

---

## 📞 Support

For questions or issues during implementation:

1. Check existing admin interfaces (e.g., `/admin/team-members`)
2. Review Prisma schema for field names and types
3. Test with Prisma Studio (`pnpm run db:studio`)
4. Check browser console for errors
5. Check server logs for API errors

---

**Last Updated:** 2025-11-15
**Status:** Phase 1 In Progress (20% Complete)
