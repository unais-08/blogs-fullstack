/**
 * useBlog Hook
 * Custom hook for fetching a single blog from context (optimized with caching)
 */

import { useEffect, useContext } from "react";
import { BlogContext } from "../context/BlogContext";
import type { BlogResponse } from "@/types/api";

interface UseBlogReturn {
  blog: BlogResponse | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useBlog = (id: string): UseBlogReturn => {
  const context = useContext(BlogContext);

  if (!context) {
    throw new Error("useBlog must be used within a BlogProvider");
  }

  const { currentBlog, isLoading, error, fetchBlogById } = context;

  useEffect(() => {
    if (id) {
      // Fetch only if needed (context handles caching)
      fetchBlogById(id);
    }
  }, [id, fetchBlogById]);

  return {
    blog: currentBlog,
    isLoading,
    error,
    refetch: () => fetchBlogById(id, true), // Force refetch when explicitly requested
  };
};
