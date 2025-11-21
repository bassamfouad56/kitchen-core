# Language Switching Infinite Refresh Bug - FIXED ✅

## 🐛 Bug Report

**Issue**: When switching to Arabic in the admin panel at `https://kitchen-core.com/admin`, the page entered an infinite refresh loop, making the Arabic interface completely unusable.

**Severity**: 🔴 CRITICAL - Production bug blocking admin usage in Arabic

**Reported**: 2025-11-21

**Fixed**: 2025-11-21

**Commit**: `64a151c`

---

## 🔍 Root Cause Analysis

The infinite refresh loop was caused by a **React useEffect dependency issue** in the `AdminIntlProvider` component.

### The Problem:

```typescript
// BEFORE (Broken Code)
useEffect(() => {
  const saved = localStorage.getItem("adminLocale");
  const currentLocale = saved || "en";
  setLocale(currentLocale);

  // Update HTML attributes
  document.documentElement.lang = currentLocale;
  document.documentElement.dir = currentLocale === "ar" ? "rtl" : "ltr";

  // Load messages
  loadMessages(currentLocale);

  // Listen for language change events
  const handleLocaleChange = (event) => {
    const newLocale = event.detail.locale;
    setLocale(newLocale);
    loadMessages(newLocale);
  };

  window.addEventListener("adminLocaleChange", handleLocaleChange);

  return () => {
    window.removeEventListener("adminLocaleChange", handleLocaleChange);
  };
}, []); // Empty dependency array - but loadMessages is not memoized!

const loadMessages = async (locale) => {
  // ... imports and setMessages
};
```

### Why It Caused an Infinite Loop:

1. **Empty Dependency Array Issue**: The `useEffect` has `[]` as dependencies, but calls `loadMessages` which is declared outside the effect
2. **ESLint Warning Ignored**: React Hook exhaustive-deps rule would have warned about missing `loadMessages` dependency
3. **State Update Cascade**:
   - User clicks language toggle → `adminLocaleChange` event fires
   - Event handler calls `setLocale(newLocale)` → triggers re-render
   - `loadMessages(newLocale)` calls `setMessages()` → triggers another re-render
   - Since `loadMessages` is redeclared on every render, it creates a new function reference
   - This causes the event listener to potentially fire again
4. **No Initialization Guard**: No mechanism to prevent initialization code from running multiple times

---

## ✅ The Solution

### Key Changes:

1. **Separated useEffect into Two Effects**:
   - One for initialization (runs once)
   - One for event listener (stable with memoized callback)

2. **Added useRef for Initialization Guard**:
   - Prevents initialization code from running multiple times
   - More reliable than state-based flag

3. **Memoized loadMessages with useCallback**:
   - Stable function reference across re-renders
   - Prevents unnecessary effect re-runs

4. **Moved HTML Attribute Updates**:
   - Now handled in both initialization AND event handler
   - Ensures attributes stay in sync with locale changes

### Fixed Code:

```typescript
// AFTER (Fixed Code)
import { useCallback, useRef } from "react";

export default function AdminIntlProvider({ children }) {
  const [locale, setLocale] = useState<"en" | "ar">("en");
  const [messages, setMessages] = useState<Record<string, unknown> | null>(
    null,
  );
  const isInitialized = useRef(false); // ✅ Guard flag

  // ✅ Memoized function - stable reference
  const loadMessages = useCallback(async (locale: "en" | "ar") => {
    try {
      const adminMessages = await import(
        `../../../../messages/admin-${locale}.json`
      );
      const publicMessages = await import(
        `../../../../messages/${locale}.json`
      );

      setMessages({
        ...publicMessages.default,
        ...adminMessages.default,
      });
    } catch (error) {
      console.error("Failed to load messages:", error);
      setMessages({});
    }
  }, []);

  // ✅ Effect 1: Initial load only (runs once)
  useEffect(() => {
    if (!isInitialized.current) {
      const saved = localStorage.getItem("adminLocale") as "en" | "ar" | null;
      const currentLocale = saved || "en";
      setLocale(currentLocale);

      document.documentElement.lang = currentLocale;
      document.documentElement.dir = currentLocale === "ar" ? "rtl" : "ltr";

      loadMessages(currentLocale);
      isInitialized.current = true; // ✅ Mark as initialized
    }
  }, [loadMessages]); // Safe - loadMessages is memoized

  // ✅ Effect 2: Event listener (separate concern)
  useEffect(() => {
    const handleLocaleChange = (
      event: CustomEvent<{ locale: "en" | "ar" }>,
    ) => {
      const newLocale = event.detail.locale;
      setLocale(newLocale);

      // ✅ Update HTML attributes immediately
      document.documentElement.lang = newLocale;
      document.documentElement.dir = newLocale === "ar" ? "rtl" : "ltr";

      loadMessages(newLocale);
    };

    window.addEventListener(
      "adminLocaleChange",
      handleLocaleChange as EventListener,
    );

    return () => {
      window.removeEventListener(
        "adminLocaleChange",
        handleLocaleChange as EventListener,
      );
    };
  }, [loadMessages]); // Safe - loadMessages is memoized

  // ... rest of component
}
```

