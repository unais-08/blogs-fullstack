/**
 * Axios Instance Configuration
 * Centralized HTTP client with interceptors for authentication and error handling
 */

import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { API_BASE_URL, HTTP_STATUS } from "@/constants";
import { tokenStorage } from "./token";
import type { ApiError } from "@/types/api";

/**
 * Create axios instance with default configuration
 */
export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

/**
 * Request Interceptor
 * Automatically attach JWT token to all requests
 */
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = tokenStorage.get();

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

/**
 * Response Interceptor
 * Handle common error scenarios (401, 403, 500)
 */
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError<ApiError>) => {
    // Handle 401 Unauthorized - token expired or invalid
    // Only redirect if there was a token (authenticated request)
    if (error.response?.status === HTTP_STATUS.UNAUTHORIZED) {
      const hadToken = tokenStorage.exists();

      if (hadToken) {
        tokenStorage.remove();

        // Dispatch custom event for auth state change
        window.dispatchEvent(new CustomEvent("auth:logout"));

        // Redirect to login if not already there
        if (
          window.location.pathname !== "/login" &&
          window.location.pathname !== "/register"
        ) {
          window.location.href = "/login";
        }
      }
      // If no token, it's just an unauthenticated request - don't redirect
    }

    // Handle 403 Forbidden
    if (error.response?.status === HTTP_STATUS.FORBIDDEN) {
      console.error("Access forbidden:", error.response.data);
    }

    // Handle 500 Server Error
    if (error.response?.status === HTTP_STATUS.SERVER_ERROR) {
      console.error("Server error:", error.response.data);
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
