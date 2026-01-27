/**
 * MyBlogsPage Component
 * Dashboard showing user's own blogs (protected)
 */

import { useState } from "react";
import { Link } from "react-router";
import { MainLayout } from "@/shared/layouts/MainLayout";
import { Button, Loader, Alert } from "@/shared/components";
import { BlogList } from "../components/BlogList";
import { useMyBlogs } from "../hooks/useMyBlogs";
import { ROUTES } from "@/constants";

export const MyBlogsPage = () => {
  const { blogs, isLoading, error } = useMyBlogs();
  const [deleteError, setDeleteError] = useState<string | null>(null);

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">My Blogs</h1>
            <p className="text-lg text-gray-600">
              Manage your published articles
            </p>
          </div>
          <Link to={ROUTES.CREATE_BLOG}>
            <Button>
              <span className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                New Blog
              </span>
            </Button>
          </Link>
        </header>

        {(error || deleteError) && (
          <Alert
            variant="error"
            className="mb-6"
            onClose={() => setDeleteError(null)}
          >
            {error || deleteError}
          </Alert>
        )}

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader size="lg" text="Loading your blogs..." />
          </div>
        ) : (
          <>
            {blogs.length > 0 && (
              <div className="mb-6 text-sm text-gray-600">
                Total: {blogs.length} blog{blogs.length !== 1 ? "s" : ""}
              </div>
            )}
            <BlogList
              blogs={blogs}
              emptyMessage="You haven't created any blogs yet. Start writing!"
            />
          </>
        )}
      </div>
    </MainLayout>
  );
};
