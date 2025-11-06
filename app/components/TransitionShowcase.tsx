"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Loading, { MinimalLoading, ButtonLoading } from "./Loading";

type LoadingVariant = "spinner" | "dots" | "pulse" | "skeleton" | "logo" | "progress";
type TransitionStyle = "curtain" | "slide" | "fade" | "wipe" | "minimal";

export default function TransitionShowcase() {
  const [activeTab, setActiveTab] = useState<"loading" | "transitions">("loading");
  const [selectedLoading, setSelectedLoading] = useState<LoadingVariant>("logo");
  const [showLoading, setShowLoading] = useState(false);
  const [selectedTransition, setSelectedTransition] = useState<TransitionStyle>("curtain");

  const loadingVariants: LoadingVariant[] = ["spinner", "dots", "pulse", "skeleton", "logo", "progress"];
  const transitionStyles: TransitionStyle[] = ["curtain", "slide", "fade", "wipe", "minimal"];

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-serif text-5xl md:text-7xl mb-4">
            Transition & Loading{" "}
            <span className="text-green-vibrant italic">Showcase</span>
          </h1>
          <p className="text-gray-light text-lg">
            Test all variants and transitions in real-time
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-4 mb-12 border-b border-gray-dark">
          {(["loading", "transitions"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm tracking-widest uppercase transition-all relative ${
                activeTab === tab
                  ? "text-green-vibrant"
                  : "text-gray-light hover:text-white"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-px bg-green-vibrant"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === "loading" ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-12"
            >
              {/* Loading Variants Grid */}
              <div>
                <h2 className="text-2xl font-serif mb-6">Loading Variants</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  {loadingVariants.map((variant) => (
                    <motion.button
                      key={variant}
                      onClick={() => {
                        setSelectedLoading(variant);
                        setShowLoading(true);
                        setTimeout(() => setShowLoading(false), 3000);
                      }}
                      className={`p-6 border transition-all ${
                        selectedLoading === variant && showLoading
                          ? "border-green-primary bg-green-primary/10"
                          : "border-gray-dark hover:border-green-primary/50"
                      }`}
                      whileHover={{ scale: 1.02, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="text-lg capitalize">{variant}</span>
                    </motion.button>
                  ))}
                </div>

                {/* Loading Preview */}
                <div className="relative h-96 bg-background-card border border-gray-dark rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <AnimatePresence>
                      {showLoading ? (
                        <motion.div
                          key={selectedLoading}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                        >
                          <Loading
                            variant={selectedLoading}
                            fullScreen={false}
                            text={`${selectedLoading} variant`}
                          />
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-center"
                        >
                          <p className="text-gray-light mb-2">Click a variant above to preview</p>
                          <MinimalLoading size="md" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Inline Components */}
              <div>
                <h2 className="text-2xl font-serif mb-6">Inline Components</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Minimal Loading */}
                  <div className="p-6 bg-background-card border border-gray-dark">
                    <h3 className="text-lg mb-4 text-green-vibrant">MinimalLoading</h3>
                    <div className="flex items-center gap-4">
                      <MinimalLoading size="sm" />
                      <MinimalLoading size="md" />
                      <MinimalLoading size="lg" />
                    </div>
                    <p className="text-sm text-gray-light mt-4">
                      Sizes: sm, md, lg
                    </p>
                  </div>

                  {/* Button Loading */}
                  <div className="p-6 bg-background-card border border-gray-dark">
                    <h3 className="text-lg mb-4 text-green-vibrant">ButtonLoading</h3>
                    <button className="bg-green-primary text-black px-6 py-3 flex items-center gap-2">
                      <ButtonLoading />
                      <span>Loading...</span>
                    </button>
                    <p className="text-sm text-gray-light mt-4">
                      For button states
                    </p>
                  </div>

                  {/* Custom Skeleton */}
                  <div className="p-6 bg-background-card border border-gray-dark">
                    <h3 className="text-lg mb-4 text-green-vibrant">Skeleton</h3>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-dark animate-pulse rounded" />
                      <div className="h-4 bg-gray-dark animate-pulse rounded w-3/4" />
                      <div className="h-4 bg-gray-dark animate-pulse rounded w-1/2" />
                    </div>
                    <p className="text-sm text-gray-light mt-4">
                      Content placeholders
                    </p>
                  </div>
                </div>
              </div>

              {/* Code Examples */}
              <div>
                <h2 className="text-2xl font-serif mb-6">Usage Example</h2>
                <div className="bg-background-elevated border border-gray-dark p-6 rounded-lg">
                  <pre className="text-sm text-green-primary overflow-x-auto">
                    <code>{`import Loading from "@/app/components/Loading";

// Full-screen loading
<Loading variant="${selectedLoading}" fullScreen text="Loading" />

// Inline loading
<Loading variant="${selectedLoading}" fullScreen={false} />

// In loading.tsx
export default function PageLoading() {
  return <Loading variant="${selectedLoading}" />;
}`}</code>
                  </pre>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="transitions"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-12"
            >
              {/* Transition Styles */}
              <div>
                <h2 className="text-2xl font-serif mb-6">Transition Styles</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                  {transitionStyles.map((style) => (
                    <motion.button
                      key={style}
                      onClick={() => setSelectedTransition(style)}
                      className={`p-6 border transition-all ${
                        selectedTransition === style
                          ? "border-green-primary bg-green-primary/10"
                          : "border-gray-dark hover:border-green-primary/50"
                      }`}
                      whileHover={{ scale: 1.02, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="text-lg capitalize">{style}</span>
                    </motion.button>
                  ))}
                </div>

                {/* Transition Info Cards */}
                <div className="grid md:grid-cols-2 gap-6">
                  {transitionStyles.map((style) => {
                    const info = getTransitionInfo(style);
                    return (
                      <motion.div
                        key={style}
                        className={`p-6 border transition-all ${
                          selectedTransition === style
                            ? "border-green-primary bg-green-primary/5"
                            : "border-gray-dark"
                        }`}
                        whileHover={{ y: -4 }}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-serif capitalize">{style}</h3>
                          {selectedTransition === style && (
                            <motion.div
                              className="w-3 h-3 bg-green-vibrant rounded-full"
                              animate={{ scale: [1, 1.3, 1] }}
                              transition={{ duration: 1, repeat: Infinity }}
                            />
                          )}
                        </div>
                        <p className="text-gray-light mb-4">{info.description}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-green-primary">⚡ {info.speed}</span>
                          <span className="text-gray-light">• {info.duration}ms</span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Implementation Code */}
              <div>
                <h2 className="text-2xl font-serif mb-6">Implementation</h2>
                <div className="bg-background-elevated border border-gray-dark p-6 rounded-lg">
                  <pre className="text-sm text-green-primary overflow-x-auto">
                    <code>{`import PageTransitionProvider from "@/app/components/PageTransitionProvider";

// In your root layout.tsx
export default function Layout({ children }) {
  return (
    <PageTransitionProvider
      transitionStyle="${selectedTransition}"
      duration={${getTransitionInfo(selectedTransition).duration}}
      showProgress={true}
    >
      {children}
    </PageTransitionProvider>
  );
}`}</code>
                  </pre>
                </div>
              </div>

              {/* Performance Tips */}
              <div>
                <h2 className="text-2xl font-serif mb-6">Performance Tips</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    {
                      title: "Use Minimal for Fast Navigation",
                      description: "Best for dashboards and admin panels",
                    },
                    {
                      title: "Use Curtain for Premium Pages",
                      description: "Homepage, landing pages, brand pages",
                    },
                    {
                      title: "Keep Duration Under 1 Second",
                      description: "Users prefer fast transitions (500-800ms optimal)",
                    },
                    {
                      title: "Test on Slow Connections",
                      description: "Chrome DevTools → Network → Slow 3G",
                    },
                  ].map((tip, index) => (
                    <motion.div
                      key={index}
                      className="p-6 bg-background-card border border-gray-dark"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <h3 className="text-lg mb-2 text-green-vibrant">{tip.title}</h3>
                      <p className="text-gray-light text-sm">{tip.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.div
          className="mt-20 pt-8 border-t border-gray-dark text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-gray-light">
            Check{" "}
            <span className="text-green-vibrant">PAGE_TRANSITIONS_GUIDE.md</span> for complete documentation
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function getTransitionInfo(style: TransitionStyle) {
  const info = {
    curtain: {
      description: "Elegant split-panel transition with animated logo. Premium feel.",
      speed: "Medium",
      duration: 1000,
    },
    slide: {
      description: "Smooth horizontal slide. Clean and modern.",
      speed: "Fast",
      duration: 500,
    },
    fade: {
      description: "Simple cross-fade. Minimal and fast.",
      speed: "Very Fast",
      duration: 300,
    },
    wipe: {
      description: "Diagonal striped wipe effect. Creative and dynamic.",
      speed: "Medium",
      duration: 700,
    },
    minimal: {
      description: "Progress bar only. Ultra-fast for quick navigation.",
      speed: "Instant",
      duration: 200,
    },
  };

  return info[style];
}
