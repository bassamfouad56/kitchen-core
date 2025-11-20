"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Credential = {
  id: string;
  titleEn: string;
  titleAr: string;
  issuer: string;
  image: string | null;
  descriptionEn: string | null;
  descriptionAr: string | null;
  year: string | null;
  order: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
};

interface CredentialsClientProps {
  credentials: Credential[];
  locale: string;
}

export default function CredentialsClient({
  credentials,
  locale,
}: CredentialsClientProps) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    titleEn: "",
    titleAr: "",
    issuer: "",
    image: "",
    descriptionEn: "",
    descriptionAr: "",
    year: new Date().getFullYear().toString(),
    order: 0,
    published: true,
  });

  const resetForm = () => {
    setFormData({
      titleEn: "",
      titleAr: "",
      issuer: "",
      image: "",
      descriptionEn: "",
      descriptionAr: "",
      year: new Date().getFullYear().toString(),
      order: 0,
      published: true,
    });
    setEditingId(null);
    setShowForm(false);
    setError("");
    setSuccess("");
  };

  const handleEdit = (credential: Credential) => {
    setFormData({
      titleEn: credential.titleEn,
      titleAr: credential.titleAr,
      issuer: credential.issuer,
      image: credential.image || "",
      descriptionEn: credential.descriptionEn || "",
      descriptionAr: credential.descriptionAr || "",
      year: credential.year || new Date().getFullYear().toString(),
      order: credential.order,
      published: credential.published,
    });
    setEditingId(credential.id);
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
        ? `/${locale}/api/admin/credentials/${editingId}`
        : `/${locale}/api/admin/credentials`;
      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          image: formData.image || null,
          descriptionEn: formData.descriptionEn || null,
          descriptionAr: formData.descriptionAr || null,
          year: formData.year || null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save credential");
      }

      setSuccess(
        editingId
          ? "Credential updated successfully"
          : "Credential created successfully",
      );
      resetForm();
      router.refresh();
    } catch (error) {
      console.error("Error saving credential:", error);
      setError(
        error instanceof Error ? error.message : "Failed to save credential",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/${locale}/api/admin/credentials/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete credential");
      }

      router.refresh();
    } catch (error) {
      console.error("Error deleting credential:", error);
      alert("Failed to delete credential");
    }
  };

  const publishedCount = credentials.filter((c) => c.published).length;
  const draftCount = credentials.filter((c) => !c.published).length;

  return (
    <div>
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-sm text-gray-600 mb-1">Total Credentials</div>
          <div className="text-3xl font-bold">{credentials.length}</div>
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
            {editingId ? "Edit Credential" : "Add New Credential"}
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
                  placeholder="Certified Professional Engineer"
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
                  placeholder="مهندس محترف معتمد"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Issuer *
                </label>
                <input
                  type="text"
                  value={formData.issuer}
                  onChange={(e) =>
                    setFormData({ ...formData, issuer: e.target.value })
                  }
                  required
                  placeholder="Professional Engineering Association"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year
                </label>
                <input
                  type="number"
                  value={formData.year}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      year:
                        e.target.value || new Date().getFullYear().toString(),
                    })
                  }
                  min="1900"
                  max={new Date().getFullYear() + 1}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL
              </label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                placeholder="/images/credentials/cert-badge.png"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              {formData.image && (
                <div className="mt-2 relative w-32 h-32 border rounded">
                  <Image
                    src={formData.image}
                    alt="Preview"
                    fill
                    className="object-cover rounded"
                  />
                </div>
              )}
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
                  placeholder="Additional details about this credential..."
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
                  placeholder="تفاصيل إضافية حول هذا الاعتماد..."
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
          + Add New Credential
        </button>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800">{success}</p>
        </div>
      )}

      {/* Credentials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {credentials.map((credential) => (
          <div key={credential.id} className="bg-white rounded-lg shadow p-6">
            {credential.image && (
              <div className="relative w-full h-32 mb-4 bg-gray-100 rounded">
                <Image
                  src={credential.image}
                  alt={credential.titleEn}
                  fill
                  className="object-contain rounded"
                />
              </div>
            )}

            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-1">
                  {credential.titleEn}
                </h3>
                <p className="text-sm text-gray-600 mb-2" dir="rtl">
                  {credential.titleAr}
                </p>
              </div>
              <span
                className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${
                  credential.published
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {credential.published ? "Published" : "Draft"}
              </span>
            </div>

            <div className="mb-3">
              <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded">
                {credential.issuer}
              </span>
              {credential.year && (
                <span className="ml-2 text-sm text-gray-500">
                  {credential.year}
                </span>
              )}
            </div>

            {credential.descriptionEn && (
              <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                {credential.descriptionEn}
              </p>
            )}

            <div className="flex items-center justify-between mb-3 text-xs text-gray-500">
              <span>Order: {credential.order}</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(credential)}
                className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(credential.id, credential.titleEn)}
                className="flex-1 px-3 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {credentials.length === 0 && !showForm && (
        <div className="text-center py-12 text-gray-500">
          No credentials yet. Click &quot;Add New Credential&quot; to create
          one.
        </div>
      )}
    </div>
  );
}
