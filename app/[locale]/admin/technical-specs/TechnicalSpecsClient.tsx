"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type TechnicalSpec = {
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  icon: string;
  category: string;
  order: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
};

interface TechnicalSpecsClientProps {
  specs: TechnicalSpec[];
  categories: string[];
  locale: string;
}

export default function TechnicalSpecsClient({
  specs,
  categories,
  locale,
}: TechnicalSpecsClientProps) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const [formData, setFormData] = useState({
    titleEn: "",
    titleAr: "",
    descriptionEn: "",
    descriptionAr: "",
    icon: "",
    category: "",
    order: 0,
    published: true,
  });

  const resetForm = () => {
    setFormData({
      titleEn: "",
      titleAr: "",
      descriptionEn: "",
      descriptionAr: "",
      icon: "",
      category: "",
      order: 0,
      published: true,
    });
    setEditingId(null);
    setShowForm(false);
    setError("");
    setSuccess("");
  };

  const handleEdit = (spec: TechnicalSpec) => {
    setFormData({
      titleEn: spec.titleEn,
      titleAr: spec.titleAr,
      descriptionEn: spec.descriptionEn,
      descriptionAr: spec.descriptionAr,
      icon: spec.icon,
      category: spec.category,
      order: spec.order,
      published: spec.published,
    });
    setEditingId(spec.id);
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
        ? `/${locale}/api/admin/technical-specs/${editingId}`
        : `/${locale}/api/admin/technical-specs`;
      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save spec");
      }

      setSuccess(
        editingId ? "Spec updated successfully" : "Spec created successfully",
      );
      resetForm();
      router.refresh();
    } catch (error) {
      console.error("Error saving spec:", error);
      setError(error instanceof Error ? error.message : "Failed to save spec");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    try {
      const response = await fetch(
        `/${locale}/api/admin/technical-specs/${id}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete spec");
      }

      router.refresh();
    } catch (error) {
      console.error("Error deleting spec:", error);
      alert("Failed to delete spec");
    }
  };

  const filteredSpecs =
    filterCategory === "all"
      ? specs
      : specs.filter((s) => s.category === filterCategory);

  const publishedCount = specs.filter((s) => s.published).length;
  const draftCount = specs.filter((s) => !s.published).length;

  return (
    <div>
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-sm text-gray-600 mb-1">Total Specs</div>
          <div className="text-3xl font-bold">{specs.length}</div>
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
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-sm text-gray-600 mb-1">Categories</div>
          <div className="text-3xl font-bold text-blue-600">
            {categories.length}
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-6 flex gap-2 flex-wrap">
        <button
          onClick={() => setFilterCategory("all")}
          className={`px-4 py-2 rounded-lg ${
            filterCategory === "all"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 border"
          }`}
        >
          All ({specs.length})
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-4 py-2 rounded-lg ${
              filterCategory === cat
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border"
            }`}
          >
            {cat} ({specs.filter((s) => s.category === cat).length})
          </button>
        ))}
      </div>

      {/* Add/Edit Form */}
      {showForm ? (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-bold mb-4">
            {editingId ? "Edit Spec" : "Add New Spec"}
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
                  Title (English) *
                </label>
                <input
                  type="text"
                  value={formData.titleEn}
                  onChange={(e) =>
                    setFormData({ ...formData, titleEn: e.target.value })
                  }
                  required
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

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
                  rows={3}
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
                  rows={3}
                  dir="rtl"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Icon *
                </label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) =>
                    setFormData({ ...formData, icon: e.target.value })
                  }
                  required
                  placeholder="/icons/feature.svg or icon-name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  required
                  placeholder="Design, Technology, etc."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
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
          + Add New Spec
        </button>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800">{success}</p>
        </div>
      )}

      {/* Specs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSpecs.map((spec) => (
          <div key={spec.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="text-4xl">
                {spec.icon.startsWith("/") ? "🔧" : spec.icon}
              </div>
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  spec.published
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {spec.published ? "Published" : "Draft"}
              </span>
            </div>

            <h3 className="font-bold text-gray-900 mb-1">{spec.titleEn}</h3>
            <p className="text-sm text-gray-600 mb-2" dir="rtl">
              {spec.titleAr}
            </p>
            <p className="text-sm text-gray-500 mb-3 line-clamp-2">
              {spec.descriptionEn}
            </p>

            <div className="flex items-center justify-between mb-3 text-xs text-gray-500">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
                {spec.category}
              </span>
              <span>Order: {spec.order}</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(spec)}
                className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(spec.id, spec.titleEn)}
                className="flex-1 px-3 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredSpecs.length === 0 && !showForm && (
        <div className="text-center py-12 text-gray-500">
          {filterCategory === "all"
            ? 'No specs yet. Click "Add New Spec" to create one.'
            : `No specs in "${filterCategory}" category.`}
        </div>
      )}
    </div>
  );
}
