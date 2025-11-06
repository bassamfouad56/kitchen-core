# Page Transitions & Loading Guide

Complete guide for implementing premium page transitions and loading screens in your Next.js 15 App Router application.

## 📦 Components Overview

### 1. **Loading Component** (`app/components/Loading.tsx`)
Full-screen loading indicator with multiple variants.

### 2. **PageTransition Component** (`app/components/PageTransition.tsx`)
Page transition animations with multiple styles.

### 3. **PageTransitionProvider** (`app/components/PageTransitionProvider.tsx`)
Automatic page transitions with route change detection.

### 4. **Custom Hooks** (`app/hooks/useLoading.ts`)
React hooks for managing loading states.

---

## 🚀 Quick Start

### Basic Setup

#### Step 1: Wrap your app with SmoothScroll and PageTransitionProvider

```tsx
// app/layout.tsx
import SmoothScroll from "./components/SmoothScroll";
import PageTransitionProvider from "./components/PageTransitionProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <SmoothScroll>
          <PageTransitionProvider transitionStyle="curtain" showProgress>
            {children}
          </PageTransitionProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
```

#### Step 2: That's it! Transitions happen automatically on route changes.

---

## 🎨 Loading Variants

### 1. **Logo Variant** (Recommended for brand)
```tsx
<Loading variant="logo" fullScreen text="Loading" />
```
- Animated rotating rings
- Center logo/letter
- Glowing effect
- Best for: Homepage, brand pages

### 2. **Spinner Variant**
```tsx
<Loading variant="spinner" fullScreen text="Please wait" />
```
- Dual rotating rings
- Center pulsing dot
- Best for: General pages

### 3. **Dots Variant**
```tsx
<Loading variant="dots" fullScreen text="Loading" />
```
- Three bouncing dots
- Minimal and clean
- Best for: Quick loads, inline loading

### 4. **Pulse Variant**
```tsx
<Loading variant="pulse" fullScreen text="Loading content" />
```
- Expanding rings
- Elegant pulsing effect
- Best for: Content pages, About

### 5. **Progress Variant**
```tsx
<Loading variant="progress" fullScreen text="Preparing" />
```
- Horizontal progress bar
- Shows percentage
- Best for: File uploads, long operations

### 6. **Skeleton Variant**
```tsx
<Loading variant="skeleton" fullScreen={false} />
```
- Content placeholder
- Shimmer effect
- Best for: Inline content loading

---

## 🔀 Transition Styles

### Available Styles

#### 1. **Curtain** (Recommended - Most Premium)
```tsx
<PageTransitionProvider transitionStyle="curtain">
  {children}
</PageTransitionProvider>
```
- Split screen panels
- Center logo animation
- Decorative lines
- Duration: 1000ms

#### 2. **Slide**
```tsx
<PageTransitionProvider transitionStyle="slide">
  {children}
</PageTransitionProvider>
```
- Smooth horizontal slide
- Clean and modern
- Duration: 500ms

#### 3. **Fade**
```tsx
<PageTransitionProvider transitionStyle="fade">
  {children}
</PageTransitionProvider>
```
- Simple cross-fade
- Minimal and fast
- Duration: 300ms

#### 4. **Wipe**
```tsx
<PageTransitionProvider transitionStyle="wipe">
  {children}
</PageTransitionProvider>
```
- Diagonal striped wipe
- Creative and dynamic
- Duration: 700ms

#### 5. **Minimal**
```tsx
<PageTransitionProvider transitionStyle="minimal">
  {children}
</PageTransitionProvider>
```
- Progress bar only
- Ultra-fast
- Duration: 200ms

---

## 🎯 Per-Route Loading

Create custom loading for specific routes by adding `loading.tsx`:

```tsx
// app/[locale]/about/loading.tsx
import Loading from "@/app/components/Loading";

export default function AboutLoading() {
  return <Loading variant="pulse" text="Loading About" />;
}
```

