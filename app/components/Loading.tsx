"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface LoadingProps {
  variant?: "spinner" | "dots" | "pulse" | "skeleton" | "logo" | "progress";
  fullScreen?: boolean;
  text?: string;
  show?: boolean;
}

export default function Loading({
  variant = "logo",
  fullScreen = true,
  text = "Loading",
  show = true,
}: LoadingProps) {
  const [progress, setProgress] = useState(0);

  // Simulate progress for progress bar variant
  useEffect(() => {
    if (variant === "progress") {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return 100;
          return prev + Math.random() * 15;
        });
      }, 200);

      return () => clearInterval(interval);
    }
  }, [variant]);

  const containerClass = fullScreen
    ? "fixed inset-0 z-[10000] bg-black flex items-center justify-center"
    : "relative w-full h-full flex items-center justify-center";

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={containerClass}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Background Effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Gradient Orbs */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-primary/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
                x: [0, 50, 0],
                y: [0, 30, 0],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-vibrant/20 rounded-full blur-3xl"
              animate={{
                scale: [1.3, 1, 1.3],
                opacity: [0.6, 0.3, 0.6],
                x: [0, -50, 0],
                y: [0, -30, 0],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 4 }}
            />

            {/* Grid Pattern */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 2px 2px, rgba(74, 222, 128, 0.3) 1px, transparent 0)",
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          {/* Loading Content */}
          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Render variant */}
            {variant === "spinner" && <SpinnerVariant />}
            {variant === "dots" && <DotsVariant />}
            {variant === "pulse" && <PulseVariant />}
            {variant === "skeleton" && <SkeletonVariant />}
            {variant === "logo" && <LogoVariant />}
            {variant === "progress" && <ProgressVariant progress={progress} />}

            {/* Loading Text */}
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-green-vibrant text-lg tracking-[0.3em] font-light uppercase">
                {text}
              </span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-green-vibrant"
              >
                ...
              </motion.span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Spinner Variant - Rotating circle
function SpinnerVariant() {
  return (
    <div className="relative w-24 h-24">
      {/* Outer spinning ring */}
      <motion.div
        className="absolute inset-0 border-4 border-transparent border-t-green-primary border-r-green-primary rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />

      {/* Inner spinning ring (opposite direction) */}
      <motion.div
        className="absolute inset-3 border-4 border-transparent border-b-green-vibrant border-l-green-vibrant rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />

      {/* Center dot */}
      <motion.div
        className="absolute inset-8 bg-green-primary rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [1, 0.5, 1],
        }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </div>
  );
}

// Dots Variant - Three bouncing dots
function DotsVariant() {
  return (
    <div className="flex gap-4">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="w-4 h-4 bg-green-vibrant rounded-full"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: index * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Pulse Variant - Expanding rings
function PulseVariant() {
  return (
    <div className="relative w-24 h-24">
      {/* Center circle */}
      <motion.div className="absolute inset-0 bg-green-vibrant rounded-full" />

      {/* Pulse rings */}
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="absolute inset-0 border-2 border-green-primary rounded-full"
          initial={{ scale: 1, opacity: 1 }}
          animate={{
            scale: [1, 2, 2],
            opacity: [1, 0.5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 0.6,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

// Skeleton Variant - Loading skeleton
function SkeletonVariant() {
  return (
    <div className="flex flex-col gap-4 w-80">
      {[60, 80, 40].map((width, index) => (
        <motion.div
          key={index}
          className="h-4 bg-gradient-to-r from-gray-dark via-green-primary/20 to-gray-dark rounded"
          style={{ width: `${width}%` }}
          animate={{
            backgroundPosition: ["200% 0", "-200% 0"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
            delay: index * 0.2,
          }}
        />
      ))}
    </div>
  );
}

// Logo Variant - Animated logo
function LogoVariant() {
  return (
    <div className="relative w-32 h-32">
      {/* Outer rotating ring */}
      <motion.div
        className="absolute inset-0 border-4 border-green-primary/30 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      >
        {/* Dots on the ring */}
        {[0, 90, 180, 270].map((angle, index) => (
          <motion.div
            key={angle}
            className="absolute w-3 h-3 bg-green-vibrant rounded-full"
            style={{
              top: "50%",
              left: "50%",
              transform: `rotate(${angle}deg) translate(60px) translate(-50%, -50%)`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: index * 0.2,
            }}
          />
        ))}
      </motion.div>

      {/* Middle ring - opposite rotation */}
      <motion.div
        className="absolute inset-6 border-2 border-green-primary/50 rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />

      {/* Center logo/text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="text-4xl font-serif text-green-vibrant"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [1, 0.7, 1],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          K
        </motion.div>
      </div>

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full blur-xl bg-green-primary/20"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </div>
  );
}

// Progress Variant - Progress bar
function ProgressVariant({ progress }: { progress: number }) {
  return (
    <div className="w-80">
      {/* Progress bar container */}
      <div className="relative h-2 bg-gray-dark rounded-full overflow-hidden">
        {/* Progress fill */}
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-primary via-green-vibrant to-green-primary rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />

        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{
            x: ["-100%", "200%"],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Progress percentage */}
      <motion.div
        className="mt-4 text-center text-green-vibrant text-2xl font-light tabular-nums"
        key={progress}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
      >
        {Math.round(progress)}%
      </motion.div>
    </div>
  );
}

// Minimal Loading - Small inline loader
export function MinimalLoading({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className={`relative ${sizes[size]}`}>
      <motion.div
        className="absolute inset-0 border-2 border-transparent border-t-green-primary rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

// Button Loading - For button states
export function ButtonLoading() {
  return (
    <div className="flex gap-1">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="w-1.5 h-1.5 bg-current rounded-full"
          animate={{
            y: [0, -6, 0],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: index * 0.15,
          }}
        />
      ))}
    </div>
  );
}
