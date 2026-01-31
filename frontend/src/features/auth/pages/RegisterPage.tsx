/**
 * RegisterPage Component
 * User registration page
 */

import { type FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { AuthLayout } from "@/shared/layouts/AuthLayout";
import { Button, Input, Card, Alert } from "@/shared/components";
import { ROUTES } from "@/constants";

export const RegisterPage = () => {
  const { register, error, isLoading, clearError } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  /**
   * Validate form fields
   */
  const validate = (): boolean => {
    const errors = { name: "", email: "", password: "", confirmPassword: "" };
    let isValid = true;

    if (!formData.name) {
      errors.name = "Name is required";
      isValid = false;
    } else if (formData.name.length < 2) {
      errors.name = "Name must be at least 2 characters";
      isValid = false;
    }

    if (!formData.email) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.password) {
      errors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearError();

    if (!validate()) return;

    try {
      await register(formData.name, formData.email, formData.password);
      navigate(ROUTES.HOME);
    } catch (err) {
      // Error is handled by auth context
      console.error("Registration error:", err);
    }
  };

  /**
   * Handle input change
   */
  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setFormErrors((prev) => ({ ...prev, [field]: "" }));
  };

  return (
    <AuthLayout>
      <Card>
        {error && (
          <Alert variant="error" className="mb-4" onClose={clearError}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            error={formErrors.name}
            required
            autoComplete="name"
          />

          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            error={formErrors.email}
            required
            autoComplete="email"
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
            error={formErrors.password}
            required
            autoComplete="new-password"
            helperText="Minimum 6 characters"
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
            error={formErrors.confirmPassword}
            required
            autoComplete="new-password"
          />

          <Button
            type="submit"
            fullWidth
            isLoading={isLoading}
            className="mt-6"
          >
            Create Account
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to={ROUTES.LOGIN}
              className="font-medium text-blue-600 hover:text-blue-700"
            >
              Sign in
            </Link>
          </p>
        </div>
      </Card>
    </AuthLayout>
  );
};
