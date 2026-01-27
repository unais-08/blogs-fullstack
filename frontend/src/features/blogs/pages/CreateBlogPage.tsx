/**
 * CreateBlogPage Component
 * Page for creating a new blog (protected)
 */

import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import { MainLayout } from "@/shared/layouts/MainLayout";
import { Button, Input, Textarea, Card, Alert } from "@/shared/components";
import { blogsApi } from "../api/blogs.api";
import { ROUTES } from "@/constants";
import { AxiosError } from "axios";

export const CreateBlogPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const [formErrors, setFormErrors] = useState({
    title: "",
    content: "",
  });

  /**
   * Validate form
   */
  const validate = (): boolean => {
    const errors = { title: "", content: "" };
    let isValid = true;

    if (!formData.title.trim()) {
      errors.title = "Title is required";
      isValid = false;
    } else if (formData.title.length < 5) {
      errors.title = "Title must be at least 5 characters";
      isValid = false;
    }

    if (!formData.content.trim()) {
      errors.content = "Content is required";
      isValid = false;
    } else if (formData.content.length < 20) {
      errors.content = "Content must be at least 20 characters";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!validate()) return;

    try {
      setIsLoading(true);
      const blog = await blogsApi.createBlog(formData);
      navigate(ROUTES.BLOG_DETAIL(blog.id));
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      setError(
        axiosError.response?.data?.message ||
          "Failed to create blog. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle input change
   */
  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setFormErrors((prev) => ({ ...prev, [field]: "" }));
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Create New Blog
          </h1>
          <p className="text-lg text-gray-600">
            Share your thoughts with the world
          </p>
        </header>

        {error && (
          <Alert
            variant="error"
            className="mb-6"
            onClose={() => setError(null)}
          >
            {error}
          </Alert>
        )}

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Blog Title"
              type="text"
              placeholder="Enter an engaging title..."
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              error={formErrors.title}
              required
            />

            <Textarea
              label="Content"
              placeholder="Write your blog content here..."
              value={formData.content}
              onChange={(e) => handleChange("content", e.target.value)}
              error={formErrors.content}
              rows={12}
              required
            />

            <div className="flex gap-3 pt-4">
              <Button type="submit" isLoading={isLoading}>
                Create Blog
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(ROUTES.BLOGS)}
                disabled={isLoading}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </MainLayout>
  );
};
