"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface BeforeAfterProject {
  id: number;
  title: string;
  location: string;
  beforeImage: string;
  afterImage: string;
  transformations: string[];
  investment: string;
  duration: string;
}

const projects: BeforeAfterProject[] = [
  {
    id: 1,
    title: "Heritage Palace Transformation",
    location: "Riyadh, Saudi Arabia",
    beforeImage: "/1.jpg",
    afterImage: "/5.jpg",
    transformations: [
      "Complete structural renovation",
      "Italian marble installation",
      "Smart home integration",
      "Custom ventilation system",
      "Heritage preservation",
    ],
    investment: "$1.2M",
    duration: "32 weeks",
  },
  {
    id: 2,
    title: "Modern Villa Renovation",
    location: "Monaco",
    beforeImage: "/1.jpg",
    afterImage: "/3.jpg",
    transformations: [
      "Open-plan layout redesign",
      "Premium appliance integration",
      "Ocean-view optimization",
      "Weather-resistant systems",
      "Outdoor kitchen extension",
    ],
    investment: "$850K",
    duration: "24 weeks",
  },
  {
    id: 3,
    title: "Urban Penthouse Upgrade",
    location: "New York, USA",
    beforeImage: "/1.jpg",
    afterImage: "/6.jpg",
    transformations: [
      "Space optimization",
      "Luxury finishes upgrade",
      "Smart lighting system",
      "Custom cabinetry",
      "Wine cellar integration",
    ],
    investment: "$650K",
    duration: "18 weeks",
  },
];

function ComparisonSlider({ project }: { project: BeforeAfterProject }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging && e.type !== "click") return;

    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    let x: number;

    if ("touches" in e) {
      x = e.touches[0].clientX - rect.left;
    } else {
      x = e.clientX - rect.left;
    }

    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(percentage, 0), 100));
  };

  return (
    <div className="relative">
      <div
        className="relative aspect-video cursor-col-resize select-none overflow-hidden border-2 border-green-primary/30 hover:border-green-primary transition-colors duration-300"
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMove}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        onTouchMove={handleMove}
        onClick={handleMove}
      >
        {/* After Image (Background) */}
        <div className="absolute inset-0">
          <img
            src={project.afterImage}
            alt={`${project.title} - After`}
            className="w-full h-full object-cover"
            draggable={false}
          />
          {/* After Label */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute top-4 right-4 bg-green-primary text-black px-4 py-2 text-sm font-bold tracking-wider"
          >
            AFTER
          </motion.div>
        </div>

        {/* Before Image (Foreground with clip) */}
        <div
          className="absolute inset-0 transition-all duration-75"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src={project.beforeImage}
            alt={`${project.title} - Before`}
            className="w-full h-full object-cover"
            draggable={false}
          />
          {/* Before Label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute top-4 left-4 bg-gray-dark text-white px-4 py-2 text-sm font-bold tracking-wider"
          >
            BEFORE
          </motion.div>
        </div>

        {/* Slider Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-green-vibrant cursor-col-resize"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Handle Button */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div
              className="w-16 h-16 rounded-full bg-green-primary border-4 border-white shadow-2xl flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(5, 150, 105, 0.4)",
                  "0 0 0 20px rgba(5, 150, 105, 0)",
                ],
              }}
              transition={{
                boxShadow: {
                  duration: 1.5,
                  repeat: Infinity,
                },
              }}
            >
              <svg
                className="w-8 h-8 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                />
              </svg>
            </motion.div>
          </div>

          {/* Vertical Line Top */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 h-8 w-1 bg-green-vibrant" />
          {/* Vertical Line Bottom */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 h-8 w-1 bg-green-vibrant" />
        </div>

        {/* Instruction Hint */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isDragging ? 0 : 0.7 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-sm text-white px-6 py-2 text-xs tracking-wider rounded-full pointer-events-none"
        >
          ← DRAG TO COMPARE →
        </motion.div>
      </div>
    </div>
  );
}

export default function BeforeAfterSlider() {
  const [activeProject, setActiveProject] = useState(0);

  return (
    <section className="py-32 bg-background-elevated relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              rgba(5, 150, 105, 0.1) 0px,
              rgba(5, 150, 105, 0.1) 2px,
              transparent 2px,
              transparent 12px
            )`,
            backgroundSize: "200% 200%",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="inline-block mb-6"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-green-primary/20 blur-3xl" />
                <p className="relative text-green-vibrant text-sm tracking-[0.4em] mb-2 font-light">
                  TRANSFORMATION STORIES
                </p>
              </div>
            </motion.div>
            <h2 className="font-serif text-6xl md:text-7xl text-white mb-8 leading-tight">
              Before & After
              <span className="block text-green-vibrant italic mt-2">Excellence</span>
            </h2>
            <p className="text-xl text-gray-light max-w-3xl mx-auto font-light leading-relaxed">
              Witness the dramatic transformations. Slide to reveal the stunning evolution
              from dated spaces to architectural masterpieces.
            </p>
          </motion.div>
        </div>

        {/* Project Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {projects.map((project, index) => (
            <motion.button
              key={project.id}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveProject(index)}
              className={`relative px-8 py-4 text-sm tracking-wider font-medium border transition-all duration-500 ${
                activeProject === index
                  ? "bg-green-primary text-black border-green-primary shadow-lg shadow-green-primary/20"
                  : "bg-transparent text-gray-light border-gray-dark hover:border-green-primary hover:text-white"
              }`}
            >
              <span className="relative z-10">{project.title}</span>
              {activeProject === index && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-green-primary"
                  style={{ zIndex: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Comparison Slider */}
        <motion.div
          key={activeProject}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <ComparisonSlider project={projects[activeProject]} />
        </motion.div>

        {/* Project Details */}
        <motion.div
          key={`details-${activeProject}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-8"
        >
          {/* Transformations */}
          <div className="md:col-span-2 bg-background-card border border-gray-dark hover:border-green-primary/50 transition-colors duration-500 p-8">
            <h3 className="text-green-vibrant text-sm tracking-wider mb-6 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              KEY TRANSFORMATIONS
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {projects[activeProject].transformations.map((transformation, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 group"
                >
                  <div className="w-2 h-2 bg-green-vibrant mt-2 flex-shrink-0 group-hover:scale-150 transition-transform duration-300" />
                  <span className="text-gray-light group-hover:text-white transition-colors duration-300">
                    {transformation}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-4">
            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-background-card border border-gray-dark hover:border-green-primary/50 transition-colors duration-500 p-6 group"
            >
              <div className="text-green-vibrant text-xs tracking-wider mb-3 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                </svg>
                LOCATION
              </div>
              <div className="text-white text-xl font-serif group-hover:text-green-vibrant transition-colors duration-300">
                {projects[activeProject].location}
              </div>
            </motion.div>

            {/* Investment */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-background-card border border-gray-dark hover:border-green-primary/50 transition-colors duration-500 p-6 group"
            >
              <div className="text-green-vibrant text-xs tracking-wider mb-3 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                INVESTMENT
              </div>
              <div className="text-white text-3xl font-serif group-hover:text-green-vibrant transition-colors duration-300">
                {projects[activeProject].investment}
              </div>
            </motion.div>

            {/* Duration */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-background-card border border-gray-dark hover:border-green-primary/50 transition-colors duration-500 p-6 group"
            >
              <div className="text-green-vibrant text-xs tracking-wider mb-3 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                DURATION
              </div>
              <div className="text-white text-2xl font-serif group-hover:text-green-vibrant transition-colors duration-300">
                {projects[activeProject].duration}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
