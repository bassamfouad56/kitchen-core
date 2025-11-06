"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { PlayIcon, PauseIcon, VolumeOffIcon, Volume2Icon } from 'lucide-react';

interface VideoHeroProps {
  videoUrl: string;
  posterImage: string;
  title: React.ReactNode;
  subtitle?: string;
  description?: string;
  children?: React.ReactNode;
  overlayOpacity?: number;
  className?: string;
}

export default function VideoHero({
  videoUrl,
  posterImage,
  title,
  subtitle,
  description,
  children,
  overlayOpacity = 0.6,
  className = ""
}: VideoHeroProps) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Cleanup timeout on unmount
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  const handleVideoLoaded = () => {
    setIsVideoLoaded(true);
    // Auto-play video when loaded
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.log('Auto-play was prevented:', err);
        setIsPlaying(false);
      });
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);

    // Clear existing timeout
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }

    // Hide controls after 3 seconds of no movement
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  return (
    <div
      className={`relative w-full h-full overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Poster Image (shown while video loads) */}
      <AnimatePresence>
        {!isVideoLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-10"
          >
            <Image
              src={posterImage}
              alt="Hero background"
              fill
              className="object-cover"
              priority
            />
            {/* Loading spinner */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="w-16 h-16 border-4 border-green-primary border-t-transparent rounded-full animate-spin" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Element */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        onLoadedData={handleVideoLoaded}
        className="absolute inset-0 w-full h-full object-cover"
        poster={posterImage}
      >
        <source src={videoUrl} type="video/mp4" />
        <source src={videoUrl.replace('.mp4', '.webm')} type="video/webm" />
        Your browser does not support the video tag.
      </video>

      {/* Gradient Overlays */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-black"
        style={{ opacity: overlayOpacity }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-green-darker/30 via-transparent to-green-darker/30 opacity-50" />

      {/* Video Controls */}
      <AnimatePresence>
        {showControls && isVideoLoaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-8 left-8 z-20 flex gap-4"
          >
            <button
              onClick={togglePlayPause}
              className="p-3 bg-black/50 backdrop-blur-sm border border-green-primary/50 hover:bg-green-primary/20 transition-colors"
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
            >
              {isPlaying ? (
                <PauseIcon className="w-5 h-5 text-green-primary" />
              ) : (
                <PlayIcon className="w-5 h-5 text-green-primary" />
              )}
            </button>
            <button
              onClick={toggleMute}
              className="p-3 bg-black/50 backdrop-blur-sm border border-green-primary/50 hover:bg-green-primary/20 transition-colors"
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            >
              {isMuted ? (
                <VolumeOffIcon className="w-5 h-5 text-green-primary" />
              ) : (
                <Volume2Icon className="w-5 h-5 text-green-primary" />
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center max-w-6xl mx-auto px-6"
        >
          {subtitle && (
            <div className="inline-block mb-6 px-6 py-2 border border-green-primary/50 bg-green-darker/20 backdrop-blur-sm">
              <p className="text-green-vibrant text-sm tracking-[0.3em] font-light">
                {subtitle}
              </p>
            </div>
          )}

          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-white mb-8 leading-tight">
            {title}
          </h1>

          {description && (
            <p className="text-xl md:text-2xl text-gray-light max-w-3xl mx-auto font-light leading-relaxed mb-12">
              {description}
            </p>
          )}

          {children}
        </motion.div>
      </div>

      {/* Animated Grid Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(200, 225, 99, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(200, 225, 99, 0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>
    </div>
  );
}