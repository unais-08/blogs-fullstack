/**
 * useBlogs Hook
 * Custom hook for fetching all blogs
 */

import { useState, useEffect } from "react";
import { blogsApi } from "../api/blogs.api";
import type { BlogResponse } from "@/types/api";

interface UseBlogsReturn {
  blogs: BlogResponse[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useBlogs = (): UseBlogsReturn => {
  const [blogs, setBlogs] = useState<BlogResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await blogsApi.getBlogs();
      setBlogs(data);
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError("Failed to fetch blogs. Please try again.");
      setBlogs([]); // Set empty array on error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return {
    blogs,
    isLoading,
    error,
    refetch: fetchBlogs,
  };
};
