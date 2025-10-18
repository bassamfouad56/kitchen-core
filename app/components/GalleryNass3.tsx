"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  title: string;
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "/nass3/1.png",
    alt: "TV Unit with PVC-finished MDF wood",
    title: "TV Unit",
  },
  {
    id: 2,
    src: "/nass3/2.png",
    alt: "Buffet table with elegant design",
    title: "Buffet Table",
  },
  {
    id: 3,
    src: "/nass3/3.png",
    alt: "Hidden door with seamless integration",
    title: "Hidden Door",
  },
  {
    id: 4,
    src: "/nass3/4.png",
    alt: "Living room washbasin in quartz terrazzo",
    title: "Quartz Washbasin",
  },
  {
    id: 5,
    src: "/nass3/5.png",
    alt: "Mirror detail adding depth and elegance",
    title: "Mirror Accent",
  },
];

export default function GalleryNass3() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="gallery-nass3" className="py-32 bg-black relative overflow-hidden">
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

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-20 px-6 lg:px-8">
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
                  ELEGANT LIVING SPACE DESIGN
                </p>
              </div>
            </motion.div>
            <h2 className="font-serif text-6xl md:text-7xl lg:text-8xl text-white mb-8 leading-tight">
              Practical
              <span className="block text-green-vibrant italic mt-2">Beauty</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-light max-w-3xl mx-auto font-light leading-relaxed">
              Elegant design combining practicality and beauty: TV Unit, buffet table, and hidden
              door from PVC-finished MDF wood, and living room washbasin in quartz (terrazzo) with
              mirror touch that adds depth and elegance to the space.
            </p>
          </motion.div>
        </div>

        {/* Horizontal Scroll Gallery */}
        <div className="relative" ref={containerRef}>
          {/* Scroll Indicator - Left */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 hidden lg:block"
          >
            <div className="bg-green-primary/10 backdrop-blur-sm p-4 border-r border-green-primary/30">
              <motion.svg
                className="w-6 h-6 text-green-vibrant"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ x: [-5, 0, -5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </motion.svg>
            </div>
          </motion.div>

          {/* Scroll Indicator - Right */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 hidden lg:block"
          >
            <div className="bg-green-primary/10 backdrop-blur-sm p-4 border-l border-green-primary/30">
              <motion.svg
                className="w-6 h-6 text-green-vibrant"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </motion.svg>
            </div>
          </motion.div>

          {/* Scrollable Container */}
          <div className="overflow-x-auto scrollbar-hide px-6 lg:px-16">
            <div className="flex gap-6 pb-8 min-w-max">
              {galleryImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                  }}
                  className="group relative cursor-pointer w-[400px] h-[500px] flex-shrink-0"
                  onMouseEnter={() => setHoveredId(image.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => setSelectedImage(image)}
                >
                  {/* Image Container */}
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="400px"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

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
                      animate={{
                        borderColor:
                          hoveredId === image.id
                            ? [
                                "rgba(5, 150, 105, 0.5)",
                                "rgba(52, 211, 153, 0.8)",
                                "rgba(5, 150, 105, 0.5)",
                              ]
                            : "rgba(38, 38, 38, 0.5)",
                      }}
                      transition={{
                        duration: 2,
                        repeat: hoveredId === image.id ? Infinity : 0,
                      }}
                    />

                    {/* Content */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-between">
                      {/* Number Badge */}
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                        className="self-start"
                      >
                        <div className="bg-green-primary/90 backdrop-blur-sm text-black w-12 h-12 flex items-center justify-center font-bold text-xl">
                          {image.id}
                        </div>
                      </motion.div>

                      {/* Title */}
                      <div>
                        <motion.h3
                          className="font-serif text-3xl text-white mb-4"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + 0.3 }}
                        >
                          {image.title}
                        </motion.h3>

                        {/* View Details */}
                        <motion.div
                          className="flex items-center gap-2 text-green-vibrant text-sm font-medium"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{
                            opacity: hoveredId === image.id ? 1 : 0,
                            x: hoveredId === image.id ? 0 : -10,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <span>Explore Details</span>
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
                      </div>
                    </div>

                    {/* Corner Accents */}
                    <motion.div
                      className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-green-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      initial={false}
                      animate={{
                        scale: hoveredId === image.id ? [1, 1.1, 1] : 1,
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-green-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      initial={false}
                      animate={{
                        scale: hoveredId === image.id ? [1, 1.1, 1] : 1,
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 px-6 lg:px-8 max-w-7xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "PVC-Finished MDF", desc: "Durable & Elegant" },
              { title: "Quartz Terrazzo", desc: "Luxury Washbasin" },
              { title: "Mirror Details", desc: "Depth & Elegance" },
              { title: "Hidden Door", desc: "Seamless Design" },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <div className="bg-background-card border border-gray-dark group-hover:border-green-primary transition-all duration-500 p-8 text-center relative overflow-hidden">
                  <motion.div className="absolute inset-0 bg-green-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="text-2xl text-white mb-2 font-serif">{feature.title}</div>
                    <div className="text-xs tracking-wider text-gray-light uppercase">
                      {feature.desc}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
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
                <h3 className="font-serif text-3xl text-white mb-2">{selectedImage.title}</h3>
                <p className="text-gray-light text-lg">{selectedImage.alt}</p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
