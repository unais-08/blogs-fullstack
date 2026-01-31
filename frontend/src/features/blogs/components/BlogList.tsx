/**
 * BlogList Component
 * Updated with high-contrast empty state and themed grid layout
 */
import { BlogCard } from "./BlogCard";
import type { BlogResponse } from "@/types/api";
import { FileText } from "lucide-react"; // Using Lucide for a cleaner look

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
      <div className="text-center py-20">
        <div className="inline-block p-12 bg-[#f8f8f8] border-2 border-dashed border-slate-200 rounded-xl">
          <div className="w-20 h-20 bg-[#7843e91a] rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText size={40} className="text-[#7843e9]" />
          </div>
          <p className="text-[#111] text-xl font-black uppercase tracking-widest">
            {emptyMessage}
          </p>
          <p className="text-slate-500 mt-2 font-medium uppercase text-xs tracking-tighter">
            Check back later for new developer insights
          </p>
        </div>
      </div>
    );
  }

  return (
    /* Increased gap to 'gap-10' to give each card more 'air' 
       consistent with the premium feel of the screenshot.
    */
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {blogs.map((blog) => (
        <div
          key={blog.id}
          className="transition-transform duration-300 hover:-translate-y-2"
        >
          <BlogCard blog={blog} />
        </div>
      ))}
    </div>
  );
};
