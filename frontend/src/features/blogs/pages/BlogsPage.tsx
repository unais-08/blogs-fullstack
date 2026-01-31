/**
 * BlogsPage Component
 * Updated to match the high-contrast, bold purple theme
 */
import { MainLayout } from "@/shared/layouts/MainLayout";
import { Loader, Alert } from "@/shared/components";
import { BlogList } from "../components/BlogList";
import { useBlogs } from "../hooks/useBlogs";

export const BlogsPage = () => {
  const { blogs, isLoading, error } = useBlogs();

  return (
    <MainLayout>
      {/* Themed Header Section */}
      <header className="relative bg-[#f8f8f8] py-0 px-8 border-b border-slate-200 overflow-hidden">
       

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-widest text-[#111] mb-4">
            Latest <span className="text-[#7843e9]">Insights</span>
          </h1>
        </div>
      </header>

      {/* Content Area */}
      <main className="max-w-7xl mx-auto px-8 py-16">
        {error && (
          <div className="mb-10">
            <Alert
              variant="error"
              className="border-l-4 border-red-600 font-bold uppercase tracking-wider"
            >
              {error}
            </Alert>
          </div>
        )}

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader size="lg" />
            <span className="font-black uppercase tracking-[0.2em] text-[#7843e9] text-sm animate-pulse">
              Fetching Stories...
            </span>
          </div>
        ) : (
          <div className="relative">
            {/* Added a subtle left-border to the list area for a "Timeline" feel */}
            <BlogList
              blogs={blogs}
              emptyMessage="No blogs available yet. Check back soon!"
            />
          </div>
        )}
      </main>
    </MainLayout>
  );
};
