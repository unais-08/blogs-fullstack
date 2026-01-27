/**
 * BlogDetailPage Component
 * Single blog detail page
 */

import { useParams, useNavigate } from "react-router";
import { MainLayout } from "@/shared/layouts/MainLayout";
import { Button, Loader, Alert, Card } from "@/shared/components";
import { formatDateTime } from "@/shared/utils";
import { useBlog } from "../hooks/useBlog";
import { ROUTES } from "@/constants";

export const BlogDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { blog, isLoading, error } = useBlog(id || "");

  // Safely convert date to string for dateTime attribute
  const dateTimeString = blog
    ? typeof blog.createdAt === "string"
      ? blog.createdAt
      : blog.createdAt.toISOString()
    : "";

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex justify-center py-12">
          <Loader size="lg" text="Loading blog..." />
        </div>
      </MainLayout>
    );
  }

  if (error || !blog) {
    return (
      <MainLayout>
        <div className="max-w-3xl mx-auto">
          <Alert variant="error" className="mb-6">
            {error || "Blog not found"}
          </Alert>
          <Button onClick={() => navigate(ROUTES.BLOGS)}>
            ← Back to Blogs
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(ROUTES.BLOGS)}
          className="mb-6"
        >
          ← Back to Blogs
        </Button>

        <Card>
          <article>
            <header className="mb-6 pb-6 border-b border-gray-200">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {blog.title}
              </h1>

              <div className="flex items-center gap-3 text-gray-600">
                {blog.author && (
                  <>
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                        {blog.author.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {blog.author.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {blog.author.email}
                        </p>
                      </div>
                    </div>
                    <span>•</span>
                  </>
                )}
                <time dateTime={dateTimeString} className="text-sm">
                  {formatDateTime(blog.createdAt)}
                </time>
              </div>
            </header>

            <div className="prose prose-lg max-w-none">
              <div
                className="text-gray-800 leading-relaxed whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>
          </article>
        </Card>
      </div>
    </MainLayout>
  );
};
