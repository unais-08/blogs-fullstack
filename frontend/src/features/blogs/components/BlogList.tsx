/**
 * BlogList Component
 * List of blog cards with empty state
 */

import { BlogCard } from "./BlogCard";
import type { BlogResponse } from "@/types/api";

interface BlogListProps {
  blogs: BlogResponse[];
  emptyMessage?: string;
}

export const BlogList = ({
  blogs,
  emptyMessage = "No blogs found.",
}: BlogListProps) => {
  if (blogs.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-block p-8 bg-gray-50 rounded-lg">
          <svg
            className="w-16 h-16 mx-auto text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p className="text-gray-600 text-lg">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
};
