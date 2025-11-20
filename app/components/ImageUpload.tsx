"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ImageUploadProps {
  value?: string; // Current image URL
  onChange: (url: string) => void;
  onDelete?: () => void;
  maxSize?: number; // in MB
  className?: string;
  label?: string;
  helperText?: string;
  aspectRatio?: string; // e.g., "16/9", "4/3", "1/1"
  showPreview?: boolean;
  disabled?: boolean;
}

export default function ImageUpload({
  value,
  onChange,
  onDelete,
  maxSize = 10,
  className = "",
  label = "Upload Image",
  helperText,
  aspectRatio,
  showPreview = true,
  disabled = false,
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = useCallback(
    async (file: File) => {
      if (disabled) return;

      setError("");
      setProgress(0);

      // Validate file type
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
      if (!validTypes.includes(file.type)) {
        setError("Invalid file type. Only JPEG, PNG, and WebP are allowed.");
        return;
      }

      // Validate file size
      const maxSizeBytes = maxSize * 1024 * 1024;
      if (file.size > maxSizeBytes) {
        setError(`File too large. Maximum size is ${maxSize}MB.`);
        return;
      }

      setUploading(true);

      try {
        const formData = new FormData();
        formData.append("file", file);

        // Simulate progress
        const progressInterval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 90) {
              clearInterval(progressInterval);
              return 90;
            }
            return prev + 10;
          });
        }, 100);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        clearInterval(progressInterval);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to upload image");
        }

        const data = await response.json();
        setProgress(100);
        onChange(data.url);

        setTimeout(() => {
          setProgress(0);
        }, 1000);
      } catch (err) {
        console.error("Upload error:", err);
        setError(err instanceof Error ? err.message : "Failed to upload image");
        setProgress(0);
      } finally {
        setUploading(false);
      }
    },
    [disabled, maxSize, onChange],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      if (disabled) return;

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        handleFileUpload(files[0]);
      }
    },
    [disabled, handleFileUpload],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        handleFileUpload(files[0]);
      }
    },
    [handleFileUpload],
  );

  const handleDelete = useCallback(async () => {
    if (disabled || !value) return;

    if (!confirm("Are you sure you want to delete this image?")) {
      return;
    }

    try {
      // Delete from Vercel Blob
      await fetch(`/api/upload?url=${encodeURIComponent(value)}`, {
        method: "DELETE",
      });

      // Clear the value
      onChange("");
      if (onDelete) onDelete();
    } catch (err) {
      console.error("Delete error:", err);
      setError("Failed to delete image");
    }
  }, [disabled, value, onChange, onDelete]);

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      {helperText && <p className="text-sm text-gray-500">{helperText}</p>}

      {!value && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => !disabled && fileInputRef.current?.click()}
          className={`
            relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
            transition-all duration-200
            ${isDragging ? "border-green-primary bg-green-primary/5 scale-105" : "border-gray-300 hover:border-green-primary hover:bg-gray-50"}
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}
            ${uploading ? "pointer-events-none" : ""}
          `}
          style={aspectRatio ? { aspectRatio } : undefined}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleFileSelect}
            className="hidden"
            disabled={disabled}
          />

          <div className="flex flex-col items-center gap-3">
            {/* Upload Icon */}
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>

            <div className="text-sm text-gray-600">
              <p className="font-medium">
                {isDragging
                  ? "Drop image here"
                  : "Click to upload or drag and drop"}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                JPEG, PNG, or WebP (max {maxSize}MB)
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          {uploading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 rounded-b-lg overflow-hidden"
            >
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
                className="h-full bg-green-primary"
              />
            </motion.div>
          )}
        </div>
      )}

      {value && showPreview && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative group"
          style={aspectRatio ? { aspectRatio } : undefined}
        >
          <img
            src={value}
            alt="Uploaded"
            className="w-full h-full object-cover rounded-lg border border-gray-200"
          />

          {!disabled && (
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-3">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium"
              >
                Change
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
              >
                Delete
              </button>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleFileSelect}
            className="hidden"
            disabled={disabled}
          />
        </motion.div>
      )}

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