---

## 🎯 Technical Improvements

### 1. useCallback for Stable Function Reference

**Before**: `loadMessages` redeclared on every render
**After**: Memoized with `useCallback` - same reference across renders

### 2. useRef for Initialization Guard

**Before**: No guard - initialization could run multiple times
**After**: `isInitialized.current` prevents duplicate initialization

### 3. Separated Concerns

**Before**: One large `useEffect` doing everything
**After**: Two focused effects with clear responsibilities:

- Effect 1: Initialization (runs once)
- Effect 2: Event handling (always active)

### 4. Proper Dependency Arrays

**Before**: Empty `[]` with missing dependencies
**After**: Includes `[loadMessages]` which is safely memoized

---

## 🧪 Testing Performed

### Manual Testing:

1. ✅ Load admin panel in English - no refresh loop
2. ✅ Switch to Arabic - smooth transition, no refresh
3. ✅ Switch back to English - works correctly
4. ✅ Refresh page in Arabic - stays in Arabic, no loop
5. ✅ Refresh page in English - stays in English
6. ✅ Open new tab with admin - respects saved preference
7. ✅ Clear localStorage - defaults to English correctly

### TypeScript Validation:

```bash
npx tsc --noEmit
# ✅ No errors
```

### Pre-commit Hooks:

```bash
✅ ESLint passed
✅ Prettier passed
✅ Type-check passed
```

---

## 📊 Impact

### Before Fix:

- 🔴 Arabic admin interface completely unusable
- 🔴 Infinite refresh loop on language switch
- 🔴 CPU/memory consumption from continuous refreshes
- 🔴 Poor user experience for Arabic-speaking admins

### After Fix:

- ✅ Smooth language switching in both directions
- ✅ Preferences persist correctly
- ✅ No performance issues
- ✅ Production-ready bilingual admin

---

## 🔗 Related Files

**Modified**:

- [`app/[locale]/admin/components/AdminIntlProvider.tsx`](app/[locale]/admin/components/AdminIntlProvider.tsx) - Core fix

**Related** (No changes needed):

- [`app/[locale]/admin/components/LanguageSwitcher.tsx`](app/[locale]/admin/components/LanguageSwitcher.tsx) - Toggle button (working correctly)
- [`middleware.ts`](middleware.ts) - i18n middleware (working correctly)
- [`i18n/routing.ts`](i18n/routing.ts) - Route configuration (working correctly)

---

## 💡 Lessons Learned

1. **Always Memoize Callbacks Used in Dependencies**: Use `useCallback` for functions referenced in `useEffect` dependencies
2. **Separate Concerns in Effects**: Don't mix initialization and event handling in one `useEffect`
3. **Use useRef for Guards**: Better than state-based flags for initialization checks
4. **Listen to ESLint Warnings**: The exhaustive-deps rule exists for a reason
5. **Test Both Languages**: Language-switching bugs only appear when actually switching

---

## 🚀 Deployment

**Status**: ✅ Deployed to Production

**Commit**: `64a151c`

**Branch**: `main`

**Verification URL**: https://kitchen-core.com/admin

**How to Verify**:

1. Visit https://kitchen-core.com/admin
2. Log in with admin credentials
3. Click the language toggle (العربية / English)
4. Confirm smooth transition without refresh loop
5. Try switching multiple times
6. Refresh the page and confirm language preference persists

---

## 📚 References

- [React useEffect Hook](https://react.dev/reference/react/useEffect)
- [React useCallback Hook](https://react.dev/reference/react/useCallback)
- [React useRef Hook](https://react.dev/reference/react/useRef)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)

---

**Status**: ✅ RESOLVED

**Next Steps**: Resume implementing remaining features (Global Search System next)
