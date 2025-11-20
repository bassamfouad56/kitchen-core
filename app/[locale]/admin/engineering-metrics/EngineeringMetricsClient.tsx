"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type EngineeringMetric = {
  id: string;
  number: string;
  labelEn: string;
  labelAr: string;
  descriptionEn: string | null;
  descriptionAr: string | null;
  icon: string | null;
  order: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
};

interface EngineeringMetricsClientProps {
  metrics: EngineeringMetric[];
  locale: string;
}

export default function EngineeringMetricsClient({
  metrics,
  locale,
}: EngineeringMetricsClientProps) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    number: "",
    labelEn: "",
    labelAr: "",
    descriptionEn: "",
    descriptionAr: "",
    icon: "",
    order: 0,
    published: true,
  });

  const resetForm = () => {
    setFormData({
      number: "",
      labelEn: "",
      labelAr: "",
      descriptionEn: "",
      descriptionAr: "",
      icon: "",
      order: 0,
      published: true,
    });
    setEditingId(null);
    setShowForm(false);
    setError("");
    setSuccess("");
  };

  const handleEdit = (metric: EngineeringMetric) => {
    setFormData({
      number: metric.number,
      labelEn: metric.labelEn,
      labelAr: metric.labelAr,
      descriptionEn: metric.descriptionEn || "",
      descriptionAr: metric.descriptionAr || "",
      icon: metric.icon || "",
      order: metric.order,
      published: metric.published,
    });
    setEditingId(metric.id);
    setShowForm(true);
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const url = editingId
        ? `/${locale}/api/admin/engineering-metrics/${editingId}`
        : `/${locale}/api/admin/engineering-metrics`;
      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          descriptionEn: formData.descriptionEn || null,
          descriptionAr: formData.descriptionAr || null,
          icon: formData.icon || null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save metric");
      }

      setSuccess(
        editingId
          ? "Metric updated successfully"
          : "Metric created successfully",
      );
      resetForm();
      router.refresh();
    } catch (error) {
      console.error("Error saving metric:", error);
      setError(
        error instanceof Error ? error.message : "Failed to save metric",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, label: string) => {
    if (!confirm(`Are you sure you want to delete "${label}"?`)) {
      return;
    }

    try {
      const response = await fetch(
        `/${locale}/api/admin/engineering-metrics/${id}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete metric");
      }

      router.refresh();
    } catch (error) {
      console.error("Error deleting metric:", error);
      alert("Failed to delete metric");
    }
  };

  const publishedCount = metrics.filter((m) => m.published).length;
  const draftCount = metrics.filter((m) => !m.published).length;

  return (
    <div>
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-sm text-gray-600 mb-1">Total Metrics</div>
          <div className="text-3xl font-bold">{metrics.length}</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-sm text-gray-600 mb-1">Published</div>
          <div className="text-3xl font-bold text-green-600">
            {publishedCount}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-sm text-gray-600 mb-1">Drafts</div>
          <div className="text-3xl font-bold text-gray-600">{draftCount}</div>
        </div>
      </div>

      {/* Add/Edit Form */}
      {showForm ? (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-bold mb-4">
            {editingId ? "Edit Metric" : "Add New Metric"}
          </h2>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number/Value *
                </label>
                <input
                  type="text"
                  value={formData.number}
                  onChange={(e) =>
                    setFormData({ ...formData, number: e.target.value })
                  }
                  required
                  placeholder="500+ or 99%"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Icon
                </label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) =>
                    setFormData({ ...formData, icon: e.target.value })
                  }
                  placeholder="📊 or icon-name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Label (English) *
                </label>
                <input
                  type="text"
                  value={formData.labelEn}
                  onChange={(e) =>
                    setFormData({ ...formData, labelEn: e.target.value })
                  }
                  required
                  placeholder="Projects Completed"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Label (Arabic) *
                </label>
                <input
                  type="text"
                  value={formData.labelAr}
                  onChange={(e) =>
                    setFormData({ ...formData, labelAr: e.target.value })
                  }
                  required
                  dir="rtl"
                  placeholder="المشاريع المنجزة"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description (English)
                </label>
                <textarea
                  value={formData.descriptionEn}
                  onChange={(e) =>
                    setFormData({ ...formData, descriptionEn: e.target.value })
                  }
                  rows={3}
                  placeholder="Additional context about this metric..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description (Arabic)
                </label>
                <textarea
                  value={formData.descriptionAr}
                  onChange={(e) =>
                    setFormData({ ...formData, descriptionAr: e.target.value })
                  }
                  rows={3}
                  dir="rtl"
                  placeholder="سياق إضافي حول هذا المقياس..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Display Order
              </label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    order: parseInt(e.target.value) || 0,
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

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
                Published
              </label>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
              >
                {loading ? "Saving..." : editingId ? "Update" : "Create"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="mb-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Add New Metric
        </button>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800">{success}</p>
        </div>
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric) => (
          <div key={metric.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {metric.icon && <div className="text-3xl">{metric.icon}</div>}
                <div className="text-4xl font-bold text-blue-600">
                  {metric.number}
                </div>
              </div>
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  metric.published
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {metric.published ? "Published" : "Draft"}
              </span>
            </div>

            <h3 className="font-bold text-gray-900 mb-1">{metric.labelEn}</h3>
            <p className="text-sm text-gray-600 mb-3" dir="rtl">
              {metric.labelAr}
            </p>

            {metric.descriptionEn && (
              <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                {metric.descriptionEn}
              </p>
            )}

            <div className="flex items-center justify-between mb-3 text-xs text-gray-500">
              <span>Order: {metric.order}</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(metric)}
                className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(metric.id, metric.labelEn)}
                className="flex-1 px-3 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {metrics.length === 0 && !showForm && (
        <div className="text-center py-12 text-gray-500">
          No metrics yet. Click &quot;Add New Metric&quot; to create one.
        </div>
      )}
    </div>
  );
}
