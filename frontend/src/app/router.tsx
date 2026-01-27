/**
 * Router Configuration
 * Application routing setup
 */

import { Routes, Route, Navigate } from "react-router";
import { ROUTES } from "@/constants";

// Auth Pages
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { RegisterPage } from "@/features/auth/pages/RegisterPage";

// Blog Pages
import { HomePage } from "@/features/blogs/pages/HomePage";
import { BlogsPage } from "@/features/blogs/pages/BlogsPage";
import { BlogDetailPage } from "@/features/blogs/pages/BlogDetailPage";
import { CreateBlogPage } from "@/features/blogs/pages/CreateBlogPage";
import { MyBlogsPage } from "@/features/blogs/pages/MyBlogsPage";

// Components
import { RequireAuth } from "./components/RequireAuth";

export const AppRouter = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.BLOGS} element={<BlogsPage />} />
      <Route path="/blogs/:id" element={<BlogDetailPage />} />

      {/* Protected Routes */}
      <Route
        path={ROUTES.CREATE_BLOG}
        element={
          <RequireAuth>
            <CreateBlogPage />
          </RequireAuth>
        }
      />
      <Route
        path={ROUTES.MY_BLOGS}
        element={
          <RequireAuth>
            <MyBlogsPage />
          </RequireAuth>
        }
      />

      {/* 404 - Redirect to Home */}
      <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
  );
};