```tsx
// app/admin/loading.tsx
import Loading from "@/app/components/Loading";

export default function AdminLoading() {
  return <Loading variant="spinner" text="Loading Dashboard" />;
}
```

---

## 🪝 Custom Hooks

### useLoading

Track loading state across route changes:

```tsx
import { useLoading } from "@/app/hooks/useLoading";

function MyComponent() {
  const { isLoading, progress, startLoading, stopLoading } = useLoading();

  return (
    <div>
      {isLoading && <p>Loading... {progress}%</p>}
    </div>
  );
}
```

### useAsyncLoading

Handle async operations with loading state:

```tsx
import { useAsyncLoading } from "@/app/hooks/useLoading";

function DataComponent() {
  const { isLoading, error, data, execute } = useAsyncLoading(
    async () => {
      const res = await fetch("/api/data");
      return res.json();
    },
    []
  );

  return (
    <button onClick={execute} disabled={isLoading}>
      {isLoading ? <ButtonLoading /> : "Load Data"}
    </button>
  );
}
```

### useButtonLoading

Manage multiple button loading states:

```tsx
import { useButtonLoading } from "@/app/hooks/useLoading";
import { ButtonLoading } from "@/app/components/Loading";

function FormComponent() {
  const { isLoading, withLoading } = useButtonLoading();

  const handleSubmit = () => {
    withLoading("submit", async () => {
      await fetch("/api/submit", { method: "POST" });
    });
  };

  return (
    <button onClick={handleSubmit} disabled={isLoading("submit")}>
      {isLoading("submit") ? <ButtonLoading /> : "Submit"}
    </button>
  );
}
```

---

## 🎭 Inline Components

### MinimalLoading

For small inline loaders:

```tsx
import { MinimalLoading } from "@/app/components/Loading";

<div className="flex items-center gap-2">
  <MinimalLoading size="sm" />
  <span>Loading...</span>
</div>
```

Sizes: `sm` (16px), `md` (32px), `lg` (48px)

### ButtonLoading

For button loading states:

```tsx
import { ButtonLoading } from "@/app/components/Loading";

<button disabled={loading}>
  {loading ? <ButtonLoading /> : "Submit"}
</button>
```

---

## 🎨 Customization

### Change Colors

Edit the components to match your brand:

```tsx
// In Loading.tsx, change:
className="bg-green-primary" // to your color
className="border-green-vibrant" // to your color
className="text-green-vibrant" // to your color
```

### Adjust Duration

```tsx
<PageTransitionProvider
  transitionStyle="curtain"
  duration={1500} // milliseconds
>
  {children}
</PageTransitionProvider>
```

### Customize Progress Bar

```tsx
<PageTransitionProvider
  showProgress={false} // Hide progress bar
>
  {children}
</PageTransitionProvider>
```

---

## 🏗️ Advanced Usage

### Custom Transition Component

```tsx
import PageTransition from "@/app/components/PageTransition";

export default function Layout({ children }) {
  return (
    <PageTransition variant="wipe">
      {children}
    </PageTransition>
  );
}
```

### Transition Overlay Only

For custom page content with overlay transition:

```tsx
import { TransitionOverlay } from "@/app/components/PageTransition";

export default function Layout({ children }) {
  return (
    <>
      <TransitionOverlay />
      {children}
    </>
  );
}
```

### Minimal Transition

For fastest transitions:

```tsx
import { MinimalTransition } from "@/app/components/PageTransition";

export default function Layout({ children }) {
  return (
    <MinimalTransition>
      {children}
    </MinimalTransition>
  );
}
```

---

## 📱 Examples

### Example 1: E-commerce Product Page

```tsx
// app/products/[id]/loading.tsx
import Loading from "@/app/components/Loading";

export default function ProductLoading() {
  return <Loading variant="skeleton" fullScreen={false} />;
}
```

### Example 2: Dashboard with Progress

