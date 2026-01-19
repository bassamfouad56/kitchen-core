"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  required?: boolean;
  helpText?: string;
}

export default function ImageUpload({
  value,
  onChange,
  label = "Image",
  required = false,
  helpText,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    setError("");
    setUploading(true);

    try {
      // Validate file type
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
      if (!validTypes.includes(file.type)) {
        throw new Error("Invalid file type. Only JPEG, PNG, and WebP are allowed.");
      }

      // Validate file size (10MB max)
      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        throw new Error("File too large. Maximum size is 10MB.");
      }

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Upload failed");
      }

      const data = await response.json();
      onChange(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUpload(e.dataTransfer.files[0]);
    }
  };

  const handleRemove = async () => {
    if (!value) return;

    try {
      // Delete from Vercel Blob if it's a blob URL
      if (value.includes("blob.vercel-storage.com")) {
        await fetch(`/api/upload?url=${encodeURIComponent(value)}`, {
          method: "DELETE",
          credentials: "include",
        });
      }
      onChange("");
    } catch (err) {
      console.error("Failed to delete image:", err);
      onChange("");
    }
  };

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-light mb-2">
          {label} {required && "*"}
        </label>
      )}

      {value ? (
        <div className="relative">
          {/* Image Preview */}
          <div className="relative aspect-square w-48 bg-background-dark border border-gray-dark overflow-hidden">
            <Image
              src={value}
              alt="Uploaded image"
              fill
              className="object-cover"
              unoptimized={value.includes("blob.vercel-storage.com")}
            />
          </div>

          {/* Remove Button */}
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* URL Display */}
          <div className="mt-2">
            <input
              type="text"
              value={value}
              readOnly
              className="w-full bg-black border border-gray-dark text-gray-light text-sm px-3 py-2"
            />
          </div>

          {/* Replace Button */}
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="mt-2 text-sm text-green-primary hover:text-green-vibrant"
          >
            Replace image
          </button>
        </div>
      ) : (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`
            relative border-2 border-dashed p-8 text-center cursor-pointer transition-all
            ${dragActive
              ? "border-green-primary bg-green-primary/10"
              : "border-gray-dark hover:border-green-primary/50 hover:bg-white/5"
            }
            ${uploading ? "pointer-events-none opacity-50" : ""}
          `}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-10 h-10 text-green-primary animate-spin" />
              <p className="text-gray-light">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-green-primary/10 flex items-center justify-center">
                {dragActive ? (
                  <ImageIcon className="w-8 h-8 text-green-primary" />
                ) : (
                  <Upload className="w-8 h-8 text-green-primary" />
                )}
              </div>
              <div>
                <p className="text-white font-medium">
                  {dragActive ? "Drop image here" : "Click to upload or drag and drop"}
                </p>
                <p className="text-gray-light text-sm mt-1">
                  JPEG, PNG or WebP (max 10MB)
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Error Message */}
      {error && (
        <p className="mt-2 text-sm text-red-400">{error}</p>
      )}

      {/* Help Text */}
      {helpText && !error && (
        <p className="mt-2 text-xs text-gray-light">{helpText}</p>
      )}
    </div>
  );
}
