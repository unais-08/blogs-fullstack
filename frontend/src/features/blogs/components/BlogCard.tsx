/**
 * BlogCard Component
 * Redesigned for a bold, "Result-Oriented" professional aesthetic
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
  const dateTimeString =
    typeof blog.createdAt === "string"
      ? blog.createdAt
      : blog.createdAt.toISOString();

  return (
    <Link to={ROUTES.BLOG_DETAIL(blog.id)} className="block h-full group">
      <Card className="h-full overflow-hidden border-none shadow-lg transition-all duration-300 group-hover:shadow-2xl">
        <article className="flex flex-col h-full">
          {/* Visual Thumbnail Area */}
          <div className="relative aspect-video overflow-hidden bg-[#7843e910]">
            {/* If your API doesn't have images, this geometric placeholder maintains the theme */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `url('https://www.transparenttextures.com/patterns/cubes.png')`,
              }}
            />
            {blog.thumbnailUrl ? (
              <img
                src={blog.thumbnailUrl}
                alt={blog.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <span className="text-4xl font-black text-[#7843e9] opacity-20 uppercase tracking-tighter">
                  Dev Logs
                </span>
              </div>
            )}
            {/* Category Badge */}
            <div className="absolute bottom-4 left-4">
              <span className="bg-[#7843e9] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded shadow-lg">
                {blog.category || "Article"}
              </span>
            </div>
          </div>

          <div className="flex flex-col flex-grow p-6">
            {/* Meta Info: Author & Date */}
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.15em] text-[#7843e9] mb-3">
              {blog.author && (
                <>
                  <span>{blog.author.name}</span>
                  <span className="text-slate-300">•</span>
                </>
              )}
              <time dateTime={dateTimeString} className="text-slate-500">
                {formatDate(blog.createdAt)}
              </time>
            </div>

            <h2 className="text-xl font-black text-[#111] uppercase tracking-tight leading-tight mb-3 group-hover:text-[#7843e9] transition-colors">
              {blog.title}
            </h2>

            <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
              {generateExcerpt(blog.content, 120)}
            </p>

            <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
              <span className="text-[11px] font-black uppercase tracking-widest text-[#111] transition-all group-hover:translate-x-1">
                Read Article <span className="text-[#7843e9]">→</span>
              </span>
            </div>
          </div>
        </article>
      </Card>
    </Link>
  );
};
