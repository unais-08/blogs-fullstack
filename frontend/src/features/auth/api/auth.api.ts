/**
 * Auth API Module
 * Handles all authentication-related API calls
 */

import { axiosInstance } from "@/shared/lib/axios";
import { API_ENDPOINTS } from "@/constants";
import type {
  LoginRequest,
  RegisterRequest,
  LoginResponse,
  RegisterResponse,
  UserResponse,
} from "@/types/api";

export const authApi = {
  /**
   * Login user
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await axiosInstance.post<
      { data?: LoginResponse } | LoginResponse
    >(API_ENDPOINTS.AUTH.LOGIN, credentials);
    // Handle both direct object and wrapped response
    return (response.data as any)?.data || response.data;
  },

  /**
   * Register new user
   */
  async register(userData: RegisterRequest): Promise<RegisterResponse> {
    const response = await axiosInstance.post<
      { data?: RegisterResponse } | RegisterResponse
    >(API_ENDPOINTS.AUTH.REGISTER, userData);
    // Handle both direct object and wrapped response
    return (response.data as any)?.data || response.data;
  },

  /**
   * Get current user profile
   */
  async getProfile(): Promise<UserResponse> {
    const response = await axiosInstance.get<
      { data?: UserResponse } | UserResponse
    >(API_ENDPOINTS.AUTH.PROFILE);
    // Handle both direct object and wrapped response
    return (response.data as any)?.data || response.data;
  },
};
