"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Translation = {
  id: string;
  key: string;
  category: string;
  textEn: string;
  textAr: string;
  description: string | null;
  order: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
};

interface EditTranslationClientProps {
  translation: Translation;
  locale: string;
}

export default function EditTranslationClient({
  translation,
  locale,
}: EditTranslationClientProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    key: translation.key,
    category: translation.category,
    textEn: translation.textEn,
    textAr: translation.textAr,
    description: translation.description || "",
    order: translation.order,
    published: translation.published,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (
      !formData.key ||
      !formData.category ||
      !formData.textEn ||
      !formData.textAr
    ) {
      setError("Key, category, English text, and Arabic text are required");
      return;
    }

    // Validate key format (no spaces, lowercase with dots)
    const keyRegex = /^[a-z0-9.]+$/;
    if (!keyRegex.test(formData.key)) {
      setError(
        "Key must be lowercase letters, numbers, and dots only (e.g., portfolio.viewDetails)",
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `/${locale}/api/admin/translations/${translation.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            key: formData.key,
            category: formData.category,
            textEn: formData.textEn,
            textAr: formData.textAr,
            description: formData.description || null,
            order: formData.order,
            published: formData.published,
          }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update translation");
      }

      setSuccess("Translation updated successfully");
      router.refresh();
    } catch (error) {
      console.error("Error updating translation:", error);
      setError(
        error instanceof Error ? error.message : "Failed to update translation",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? parseInt(value) || 0 : value,
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  return (
    <div className="max-w-2xl">
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800">{success}</p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-8 rounded-lg shadow"
      >
        {/* Translation Key */}
        <div>
          <label
            htmlFor="key"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Translation Key <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="key"
            name="key"
            value={formData.key}
            onChange={handleChange}
            required
            pattern="[a-z0-9.]+"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
            placeholder="portfolio.viewDetails"
          />
          <p className="mt-1 text-xs text-gray-500">
            Lowercase letters, numbers, and dots only (e.g., navigation.home,
            footer.copyright)
          </p>
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Category <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="navigation"
          />
          <p className="mt-1 text-xs text-gray-500">
            Examples: navigation, footer, portfolio, about, contact, common
          </p>
        </div>

        {/* Text English */}
        <div>
          <label
            htmlFor="textEn"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            English Text <span className="text-red-500">*</span>
          </label>
          <textarea
            id="textEn"
            name="textEn"
            value={formData.textEn}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="View Details"
          />
        </div>

        {/* Text Arabic */}
        <div>
          <label
            htmlFor="textAr"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Arabic Text <span className="text-red-500">*</span>
          </label>
          <textarea
            id="textAr"
            name="textAr"
            value={formData.textAr}
            onChange={handleChange}
            required
            rows={3}
            dir="rtl"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="عرض التفاصيل"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Description (Optional)
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Button text for viewing project details"
          />
          <p className="mt-1 text-xs text-gray-500">
            Optional context about where/how this translation is used
          </p>
        </div>

        {/* Display Order */}
        <div>
          <label
            htmlFor="order"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Display Order
          </label>
          <input
            type="number"
            id="order"
            name="order"
            value={formData.order}
            onChange={handleChange}
            min={0}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="mt-1 text-xs text-gray-500">
            Lower numbers appear first in the list (within same category)
          </p>
        </div>

        {/* Published */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="published"
            name="published"
            checked={formData.published}
            onChange={handleCheckboxChange}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="published" className="ml-2 text-sm text-gray-700">
            Published (visible on website)
          </label>
        </div>

        {/* Metadata */}
        <div className="pt-4 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <span className="font-medium">Created:</span>{" "}
              {new Date(translation.createdAt).toLocaleString()}
            </div>
            <div>
              <span className="font-medium">Updated:</span>{" "}
              {new Date(translation.updatedAt).toLocaleString()}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
