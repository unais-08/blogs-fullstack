/**
 * CreateBlogPage Component
 * Integrated to fit within the existing MainLayout container
 */
import { type FormEvent, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { MainLayout } from "@/shared/layouts/MainLayout";
import {
  Button,
  Input,
  Card,
  Alert,
  MarkdownEditor,
} from "@/shared/components";
import { BlogContext } from "../context/BlogContext";
import { ROUTES } from "@/constants";
import { AxiosError } from "axios";
import { PenTool, ArrowLeft, Sparkles } from "lucide-react";
import {
  validateBlogTitle,
  validateBlogContent,
} from "@/shared/utils/validation";

export const CreateBlogPage = () => {
  const navigate = useNavigate();
  const context = useContext(BlogContext);

  if (!context) {
    throw new Error("CreateBlogPage must be used within a BlogProvider");
  }

  const { createNewBlog, isCreating } = context;
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({ title: "", content: "" });
  const [formErrors, setFormErrors] = useState({ title: "", content: "" });

  const validate = (): boolean => {
    const errors = { title: "", content: "" };
    let isValid = true;

    // Validate title using utility
    const titleValidation = validateBlogTitle(formData.title);
    if (!titleValidation.isValid) {
      errors.title = titleValidation.error || "";
      isValid = false;
    }

    // Validate content using utility
    const contentValidation = validateBlogContent(formData.content);
    if (!contentValidation.isValid) {
      errors.content = contentValidation.error || "";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (!validate()) return;

    try {
      await createNewBlog(formData);
      navigate(ROUTES.MY_BLOGS);
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      setError(axiosError.response?.data?.message || "Failed to create blog.");
    }
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Real-time validation
    if (field === "title") {
      const titleValidation = validateBlogTitle(value);
      const error =
        value.trim().length > 0 && !titleValidation.isValid
          ? titleValidation.error || ""
          : "";
      setFormErrors((prev) => ({ ...prev, [field]: error }));
    } else if (field === "content") {
      const contentValidation = validateBlogContent(value);
      const error =
        value.trim().length > 0 && !contentValidation.isValid
          ? contentValidation.error || ""
          : "";
      setFormErrors((prev) => ({ ...prev, [field]: error }));
    } else {
      setFormErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <MainLayout>
      <div className="mx-auto max-w-4xl">
        {/* Navigation & Breadcrumb */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 transition-colors hover:text-[#7843e9]"
          >
            <ArrowLeft
              size={14}
              strokeWidth={3}
              className="transition-transform group-hover:-translate-x-1"
            />
            Back to Dashboard
          </button>
        </div>

        {/* Page Title Section - Styled for internal layout */}
        <div className="mb-10 flex items-end justify-between border-b-4 border-[#111] pb-6">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-widest text-[#111] md:text-4xl">
              Writing <span className="text-[#7843e9]">Studio</span>
            </h1>
          </div>
          <Sparkles
            className="hidden text-[#7843e9] opacity-20 md:block"
            size={48}
          />
        </div>

        {error && (
          <Alert
            variant="error"
            className="mb-8 border-l-4 border-red-600 font-bold uppercase tracking-widest text-[10px]"
            onClose={() => setError(null)}
          >
            {error}
          </Alert>
        )}

        <Card className="relative overflow-hidden border-none bg-white p-8 shadow-2xl md:p-12">
          {/* Subtle geometric pattern inside the card instead of page header */}
          <div
            className="absolute right-0 top-0 h-32 w-32 opacity-5"
            style={{
              backgroundImage: `url('https://www.transparenttextures.com/patterns/cubes.png')`,
            }}
          />

          <form onSubmit={handleSubmit} className="relative z-10 space-y-10">
            {/* Title Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#111]">
                  Headline
                </label>
                <span
                  className={`text-[9px] font-bold uppercase tracking-wider ${
                    formData.title.length > 50
                      ? "text-red-600"
                      : formData.title.length > 30
                        ? "text-amber-600"
                        : "text-slate-400"
                  }`}
                >
                  {formData.title.length}/50
                </span>
              </div>
              <Input
                type="text"
                placeholder="Enter an eye-catching title..."
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                error={formErrors.title}
                maxLength={200}
                className="border-b-2 border-t-0 border-x-0 rounded-none bg-transparent px-0 text-2xl font-black placeholder:text-slate-200 focus:border-[#7843e9]"
              />
            </div>

            {/* Content Textarea */}
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#111]">
                Story Body
              </label>
              <MarkdownEditor
                placeholder="Write your technical masterpiece here..."
                value={formData.content}
                onChange={(value) => handleChange("content", value)}
                error={formErrors.content}
                rows={12}
                className="min-h-[400px] border-2 border-slate-50 bg-[#fcfcfc] p-6 text-lg leading-relaxed focus:bg-white focus:border-[#7843e9]"
              />
            </div>

            {/* Action Bar */}
            <div className="flex flex-col gap-4 border-t border-slate-100 pt-8 md:flex-row">
              <Button
                type="submit"
                isLoading={isCreating}
                size="md"
                className="flex items-center justify-center gap-3 shadow-[0_10px_20px_rgba(120,67,233,0.3)]"
              >
                <PenTool size={18} strokeWidth={3} />
                Publish Now
              </Button>
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={() => navigate(ROUTES.BLOGS)}
                disabled={isCreating}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>

        {/* Themed Footer Quote */}
        <div className="mt-12 flex items-center justify-center gap-4 opacity-30">
          <div className="h-px w-12 bg-slate-400" />
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">
            Create. Scale. Impact.
          </p>
          <div className="h-px w-12 bg-slate-400" />
        </div>
      </div>
    </MainLayout>
  );
};
