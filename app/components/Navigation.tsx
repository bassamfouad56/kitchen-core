"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import MobileMenu from "./MobileMenu";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navigation() {
  const t = useTranslations();
  const locale = useLocale();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
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
            <div className="hidden lg:flex items-center gap-6">
              <Link
                href={`/${locale}`}
                className="text-sm tracking-wide font-light text-gray-light hover:text-green-vibrant transition-colors duration-300 relative group whitespace-nowrap"
              >
                {t("Navigation.home")}
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
                href={`/${locale}/blog`}
                className="text-sm tracking-wide font-light text-gray-light hover:text-green-vibrant transition-colors duration-300 relative group whitespace-nowrap"
              >
                {t("Navigation.blog")}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-green-primary transition-all duration-300 group-hover:w-full" />
              </Link>
              <Link
                href={`/${locale}#portfolio`}
                className="text-sm tracking-wide font-light text-gray-light hover:text-green-vibrant transition-colors duration-300 relative group whitespace-nowrap"
              >
                {t("Navigation.portfolio")}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-green-primary transition-all duration-300 group-hover:w-full" />
              </Link>
              <Link
                href={`/${locale}#contact`}
                className="text-sm tracking-wide font-light text-gray-light hover:text-green-vibrant transition-colors duration-300 relative group whitespace-nowrap"
              >
                {t("Navigation.contact")}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-green-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            </div>

            {/* CTA & Language Switcher */}
            <div className="hidden lg:flex items-center gap-3">
              <LanguageSwitcher />
              <Link
                href={`/${locale}#contact`}
                className="px-5 py-2.5 border border-green-primary text-green-primary hover:bg-green-primary hover:text-black transition-all duration-300 text-xs tracking-wider font-medium whitespace-nowrap"
              >
                {t("Navigation.scheduleConsultation").toUpperCase()}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-gray-light hover:text-green-vibrant transition-colors"
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
    </>
  );
}
