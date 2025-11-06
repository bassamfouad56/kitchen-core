# Implementation Example - Step by Step

## Complete integration of page transitions and loading screens

### Step 1: Update Root Layout

```tsx
// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import PageTransitionProvider from "./components/PageTransitionProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Kitchen Core",
  description: "Premium kitchen design and innovation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable}`}>
        {/* Smooth Scroll Wrapper */}
        <SmoothScroll>
          {/* Page Transition Provider */}
          <PageTransitionProvider
            transitionStyle="curtain" // Choose: curtain, slide, fade, wipe, minimal
            duration={1000}
            showProgress={true}
          >
            {children}
          </PageTransitionProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
```

---

### Step 2: Add Root Loading (Already created)

```tsx
// app/loading.tsx
import Loading from "./components/Loading";

export default function RootLoading() {
  return <Loading variant="logo" fullScreen text="Loading" />;
}
```

---

### Step 3: Add Route-Specific Loading

```tsx
// app/[locale]/about/loading.tsx
import Loading from "@/app/components/Loading";

export default function AboutLoading() {
  return <Loading variant="pulse" fullScreen text="Loading About" />;
}
```

```tsx
// app/admin/loading.tsx
import Loading from "@/app/components/Loading";

export default function AdminLoading() {
  return <Loading variant="spinner" fullScreen text="Loading Dashboard" />;
}
```

---

### Step 4: Use in Components

#### Example 1: Contact Form with Loading

```tsx
// app/components/ContactForm.tsx
"use client";

import { useState } from "react";
import { ButtonLoading } from "./Loading";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const response = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        setSuccess(true);
        e.currentTarget.reset();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <input
          type="email"
          name="email"
          placeholder="Your email"
          required
          className="w-full px-4 py-3 bg-background-elevated border border-gray-dark text-white"
          disabled={loading}
        />
      </div>

      <div>
        <textarea
          name="message"
          placeholder="Your message"
          required
          rows={4}
          className="w-full px-4 py-3 bg-background-elevated border border-gray-dark text-white"
          disabled={loading}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-primary text-black px-8 py-4 text-sm tracking-widest font-medium hover:bg-green-vibrant transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <ButtonLoading />
            <span>SENDING...</span>
          </>
        ) : success ? (
          "MESSAGE SENT ✓"
        ) : (
          "SEND MESSAGE"
        )}
      </button>
    </form>
  );
}
```

---

#### Example 2: Data Fetching with Loading Hook

```tsx
// app/components/ProjectList.tsx
"use client";

import { useEffect, useState } from "react";
import { MinimalLoading } from "./Loading";

interface Project {
  id: string;
  title: string;
  description: string;
}

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const response = await fetch("/api/projects");
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-4">
          <MinimalLoading size="lg" />
          <p className="text-gray-light">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project) => (
        <div key={project.id} className="bg-background-card p-6 border border-gray-dark">
          <h3 className="text-xl font-serif text-white mb-2">{project.title}</h3>
          <p className="text-gray-light">{project.description}</p>
        </div>
      ))}
    </div>
  );
}
```

---

#### Example 3: Multiple Button States

```tsx
// app/admin/components/AdminActions.tsx
"use client";

import { useButtonLoading } from "@/app/hooks/useLoading";
import { ButtonLoading } from "@/app/components/Loading";

export default function AdminActions({ projectId }: { projectId: string }) {
  const { isLoading, withLoading } = useButtonLoading();

  const handlePublish = () => {
    withLoading("publish", async () => {
      await fetch(`/api/projects/${projectId}/publish`, { method: "POST" });
      alert("Published!");
    });
  };

  const handleArchive = () => {
    withLoading("archive", async () => {
      await fetch(`/api/projects/${projectId}/archive`, { method: "POST" });
      alert("Archived!");
    });
  };

  const handleDelete = () => {
    if (!confirm("Are you sure?")) return;

    withLoading("delete", async () => {
      await fetch(`/api/projects/${projectId}`, { method: "DELETE" });
      alert("Deleted!");
    });
  };

  return (
    <div className="flex gap-4">
      <button
        onClick={handlePublish}
        disabled={isLoading("publish")}
        className="px-6 py-2 bg-green-primary text-black disabled:opacity-50"
      >
        {isLoading("publish") ? <ButtonLoading /> : "Publish"}
      </button>

      <button
        onClick={handleArchive}
        disabled={isLoading("archive")}
        className="px-6 py-2 bg-gray-dark text-white disabled:opacity-50"
      >
        {isLoading("archive") ? <ButtonLoading /> : "Archive"}
      </button>

      <button
        onClick={handleDelete}
        disabled={isLoading("delete")}
        className="px-6 py-2 bg-red-600 text-white disabled:opacity-50"
      >
        {isLoading("delete") ? <ButtonLoading /> : "Delete"}
      </button>
    </div>
  );
}
```

---

#### Example 4: Skeleton Loading for Content

```tsx
// app/components/ArticleLoader.tsx
import Loading from "./Loading";

