"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  size: "small" | "medium" | "large" | "wide";
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "/nass2/1.png",
    alt: "Luxurious main kitchen - Complete view with European appliances",
    size: "large",
  },
  {
    id: 2,
    src: "/nass2/2.png",
    alt: "Nano white quartz surface with elegant finish",
    size: "medium",
  },
  {
    id: 3,
    src: "/nass2/3.png",
    alt: "PVC-finished MDF and Salko wood door details",
    size: "medium",
  },
  {
    id: 4,
    src: "/nass2/4.png",
    alt: "Internal aluminum structure with premium accessories",
    size: "wide",
  },
];

export default function GalleryNass2() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const getSizeClass = (size: string) => {
    switch (size) {
      case "large":
        return "md:col-span-2 md:row-span-2";
      case "wide":
        return "md:col-span-2";
      case "medium":
        return "md:col-span-1";
      case "small":
        return "md:col-span-1";
      default:
        return "";
    }
  };

  return (
    <section id="gallery-nass2" className="py-32 bg-background-elevated relative overflow-hidden">
      {/* Subtle green glow effect */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-primary/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-[1800px] mx-auto px-6 lg:px-8">
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
                  LUXURIOUS MAIN KITCHEN
                </p>
              </div>
            </motion.div>
            <h2 className="font-serif text-6xl md:text-7xl lg:text-8xl text-white mb-8 leading-tight">
              European
              <span className="block text-green-vibrant italic mt-2">Excellence</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-light max-w-3xl mx-auto font-light leading-relaxed mb-8">
              Luxurious main kitchen featuring internal aluminum structure, doors with PVC-finished
              MDF and Salko wood mix, elegant nano white quartz surface, and equipped with latest
              European appliances and accessories.
            </p>

            {/* Feature Checkmarks */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-6 text-sm"
            >
              {[
                "Internal Aluminum Structure",
                "PVC-Finished MDF Doors",
                "Nano White Quartz Surface",
                "European Appliances & Accessories",
              ].map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-2 text-green-primary"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-light">{feature}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Masonry Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]"
        >
          <AnimatePresence mode="popLayout">
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotateY: 20 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  layout: { duration: 0.4 },
                }}
                className={`group relative cursor-pointer overflow-hidden ${getSizeClass(
                  image.size
                )}`}
                onMouseEnter={() => setHoveredId(image.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setSelectedImage(image)}
              >
                {/* Image */}
                <div className="relative w-full h-full">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

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

                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  {/* Number Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                    className="mb-auto"
                  >
                    <span className="inline-block bg-green-primary/90 backdrop-blur-sm text-black px-4 py-2 text-sm tracking-wider font-bold">
                      {String(image.id).padStart(2, "0")}
                    </span>
                  </motion.div>

                  {/* View Details Arrow */}
                  <motion.div
                    className="flex items-center gap-2 text-green-vibrant text-sm font-medium"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{
                      opacity: hoveredId === image.id ? 1 : 0,
                      x: hoveredId === image.id ? 0 : -10,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <span>View Full Size</span>
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
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                      />
                    </motion.svg>
                  </motion.div>
                </div>

                {/* Corner Accents */}
                <motion.div
                  className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-green-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={false}
                  animate={{
                    scale: hoveredId === image.id ? [1, 1.1, 1] : 1,
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-green-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={false}
                  animate={{
                    scale: hoveredId === image.id ? [1, 1.1, 1] : 1,
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Design Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center max-w-4xl mx-auto"
        >
          <div className="bg-background-card border border-green-primary/30 p-12">
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="font-serif text-4xl text-white mb-6">
                Design That Combines <span className="text-green-vibrant italic">Luxury</span> with
                Practical Daily Use
              </h3>
              <p className="text-gray-light text-lg font-light leading-relaxed">
                Every element is carefully selected to provide not just aesthetic beauty, but
                functional excellence that enhances your daily cooking experience. From the durable
                aluminum structure to the premium European accessories, this kitchen is built to
                last while maintaining its elegance.
              </p>
            </motion.div>
          </div>
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
              className="relative max-w-6xl w-full"
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
                <p className="text-gray-light text-lg text-center">{selectedImage.alt}</p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
