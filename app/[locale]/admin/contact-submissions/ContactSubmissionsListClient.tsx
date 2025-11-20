"use client";

import { ContactSubmission } from "@prisma/client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface ContactSubmissionsListClientProps {
  submissions: ContactSubmission[];
  locale: string;
}

export default function ContactSubmissionsListClient({
  submissions,
  locale,
}: ContactSubmissionsListClientProps) {
  const router = useRouter();
  const [filter, setFilter] = useState<"all" | "processed" | "unprocessed">(
    "all",
  );
  const [selectedSubmission, setSelectedSubmission] =
    useState<ContactSubmission | null>(null);
  const [processing, setProcessing] = useState<string | null>(null);

  const filteredSubmissions = submissions.filter((s) => {
    if (filter === "processed") return s.processed;
    if (filter === "unprocessed") return !s.processed;
    return true;
  });

  const handleMarkProcessed = async (id: string, processed: boolean) => {
    setProcessing(id);
    try {
      const response = await fetch(
        `/${locale}/api/admin/contact-submissions/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ processed }),
        },
      );

      if (!response.ok) throw new Error("Failed to update");

      router.refresh();
    } catch (error) {
      console.error("Error updating submission:", error);
      alert("Failed to update submission");
    } finally {
      setProcessing(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this submission?")) return;

    try {
      const response = await fetch(
        `/${locale}/api/admin/contact-submissions/${id}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) throw new Error("Failed to delete");

      router.refresh();
      setSelectedSubmission(null);
    } catch (error) {
      console.error("Error deleting submission:", error);
      alert("Failed to delete submission");
    }
  };

  if (submissions.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-600">No contact form submissions yet</p>
      </div>
    );
  }

  return (
    <div>
      {/* Filter Tabs */}
      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg ${
            filter === "all" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          All ({submissions.length})
        </button>
        <button
          onClick={() => setFilter("unprocessed")}
          className={`px-4 py-2 rounded-lg ${
            filter === "unprocessed"
              ? "bg-orange-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Unprocessed ({submissions.filter((s) => !s.processed).length})
        </button>
        <button
          onClick={() => setFilter("processed")}
          className={`px-4 py-2 rounded-lg ${
            filter === "processed" ? "bg-green-600 text-white" : "bg-gray-200"
          }`}
        >
          Processed ({submissions.filter((s) => s.processed).length})
        </button>
      </div>

      {/* Submissions List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredSubmissions.map((submission) => (
              <tr
                key={submission.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedSubmission(submission)}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(submission.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {submission.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {submission.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {submission.phone || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      submission.processed
                        ? "bg-green-100 text-green-800"
                        : "bg-orange-100 text-orange-800"
                    }`}
                  >
                    {submission.processed ? "Processed" : "New"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMarkProcessed(submission.id, !submission.processed);
                    }}
                    disabled={processing === submission.id}
                    className="text-blue-600 hover:text-blue-900 mr-4 disabled:text-gray-400"
                  >
                    {processing === submission.id
                      ? "Processing..."
                      : submission.processed
                        ? "Mark Unprocessed"
                        : "Mark Processed"}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(submission.id);
                    }}
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

      {/* Detail Modal */}
      {selectedSubmission && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setSelectedSubmission(null)}
        >
          <div
            className="bg-white p-8 rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold">Contact Submission Details</h2>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date Submitted
                </label>
                <p className="text-gray-900">
                  {new Date(selectedSubmission.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <p className="text-gray-900">{selectedSubmission.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <p className="text-gray-900">
                    <a
                      href={`mailto:${selectedSubmission.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {selectedSubmission.email}
                    </a>
                  </p>
                </div>
              </div>

              {selectedSubmission.phone && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <p className="text-gray-900">
                    <a
                      href={`tel:${selectedSubmission.phone}`}
                      className="text-blue-600 hover:underline"
                    >
                      {selectedSubmission.phone}
                    </a>
                  </p>
                </div>
              )}

              {selectedSubmission.company && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company
                  </label>
                  <p className="text-gray-900">{selectedSubmission.company}</p>
                </div>
              )}

              {selectedSubmission.subject && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <p className="text-gray-900">{selectedSubmission.subject}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <p className="text-gray-900 whitespace-pre-wrap bg-gray-50 p-4 rounded-lg">
                  {selectedSubmission.message}
                </p>
              </div>

              {selectedSubmission.notes && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Internal Notes
                  </label>
                  <p className="text-gray-900 bg-yellow-50 p-4 rounded-lg">
                    {selectedSubmission.notes}
                  </p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <span
                  className={`px-3 py-1 text-sm rounded-full ${
                    selectedSubmission.processed
                      ? "bg-green-100 text-green-800"
                      : "bg-orange-100 text-orange-800"
                  }`}
                >
                  {selectedSubmission.processed ? "Processed" : "Unprocessed"}
                </span>
              </div>
            </div>

            <div className="mt-6 flex gap-4">
              <button
                onClick={() => {
                  handleMarkProcessed(
                    selectedSubmission.id,
                    !selectedSubmission.processed,
                  );
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {selectedSubmission.processed
                  ? "Mark as Unprocessed"
                  : "Mark as Processed"}
              </button>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