export default function ArticleLoader() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      {/* Use skeleton variant for content placeholders */}
      <Loading variant="skeleton" fullScreen={false} />

      <div className="mt-8 space-y-4">
        {/* Custom skeleton elements */}
        <div className="h-12 bg-gray-dark/30 animate-pulse rounded" />
        <div className="h-4 bg-gray-dark/20 animate-pulse rounded w-3/4" />
        <div className="h-4 bg-gray-dark/20 animate-pulse rounded w-5/6" />
        <div className="h-64 bg-gray-dark/30 animate-pulse rounded mt-8" />
      </div>
    </div>
  );
}
```

---

### Step 5: Test Different Variants

Create a test page to preview all variants:

```tsx
// app/test-loading/page.tsx
"use client";

import { useState } from "react";
import Loading from "@/app/components/Loading";

export default function TestLoadingPage() {
  const [variant, setVariant] = useState<any>("logo");
  const [show, setShow] = useState(true);

  const variants = ["spinner", "dots", "pulse", "skeleton", "logo", "progress"];

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-serif mb-8">Loading Variants Test</h1>

        <div className="flex flex-wrap gap-4 mb-8">
          {variants.map((v) => (
            <button
              key={v}
              onClick={() => {
                setShow(false);
                setVariant(v);
                setTimeout(() => setShow(true), 100);
              }}
              className={`px-6 py-3 border ${
                variant === v
                  ? "border-green-primary bg-green-primary/20"
                  : "border-gray-dark"
              }`}
            >
              {v}
            </button>
          ))}
        </div>

        {show && <Loading variant={variant} fullScreen={false} />}
      </div>
    </div>
  );
}
```

---

### Step 6: Performance Optimization

#### Lazy Load Heavy Components

```tsx
// app/components/HeavyChart.tsx
"use client";

import dynamic from "next/dynamic";
import { MinimalLoading } from "./Loading";

const Chart = dynamic(() => import("./Chart"), {
  loading: () => (
    <div className="flex items-center justify-center h-96">
      <MinimalLoading size="lg" />
    </div>
  ),
  ssr: false,
});

export default function HeavyChart() {
  return <Chart />;
}
```

---

## Quick Reference

### When to Use Which Variant

| Variant | Best For | Speed |
|---------|----------|-------|
| **logo** | Homepage, brand pages | Medium |
| **spinner** | General pages | Fast |
| **dots** | Quick operations | Fast |
| **pulse** | Content pages | Medium |
| **progress** | Long operations (>3s) | N/A |
| **skeleton** | Content placeholders | Fast |

### When to Use Which Transition

| Transition | Best For | Duration |
|------------|----------|----------|
| **curtain** | Premium pages, homepage | 1000ms |
| **slide** | Admin, dashboard | 500ms |
| **fade** | Blog, content | 300ms |
| **wipe** | Creative, portfolio | 700ms |
| **minimal** | Fast navigation | 200ms |

---

## Testing Checklist

- [ ] Test on desktop Chrome
- [ ] Test on mobile Safari
- [ ] Test on slow 3G connection
- [ ] Test rapid navigation (click multiple links fast)
- [ ] Test back/forward browser buttons
- [ ] Test with JavaScript disabled (graceful degradation)
- [ ] Test with screen reader
- [ ] Test loading states for all forms
- [ ] Test loading states for all API calls
- [ ] Verify no layout shift during loading

---

## Common Issues & Solutions

### Issue: Double Loading Indicators

**Problem**: Both `loading.tsx` and `<Loading />` show at once

**Solution**: Remove one - prefer `loading.tsx` for automatic behavior

### Issue: Transition Doesn't Work

**Problem**: PageTransitionProvider not wrapping routes

**Solution**: Must be in root layout, above all pages

### Issue: Slow Animations

**Problem**: Too many animations at once

**Solution**: Reduce animation complexity or disable on slow devices:

```tsx
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
```

---

Ready to implement! Start with Step 1 and work through each example.
