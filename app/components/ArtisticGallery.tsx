"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryImage {
  id: number;
  src: string;
  title: string;
  category: string;
  location: string;
  size: "small" | "medium" | "large" | "wide" | "tall";
  description: string;
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "/2.jpg",
    title: "Royal Palace Kitchen",
    category: "Palace",
    location: "Dubai, UAE",
    size: "large",
    description: "Italian marble countertops with custom brass fixtures",
  },
  {
    id: 2,
    src: "/3.jpg",
    title: "Mediterranean Villa",
    category: "Villa",
    location: "Monaco",
    size: "medium",
    description: "Ocean-view cooking with premium Sub-Zero appliances",
  },
  {
    id: 3,
    src: "/4.jpg",
    title: "Modern Estate",
    category: "Estate",
    location: "London, UK",
    size: "tall",
    description: "Minimalist elegance with smart home integration",
  },
  {
    id: 4,
    src: "/5.jpg",
    title: "Heritage Palace",
    category: "Palace",
    location: "Riyadh",
    size: "wide",
    description: "Classical grandeur meets modern technology",
  },
  {
    id: 5,
    src: "/6.jpg",
    title: "Manhattan Penthouse",
    category: "Penthouse",
    location: "New York",
    size: "medium",
    description: "Urban luxury with handcrafted Italian cabinetry",
  },
  {
    id: 6,
    src: "/7.jpg",
    title: "Coastal Villa",
    category: "Villa",
    location: "Malibu",
    size: "small",
    description: "Indoor-outdoor living with weather-resistant systems",
  },
  {
    id: 7,
    src: "/8.jpg",
    title: "Contemporary Estate",
    category: "Estate",
    location: "Singapore",
    size: "medium",
    description: "Asian fusion design with European craftsmanship",
  },
  {
    id: 8,
    src: "/1.jpg",
    title: "Private Residence",
    category: "Villa",
    location: "Paris",
    size: "large",
    description: "French elegance with cutting-edge technology",
  },
  {
    id: 9,
    src: "/10.jpg",
    title: "Luxury Apartment",
    category: "Penthouse",
    location: "Hong Kong",
    size: "small",
    description: "Space-efficient luxury with panoramic views",
  },
  {
    id: 10,
    src: "/9.jpg",
    title: "Desert Palace",
    category: "Palace",
    location: "Abu Dhabi",
    size: "tall",
    description: "Middle Eastern opulence with smart climate control",
  },
  {
    id: 11,
    src: "/2.jpg",
    title: "Mountain Retreat",
    category: "Villa",
    location: "Swiss Alps",
    size: "medium",
    description: "Alpine luxury with sustainable engineering",
  },
  {
    id: 12,
    src: "/3.jpg",
    title: "Island Estate",
    category: "Estate",
    location: "Seychelles",
    size: "wide",
    description: "Tropical paradise with marine-grade materials",
  },
];

const categories = ["All", "Palace", "Villa", "Estate", "Penthouse"];

