/**
 * AuthContext Provider
 * Manages authentication state and operations
 */

import {
  createContext,
  type ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { authApi } from "../api/auth.api";
import { tokenStorage } from "@/shared/lib/token";
import type { AuthContextValue } from "../types";
import type { UserResponse } from "@/types/api";
import { type AxiosError } from "axios";

const AuthContext = createContext<AuthContextValue | null>(null);
AuthContext.displayName = "AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch user profile on mount if token exists
   */
  const loadUser = useCallback(async () => {
    const token = tokenStorage.get();

    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const userData = await authApi.getProfile();
      setUser(userData);
    } catch (err) {
      console.error("Failed to load user:", err);
      tokenStorage.remove();
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Initialize auth state on mount
   */
  useEffect(() => {
    loadUser();

    // Listen for auth logout events from axios interceptor
    const handleLogout = () => {
      setUser(null);
      setError(null);
    };

    window.addEventListener("auth:logout", handleLogout);
    return () => window.removeEventListener("auth:logout", handleLogout);
  }, [loadUser]);

  /**
   * Login user
   */
  const login = async (email: string, password: string): Promise<void> => {
    try {
      setError(null);
      setIsLoading(true);

      const response = await authApi.login({ email, password });

      tokenStorage.set(response.token);
      setUser(response.user);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      const message =
        error.response?.data?.message || "Login failed. Please try again.";
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Register new user
   */
  const register = async (
    name: string,
    email: string,
    password: string,
  ): Promise<void> => {
    try {
      setError(null);
      setIsLoading(true);

      const response = await authApi.register({ name, email, password });

      tokenStorage.set(response.token);
      setUser(response.user);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      const message =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Logout user
   */
  const logout = useCallback(() => {
    tokenStorage.remove();
    setUser(null);
    setError(null);
  }, []);

  /**
   * Clear error message
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value: AuthContextValue = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.displayName = "AuthProvider";

export default AuthContext;
