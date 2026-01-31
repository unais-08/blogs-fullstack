/**
 * Utility Functions
 */

// Export validation utilities
export * from "./validation";

/**
 * Format date to readable string
 * Handles both Date objects and ISO strings from API
 */
export const formatDate = (date: string | Date): string => {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
};

/**
 * Format date with time
 * Handles both Date objects and ISO strings from API
 */
export const formatDateTime = (date: string | Date): string => {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
};

/**
 * Truncate text to specified length
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
};

/**
 * Debounce function
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number,
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Generate excerpt from content
 * Handles both plain text and Markdown content
 */
export const generateExcerpt = (content: string, maxLength = 150): string => {
  // Strip HTML tags
  let stripped = content.replace(/<[^>]+>/g, "");

  // Strip Markdown syntax
  stripped = stripped
    .replace(/#{1,6}\s+/g, "") // Remove heading markers
    .replace(/(\*\*|__)(.*?)\1/g, "$2") // Remove bold
    .replace(/(\*|_)(.*?)\1/g, "$2") // Remove italic
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Remove links, keep text
    .replace(/`{1,3}[^`]*`{1,3}/g, "") // Remove code blocks/inline code
    .replace(/^>\s+/gm, "") // Remove blockquotes
    .replace(/^[-*+]\s+/gm, "") // Remove list markers
    .replace(/^\d+\.\s+/gm, "") // Remove ordered list markers
    .replace(/\n+/g, " ") // Replace newlines with spaces
    .trim();

  return truncateText(stripped, maxLength);
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Sleep utility for async operations
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
