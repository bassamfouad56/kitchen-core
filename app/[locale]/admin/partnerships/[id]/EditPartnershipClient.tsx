"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Partnership = {
  id: string;
  nameEn: string;
  nameAr: string;
  logo: string | null;
  url: string | null;
  order: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
};

interface EditPartnershipClientProps {
  partnership: Partnership;
  locale: string;
}

export default function EditPartnershipClient({
  partnership,
  locale,
}: EditPartnershipClientProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    nameEn: partnership.nameEn,
    nameAr: partnership.nameAr,
    logo: partnership.logo || "",
    url: partnership.url || "",
    order: partnership.order,
    published: partnership.published,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (!formData.nameEn || !formData.nameAr) {
      setError("Both English and Arabic names are required");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `/${locale}/api/admin/partnerships/${partnership.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nameEn: formData.nameEn,
            nameAr: formData.nameAr,
            logo: formData.logo || null,
            url: formData.url || null,
            order: formData.order,
            published: formData.published,
          }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update partnership");
      }

      setSuccess("Partnership updated successfully");
      router.refresh();
    } catch (error) {
      console.error("Error updating partnership:", error);
      setError(
        error instanceof Error ? error.message : "Failed to update partnership",
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
        {/* Logo Preview */}
        {formData.logo && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Logo Preview
            </label>
            <div className="h-32 flex items-center justify-center bg-gray-50 rounded-lg p-4">
              <Image
                src={formData.logo}
                alt={formData.nameEn}
                width={200}
                height={100}
                className="max-h-full w-auto object-contain"
              />
            </div>
          </div>
        )}

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

        {/* Metadata */}
        <div className="pt-4 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <span className="font-medium">Created:</span>{" "}
              {new Date(partnership.createdAt).toLocaleString()}
            </div>
            <div>
              <span className="font-medium">Updated:</span>{" "}
              {new Date(partnership.updatedAt).toLocaleString()}
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
