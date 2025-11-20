"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

type Partnership = {
  id: string;
  nameEn: string;
  nameAr: string;
  logo: string | null;
  url: string | null;
  order: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
};

interface PartnershipsListClientProps {
  partnerships: Partnership[];
  locale: string;
}

export default function PartnershipsListClient({
  partnerships,
  locale,
}: PartnershipsListClientProps) {
  const router = useRouter();
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleDelete = async (partnershipId: string, partnerName: string) => {
    if (
      !confirm(`Are you sure you want to delete partnership: ${partnerName}?`)
    ) {
      return;
    }

    setDeleting(partnershipId);
    try {
      const response = await fetch(
        `/${locale}/api/admin/partnerships/${partnershipId}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to delete partnership");
      }

      router.refresh();
    } catch (error) {
      console.error("Error deleting partnership:", error);
      alert(
        error instanceof Error ? error.message : "Failed to delete partnership",
      );
    } finally {
      setDeleting(null);
    }
  };

  if (partnerships.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-600 mb-4">No brand partners yet</p>
        <Link
          href={`/${locale}/admin/partnerships/new`}
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Add First Partnership
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Create New Partnership Button */}
      <div className="mb-6">
        <Link
          href={`/${locale}/admin/partnerships/new`}
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Add New Partnership
        </Link>
      </div>

      {/* Partnerships Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {partnerships.map((partnership) => (
          <div
            key={partnership.id}
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            {/* Logo */}
            <div className="mb-4 h-32 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
              {partnership.logo ? (
                <Image
                  src={partnership.logo}
                  alt={partnership.nameEn}
                  width={200}
                  height={100}
                  className="max-h-full w-auto object-contain"
                />
              ) : (
                <div className="text-gray-400 text-sm">No logo</div>
              )}
            </div>

            {/* Info */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {partnership.nameEn}
              </h3>
              <p className="text-sm text-gray-600 mb-2" dir="rtl">
                {partnership.nameAr}
              </p>
              {partnership.url && (
                <a
                  href={partnership.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:underline truncate block"
                >
                  {partnership.url}
                </a>
              )}
            </div>

            {/* Metadata */}
            <div className="mb-4 flex gap-2 text-xs">
              <span
                className={`px-2 py-1 rounded-full ${
                  partnership.published
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {partnership.published ? "Published" : "Draft"}
              </span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                Order: {partnership.order}
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Link
                href={`/${locale}/admin/partnerships/${partnership.id}`}
                className="flex-1 px-4 py-2 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 text-sm"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(partnership.id, partnership.nameEn)}
                disabled={deleting === partnership.id}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm"
              >
                {deleting === partnership.id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Statistics */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600">Total Partnerships</div>
          <div className="text-2xl font-bold text-blue-800">
            {partnerships.length}
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600">Published</div>
          <div className="text-2xl font-bold text-green-800">
            {partnerships.filter((p) => p.published).length}
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600">Draft</div>
          <div className="text-2xl font-bold text-gray-800">
            {partnerships.filter((p) => !p.published).length}
          </div>
        </div>
      </div>
    </div>
  );
}