export default function ArtisticGallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filteredImages =
    selectedCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  const getSizeClass = (size: string) => {
    switch (size) {
      case "large":
        return "md:col-span-2 md:row-span-2";
      case "wide":
        return "md:col-span-2";
      case "tall":
        return "md:row-span-2";
      case "medium":
        return "md:col-span-1 md:row-span-1";
      case "small":
        return "md:col-span-1";
      default:
        return "";
    }
  };

  return (
    <section id="gallery" className="py-32 bg-black relative overflow-hidden">
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
                  ARTISTIC SHOWCASE
                </p>
              </div>
            </motion.div>
            <h2 className="font-serif text-6xl md:text-7xl lg:text-8xl text-white mb-8 leading-tight">
              Visual
              <span className="block text-green-vibrant italic mt-2">Masterpieces</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-light max-w-3xl mx-auto font-light leading-relaxed">
              Explore our portfolio of extraordinary kitchens where art meets engineering.
              Each space tells a unique story of luxury, innovation, and timeless design.
            </p>
          </motion.div>
        </div>

        {/* Artistic Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`group relative px-8 py-4 text-sm tracking-[0.2em] font-medium overflow-hidden transition-all duration-500 ${
                selectedCategory === category
                  ? "text-black"
                  : "text-gray-light hover:text-white"
              }`}
            >
              {/* Animated Background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-green-primary via-green-vibrant to-green-primary"
                initial={false}
                animate={{
                  x: selectedCategory === category ? 0 : "-100%",
                  backgroundPosition: ["0% 50%", "100% 50%"],
                }}
                transition={{
                  x: { duration: 0.3 },
                  backgroundPosition: {
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                  },
                }}
                style={{ backgroundSize: "200% 100%" }}
              />

              {/* Border */}
              <div
                className={`absolute inset-0 border transition-colors duration-300 ${
                  selectedCategory === category
                    ? "border-green-vibrant"
                    : "border-gray-dark group-hover:border-green-primary"
                }`}
              />

              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  boxShadow: "0 0 20px rgba(5, 150, 105, 0.3)",
                }}
              />

              <span className="relative z-10">{category.toUpperCase()}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Masonry Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[300px]"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotateY: 20 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.05,
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
                <motion.div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${image.src})`,
                  }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.8 }}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

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
                    borderColor: ["rgba(5, 150, 105, 0.5)", "rgba(52, 211, 153, 0.8)", "rgba(5, 150, 105, 0.5)"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  {/* Category Badge */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                    className="mb-3"
                  >
                    <span className="inline-block bg-green-primary/90 backdrop-blur-sm text-black px-4 py-1.5 text-xs tracking-wider font-bold">
                      {image.category.toUpperCase()}
                    </span>
                  </motion.div>

                  {/* Title */}
                  <motion.h3
                    className="font-serif text-2xl lg:text-3xl text-white mb-2 transform transition-transform duration-500 group-hover:translate-x-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    {image.title}
                  </motion.h3>

                  {/* Location */}
                  <motion.div
                    className="flex items-center gap-2 text-green-vibrant text-sm mb-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.4 }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="font-medium">{image.location}</span>
                  </motion.div>

                  {/* Description - Only on hover */}
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: hoveredId === image.id ? 1 : 0,
                      height: hoveredId === image.id ? "auto" : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-sm text-white/90 overflow-hidden"
                  >
                    {image.description}
                  </motion.p>

                  {/* View Details Arrow */}
                  <motion.div
                    className="mt-4 flex items-center gap-2 text-green-vibrant text-sm font-medium"
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
                </div>

                {/* Corner Accent */}
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

        {/* Gallery Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { number: "150+", label: "Projects Completed" },
            { number: "25", label: "Countries" },
            { number: "$2B+", label: "Total Value" },
            { number: "100%", label: "Satisfaction" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="bg-background-card border border-gray-dark group-hover:border-green-primary transition-all duration-500 p-8 text-center relative overflow-hidden">
                {/* Glow Effect */}
                <motion.div
                  className="absolute inset-0 bg-green-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <div className="relative z-10">
                  <motion.div
                    className="font-serif text-5xl text-green-vibrant mb-2"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-xs tracking-wider text-gray-light uppercase">
                    {stat.label}
                  </div>
                </div>
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
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </div>

              {/* Details */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-6 bg-background-card border border-green-primary/30 p-8"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-4xl text-white mb-2">
                      {selectedImage.title}
                    </h3>
                    <p className="text-green-primary flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                      </svg>
                      {selectedImage.location}
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <span className="px-6 py-3 bg-green-primary text-black text-sm tracking-wider font-bold">
                      {selectedImage.category.toUpperCase()}
                    </span>
                  </div>
                </div>
                <p className="text-gray-light mt-4 text-lg">{selectedImage.description}</p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