```tsx
// app/admin/layout.tsx
import PageTransitionProvider from "@/app/components/PageTransitionProvider";

export default function AdminLayout({ children }) {
  return (
    <PageTransitionProvider transitionStyle="slide" showProgress>
      <div className="dashboard">
        {children}
      </div>
    </PageTransitionProvider>
  );
}
```

### Example 3: Form Submission

```tsx
"use client";

import { useState } from "react";
import { ButtonLoading } from "@/app/components/Loading";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch("/api/contact", { method: "POST" });
      alert("Success!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <button
        type="submit"
        disabled={loading}
        className="bg-green-primary px-6 py-3"
      >
        {loading ? <ButtonLoading /> : "Send Message"}
      </button>
    </form>
  );
}
```

---

## ⚡ Performance Tips

1. **Use Minimal Transitions for Fast Navigation**
   - For admin panels and dashboards

2. **Use Skeleton Loading for Content**
   - Better perceived performance
   - Shows layout structure

3. **Disable Transitions on Slow Connections**
   ```tsx
   const shouldTransition = navigator.connection?.effectiveType !== "slow-2g";
   ```

4. **Lazy Load Heavy Components**
   ```tsx
   const HeavyComponent = dynamic(() => import("./HeavyComponent"), {
     loading: () => <Loading variant="spinner" />,
   });
   ```

---

## 🎯 Best Practices

1. **Match Loading Variant to Content Type**
   - Logo: Homepage, brand pages
   - Skeleton: Content-heavy pages
   - Progress: Long operations
   - Spinner: General pages

2. **Keep Transitions Under 1 Second**
   - Users prefer fast transitions
   - 500-800ms is optimal

3. **Use Progress Bars for Operations > 3 Seconds**
   - File uploads
   - Data processing
   - Batch operations

4. **Provide Visual Feedback Immediately**
   - Show loading state within 100ms
   - Prevents perceived lag

5. **Test on Slow Connections**
   - Chrome DevTools → Network → Slow 3G
   - Ensure good UX even when slow

---

## 🐛 Troubleshooting

### Issue: Flashing Loading Screen

**Solution**: Add minimum delay
```tsx
const { isLoading } = useLoading({ delay: 300 });
```

### Issue: Transition Not Working

**Solution**: Ensure PageTransitionProvider wraps all routes
```tsx
// app/layout.tsx - must be in root layout
<PageTransitionProvider>{children}</PageTransitionProvider>
```

### Issue: Multiple Loading Indicators

**Solution**: Use only one loading method per route
- Either `loading.tsx` OR `<Loading />` component, not both

### Issue: Janky Animations

**Solution**: Use hardware acceleration
```tsx
// Already implemented in components
style={{ willChange: "transform" }}
className="transform-gpu"
```

---

## 📚 Component API Reference

### Loading Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `"spinner" \| "dots" \| "pulse" \| "skeleton" \| "logo" \| "progress"` | `"logo"` | Loading animation style |
| fullScreen | boolean | `true` | Show as full-screen overlay |
| text | string | `"Loading"` | Loading text to display |
| show | boolean | `true` | Control visibility |

### PageTransitionProvider Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| transitionStyle | `"curtain" \| "slide" \| "fade" \| "wipe" \| "minimal"` | `"curtain"` | Transition animation |
| duration | number | `1000` | Transition duration (ms) |
| showProgress | boolean | `true` | Show progress bar |

---

## 🎨 Color Variables

Update these in your Tailwind config:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        "green-primary": "#4ADE80",
        "green-vibrant": "#22C55E",
        "green-darker": "#166534",
      },
    },
  },
};
```

---

## 🚀 Next Steps

1. Choose your preferred transition style
2. Add loading variants to key routes
3. Test on various connection speeds
4. Customize colors to match brand
5. Add route-specific loading screens

---

**Need help?** Check the component files for inline documentation and examples.
