"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import VideoShowcase from "../components/VideoShowcase";
import ServiceShowcase from "../components/ServiceShowcase";
import CustomerServices from "../components/CustomerServices";
import MissionVision from "../components/about/MissionVision";

export default function Home() {
  const t = useTranslations();
  const locale = useLocale();
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.95]);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Hero Section - Full Screen with Parallax */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32"
      >
        {/* Hero Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            poster="/1.jpg"
          >
            <source
              src="https://dr3oahdfiq9ky1mn.public.blob.vercel-storage.com/kitchen%20core%20new.mp4"
              type="video/mp4"
            />
            {/* Fallback to image if video doesn't load */}
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-green-darker/20 via-transparent to-green-darker/20" />
        </div>

        {/* Animated grid overlay */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(200, 225, 99, 0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(200, 225, 99, 0.1) 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="inline-block mb-6 px-6 py-2 border border-green-primary/50 bg-green-darker/20 backdrop-blur-sm">
              <p className="text-green-vibrant text-sm tracking-[0.3em] font-light">
                {t("Hero.badge").toUpperCase()}
              </p>
            </div>
            <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-white mb-8 leading-tight">
              {t("Hero.title")}
              <br />
              <span className="text-green-vibrant italic">
                {t("Hero.titleHighlight")}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-light max-w-3xl mx-auto font-light leading-relaxed mb-12">
              {t("Hero.description")}
            </p>
            <div className="flex justify-center">
              <a
                href="#services"
                className="bg-green-primary text-black px-12 py-4 text-sm tracking-widest font-medium hover:bg-green-vibrant transition-all duration-300 shadow-xl shadow-green-primary/20 hover:shadow-green-vibrant/40"
              >
                {t("Hero.viewProjects").toUpperCase()}
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-green-primary/60 text-xs tracking-widest">
            <span>{t("Hero.scroll").toUpperCase()}</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-px h-16 bg-gradient-to-b from-green-primary to-transparent"
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Service Showcase - 4 Category Sections */}
      <ServiceShowcase />

      {/* Mission & Vision - Company Story */}
      <MissionVision locale={locale} />

      {/* Video Showcase - Visual demonstration of work */}
      <VideoShowcase />

      {/* Customer Services - Booking & Support Options */}
      <CustomerServices />

      {/* About / Story Section - Condensed */}
      <section id="about" className="py-32 bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div
                className="aspect-[3/4] bg-contain bg-center border border-gray-dark bg-no-repeat"
                style={{
                  backgroundImage: "url(/ceo.png)",
                }}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-green-vibrant text-sm tracking-[0.3em] mb-4 font-light">
                {t("About.badge").toUpperCase()}
              </p>
              <h2 className="font-serif text-5xl text-white mb-8">
                {t("About.title")}
              </h2>
              <div className="space-y-6 text-gray-light leading-relaxed font-light">
                <p>{t("About.description1")}</p>
                <p>{t("About.description2")}</p>
                <p>{t("About.description3")}</p>
              </div>
              <div className="mt-12 grid grid-cols-2 gap-8">
                <div>
                  <div className="text-green-vibrant text-sm tracking-widest mb-2">
                    {t("About.recognizedBy").toUpperCase()}
                  </div>
                  <div className="text-white font-light whitespace-pre-line">
                    {t("About.recognizedByValue")}
                  </div>
                </div>
                <div>
                  <div className="text-green-vibrant text-sm tracking-widest mb-2">
                    {t("About.awards").toUpperCase()}
                  </div>
                  <div className="text-white font-light whitespace-pre-line">
                    {t("About.awardsValue")}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
