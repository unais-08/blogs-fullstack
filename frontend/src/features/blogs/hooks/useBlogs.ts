/**
 * useBlogs Hook
 * Custom hook for fetching all blogs from context (optimized with caching)
 */

import { useEffect, useContext } from "react";
import { BlogContext } from "../context/BlogContext";
import type { BlogResponse } from "@/types/api";

interface UseBlogsReturn {
  blogs: BlogResponse[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useBlogs = (): UseBlogsReturn => {
  const context = useContext(BlogContext);

  if (!context) {
    throw new Error("useBlogs must be used within a BlogProvider");
  }

  const { blogs, isLoading, error, fetchAllBlogs } = context;

  useEffect(() => {
    // Fetch only if not already loaded (context handles caching)
    fetchAllBlogs();
  }, [fetchAllBlogs]);

  return {
    blogs,
    isLoading,
    error,
    refetch: () => fetchAllBlogs(true), // Force refetch when explicitly requested
  };
};
