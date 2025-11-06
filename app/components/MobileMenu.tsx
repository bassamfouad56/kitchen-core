"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === "ar";

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const pageLinks = [
    { label: t("Navigation.home"), href: `/${locale}` },
    { label: t("Navigation.about"), href: `/${locale}/about` },
    { label: t("Navigation.blog"), href: `/${locale}/blog` },
    { label: t("Navigation.contact"), href: "#contact" },
  ];

  const sectionLinks = [
    { label: t("Navigation.portfolio"), href: "#portfolio" },
    { label: t("Navigation.gallery"), href: "#gallery" },
    { label: t("Navigation.collections"), href: "#gallery-nass0" },
    { label: t("Navigation.videos"), href: "#video-showcase" },
    { label: t("Navigation.technology"), href: "#innovation" },
    { label: t("Navigation.services"), href: "#services" },
    { label: t("Navigation.founder"), href: "#founder" },
  ];

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Menu Panel - RTL aware */}
          <motion.div
            initial={{ x: isRTL ? "-100%" : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: isRTL ? "-100%" : "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className={`fixed top-0 ${isRTL ? "left-0 border-r" : "right-0 border-l"} bottom-0 w-[80vw] max-w-sm bg-background-card border-green-primary/20 z-50 overflow-y-auto`}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-gray-dark">
                <div className="flex items-center gap-3">
                  <Image
                    src="/logo.png"
                    alt="Kitchen Core Logo"
                    width={120}
                    height={40}
                    className="h-10 w-auto"
                  />
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-light hover:text-green-vibrant transition-colors"
                  aria-label="Close menu"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Language Switcher */}
              <div className="px-6 py-4 border-b border-gray-dark flex justify-center">
                <LanguageSwitcher />
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 p-6 overflow-y-auto">
                {/* Pages Section */}
                <div className="mb-8">
                  <h3 className="text-green-vibrant text-xs tracking-[0.3em] mb-4 px-4 font-light">
                    {isRTL ? "الصفحات" : "PAGES"}
                  </h3>
                  <ul className="space-y-2">
                    {pageLinks.map((item, index) => (
                      <motion.li
                        key={item.label}
                        initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <a
                          href={item.href}
                          onClick={handleLinkClick}
                          className="block px-4 py-3 text-base text-gray-light hover:text-green-vibrant hover:bg-green-primary/5 transition-all duration-300 rounded border-l-2 border-transparent hover:border-green-vibrant"
                        >
                          {item.label}
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Sections */}
                <div>
                  <h3 className="text-green-vibrant text-xs tracking-[0.3em] mb-4 px-4 font-light">
                    {isRTL ? "الأقسام" : "SECTIONS"}
                  </h3>
                  <ul className="space-y-2">
                    {sectionLinks.map((item, index) => (
                      <motion.li
                        key={item.label}
                        initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (pageLinks.length + index) * 0.1 }}
                      >
                        <a
                          href={item.href}
                          onClick={handleLinkClick}
                          className="block px-4 py-3 text-base text-gray-light hover:text-green-vibrant hover:bg-green-primary/5 transition-all duration-300 rounded border-l-2 border-transparent hover:border-green-vibrant"
                        >
                          {item.label}
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </nav>

              {/* CTA Button */}
              <div className="p-6 border-t border-gray-dark">
                <a
                  href="#contact"
                  onClick={handleLinkClick}
                  className="block w-full bg-green-primary text-black py-4 text-center text-sm tracking-widest font-medium hover:bg-green-vibrant transition-all duration-300"
                >
                  {t("Navigation.scheduleConsultation").toUpperCase()}
                </a>
              </div>

              {/* Contact Info */}
              <div className="p-6 bg-background-elevated">
                <div className="space-y-4 text-sm">
                  <div>
                    <div className="text-green-vibrant tracking-wider mb-1">
                      {t("Contact.contactLabel").toUpperCase()}
                    </div>
                    <div className="text-gray-light whitespace-pre-line">
                      {t("Contact.contactValue")}
                    </div>
                  </div>
                  <div>
                    <div className="text-green-vibrant tracking-wider mb-1">
                      {t("Contact.follow").toUpperCase()}
                    </div>
                    <div className="flex gap-4 text-gray-light">
                      <a
                        href="#"
                        className="hover:text-green-vibrant transition-colors"
                      >
                        Instagram
                      </a>
                      <a
                        href="#"
                        className="hover:text-green-vibrant transition-colors"
                      >
                        LinkedIn
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
