"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HeroSection } from "@prisma/client";

interface HeroSectionClientProps {
  heroSection: HeroSection | null;
  locale: string;
}

export default function HeroSectionClient({
  heroSection,
  locale,
}: HeroSectionClientProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    badgeEn: heroSection?.badgeEn || "",
    badgeAr: heroSection?.badgeAr || "",
    titleEn: heroSection?.titleEn || "",
    titleAr: heroSection?.titleAr || "",
    titleHighlightEn: heroSection?.titleHighlightEn || "",
    titleHighlightAr: heroSection?.titleHighlightAr || "",
    descriptionEn: heroSection?.descriptionEn || "",
    descriptionAr: heroSection?.descriptionAr || "",
    backgroundImage: heroSection?.backgroundImage || "",
    cta1TextEn: heroSection?.cta1TextEn || "",
    cta1TextAr: heroSection?.cta1TextAr || "",
    cta1Link: heroSection?.cta1Link || "",
    cta2TextEn: heroSection?.cta2TextEn || "",
    cta2TextAr: heroSection?.cta2TextAr || "",
    cta2Link: heroSection?.cta2Link || "",
    published: heroSection?.published ?? true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/${locale}/api/admin/hero`, {
        method: heroSection ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          id: heroSection?.id,
        }),
      });

      if (!response.ok) throw new Error("Failed to save");

      router.refresh();
      alert("Hero section saved successfully!");
    } catch (error) {
      console.error("Error saving hero section:", error);
      alert("Failed to save hero section");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl space-y-8">
      {/* Badge Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">
          Badge (Small text above title)
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Badge (English)
            </label>
            <input
              type="text"
              value={formData.badgeEn}
              onChange={(e) => handleChange("badgeEn", e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="e.g., LUXURY KITCHENS"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Badge (Arabic)
            </label>
            <input
              type="text"
              value={formData.badgeAr}
              onChange={(e) => handleChange("badgeAr", e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-right"
              placeholder="مطابخ فاخرة"
              dir="rtl"
              required
            />
          </div>
        </div>
      </div>

      {/* Title Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Main Title</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Title (English)
            </label>
            <input
              type="text"
              value={formData.titleEn}
              onChange={(e) => handleChange("titleEn", e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="e.g., Crafting Dreams Into"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Title (Arabic)
            </label>
            <input
              type="text"
              value={formData.titleAr}
              onChange={(e) => handleChange("titleAr", e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-right"
              placeholder="نحول الأحلام إلى"
              dir="rtl"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Highlighted Word (English)
            </label>
            <input
              type="text"
              value={formData.titleHighlightEn}
              onChange={(e) => handleChange("titleHighlightEn", e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="e.g., Reality"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              This word will be highlighted in green
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Highlighted Word (Arabic)
            </label>
            <input
              type="text"
              value={formData.titleHighlightAr}
              onChange={(e) => handleChange("titleHighlightAr", e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-right"
              placeholder="واقع"
              dir="rtl"
              required
            />
            <p className="text-xs text-gray-500 mt-1 text-right">
              ستظهر هذه الكلمة باللون الأخضر
            </p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Description</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Description (English)
            </label>
            <textarea
              value={formData.descriptionEn}
              onChange={(e) => handleChange("descriptionEn", e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              rows={4}
              placeholder="Subtitle/description text..."
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Description (Arabic)
            </label>
            <textarea
              value={formData.descriptionAr}
              onChange={(e) => handleChange("descriptionAr", e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-right"
              rows={4}
              placeholder="النص الفرعي..."
              dir="rtl"
              required
            />
          </div>
        </div>
      </div>

      {/* Background Image */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Background Image</h2>
        <div>
          <label className="block text-sm font-medium mb-2">Image URL</label>
          <input
            type="text"
            value={formData.backgroundImage}
            onChange={(e) => handleChange("backgroundImage", e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="/hero-background.jpg"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Enter the path to the background image (e.g., /hero-bg.jpg)
          </p>
        </div>
      </div>

      {/* Call-to-Action Buttons */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Call-to-Action Buttons</h2>

        {/* CTA 1 */}
        <div className="mb-6 pb-6 border-b">
          <h3 className="font-medium mb-3">Primary Button (CTA 1)</h3>
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <label className="block text-sm font-medium mb-2">
                Button Text (English)
              </label>
              <input
                type="text"
                value={formData.cta1TextEn}
                onChange={(e) => handleChange("cta1TextEn", e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="e.g., VIEW PORTFOLIO"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Button Text (Arabic)
              </label>
              <input
                type="text"
                value={formData.cta1TextAr}
                onChange={(e) => handleChange("cta1TextAr", e.target.value)}
                className="w-full px-4 py-2 border rounded-lg text-right"
                placeholder="عرض المعرض"
                dir="rtl"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Button Link
            </label>
            <input
              type="text"
              value={formData.cta1Link}
              onChange={(e) => handleChange("cta1Link", e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="/projects"
              required
            />
          </div>
        </div>

        {/* CTA 2 */}
        <div>
          <h3 className="font-medium mb-3">Secondary Button (CTA 2)</h3>
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <label className="block text-sm font-medium mb-2">
                Button Text (English)
              </label>
              <input
                type="text"
                value={formData.cta2TextEn}
                onChange={(e) => handleChange("cta2TextEn", e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="e.g., GET CONSULTATION"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Button Text (Arabic)
              </label>
              <input
                type="text"
                value={formData.cta2TextAr}
                onChange={(e) => handleChange("cta2TextAr", e.target.value)}
                className="w-full px-4 py-2 border rounded-lg text-right"
                placeholder="احصل على استشارة"
                dir="rtl"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Button Link
            </label>
            <input
              type="text"
              value={formData.cta2Link}
              onChange={(e) => handleChange("cta2Link", e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="#contact"
              required
            />
          </div>
        </div>
      </div>

      {/* Published Status */}
      <div className="bg-white p-6 rounded-lg shadow">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.published}
            onChange={(e) => handleChange("published", e.target.checked)}
            className="mr-2"
          />
          <span className="font-medium">Published (visible on website)</span>
        </label>
      </div>

      {/* Submit Button */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading
            ? "Saving..."
            : heroSection
              ? "Update Hero Section"
              : "Create Hero Section"}
        </button>
        <button
          type="button"
          onClick={() => router.push(`/${locale}/admin`)}
          className="px-6 py-3 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
