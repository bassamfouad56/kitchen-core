"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

interface PageTransitionContextType {
  isTransitioning: boolean;
  startTransition: () => void;
  endTransition: () => void;
  progress: number;
}

const PageTransitionContext = createContext<PageTransitionContextType>({
  isTransitioning: false,
  startTransition: () => {},
  endTransition: () => {},
  progress: 0,
});

export function usePageTransition() {
  return useContext(PageTransitionContext);
}

interface PageTransitionProviderProps {
  children: React.ReactNode;
  transitionStyle?: "curtain" | "slide" | "fade" | "wipe" | "minimal";
  duration?: number;
  showProgress?: boolean;
}

export default function PageTransitionProvider({
  children,
  transitionStyle = "curtain",
  duration = 1000,
  showProgress = true,
}: PageTransitionProviderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [displayChildren, setDisplayChildren] = useState(children);

  const startTransition = useCallback(() => {
    setIsTransitioning(true);
    setProgress(0);
  }, []);

  const endTransition = useCallback(() => {
    setIsTransitioning(false);
    setProgress(100);
  }, []);

  // Handle route changes
  useEffect(() => {
    startTransition();

    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return 90;
        return prev + Math.random() * 10;
      });
    }, 100);

    // Complete transition
    const timeout = setTimeout(() => {
      setProgress(100);
      clearInterval(progressInterval);

      setTimeout(() => {
        endTransition();
        setDisplayChildren(children);
      }, 300);
    }, duration);

    return () => {
      clearTimeout(timeout);
      clearInterval(progressInterval);
    };
  }, [pathname, searchParams, duration, startTransition, endTransition, children]);

  return (
    <PageTransitionContext.Provider
      value={{
        isTransitioning,
        startTransition,
        endTransition,
        progress,
      }}
    >
      {/* Progress Bar */}
      {showProgress && isTransitioning && (
        <motion.div
          className="fixed top-0 left-0 right-0 z-[9999] h-1 bg-gradient-to-r from-green-primary via-green-vibrant to-green-primary"
          initial={{ scaleX: 0, transformOrigin: "left" }}
          animate={{ scaleX: progress / 100 }}
          transition={{ duration: 0.2 }}
        >
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      )}

      {/* Transition Overlay */}
      <AnimatePresence mode="wait">
        {isTransitioning && (
          <>
            {transitionStyle === "curtain" && <CurtainTransition />}
            {transitionStyle === "slide" && <SlideTransition />}
            {transitionStyle === "fade" && <FadeTransition />}
            {transitionStyle === "wipe" && <WipeTransition />}
            {transitionStyle === "minimal" && null}
          </>
        )}
      </AnimatePresence>

      {/* Page Content */}
      {displayChildren}
    </PageTransitionContext.Provider>
  );
}

// Curtain Transition - Elegant panels
function CurtainTransition() {
  return (
    <motion.div
      className="fixed inset-0 z-[9998] pointer-events-none flex"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, delay: 0.6 }}
    >
      {/* Left Panel */}
      <motion.div
        className="w-1/2 h-full bg-black border-r border-green-primary/30 relative overflow-hidden"
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* Decorative Lines */}
        <div className="absolute inset-0 flex flex-col justify-evenly">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="h-px bg-green-primary/20"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.2 + i * 0.05, duration: 0.4 }}
            />
          ))}
        </div>
      </motion.div>

      {/* Right Panel */}
      <motion.div
        className="w-1/2 h-full bg-black relative overflow-hidden"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* Decorative Lines */}
        <div className="absolute inset-0 flex flex-col justify-evenly">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="h-px bg-green-primary/20"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.2 + i * 0.05, duration: 0.4 }}
            />
          ))}
        </div>
      </motion.div>

      {/* Center Logo */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 180 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div
            className="w-20 h-20 relative"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute inset-0 border-4 border-green-primary rounded-full" />
            <div className="absolute inset-2 bg-green-vibrant rounded-full" />
            <motion.div
              className="absolute inset-6 bg-white rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Slide Transition - Smooth slide
function SlideTransition() {
  return (
    <motion.div
      className="fixed inset-0 z-[9998] bg-black pointer-events-none"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="text-green-vibrant text-4xl font-serif"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.2 }}
          transition={{ duration: 0.3 }}
        >
          Loading...
        </motion.div>
      </div>
    </motion.div>
  );
}

// Fade Transition - Simple fade
function FadeTransition() {
  return (
    <motion.div
      className="fixed inset-0 z-[9998] bg-black pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    />
  );
}

// Wipe Transition - Diagonal wipe
function WipeTransition() {
  return (
    <motion.div
      className="fixed inset-0 z-[9998] pointer-events-none"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, delay: 0.5 }}
    >
      {/* Diagonal wipe panels */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-y-0 w-[12%] bg-black"
          style={{ left: `${i * 11}%` }}
          initial={{ scaleY: 0, transformOrigin: "top" }}
          animate={{ scaleY: 1 }}
          exit={{ scaleY: 0, transformOrigin: "bottom" }}
          transition={{
            duration: 0.4,
            delay: i * 0.05,
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          {/* Accent line */}
          <motion.div
            className="absolute inset-x-0 top-1/2 h-px bg-green-primary"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.2 + i * 0.05, duration: 0.3 }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
