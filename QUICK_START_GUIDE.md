# Kitchen Core - Quick Start Guide

## 🚀 Quick Commands

```bash
# Development
pnpm run dev              # Start development server

# Database
pnpm run db:init-company  # Initialize/update company settings
pnpm run db:seed          # Seed database with sample data
pnpm run db:studio        # Open Prisma Studio (database GUI)

# Build & Deploy
pnpm run build            # Build for production
pnpm run start            # Start production server

# Testing
pnpm run type-check       # Check TypeScript errors
pnpm run lint             # Run ESLint
```

---

## 📱 Update Contact Information

**Location:** `/admin/company`

1. Navigate to admin panel
2. Go to "Company" section
3. Update any field:
   - Phone: `+971 55 999 0501`
   - WhatsApp: `+971559990501` (no spaces)
   - Email
   - Social media URLs
4. Click "Save Company Data"
5. Changes appear instantly!

---

## 📄 Important URLs

### Public Pages

- Homepage: `/en` or `/ar`
- Portfolio: `/en/projects`
- Services: `/en/services`
- Gallery: `/en/gallery`
- About: `/en/about`
- Blog: `/en/blog`
- Privacy: `/en/privacy` ✨ NEW
- Terms: `/en/terms` ✨ NEW

### Admin Pages

- Dashboard: `/en/admin`
- Company Settings: `/en/admin/company` ⭐ Update contacts here
- Projects: `/en/admin/projects`
- Services: `/en/admin/services`
- Gallery: `/en/admin/gallery`
- Blog: `/en/admin/blog`

---

## 🎯 What Changed (Summary)

### Phase 1 - SEO Restructuring

✅ Navigation reordered (Portfolio first)
✅ Sitemap optimized
✅ Before/After slider added to services page

### Phase 2 - Legal & Contact Management

✅ Privacy Policy page created (EN + AR)
✅ Terms & Conditions page created (EN + AR)
✅ Contact management system (admin-controlled)
✅ WhatsApp + all social media fields added
✅ Footer enhanced with more links
✅ Sitemap updated with legal pages

---

## 📊 Current Settings

**Phone:** +971 55 999 0501
**WhatsApp:** +971559990501
**Email:** info@kitchencore.com
**Instagram:** https://instagram.com/kitchen_core_uae

_All manageable from `/admin/company`_

---

## 📖 Full Documentation

1. **SEO_RESTRUCTURE_PLAN.md** - Complete 15-phase SEO plan
2. **SEO_IMPLEMENTATION_SUMMARY.md** - Phase 1 details
3. **PHASE_2_COMPLETE.md** - Phase 2 details + how-to guides

---

## ✅ Testing Checklist

Before deploying:

- [ ] Run `pnpm run dev` - Check site loads
- [ ] Visit `/en/privacy` - Legal page works
- [ ] Visit `/en/terms` - Legal page works
- [ ] Visit `/en/admin/company` - Admin loads
- [ ] Update phone number - Save works
- [ ] Check footer links - All working
- [ ] Test navigation menu - Proper order
- [ ] Mobile responsive - Check on phone

---

## 🆘 Need Help?

**Common Issues:**

**Q: Where do I update the phone number?**
A: Go to `/admin/company`, scroll to "Contact Information"

**Q: How do I add social media links?**
A: Same place - `/admin/company`, scroll to "Social Media"

**Q: Privacy/Terms pages showing errors?**
A: Make sure you've run `pnpm run dev` to rebuild

**Q: Changes not appearing?**
A: Hard refresh browser (Ctrl+Shift+R) or restart dev server

---

## 🎉 You're All Set!

Everything is configured and ready to go. The site now has:

- ✅ SEO-optimized structure
- ✅ Professional legal pages
- ✅ Easy contact management
- ✅ Enhanced navigation
- ✅ Better internal linking

**Next:** Test locally, then deploy to production!
