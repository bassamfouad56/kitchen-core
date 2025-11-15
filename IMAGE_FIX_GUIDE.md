# دليل إصلاح الصور | Image Fix Guide

**تاريخ | Date:** 2025-11-15
**الحالة | Status:** 17 صورة مفقودة | 17 Missing Images

---

## 📊 ملخص المشاكل | Problem Summary

تم العثور على **17 صورة مفقودة** في الموقع:
**17 missing images** found on the site:

- ✅ **48 صورة موجودة** | **48 Images Present** in public folder
- ❌ **6 صور فريق مفقودة** | **6 Team Photos Missing**
- ❌ **4 صور مشاريع مفقودة** | **4 Project Photos Missing**
- ❌ **4 صور مدونة مفقودة** | **4 Blog Photos Missing**
- ❌ **2 ملفات أساسية مفقودة** | **2 Essential Files Missing**
- ❌ **1 ملف SVG مفقود** | **1 SVG File Missing**

---

## 🔧 الحل السريع | Quick Fix

### الخيار 1: تحديث قاعدة البيانات لاستخدام الصور الموجودة

### Option 1: Update Database to Use Existing Images

**الوضع الحالي | Current Status:**

- قاعدة البيانات تبحث عن | Database is looking for: `/team/sarah.jpg`
- الصورة الموجودة فعلياً | Actual file present: `/team/WhatsApp_Image_2025-10-18_at_17.42.09_446c0a80-removebg-preview.png`

**الحل | Solution:**
افتح لوحة التحكم وحدث مسارات الصور لكل عضو في الفريق
Open admin panel and update image paths for each team member

---

## ✅ الحل المفصل خطوة بخطوة | Detailed Step-by-Step Solution

### 1️⃣ إصلاح صور الفريق (6 صور) | Fix Team Photos (6 images)

#### المشكلة | Problem:

قاعدة البيانات تحتوي على مسارات خاطئة لصور الفريق
Database contains wrong paths for team photos

#### الحل | Solution:

**الخطوة 1 | Step 1:** افتح لوحة التحكم | Open Admin Panel

```
http://localhost:3000/en/admin/team-members
```

**الخطوة 2 | Step 2:** حدث كل عضو بالصورة الصحيحة | Update each member with correct image

| العضو             | Member | الصورة الخاطئة     | Wrong Path | الصورة الصحيحة                                                              | Correct Path |
| ----------------- | ------ | ------------------ | ---------- | --------------------------------------------------------------------------- | ------------ |
| Sarah Al-Mansouri | Sarah  | `/team/sarah.jpg`  | ❌         | `/team/WhatsApp_Image_2025-10-18_at_17.42.09_446c0a80-removebg-preview.png` | ✅           |
| Marco Rossi       | Marco  | `/team/marco.jpg`  | ❌         | `/team/WhatsApp_Image_2025-10-18_at_17.42.10_a00ed2b4-removebg-preview.png` | ✅           |
| Fatima Al-Dosari  | Fatima | `/team/fatima.jpg` | ❌         | `/team/WhatsApp_Image_2025-10-18_at_17.42.11_23cae256-removebg-preview.png` | ✅           |
| David Chen        | David  | `/team/david.jpg`  | ❌         | `/team/WhatsApp_Image_2025-10-18_at_17.42.11_c3be06da-removebg-preview.png` | ✅           |
| Layla Hassan      | Layla  | `/team/layla.jpg`  | ❌         | `/team/WhatsApp_Image_2025-10-18_at_17.42.12_09558bae-removebg-preview.png` | ✅           |
| Ahmed Khalil      | Ahmed  | `/team/ahmed.jpg`  | ❌         | Use any remaining WhatsApp image                                            | ✅           |

**الخطوة 3 | Step 3:** احفظ التغييرات | Save Changes

**الخطوة 4 | Step 4:** تحقق من الصفحة | Verify Page

```
http://localhost:3000/en/about
```

يجب أن ترى صور الفريق تظهر الآن | You should see team photos appearing now

---

### 2️⃣ إصلاح صور المشاريع (4 صور) | Fix Project Photos (4 images)

#### المشكلة | Problem:

قاعدة البيانات تبحث عن صور غير موجودة
Database is looking for missing project images

