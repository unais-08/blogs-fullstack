/**
 * useBlog Hook
 * Custom hook for fetching a single blog
 */

import { useState, useEffect } from "react";
import { blogsApi } from "../api/blogs.api";
import type { BlogResponse } from "@/types/api";

interface UseBlogReturn {
  blog: BlogResponse | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useBlog = (id: string): UseBlogReturn => {
  const [blog, setBlog] = useState<BlogResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlog = async () => {
    if (!id) return;

    try {
      setIsLoading(true);
      setError(null);
      const data = await blogsApi.getBlogById(id);
      setBlog(data);
    } catch (err) {
      setError("Failed to fetch blog. Please try again.");
      console.error("Error fetching blog:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  return {
    blog,
    isLoading,
    error,
    refetch: fetchBlog,
  };
};
