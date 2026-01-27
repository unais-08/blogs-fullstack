/**
 * RequireAuth Component
 * Protected route wrapper that redirects to login if not authenticated
 */

import { type ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Loader } from "@/shared/components";
import { ROUTES } from "@/constants";

interface RequireAuthProps {
  children: ReactNode;
}

export const RequireAuth = ({ children }: RequireAuthProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Show loader while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader size="lg" text="Loading..." />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
