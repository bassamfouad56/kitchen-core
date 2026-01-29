"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLocale } from "next-intl";

export default function FounderSection() {
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <section
      id="founder"
      className="py-32 bg-background-card border-y border-gray-dark relative overflow-hidden"
    >
      {/* Subtle background glow effects */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-green-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-green-primary/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-green-vibrant text-sm tracking-[0.3em] mb-4 font-light">
              {isArabic ? "التعرف على المؤسس" : "MEET THE VISIONARY"}
            </p>
            <h2 className="font-serif text-5xl md:text-6xl text-white mb-6">
              {isArabic ? "عن المؤسس" : "About the Founder"}
            </h2>
          </motion.div>
        </div>

        {/* Founder Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* CEO Image - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={isArabic ? "order-2 lg:order-2" : "order-2 lg:order-1"}
          >
            <div className="relative group">
              {/* Image container with border */}
              <div className="relative aspect-[3/4] border-2 border-green-primary/40 hover:border-green-primary transition-all duration-500 overflow-hidden">
                <Image
                  src="/founder.jpeg"
                  alt={isArabic ? "المهندس عصام عودة - المؤسس" : "Eng. Esam Odeh - Founder"}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 70vw"
                />
                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Decorative corner accents */}
              <div className="absolute -top-4 -left-4 w-12 h-12 border-l-2 border-t-2 border-green-primary" />
              <div className="absolute -bottom-4 -right-4 w-12 h-12 border-r-2 border-b-2 border-green-primary" />
            </div>
          </motion.div>

          {/* Founder Story - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={isArabic ? "order-1 lg:order-1" : "order-1 lg:order-2"}
          >
            {/* Founder name and title */}
            <div className="mb-8">
              <h3 className="font-serif text-4xl text-white mb-2">
                {isArabic ? "المهندس عصام عودة" : "Eng. Esam Odeh"}
              </h3>
              <p className="text-green-vibrant text-lg tracking-wide">
                {isArabic ? "المؤسس والرئيس التنفيذي" : "Founder & Chief Executive Officer"}
              </p>
              <div className="w-16 h-px bg-green-primary mt-4" />
            </div>

            {/* Founder story */}
            <div className="space-y-6 text-gray-light leading-relaxed font-light">
              {isArabic ? (
                <>
                  <p className="text-lg">
                    يقود المهندس عصام عودة شركة{" "}
                    <span className="text-green-primary font-normal">
                      "كيتشن كور"
                    </span>{" "}
                    برؤية هندسية استراتيجية تجمع بين الدقة الفنية والاحترافية الإدارية الشاملة.
                  </p>
                  <p>
                    تنطلق فلسفته القيادية من إيمان عميق بأن النجاح المؤسسي يبدأ من التفاصيل، حيث يرتكز نهجه على أربعة محاور أساسية: إدارة المشاريع، تطوير الكفاءات البشرية، إدارة الجودة الشاملة، ورضى العملاء.
                  </p>
                  <p>
                    انطلقت رحلتنا بقيادة المهندس عصام من دولة الإمارات العربية المتحدة، حيث أرسينا قواعد التميز والابتكار، ومنها توسعنا لنضع بصمتنا في المملكة الأردنية الهاشمية.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-lg">
                    Eng. Esam Odeh leads{" "}
                    <span className="text-green-primary font-normal">
                      Kitchen Core
                    </span>{" "}
                    with a strategic engineering vision that combines technical precision with comprehensive professional management.
                  </p>
                  <p>
                    His leadership philosophy stems from a deep belief that institutional success begins with attention to detail. His approach is built on four core pillars: Project Management, Human Resource Development, Total Quality Management, and Customer Satisfaction.
                  </p>
                  <p>
                    Our journey began under Eng. Esam's leadership from the United Arab Emirates, where we established the foundations of excellence and innovation, and from there we expanded to make our mark in the Hashemite Kingdom of Jordan.
                  </p>
                </>
              )}
            </div>

            {/* Key Focus Areas */}
            <div className="mt-10 grid grid-cols-2 gap-8">
              <div className="border-l-2 border-green-primary pl-6">
                <div className="text-green-vibrant text-sm tracking-widest mb-2">
                  {isArabic ? "محاور العمل" : "FOCUS AREAS"}
                </div>
                <div className="text-white font-light text-sm leading-relaxed">
                  {isArabic ? (
                    <>
                      إدارة المشاريع
                      <br />
                      تطوير الكفاءات
                      <br />
                      إدارة الجودة الشاملة
                    </>
                  ) : (
                    <>
                      Project Management
                      <br />
                      Talent Development
                      <br />
                      Quality Management
                    </>
                  )}
                </div>
              </div>
              <div className="border-l-2 border-green-primary pl-6">
                <div className="text-green-vibrant text-sm tracking-widest mb-2">
                  {isArabic ? "التواجد" : "PRESENCE"}
                </div>
                <div className="text-white font-light text-sm leading-relaxed">
                  {isArabic ? (
                    <>
                      الإمارات العربية المتحدة
                      <br />
                      المملكة الأردنية الهاشمية
                      <br />
                      توسع نحو الخليج والعالمية
                    </>
                  ) : (
                    <>
                      United Arab Emirates
                      <br />
                      Hashemite Kingdom of Jordan
                      <br />
                      Expanding to Gulf & Global
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Personal Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-10 bg-green-primary/5 border-l-4 border-green-primary p-6"
            >
              <p className="text-white italic text-lg leading-relaxed">
                {isArabic
                  ? "نحن في كيتشن كور لا نصمم مطابخ فحسب، بل نبني مستقبلاً يتجاوز الحدود الجغرافية ليقدم مفهوماً جديداً للأناقة والجودة في كل مكان."
                  : "At Kitchen Core, we don't just design kitchens — we build a future that transcends geographical boundaries to offer a new concept of elegance and quality everywhere."}
              </p>
              <p className="text-green-vibrant text-sm mt-4 tracking-wide">
                — {isArabic ? "المهندس عصام عودة" : "Eng. Esam Odeh"}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
