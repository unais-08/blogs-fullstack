/**
 * AuthLayout Component
 * Redesigned with high-contrast geometric theme and brand purple
 */
import { type ReactNode } from "react";
import { Link } from "react-router";
import { ROUTES } from "@/constants";

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="relative min-h-screen bg-[#f8f8f8] flex flex-col overflow-hidden">
      {/* Background Geometric Texture */}

      {/* Header - Minimalist & Bold */}
      <header className="relative z-10 py-10 px-8">
        <div className="max-w-7xl mx-auto text-center md:text-left">
          <Link
            to={ROUTES.HOME}
            className="text-2xl font-black uppercase tracking-[0.3em] text-[#111] hover:text-[#7843e9] transition-all"
          >
            Dev <span className="text-[#7843e9]">Blogs</span>
          </Link>
        </div>
      </header>

      {/* Main Content - Centered with High-Shadow Card feel */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-0">
        <div className="w-full max-w-md">{children}</div>
      </main>
    </div>
  );
};
