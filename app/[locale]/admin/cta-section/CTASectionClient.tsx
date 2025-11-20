"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type CTASection = {
  id: string;
  badgeEn: string | null;
  badgeAr: string | null;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  buttonTextEn: string;
  buttonTextAr: string;
  buttonLink: string;
  image: string | null;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
};

interface CTASectionClientProps {
  cta: CTASection;
  locale: string;
}

export default function CTASectionClient({
  cta,
  locale,
}: CTASectionClientProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    badgeEn: cta.badgeEn || "",
    badgeAr: cta.badgeAr || "",
    titleEn: cta.titleEn,
    titleAr: cta.titleAr,
    descriptionEn: cta.descriptionEn,
    descriptionAr: cta.descriptionAr,
    buttonTextEn: cta.buttonTextEn,
    buttonTextAr: cta.buttonTextAr,
    buttonLink: cta.buttonLink,
    image: cta.image || "",
    published: cta.published,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`/${locale}/api/admin/cta-section`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          image: formData.image || null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update CTA section");
      }

      setSuccess("CTA section updated successfully");
      router.refresh();
    } catch (error) {
      console.error("Error updating CTA section:", error);
      setError(
        error instanceof Error ? error.message : "Failed to update CTA section",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Preview Card */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-bold mb-4">Current CTA Preview</h2>
        <div className="border rounded-lg p-8 bg-gradient-to-r from-blue-50 to-purple-50">
          {formData.image && (
            <div className="relative w-full h-48 mb-6 rounded-lg overflow-hidden">
              <Image
                src={formData.image}
                alt="CTA Background"
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-block px-4 py-1 bg-blue-600 text-white text-sm font-semibold rounded-full mb-4">
              {formData.badgeEn}
            </span>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              {formData.titleEn}
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              {formData.descriptionEn}
            </p>
            <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
              {formData.buttonTextEn}
            </button>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span
            className={`px-3 py-1 text-sm font-semibold rounded-full ${
              formData.published
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {formData.published ? "Published" : "Draft"}
          </span>
          <span className="text-sm text-gray-500">
            Last updated: {new Date(cta.updatedAt).toLocaleString()}
          </span>
        </div>
      </div>

      {/* Edit Form */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Edit CTA Section</h2>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800">{success}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Badge Fields */}
          <div className="border-b pb-6">
            <h3 className="text-lg font-semibold mb-4">Badge Text</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Badge (English) *
                </label>
                <input
                  type="text"
                  value={formData.badgeEn}
                  onChange={(e) =>
                    setFormData({ ...formData, badgeEn: e.target.value })
                  }
                  required
                  placeholder="Get Started"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Badge (Arabic) *
                </label>
                <input
                  type="text"
                  value={formData.badgeAr}
                  onChange={(e) =>
                    setFormData({ ...formData, badgeAr: e.target.value })
                  }
                  required
                  dir="rtl"
                  placeholder="ابدأ الآن"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Title Fields */}
          <div className="border-b pb-6">
            <h3 className="text-lg font-semibold mb-4">Title</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title (English) *
                </label>
                <input
                  type="text"
                  value={formData.titleEn}
                  onChange={(e) =>
                    setFormData({ ...formData, titleEn: e.target.value })
                  }
                  required
                  placeholder="Ready to Transform Your Space?"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title (Arabic) *
                </label>
                <input
                  type="text"
                  value={formData.titleAr}
                  onChange={(e) =>
                    setFormData({ ...formData, titleAr: e.target.value })
                  }
                  required
                  dir="rtl"
                  placeholder="هل أنت مستعد لتحويل مساحتك؟"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Description Fields */}
          <div className="border-b pb-6">
            <h3 className="text-lg font-semibold mb-4">Description</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description (English) *
                </label>
                <textarea
                  value={formData.descriptionEn}
                  onChange={(e) =>
                    setFormData({ ...formData, descriptionEn: e.target.value })
                  }
                  required
                  rows={4}
                  placeholder="Contact us today to discuss your project..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description (Arabic) *
                </label>
                <textarea
                  value={formData.descriptionAr}
                  onChange={(e) =>
                    setFormData({ ...formData, descriptionAr: e.target.value })
                  }
                  required
                  rows={4}
                  dir="rtl"
                  placeholder="اتصل بنا اليوم لمناقشة مشروعك..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Button Fields */}
          <div className="border-b pb-6">
            <h3 className="text-lg font-semibold mb-4">Button</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Button Text (English) *
                </label>
                <input
                  type="text"
                  value={formData.buttonTextEn}
                  onChange={(e) =>
                    setFormData({ ...formData, buttonTextEn: e.target.value })
                  }
                  required
                  placeholder="Contact Us"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Button Text (Arabic) *
                </label>
                <input
                  type="text"
                  value={formData.buttonTextAr}
                  onChange={(e) =>
                    setFormData({ ...formData, buttonTextAr: e.target.value })
                  }
                  required
                  dir="rtl"
                  placeholder="اتصل بنا"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Button Link *
                </label>
                <input
                  type="text"
                  value={formData.buttonLink}
                  onChange={(e) =>
                    setFormData({ ...formData, buttonLink: e.target.value })
                  }
                  required
                  placeholder="/contact"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Background Image */}
          <div className="border-b pb-6">
            <h3 className="text-lg font-semibold mb-4">Background Image</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL (Optional)
              </label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                placeholder="/images/cta-background.jpg"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              {formData.image && (
                <div className="mt-4 relative w-full h-48 border rounded">
                  <Image
                    src={formData.image}
                    alt="CTA Background"
                    fill
                    className="object-cover rounded"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Published Toggle */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="published"
              checked={formData.published}
              onChange={(e) =>
                setFormData({ ...formData, published: e.target.checked })
              }
              className="w-4 h-4 text-blue-600 border-gray-300 rounded"
            />
            <label htmlFor="published" className="ml-2 text-sm text-gray-700">
              Published (show CTA section on website)
            </label>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
            >
              {loading ? "Saving..." : "Update CTA Section"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
