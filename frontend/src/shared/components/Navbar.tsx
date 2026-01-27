/**
 * Navbar Component
 * Main navigation component
 */

import { Link, useNavigate } from "react-router";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { ROUTES } from "@/constants";
import { Button } from "@/shared/components";

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <Link
            to={ROUTES.HOME}
            className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
          >
            Blog Platform
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            <Link
              to={ROUTES.BLOGS}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Blogs
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to={ROUTES.MY_BLOGS}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  My Blogs
                </Link>
                <Link
                  to={ROUTES.CREATE_BLOG}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Create Blog
                </Link>
                <div className="flex items-center gap-3 ml-4 pl-4 border-l border-gray-300">
                  <span className="text-sm text-gray-600">
                    {user?.name || user?.email}
                  </span>
                  <Button size="sm" variant="outline" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3 ml-4">
                <Link to={ROUTES.LOGIN}>
                  <Button size="sm" variant="outline">
                    Login
                  </Button>
                </Link>
                <Link to={ROUTES.REGISTER}>
                  <Button size="sm" variant="primary">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
