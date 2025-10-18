"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

interface VideoItem {
  id: number;
  url: string;
  title: string;
  description: string;
  thumbnail?: string;
}

const videos: VideoItem[] = [
  {
    id: 1,
    url: "https://dr3oahdfiq9ky1mn.public.blob.vercel-storage.com/20251016_230723_0001.mp4",
    title: "Complete Kitchen Solutions",
    description:
      "Kitchen Core offers a complete solution for kitchens that combine high quality and modern design. The internal structure is made entirely of aluminum to ensure durability and efficiency in the long term. The external facades are made of PVC material, designed carefully to give an elegant and lasting appearance.",
  },
  {
    id: 2,
    url: "https://dr3oahdfiq9ky1mn.public.blob.vercel-storage.com/20251016_232105_0000.mp4",
    title: "Modern High-Quality Design",
    description:
      "Modern design with high quality adds a refined touch to every corner of your home.",
  },
];

export default function VideoShowcase() {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [mutedVideos, setMutedVideos] = useState<{ [key: number]: boolean }>({
    1: true,
    2: true,
  });
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});

  const handlePlayPause = (id: number) => {
    const video = videoRefs.current[id];
    if (video) {
      if (video.paused) {
        // Pause all other videos
        Object.keys(videoRefs.current).forEach((key) => {
          const vid = videoRefs.current[Number(key)];
          if (vid && Number(key) !== id) {
            vid.pause();
          }
        });

        // Set muted state
        video.muted = mutedVideos[id] ?? true;

        // Play with error handling
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setActiveVideo(id);
            })
            .catch((error) => {
              console.error("Error playing video:", error);
              // If play fails, try muted
              video.muted = true;
              setMutedVideos((prev) => ({ ...prev, [id]: true }));
              video.play().then(() => {
                setActiveVideo(id);
              }).catch((err) => {
                console.error("Failed to play video even when muted:", err);
              });
            });
        }
      } else {
        video.pause();
        setActiveVideo(null);
      }
    }
  };

  const toggleMute = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRefs.current[id];
    if (video) {
      const newMutedState = !mutedVideos[id];
      video.muted = newMutedState;
      setMutedVideos((prev) => ({ ...prev, [id]: newMutedState }));
    }
  };

  return (
    <section id="video-showcase" className="py-32 bg-black relative overflow-hidden">
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
                  VIDEO SHOWCASE
                </p>
              </div>
            </motion.div>
            <h2 className="font-serif text-6xl md:text-7xl lg:text-8xl text-white mb-8 leading-tight">
              Experience
              <span className="block text-green-vibrant italic mt-2">Excellence</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-light max-w-3xl mx-auto font-light leading-relaxed">
              Watch our kitchen transformations come to life. See the quality, precision, and
              attention to detail that defines Kitchen Core.
            </p>
          </motion.div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group"
            >
              <div
                className="relative overflow-hidden"
                onMouseEnter={() => setHoveredId(video.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Video Container */}
                <div className="relative aspect-video bg-gray-dark overflow-hidden">
                  <video
                    ref={(el) => {
                      videoRefs.current[video.id] = el;
                    }}
                    className="w-full h-full object-cover"
                    loop
                    playsInline
                    preload="metadata"
                    controls={false}
                    onClick={() => handlePlayPause(video.id)}
                  >
                    <source src={video.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  {/* Gradient Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent transition-opacity duration-500 ${
                      activeVideo === video.id ? "opacity-20" : "opacity-70"
                    }`}
                  />

                  {/* Green Glow Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-green-primary/20"
                    initial={false}
                    animate={{
                      opacity: hoveredId === video.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.5 }}
                  />

                  {/* Play/Pause Button */}
                  <motion.button
                    onClick={() => handlePlayPause(video.id)}
                    className="absolute inset-0 flex items-center justify-center group/btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.2 + 0.4, type: "spring" }}
                      className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                        activeVideo === video.id
                          ? "bg-green-primary/50 backdrop-blur-sm"
                          : "bg-green-primary/80 backdrop-blur-sm group-hover/btn:bg-green-vibrant"
                      }`}
                    >
                      {activeVideo === video.id ? (
                        <svg
                          className="w-10 h-10 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                        </svg>
                      ) : (
                        <svg
                          className="w-10 h-10 text-black ml-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      )}
                    </motion.div>
                  </motion.button>

                  {/* Animated Border */}
                  <motion.div
                    className="absolute inset-0 border-2"
                    initial={{ borderColor: "rgba(38, 38, 38, 0.5)" }}
                    animate={{
                      borderColor:
                        hoveredId === video.id
                          ? [
                              "rgba(5, 150, 105, 0.5)",
                              "rgba(52, 211, 153, 0.8)",
                              "rgba(5, 150, 105, 0.5)",
                            ]
                          : "rgba(38, 38, 38, 0.5)",
                    }}
                    transition={{
                      duration: 2,
                      repeat: hoveredId === video.id ? Infinity : 0,
                    }}
                  />

                  {/* Number Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.2 + 0.3 }}
                    className="absolute top-6 left-6"
                  >
                    <div className="bg-green-primary/90 backdrop-blur-sm text-black w-12 h-12 flex items-center justify-center font-bold text-xl">
                      {video.id}
                    </div>
                  </motion.div>

                  {/* Mute/Unmute Button */}
                  <motion.button
                    onClick={(e) => toggleMute(video.id, e)}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: activeVideo === video.id ? 1 : 0,
                      scale: activeVideo === video.id ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-6 right-6 bg-black/50 backdrop-blur-sm text-white w-12 h-12 flex items-center justify-center hover:bg-green-primary hover:text-black transition-all duration-300 z-20"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {mutedVideos[video.id] ? (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                      </svg>
                    )}
                  </motion.button>

                  {/* Corner Accents */}
                  <motion.div
                    className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-green-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={false}
                    animate={{
                      scale: hoveredId === video.id ? [1, 1.1, 1] : 1,
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 w-24 h-24 border-b-2 border-l-2 border-green-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={false}
                    animate={{
                      scale: hoveredId === video.id ? [1, 1.1, 1] : 1,
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  />
                </div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.4 }}
                  className="mt-6"
                >
                  <h3 className="font-serif text-3xl text-white mb-3 group-hover:text-green-vibrant transition-colors duration-300">
                    {video.title}
                  </h3>
                  <p className="text-gray-light font-light leading-relaxed">{video.description}</p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="bg-background-card border border-green-primary/30 p-12">
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="font-serif text-4xl text-white mb-6">
                Ready to Transform Your{" "}
                <span className="text-green-vibrant italic">Kitchen?</span>
              </h3>
              <p className="text-gray-light text-lg font-light leading-relaxed mb-8 max-w-2xl mx-auto">
                Experience the perfect blend of durability and elegance. Our aluminum structures
                and PVC finishes ensure your kitchen stays beautiful for years to come.
              </p>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-green-primary text-black px-10 py-4 text-sm tracking-widest font-medium hover:bg-green-vibrant transition-all duration-300 shadow-xl shadow-green-primary/20 hover:shadow-green-vibrant/40"
              >
                START YOUR PROJECT
              </motion.a>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
