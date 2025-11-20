"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ImageUpload from "@/app/components/ImageUpload";

type BeforeAfterItem = {
  id: string;
  titleEn: string;
  titleAr: string;
  beforeImage: string;
  afterImage: string;
  descriptionEn: string | null;
  descriptionAr: string | null;
  order: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
};

interface BeforeAfterClientProps {
  items: BeforeAfterItem[];
  locale: string;
}

export default function BeforeAfterClient({
  items,
  locale,
}: BeforeAfterClientProps) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    titleEn: "",
    titleAr: "",
    beforeImage: "",
    afterImage: "",
    descriptionEn: "",
    descriptionAr: "",
    order: 0,
    published: true,
  });

  const resetForm = () => {
    setFormData({
      titleEn: "",
      titleAr: "",
      beforeImage: "",
      afterImage: "",
      descriptionEn: "",
      descriptionAr: "",
      order: 0,
      published: true,
    });
    setEditingId(null);
    setShowForm(false);
    setError("");
    setSuccess("");
  };

  const handleEdit = (item: BeforeAfterItem) => {
    setFormData({
      titleEn: item.titleEn,
      titleAr: item.titleAr,
      beforeImage: item.beforeImage,
      afterImage: item.afterImage,
      descriptionEn: item.descriptionEn || "",
      descriptionAr: item.descriptionAr || "",
      order: item.order,
      published: item.published,
    });
    setEditingId(item.id);
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
        ? `/${locale}/api/admin/before-after/${editingId}`
        : `/${locale}/api/admin/before-after`;
      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          descriptionEn: formData.descriptionEn || null,
          descriptionAr: formData.descriptionAr || null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save item");
      }

      setSuccess(
        editingId ? "Item updated successfully" : "Item created successfully",
      );
      resetForm();
      router.refresh();
    } catch (error) {
      console.error("Error saving item:", error);
      setError(error instanceof Error ? error.message : "Failed to save item");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/${locale}/api/admin/before-after/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete item");
      }

      router.refresh();
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete item");
    }
  };

  const publishedCount = items.filter((i) => i.published).length;
  const draftCount = items.filter((i) => !i.published).length;

  return (
    <div>
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-sm text-gray-600 mb-1">Total Items</div>
          <div className="text-3xl font-bold">{items.length}</div>
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
            {editingId ? "Edit Item" : "Add New Item"}
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
                <ImageUpload
                  label="Before Image *"
                  helperText="Upload the before transformation image"
                  value={formData.beforeImage}
                  onChange={(url) =>
                    setFormData({ ...formData, beforeImage: url })
                  }
                  onDelete={() => setFormData({ ...formData, beforeImage: "" })}
                  aspectRatio="4/3"
                  maxSize={10}
                />
              </div>

              <div>
                <ImageUpload
                  label="After Image *"
                  helperText="Upload the after transformation image"
                  value={formData.afterImage}
                  onChange={(url) =>
                    setFormData({ ...formData, afterImage: url })
                  }
                  onDelete={() => setFormData({ ...formData, afterImage: "" })}
                  aspectRatio="4/3"
                  maxSize={10}
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              <div className="flex items-center pt-8">
                <input
                  type="checkbox"
                  id="published"
                  checked={formData.published}
                  onChange={(e) =>
                    setFormData({ ...formData, published: e.target.checked })
                  }
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                />
                <label
                  htmlFor="published"
                  className="ml-2 text-sm text-gray-700"
                >
                  Published
                </label>
              </div>
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
          + Add New Item
        </button>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800">{success}</p>
        </div>
      )}

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow overflow-hidden"
          >
            <div className="grid grid-cols-2 gap-2 p-4">
              <div>
                <div className="text-xs text-gray-500 mb-1">Before</div>
                <div className="relative h-40 bg-gray-100 rounded">
                  <Image
                    src={item.beforeImage}
                    alt={`Before - ${item.titleEn}`}
                    fill
                    className="object-cover rounded"
                  />
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">After</div>
                <div className="relative h-40 bg-gray-100 rounded">
                  <Image
                    src={item.afterImage}
                    alt={`After - ${item.titleEn}`}
                    fill
                    className="object-cover rounded"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 border-t">
              <h3 className="font-bold text-gray-900 mb-1">{item.titleEn}</h3>
              <p className="text-sm text-gray-600 mb-2" dir="rtl">
                {item.titleAr}
              </p>

              {item.descriptionEn && (
                <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                  {item.descriptionEn}
                </p>
              )}

              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-gray-500">
                  Order: {item.order}
                </span>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    item.published
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {item.published ? "Published" : "Draft"}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id, item.titleEn)}
                  className="flex-1 px-3 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && !showForm && (
        <div className="text-center py-12 text-gray-500">
          No before/after items yet. Click "Add New Item" to create one.
        </div>
      )}
    </div>
  );
}