#### الحل | Solution:

**الخيار أ | Option A:** استخدم الصور الموجودة في مجلدات nass
**Option A:** Use existing images from nass folders

افتح لوحة التحكم | Open Admin Panel:

```
http://localhost:3000/en/admin/projects
```

**المشاريع والصور المتاحة | Projects and Available Images:**

1. **Modern Kitchen** - يبحث عن | looking for: `/projects/modern-1.jpg`
   - استخدم بدلاً منها | Use instead: `/nass0/1.png` (أو أي من 1-7.png)
   - Available: `/nass0/1.png` through `/nass0/7.png` (7 images)

2. **Classic Kitchen** - يبحث عن | looking for: `/projects/classic-1.jpg`
   - استخدم بدلاً منها | Use instead: `/nass1/1.png` (أو أي من 1-3.png)
   - Available: `/nass1/1.png` through `/nass1/3.png` (3 images)

3. **Aluminum Kitchen** - يبحث عن | looking for: `/projects/aluminum-1.jpg`
   - استخدم بدلاً منها | Use instead: `/nass2/1.png` (أو أي من 1-4.png)
   - Available: `/nass2/1.png` through `/nass2/4.png` (4 images)

4. **Bedroom Suite** - يبحث عن | looking for: `/projects/bedroom-1.jpg`
   - استخدم بدلاً منها | Use instead: `/nass3/1.png` (أو أي من 1-5.png)
   - Available: `/nass3/1.png` through `/nass3/5.png` (5 images)

**كيفية التحديث | How to Update:**

1. افتح المشروع في لوحة التحكم | Open project in admin panel
2. في حقل "Image URL"، غير المسار | In "Image URL" field, change path:
   ```
   من | From: /projects/modern-1.jpg
   إلى | To:   /nass0/1.png
   ```
3. احفظ | Save
4. كرر لكل مشروع | Repeat for each project

**الخيار ب | Option B:** ارفع صور جديدة
**Option B:** Upload new images

