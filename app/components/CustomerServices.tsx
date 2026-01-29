"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import {
  Ruler,
  Palette,
  Calculator,
  Truck,
  Wrench,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    id: "site-inspection",
    icon: Ruler,
    titleEn: "Site Inspection & Measurements",
    titleAr: "حجز موعد لمعاينة الموقع ورفع القياس",
    descriptionEn: "Book an appointment for our team to visit your site, assess the space, and take precise measurements.",
    descriptionAr: "احجز موعداً لفريقنا لزيارة موقعك وتقييم المساحة وأخذ القياسات الدقيقة.",
  },
  {
    id: "design-consultation",
    icon: Palette,
    titleEn: "Design Consultation",
    titleAr: "حجز موعد للتصميم",
    descriptionEn: "Meet with our designers to discuss your vision, explore styles, and create your perfect kitchen design.",
    descriptionAr: "قابل مصممينا لمناقشة رؤيتك واستكشاف الأنماط وإنشاء تصميم مطبخك المثالي.",
  },
  {
    id: "price-quotation",
    icon: Calculator,
    titleEn: "Price Quotation",
    titleAr: "عرض سعر",
    descriptionEn: "Get a detailed quote for your project with transparent pricing and no hidden costs.",
    descriptionAr: "احصل على عرض أسعار مفصل لمشروعك بأسعار شفافة وبدون تكاليف مخفية.",
  },
  {
    id: "project-tracking",
    icon: Truck,
    titleEn: "Project Tracking",
    titleAr: "متابعة مشروع قيد التصنيع والتركيب",
    descriptionEn: "Track your project's progress through fabrication and installation phases in real-time.",
    descriptionAr: "تتبع تقدم مشروعك خلال مراحل التصنيع والتركيب في الوقت الفعلي.",
  },
  {
    id: "maintenance",
    icon: Wrench,
    titleEn: "Request Maintenance",
    titleAr: "طلب صيانة",
    descriptionEn: "Need maintenance or repairs? Submit a request and our team will assist you promptly.",
    descriptionAr: "تحتاج صيانة أو إصلاحات؟ قدّم طلبك وفريقنا سيساعدك فوراً.",
  },
];

export default function CustomerServices() {
  const t = useTranslations();
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <section id="customer-services" className="py-24 bg-background-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-green-vibrant text-sm tracking-[0.3em] font-light block mb-4">
            {isArabic ? "خدماتنا" : "OUR SERVICES"}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            {isArabic ? "كيف يمكننا مساعدتك؟" : "How Can We Help?"}
          </h2>
          <p className="text-gray-light text-lg max-w-2xl mx-auto font-light">
            {isArabic
              ? "من المعاينة الأولية حتى الصيانة، نحن معك في كل خطوة"
              : "From initial inspection to maintenance, we're with you every step"}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={`/${locale}/services/customer/${service.id}`}
                className="group block h-full bg-black/50 border border-gray-dark hover:border-green-primary/50 p-8 transition-all duration-500"
              >
                {/* Icon */}
                <div className="w-14 h-14 bg-green-primary/10 border border-green-primary/30 flex items-center justify-center mb-6 group-hover:bg-green-primary/20 transition-colors">
                  <service.icon className="w-7 h-7 text-green-primary" />
                </div>

                {/* Content */}
                <h3 className="font-serif text-xl text-white mb-3 group-hover:text-green-vibrant transition-colors">
                  {isArabic ? service.titleAr : service.titleEn}
                </h3>
                <p className="text-gray-light text-sm leading-relaxed mb-6">
                  {isArabic ? service.descriptionAr : service.descriptionEn}
                </p>

                {/* CTA */}
                <div className="flex items-center gap-2 text-green-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>{isArabic ? "اكتشف المزيد" : "Learn More"}</span>
                  <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isArabic ? "rotate-180 group-hover:-translate-x-1" : ""}`} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-light mb-6">
            {isArabic
              ? "لديك سؤال آخر؟ تواصل معنا مباشرة"
              : "Have another question? Contact us directly"}
          </p>
          <Link
            href={`/${locale}#contact`}
            className="inline-flex items-center gap-3 px-8 py-4 bg-green-primary text-black font-medium text-sm tracking-wider hover:bg-green-vibrant transition-all duration-300"
          >
            {isArabic ? "تواصل معنا" : "CONTACT US"}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
