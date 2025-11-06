"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

interface AboutCTAProps {
  locale: string;
}

export default function AboutCTA({ locale }: AboutCTAProps) {
  const isArabic = locale === "ar";
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      className="py-32 bg-black relative overflow-hidden"
    >
      {/* Dramatic Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-primary/10 rounded-full blur-3xl" />

      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(200, 225, 99, 0.2) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(200, 225, 99, 0.2) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <div className="inline-block mb-8 px-8 py-3 border border-green-primary/50 bg-green-darker/30 backdrop-blur-md">
            <p className="text-green-vibrant text-sm tracking-[0.4em] font-light uppercase">
              {isArabic ? "ابدأ رحلتك" : "Start Your Journey"}
            </p>
          </div>

          {/* Heading */}
          <h2 className="font-serif text-5xl md:text-7xl text-white mb-8 leading-tight">
            {isArabic ? (
              <>
                دعنا نخلق{" "}
                <span className="text-green-vibrant italic">
                  مطبخ أحلامك
                </span>
              </>
            ) : (
              <>
                Let's Create Your{" "}
                <span className="text-green-vibrant italic">Dream Kitchen</span>
              </>
            )}
          </h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-light mb-12 font-light leading-relaxed max-w-3xl mx-auto"
          >
            {isArabic
              ? "هل أنت مستعد لتحويل مساحة مطبخك إلى تحفة فنية؟ دعنا نناقش مشروعك وكيف يمكننا تحقيق رؤيتك."
              : "Ready to transform your kitchen space into a masterpiece? Let's discuss your project and how we can bring your vision to life."}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            {/* Primary CTA */}
            <Link
              href={`/${locale}#contact`}
              className="group relative bg-green-primary text-black px-12 py-5 text-sm tracking-widest font-medium hover:bg-green-vibrant transition-all duration-300 shadow-2xl shadow-green-primary/30 hover:shadow-green-vibrant/50 overflow-hidden"
            >
              <span className="relative z-10">
                {isArabic ? "احجز استشارة" : "SCHEDULE CONSULTATION"}
              </span>

              {/* Animated Background */}
              <div className="absolute inset-0 bg-green-vibrant transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            </Link>

            {/* Secondary CTA */}
            <Link
              href={`/${locale}#portfolio`}
              className="group relative border-2 border-green-primary text-green-primary px-12 py-5 text-sm tracking-widest font-medium hover:bg-green-primary/10 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10">
                {isArabic ? "استكشف أعمالنا" : "EXPLORE OUR WORK"}
              </span>

              {/* Animated Border */}
              <div className="absolute inset-0 border-2 border-green-vibrant opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-16 pt-12 border-t border-gray-dark"
          >
            <div className="grid md:grid-cols-4 gap-8 text-sm mb-8">
              {/* Phone */}
              <div className="group">
                <div className="text-green-vibrant tracking-wider mb-2 uppercase text-xs">
                  {isArabic ? "اتصل بنا" : "Call Us"}
                </div>
                <a
                  href="tel:+966123456789"
                  className="text-gray-light hover:text-green-primary transition-colors font-light"
                >
                  +966 12 345 6789
                </a>
              </div>

              {/* Email */}
              <div className="group">
                <div className="text-green-vibrant tracking-wider mb-2 uppercase text-xs">
                  {isArabic ? "راسلنا" : "Email Us"}
                </div>
                <a
                  href="mailto:info@kitchencore.com"
                  className="text-gray-light hover:text-green-primary transition-colors font-light"
                >
                  info@kitchencore.com
                </a>
              </div>

              {/* Location */}
              <div className="group">
                <div className="text-green-vibrant tracking-wider mb-2 uppercase text-xs">
                  {isArabic ? "زرنا" : "Visit Us"}
                </div>
                <div className="text-gray-light font-light">
                  {isArabic
                    ? "الرياض، المملكة العربية السعودية"
                    : "Riyadh, Saudi Arabia"}
                </div>
              </div>

              {/* Instagram */}
              <div className="group">
                <div className="text-green-vibrant tracking-wider mb-2 uppercase text-xs">
                  {isArabic ? "تابعنا" : "Follow Us"}
                </div>
                <a
                  href="https://instagram.com/kitchen_core_uae?igsh=cGx3ejc0YWtleXU3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-light hover:text-green-primary transition-colors font-light flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  @kitchen_core_uae
                </a>
              </div>
            </div>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "200px" } : {}}
            transition={{ delay: 0.8, duration: 1 }}
            className="h-px bg-gradient-to-r from-transparent via-green-primary to-transparent mx-auto mt-16"
          />
        </motion.div>
      </div>
    </section>
  );
}
