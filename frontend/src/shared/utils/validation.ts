/**
 * Validation utilities for blog forms
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validate blog title
 * Rules:
 * - Required
 * - Min length: 5 characters
 * - Max length: 200 characters
 * - Allowed characters: alphanumeric, spaces, and common punctuation
 * - No leading/trailing spaces
 */
export const validateBlogTitle = (title: string): ValidationResult => {
  const trimmedTitle = title.trim();

  if (!title || !trimmedTitle) {
    return { isValid: false, error: "Title is required" };
  }

  if (trimmedTitle.length < 5) {
    return { isValid: false, error: "Title must be at least 5 characters" };
  }

  if (trimmedTitle.length >= 50) {
    return { isValid: false, error: "Title must not exceed 50 characters" };
  }

  // Check for invalid characters
  const validTitlePattern = /^[a-zA-Z0-9\s\-.,!?'"():&]+$/;
  if (!validTitlePattern.test(trimmedTitle)) {
    return {
      isValid: false,
      error:
        "Title contains invalid characters (only letters, numbers, spaces, and common punctuation allowed)",
    };
  }

  // Check for leading/trailing spaces
  if (/^\s|\s$/.test(title)) {
    return {
      isValid: false,
      error: "Title cannot start or end with spaces",
    };
  }

  return { isValid: true };
};

/**
 * Validate blog content
 * Rules:
 * - Required
 * - Min length: 20 characters
 * - Max length: 50,000 characters
 */
export const validateBlogContent = (content: string): ValidationResult => {
  const trimmedContent = content.trim();

  if (!content || !trimmedContent) {
    return { isValid: false, error: "Content is required" };
  }

  if (trimmedContent.length < 20) {
    return {
      isValid: false,
      error: "Content must be at least 20 characters",
    };
  }

  if (trimmedContent.length > 50000) {
    return {
      isValid: false,
      error: "Content must not exceed 50,000 characters",
    };
  }

  return { isValid: true };
};

/**
 * Validate entire blog form
 */
export const validateBlogForm = (
  title: string,
  content: string,
): { isValid: boolean; errors: { title: string; content: string } } => {
  const titleValidation = validateBlogTitle(title);
  const contentValidation = validateBlogContent(content);

  return {
    isValid: titleValidation.isValid && contentValidation.isValid,
    errors: {
      title: titleValidation.error || "",
      content: contentValidation.error || "",
    },
  };
};

/**
 * Sanitize title by trimming and limiting length
 */
export const sanitizeBlogTitle = (title: string): string => {
  return title.trim().slice(0, 200);
};

/**
 * Sanitize content by trimming and limiting length
 */
export const sanitizeBlogContent = (content: string): string => {
  return content.trim().slice(0, 50000);
};
