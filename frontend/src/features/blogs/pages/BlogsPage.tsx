/**
 * BlogsPage Component
 * Public page showing all blogs
 */

import { MainLayout } from "@/shared/layouts/MainLayout";
import { Loader, Alert } from "@/shared/components";
import { BlogList } from "../components/BlogList";
import { useBlogs } from "../hooks/useBlogs";

export const BlogsPage = () => {
  const { blogs, isLoading, error } = useBlogs();

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">All Blogs</h1>
          <p className="text-lg text-gray-600">
            Explore our collection of articles and stories
          </p>
        </header>

        {error && (
          <Alert variant="error" className="mb-6">
            {error}
          </Alert>
        )}

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader size="lg" text="Loading blogs..." />
          </div>
        ) : (
          <BlogList
            blogs={blogs}
            emptyMessage="No blogs available yet. Check back soon!"
          />
        )}
      </div>
    </MainLayout>
  );
};
