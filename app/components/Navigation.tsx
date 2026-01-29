"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import MobileMenu from "./MobileMenu";
import LanguageSwitcher from "./LanguageSwitcher";

const serviceLinks = [
  { id: "modernWood", slug: "modern-kitchens-wood" },
  { id: "classicWood", slug: "classic-kitchens-wood" },
  { id: "aluminum", slug: "aluminum-kitchens" },
  { id: "bedrooms", slug: "bedrooms-wardrobes" },
];

const customerServiceLinks = [
  { id: "site-inspection", labelEn: "Site Inspection", labelAr: "حجز موعد لمعاينة الموقع ورفع القياس" },
  { id: "design-consultation", labelEn: "Design Consultation", labelAr: "حجز موعد للتصميم" },
  { id: "price-quotation", labelEn: "Price Quotation", labelAr: "عرض سعر" },
  { id: "project-tracking", labelEn: "Project Tracking", labelAr: "متابعة مشروع قيد التصنيع والتركيب" },
  { id: "maintenance", labelEn: "Request Maintenance", labelAr: "طلب صيانة" },
];

export default function Navigation() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle smooth scroll to section
  const handleSectionClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    // Check if we're on the homepage
    const isHomePage = pathname === `/${locale}` || pathname === `/${locale}/`;

    if (isHomePage) {
      e.preventDefault();
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    // If not on homepage, let the link navigate normally
  };

  return (
    <>
      {/* Skip Navigation Link - Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-green-primary focus:text-black focus:font-medium focus:text-sm focus:outline-none"
      >
        {t("Accessibility.skipToContent")}
      </a>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Navigation */}
      <nav
        role="navigation"
        aria-label="Main navigation"
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-black/95 backdrop-blur-md shadow-lg shadow-green-primary/10 border-b border-green-primary/20"
            : "bg-black/80 backdrop-blur-sm"
        }`}
      >
        {/* Desktop Navigation */}
        <div className="hidden lg:block max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link
              href={`/${locale}`}
              className="hover:opacity-80 transition-opacity relative w-40 h-12"
            >
              <Image
                src="/logo.png"
                alt="Kitchen Core Logo"
                fill
                className="h-full w-full absolute object-cover"
                priority
              />
            </Link>

            {/* Desktop Menu - Optimized SEO Order: Lead with Visual Proof */}
            <div className="flex items-center gap-6">
              <Link
                href={`/${locale}`}
                className="text-sm tracking-wide font-light text-gray-light hover:text-green-vibrant transition-colors duration-300 relative group whitespace-nowrap"
              >
                {t("Navigation.home")}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-green-primary transition-all duration-300 group-hover:w-full" />
              </Link>
              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <Link
                  href={`/${locale}/services`}
                  className="text-sm tracking-wide font-light text-gray-light hover:text-green-vibrant transition-colors duration-300 relative group whitespace-nowrap flex items-center gap-1"
                >
                  {t("Navigation.services")}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isServicesOpen ? "rotate-180" : ""
                    }`}
                  />
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-green-primary transition-all duration-300 group-hover:w-full" />
                </Link>

                {/* Dropdown Menu - Two Columns */}
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-black/95 backdrop-blur-md border border-green-primary/20 shadow-xl shadow-black/50 transition-all duration-300 ${
                    isServicesOpen
                      ? "opacity-100 visible translate-y-0"
                      : "opacity-0 invisible -translate-y-2"
                  }`}
                >
                  <div className="flex">
                    {/* Column 1: Kitchen & Bedroom Services */}
                    <div className="w-64 py-3 border-r border-green-primary/20">
                      <div className="px-4 pb-2 mb-2 border-b border-green-primary/10">
                        <span className="text-xs text-green-vibrant tracking-widest font-medium">
                          {locale === "ar" ? "الخدمات الرئيسية" : "OUR PRODUCTS"}
                        </span>
                      </div>
                      {serviceLinks.map((service) => (
                        <Link
                          key={service.id}
                          href={`/${locale}/services/${service.slug}`}
                          className="block px-4 py-2.5 text-sm text-gray-light hover:text-green-vibrant hover:bg-green-primary/10 transition-all duration-200 border-l-2 border-transparent hover:border-green-primary"
                        >
                          <span className="font-medium">
                            {t(`ServiceShowcase.${service.id}.title`)}
                          </span>
                          <span className="block text-xs text-gray-500 mt-0.5">
                            {t(`ServiceShowcase.${service.id}.tagline`)}
                          </span>
                        </Link>
                      ))}
                      <div className="border-t border-green-primary/20 mt-2 pt-2">
                        <Link
                          href={`/${locale}/services`}
                          className="block px-4 py-2 text-xs text-green-primary hover:text-green-vibrant transition-colors duration-200 tracking-wider"
                        >
                          {locale === "ar" ? "عرض كل الخدمات ←" : "VIEW ALL SERVICES →"}
                        </Link>
                      </div>
                    </div>

                    {/* Column 2: Customer Services (Booking & Support) */}
                    <div className="w-56 py-3">
                      <div className="px-4 pb-2 mb-2 border-b border-green-primary/10">
                        <span className="text-xs text-green-vibrant tracking-widest font-medium">
                          {locale === "ar" ? "خدمات العملاء" : "CUSTOMER SERVICES"}
                        </span>
                      </div>
                      {customerServiceLinks.map((service) => (
                        <Link
                          key={service.id}
                          href={`/${locale}/services/customer/${service.id}`}
                          className="block px-4 py-2.5 text-sm text-gray-light hover:text-green-vibrant hover:bg-green-primary/10 transition-all duration-200 border-l-2 border-transparent hover:border-green-primary"
                        >
                          {locale === "ar" ? service.labelAr : service.labelEn}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <Link
                href={`/${locale}/gallery`}
                className="text-sm tracking-wide font-light text-gray-light hover:text-green-vibrant transition-colors duration-300 relative group whitespace-nowrap"
              >
                {t("Navigation.gallery")}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-green-primary transition-all duration-300 group-hover:w-full" />
              </Link>
              <Link
                href={`/${locale}/about`}
                className="text-sm tracking-wide font-light text-gray-light hover:text-green-vibrant transition-colors duration-300 relative group whitespace-nowrap"
              >
                {t("Navigation.about")}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-green-primary transition-all duration-300 group-hover:w-full" />
              </Link>
              <Link
                href={`/${locale}#contact`}
                onClick={(e) => handleSectionClick(e, "contact")}
                className="text-sm tracking-wide font-light text-gray-light hover:text-green-vibrant transition-colors duration-300 relative group whitespace-nowrap"
              >
                {t("Navigation.contact")}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-green-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            </div>

            {/* CTA & Language Switcher */}
            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              <Link
                href={`/${locale}#contact`}
                onClick={(e) => handleSectionClick(e, "contact")}
                className="px-5 py-2.5 border border-green-primary text-green-primary hover:bg-green-primary hover:text-black transition-all duration-300 text-xs tracking-wider font-medium whitespace-nowrap"
              >
                {t("Navigation.scheduleConsultation").toUpperCase()}
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Navigation - Always Visible Links */}
        <div className="lg:hidden">
          {/* Top Row: Logo + Language Switcher */}
          <div className="flex justify-between items-center h-16 px-4 border-b border-green-primary/20">
            <Link
              href={`/${locale}`}
              className="hover:opacity-80 transition-opacity relative w-32 h-10"
            >
              <Image
                src="/logo.png"
                alt="Kitchen Core Logo"
                fill
                className="h-full w-full absolute object-cover"
                priority
              />
            </Link>
            <LanguageSwitcher />
          </div>

          {/* Bottom Row: Navigation Links - Always Visible - Optimized SEO Order */}
          <div className="p-2 border-b border-green-primary/10">
            <div className="grid grid-cols-4 gap-1">
              <Link
                href={`/${locale}`}
                className="text-xs text-center tracking-wide font-light text-gray-light hover:text-green-vibrant transition-colors duration-300 py-2"
              >
                {t("Navigation.home")}
              </Link>
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="text-xs text-center tracking-wide font-light text-gray-light hover:text-green-vibrant transition-colors duration-300 py-2 flex items-center justify-center gap-1"
              >
                {t("Navigation.services")}
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-300 ${
                    isServicesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <Link
                href={`/${locale}/gallery`}
                className="text-xs text-center tracking-wide font-light text-gray-light hover:text-green-vibrant transition-colors duration-300 py-2"
              >
                {t("Navigation.gallery")}
              </Link>
              <Link
                href={`/${locale}/about`}
                className="text-xs text-center tracking-wide font-light text-gray-light hover:text-green-vibrant transition-colors duration-300 py-2"
              >
                {t("Navigation.about")}
              </Link>
            </div>

            {/* Mobile Services Dropdown */}
            <div
              className={`overflow-hidden transition-all duration-300 ${
                isServicesOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              {/* Main Services */}
              <div className="pt-2 mt-2 border-t border-green-primary/10">
                <span className="block px-3 py-1 text-[10px] text-green-vibrant tracking-widest font-medium">
                  {locale === "ar" ? "الخدمات الرئيسية" : "OUR PRODUCTS"}
                </span>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  {serviceLinks.map((service) => (
                    <Link
                      key={service.id}
                      href={`/${locale}/services/${service.slug}`}
                      className="text-xs text-gray-light hover:text-green-vibrant transition-colors duration-200 py-2 px-3 bg-background-card border border-gray-dark hover:border-green-primary/50"
                      onClick={() => setIsServicesOpen(false)}
                    >
                      {t(`ServiceShowcase.${service.id}.title`)}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Customer Services */}
              <div className="pt-3 mt-3 border-t border-green-primary/10">
                <span className="block px-3 py-1 text-[10px] text-green-vibrant tracking-widest font-medium">
                  {locale === "ar" ? "خدمات العملاء" : "CUSTOMER SERVICES"}
                </span>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  {customerServiceLinks.map((service) => (
                    <Link
                      key={service.id}
                      href={`/${locale}/services/customer/${service.id}`}
                      className="text-xs text-gray-light hover:text-green-vibrant transition-colors duration-200 py-2 px-3 bg-background-card border border-gray-dark hover:border-green-primary/50"
                      onClick={() => setIsServicesOpen(false)}
                    >
                      {locale === "ar" ? service.labelAr : service.labelEn}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
