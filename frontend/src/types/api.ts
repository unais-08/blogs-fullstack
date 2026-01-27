/**
 * API Response Types
 * Centralized type definitions matching backend types
 */

// ============================================
// Generic API Types
// ============================================

export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
  };
}

// ============================================
// User/Auth Types (matching backend)
// ============================================

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  createdAt: string | Date;
}

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: UserResponse;
  token: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  user: UserResponse;
  token: string;
}

// ============================================
// Blog Types (matching backend)
// ============================================

export interface Blog {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface BlogWithAuthor extends Blog {
  authorName: string;
  authorEmail: string;
}

export interface BlogResponse {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface CreateBlogDto {
  title: string;
  content: string;
  authorId: string;
}

// ============================================
// Legacy compatibility (deprecated)
// ============================================

/** @deprecated Use UserResponse instead */
export type AuthUser = UserResponse;

/** @deprecated Use BlogResponse instead */
export interface LegacyBlog {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  authorId: string;
  author?: UserResponse;
  createdAt: string;
  updatedAt: string;
  published?: boolean;
}
