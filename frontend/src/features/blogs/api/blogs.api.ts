/**
 * Blogs API Module
 * Handles all blog-related API calls
 */

import { axiosInstance } from "@/shared/lib/axios";
import { API_ENDPOINTS } from "@/constants";
import type { BlogResponse } from "@/types/api";

export interface CreateBlogPayload {
  title: string;
  content: string;
}

export const blogsApi = {
  /**
   * Get all blogs (public)
   */
  async getBlogs(): Promise<BlogResponse[]> {
    const response = await axiosInstance.get<
      { data?: BlogResponse[] } | BlogResponse[]
    >(API_ENDPOINTS.BLOGS.LIST);
    // Handle both direct array and wrapped response
    return Array.isArray(response.data)
      ? response.data
      : (response.data as any)?.data || [];
  },

  /**
   * Get single blog by ID
   */
  async getBlogById(id: string): Promise<BlogResponse> {
    const response = await axiosInstance.get<
      { data?: BlogResponse } | BlogResponse
    >(API_ENDPOINTS.BLOGS.DETAIL(id));
    // Handle both direct object and wrapped response
    return (response.data as any)?.data || response.data;
  },

  /**
   * Get current user's blogs (protected)
   */
  async getMyBlogs(): Promise<BlogResponse[]> {
    const response = await axiosInstance.get<
      { data?: BlogResponse[] } | BlogResponse[]
    >(API_ENDPOINTS.BLOGS.MY_BLOGS);
    // Handle both direct array and wrapped response
    return Array.isArray(response.data)
      ? response.data
      : (response.data as any)?.data || [];
  },

  /**
   * Create new blog (protected)
   */
  async createBlog(payload: CreateBlogPayload): Promise<BlogResponse> {
    const response = await axiosInstance.post<
      { data?: BlogResponse } | BlogResponse
    >(API_ENDPOINTS.BLOGS.CREATE, payload);
    // Handle both direct object and wrapped response
    return (response.data as any)?.data || response.data;
  },
};
