"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProcessStep } from "@prisma/client";

interface EditProcessStepClientProps {
  processStep: ProcessStep;
  locale: string;
}

export default function EditProcessStepClient({
  processStep,
  locale,
}: EditProcessStepClientProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    number: processStep.number,
    titleEn: processStep.titleEn,
    titleAr: processStep.titleAr,
    descriptionEn: processStep.descriptionEn,
    descriptionAr: processStep.descriptionAr,
    duration: processStep.duration,
    iconName: processStep.iconName,
    order: processStep.order,
    published: processStep.published,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `/${locale}/api/admin/process-steps/${processStep.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );

      if (!response.ok) throw new Error("Failed to update");

      router.push(`/${locale}/admin/process-steps`);
      router.refresh();
    } catch (error) {
      console.error("Error updating process step:", error);
      alert("Failed to update process step");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string | number | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
      {/* Number & Order */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Step Number & Order</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Step Number
            </label>
            <input
              type="text"
              value={formData.number}
              onChange={(e) => handleChange("number", e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Display Order
            </label>
            <input
              type="number"
              value={formData.order}
              onChange={(e) => handleChange("order", parseInt(e.target.value))}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Step Title</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Title (English)
            </label>
            <input
              type="text"
              value={formData.titleEn}
              onChange={(e) => handleChange("titleEn", e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
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
              dir="rtl"
              required
            />
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
              dir="rtl"
              required
            />
          </div>
        </div>
      </div>

      {/* Duration & Icon */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Duration & Icon</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Duration</label>
            <input
              type="text"
              value={formData.duration}
              onChange={(e) => handleChange("duration", e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Icon Name</label>
            <input
              type="text"
              value={formData.iconName}
              onChange={(e) => handleChange("iconName", e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
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
          {loading ? "Updating..." : "Update Process Step"}
        </button>
        <button
          type="button"
          onClick={() => router.push(`/${locale}/admin/process-steps`)}
          className="px-6 py-3 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
