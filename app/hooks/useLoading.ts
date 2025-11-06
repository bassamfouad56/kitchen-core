"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";

interface UseLoadingOptions {
  delay?: number; // Minimum loading time to prevent flashing
  timeout?: number; // Maximum loading time
}

export function useLoading(options: UseLoadingOptions = {}) {
  const { delay = 300, timeout = 10000 } = options;
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // Start loading
  const startLoading = useCallback(() => {
    setIsLoading(true);
    setProgress(0);
  }, []);

  // Stop loading
  const stopLoading = useCallback(() => {
    setProgress(100);
    setTimeout(() => {
      setIsLoading(false);
      setProgress(0);
    }, delay);
  }, [delay]);

  // Simulate progress
  useEffect(() => {
    if (!isLoading) return;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return 90;
        return prev + Math.random() * 10;
      });
    }, 200);

    const timeoutId = setTimeout(() => {
      stopLoading();
    }, timeout);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timeoutId);
    };
  }, [isLoading, timeout, stopLoading]);

  // Auto-detect route changes
  useEffect(() => {
    startLoading();
    const timer = setTimeout(() => stopLoading(), delay);
    return () => clearTimeout(timer);
  }, [pathname, searchParams, delay, startLoading, stopLoading]);

  return {
    isLoading,
    progress,
    startLoading,
    stopLoading,
  };
}

// Hook for async operations with loading state
export function useAsyncLoading<T>(
  asyncFunction: () => Promise<T>,
  deps: any[] = []
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);

  const execute = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await asyncFunction();
      setData(result);
      return result;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, deps);

  return {
    isLoading,
    error,
    data,
    execute,
  };
}

// Hook for button loading states
export function useButtonLoading() {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {}
  );

  const setLoading = useCallback((key: string, loading: boolean) => {
    setLoadingStates((prev) => ({ ...prev, [key]: loading }));
  }, []);

  const isLoading = useCallback(
    (key: string) => loadingStates[key] ?? false,
    [loadingStates]
  );

  const withLoading = useCallback(
    async (key: string, fn: () => Promise<any>) => {
      setLoading(key, true);
      try {
        await fn();
      } finally {
        setLoading(key, false);
      }
    },
    [setLoading]
  );

  return {
    isLoading,
    setLoading,
    withLoading,
  };
}
