"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { gsap } from "gsap";

interface PageTransitionProps {
  children: React.ReactNode;
  variant?: "slide" | "fade" | "curtain" | "wipe" | "reveal";
}

export default function PageTransition({ children, variant = "slide" }: PageTransitionProps) {
  const pathname = usePathname();
  const [isAnimating, setIsAnimating] = useState(false);

  // Slide variant - smooth slide from side
  const slideVariants = {
    initial: {
      x: 100,
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.43, 0.13, 0.23, 0.96] as const, // Custom easing
      },
    },
    exit: {
      x: -100,
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: [0.43, 0.13, 0.23, 0.96] as const,
      },
    },
  };

  // Fade variant - simple fade
  const fadeVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  // Curtain variant - elegant curtain reveal
  const curtainVariants = {
    initial: {
      scaleY: 0,
      transformOrigin: "top",
    },
    animate: {
      scaleY: 1,
      transition: {
        duration: 0.6,
        ease: [0.76, 0, 0.24, 1] as const,
      },
    },
    exit: {
      scaleY: 0,
      transformOrigin: "bottom",
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1] as const,
      },
    },
  };

  // Wipe variant - diagonal wipe
  const wipeVariants = {
    initial: {
      clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
    },
    animate: {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      transition: {
        duration: 0.7,
        ease: [0.76, 0, 0.24, 1] as const,
      },
    },
    exit: {
      clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1] as const,
      },
    },
  };

  // Reveal variant - scale and fade
  const revealVariants = {
    initial: {
      scale: 0.9,
      opacity: 0,
      y: 30,
    },
    animate: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.43, 0.13, 0.23, 0.96] as const,
      },
    },
    exit: {
      scale: 0.95,
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.4,
        ease: [0.43, 0.13, 0.23, 0.96] as const,
      },
    },
  };

  const variants = {
    slide: slideVariants,
    fade: fadeVariants,
    curtain: curtainVariants,
    wipe: wipeVariants,
    reveal: revealVariants,
  };

  return (
    <AnimatePresence mode="wait" onExitComplete={() => setIsAnimating(false)}>
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants[variant] as any}
        onAnimationStart={() => setIsAnimating(true)}
        onAnimationComplete={() => setIsAnimating(false)}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Premium Overlay Transition - Shows during route changes
export function TransitionOverlay() {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    const timeout = setTimeout(() => setIsTransitioning(false), 1000);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <AnimatePresence>
      {isTransitioning && (
        <>
          {/* Main Overlay Panels */}
          <motion.div
            className="fixed inset-0 z-[9999] pointer-events-none"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.7 }}
          >
            {/* Top Panel */}
            <motion.div
              className="absolute top-0 left-0 w-full h-1/2 bg-black origin-top"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0 }}
              transition={{
                duration: 0.5,
                ease: [0.76, 0, 0.24, 1],
              }}
            />

            {/* Bottom Panel */}
            <motion.div
              className="absolute bottom-0 left-0 w-full h-1/2 bg-black origin-bottom"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0 }}
              transition={{
                duration: 0.5,
                ease: [0.76, 0, 0.24, 1],
              }}
            />

            {/* Center Logo/Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0, rotate: -180, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                exit={{ scale: 0, rotate: 180, opacity: 0 }}
                transition={{
                  duration: 0.6,
                  ease: [0.76, 0, 0.24, 1],
                  delay: 0.2,
                }}
                className="relative"
              >
                {/* Animated Logo */}
                <motion.div
                  className="w-24 h-24 relative"
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 2,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                >
                  {/* Outer Ring */}
                  <motion.div
                    className="absolute inset-0 border-4 border-green-primary rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.5, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Inner Circle */}
                  <motion.div
                    className="absolute inset-4 bg-green-vibrant rounded-full"
                    animate={{
                      scale: [1, 0.9, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Center Dot */}
                  <motion.div
                    className="absolute inset-8 bg-white rounded-full"
                    animate={{
                      scale: [1, 1.3, 1],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
              </motion.div>
            </div>

            {/* Decorative Lines */}
            <motion.div
              className="absolute top-1/2 left-0 w-full h-px bg-green-primary"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Minimal Transition - Subtle fade
export function MinimalTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
