"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface NewTranslationClientProps {
  locale: string;
}

export default function NewTranslationClient({
  locale,
}: NewTranslationClientProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    key: "",
    category: "",
    textEn: "",
    textAr: "",
    description: "",
    order: 0,
    published: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

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
      const response = await fetch(`/${locale}/api/admin/translations`, {
        method: "POST",
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
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create translation");
      }

      router.push(`/${locale}/admin/translations`);
      router.refresh();
    } catch (error) {
      console.error("Error creating translation:", error);
      setError(
        error instanceof Error ? error.message : "Failed to create translation",
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

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Creating..." : "Create Translation"}
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
