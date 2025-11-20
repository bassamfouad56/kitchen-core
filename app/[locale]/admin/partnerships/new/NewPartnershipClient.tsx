"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface NewPartnershipClientProps {
  locale: string;
}

export default function NewPartnershipClient({
  locale,
}: NewPartnershipClientProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    nameEn: "",
    nameAr: "",
    logo: "",
    url: "",
    order: 0,
    published: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.nameEn || !formData.nameAr) {
      setError("Both English and Arabic names are required");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`/${locale}/api/admin/partnerships`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nameEn: formData.nameEn,
          nameAr: formData.nameAr,
          logo: formData.logo || null,
          url: formData.url || null,
          order: formData.order,
          published: formData.published,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create partnership");
      }

      router.push(`/${locale}/admin/partnerships`);
      router.refresh();
    } catch (error) {
      console.error("Error creating partnership:", error);
      setError(
        error instanceof Error ? error.message : "Failed to create partnership",
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
        {/* Name English */}
        <div>
          <label
            htmlFor="nameEn"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Partner Name (English) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="nameEn"
            name="nameEn"
            value={formData.nameEn}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Samsung"
          />
        </div>

        {/* Name Arabic */}
        <div>
          <label
            htmlFor="nameAr"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Partner Name (Arabic) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="nameAr"
            name="nameAr"
            value={formData.nameAr}
            onChange={handleChange}
            required
            dir="rtl"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="سامسونج"
          />
        </div>

        {/* Logo URL */}
        <div>
          <label
            htmlFor="logo"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Logo URL
          </label>
          <input
            type="text"
            id="logo"
            name="logo"
            value={formData.logo}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="/partners/samsung-logo.png"
          />
          <p className="mt-1 text-xs text-gray-500">
            Path to logo image in /public folder (e.g.,
            /partners/brand-logo.png)
          </p>
        </div>

        {/* Website URL */}
        <div>
          <label
            htmlFor="url"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Partner Website URL (Optional)
          </label>
          <input
            type="url"
            id="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://www.samsung.com"
          />
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
            Lower numbers appear first (0, 1, 2, etc.)
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
            {loading ? "Creating..." : "Create Partnership"}
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
