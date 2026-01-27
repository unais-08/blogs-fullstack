/**
 * HomePage Component
 * Landing page of the application
 */

import { Link } from "react-router";
import { MainLayout } from "@/shared/layouts/MainLayout";
import { Button, Card } from "@/shared/components";
import { ROUTES } from "@/constants";
import { useAuth } from "@/features/auth/hooks/useAuth";

export const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="text-center py-16 mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-blue-600">Blog Platform</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover amazing stories, share your thoughts, and connect with
            writers from around the world.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to={ROUTES.BLOGS}>
              <Button size="lg">Explore Blogs</Button>
            </Link>
            {!isAuthenticated && (
              <Link to={ROUTES.REGISTER}>
                <Button size="lg" variant="outline">
                  Get Started
                </Button>
              </Link>
            )}
            {isAuthenticated && (
              <Link to={ROUTES.CREATE_BLOG}>
                <Button size="lg" variant="success">
                  Write a Blog
                </Button>
              </Link>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Our Platform?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Easy Writing</h3>
                <p className="text-gray-600">
                  Create and publish your blogs with our simple and intuitive
                  editor.
                </p>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Growing Community
                </h3>
                <p className="text-gray-600">
                  Join thousands of writers and readers sharing their stories.
                </p>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-purple-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
                <p className="text-gray-600">
                  Your data is protected with industry-standard security
                  practices.
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        {!isAuthenticated && (
          <section className="py-16 text-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl mt-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Start Writing?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Join our community and share your unique perspective with the
              world.
            </p>
            <Link to={ROUTES.REGISTER}>
              <Button size="lg" variant="primary">
                Create Your Account
              </Button>
            </Link>
          </section>
        )}
      </div>
    </MainLayout>
  );
};
