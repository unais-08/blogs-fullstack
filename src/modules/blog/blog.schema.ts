import { z } from "zod";

export const createBlogSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(500),
  content: z.string().min(10, "Content must be at least 10 characters"),
});

export const getBlogByIdSchema = z.object({
  id: z.string().uuid("Invalid blog ID format"),
});

export type CreateBlogDto = z.infer<typeof createBlogSchema>;
export type GetBlogByIdDto = z.infer<typeof getBlogByIdSchema>;
