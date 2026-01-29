# دليل المستخدم الشامل | Complete User Manual

**لوحة التحكم - Kitchen Core Admin Dashboard**

---

## 📚 جدول المحتويات | Table of Contents

1. [كيفية تسجيل الدخول | How to Login](#login)
2. [لوحة التحكم الرئيسية | Main Dashboard](#dashboard)
3. [إدارة الشركة | Company Management](#company)
4. [إدارة المشاريع | Projects Management](#projects)
5. [إدارة الخدمات | Services Management](#services)
6. [إدارة المعرض | Gallery Management](#gallery)
7. [إدارة المدونة | Blog Management](#blog)
8. [إدارة المؤسس | Founder Management](#founder)
9. [إدارة الفريق | Team Management](#team)
10. [الاختبار | Testing Guide](#testing)
11. [نظام التبليغ عن المشاكل | Bug Reporting System](#reporting)

---

<a name="login"></a>

## 1️⃣ كيفية تسجيل الدخول | How to Login

### الخطوات | Steps:

**بالعربي:**

1. افتح المتصفح
2. اذهب إلى: `http://localhost:3000/en/admin` (محلي) أو `https://kitchen-core.com/en/admin` (إنتاج)
3. أدخل البريد الإلكتروني وكلمة المرور
4. اضغط "تسجيل الدخول"

**In English:**

1. Open browser
2. Go to: `http://localhost:3000/en/admin` (local) or `https://kitchen-core.com/en/admin` (production)
3. Enter email and password
4. Click "Login"

### ماذا تتوقع | What to Expect:

- ✅ **الناجح | Success**: تظهر لوحة التحكم الرئيسية
- ❌ **الفشل | Failure**: رسالة خطأ "بيانات غير صحيحة"

### المشاكل الشائعة | Common Issues:

| المشكلة           | Problem         | الحل                  | Solution                |
| ----------------- | --------------- | --------------------- | ----------------------- |
| كلمة المرور خاطئة | Wrong password  | أعد إدخال كلمة المرور | Re-enter password       |
| الصفحة لا تفتح    | Page won't load | تأكد من تشغيل السيرفر | Check server is running |
| "Unauthorized"    | "Unauthorized"  | تحتاج صلاحيات الأدمن  | Need admin permissions  |

---

<a name="dashboard"></a>

## 2️⃣ لوحة التحكم الرئيسية | Main Dashboard

### الموقع | Location:

`/en/admin` أو `/ar/admin`

### ماذا ترى | What You See:

**بالعربي:**

- عدد المشاريع المنشورة
- عدد المنشورات في المدونة
- عدد الصور في المعرض
- روابط سريعة لجميع الأقسام

**In English:**

- Number of published projects
- Number of blog posts
- Number of gallery images
- Quick links to all sections

### القوائم الجانبية | Sidebar Menus:

```
📊 Dashboard (لوحة التحكم)
🏢 Company (معلومات الشركة)
📁 Projects (المشاريع)
🛠️ Services (الخدمات)
🖼️ Gallery (المعرض)
📝 Blog (المدونة)
👤 Founder (المؤسس)
👥 Team (الفريق)
```

### اختبار | Testing:

- [ ] جميع الروابط تعمل
- [ ] الأرقام الإحصائية صحيحة
- [ ] القائمة الجانبية تظهر بشكل صحيح

---

<a name="company"></a>

## 3️⃣ إدارة معلومات الشركة | Company Management

### الموقع | Location:

`/en/admin/company`

### ⭐ هذا القسم مهم جداً! | This Section is Very Important!

### ما يمكنك تعديله | What You Can Edit:

#### أ) معلومات الاتصال | Contact Information

| الحقل      | Field        | مثال                 | Example              | إلزامي؟ | Required? |
| ---------- | ------------ | -------------------- | -------------------- | ------- | --------- |
| **الهاتف** | **Phone**    | +971 55 999 0501     | +971 55 999 0501     | ✅ نعم  | ✅ Yes    |
| **واتساب** | **WhatsApp** | +971559990501        | +971559990501        | ✅ نعم  | ✅ Yes    |
| **البريد** | **Email**    | info@kitchencore.com | info@kitchencore.com | ✅ نعم  | ✅ Yes    |

**ملاحظة مهمة | Important Note:**

- رقم الهاتف: استخدم **مسافات** (للعرض)
- رقم واتساب: **بدون مسافات** (للرابط)

**مثال صحيح | Correct Example:**

```
Phone:    +971 55 999 0501      ✅ (مع مسافات للعرض الجميل)
WhatsApp: +971559990501         ✅ (بدون مسافات للرابط)
```

#### ب) وسائل التواصل الاجتماعي | Social Media

| المنصة    | Platform  | مثال الرابط                               | Example URL                               |
| --------- | --------- | ----------------------------------------- | ----------------------------------------- |
| Instagram | Instagram | https://instagram.com/kitchen_core_uae    | https://instagram.com/kitchen_core_uae    |
| Facebook  | Facebook  | https://facebook.com/kitchencore          | https://facebook.com/kitchencore          |
| LinkedIn  | LinkedIn  | https://linkedin.com/company/kitchen-core | https://linkedin.com/company/kitchen-core |
| Twitter   | Twitter   | https://twitter.com/kitchencore           | https://twitter.com/kitchencore           |
| YouTube   | YouTube   | https://youtube.com/@kitchencore          | https://youtube.com/@kitchencore          |
| TikTok    | TikTok    | https://tiktok.com/@kitchencore           | https://tiktok.com/@kitchencore           |

#### ج) الصور | Images

| الصورة         | Image          | الحجم الموصى به | Recommended Size |
| -------------- | -------------- | --------------- | ---------------- |
| شعار الشركة    | Company Logo   | 500x500 بكسل    | 500x500 pixels   |
| الصورة المميزة | Featured Image | 1200x630 بكسل   | 1200x630 pixels  |

### خطوات التحديث | Update Steps:

**بالعربي:**

1. اذهب إلى `/en/admin/company`
2. عدل الحقول المطلوبة
3. اضغط **"Save Company Data"**
4. انتظر رسالة التأكيد "Company updated successfully"
5. افتح الموقع الرئيسي للتحقق من التغييرات

**In English:**

1. Go to `/en/admin/company`
2. Edit the required fields
3. Click **"Save Company Data"**
4. Wait for "Company updated successfully" message
5. Open main site to verify changes

### ماذا تتوقع | What to Expect:

- ✅ رسالة خضراء: "Company updated successfully"
- ✅ الأرقام تتحدث في Footer (الذيل)
- ✅ زر واتساب يعمل بالرقم الجديد
- ✅ روابط وسائل التواصل تعمل

### اختبار | Testing Checklist:

- [ ] تغيير رقم الهاتف ← يظهر في Footer
- [ ] تغيير واتساب ← زر واتساب يفتح الرقم الصحيح
- [ ] إضافة رابط Instagram ← الأيقونة تظهر في Footer
- [ ] رفع شعار جديد ← الشعار يتحدث

---

<a name="projects"></a>

## 4️⃣ إدارة المشاريع | Projects Management

### الموقع | Location:

`/en/admin/projects`

### ما يمكنك فعله | What You Can Do:

#### أ) إضافة مشروع جديد | Add New Project

**الخطوات | Steps:**

**بالعربي:**

1. اضغط **"Add New Project"**
2. املأ الحقول:
   - **العنوان (إنجليزي)**: Modern Wooden Kitchen
   - **العنوان (عربي)**: مطبخ خشبي عصري
   - **الوصف (إنجليزي)**: Full description here...
   - **الوصف (عربي)**: الوصف الكامل هنا...
   - **Slug**: modern-wooden-kitchen (بدون مسافات، إنجليزي فقط)
   - **Category**: Kitchen (اختر من القائمة)
   - **Featured Image**: ارفع الصورة الرئيسية
   - **Gallery Images**: ارفع 5-10 صور
3. اضغط **"Published"** لنشره مباشرة
4. اضغط **"Save Project"**

**In English:**

1. Click **"Add New Project"**
2. Fill in the fields (as above)
3. Check **"Published"** to publish immediately
4. Click **"Save Project"**

#### ب) تعديل مشروع | Edit Project

**بالعربي:**

1. اذهب إلى `/en/admin/projects`
2. اضغط على المشروع الذي تريد تعديله
3. عدل الحقول
4. اضغط **"Update Project"**

**In English:**

1. Go to `/en/admin/projects`
2. Click on project to edit
3. Edit fields
4. Click **"Update Project"**

#### ج) حذف مشروع | Delete Project

**⚠️ تحذير | Warning:** الحذف نهائي ولا يمكن التراجع!

**بالعربي:**

1. افتح المشروع
2. اضغط **"Delete Project"**
3. أكد الحذف

### الحقول المطلوبة | Required Fields:

| الحقل             | Field          | إلزامي؟    | Required?      | ملاحظات                 | Notes                   |
| ----------------- | -------------- | ---------- | -------------- | ----------------------- | ----------------------- |
| العنوان (إنجليزي) | Title (EN)     | ✅         | ✅             | -                       | -                       |
| العنوان (عربي)    | Title (AR)     | ✅         | ✅             | -                       | -                       |
| Slug              | Slug           | ✅         | ✅             | حروف صغيرة، بدون مسافات | lowercase, no spaces    |
| الوصف             | Description    | ✅         | ✅             | على الأقل 100 كلمة      | at least 100 words      |
| الفئة             | Category       | ✅         | ✅             | Kitchen, Bathroom, etc. | Kitchen, Bathroom, etc. |
| الصورة الرئيسية   | Featured Image | ✅         | ✅             | 1200x800 بكسل           | 1200x800 pixels         |
| صور المعرض        | Gallery Images | ⚠️ موصى به | ⚠️ Recommended | 5-10 صور                | 5-10 images             |

### ماذا تتوقع | What to Expect:

- ✅ المشروع يظهر في `/en/projects`
- ✅ المشروع يظهر في الصفحة الرئيسية
- ✅ المشروع له صفحة خاصة: `/en/projects/slug-name`

### اختبار | Testing:

- [ ] إضافة مشروع جديد ← يظهر في القائمة
- [ ] تعديل عنوان مشروع ← العنوان يتحدث
- [ ] إلغاء "Published" ← المشروع يختفي من الموقع
- [ ] حذف مشروع ← المشروع يحذف نهائياً

---

<a name="services"></a>

## 5️⃣ إدارة الخدمات | Services Management

### الموقع | Location:

`/en/admin/services`

### ما هي الخدمات؟ | What are Services?

**بالعربي:**
الخدمات هي ما تقدمه الشركة:

- مطابخ خشبية عصرية
- مطابخ إيطالية فاخرة
- تصميم حمامات
- خزائن مخصصة

**In English:**
Services are what the company offers:

- Modern Wooden Kitchens
- Italian Luxury Kitchens
- Bathroom Design
- Custom Cabinets

### خطوات إضافة خدمة | Steps to Add Service:

**بالعربي:**

1. اضغط **"Add New Service"**
2. املأ:
   - **الاسم (إنجليزي)**: Modern Wooden Kitchens
   - **الاسم (عربي)**: مطابخ خشبية عصرية
   - **الوصف**: اكتب وصف تفصيلي
   - **الأيقونة**: اختر أيقونة (أو ارفع صورة)
   - **السعر**: اختياري (From $5000)
3. اضغط **"Published"**
4. اضغط **"Save Service"**

### الحقول | Fields:

| الحقل    | Field       | مثال                   | Example                      |
| -------- | ----------- | ---------------------- | ---------------------------- |
| الاسم    | Name        | مطابخ خشبية            | Modern Wooden Kitchens       |
| الوصف    | Description | نصمم ونصنع...          | We design and manufacture... |
| الأيقونة | Icon        | 🏠 أو صورة             | 🏠 or image                  |
| السعر    | Price       | ابتداءً من 20,000 درهم | Starting from AED 20,000     |

### ماذا تتوقع | What to Expect:

- ✅ الخدمة تظهر في `/en/services`
- ✅ الأيقونة تظهر بجانب الاسم
- ✅ الوصف يظهر عند الضغط

### اختبار | Testing:

- [ ] إضافة خدمة جديدة ← تظهر في الموقع
- [ ] تعديل السعر ← السعر يتحدث
- [ ] رفع أيقونة ← الأيقونة تظهر

---

<a name="gallery"></a>

## 6️⃣ إدارة المعرض | Gallery Management

### الموقع | Location:

`/en/admin/gallery`

### ما هو المعرض؟ | What is Gallery?

**بالعربي:**
معرض الصور يعرض جميع أعمالك:

- صور قبل وبعد
- تفاصيل المشاريع
- أعمال مميزة

**In English:**
Image gallery showcasing all your work:

- Before and after photos
- Project details
- Featured work

### خطوات رفع الصور | Steps to Upload Images:

**بالعربي:**

1. اذهب إلى `/en/admin/gallery`
2. اضغط **"Upload New Images"**
3. اختر الصور من جهازك (يمكنك اختيار عدة صور معاً)
4. لكل صورة، أضف:
   - **العنوان**: وصف قصير
   - **التصنيف**: Kitchen, Bathroom, etc.
   - **Tags**: كلمات دلالية (modern, wooden, luxury)
5. اضغط **"Upload"**

**In English:**

1. Go to `/en/admin/gallery`
2. Click **"Upload New Images"**
3. Select images from your device (multiple selection allowed)
4. For each image, add:
   - **Title**: Short description
   - **Category**: Kitchen, Bathroom, etc.
   - **Tags**: Keywords (modern, wooden, luxury)
5. Click **"Upload"**

### أحجام الصور الموصى بها | Recommended Image Sizes:

| النوع       | Type           | الحجم     | Size      | الملاحظات | Notes      |
| ----------- | -------------- | --------- | --------- | --------- | ---------- |
| صورة عادية  | Regular Image  | 1200x800  | 1200x800  | أفقي      | Horizontal |
| صورة عمودية | Portrait Image | 800x1200  | 800x1200  | عمودي     | Vertical   |
| صورة مربعة  | Square Image   | 1000x1000 | 1000x1000 | مربع      | Square     |

### ماذا تتوقع | What to Expect:

- ✅ الصور تظهر في `/en/gallery`
- ✅ يمكن الفلترة بالتصنيف
- ✅ الصور تفتح بحجم كبير عند الضغط

### اختبار | Testing:

- [ ] رفع صورة واحدة ← تظهر في المعرض
- [ ] رفع 5 صور معاً ← جميعها تظهر
- [ ] فلترة بـ "Kitchen" ← صور المطابخ فقط تظهر
- [ ] الضغط على صورة ← تفتح بحجم كبير

---

<a name="blog"></a>

## 7️⃣ إدارة المدونة | Blog Management

### الموقع | Location:

`/en/admin/blog`

### خطوات كتابة مقال | Steps to Write a Blog Post:

**بالعربي:**

1. اضغط **"New Post"**
2. املأ:
   - **العنوان (إنجليزي)**: 5 Tips for Modern Kitchen Design
   - **العنوان (عربي)**: 5 نصائح لتصميم مطبخ عصري
   - **المحتوى**: اكتب المقال (يدعم Markdown)
   - **Slug**: 5-tips-modern-kitchen-design
   - **الصورة الرئيسية**: ارفع صورة
   - **التصنيف**: Tips, News, Projects, etc.
3. اضغط **"Published"**
4. اضغط **"Save Post"**

**In English:**
(Same steps as above)

### محرر النصوص | Text Editor:

**يدعم | Supports:**

- **Bold** (غامق): `**نص غامق**`
- _Italic_ (مائل): `*نص مائل*`
- Links (روابط): `[نص الرابط](http://example.com)`
- Images (صور): `![وصف الصورة](url-of-image)`
- Lists (قوائم): `- بند 1`، `- بند 2`

### ماذا تتوقع | What to Expect:

- ✅ المقال يظهر في `/en/blog`
- ✅ المقال له صفحة خاصة: `/en/blog/slug`
- ✅ الصورة الرئيسية تظهر

### اختبار | Testing:

- [ ] كتابة مقال جديد ← يظهر في المدونة
- [ ] إضافة صورة داخل المقال ← الصورة تظهر
- [ ] إضافة رابط ← الرابط يعمل
- [ ] فلترة بالتصنيف ← المقالات المناسبة تظهر

---

<a name="founder"></a>

## 8️⃣ إدارة معلومات المؤسس | Founder Management

### الموقع | Location:

`/en/admin/founder`

### ⭐ هذا القسم يظهر في صفحة "من نحن" | This Section Appears in About Page

### ما يمكنك تعديله | What You Can Edit:

| الحقل          | Field       | مثال                        | Example                    |
| -------------- | ----------- | --------------------------- | -------------------------- |
| الاسم          | Name        | م. عصام عودة                | Eng. Esam Odeh             |
| المسمى الوظيفي | Title       | المؤسس والرئيس التنفيذي     | Founder & CEO              |
| السيرة الذاتية | Biography   | نص طويل عن المؤسس...        | Long text about founder... |
| الصورة         | Photo       | ارفع صورة احترافية          | Upload professional photo  |
| التعليم        | Education   | بكالوريوس هندسة، ماجستير... | Bachelor's, Master's...    |
| الجوائز        | Recognition | جائزة التميز 2020           | Excellence Award 2020      |
| اقتباس         | Quote       | "الجودة هي أولويتنا"        | "Quality is our priority"  |

### خطوات التحديث | Update Steps:

**بالعربي:**

1. اذهب إلى `/en/admin/founder`
2. عدل الحقول
3. لتغيير الصورة:
   - اضغط **"Upload Photo"**
   - اختر صورة احترافية (يفضل 600x800)
4. اضغط **"Save Founder Info"**
5. تحقق في `/en/about` ← يجب أن ترى التحديثات

**In English:**
(Same steps as above)

### أين يظهر؟ | Where Does It Appear?

**في صفحة "من نحن" | In About Page:**

- الصورة على اليسار
- الاسم والمسمى الوظيفي
- السيرة الذاتية
- التعليم والجوائز
- الاقتباس (في صندوق مميز)

### ماذا تتوقع | What to Expect:

- ✅ قسم "About the Founder" يظهر في `/en/about`
- ✅ الصورة تظهر بجودة عالية
- ✅ جميع المعلومات محدثة

### اختبار | Testing:

- [ ] تغيير الاسم ← الاسم يتحدث في About
- [ ] رفع صورة جديدة ← الصورة تظهر
- [ ] تعديل السيرة ← النص يتحدث
- [ ] إضافة اقتباس ← الاقتباس يظهر في صندوق أخضر

---

<a name="team"></a>

## 9️⃣ إدارة الفريق | Team Management

### الموقع | Location:

`/en/admin/team-members`

### ⭐ هذا القسم يظهر في صفحة "من نحن" | This Section Appears in About Page

### خطوات إضافة عضو فريق | Steps to Add Team Member:

**بالعربي:**

1. اذهب إلى `/en/admin/team-members`
2. اضغط **"Add New Member"**
3. املأ الحقول:
   - **الاسم (إنجليزي)**: Sarah Al-Mansouri
   - **الاسم (عربي)**: سارة المنصوري
   - **المسمى الوظيفي (إنجليزي)**: Chief Design Officer
   - **المسمى الوظيفي (عربي)**: مديرة التصميم
   - **الصورة**: ارفع صورة احترافية
   - **السيرة**: نبذة مختصرة (100-200 كلمة)
   - **سنوات الخبرة**: 15
   - **التخصصات**: Modern Design, Italian Kitchens
   - **البريد الإلكتروني**: sarah@kitchencore.com (اختياري)
   - **LinkedIn**: رابط LinkedIn (اختياري)
4. اضغط **"Published"**
5. **الترتيب (Order)**: ضع رقم (1 = الأول، 2 = الثاني، إلخ)
6. اضغط **"Save Member"**

**In English:**
(Same steps as above)

### الحقول | Fields Explained:

| الحقل    | Field       | إلزامي؟ | Required? | ملاحظات        | Notes           |
| -------- | ----------- | ------- | --------- | -------------- | --------------- |
| الاسم    | Name        | ✅      | ✅        | إنجليزي + عربي | EN + AR         |
| المسمى   | Title       | ✅      | ✅        | إنجليزي + عربي | EN + AR         |
| الصورة   | Image       | ✅      | ✅        | 600x800 بكسل   | 600x800 pixels  |
| السيرة   | Bio         | ✅      | ✅        | 100-200 كلمة   | 100-200 words   |
| الخبرة   | Experience  | ⚠️      | ⚠️        | بالسنوات       | In years        |
| التخصصات | Specialties | ⚠️      | ⚠️        | 3-5 تخصصات     | 3-5 specialties |
| البريد   | Email       | ❌      | ❌        | اختياري        | Optional        |
| LinkedIn | LinkedIn    | ❌      | ❌        | اختياري        | Optional        |
| الترتيب  | Order       | ✅      | ✅        | رقم            | Number          |

### ترتيب الفريق | Team Order:

**مهم | Important:**

- رقم الترتيب يحدد موقع العضو في الصفحة
- `Order: 1` = يظهر أولاً
- `Order: 2` = يظهر ثانياً
- وهكذا...

**مثال | Example:**

```
Sarah Al-Mansouri      Order: 1  (تظهر أولاً | Appears first)
Marco Rossi            Order: 2  (ثانياً | Second)
Fatima Al-Dosari       Order: 3  (ثالثاً | Third)
```

### أين يظهر؟ | Where Does It Appear?

**في صفحة "من نحن" | In About Page:**

- بعد قسم المؤسس مباشرة
- عنوان "Meet Our Team"
- بطاقات بالصور والأسماء
- عند التمرير بالماوس ← تظهر التفاصيل

### ماذا تتوقع | What to Expect:

- ✅ قسم "Meet Our Team" يظهر في `/en/about`
- ✅ البطاقات مرتبة حسب رقم الترتيب
- ✅ عند التمرير ← السيرة والتخصصات تظهر
- ✅ روابط البريد و LinkedIn تعمل

### اختبار | Testing:

- [ ] إضافة عضو جديد ← يظهر في About
- [ ] تغيير الترتيب ← العضو يتحرك للموقع الصحيح
- [ ] رفع صورة ← الصورة تظهر بجودة عالية
- [ ] إضافة LinkedIn ← أيقونة LinkedIn تظهر وتعمل
- [ ] التمرير بالماوس ← السيرة تظهر

---

<a name="testing"></a>

## 🧪 دليل الاختبار الشامل | Complete Testing Guide

### قبل كل شيء | Before Everything:

```bash
# تأكد من تشغيل السيرفر
pnpm run dev

# افتح المتصفح
http://localhost:3000
```

---

### 1️⃣ اختبار الصفحة الرئيسية | Homepage Testing

**الصفحة | Page:** `/en` أو `/ar`

#### ما يجب أن تراه | What You Should See:

- [ ] **Hero Section**: فيديو في الخلفية يعمل
- [ ] **Statistics**: 4 أرقام إحصائية (1000+ مطابخ، 25+ دول، إلخ)
- [ ] **Portfolio Section**: أحدث المشاريع (3-6 مشاريع)
- [ ] **Before & After Slider**: قسم التحول التفاعلي
  - عند التمرير بالماوس ← الصورة تتغير
  - Slider يعمل بشكل سلس
- [ ] **Video Showcase**: فيديو الأعمال يشتغل
- [ ] **About Section**: نبذة عن الشركة
- [ ] **Footer**: جميع الروابط تعمل

#### المشاكل المحتملة | Potential Issues:

| المشكلة              | Problem              | الحل                       | Solution                        |
| -------------------- | -------------------- | -------------------------- | ------------------------------- |
| الفيديو لا يشتغل     | Video doesn't play   | تحقق من رابط الفيديو       | Check video URL                 |
| Before/After لا يظهر | Before/After missing | تحقق من المكون             | Check component                 |
| المشاريع لا تظهر     | Projects don't show  | تأكد من وجود مشاريع منشورة | Ensure published projects exist |

---

### 2️⃣ اختبار صفحة المشاريع | Projects Page Testing

**الصفحة | Page:** `/en/projects`

#### ما يجب أن تراه | What You Should See:

- [ ] **عنوان الصفحة**: "Our Projects" أو "مشاريعنا"
- [ ] **شبكة المشاريع**: جميع المشاريع المنشورة
- [ ] **صور المشاريع**: واضحة وبجودة عالية
- [ ] **Filter Buttons**: أزرار الفلترة (All, Kitchens, Bathrooms, إلخ)
- [ ] **عند الضغط على مشروع**: ينتقل لصفحة المشروع

#### اختبار صفحة مشروع واحد | Single Project Testing:

**الصفحة | Page:** `/en/projects/project-slug`

- [ ] **العنوان**: يظهر بوضوح
- [ ] **الصورة الرئيسية**: كبيرة وواضحة
- [ ] **الوصف**: يظهر بالكامل
- [ ] **معرض الصور**: جميع الصور تظهر
- [ ] **الصور تفتح بحجم كبير** عند الضغط
- [ ] **زر "Back to Projects"**: يعمل

---

### 3️⃣ اختبار صفحة الخدمات | Services Page Testing

**الصفحة | Page:** `/en/services`

#### ما يجب أن تراه | What You Should See:

- [ ] **عنوان الصفحة**: "Our Services"
- [ ] **شبكة الخدمات**: جميع الخدمات
- [ ] **الأيقونات**: تظهر بوضوح
- [ ] **الأسعار**: إن وجدت
- [ ] **Before & After Slider**: يظهر في الأسفل
  - التمرير بالماوس يعمل
  - Slider سلس

---

### 4️⃣ اختبار صفحة المعرض | Gallery Page Testing

**الصفحة | Page:** `/en/gallery`

#### ما يجب أن تراه | What You Should See:

- [ ] **شبكة الصور**: جميع الصور
- [ ] **Filter**: أزرار التصنيف (All, Kitchen, Bathroom, إلخ)
- [ ] **عند الضغط على صورة**: تفتح بحجم كبير (Lightbox)
- [ ] **أزرار التنقل**: السابق/التالي تعمل
- [ ] **زر الإغلاق**: يعمل

---

### 5️⃣ اختبار صفحة "من نحن" | About Page Testing

**الصفحة | Page:** `/en/about`

#### ⭐ هذه الصفحة مهمة جداً! | This Page is Very Important!

#### ما يجب أن تراه | What You Should See:

**أ) قسم المؤسس | Founder Section:**

- [ ] **العنوان**: "About the Founder"
- [ ] **صورة المؤسس**: واضحة وكبيرة (يسار الصفحة)
- [ ] **الاسم**: م. عصام عودة
- [ ] **المسمى**: المؤسس والرئيس التنفيذي
- [ ] **السيرة**: نص كامل عن المؤسس
- [ ] **التعليم**: قائمة بالشهادات
- [ ] **الجوائز**: قائمة بالإنجازات
- [ ] **الاقتباس**: في صندوق أخضر

**ب) قسم الفريق | Team Section:**

- [ ] **العنوان**: "Meet Our Team"
- [ ] **6 بطاقات**: لأعضاء الفريق
- [ ] **الصور**: واضحة وبجودة عالية
- [ ] **الأسماء والمسميات**: تحت كل صورة
- [ ] **عند التمرير بالماوس**:
  - تظهر السيرة المختصرة
  - تظهر التخصصات (في صناديق خضراء)
  - تظهر أيقونات البريد و LinkedIn
- [ ] **الترتيب**: صحيح (حسب Order)

#### المشاكل المحتملة | Potential Issues:

| المشكلة        | Problem         | السبب             | Cause             | الحل                               | Solution                               |
| -------------- | --------------- | ----------------- | ----------------- | ---------------------------------- | -------------------------------------- |
| المؤسس لا يظهر | Founder missing | Published = false | Published = false | افتح Prisma Studio، غير إلى true   | Open Prisma Studio, set to true        |
| الفريق لا يظهر | Team missing    | لا يوجد أعضاء     | No members        | أضف أعضاء من `/admin/team-members` | Add members from `/admin/team-members` |
| الصور لا تظهر  | Images missing  | رابط الصورة خطأ   | Image URL wrong   | أعد رفع الصور                      | Re-upload images                       |

---

### 6️⃣ اختبار صفحة المدونة | Blog Page Testing

**الصفحة | Page:** `/en/blog`

- [ ] **قائمة المقالات**: جميع المقالات المنشورة
- [ ] **الصور الرئيسية**: تظهر
- [ ] **العناوين**: واضحة
- [ ] **التاريخ**: يظهر
- [ ] **عند الضغط**: ينتقل لصفحة المقال

**صفحة المقال | Blog Post:**

- [ ] **العنوان**: كبير وواضح
- [ ] **الصورة**: رئيسية كبيرة
- [ ] **المحتوى**: منسق بشكل جيد
- [ ] **الصور داخل المقال**: تظهر
- [ ] **الروابط**: تعمل

---

### 7️⃣ اختبار Footer (الذيل) | Footer Testing

**كل صفحة | Every Page**

#### ما يجب أن تراه | What You Should See:

- [ ] **Quick Links**: 9 روابط
  - Home
  - Portfolio
  - Services
  - Gallery
  - About
  - Blog
  - Contact
  - Privacy (صغير)
  - Terms (صغير)
- [ ] **معلومات الاتصال**:
  - رقم الهاتف: +971 55 999 0501
  - البريد: info@kitchencore.com
- [ ] **وسائل التواصل**:
  - أيقونة Instagram تعمل
  - أيقونة Facebook (إن وجدت)
  - إلخ
- [ ] **زر WhatsApp العائم**: في الزاوية اليمنى السفلى
  - عند الضغط ← يفتح واتساب بالرقم: +971559990501

#### اختبار الروابط | Links Testing:

| الرابط    | Link      | يجب أن ينتقل إلى | Should Go To   |
| --------- | --------- | ---------------- | -------------- |
| Home      | Home      | `/en`            | `/en`          |
| Portfolio | Portfolio | `/en/projects`   | `/en/projects` |
| Privacy   | Privacy   | `/en/privacy`    | `/en/privacy`  |
| Terms     | Terms     | `/en/terms`      | `/en/terms`    |

---

### 8️⃣ اختبار الصفحات القانونية | Legal Pages Testing

**Privacy Policy:** `/en/privacy`

- [ ] **العنوان**: "Privacy Policy"
- [ ] **المحتوى**: نص كامل بالإنجليزية
- [ ] **التنسيق**: واضح ومنظم
- [ ] **معلومات الاتصال**: في الأسفل

**Terms & Conditions:** `/en/terms`

- [ ] **العنوان**: "Terms & Conditions"
- [ ] **المحتوى**: نص كامل
- [ ] **الأقسام**:
  - شروط الدفع (30% + 40% + 30%)
  - سياسة الإلغاء
  - الضمانات (سنتان)
  - حل النزاعات

---

### 9️⃣ اختبار اللغة العربية | Arabic Language Testing

**طريقة التبديل | How to Switch:**

- في الـ Navigation: اضغط على "العربية"
- أو غير الرابط من `/en/` إلى `/ar/`

**ما يجب أن تختبره | What to Test:**

- [ ] **اتجاه النص**: من اليمين لليسار (RTL)
- [ ] **Navigation**: جميع الروابط بالعربية
- [ ] **الصفحة الرئيسية**: المحتوى بالعربية
- [ ] **صفحة المشاريع**: العناوين بالعربية
- [ ] **صفحة "من نحن"**: أسماء الفريق بالعربية
- [ ] **Footer**: الروابط بالعربية

---

### 🔟 اختبار الأداء | Performance Testing

#### سرعة التحميل | Loading Speed:

- [ ] الصفحة الرئيسية تفتح في **أقل من 3 ثوانٍ**
- [ ] الصور تحمل تدريجياً (lazy load)
- [ ] الانتقال بين الصفحات سلس

#### الاستجابة (Responsive) | Responsiveness:

**اختبر على | Test on:**

- [ ] **Desktop** (1920x1080): كل شيء واضح
- [ ] **Laptop** (1366x768): لا يوجد تقطيع
- [ ] **Tablet** (768x1024): القوائم تتكيف
- [ ] **Mobile** (375x667): القائمة hamburger تعمل

**كيف تختبر Responsive؟ | How to Test?**

1. افتح الموقع في Chrome
2. اضغط F12
3. اضغط على أيقونة الموبايل (Ctrl+Shift+M)
4. غير الحجم وشاهد التغييرات

---

<a name="reporting"></a>

## 📋 نظام التبليغ عن المشاكل | Bug Reporting System

### كيف تبلغ عن مشكلة؟ | How to Report a Bug?

**استخدم النموذج التالي | Use This Template:**

```markdown
## 🐛 تقرير مشكلة | Bug Report

**التاريخ | Date:** 2025-01-15

**الصفحة | Page:** /en/about

**ما كنت تفعله | What I Was Doing:**
كنت أحاول تحديث صورة المؤسس من لوحة التحكم

**ما حدث | What Happened:**
بعد رفع الصورة وحفظها، لم تظهر الصورة الجديدة في صفحة About

**ما كان متوقعاً | What Was Expected:**
يجب أن تظهر الصورة الجديدة فوراً

**لقطات الشاشة | Screenshots:**
[أرفق لقطة شاشة إن أمكن]

**المتصفح | Browser:**

- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

**الجهاز | Device:**

- [ ] Desktop
- [ ] Laptop
- [ ] Tablet
- [ ] Mobile

**خطوات إعادة المشكلة | Steps to Reproduce:**

1. افتح `/en/admin/founder`
2. اضغط "Upload Photo"
3. اختر صورة جديدة
4. اضغط "Save"
5. افتح `/en/about`
6. الصورة لم تتحدث

**هل حاولت | Did You Try:**

- [ ] Hard Refresh (Ctrl+Shift+R)
- [ ] Clear Cache
- [ ] Restart Server
- [ ] Check Prisma Studio

**ملاحظات إضافية | Additional Notes:**
(أي معلومات إضافية)
```

---

### نموذج تقرير مبسط | Simple Report Template

```markdown
**الصفحة:** /en/projects
**المشكلة:** المشاريع لا تظهر
**ماذا فعلت:** دخلت على الصفحة
**ما حدث:** صفحة فارغة
**لقطة شاشة:** [أرفق هنا]
```

---

### أين ترسل التقرير؟ | Where to Send Report?

**الطريقة 1: ملف نصي**

```
أنشئ ملف:
BUG_REPORT_2025-01-15.md

واحفظه في:
d:\wbsite\kitchen-core\bug-reports\
```

**الطريقة 2: بريد إلكتروني**

```
إلى: [your-email@example.com]
الموضوع: [Bug Report] - صفحة About لا تعمل
المحتوى: [استخدم النموذج أعلاه]
```

**الطريقة 3: WhatsApp**

```
أرسل رسالة:
"مشكلة في صفحة /en/about - الصور لا تظهر"
+ لقطة شاشة
```

---

### الأولويات | Priority Levels

| الأولوية | Priority    | متى تستخدمها                  | When to Use              | مثال                    | Example                |
| -------- | ----------- | ----------------------------- | ------------------------ | ----------------------- | ---------------------- |
| 🔴 عاجل  | 🔴 Critical | الموقع لا يعمل بالكامل        | Site completely broken   | الصفحة الرئيسية لا تفتح | Homepage doesn't load  |
| 🟠 عالي  | 🟠 High     | ميزة مهمة لا تعمل             | Important feature broken | زر واتساب لا يعمل       | WhatsApp button broken |
| 🟡 متوسط | 🟡 Medium   | مشكلة تؤثر على بعض المستخدمين | Affects some users       | صورة واحدة لا تظهر      | One image missing      |
| 🟢 منخفض | 🟢 Low      | مشكلة بصرية بسيطة             | Minor visual issue       | خط صغير جداً            | Font too small         |

---

### قائمة تحقق قبل الإبلاغ | Pre-Report Checklist

قبل الإبلاغ عن مشكلة، جرب هذه الحلول | Before reporting, try these:

- [ ] **Hard Refresh**: Ctrl+Shift+R (أو Cmd+Shift+R على Mac)
- [ ] **Clear Cache**: امسح الكاش من المتصفح
- [ ] **Restart Server**: أعد تشغيل `pnpm run dev`
- [ ] **Check Published**: تأكد أن العنصر `published: true`
- [ ] **Check Prisma Studio**: افتح `npx prisma studio` وتحقق من البيانات

---

## 📞 جهات الاتصال | Contact Information

### الدعم الفني | Technical Support

**للمشاكل التقنية | For Technical Issues:**

- **البريد | Email:** [your-support-email]
- **واتساب | WhatsApp:** [your-support-whatsapp]
- **ساعات العمل | Hours:** 9 صباحاً - 6 مساءً (GMT+4)

### الموارد المفيدة | Helpful Resources

**الأدلة | Guides:**

- `QUICK_START_GUIDE.md` - البدء السريع
- `PHASE_2_COMPLETE.md` - تفاصيل المرحلة 2
- `CLIENT_HANDOFF_GUIDE.md` - دليل التسليم

**الأوامر السريعة | Quick Commands:**

```bash
pnpm run dev              # تشغيل محلي
npx prisma studio         # فتح قاعدة البيانات
pnpm run build            # بناء للإنتاج
```

---

## ✅ الخلاصة | Summary

### ما يجب أن تعرفه | What You Should Know:

**لوحة التحكم | Admin Dashboard:**

- تسجيل الدخول: `/en/admin`
- جميع الأقسام متاحة من القائمة الجانبية
- التغييرات تظهر فوراً (بعد الحفظ)

**الأقسام المهمة | Important Sections:**

1. **Company** - معلومات الاتصال (رقم، واتساب، سوشال ميديا)
2. **Founder** - يظهر في صفحة About
3. **Team** - يظهر في صفحة About
4. **Projects** - يظهر في الصفحة الرئيسية + صفحة Projects

**الاختبار | Testing:**

- اختبر كل صفحة بعد التحديث
- استخدم قائمة التحقق أعلاه
- جرب على Desktop و Mobile

**الإبلاغ عن المشاكل | Bug Reporting:**

- استخدم النموذج المقدم
- أرفق لقطات شاشة
- حدد الأولوية

---

**🎉 مبروك! أنت الآن جاهز لإدارة الموقع بشكل كامل!**
**🎉 Congratulations! You're now ready to fully manage the site!**

---

**آخر تحديث | Last Updated:** 2025-01-15
**الإصدار | Version:** 1.0
