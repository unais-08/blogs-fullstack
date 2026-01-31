/**
 * MyBlogsPage Component
 * Dashboard for managing user blogs with a professional command-center aesthetic
 */
import { useState } from "react";
import { Link } from "react-router";
import { MainLayout } from "@/shared/layouts/MainLayout";
import { Button, Loader, Alert } from "@/shared/components";
import { BlogList } from "../components/BlogList";
import { useMyBlogs } from "../hooks/useMyBlogs";
import { ROUTES } from "@/constants";
import { Plus } from "lucide-react";

export const MyBlogsPage = () => {
  const { blogs, isLoading, error } = useMyBlogs();
  const [deleteError, setDeleteError] = useState<string | null>(null);

  return (
    <MainLayout>
      {/* Header with Geometric Pattern (matches Hero) */}
      <header className="relative bg-[#f8f8f8] py-5 px-8 border-b border-slate-200 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-4xl font-black uppercase tracking-widest text-[#111] mb-2">
              My <span className="text-[#7843e9]">Dashboard</span>
            </h1>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-tighter">
              Manage and scale your technical publications
            </p>
          </div>

          <Link to={ROUTES.CREATE_BLOG}>
            <Button size="md" className="flex items-center gap-3">
              <Plus size={20} strokeWidth={3} />
              <span>Create New Blog</span>
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-12">
        {/* Error Handling */}
        {(error || deleteError) && (
          <div className="mb-8">
            <Alert
              variant="error"
              className="border-l-4 border-red-600 font-bold uppercase tracking-widest text-xs"
              onClose={() => setDeleteError(null)}
            >
              {error || deleteError}
            </Alert>
          </div>
        )}

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader size="lg" />
            <span className="font-black uppercase tracking-[0.2em] text-[#7843e9] text-xs">
              Loading Dashboard...
            </span>
          </div>
        ) : (
          <>
            <div className="relative">
              <BlogList
                blogs={blogs}
                emptyMessage="Your library is currently empty."
              />
            </div>
          </>
        )}
      </main>
    </MainLayout>
  );
};
