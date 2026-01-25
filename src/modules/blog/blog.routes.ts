import { Router } from "express";
import { BlogController } from "./blog.controller";
import { BlogService } from "./blog.service";
import { BlogRepository } from "./blog.repository";
import { validateRequest } from "../../middlewares/validate.middleware";
import { authenticate } from "../../middlewares/auth.middleware";
import { createBlogSchema } from "./blog.schema";

const blogRepository = new BlogRepository();
const blogService = new BlogService(blogRepository);
const blogController = new BlogController(blogService);

const router = Router();

// Public routes
router.get("/", blogController.getAllBlogs);
router.get("/:id", blogController.getBlogById);

// Protected routes
router.post(
  "/",
  authenticate,
  validateRequest(createBlogSchema),
  blogController.createBlog,
);

router.get("/my/blogs", authenticate, blogController.getMyBlogs);

export { router as blogRoutes };
