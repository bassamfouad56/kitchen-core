"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import EnhancedLightbox from "./EnhancedLightbox";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "/nass1/1.png",
    alt: "Modern prep kitchen - Full view with aluminum structure",
  },
  {
    id: 2,
    src: "/nass1/2.png",
    alt: "Double-sheet aluminum doors with Salko MDF wood finish",
  },
  {
    id: 3,
    src: "/nass1/3.png",
    alt: "Indian first-grade beige quartz countertop detail",
  },
];

export default function GalleryNass1() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const handleImageClick = (image: GalleryImage, index: number) => {
    setSelectedImage(image);
    setSelectedIndex(index);
  };

  const handleNext = () => {
    const nextIndex = (selectedIndex + 1) % galleryImages.length;
    setSelectedIndex(nextIndex);
    setSelectedImage(galleryImages[nextIndex]);
  };

  const handlePrevious = () => {
    const prevIndex = (selectedIndex - 1 + galleryImages.length) % galleryImages.length;
    setSelectedIndex(prevIndex);
    setSelectedImage(galleryImages[prevIndex]);
  };

  return (
    <section id="gallery-nass1" className="py-32 bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-5">
          <motion.div
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at center, rgba(5, 150, 105, 0.1) 0%, transparent 50%)`,
              backgroundSize: "200% 200%",
            }}
          />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-green-primary/20 blur-3xl" />
                <p className="relative text-green-vibrant text-sm tracking-[0.4em] mb-2 font-light">
                  MODERN PREP KITCHEN
                </p>
              </div>
            </motion.div>
            <h2 className="font-serif text-6xl md:text-7xl lg:text-8xl text-white mb-8 leading-tight">
              Aluminum
              <span className="block text-green-vibrant italic mt-2">Precision</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-light max-w-3xl mx-auto font-light leading-relaxed">
              Modern prep kitchen with an aluminum internal structure for lasting durability, and
              double-sheet aluminum doors with Salko MDF wood touch for natural elegance. Indian
              first-grade beige quartz countertop adds luxury and sophistication.
            </p>
          </motion.div>
        </div>

        {/* Three-Column Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 30 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  layout: { duration: 0.4 },
                }}
                className="group relative cursor-pointer overflow-hidden aspect-[3/4]"
                onMouseEnter={() => setHoveredId(image.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => handleImageClick(image, index)}
              >
                {/* Image */}
                <div className="relative w-full h-full">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                {/* Green Glow Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-green-primary/0 via-green-vibrant/0 to-green-primary/0"
                  initial={false}
                  animate={{
                    opacity: hoveredId === image.id ? 0.3 : 0,
                  }}
                  transition={{ duration: 0.5 }}
                />

                {/* Animated Border */}
                <motion.div
                  className="absolute inset-0 border-2"
                  initial={{ borderColor: "rgba(38, 38, 38, 0.5)" }}
                  whileHover={{
                    borderColor: [
                      "rgba(5, 150, 105, 0.5)",
                      "rgba(52, 211, 153, 0.8)",
                      "rgba(5, 150, 105, 0.5)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />

                {/* Number Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.15 + 0.3 }}
                  className="absolute top-6 left-6 w-12 h-12 bg-green-primary/90 backdrop-blur-sm flex items-center justify-center"
                >
                  <span className="text-black font-bold text-xl">{image.id}</span>
                </motion.div>

                {/* View Details Arrow */}
                <motion.div
                  className="absolute bottom-6 right-6 flex items-center gap-2 text-green-vibrant text-sm font-medium"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{
                    opacity: hoveredId === image.id ? 1 : 0,
                    x: hoveredId === image.id ? 0 : -10,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <span>View Details</span>
                  <motion.svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ x: hoveredId === image.id ? [0, 5, 0] : 0 }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </motion.svg>
                </motion.div>

                {/* Corner Accents */}
                <motion.div
                  className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-green-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={false}
                  animate={{
                    scale: hoveredId === image.id ? [1, 1.1, 1] : 1,
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Specifications Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          {[
            { icon: "🏗️", label: "Aluminum Structure", desc: "Long-lasting Durability" },
            { icon: "🚪", label: "Double-Sheet Doors", desc: "Premium Finish" },
            { icon: "🪵", label: "Salko MDF Wood", desc: "Natural Elegance" },
            { icon: "💎", label: "First-Grade Quartz", desc: "Indian Beige" },
          ].map((spec, index) => (
            <motion.div
              key={spec.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="bg-background-card border border-gray-dark group-hover:border-green-primary transition-all duration-500 p-8 text-center relative overflow-hidden">
                <motion.div className="absolute inset-0 bg-green-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <motion.div
                    className="text-4xl mb-4"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {spec.icon}
                  </motion.div>
                  <div className="text-lg text-white mb-2 font-serif">{spec.label}</div>
                  <div className="text-xs tracking-wider text-gray-light uppercase">
                    {spec.desc}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Enhanced Lightbox */}
      <EnhancedLightbox
        image={selectedImage ? {
          src: selectedImage.src,
          alt: selectedImage.alt,
          title: "Aluminum Precision",
          description: "Modern prep kitchen featuring durable aluminum structure with double-sheet aluminum doors and Salko MDF wood finish, complemented by first-grade Indian beige quartz countertops.",
          category: "Modern Prep Kitchen"
        } : null}
        onClose={() => setSelectedImage(null)}
        onNext={handleNext}
        onPrevious={handlePrevious}
        currentIndex={selectedIndex}
        totalImages={galleryImages.length}
      />
    </section>
  );
}
