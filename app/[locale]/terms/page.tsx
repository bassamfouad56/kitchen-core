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
        ? "الشروط والأحكام | Kitchen Core"
        : "Terms & Conditions | Kitchen Core",
    description:
      locale === "ar"
        ? "الشروط والأحكام الخاصة بخدمات Kitchen Core - القواعد والمسؤوليات عند استخدام خدماتنا"
        : "Kitchen Core's Terms & Conditions - Rules and responsibilities when using our services",
  };
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  const isArabic = locale === "ar";

  if (isArabic) {
    return (
      <main className="min-h-screen bg-black text-white pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <h1 className="font-serif text-5xl md:text-6xl text-white mb-6">
              الشروط والأحكام
            </h1>
            <p className="text-gray-light text-lg">
              آخر تحديث: {new Date().toLocaleDateString("ar-SA")}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="font-serif text-3xl text-white mb-4">
                الموافقة على الشروط
              </h2>
              <p className="text-gray-light leading-relaxed">
                باستخدام موقع Kitchen Core الإلكتروني أو خدماتنا، فإنك توافق على
                الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي جزء من
                هذه الشروط، يرجى عدم استخدام خدماتنا.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="font-serif text-3xl text-white mb-4">خدماتنا</h2>
              <div className="text-gray-light space-y-3">
                <p>
                  تقدم Kitchen Core خدمات تصميم وتنفيذ المطابخ الفاخرة، بما في
                  ذلك:
                </p>
                <ul className="list-disc list-inside space-y-2 mr-6">
                  <li>استشارات التصميم</li>
                  <li>تخطيط المطبخ وتصميم ثلاثي الأبعاد</li>
                  <li>توريد المواد والأجهزة</li>
                  <li>التصنيع والتركيب</li>
                  <li>خدمات ما بعد البيع والصيانة</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="font-serif text-3xl text-white mb-4">
                التزامات العميل
              </h2>
              <div className="text-gray-light space-y-3">
                <p>كعميل، أنت توافق على:</p>
                <ul className="list-disc list-inside space-y-2 mr-6">
                  <li>تقديم معلومات دقيقة وكاملة</li>
                  <li>السماح بالوصول إلى موقع العمل في الأوقات المتفق عليها</li>
                  <li>الدفع وفقاً لجدول الدفع المتفق عليه</li>
                  <li>الموافقة على التصاميم قبل بدء التصنيع</li>
                  <li>فحص العمل عند الانتهاء والإبلاغ عن أي مشاكل فوراً</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="font-serif text-3xl text-white mb-4">
                عملية الطلب والدفع
              </h2>
              <div className="text-gray-light space-y-4">
                <div>
                  <h3 className="text-xl text-white mb-2">الاستشارة الأولية</h3>
                  <p>
                    نقدم استشارة أولية مجانية لمناقشة متطلباتك وتقديم تقدير
                    أولي.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl text-white mb-2">العرض والموافقة</h3>
                  <p>
                    بعد الاستشارة، نقدم عرضاً مفصلاً يتضمن التصميم والتكلفة
                    والجدول الزمني. المشروع يبدأ فقط بعد موافقتك الخطية.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl text-white mb-2">جدول الدفع</h3>
                  <ul className="list-disc list-inside space-y-2 mr-6">
                    <li>دفعة مقدمة: 30% عند التوقيع</li>
                    <li>دفعة ثانية: 40% عند بدء التصنيع</li>
                    <li>الدفعة النهائية: 30% عند الانتهاء</li>
                  </ul>
                  <p className="mt-2 text-sm">
                    *قد تختلف شروط الدفع حسب حجم المشروع
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="font-serif text-3xl text-white mb-4">
                الإلغاء والاسترداد
              </h2>
              <div className="text-gray-light space-y-3">
                <ul className="list-disc list-inside space-y-2 mr-6">
                  <li>
                    الإلغاء قبل بدء التصنيع: استرداد 70% من الدفعة المقدمة
                  </li>
                  <li>
                    الإلغاء بعد بدء التصنيع: استرداد 30% من إجمالي المبلغ
                    المدفوع
                  </li>
                  <li>الإلغاء بعد التركيب: لا يوجد استرداد</li>
                  <li>جميع طلبات الإلغاء يجب أن تكون خطية</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="font-serif text-3xl text-white mb-4">الضمانات</h2>
              <div className="text-gray-light space-y-4">
                <div>
                  <h3 className="text-xl text-white mb-2">ضمان الصنعة</h3>
                  <p>نقدم ضماناً لمدة سنتين على جودة الصنعة والتركيب.</p>
                </div>

                <div>
                  <h3 className="text-xl text-white mb-2">ضمان المواد</h3>
                  <p>المواد والأجهزة تخضع لضمانات الشركات المصنعة.</p>
                </div>

                <div>
                  <h3 className="text-xl text-white mb-2">الاستثناءات</h3>
                  <p>الضمان لا يشمل:</p>
                  <ul className="list-disc list-inside space-y-2 mr-6 mt-2">
                    <li>التلف الناتج عن سوء الاستخدام</li>
                    <li>التآكل الطبيعي</li>
                    <li>الأضرار الناجمة عن الحوادث أو الكوارث الطبيعية</li>
                    <li>التعديلات غير المصرح بها</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="font-serif text-3xl text-white mb-4">
                الملكية الفكرية
              </h2>
              <div className="text-gray-light space-y-3">
                <p>
                  جميع التصاميم والرسومات والمواد المقدمة من Kitchen Core تبقى
                  ملكيتنا الفكرية حتى استلام الدفعة النهائية بالكامل. لا يجوز
                  استخدامها أو إعادة إنتاجها دون إذن خطي.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="font-serif text-3xl text-white mb-4">المسؤولية</h2>
              <div className="text-gray-light space-y-3">
                <p>
                  مسؤوليتنا محدودة بالقيمة الإجمالية للعقد. نحن غير مسؤولين عن:
                </p>
                <ul className="list-disc list-inside space-y-2 mr-6">
                  <li>الأضرار غير المباشرة أو التبعية</li>
                  <li>الأعمال التي يقوم بها مقاولون من الباطن غير معتمدين</li>
                  <li>التأخيرات الناجمة عن ظروف خارجة عن إرادتنا</li>
                  <li>المشاكل في الموقع غير المكشوفة في وقت التقييم</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="font-serif text-3xl text-white mb-4">
                القوة القاهرة
              </h2>
              <p className="text-gray-light leading-relaxed">
                نحن غير مسؤولين عن أي فشل أو تأخير في الأداء بسبب ظروف خارجة عن
                سيطرتنا المعقولة، بما في ذلك الكوارث الطبيعية، والحروب،
                والإضرابات، وإجراءات الحكومة.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="font-serif text-3xl text-white mb-4">
                حل النزاعات
              </h2>
              <div className="text-gray-light space-y-3">
                <p>في حالة وجود أي نزاع:</p>
                <ul className="list-disc list-inside space-y-2 mr-6">
                  <li>سنسعى أولاً لحل المسألة ودياً</li>
                  <li>إذا لم يكن ذلك ممكناً، سنلجأ إلى الوساطة</li>
                  <li>القانون الحاكم هو قانون دولة الإمارات العربية المتحدة</li>
                  <li>الاختصاص القضائي لمحاكم دبي</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="font-serif text-3xl text-white mb-4">
                التعديلات على الشروط
              </h2>
              <p className="text-gray-light leading-relaxed">
                نحتفظ بالحق في تعديل هذه الشروط والأحكام في أي وقت. ستصبح
                التغييرات سارية فور نشرها على موقعنا. استمرارك في استخدام
                خدماتنا يعني موافقتك على الشروط المعدلة.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="font-serif text-3xl text-white mb-4">اتصل بنا</h2>
              <div className="text-gray-light space-y-3">
                <p>للأسئلة حول هذه الشروط والأحكام، يرجى الاتصال بنا:</p>
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
            Terms & Conditions
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
              Agreement to Terms
            </h2>
            <p className="text-gray-light leading-relaxed">
              By accessing Kitchen Core's website or using our services, you
              agree to be bound by these Terms and Conditions. If you disagree
              with any part of these terms, please do not use our services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-3xl text-white mb-4">
              Our Services
            </h2>
            <div className="text-gray-light space-y-3">
              <p>
                Kitchen Core provides luxury kitchen design and installation
                services, including:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-6">
                <li>Design consultations</li>
                <li>Kitchen planning and 3D design</li>
                <li>Material and appliance sourcing</li>
                <li>Manufacturing and installation</li>
                <li>After-sales service and maintenance</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-3xl text-white mb-4">
              Client Obligations
            </h2>
            <div className="text-gray-light space-y-3">
              <p>As a client, you agree to:</p>
              <ul className="list-disc list-inside space-y-2 ml-6">
                <li>Provide accurate and complete information</li>
                <li>Allow access to the work site at agreed times</li>
                <li>Make payments according to the agreed schedule</li>
                <li>Approve designs before manufacturing begins</li>
                <li>
                  Inspect work upon completion and report any issues promptly
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-3xl text-white mb-4">
              Ordering Process and Payment
            </h2>
            <div className="text-gray-light space-y-4">
              <div>
                <h3 className="text-xl text-white mb-2">
                  Initial Consultation
                </h3>
                <p>
                  We provide a free initial consultation to discuss your
                  requirements and provide a preliminary estimate.
                </p>
              </div>

              <div>
                <h3 className="text-xl text-white mb-2">
                  Quotation and Approval
                </h3>
                <p>
                  Following consultation, we provide a detailed quotation
                  including design, cost, and timeline. Work begins only after
                  your written approval.
                </p>
              </div>

              <div>
                <h3 className="text-xl text-white mb-2">Payment Schedule</h3>
                <ul className="list-disc list-inside space-y-2 ml-6">
                  <li>Deposit: 30% upon contract signing</li>
                  <li>
                    Second Payment: 40% upon commencement of manufacturing
                  </li>
                  <li>Final Payment: 30% upon completion</li>
                </ul>
                <p className="mt-2 text-sm">
                  *Payment terms may vary based on project size
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-3xl text-white mb-4">
              Cancellation and Refunds
            </h2>
            <div className="text-gray-light space-y-3">
              <ul className="list-disc list-inside space-y-2 ml-6">
                <li>
                  Cancellation before manufacturing: 70% refund of deposit
                </li>
                <li>
                  Cancellation after manufacturing begins: 30% refund of total
                  paid
                </li>
                <li>Cancellation after installation: No refund</li>
                <li>All cancellation requests must be in writing</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-3xl text-white mb-4">Warranties</h2>
            <div className="text-gray-light space-y-4">
              <div>
                <h3 className="text-xl text-white mb-2">
                  Workmanship Warranty
                </h3>
                <p>
                  We provide a 2-year warranty on the quality of workmanship and
                  installation.
                </p>
              </div>

              <div>
                <h3 className="text-xl text-white mb-2">Materials Warranty</h3>
                <p>
                  Materials and appliances are subject to manufacturers'
                  warranties.
                </p>
              </div>

              <div>
                <h3 className="text-xl text-white mb-2">Exclusions</h3>
                <p>The warranty does not cover:</p>
                <ul className="list-disc list-inside space-y-2 ml-6 mt-2">
                  <li>Damage from misuse or abuse</li>
                  <li>Normal wear and tear</li>
                  <li>Damage from accidents or natural disasters</li>
                  <li>Unauthorized modifications</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-3xl text-white mb-4">
              Intellectual Property
            </h2>
            <div className="text-gray-light space-y-3">
              <p>
                All designs, drawings, and materials provided by Kitchen Core
                remain our intellectual property until full payment is received.
                They may not be used or reproduced without written permission.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-3xl text-white mb-4">Liability</h2>
            <div className="text-gray-light space-y-3">
              <p>
                Our liability is limited to the total value of the contract. We
                are not liable for:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-6">
                <li>Indirect or consequential damages</li>
                <li>Work performed by unauthorized subcontractors</li>
                <li>Delays caused by circumstances beyond our control</li>
                <li>Site issues not disclosed at the time of assessment</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-3xl text-white mb-4">
              Force Majeure
            </h2>
            <p className="text-gray-light leading-relaxed">
              We are not responsible for any failure or delay in performance due
              to circumstances beyond our reasonable control, including natural
              disasters, wars, strikes, and government actions.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-3xl text-white mb-4">
              Dispute Resolution
            </h2>
            <div className="text-gray-light space-y-3">
              <p>In the event of any dispute:</p>
              <ul className="list-disc list-inside space-y-2 ml-6">
                <li>We will first attempt to resolve the matter amicably</li>
                <li>If unsuccessful, we will resort to mediation</li>
                <li>Governing law is the law of the United Arab Emirates</li>
                <li>Jurisdiction is the courts of Dubai</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-3xl text-white mb-4">
              Changes to Terms
            </h2>
            <p className="text-gray-light leading-relaxed">
              We reserve the right to modify these Terms and Conditions at any
              time. Changes will become effective immediately upon posting on
              our website. Your continued use of our services constitutes
              acceptance of modified terms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-3xl text-white mb-4">Contact Us</h2>
            <div className="text-gray-light space-y-3">
              <p>
                For questions about these Terms and Conditions, please contact
                us:
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
