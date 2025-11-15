import { Metadata } from "next";
import Link from "next/link";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  return {
    title:
      locale === "ar"
        ? "سياسة الخصوصية | Kitchen Core"
        : "Privacy Policy | Kitchen Core",
    description:
      locale === "ar"
        ? "سياسة الخصوصية الخاصة بـ Kitchen Core - كيف نجمع ونستخدم ونحمي معلوماتك الشخصية"
        : "Kitchen Core's Privacy Policy - How we collect, use, and protect your personal information",
  };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  const isArabic = locale === "ar";

  if (isArabic) {
    return (
      <main className="min-h-screen bg-black text-white pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <h1 className="font-serif text-5xl md:text-6xl text-white mb-6">
              سياسة الخصوصية
            </h1>
            <p className="text-gray-light text-lg">
              آخر تحديث: {new Date().toLocaleDateString("ar-SA")}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="font-serif text-3xl text-white mb-4">المقدمة</h2>
              <p className="text-gray-light leading-relaxed">
                في Kitchen Core، نحن ملتزمون بحماية خصوصيتك. توضح سياسة الخصوصية
                هذه كيفية جمع واستخدام وحماية معلوماتك الشخصية عند زيارتك
                لموقعنا الإلكتروني أو استخدام خدماتنا.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="font-serif text-3xl text-white mb-4">
                المعلومات التي نجمعها
              </h2>
              <div className="space-y-4 text-gray-light">
                <div>
                  <h3 className="text-xl text-white mb-2">المعلومات الشخصية</h3>
                  <p className="leading-relaxed">
                    عند الاتصال بنا أو طلب خدماتنا، قد نجمع:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mt-2 mr-6">
                    <li>الاسم الكامل</li>
                    <li>عنوان البريد الإلكتروني</li>
                    <li>رقم الهاتف</li>
                    <li>العنوان</li>
                    <li>تفاصيل المشروع ومتطلباته</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl text-white mb-2">المعلومات التقنية</h3>
                  <p className="leading-relaxed">
                    نقوم تلقائياً بجمع معلومات حول جهازك وتصفحك:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mt-2 mr-6">
                    <li>عنوان IP</li>
                    <li>نوع المتصفح والإصدار</li>
                    <li>نظام التشغيل</li>
                    <li>الصفحات التي تمت زيارتها</li>
                    <li>الوقت المستغرق في الموقع</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="font-serif text-3xl text-white mb-4">
                كيف نستخدم معلوماتك
              </h2>
              <div className="text-gray-light space-y-3">
                <p>نستخدم المعلومات التي نجمعها للأغراض التالية:</p>
                <ul className="list-disc list-inside space-y-2 mr-6">
                  <li>تقديم خدماتنا وإدارة مشاريعك</li>
                  <li>الرد على استفساراتك وطلباتك</li>
                  <li>إرسال التحديثات حول مشاريعك</li>
                  <li>تحسين موقعنا الإلكتروني وخدماتنا</li>
                  <li>إرسال مواد تسويقية (بموافقتك)</li>
                  <li>الامتثال للالتزامات القانونية</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="font-serif text-3xl text-white mb-4">
                ملفات تعريف الارتباط (Cookies)
              </h2>
              <div className="text-gray-light space-y-3">
                <p>نستخدم ملفات تعريف الارتباط لتحسين تجربتك:</p>
                <ul className="list-disc list-inside space-y-2 mr-6">
                  <li>
                    <strong>ملفات تعريف الارتباط الأساسية:</strong> ضرورية
                    لتشغيل الموقع
                  </li>
                  <li>
                    <strong>ملفات تعريف الارتباط التحليلية:</strong> تساعدنا على
                    فهم كيفية استخدام الموقع
                  </li>
                  <li>
                    <strong>ملفات تعريف الارتباط التسويقية:</strong> تستخدم لعرض
                    إعلانات مخصصة
                  </li>
                </ul>
                <p className="mt-4">
                  يمكنك التحكم في ملفات تعريف الارتباط من خلال إعدادات متصفحك.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="font-serif text-3xl text-white mb-4">
                مشاركة المعلومات
              </h2>
              <div className="text-gray-light space-y-3">
                <p>لا نبيع أو نؤجر معلوماتك الشخصية. قد نشارك معلوماتك مع:</p>
                <ul className="list-disc list-inside space-y-2 mr-6">
                  <li>مقدمي الخدمات الذين يساعدوننا في تشغيل أعمالنا</li>
                  <li>الشركاء المعتمدين للمشاريع المشتركة</li>
                  <li>السلطات القانونية عند الطلب</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="font-serif text-3xl text-white mb-4">
                أمان البيانات
              </h2>
              <div className="text-gray-light space-y-3">
                <p>نطبق تدابير أمنية صارمة لحماية معلوماتك:</p>
                <ul className="list-disc list-inside space-y-2 mr-6">
                  <li>تشفير SSL/TLS لجميع عمليات نقل البيانات</li>
                  <li>خوادم آمنة ومحمية بجدران الحماية</li>
                  <li>الوصول المحدود إلى المعلومات الشخصية</li>
                  <li>مراجعات أمنية منتظمة</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="font-serif text-3xl text-white mb-4">حقوقك</h2>
              <div className="text-gray-light space-y-3">
                <p>لديك الحق في:</p>
                <ul className="list-disc list-inside space-y-2 mr-6">
                  <li>الوصول إلى معلوماتك الشخصية</li>
                  <li>تصحيح المعلومات غير الدقيقة</li>
                  <li>طلب حذف معلوماتك</li>
                  <li>الاعتراض على معالجة معلوماتك</li>
                  <li>نقل بياناتك إلى خدمة أخرى</li>
                  <li>سحب الموافقة في أي وقت</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="font-serif text-3xl text-white mb-4">
                الاحتفاظ بالبيانات
              </h2>
              <p className="text-gray-light leading-relaxed">
                نحتفظ بمعلوماتك الشخصية طالما كان ذلك ضرورياً لتقديم خدماتنا
                والامتثال للالتزامات القانونية. عند انتهاء فترة الاحتفاظ، نقوم
                بحذف أو إخفاء هوية معلوماتك بشكل آمن.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="font-serif text-3xl text-white mb-4">
                خصوصية الأطفال
              </h2>
              <p className="text-gray-light leading-relaxed">
                خدماتنا غير موجهة للأطفال دون سن 18 عاماً. لا نجمع عن قصد
                معلومات شخصية من الأطفال. إذا علمنا أننا جمعنا معلومات من طفل،
                سنحذفها على الفور.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="font-serif text-3xl text-white mb-4">
                التغييرات على هذه السياسة
              </h2>
              <p className="text-gray-light leading-relaxed">
                قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سنقوم بإعلامك بأي
                تغييرات عن طريق نشر السياسة الجديدة على هذه الصفحة وتحديث تاريخ
                "آخر تحديث" أعلاه.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="font-serif text-3xl text-white mb-4">اتصل بنا</h2>
              <div className="text-gray-light space-y-3">
                <p>
                  إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى الاتصال
                  بنا:
                </p>
                <div className="bg-background-card border border-gray-dark p-6 mt-4">
                  <p>
                    <strong>Kitchen Core</strong>
                  </p>
                  <p>البريد الإلكتروني: info@kitchencore.com</p>
                  <p>الهاتف: +971 55 999 0501</p>
                  <p>واتساب: +971 55 999 0501</p>
                </div>
              </div>
            </section>
          </div>

          {/* Back Link */}
          <div className="mt-12 pt-8 border-t border-gray-dark">
            <Link
              href={`/${locale}`}
              className="text-green-primary hover:text-green-vibrant transition-colors inline-flex items-center gap-2"
            >
              ← العودة إلى الصفحة الرئيسية
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // English Version
  return (
    <main className="min-h-screen bg-black text-white pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-serif text-5xl md:text-6xl text-white mb-6">
            Privacy Policy
          </h1>
          <p className="text-gray-light text-lg">
            Last Updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="font-serif text-3xl text-white mb-4">
              Introduction
            </h2>
            <p className="text-gray-light leading-relaxed">
              At Kitchen Core, we are committed to protecting your privacy. This
              Privacy Policy explains how we collect, use, and safeguard your
              personal information when you visit our website or use our
              services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-3xl text-white mb-4">
              Information We Collect
            </h2>
            <div className="space-y-4 text-gray-light">
              <div>
                <h3 className="text-xl text-white mb-2">
                  Personal Information
                </h3>
                <p className="leading-relaxed">
                  When you contact us or request our services, we may collect:
                </p>
                <ul className="list-disc list-inside space-y-2 mt-2 ml-6">
                  <li>Full name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Physical address</li>
                  <li>Project details and requirements</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl text-white mb-2">
                  Technical Information
                </h3>
                <p className="leading-relaxed">
                  We automatically collect information about your device and
                  browsing:
                </p>
                <ul className="list-disc list-inside space-y-2 mt-2 ml-6">
                  <li>IP address</li>
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>Pages visited</li>
                  <li>Time spent on site</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-3xl text-white mb-4">
              How We Use Your Information
            </h2>
            <div className="text-gray-light space-y-3">
              <p>
                We use the information we collect for the following purposes:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-6">
                <li>To provide our services and manage your projects</li>
                <li>To respond to your inquiries and requests</li>
                <li>To send you updates about your projects</li>
                <li>To improve our website and services</li>
                <li>To send marketing communications (with your consent)</li>
                <li>To comply with legal obligations</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-3xl text-white mb-4">Cookies</h2>
            <div className="text-gray-light space-y-3">
              <p>We use cookies to enhance your experience:</p>
              <ul className="list-disc list-inside space-y-2 ml-6">
                <li>
                  <strong>Essential Cookies:</strong> Required for the website
                  to function
                </li>
                <li>
                  <strong>Analytics Cookies:</strong> Help us understand how you
                  use our site
                </li>
                <li>
                  <strong>Marketing Cookies:</strong> Used to deliver
                  personalized advertisements
                </li>
              </ul>
              <p className="mt-4">
                You can control cookies through your browser settings.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-3xl text-white mb-4">
              Information Sharing
            </h2>
            <div className="text-gray-light space-y-3">
              <p>
                We do not sell or rent your personal information. We may share
                your information with:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-6">
                <li>Service providers who help us operate our business</li>
                <li>Trusted partners for collaborative projects</li>
                <li>Legal authorities when required by law</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-3xl text-white mb-4">
              Data Security
            </h2>
            <div className="text-gray-light space-y-3">
              <p>
                We implement robust security measures to protect your
                information:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-6">
                <li>SSL/TLS encryption for all data transmission</li>
                <li>Secure servers protected by firewalls</li>
                <li>Limited access to personal information</li>
                <li>Regular security audits</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-3xl text-white mb-4">Your Rights</h2>
            <div className="text-gray-light space-y-3">
              <p>You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-6">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Object to processing of your information</li>
                <li>Port your data to another service</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-3xl text-white mb-4">
              Data Retention
            </h2>
            <p className="text-gray-light leading-relaxed">
              We retain your personal information for as long as necessary to
              provide our services and comply with legal obligations. When the
              retention period expires, we securely delete or anonymize your
              information.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-3xl text-white mb-4">
              Children's Privacy
            </h2>
            <p className="text-gray-light leading-relaxed">
              Our services are not directed to children under 18. We do not
              knowingly collect personal information from children. If we learn
              we have collected information from a child, we will delete it
              immediately.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-3xl text-white mb-4">
              Changes to This Policy
            </h2>
            <p className="text-gray-light leading-relaxed">
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new policy on this page
              and updating the "Last Updated" date above.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-3xl text-white mb-4">Contact Us</h2>
            <div className="text-gray-light space-y-3">
              <p>
                If you have any questions about this Privacy Policy, please
                contact us:
              </p>
              <div className="bg-background-card border border-gray-dark p-6 mt-4">
                <p>
                  <strong>Kitchen Core</strong>
                </p>
                <p>Email: info@kitchencore.com</p>
                <p>Phone: +971 55 999 0501</p>
                <p>WhatsApp: +971 55 999 0501</p>
              </div>
            </div>
          </section>
        </div>

        {/* Back Link */}
        <div className="mt-12 pt-8 border-t border-gray-dark">
          <Link
            href={`/${locale}`}
            className="text-green-primary hover:text-green-vibrant transition-colors inline-flex items-center gap-2"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