1. جهز 4 صور للمشاريع | Prepare 4 project images
2. ارفعها إلى | Upload them to: `d:\wbsite\kitchen-core\public\projects\`
3. سمها | Name them:
   - `modern-1.jpg`
   - `classic-1.jpg`
   - `aluminum-1.jpg`
   - `bedroom-1.jpg`

---

### 3️⃣ إصلاح صور المدونة (4 صور) | Fix Blog Photos (4 images)

#### المشكلة | Problem:

مقالات المدونة تبحث عن صور غير موجودة
Blog posts are looking for missing images

#### الحل | Solution:

**الخيار أ | Option A:** استخدم صور مؤقتة موجودة
**Option A:** Use existing temporary images

افتح لوحة التحكم | Open Admin Panel:

```
http://localhost:3000/en/admin/blog
```

**المقالات والصور البديلة | Posts and Alternative Images:**

1. **Luxury Kitchen Design Trends for 2025**
   - يبحث عن | Looking for: `/blog/luxury-trends-2025.jpg`
   - استخدم بدلاً منها | Use instead: `/1.jpg` or `/nass0/1.png`

2. **The Art of Italian Craftsmanship**
   - يبحث عن | Looking for: `/blog/italian-craftsmanship.jpg`
   - استخدم بدلاً منها | Use instead: `/2.jpg` or `/nass1/1.png`

3. **Smart Kitchen Technology**
   - يبحث عن | Looking for: `/blog/smart-kitchen-tech.jpg`
   - استخدم بدلاً منها | Use instead: `/3.jpg` or `/nass2/1.png`

4. **Perfect Countertop Guide**
   - يبحث عن | Looking for: `/blog/countertop-guide.jpg`
   - استخدم بدلاً منها | Use instead: `/4.jpg` or `/nass3/1.png`

**الخيار ب | Option B:** ارفع صور مدونة جديدة
**Option B:** Upload new blog images

1. جهز 4 صور مناسبة للمقالات | Prepare 4 images suitable for blog posts
2. أنشئ مجلد | Create folder: `d:\wbsite\kitchen-core\public\blog\`
3. ارفع الصور وسمها | Upload and name them:
   - `luxury-trends-2025.jpg`
   - `italian-craftsmanship.jpg`
   - `smart-kitchen-tech.jpg`
   - `countertop-guide.jpg`

---

### 4️⃣ إصلاح الملفات الأساسية (3 ملفات) | Fix Essential Files (3 files)

#### المشكلة | Problem:

ملفات أساسية مفقودة من الموقع
Essential files missing from the site

#### الحل | Solution:

**1. favicon.ico** (أيقونة الموقع | Site Icon)

```bash
# الطريقة السريعة | Quick Method:
# انسخ الأيقونة الموجودة | Copy existing icon
copy public\logo.png public\favicon.ico
```

**أو | Or:** ارفع favicon.ico جديد إلى مجلد public

**2. og-image.jpg** (صورة المشاركة على وسائل التواصل | Social Share Image)

```bash
# الطريقة السريعة | Quick Method:
# استخدم صورة موجودة | Use existing image
copy public\1.jpg public\og-image.jpg
```

**أو | Or:** ارفع صورة مخصصة بحجم 1200x630 بكسل

**3. grid.svg** (أيقونة في صفحة الخدمات | Icon in Services Page)

هذا الملف مستخدم في `app/[locale]/services/page.tsx`
This file is used in `app/[locale]/services/page.tsx`

**الخيار أ | Option A:** احذف الإشارة إليه من الكود
**Option A:** Remove reference from code

**الخيار ب | Option B:** أنشئ ملف SVG بسيط
**Option B:** Create simple SVG file

---

## 🎯 الحل الأسرع (10 دقائق) | Fastest Solution (10 minutes)

### استخدم هذا السكريبت لحل كل المشاكل تلقائياً

### Use this script to automatically fix all issues

سأقوم بإنشاء سكريبت يحدث قاعدة البيانات تلقائياً
I will create a script that automatically updates the database

```bash
pnpm run fix-images
```

هذا السكريبت سوف:
This script will:

1. ✅ تحديث مسارات صور الفريق لاستخدام صور WhatsApp الموجودة
   Update team photo paths to use existing WhatsApp images

2. ✅ تحديث مسارات صور المشاريع لاستخدام صور nass الموجودة
   Update project photo paths to use existing nass images

3. ✅ تحديث مسارات صور المدونة لاستخدام صور مؤقتة
   Update blog photo paths to use temporary images

4. ✅ نسخ الملفات الأساسية المفقودة
   Copy missing essential files

---

## 📋 قائمة التحقق النهائية | Final Checklist

بعد تطبيق الحلول، تحقق من:
After applying solutions, verify:

- [ ] افتح `/en/about` وتحقق من ظهور صور الفريق
      Open `/en/about` and verify team photos appear

- [ ] افتح `/en/projects` وتحقق من ظهور صور المشاريع
      Open `/en/projects` and verify project photos appear

- [ ] افتح `/en/blog` وتحقق من ظهور صور المقالات
      Open `/en/blog` and verify blog post images appear

- [ ] افتح `/en/services` وتحقق من عدم وجود أخطاء
      Open `/en/services` and verify no errors

- [ ] تحقق من وجود favicon في التاب
      Verify favicon appears in browser tab

- [ ] شارك رابط على واتساب وتحقق من ظهور الصورة المعاينة
      Share link on WhatsApp and verify preview image appears

---

## 🔄 إعادة تشغيل التدقيق | Re-run Audit

بعد الإصلاح، أعد تشغيل التدقيق للتحقق:
After fixes, re-run audit to verify:

```bash
npx tsx audit-images.ts
```

يجب أن ترى:
You should see:

```
✅ No image issues found! All images are valid.
```

---

## 📞 الدعم | Support

إذا واجهت مشاكل:
If you encounter issues:

1. **استخدم نموذج الإبلاغ عن الأخطاء | Use Bug Report Template:**

   ```
   BUG_REPORT_TEMPLATE.md
   ```

2. **راجع دليل المستخدم | Review User Manual:**

   ```
   USER_MANUAL_AR_EN.md
   ```

3. **تحقق من ملف التسليم | Check Handoff Guide:**
   ```
   CLIENT_HANDOFF_GUIDE.md
   ```

---

**تم إنشاؤه | Generated:** 2025-11-15
**الحالة | Status:** جاهز للتطبيق | Ready to Apply
