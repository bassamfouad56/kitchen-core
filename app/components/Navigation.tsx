"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import MobileMenu from "./MobileMenu";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navigation() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Navigation */}
      <nav
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

            {/* Desktop Menu */}
            <div className="flex items-center gap-8">
              <Link
                href={`/${locale}`}
                className="text-sm tracking-wide font-light text-gray-light hover:text-green-vibrant transition-colors duration-300 relative group whitespace-nowrap"
              >
                {t("Navigation.home")}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-green-primary transition-all duration-300 group-hover:w-full" />
              </Link>
              <Link
                href={`/${locale}#portfolio`}
                onClick={(e) => handleSectionClick(e, "portfolio")}
                className="text-sm tracking-wide font-light text-gray-light hover:text-green-vibrant transition-colors duration-300 relative group whitespace-nowrap"
              >
                {t("Navigation.portfolio")}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-green-primary transition-all duration-300 group-hover:w-full" />
              </Link>
              <Link
                href={`/${locale}/blog`}
                className="text-sm tracking-wide font-light text-gray-light hover:text-green-vibrant transition-colors duration-300 relative group whitespace-nowrap"
              >
                {t("Navigation.blog")}
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

          {/* Bottom Row: Navigation Links - Always Visible */}
          <div className="flex justify-around items-center h-12 px-2 border-b border-green-primary/10">
            <Link
              href={`/${locale}`}
              className="text-xs tracking-wide font-light text-gray-light hover:text-green-vibrant transition-colors duration-300 relative group px-2"
            >
              {t("Navigation.home")}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-green-primary transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link
              href={`/${locale}#portfolio`}
              onClick={(e) => handleSectionClick(e, "portfolio")}
              className="text-xs tracking-wide font-light text-gray-light hover:text-green-vibrant transition-colors duration-300 relative group px-2"
            >
              {t("Navigation.portfolio")}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-green-primary transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link
              href={`/${locale}/blog`}
              className="text-xs tracking-wide font-light text-gray-light hover:text-green-vibrant transition-colors duration-300 relative group px-2"
            >
              {t("Navigation.blog")}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-green-primary transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link
              href={`/${locale}/about`}
              className="text-xs tracking-wide font-light text-gray-light hover:text-green-vibrant transition-colors duration-300 relative group px-2"
            >
              {t("Navigation.about")}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-green-primary transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link
              href={`/${locale}#contact`}
              onClick={(e) => handleSectionClick(e, "contact")}
              className="text-xs tracking-wide font-light text-gray-light hover:text-green-vibrant transition-colors duration-300 relative group px-2"
            >
              {t("Navigation.contact")}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-green-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
