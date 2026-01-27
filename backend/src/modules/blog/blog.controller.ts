import { Request, Response, NextFunction } from "express";
import { BlogService } from "./blog.service";
import { CreateBlogDto } from "./blog.schema";

export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  createBlog = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      if (!req.user) {
        throw new Error("User not authenticated");
      }

      const data: CreateBlogDto = req.body;
      const blog = await this.blogService.createBlog({
        ...data,
        authorId: req.user.userId,
      });

      res.status(201).json({
        status: "success",
        data: blog,
      });
    } catch (error) {
      next(error);
    }
  };

  getBlogById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const blog = await this.blogService.getBlogById(id);

      res.status(200).json({
        status: "success",
        data: blog,
      });
    } catch (error) {
      next(error);
    }
  };

  getAllBlogs = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const blogs = await this.blogService.getAllBlogs();

      res.status(200).json({
        status: "success",
        data: blogs,
      });
    } catch (error) {
      next(error);
    }
  };

  getMyBlogs = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      if (!req.user) {
        throw new Error("User not authenticated");
      }

      const blogs = await this.blogService.getMyBlogs(req.user.userId);

      res.status(200).json({
        status: "success",
        data: blogs,
      });
    } catch (error) {
      next(error);
    }
  };
}
