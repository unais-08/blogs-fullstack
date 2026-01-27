/**
 * AuthLayout Component
 * Layout wrapper for authentication pages (login, register)
 */

import { type ReactNode } from "react";
import { Link } from "react-router";
import { ROUTES } from "@/constants";

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* Header */}
      <header className="py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <Link
            to={ROUTES.HOME}
            className="text-3xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
          >
            Blog Platform
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">{children}</div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-600">
        <p>
          &copy; {new Date().getFullYear()} Blog Platform. All rights reserved.
        </p>
      </footer>
    </div>
  );
};
