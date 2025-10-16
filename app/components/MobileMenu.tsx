"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import Image from "next/image";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
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

  const menuItems = [
    { label: "Portfolio", href: "#portfolio" },
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
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

          {/* Menu Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-[80vw] max-w-sm bg-background-card border-l border-green-primary/20 z-50 overflow-y-auto"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-gray-dark">
                <div className="flex items-center gap-3">
                  <Image
                    src="/logo.jpg"
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

              {/* Navigation Links */}
              <nav className="flex-1 p-6">
                <ul className="space-y-2">
                  {menuItems.map((item, index) => (
                    <motion.li
                      key={item.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <a
                        href={item.href}
                        onClick={handleLinkClick}
                        className="block px-4 py-4 text-lg text-gray-light hover:text-green-vibrant hover:bg-green-primary/5 transition-all duration-300 rounded"
                      >
                        {item.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* CTA Button */}
              <div className="p-6 border-t border-gray-dark">
                <a
                  href="#contact"
                  onClick={handleLinkClick}
                  className="block w-full bg-green-primary text-black py-4 text-center text-sm tracking-widest font-medium hover:bg-green-vibrant transition-all duration-300"
                >
                  SCHEDULE CONSULTATION
                </a>
              </div>

              {/* Contact Info */}
              <div className="p-6 bg-background-elevated">
                <div className="space-y-4 text-sm">
                  <div>
                    <div className="text-green-vibrant tracking-wider mb-1">
                      CONTACT
                    </div>
                    <div className="text-gray-light">
                      +971 4 XXX XXXX
                      <br />
                      design@kitchencore.com
                    </div>
                  </div>
                  <div>
                    <div className="text-green-vibrant tracking-wider mb-1">
                      FOLLOW US
                    </div>
                    <div className="flex gap-4 text-gray-light">
                      <a href="#" className="hover:text-green-vibrant transition-colors">
                        Instagram
                      </a>
                      <a href="#" className="hover:text-green-vibrant transition-colors">
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
