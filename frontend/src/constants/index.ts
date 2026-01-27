/**
 * Application Constants
 * Centralized configuration values
 */

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

export const TOKEN_KEY = "auth_token";

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    PROFILE: "/auth/profile",
  },
  BLOGS: {
    LIST: "/blogs",
    CREATE: "/blogs",
    MY_BLOGS: "/blogs/my/blogs",
    DETAIL: (id: string) => `/blogs/${id}`,
  },
} as const;

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  BLOGS: "/blogs",
  BLOG_DETAIL: (id: string) => `/blogs/${id}`,
  CREATE_BLOG: "/blogs/create",
  MY_BLOGS: "/my-blogs",
  PROFILE: "/profile",
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
} as const;
