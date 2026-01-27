/**
 * Token Management Utility
 * Abstraction layer for secure token storage
 */

import { TOKEN_KEY } from "@/constants";

export const tokenStorage = {
  /**
   * Get token from localStorage
   */
  get(): string | null {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch (error) {
      console.error("Failed to get token:", error);
      return null;
    }
  },

  /**
   * Set token in localStorage
   */
  set(token: string): void {
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch (error) {
      console.error("Failed to set token:", error);
    }
  },

  /**
   * Remove token from localStorage
   */
  remove(): void {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch (error) {
      console.error("Failed to remove token:", error);
    }
  },

  /**
   * Check if token exists
   */
  exists(): boolean {
    return this.get() !== null;
  },
};
