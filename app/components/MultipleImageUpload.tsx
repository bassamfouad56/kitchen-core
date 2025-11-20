"use client";

import { useState, useCallback } from "react";
import { motion, Reorder, AnimatePresence } from "framer-motion";
import ImageUpload from "./ImageUpload";

interface MultipleImageUploadProps {
  value: string[]; // Array of image URLs
  onChange: (urls: string[]) => void;
  maxImages?: number;
  maxSize?: number;
  className?: string;
  label?: string;
  helperText?: string;
  disabled?: boolean;
}

export default function MultipleImageUpload({
  value = [],
  onChange,
  maxImages = 10,
  maxSize = 10,
  className = "",
  label = "Upload Images",
  helperText,
  disabled = false,
}: MultipleImageUploadProps) {
  const [showUploader, setShowUploader] = useState(false);

  const handleAdd = useCallback(
    (url: string) => {
      if (value.length < maxImages) {
        onChange([...value, url]);
        setShowUploader(false);
      }
    },
    [value, maxImages, onChange],
  );

  const handleDelete = useCallback(
    (index: number) => {
      const newUrls = value.filter((_, i) => i !== index);
      onChange(newUrls);
    },
    [value, onChange],
  );

  const handleReorder = useCallback(
    (newOrder: string[]) => {
      onChange(newOrder);
    },
    [onChange],
  );

  const canAddMore = value.length < maxImages;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          {label && (
            <label className="block text-sm font-medium text-gray-700">
              {label}
            </label>
          )}
          {helperText && (
            <p className="text-sm text-gray-500 mt-1">{helperText}</p>
          )}
        </div>
        <span className="text-sm text-gray-500">
          {value.length} / {maxImages}
        </span>
      </div>

      {/* Image Grid with Drag & Drop Reordering */}
      {value.length > 0 && (
        <Reorder.Group
          axis="x"
          values={value}
          onReorder={handleReorder}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
        >
          {value.map((url, index) => (
            <Reorder.Item key={url} value={url}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative group aspect-square rounded-lg overflow-hidden border-2 border-gray-200 hover:border-green-primary transition-colors cursor-move"
              >
                <img
                  src={url}
                  alt={`Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={() => handleDelete(index)}
                    disabled={disabled}
                    className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium disabled:opacity-50"
                  >
                    Delete
                  </button>
                </div>

                {/* Position Badge */}
                <div className="absolute top-2 left-2 w-6 h-6 bg-black/70 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {index + 1}
                </div>

                {/* Drag Handle */}
                <div className="absolute top-2 right-2 w-6 h-6 bg-black/70 text-white rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 8h16M4 16h16"
                    />
                  </svg>
                </div>
              </motion.div>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      )}

      {/* Add More Button */}
      {!showUploader && canAddMore && (
        <button
          onClick={() => setShowUploader(true)}
          disabled={disabled}
          className="w-full p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-primary hover:bg-gray-50 transition-colors text-gray-600 hover:text-green-primary font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="flex items-center justify-center gap-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span>
              Add Image ({value.length}/{maxImages})
            </span>
          </div>
        </button>
      )}

      {/* Uploader */}
      <AnimatePresence>
        {showUploader && canAddMore && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3"
          >
            <ImageUpload
              onChange={handleAdd}
              maxSize={maxSize}
              aspectRatio="1/1"
              disabled={disabled}
              helperText={`Add image ${value.length + 1} of ${maxImages}`}
            />
            <button
              onClick={() => setShowUploader(false)}
              className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
            >
              Cancel
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Max Images Reached */}
      {!canAddMore && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
          Maximum of {maxImages} images reached. Delete an image to add more.
        </div>
      )}

      {/* Empty State */}
      {value.length === 0 && !showUploader && (
        <div className="text-center py-12 text-gray-500">
          <svg
            className="w-16 h-16 mx-auto text-gray-300 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-sm mb-4">No images uploaded yet.</p>
          <button
            onClick={() => setShowUploader(true)}
            disabled={disabled}
            className="px-6 py-2 bg-green-primary text-white rounded-lg hover:bg-green-600 transition-colors font-medium disabled:opacity-50"
          >
            Upload First Image
          </button>
        </div>
      )}
    </div>
  );
}
