"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";

interface VideoFromAPI {
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  url: string;
  thumbnail: string | null;
  order: number;
  published: boolean;
}

interface VideoItem {
  id: string;
  url: string;
  title: string;
  description: string;
  thumbnail?: string;
}

export default function VideoShowcase() {
  const t = useTranslations("VideoShowcase");
  const locale = useLocale();
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mutedVideos, setMutedVideos] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [showControls, setShowControls] = useState<{ [key: string]: boolean }>(
    {}
  );
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
  const containerRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const controlsTimeoutRefs = useRef<{ [key: string]: NodeJS.Timeout | null }>(
    {}
  );

  // Fetch videos from API
  useEffect(() => {
    async function fetchVideos() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/api/videos");
        if (!response.ok) {
          throw new Error("Failed to fetch videos");
        }
        const data: VideoFromAPI[] = await response.json();
        const isArabic = locale === "ar";
        const mappedVideos: VideoItem[] = data.map((video) => ({
          id: video.id,
          url: video.url,
          title: isArabic ? video.titleAr || video.titleEn : video.titleEn,
          description: isArabic
            ? video.descriptionAr || video.descriptionEn
            : video.descriptionEn,
          thumbnail: video.thumbnail || undefined,
        }));
        setVideos(mappedVideos);
        // Initialize muted state for each video
        const initialMutedState: { [key: string]: boolean } = {};
        mappedVideos.forEach((v) => {
          initialMutedState[v.id] = true;
        });
        setMutedVideos(initialMutedState);
      } catch (err) {
        console.error("Error fetching videos:", err);
        setError("Unable to load videos. Please try again later.");
        setVideos([]);
      } finally {
        setLoading(false);
      }
    }
    fetchVideos();
  }, [locale]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      Object.values(controlsTimeoutRefs.current).forEach((timeout) => {
        if (timeout) clearTimeout(timeout);
      });
    };
  }, []);

  const startHideTimer = useCallback((id: string, delay: number = 2500) => {
    // Clear existing timeout
    if (controlsTimeoutRefs.current[id]) {
      clearTimeout(controlsTimeoutRefs.current[id]!);
    }
    // Hide controls after delay
    controlsTimeoutRefs.current[id] = setTimeout(() => {
      setShowControls((prev) => ({ ...prev, [id]: false }));
    }, delay);
  }, []);

  const handleMouseMove = useCallback(
    (id: string) => {
      // Only show controls if video is playing
      if (activeVideo === id) {
        setShowControls((prev) => ({ ...prev, [id]: true }));
        startHideTimer(id);
      }
    },
    [activeVideo, startHideTimer]
  );

  const handleMouseLeave = useCallback((id: string) => {
    // Clear timeout and hide controls when leaving the video area
    if (controlsTimeoutRefs.current[id]) {
      clearTimeout(controlsTimeoutRefs.current[id]!);
    }
    setShowControls((prev) => ({ ...prev, [id]: false }));
  }, []);

  const toggleFullscreen = useCallback((id: string) => {
    const container = containerRefs.current[id];
    const video = videoRefs.current[id];

    if (!container || !video) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      // Try to fullscreen the video element directly for native controls
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (
        (video as HTMLVideoElement & { webkitEnterFullscreen?: () => void })
          .webkitEnterFullscreen
      ) {
        // iOS Safari
        (
          video as HTMLVideoElement & { webkitEnterFullscreen: () => void }
        ).webkitEnterFullscreen();
      } else if (container.requestFullscreen) {
        container.requestFullscreen();
      }
    }
  }, []);

  const handlePlayPause = useCallback(
    (id: string) => {
      const video = videoRefs.current[id];
      if (!video) {
        console.error(`Video element not found for id: ${id}`);
        return;
      }

      if (video.paused) {
        // Pause all other videos
        Object.keys(videoRefs.current).forEach((key) => {
          const vid = videoRefs.current[key];
          if (vid && key !== id && !vid.paused) {
            vid.pause();
            setActiveVideo(null);
          }
        });

        // Ensure video is loaded
        if (video.readyState < 2) {
          video.load();
        }

        // Set muted state before playing
        video.muted = mutedVideos[id] ?? true;

        // Play with error handling
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log(`Video ${id} playing successfully`);
              setActiveVideo(id);
              // Show controls briefly after starting playback
              setShowControls((prev) => ({ ...prev, [id]: true }));
              startHideTimer(id, 1500); // Hide after 1.5s
            })
            .catch((error) => {
              console.error(`Error playing video ${id}:`, error);
              // If play fails, ensure it's muted and try again
              if (!video.muted) {
                video.muted = true;
                setMutedVideos((prev) => ({ ...prev, [id]: true }));
                video
                  .play()
                  .then(() => {
                    console.log(`Video ${id} playing muted`);
                    setActiveVideo(id);
                    // Show controls briefly after starting playback
                    setShowControls((prev) => ({ ...prev, [id]: true }));
                    startHideTimer(id, 1500);
                  })
                  .catch((err) => {
                    console.error(
                      `Failed to play video ${id} even when muted:`,
                      err
                    );
                    alert(
                      `Unable to play video. Please try refreshing the page.`
                    );
                  });
              }
            });
        }
      } else {
        video.pause();
        setActiveVideo(null);
        // Clear any pending hide timer when pausing
        if (controlsTimeoutRefs.current[id]) {
          clearTimeout(controlsTimeoutRefs.current[id]!);
        }
        setShowControls((prev) => ({ ...prev, [id]: false }));
      }
    },
    [mutedVideos, startHideTimer]
  );

  // Keyboard shortcuts for video control
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle if a video is active/playing
      if (!activeVideo) return;

      // Don't handle if user is typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      const video = videoRefs.current[activeVideo];
      if (!video) return;

      switch (e.key.toLowerCase()) {
        case " ": // Space - Play/Pause
          e.preventDefault();
          handlePlayPause(activeVideo);
          break;
        case "m": // M - Mute/Unmute
          e.preventDefault();
          const newMutedState = !mutedVideos[activeVideo];
          video.muted = newMutedState;
          setMutedVideos((prev) => ({ ...prev, [activeVideo]: newMutedState }));
          // Show controls briefly when toggling mute
          setShowControls((prev) => ({ ...prev, [activeVideo]: true }));
          startHideTimer(activeVideo);
          break;
        case "f": // F - Fullscreen
          e.preventDefault();
          toggleFullscreen(activeVideo);
          break;
        case "escape": // Escape - Exit fullscreen or pause
          if (document.fullscreenElement) {
            document.exitFullscreen();
          } else {
            video.pause();
            setActiveVideo(null);
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    activeVideo,
    mutedVideos,
    startHideTimer,
    toggleFullscreen,
    handlePlayPause,
  ]);

  const toggleMute = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRefs.current[id];
    if (video) {
      const newMutedState = !mutedVideos[id];
      video.muted = newMutedState;
      setMutedVideos((prev) => ({ ...prev, [id]: newMutedState }));
    }
  };

  return (
    <section
      id="video-showcase"
      className="py-32 bg-black relative overflow-hidden"
    >
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
                  {t("badge").toUpperCase()}
                </p>
              </div>
            </motion.div>
            <h2 className="font-serif text-6xl md:text-7xl lg:text-8xl text-white mb-8 leading-tight">
              {t("title")}
              <span className="block text-green-vibrant italic mt-2">
                {t("titleHighlight")}
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-light max-w-3xl mx-auto font-light leading-relaxed">
              {t("description")}
            </p>
          </motion.div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-video bg-gray-dark/50" />
                <div className="mt-6 space-y-3">
                  <div className="h-8 bg-gray-dark/50 rounded w-3/4" />
                  <div className="h-4 bg-gray-dark/50 rounded w-full" />
                  <div className="h-4 bg-gray-dark/50 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="text-center py-16 border border-gray-dark bg-background-card">
            <svg
              className="w-16 h-16 text-gray-light mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <p className="text-gray-light mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 border border-green-primary text-green-primary hover:bg-green-primary hover:text-black transition-colors text-sm tracking-wider"
            >
              TRY AGAIN
            </button>
          </div>
        )}

        {/* Video Grid */}
        {!loading && !error && videos.length > 0 && (
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
                  ref={(el) => {
                    containerRefs.current[video.id] = el;
                  }}
                  className="relative overflow-hidden"
                  onMouseEnter={() => setHoveredId(video.id)}
                  onMouseLeave={() => {
                    setHoveredId(null);
                    handleMouseLeave(video.id);
                  }}
                  onMouseMove={() => handleMouseMove(video.id)}
                >
                  {/* Video Container */}
                  <div className="relative aspect-video bg-gray-dark overflow-hidden">
                    <video
                      ref={(el) => {
                        videoRefs.current[video.id] = el;
                      }}
                      className="w-full h-full object-cover cursor-pointer"
                      loop
                      playsInline
                      preload="metadata"
                      muted
                      crossOrigin="anonymous"
                      poster={video.thumbnail}
                      onClick={() => handlePlayPause(video.id)}
                      onError={(e) => {
                        console.error(`Video ${video.id} failed to load:`, e);
                      }}
                      onLoadedData={() => {
                        console.log(`Video ${video.id} loaded successfully`);
                      }}
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

                    {/* Clickable overlay for play/pause when video is playing */}
                    {activeVideo === video.id && (
                      <div
                        className="absolute inset-0 z-10 cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handlePlayPause(video.id);
                        }}
                      />
                    )}

                    {/* Play/Pause Button - Show when paused OR when controls visible while playing */}
                    <AnimatePresence mode="wait">
                      {(activeVideo !== video.id || showControls[video.id]) && (
                        <motion.div
                          key={activeVideo === video.id ? "pause" : "play"}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                        >
                          <motion.button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handlePlayPause(video.id);
                            }}
                            className="pointer-events-auto cursor-pointer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <div
                              className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                                activeVideo === video.id
                                  ? "bg-black/60 backdrop-blur-md border border-white/20"
                                  : "bg-green-primary/90 backdrop-blur-sm hover:bg-green-vibrant"
                              }`}
                            >
                              {activeVideo === video.id ? (
                                <svg
                                  className="w-8 h-8 text-white"
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
                            </div>
                          </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>

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
                        {index + 1}
                      </div>
                    </motion.div>

                    {/* Video Controls - Mute & Fullscreen (show when playing and controls visible) */}
                    <AnimatePresence>
                      {activeVideo === video.id && showControls[video.id] && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                          className="absolute top-6 right-6 flex gap-2 z-20"
                        >
                          {/* Mute/Unmute Button */}
                          <motion.button
                            onClick={(e) => toggleMute(video.id, e)}
                            className="bg-black/50 backdrop-blur-sm text-white w-12 h-12 flex items-center justify-center hover:bg-green-primary hover:text-black transition-all duration-300"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            {mutedVideos[video.id] ? (
                              <svg
                                className="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                              </svg>
                            ) : (
                              <svg
                                className="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                              </svg>
                            )}
                          </motion.button>

                          {/* Fullscreen Button */}
                          <motion.button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFullscreen(video.id);
                            }}
                            className="bg-black/50 backdrop-blur-sm text-white w-12 h-12 flex items-center justify-center hover:bg-green-primary hover:text-black transition-all duration-300"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <svg
                              className="w-6 h-6"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                            </svg>
                          </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>

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
                    <p className="text-gray-light font-light leading-relaxed">
                      {video.description}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* CTA Section - only show if videos loaded successfully */}
        {!loading && !error && videos.length > 0 && (
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
                  {t("ctaTitle")}{" "}
                  <span className="text-green-vibrant italic">
                    {t("ctaTitleHighlight")}
                  </span>
                </h3>
                <p className="text-gray-light text-lg font-light leading-relaxed mb-8 max-w-2xl mx-auto">
                  {t("ctaDescription")}
                </p>
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block bg-green-primary text-black px-10 py-4 text-sm tracking-widest font-medium hover:bg-green-vibrant transition-all duration-300 shadow-xl shadow-green-primary/20 hover:shadow-green-vibrant/40"
                >
                  {t("ctaButton").toUpperCase()}
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
