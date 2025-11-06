"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import ContactForm from "../components/ContactForm";
import Testimonials from "../components/Testimonials";
import ProcessTimeline from "../components/ProcessTimeline";
import EnhancedPortfolio from "../components/EnhancedPortfolio";
import TechnicalSpecs from "../components/TechnicalSpecs";
import InnovationShowcase from "../components/InnovationShowcase";
import Credentials from "../components/Credentials";
import EngineeringMetrics from "../components/EngineeringMetrics";
import ArtisticGallery from "../components/ArtisticGallery";
import BeforeAfterSlider from "../components/BeforeAfterSlider";
import StunningCTA from "../components/StunningCTA";
import FounderSection from "../components/FounderSection";
import GalleryNass0 from "../components/GalleryNass0";
import GalleryNass1 from "../components/GalleryNass1";
import GalleryNass2 from "../components/GalleryNass2";
import GalleryNass3 from "../components/GalleryNass3";
import GalleryNass4 from "../components/GalleryNass4";
import VideoShowcase from "../components/VideoShowcase";

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
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
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
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="#portfolio"
                className="bg-green-primary text-black px-10 py-4 text-sm tracking-widest font-medium hover:bg-green-vibrant transition-all duration-300 shadow-xl shadow-green-primary/20 hover:shadow-green-vibrant/40"
              >
                {t("Hero.viewProjects").toUpperCase()}
              </a>
              <a
                href="#contact"
                className="border-2 border-green-primary text-green-primary px-10 py-4 text-sm tracking-widest font-medium hover:bg-green-primary/10 transition-all duration-300"
              >
                {t("Hero.startProject").toUpperCase()}
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

      {/* Trust Markers */}
      <section className="py-20 bg-background-elevated border-y border-gray-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "150+", label: t("Stats.kitchens") },
              { number: "25+", label: t("Stats.countries") },
              { number: "15", label: t("Stats.experience") },
              { number: "100%", label: t("Stats.satisfaction") },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="font-serif text-5xl text-green-vibrant mb-2">
                  {stat.number}
                </div>
                <div className="text-sm tracking-wider text-gray-light uppercase">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Portfolio Section */}
      <EnhancedPortfolio />

      {/* Artistic Gallery Showcase */}
      <ArtisticGallery />

      {/* New Gallery Sections - nass0-nass4 */}
      <GalleryNass0 />

      <GalleryNass1 />

      <GalleryNass2 />

      <GalleryNass3 />

      <GalleryNass4 />

      {/* Video Showcase */}
      <VideoShowcase />

      {/* Before/After Transformation Slider */}
      <BeforeAfterSlider />

      {/* Services Section */}
      <section
        id="services"
        className="py-32 bg-background-card relative overflow-hidden"
      >
        {/* Subtle green glow effect */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-primary/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-green-vibrant text-sm tracking-[0.3em] mb-4 font-light">
                {t("Services.badge").toUpperCase()}
              </p>
              <h2 className="font-serif text-5xl md:text-6xl text-white mb-6">
                {t("Services.title")}
              </h2>
            </motion.div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: t("Services.palace.title"),
                description: t("Services.palace.description"),
                features: t.raw("Services.palace.features") as string[],
              },
              {
                title: t("Services.villa.title"),
                description: t("Services.villa.description"),
                features: t.raw("Services.villa.features") as string[],
              },
              {
                title: t("Services.estate.title"),
                description: t("Services.estate.description"),
                features: t.raw("Services.estate.features") as string[],
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-background-elevated border border-gray-dark hover:border-green-primary/60 p-8 transition-all duration-500 h-full hover:shadow-xl hover:shadow-green-primary/10">
                  <div className="w-12 h-px bg-green-primary mb-8" />
                  <h3 className="font-serif text-3xl mb-6 text-white group-hover:text-green-vibrant transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-light mb-8 leading-relaxed font-light">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 text-sm text-gray-light"
                      >
                        <span className="w-1.5 h-1.5 bg-green-vibrant" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specifications Section */}
      <TechnicalSpecs />

      {/* Innovation Showcase Section */}
      <InnovationShowcase />

      {/* Engineering Metrics Section */}
      <EngineeringMetrics />

      {/* About / Story Section */}
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
                className="aspect-[3/4] bg-cover bg-center border border-gray-dark"
                style={{
                  backgroundImage: "url(/8.jpg)",
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

      {/* About Founder Section */}
      <FounderSection />

      {/* Process Timeline Section */}
      <ProcessTimeline />

      {/* Professional Credentials Section */}
      <Credentials />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Stunning CTA Section */}
      <StunningCTA />

      {/* Partnerships */}
      <section className="py-20 bg-background-elevated border-y border-gray-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-green-vibrant text-sm tracking-[0.3em] font-light">
              {t("Partnerships.badge").toUpperCase()}
            </p>
            <h3 className="font-serif text-3xl text-white mt-4">
              {t("Partnerships.title")}
            </h3>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
            {["Sub-Zero", "Wolf", "Miele", "Gaggenau", "Boffi", "Poliform"].map(
              (brand) => (
                <div
                  key={brand}
                  className="text-gray-light text-lg tracking-wider font-light hover:text-green-primary transition-colors"
                >
                  {brand}
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-black relative overflow-hidden">
        {/* Green glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-primary/5 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-green-vibrant text-sm tracking-[0.3em] mb-4 font-light">
              {t("Contact.badge").toUpperCase()}
            </p>
            <h2 className="font-serif text-5xl md:text-6xl text-white mb-8">
              {t("Contact.title")}
            </h2>
            <p className="text-lg text-gray-light mb-12 font-light leading-relaxed max-w-2xl mx-auto">
              {t("Contact.description")}
            </p>
            <ContactForm />
            <div className="mt-16 pt-16 border-t border-gray-dark">
              <div className="grid md:grid-cols-3 gap-8 text-sm">
                <div>
                  <div className="text-green-vibrant tracking-wider mb-2">
                    {t("Contact.showroom").toUpperCase()}
                  </div>
                  <div className="text-gray-light font-light whitespace-pre-line">
                    {t("Contact.showroomValue")}
                  </div>
                </div>
                <div>
                  <div className="text-green-vibrant tracking-wider mb-2">
                    {t("Contact.contactLabel").toUpperCase()}
                  </div>
                  <div className="text-gray-light font-light whitespace-pre-line">
                    {t("Contact.contactValue")}
                  </div>
                </div>
                <div>
                  <div className="text-green-vibrant tracking-wider mb-2">
                    {t("Contact.follow").toUpperCase()}
                  </div>
                  <a
                    href="https://instagram.com/kitchen_core_uae?igsh=cGx3ejc0YWtleXU3"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-light hover:text-green-primary transition-colors font-light flex items-center gap-2 group"
                  >
                    <svg
                      className="w-5 h-5 group-hover:scale-110 transition-transform"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <span>@kitchen_core_uae</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background-elevated text-gray-light py-12 border-t border-gray-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
            <Image
              src="/logo.png"
              alt="Kitchen Core Logo"
              width={150}
              height={50}
              className="h-12 w-auto"
            />
            <div className="font-light">{t("Footer.copyright")}</div>
            <div className="flex gap-6 font-light">
              <a
                href="#"
                className="hover:text-green-primary transition-colors"
              >
                {t("Footer.privacy")}
              </a>
              <a
                href="#"
                className="hover:text-green-primary transition-colors"
              >
                {t("Footer.terms")}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
