"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Translation = {
  id: string;
  key: string;
  category: string;
  textEn: string;
  textAr: string;
  description: string | null;
  order: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
};

interface TranslationsListClientProps {
  translations: Translation[];
  categories: string[];
  locale: string;
}

export default function TranslationsListClient({
  translations,
  categories,
  locale,
}: TranslationsListClientProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [deleting, setDeleting] = useState<string | null>(null);

  // Filter and search translations
  const filteredTranslations = useMemo(() => {
    return translations.filter((translation) => {
      // Category filter
      if (
        selectedCategory !== "all" &&
        translation.category !== selectedCategory
      ) {
        return false;
      }

      // Search filter (key, textEn, textAr)
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          translation.key.toLowerCase().includes(query) ||
          translation.textEn.toLowerCase().includes(query) ||
          translation.textAr.toLowerCase().includes(query) ||
          translation.description?.toLowerCase().includes(query) ||
          false
        );
      }

      return true;
    });
  }, [translations, selectedCategory, searchQuery]);

  const handleDelete = async (
    translationId: string,
    translationKey: string,
  ) => {
    if (
      !confirm(
        `Are you sure you want to delete translation: ${translationKey}?`,
      )
    ) {
      return;
    }

    setDeleting(translationId);
    try {
      const response = await fetch(
        `/${locale}/api/admin/translations/${translationId}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to delete translation");
      }

      router.refresh();
    } catch (error) {
      console.error("Error deleting translation:", error);
      alert(
        error instanceof Error ? error.message : "Failed to delete translation",
      );
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div>
      {/* Controls */}
      <div className="mb-6 bg-white p-6 rounded-lg shadow space-y-4">
        {/* Search */}
        <div>
          <label
            htmlFor="search"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Search Translations
          </label>
          <input
            type="text"
            id="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by key, text, or description..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-lg text-sm ${
              selectedCategory === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            All ({translations.length})
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {category} (
              {translations.filter((t) => t.category === category).length})
            </button>
          ))}
        </div>

        {/* Create New Button */}
        <div>
          <Link
            href={`/${locale}/admin/translations/new`}
            className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            + Add New Translation
          </Link>
        </div>
      </div>

      {/* Results Summary */}
      <div className="mb-4 text-sm text-gray-600">
        Showing {filteredTranslations.length} of {translations.length}{" "}
        translations
        {searchQuery && ` matching "${searchQuery}"`}
        {selectedCategory !== "all" && ` in category "${selectedCategory}"`}
      </div>

      {/* Translations Table */}
      {filteredTranslations.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">
            {searchQuery || selectedCategory !== "all"
              ? "No translations match your search"
              : "No translations yet"}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Key
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  English Text
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Arabic Text
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTranslations.map((translation) => (
                <tr key={translation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-mono text-gray-900">
                      {translation.key}
                    </div>
                    {translation.description && (
                      <div className="text-xs text-gray-500 mt-1">
                        {translation.description}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                      {translation.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">
                      {translation.textEn}
                    </div>
                  </td>
                  <td className="px-6 py-4" dir="rtl">
                    <div className="text-sm text-gray-900 max-w-xs truncate">
                      {translation.textAr}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        translation.published
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {translation.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      href={`/${locale}/admin/translations/${translation.id}`}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() =>
                        handleDelete(translation.id, translation.key)
                      }
                      disabled={deleting === translation.id}
                      className="text-red-600 hover:text-red-900 disabled:text-gray-400"
                    >
                      {deleting === translation.id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Statistics */}
      <div className="mt-6 grid grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600">Total Translations</div>
          <div className="text-2xl font-bold text-blue-800">
            {translations.length}
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600">Published</div>
          <div className="text-2xl font-bold text-green-800">
            {translations.filter((t) => t.published).length}
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600">Draft</div>
          <div className="text-2xl font-bold text-gray-800">
            {translations.filter((t) => !t.published).length}
          </div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600">Categories</div>
          <div className="text-2xl font-bold text-purple-800">
            {categories.length}
          </div>
        </div>
      </div>
    </div>
  );
}
