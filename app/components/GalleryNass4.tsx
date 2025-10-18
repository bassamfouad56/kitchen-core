"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  title: string;
  description: string;
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "/nass4/1.png",
    alt: "Elegant contemporary kitchen with spacious cabinets",
    title: "Contemporary Design",
    description:
      "Spacious cabinets with soft lighting adding a refined touch. Central island provides ideal space for preparation and serving.",
  },
  {
    id: 2,
    src: "/nass4/2.png",
    alt: "High-quality kitchen finishing and optimal space utilization",
    title: "Premium Finishing",
    description:
      "Simple and organized design with high-quality finishing. Optimal space utilization for maximum functionality.",
  },
];

export default function GalleryNass4() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="gallery-nass4" className="py-32 bg-background-card relative overflow-hidden">
      {/* Subtle green glow effect */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-green-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-green-primary/10 rounded-full blur-3xl" />

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
                  ELEGANT CONTEMPORARY KITCHEN
                </p>
              </div>
            </motion.div>
            <h2 className="font-serif text-6xl md:text-7xl lg:text-8xl text-white mb-8 leading-tight">
              Kitchen
              <span className="block text-green-vibrant italic mt-2">Core</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-light max-w-3xl mx-auto font-light leading-relaxed">
              Elegant contemporary kitchen from kitchenCore that combines beauty and practicality,
              with spacious cabinets and soft lighting adding a refined touch to the space. The
              central island provides ideal space for preparation and serving with complete
              comfort.
            </p>
          </motion.div>
        </div>

        {/* Main Featured Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="relative aspect-[16/9] overflow-hidden cursor-pointer group">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.7 }}
                onClick={() => setSelectedImage(galleryImages[activeIndex])}
                className="relative w-full h-full"
              >
                <Image
                  src={galleryImages[activeIndex].src}
                  alt={galleryImages[activeIndex].alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  priority
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-500" />

                {/* Green Glow on Hover */}
                <motion.div
                  className="absolute inset-0 bg-green-primary/20"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />

                {/* Animated Border */}
                <motion.div
                  className="absolute inset-0 border-4 border-transparent"
                  whileHover={{
                    borderColor: [
                      "rgba(5, 150, 105, 0)",
                      "rgba(52, 211, 153, 0.6)",
                      "rgba(5, 150, 105, 0)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-12 flex flex-col justify-end">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="inline-block bg-green-primary/90 backdrop-blur-sm text-black px-6 py-2 text-sm tracking-wider font-bold mb-6">
                      FEATURED {activeIndex + 1} OF {galleryImages.length}
                    </div>
                    <h3 className="font-serif text-5xl text-white mb-4">
                      {galleryImages[activeIndex].title}
                    </h3>
                    <p className="text-xl text-gray-light max-w-2xl font-light leading-relaxed mb-6">
                      {galleryImages[activeIndex].description}
                    </p>

                    {/* View Full Size Button */}
                    <motion.button
                      whileHover={{ scale: 1.05, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-3 text-green-vibrant text-lg font-medium group/btn"
                    >
                      <span>View Full Size</span>
                      <motion.svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </motion.svg>
                    </motion.button>
                  </motion.div>
                </div>

                {/* Corner Accents */}
                <div className="absolute top-0 right-0 w-32 h-32 border-t-4 border-r-4 border-green-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 w-32 h-32 border-b-4 border-l-4 border-green-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Thumbnail Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 gap-6 max-w-4xl mx-auto mb-16"
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveIndex(index)}
              className={`relative aspect-[16/9] cursor-pointer overflow-hidden transition-all duration-500 ${
                activeIndex === index
                  ? "ring-4 ring-green-primary shadow-xl shadow-green-primary/30"
                  : "ring-2 ring-gray-dark hover:ring-green-primary/50"
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-all duration-500"
                sizes="(max-width: 768px) 50vw, 33vw"
              />

              {/* Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent transition-opacity duration-500 ${
                  activeIndex === index ? "opacity-40" : "opacity-70 hover:opacity-50"
                }`}
              />

              {/* Green Overlay for Active */}
              {activeIndex === index && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  className="absolute inset-0 bg-green-primary"
                />
              )}

              {/* Title */}
              <div className="absolute bottom-4 left-4 right-4">
                <div
                  className={`text-sm tracking-wider mb-2 ${
                    activeIndex === index ? "text-green-vibrant" : "text-gray-light"
                  }`}
                >
                  0{image.id}
                </div>
                <h4 className="font-serif text-xl text-white">{image.title}</h4>
              </div>

              {/* Active Indicator */}
              {activeIndex === index && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-4 right-4 bg-green-primary text-black w-10 h-10 rounded-full flex items-center justify-center font-bold"
                >
                  ✓
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                  />
                </svg>
              ),
              title: "Simple & Organized Design",
              desc: "Clean lines and thoughtful layout",
            },
            {
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              ),
              title: "High-Quality Finishing",
              desc: "Premium materials and craftsmanship",
            },
            {
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                  />
                </svg>
              ),
              title: "Optimal Space Utilization",
              desc: "Maximum functionality in every inch",
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group"
            >
              <div className="bg-background-elevated border border-gray-dark hover:border-green-primary transition-all duration-500 p-8 h-full">
                <motion.div
                  className="text-green-vibrant mb-6"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-2xl text-white mb-3 font-serif group-hover:text-green-vibrant transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-light font-light leading-relaxed">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-7xl w-full"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 p-3 bg-background-card border border-green-primary text-green-vibrant hover:bg-green-primary hover:text-black transition-all duration-300 z-10"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Image */}
              <div className="relative aspect-video overflow-hidden border-2 border-green-primary/50">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                  sizes="90vw"
                />
              </div>

              {/* Details */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-6 bg-background-card border border-green-primary/30 p-8"
              >
                <h3 className="font-serif text-4xl text-white mb-4">{selectedImage.title}</h3>
                <p className="text-gray-light text-xl leading-relaxed">{selectedImage.description}</p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
