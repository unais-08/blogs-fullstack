/**
 * useMyBlogs Hook
 * Custom hook for fetching current user's blogs from context (optimized with caching)
 */

import { useEffect, useContext } from "react";
import { BlogContext } from "../context/BlogContext";
import type { BlogResponse } from "@/types/api";

interface UseMyBlogsReturn {
  blogs: BlogResponse[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useMyBlogs = (): UseMyBlogsReturn => {
  const context = useContext(BlogContext);

  if (!context) {
    throw new Error("useMyBlogs must be used within a BlogProvider");
  }

  const { myBlogs, isLoading, error, fetchMyBlogs } = context;

  useEffect(() => {
    // Fetch only if not already loaded (context handles caching)
    fetchMyBlogs();
  }, [fetchMyBlogs]);

  return {
    blogs: myBlogs,
    isLoading,
    error,
    refetch: () => fetchMyBlogs(true), // Force refetch when explicitly requested
  };
};
