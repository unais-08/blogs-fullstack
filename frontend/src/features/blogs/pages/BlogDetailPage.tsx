/**
 * BlogDetailPage Component
 * Redesigned for premium readability with the high-contrast purple theme
 */
import { useParams, useNavigate } from "react-router";
import { MainLayout } from "@/shared/layouts/MainLayout";
import {
  Button,
  Loader,
  Alert,
  Card,
  MarkdownRenderer,
} from "@/shared/components";
import { formatDateTime } from "@/shared/utils";
import { useBlog } from "../hooks/useBlog";
import { ROUTES } from "@/constants";
import { ArrowLeft, Calendar, Share2 } from "lucide-react";
import { useEffect, useState } from "react";

export const BlogDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { blog, isLoading, error } = useBlog(id || "");
  const [scrollProgress, setScrollProgress] = useState(0);

  // Handle Reading Progress
  useEffect(() => {
    const updateProgress = () => {
      const currentScroll = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setScrollProgress((currentScroll / scrollHeight) * 100);
      }
    };
    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <Loader size="lg" />
          <span className="font-black uppercase tracking-[0.2em] text-[#7843e9] text-xs">
            Loading Story...
          </span>
        </div>
      </MainLayout>
    );
  }

  if (error || !blog) {
    return (
      <MainLayout>
        <div className="max-w-3xl mx-auto py-12">
          <Alert
            variant="error"
            className="mb-6 font-bold uppercase text-xs tracking-widest"
          >
            {error || "Blog not found"}
          </Alert>
          <Button onClick={() => navigate(ROUTES.BLOGS)} variant="outline">
            <ArrowLeft size={16} className="mr-2" /> Back to Collection
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Sticky Reading Progress Bar */}
      <div className="fixed top-20 left-0 z-50 h-1.5 w-full bg-slate-100">
        <div
          className="h-full bg-[#7843e9] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4">
        {/* Navigation */}
        <button
          onClick={() => navigate(ROUTES.BLOGS)}
          className="group mb-10 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 transition-colors hover:text-[#7843e9]"
        >
          <ArrowLeft
            size={14}
            strokeWidth={3}
            className="transition-transform group-hover:-translate-x-1"
          />
          Back to Blogs
        </button>

        <article className="relative">
          {/* Article Header */}
          <header className="mb-12 text-center">
            <div className="mb-6 inline-block bg-[#7843e91a] px-4 py-1 rounded text-[10px] font-black uppercase tracking-widest text-[#7843e9]">
              {blog.category || "Technical Article"}
            </div>

            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-[#111] leading-[1.1] mb-8">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-6 border-y border-slate-100 py-6">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-[#7843e9] flex items-center justify-center text-white text-xs font-black">
                  {blog.author?.name.charAt(0)}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#111]">
                  {blog.author?.name}
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Calendar size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  {formatDateTime(blog.createdAt)}
                </span>
              </div>
              <button className="flex items-center gap-2 text-[#7843e9] hover:opacity-70 transition-opacity">
                <Share2 size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  Share
                </span>
              </button>
            </div>
          </header>

          {/* Main Content Area */}
          <Card className="border-none shadow-none bg-transparent">
            <MarkdownRenderer content={blog.content} />
          </Card>

          {/* About Author Section - Mirroring Hero Aesthetic */}
          <footer className="mt-20 border-t-4 border-[#111] pt-12">
            <div className="bg-[#f8f8f8] p-8 md:p-12 relative overflow-hidden"></div>
          </footer>
        </article>
      </div>
    </MainLayout>
  );
};
