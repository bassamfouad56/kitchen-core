"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

import { Prisma } from "@prisma/client";

type Subscriber = {
  id: string;
  email: string;
  name: string | null;
  preferences: Prisma.JsonValue;
  verified: boolean;
  verifyToken: string | null;
  unsubscribeToken: string;
  createdAt: Date;
  updatedAt: Date;
};

interface SubscribersClientProps {
  subscribers: Subscriber[];
  locale: string;
}

export default function SubscribersClient({
  subscribers,
  locale,
}: SubscribersClientProps) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [filterVerified, setFilterVerified] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    verified: false,
  });

  const resetForm = () => {
    setFormData({
      email: "",
      name: "",
      verified: false,
    });
    setEditingId(null);
    setShowForm(false);
    setError("");
    setSuccess("");
  };

  const handleEdit = (subscriber: Subscriber) => {
    setFormData({
      email: subscriber.email,
      name: subscriber.name || "",
      verified: subscriber.verified,
    });
    setEditingId(subscriber.id);
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
        ? `/${locale}/api/admin/subscribers/${editingId}`
        : `/${locale}/api/admin/subscribers`;
      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          name: formData.name || null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save subscriber");
      }

      setSuccess(
        editingId
          ? "Subscriber updated successfully"
          : "Subscriber created successfully",
      );
      resetForm();
      router.refresh();
    } catch (error) {
      console.error("Error saving subscriber:", error);
      setError(
        error instanceof Error ? error.message : "Failed to save subscriber",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, email: string) => {
    if (!confirm(`Are you sure you want to delete "${email}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/${locale}/api/admin/subscribers/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete subscriber");
      }

      router.refresh();
    } catch (error) {
      console.error("Error deleting subscriber:", error);
      alert("Failed to delete subscriber");
    }
  };

  // Filter and search subscribers
  const filteredSubscribers = useMemo(() => {
    return subscribers.filter((sub) => {
      const matchesVerified =
        filterVerified === "all" ||
        (filterVerified === "verified" && sub.verified) ||
        (filterVerified === "unverified" && !sub.verified);
      const matchesSearch =
        searchTerm === "" ||
        sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (sub.name && sub.name.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesVerified && matchesSearch;
    });
  }, [subscribers, filterVerified, searchTerm]);

  const verifiedCount = subscribers.filter((s) => s.verified).length;
  const unverifiedCount = subscribers.filter((s) => !s.verified).length;

  return (
    <div>
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-sm text-gray-600 mb-1">Total Subscribers</div>
          <div className="text-3xl font-bold">{subscribers.length}</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-sm text-gray-600 mb-1">Verified</div>
          <div className="text-3xl font-bold text-green-600">
            {verifiedCount}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-sm text-gray-600 mb-1">Unverified</div>
          <div className="text-3xl font-bold text-gray-600">
            {unverifiedCount}
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by email or name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
        />
        <div className="flex gap-2">
          <button
            onClick={() => setFilterVerified("all")}
            className={`px-4 py-2 rounded-lg ${
              filterVerified === "all"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border"
            }`}
          >
            All ({subscribers.length})
          </button>
          <button
            onClick={() => setFilterVerified("verified")}
            className={`px-4 py-2 rounded-lg ${
              filterVerified === "verified"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border"
            }`}
          >
            Verified ({verifiedCount})
          </button>
          <button
            onClick={() => setFilterVerified("unverified")}
            className={`px-4 py-2 rounded-lg ${
              filterVerified === "unverified"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border"
            }`}
          >
            Unverified ({unverifiedCount})
          </button>
        </div>
      </div>

      {/* Add/Edit Form */}
      {showForm ? (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-bold mb-4">
            {editingId ? "Edit Subscriber" : "Add New Subscriber"}
          </h2>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                placeholder="subscriber@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="John Doe"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="verified"
                checked={formData.verified}
                onChange={(e) =>
                  setFormData({ ...formData, verified: e.target.checked })
                }
                className="w-4 h-4 text-blue-600 border-gray-300 rounded"
              />
              <label htmlFor="verified" className="ml-2 text-sm text-gray-700">
                Verified
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
          + Add New Subscriber
        </button>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800">{success}</p>
        </div>
      )}

      {/* Subscribers Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subscribed At
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredSubscribers.map((subscriber) => (
              <tr key={subscriber.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {subscriber.email}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {subscriber.name || "-"}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      subscriber.verified
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {subscriber.verified ? "Verified" : "Unverified"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(subscriber.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEdit(subscriber)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      handleDelete(subscriber.id, subscriber.email)
                    }
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredSubscribers.length === 0 && !showForm && (
        <div className="text-center py-12 text-gray-500">
          {searchTerm || filterVerified !== "all"
            ? "No subscribers match your filters."
            : 'No subscribers yet. Click "Add New Subscriber" to create one.'}
        </div>
      )}
    </div>
  );
}
