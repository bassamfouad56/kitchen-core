"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";

interface SearchResult {
  id: string;
  title: string;
  description?: string;
  type: "project" | "user" | "customer" | "translation" | "page";
  url: string;
  category?: string;
}

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GlobalSearch({ isOpen, onClose }: GlobalSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Load recent searches from localStorage
  useEffect(() => {
    if (isOpen) {
      const saved = localStorage.getItem("adminRecentSearches");
      if (saved) {
        try {
          setRecentSearches(JSON.parse(saved));
        } catch (e) {
          console.error("Failed to load recent searches:", e);
        }
      }
      // Focus input when opened
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      // Reset state when closed
      setQuery("");
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Save search to recent searches
  const saveRecentSearch = useCallback(
    (searchQuery: string) => {
      if (!searchQuery.trim()) return;

      const updated = [
        searchQuery,
        ...recentSearches.filter((s) => s !== searchQuery),
      ].slice(0, 5); // Keep only 5 recent searches

      setRecentSearches(updated);
      localStorage.setItem("adminRecentSearches", JSON.stringify(updated));
    },
    [recentSearches],
  );

  // Perform search
  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);

    try {
      const response = await fetch(
        `/api/admin/search?q=${encodeURIComponent(searchQuery)}`,
      );

      if (response.ok) {
        const data = await response.json();
        setResults(data.results || []);
      } else {
        console.error("Search failed:", response.statusText);
        setResults([]);
      }
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, performSearch]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case "Enter":
          e.preventDefault();
          if (results[selectedIndex]) {
            handleSelectResult(results[selectedIndex]);
          }
          break;
        case "Escape":
          e.preventDefault();
          onClose();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose]);

  // Handle result selection
  const handleSelectResult = (result: SearchResult) => {
    saveRecentSearch(query);
    router.push(result.url);
    onClose();
  };

  // Handle recent search click
  const handleRecentSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    performSearch(searchQuery);
  };

  // Clear recent searches
  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("adminRecentSearches");
  };

  // Get icon for result type
  const getTypeIcon = (type: SearchResult["type"]) => {
    switch (type) {
      case "project":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        );
      case "user":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        );
      case "customer":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        );
      case "translation":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
            />
          </svg>
        );
      case "page":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        );
      default:
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
            />
          </svg>
        );
    }
  };

  // Get badge color for type
  const getTypeBadgeColor = (type: SearchResult["type"]) => {
    switch (type) {
      case "project":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "user":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "customer":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "translation":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "page":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 transition-opacity"
        onClick={onClose}
      />

      {/* Search Modal */}
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
        <div className="w-full max-w-2xl bg-background-card border border-gray-dark rounded-lg shadow-2xl overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-dark">
            <svg
              className="w-5 h-5 text-gray-light flex-shrink-0"
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
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects, users, customers, translations..."
              className="flex-1 bg-transparent text-white placeholder-gray-light focus:outline-none text-base"
              autoComplete="off"
            />
            {isSearching && (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-light border-t-green-primary" />
            )}
            <kbd className="hidden sm:inline-block px-2 py-1 text-xs text-gray-light border border-gray-dark rounded">
              ESC
            </kbd>
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto">
            {/* Recent Searches */}
            {!query && recentSearches.length > 0 && (
              <div className="p-3 border-b border-gray-dark">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-light uppercase tracking-wider">
                    Recent Searches
                  </span>
                  <button
                    onClick={clearRecentSearches}
                    className="text-xs text-gray-light hover:text-white transition-colors"
                  >
                    Clear
                  </button>
                </div>
                <div className="space-y-1">
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleRecentSearch(search)}
                      className="w-full text-left px-3 py-2 rounded text-sm text-gray-light hover:bg-gray-dark/50 hover:text-white transition-colors flex items-center gap-2"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Search Results */}
            {query && results.length > 0 && (
              <div className="p-2">
                {results.map((result, index) => (
                  <button
                    key={result.id}
                    onClick={() => handleSelectResult(result)}
                    className={`w-full text-left px-3 py-3 rounded transition-colors flex items-start gap-3 ${
                      index === selectedIndex
                        ? "bg-green-primary/10 border border-green-primary/30"
                        : "hover:bg-gray-dark/50 border border-transparent"
                    }`}
                  >
                    <div
                      className={`flex-shrink-0 mt-0.5 ${
                        index === selectedIndex
                          ? "text-green-primary"
                          : "text-gray-light"
                      }`}
                    >
                      {getTypeIcon(result.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white font-medium truncate">
                          {result.title}
                        </span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded border ${getTypeBadgeColor(
                            result.type,
                          )}`}
                        >
                          {result.type}
                        </span>
                      </div>
                      {result.description && (
                        <p className="text-sm text-gray-light line-clamp-1">
                          {result.description}
                        </p>
                      )}
                      {result.category && (
                        <p className="text-xs text-gray-light mt-1">
                          {result.category}
                        </p>
                      )}
                    </div>
                    {index === selectedIndex && (
                      <kbd className="hidden sm:inline-block px-2 py-1 text-xs text-gray-light border border-gray-dark rounded mt-0.5">
                        ↵
                      </kbd>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* No Results */}
            {query && !isSearching && results.length === 0 && (
              <div className="p-8 text-center">
                <svg
                  className="w-12 h-12 mx-auto mb-3 text-gray-light"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-gray-light mb-1">No results found</p>
                <p className="text-sm text-gray-light/70">
                  Try searching with different keywords
                </p>
              </div>
            )}

            {/* Empty State */}
            {!query && recentSearches.length === 0 && (
              <div className="p-8 text-center">
                <svg
                  className="w-12 h-12 mx-auto mb-3 text-gray-light"
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
                <p className="text-gray-light mb-1">Start searching</p>
                <p className="text-sm text-gray-light/70">
                  Search across projects, users, customers, and more
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-gray-dark bg-black/30">
            <div className="flex items-center justify-between text-xs text-gray-light">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 border border-gray-dark rounded">
                    ↑
                  </kbd>
                  <kbd className="px-1.5 py-0.5 border border-gray-dark rounded">
                    ↓
                  </kbd>
                  <span>navigate</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 border border-gray-dark rounded">
                    ↵
                  </kbd>
                  <span>select</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 border border-gray-dark rounded">
                    ESC
                  </kbd>
                  <span>close</span>
                </span>
              </div>
              <span className="text-gray-light/70">
                Powered by Kitchen Core CMS
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
