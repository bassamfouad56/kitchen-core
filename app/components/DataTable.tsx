"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface Column<T> {
  key: string;
  label: string;
  labelAr?: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
  hiddenOnMobile?: boolean;
  className?: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string;
  onRowClick?: (item: T) => void;
  emptyMessage?: string;
  emptyMessageAr?: string;
  locale?: string;
  mobileCardRender?: (item: T) => React.ReactNode;
  loading?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  searchKeys?: (keyof T)[];
  actions?: (item: T) => React.ReactNode;
  className?: string;
}

export default function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  keyExtractor,
  onRowClick,
  emptyMessage = "No data available",
  emptyMessageAr = "لا توجد بيانات",
  locale = "en",
  mobileCardRender,
  loading = false,
  searchable = false,
  searchPlaceholder = "Search...",
  searchKeys = [],
  actions,
  className = "",
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const isArabic = locale === "ar";

  // Filter data based on search
  const filteredData = useMemo(() => {
    if (!searchable || !searchQuery.trim()) return data;

    const query = searchQuery.toLowerCase();
    return data.filter((item) => {
      if (searchKeys.length > 0) {
        return searchKeys.some((key) => {
          const value = item[key];
          return String(value).toLowerCase().includes(query);
        });
      }
      // Search all string values if no specific keys provided
      return Object.values(item).some((value) =>
        String(value).toLowerCase().includes(query),
      );
    });
  }, [data, searchQuery, searchable, searchKeys]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortKey] as string | number | boolean;
      const bValue = b[sortKey] as string | number | boolean;

      if (aValue === bValue) return 0;

      const comparison = aValue < bValue ? -1 : 1;
      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [filteredData, sortKey, sortDirection]);

  const handleSort = (key: string, sortable?: boolean) => {
    if (!sortable) return;

    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const visibleColumns = columns.filter((col) => !col.hiddenOnMobile);

  return (
    <div className={`w-full ${className}`}>
      {/* Search */}
      {searchable && (
        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              dir={isArabic ? "rtl" : "ltr"}
            />
            <svg
              className={`absolute top-3 ${isArabic ? "right-3" : "left-3"} w-5 h-5 text-gray-400`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      )}

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 bg-white shadow-sm rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  onClick={() => handleSort(column.key, column.sortable)}
                  className={`
                    px-6 py-3 text-${isArabic ? "right" : "left"} text-xs font-medium text-gray-500 uppercase tracking-wider
                    ${column.sortable ? "cursor-pointer hover:bg-gray-100 select-none" : ""}
                    ${column.className || ""}
                  `}
                >
                  <div className="flex items-center gap-2">
                    <span>
                      {isArabic && column.labelAr
                        ? column.labelAr
                        : column.label}
                    </span>
                    {column.sortable && (
                      <span className="text-gray-400">
                        {sortKey === column.key ? (
                          sortDirection === "asc" ? (
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" />
                            </svg>
                          ) : (
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" />
                            </svg>
                          )
                        ) : (
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M5 12a1 1 0 102 0V6.414l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L5 6.414V12zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
                          </svg>
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
              {actions && (
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="px-6 py-12 text-center"
                >
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                </td>
              </tr>
            ) : sortedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  {isArabic ? emptyMessageAr : emptyMessage}
                </td>
              </tr>
            ) : (
              sortedData.map((item) => (
                <motion.tr
                  key={keyExtractor(item)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => onRowClick?.(item)}
                  className={`${onRowClick ? "cursor-pointer hover:bg-gray-50" : ""} transition-colors`}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={`px-6 py-4 whitespace-nowrap ${column.className || ""}`}
                    >
                      {column.render
                        ? column.render(item)
                        : String(item[column.key] || "-")}
                    </td>
                  ))}
                  {actions && (
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {actions(item)}
                    </td>
                  )}
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : sortedData.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            {isArabic ? emptyMessageAr : emptyMessage}
          </div>
        ) : (
          <AnimatePresence>
            {sortedData.map((item) => (
              <motion.div
                key={keyExtractor(item)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onClick={() => onRowClick?.(item)}
                className={`
                  bg-white rounded-lg shadow-sm border border-gray-200 p-4
                  ${onRowClick ? "cursor-pointer active:scale-98" : ""}
                `}
              >
                {mobileCardRender ? (
                  mobileCardRender(item)
                ) : (
                  <div className="space-y-3">
                    {visibleColumns.map((column) => (
                      <div
                        key={column.key}
                        className="flex justify-between items-start gap-4"
                      >
                        <span className="text-sm font-medium text-gray-500 min-w-[100px]">
                          {isArabic && column.labelAr
                            ? column.labelAr
                            : column.label}
                        </span>
                        <span className="text-sm text-gray-900 text-right flex-1">
                          {column.render
                            ? column.render(item)
                            : String(item[column.key] || "-")}
                        </span>
                      </div>
                    ))}
                    {actions && (
                      <div className="pt-3 border-t border-gray-200 flex justify-end gap-2">
                        {actions(item)}
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Results Count */}
      {!loading && sortedData.length > 0 && (
        <div className="mt-4 text-sm text-gray-500 text-center md:text-left">
          {isArabic
            ? `عرض ${sortedData.length} من ${data.length} نتيجة`
            : `Showing ${sortedData.length} of ${data.length} results`}
        </div>
      )}
    </div>
  );
}
