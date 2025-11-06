"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useScrollSpy } from "../hooks/useScrollSpy";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Organized sections with categories and descriptions
const sectionGroups = [
  {
    category: "showcase",
    sections: [
      { id: "portfolio", labelKey: "Navigation.portfolio", icon: "📁" },
      { id: "gallery", labelKey: "Navigation.gallery", icon: "🖼️" },
      { id: "gallery-nass0", labelKey: "Navigation.collections", icon: "🎨" },
      { id: "video-showcase", labelKey: "Navigation.videos", icon: "🎬" },
    ]
  },
  {
    category: "expertise",
    sections: [
      { id: "innovation", labelKey: "Navigation.technology", icon: "⚡" },
      { id: "services", labelKey: "Navigation.services", icon: "🛠️" },
    ]
  },
  {
    category: "about",
    sections: [
      { id: "founder", labelKey: "Navigation.founder", icon: "👤" },
      { id: "about", labelKey: "Navigation.about", icon: "ℹ️" },
      { id: "contact", labelKey: "Navigation.contact", icon: "📧" },
    ]
  }
];

// Flatten for easier access
const sections = sectionGroups.flatMap(group =>
  group.sections.map(section => ({
    ...section,
    category: group.category
  }))
);

export default function SideNavigation() {
  const t = useTranslations();
  const locale = useLocale();
  const isArabic = locale === "ar";
  const navRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const sectionIds = sections.map((s) => s.id);
  const activeSection = useScrollSpy(sectionIds, 150);

  // Show/hide navigation based on scroll direction
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateVisibility = () => {
      const currentScrollY = window.scrollY;

      // Show nav when scrolling up or at top, hide when scrolling down
      if (currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 300) {
        setIsVisible(false);
      }

      lastScrollY = currentScrollY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateVisibility);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll progress indicator
  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / scrollHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    updateScrollProgress();

    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  // GSAP entrance animation
  useEffect(() => {
    if (navRef.current) {
      const items = navRef.current.querySelectorAll(".nav-item");

      gsap.fromTo(
        items,
        {
          x: isArabic ? 50 : -50,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.5,
        }
      );
    }
  }, [isArabic]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle navigation if Ctrl/Cmd + arrow keys are pressed
      if (!(e.ctrlKey || e.metaKey)) return;

      const currentIndex = sections.findIndex((s) => s.id === activeSection);

      let nextIndex = currentIndex;

      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        nextIndex = currentIndex > 0 ? currentIndex - 1 : sections.length - 1;
      } else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        nextIndex = currentIndex < sections.length - 1 ? currentIndex + 1 : 0;
      } else if (e.key === "Home") {
        e.preventDefault();
        nextIndex = 0;
      } else if (e.key === "End") {
        e.preventDefault();
        nextIndex = sections.length - 1;
      }

      if (nextIndex !== currentIndex) {
        const targetSection = sections[nextIndex];
        const element = document.getElementById(targetSection.id);
        if (element) {
          const lenis = (window as any).lenis;
          if (lenis) {
            const offset = 80;
            const targetPosition = element.offsetTop - offset;
            lenis.scrollTo(targetPosition, { duration: 1.5 });
          } else {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      }

      // Toggle collapse with Ctrl/Cmd + ]
      if (e.key === "]") {
        e.preventDefault();
        setIsCollapsed((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSection]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      // Use Lenis for smooth scrolling if available
      const lenis = (window as any).lenis;
      if (lenis) {
        const offset = 80;
        const targetPosition = element.offsetTop - offset;
        lenis.scrollTo(targetPosition, { duration: 1.5 });
      } else {
        // Fallback to native smooth scroll
        const offset = 80;
        const elementPosition = element.offsetTop - offset;
        window.scrollTo({
          top: elementPosition,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <motion.nav
      ref={navRef}
      initial={{ opacity: 0 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        x: isVisible ? 0 : (isArabic ? 100 : -100),
      }}
      transition={{ duration: 0.3 }}
      className={`fixed top-1/2 -translate-y-1/2 z-40 hidden lg:block ${
        isArabic ? "right-8" : "left-8"
      }`}
    >
      <div className="relative">
        {/* Collapse/Expand Toggle */}
        <motion.button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`absolute -top-12 ${
            isArabic ? "right-0" : "left-0"
          } w-8 h-8 rounded-full bg-gray-dark/50 hover:bg-green-primary/20 border border-gray-dark hover:border-green-primary transition-all duration-300 flex items-center justify-center group`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            className="text-xs text-gray-light group-hover:text-green-primary"
            animate={{ rotate: isCollapsed ? 180 : 0 }}
          >
            {isArabic ? "◀" : "▶"}
          </motion.span>
        </motion.button>

        {/* Navigation Items with Categories */}
        <div className="flex flex-col gap-2">
          {sectionGroups.map((group, groupIndex) => (
            <div key={group.category} className="relative">
              {/* Category Divider */}
              {groupIndex > 0 && (
                <motion.div
                  className={`my-4 ${
                    isArabic ? "mr-2" : "ml-2"
                  } flex items-center gap-2`}
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 0.3, scaleX: 1 }}
                  transition={{ delay: groupIndex * 0.1 }}
                >
                  <div className="w-8 h-px bg-green-primary/30" />
                </motion.div>
              )}

              {/* Sections in Category */}
              <div className="flex flex-col gap-4">
                {group.sections.map((section, index) => {
                  const isActive = activeSection === section.id;
                  const globalIndex =
                    sectionGroups
                      .slice(0, groupIndex)
                      .reduce((acc, g) => acc + g.sections.length, 0) + index;

                  return (
                    <NavItem
                      key={section.id}
                      section={{ ...section, category: group.category }}
                      isActive={isActive}
                      isArabic={isArabic}
                      isCollapsed={isCollapsed}
                      onClick={(e) => handleClick(e, section.id)}
                      label={t(section.labelKey).toUpperCase()}
                      index={globalIndex}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Progress Percentage */}
        <motion.div
          className={`absolute -bottom-12 ${
            isArabic ? "right-0" : "left-0"
          } text-xs text-gray-light/50 tracking-wider`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {Math.round(scrollProgress)}%
        </motion.div>

        {/* Keyboard Shortcuts Indicator */}
        <KeyboardShortcuts isArabic={isArabic} />
      </div>
    </motion.nav>
  );
}

// Keyboard Shortcuts Indicator Component
function KeyboardShortcuts({ isArabic }: { isArabic: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className={`absolute -bottom-24 ${isArabic ? "right-0" : "left-0"}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Keyboard Icon Button */}
      <motion.button
        className="w-6 h-6 rounded bg-gray-dark/30 hover:bg-green-primary/20 border border-gray-dark/50 hover:border-green-primary/50 transition-all duration-300 flex items-center justify-center text-xs text-gray-light hover:text-green-primary"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Keyboard shortcuts"
      >
        ⌨
      </motion.button>

      {/* Shortcuts Popup */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          className={`absolute bottom-8 ${
            isArabic ? "right-0" : "left-0"
          } bg-gray-dark/95 backdrop-blur-md border border-green-primary/30 rounded-lg p-4 shadow-xl shadow-green-primary/10 min-w-[240px] z-50`}
        >
          <div className="text-xs text-green-primary mb-3 tracking-wider font-medium">
            KEYBOARD SHORTCUTS
          </div>
          <div className="space-y-2 text-xs text-gray-light">
            <ShortcutItem
              keys={["Ctrl", "↑/↓"]}
              description="Navigate sections"
            />
            <ShortcutItem keys={["Ctrl", "Home"]} description="First section" />
            <ShortcutItem keys={["Ctrl", "End"]} description="Last section" />
            <ShortcutItem keys={["Ctrl", "]"]} description="Toggle collapse" />
          </div>
          <div className="mt-3 pt-3 border-t border-gray-dark text-[10px] text-gray-light/50">
            Use Cmd ⌘ on Mac
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

// Shortcut Item Component
function ShortcutItem({
  keys,
  description,
}: {
  keys: string[];
  description: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-1">
        {keys.map((key, i) => (
          <span key={i} className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-black/50 border border-gray-dark rounded text-[10px] text-green-primary font-mono">
              {key}
            </kbd>
            {i < keys.length - 1 && <span className="text-gray-light/30">+</span>}
          </span>
        ))}
      </div>
      <span className="text-gray-light/70">{description}</span>
    </div>
  );
}

// Magnetic Nav Item Component
function NavItem({
  section,
  isActive,
  isArabic,
  isCollapsed,
  onClick,
  label,
  index,
}: {
  section: { id: string; labelKey: string; icon?: string; category: string };
  isActive: boolean;
  isArabic: boolean;
  isCollapsed: boolean;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  label: string;
  index: number;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  // Magnetic effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current || !dotRef.current) return;

    const rect = dotRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const maxDistance = 60;

    if (distance < maxDistance) {
      const strength = 1 - distance / maxDistance;
      x.set(deltaX * strength * 0.4);
      y.set(deltaY * strength * 0.4);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <motion.div
      ref={itemRef}
      className="relative group nav-item"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        handleMouseLeave();
        setShowTooltip(false);
      }}
      onMouseEnter={() => setShowTooltip(true)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <a
        href={`#${section.id}`}
        onClick={onClick}
        className={`flex items-center gap-3 transition-all duration-300 ${
          isArabic ? "flex-row-reverse" : "flex-row"
        }`}
        aria-label={label}
      >
        {/* Magnetic Indicator Dot */}
        <motion.div
          ref={dotRef}
          className="relative flex items-center justify-center w-4 h-4"
          style={{ x: springX, y: springY }}
        >
          {/* Outer ring for active state */}
          {isActive && (
            <motion.div
              className="absolute w-4 h-4 rounded-full border border-green-vibrant/40"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20
              }}
            >
              {/* Subtle rotating gradient */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "conic-gradient(from 0deg, transparent 0%, rgba(74,222,128,0.2) 50%, transparent 100%)"
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          )}

          {/* Main Dot with enhanced states */}
          <motion.div
            className={`relative z-10 rounded-full transition-all duration-300 ${
              isActive
                ? "w-2.5 h-2.5 bg-green-vibrant shadow-[0_0_16px_rgba(74,222,128,0.8)]"
                : "w-1.5 h-1.5 bg-gray-light/40 group-hover:bg-green-primary group-hover:w-2 group-hover:h-2 group-hover:shadow-[0_0_10px_rgba(74,222,128,0.5)]"
            }`}
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            {/* Core glow for active state */}
            {isActive && (
              <motion.div
                className="absolute inset-0 rounded-full bg-green-vibrant"
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.6, 0.2, 0.6]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            )}
          </motion.div>

          {/* Hover expansion effect */}
          <motion.div
            className="absolute inset-0 rounded-full border border-green-primary/30"
            initial={{ scale: 1, opacity: 0 }}
            whileHover={{ scale: 2, opacity: [0.5, 0] }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>

        {/* Label with stagger animation */}
        <motion.span
          className={`text-xs tracking-[0.2em] font-medium transition-all duration-500 whitespace-nowrap relative overflow-hidden ${
            isActive || !isCollapsed
              ? "text-green-vibrant opacity-100"
              : "text-gray-light opacity-0 group-hover:opacity-100 group-hover:text-green-primary"
          } ${isArabic ? "text-right" : "text-left"}`}
          animate={{
            opacity: isCollapsed ? (isActive ? 1 : 0) : isActive ? 1 : 0,
            x: isCollapsed ? (isArabic ? 10 : -10) : 0,
          }}
        >
          {/* Background gradient on hover */}
          <motion.span
            className="absolute inset-0 bg-gradient-to-r from-green-primary/10 to-transparent"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.6 }}
          />
          <span className="relative z-10">{label}</span>
        </motion.span>
      </a>

      {/* Tooltip for collapsed state */}
      {isCollapsed && showTooltip && (
        <motion.div
          initial={{ opacity: 0, x: isArabic ? 10 : -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          className={`absolute top-1/2 -translate-y-1/2 ${
            isArabic ? "right-10" : "left-10"
          } bg-gray-dark border border-green-primary/30 px-3 py-1.5 rounded text-xs text-green-primary whitespace-nowrap z-50 pointer-events-none`}
        >
          <span className="flex items-center gap-2">
            {section.icon && <span>{section.icon}</span>}
            {label}
          </span>
          {/* Arrow */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 ${
              isArabic ? "-right-1" : "-left-1"
            } w-2 h-2 bg-gray-dark border-green-primary/30 ${
              isArabic
                ? "border-r border-t rotate-45"
                : "border-l border-b -rotate-45"
            }`}
          />
        </motion.div>
      )}

    </motion.div>
  );
}
