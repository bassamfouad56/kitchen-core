"use client";

import { useState } from "react";
import DataTable, { DataTableProps } from "./DataTable";

interface PaginatedDataTableProps<T> extends Omit<DataTableProps<T>, "data"> {
  data: T[];
  pageSize?: number;
  showPageSizeSelector?: boolean;
  pageSizeOptions?: number[];
}

export default function PaginatedDataTable<T extends Record<string, unknown>>({
  data,
  pageSize: initialPageSize = 10,
  showPageSizeSelector = true,
  pageSizeOptions = [10, 25, 50, 100],
  locale = "en",
  ...tableProps
}: PaginatedDataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const isArabic = locale === "ar";

  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = data.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(1); // Reset to first page
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Always show first page
    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    // Show pages around current page
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="space-y-4">
      <DataTable data={currentData} locale={locale} {...tableProps} />

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
          {/* Page Size Selector */}
          {showPageSizeSelector && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                {isArabic ? "عرض" : "Show"}
              </span>
              <select
                value={pageSize}
                onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {pageSizeOptions.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              <span className="text-sm text-gray-600">
                {isArabic ? "نتيجة" : "per page"}
              </span>
            </div>
          )}

          {/* Page Info */}
          <div className="text-sm text-gray-600">
            {isArabic
              ? `${startIndex + 1}-${Math.min(endIndex, data.length)} من ${data.length}`
              : `${startIndex + 1}-${Math.min(endIndex, data.length)} of ${data.length}`}
          </div>

          {/* Page Numbers */}
          <div className="flex items-center gap-1">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous page"
            >
              {isArabic ? "السابق" : "Previous"}
            </button>

            {/* Page Numbers */}
            <div className="hidden sm:flex items-center gap-1">
              {getPageNumbers().map((page, index) =>
                typeof page === "number" ? (
                  <button
                    key={`page-${page}`}
                    onClick={() => handlePageChange(page)}
                    className={`
                      px-3 py-1 rounded-lg text-sm font-medium transition-colors
                      ${
                        currentPage === page
                          ? "bg-blue-600 text-white"
                          : "text-gray-700 hover:bg-gray-50 border border-gray-300"
                      }
                    `}
                  >
                    {page}
                  </button>
                ) : (
                  <span
                    key={`ellipsis-${index}`}
                    className="px-2 text-gray-400"
                  >
                    {page}
                  </span>
                ),
              )}
            </div>

            {/* Mobile: Current Page Display */}
            <div className="sm:hidden px-3 py-1 text-sm text-gray-700">
              {currentPage} / {totalPages}
            </div>

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Next page"
            >
              {isArabic ? "التالي" : "Next"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
