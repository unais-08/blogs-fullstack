/**
 * useMyBlogs Hook
 * Custom hook for fetching current user's blogs
 */

import { useState, useEffect } from "react";
import { blogsApi } from "../api/blogs.api";
import type { BlogResponse } from "@/types/api";

interface UseMyBlogsReturn {
  blogs: BlogResponse[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useMyBlogs = (): UseMyBlogsReturn => {
  const [blogs, setBlogs] = useState<BlogResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMyBlogs = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await blogsApi.getMyBlogs();
      setBlogs(data);
    } catch (err) {
      setError("Failed to fetch your blogs. Please try again.");
      console.error("Error fetching my blogs:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  return {
    blogs,
    isLoading,
    error,
    refetch: fetchMyBlogs,
  };
};
