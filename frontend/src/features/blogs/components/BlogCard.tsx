/**
 * BlogCard Component
 * Reusable blog card for list views
 */

import { Link } from "react-router";
import { Card } from "@/shared/components";
import { formatDate, generateExcerpt } from "@/shared/utils";
import { ROUTES } from "@/constants";
import type { BlogResponse } from "@/types/api";

interface BlogCardProps {
  blog: BlogResponse;
}

export const BlogCard = ({ blog }: BlogCardProps) => {
  // Safely convert date to string for dateTime attribute
  const dateTimeString =
    typeof blog.createdAt === "string"
      ? blog.createdAt
      : blog.createdAt.toISOString();

  return (
    <Link to={ROUTES.BLOG_DETAIL(blog.id)}>
      <Card hover className="h-full">
        <article>
          <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
            {blog.title}
          </h2>

          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
            {blog.author && (
              <>
                <span className="font-medium">{blog.author.name}</span>
                <span>•</span>
              </>
            )}
            <time dateTime={dateTimeString}>{formatDate(blog.createdAt)}</time>
          </div>

          <p className="text-gray-700 leading-relaxed">
            {generateExcerpt(blog.content, 150)}
          </p>

          <div className="mt-4">
            <span className="text-blue-600 font-medium hover:text-blue-700">
              Read more →
            </span>
          </div>
        </article>
      </Card>
    </Link>
  );
};
