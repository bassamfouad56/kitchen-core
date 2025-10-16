"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import MobileMenu from "./components/MobileMenu";
import ContactForm from "./components/ContactForm";
import Testimonials from "./components/Testimonials";
import ProcessTimeline from "./components/ProcessTimeline";
import EnhancedPortfolio from "./components/EnhancedPortfolio";
import TechnicalSpecs from "./components/TechnicalSpecs";
import InnovationShowcase from "./components/InnovationShowcase";
import Credentials from "./components/Credentials";
import EngineeringMetrics from "./components/EngineeringMetrics";
import ArtisticGallery from "./components/ArtisticGallery";
import BeforeAfterSlider from "./components/BeforeAfterSlider";
import StunningCTA from "./components/StunningCTA";
import FounderSection from "./components/FounderSection";


export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.95]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-black/95 backdrop-blur-md shadow-lg shadow-green-primary/10 border-b border-green-primary/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <a href="#" className="hover:opacity-80 transition-opacity">
                <Image
                  src="/logo.jpg"
                  alt="Kitchen Core Logo"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                  priority
                />
              </a>
            </div>
            <div className="hidden md:flex items-center gap-12">
              {[
                { label: "Portfolio", href: "#portfolio" },
                { label: "Gallery", href: "#gallery" },
                { label: "Technology", href: "#innovation" },
                { label: "Services", href: "#services" },
                { label: "Founder", href: "#founder" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm tracking-wide font-light text-gray-light hover:text-green-vibrant transition-colors duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-green-primary transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>
            <button className="hidden md:block px-6 py-2.5 border border-green-primary text-green-primary hover:bg-green-primary hover:text-black transition-all duration-300 text-sm tracking-wide font-medium">
              SCHEDULE CONSULTATION
            </button>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 text-gray-light hover:text-green-vibrant transition-colors"
              aria-label="Open menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Full Screen with Parallax */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Hero Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url(/1.jpg)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-green-darker/30 via-transparent to-green-darker/30" />
        </div>

        {/* Animated grid overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(200, 225, 99, 0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(200, 225, 99, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
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
                LUXURY KITCHEN SPECIALISTS
              </p>
            </div>
            <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-white mb-8 leading-tight">
              Culinary
              <br />
              <span className="text-green-vibrant italic">Excellence</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-light max-w-3xl mx-auto font-light leading-relaxed mb-12">
              Bespoke kitchen design and fit-out for{" "}
              <span className="text-green-primary font-normal">palaces</span>,{" "}
              <span className="text-green-primary font-normal">villas</span>, and{" "}
              <span className="text-green-primary font-normal">luxury estates</span>. Where Italian
              craftsmanship meets cutting-edge technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="#portfolio"
                className="bg-green-primary text-black px-10 py-4 text-sm tracking-widest font-medium hover:bg-green-vibrant transition-all duration-300 shadow-xl shadow-green-primary/20 hover:shadow-green-vibrant/40"
              >
                VIEW PROJECTS
              </a>
              <a
                href="#contact"
                className="border-2 border-green-primary text-green-primary px-10 py-4 text-sm tracking-widest font-medium hover:bg-green-primary/10 transition-all duration-300"
              >
                START YOUR PROJECT
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
            <span>SCROLL</span>
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
              { number: "150+", label: "Luxury Kitchens" },
              { number: "25+", label: "Countries" },
              { number: "15", label: "Years Excellence" },
              { number: "100%", label: "Client Satisfaction" },
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

      {/* Before/After Transformation Slider */}
      <BeforeAfterSlider />

      {/* Services Section */}
      <section id="services" className="py-32 bg-background-card relative overflow-hidden">
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
                OUR EXPERTISE
              </p>
              <h2 className="font-serif text-5xl md:text-6xl text-white mb-6">
                Comprehensive Services
              </h2>
            </motion.div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Palace Kitchen Design",
                description:
                  "Bespoke kitchen architecture for palatial residences combining classical grandeur with modern culinary technology.",
                features: [
                  "Custom millwork & cabinetry",
                  "Italian marble selection",
                  "Smart home integration",
                  "Premium appliance curation",
                ],
              },
              {
                title: "Villa Kitchen Fit-Out",
                description:
                  "Complete kitchen solutions for luxury villas featuring handcrafted details and state-of-the-art equipment.",
                features: [
                  "European appliances",
                  "Wine cellar integration",
                  "Outdoor kitchen design",
                  "Lighting architecture",
                ],
              },
              {
                title: "Estate Kitchen Systems",
                description:
                  "Holistic kitchen design for private estates with butler's pantries, prep kitchens, and entertaining spaces.",
                features: [
                  "Multi-zone kitchens",
                  "Professional equipment",
                  "Ventilation systems",
                  "Custom storage solutions",
                ],
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
                OUR PHILOSOPHY
              </p>
              <h2 className="font-serif text-5xl text-white mb-8">
                Crafting Culinary Sanctuaries
              </h2>
              <div className="space-y-6 text-gray-light leading-relaxed font-light">
                <p>
                  For over fifteen years, Kitchen Core has been the trusted partner for
                  the world's most exclusive residences, transforming kitchens into
                  architectural masterpieces.
                </p>
                <p>
                  Our approach combines old-world Italian craftsmanship with
                  cutting-edge smart technology, creating kitchens that are both
                  timeless and innovative.
                </p>
                <p>
                  From palatial estates in Dubai to coastal villas in Monaco, we
                  collaborate with elite clients who demand nothing less than
                  perfection in every detail.
                </p>
              </div>
              <div className="mt-12 grid grid-cols-2 gap-8">
                <div>
                  <div className="text-green-vibrant text-sm tracking-widest mb-2">
                    RECOGNIZED BY
                  </div>
                  <div className="text-white font-light">
                    Architectural Digest
                    <br />
                    Luxury Home Design
                  </div>
                </div>
                <div>
                  <div className="text-green-vibrant text-sm tracking-widest mb-2">
                    AWARDS
                  </div>
                  <div className="text-white font-light">
                    Best Kitchen Design 2024
                    <br />
                    Excellence in Fit-Out
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
              PREMIUM PARTNERSHIPS
            </p>
            <h3 className="font-serif text-3xl text-white mt-4">
              Trusted by the World's Best Brands
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
              BEGIN YOUR JOURNEY
            </p>
            <h2 className="font-serif text-5xl md:text-6xl text-white mb-8">
              Let's Create Your Dream Kitchen
            </h2>
            <p className="text-lg text-gray-light mb-12 font-light leading-relaxed max-w-2xl mx-auto">
              Schedule a private consultation to discuss your vision. We work exclusively
              with clients who value exceptional quality and timeless design.
            </p>
            <ContactForm />
            <div className="mt-16 pt-16 border-t border-gray-dark">
              <div className="grid md:grid-cols-3 gap-8 text-sm">
                <div>
                  <div className="text-green-vibrant tracking-wider mb-2">
                    VISIT OUR SHOWROOM
                  </div>
                  <div className="text-gray-light font-light">
                    By appointment only
                    <br />
                    Dubai Design District
                  </div>
                </div>
                <div>
                  <div className="text-green-vibrant tracking-wider mb-2">
                    CONTACT
                  </div>
                  <div className="text-gray-light font-light">
                    +971 4 XXX XXXX
                    <br />
                    design@kitchencore.com
                  </div>
                </div>
                <div>
                  <div className="text-green-vibrant tracking-wider mb-2">
                    FOLLOW
                  </div>
                  <div className="text-gray-light font-light">
                    Instagram / Pinterest
                    <br />
                    LinkedIn / Houzz
                  </div>
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
              src="/logo.jpg"
              alt="Kitchen Core Logo"
              width={150}
              height={50}
              className="h-12 w-auto"
            />
            <div className="font-light">
              © 2025 Kitchen Core. All rights reserved.
            </div>
            <div className="flex gap-6 font-light">
              <a href="#" className="hover:text-green-primary transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-green-primary transition-colors">
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
