"use client";

import { ProcessStep } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProcessStepsListClientProps {
  processSteps: ProcessStep[];
  locale: string;
}

export default function ProcessStepsListClient({
  processSteps,
  locale,
}: ProcessStepsListClientProps) {
  const router = useRouter();
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this process step?")) {
      return;
    }

    setDeleting(id);
    try {
      const response = await fetch(`/${locale}/api/admin/process-steps/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete");

      router.refresh();
    } catch (error) {
      console.error("Error deleting process step:", error);
      alert("Failed to delete process step");
    } finally {
      setDeleting(null);
    }
  };

  if (processSteps.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-600 mb-4">No process steps found</p>
        <a
          href={`/${locale}/admin/process-steps/new`}
          className="text-blue-600 hover:underline"
        >
          Create your first process step
        </a>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Order
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Number
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Title (EN)
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Title (AR)
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Duration
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
          {processSteps.map((step) => (
            <tr key={step.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {step.order}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {step.number}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {step.titleEn}
              </td>
              <td
                className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                dir="rtl"
              >
                {step.titleAr}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {step.duration}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    step.published
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {step.published ? "Published" : "Draft"}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <a
                  href={`/${locale}/admin/process-steps/${step.id}`}
                  className="text-blue-600 hover:text-blue-900 mr-4"
                >
                  Edit
                </a>
                <button
                  onClick={() => handleDelete(step.id)}
                  disabled={deleting === step.id}
                  className="text-red-600 hover:text-red-900 disabled:text-gray-400"
                >
                  {deleting === step.id ? "Deleting..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
