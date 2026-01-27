import { BlogRepository } from "./blog.repository";
import { BlogResponse, CreateBlogDto, toBlogResponse } from "./blog.types";
import { NotFoundError } from "../../utils/errors";
import { logger } from "../../utils/logger";

export class BlogService {
  constructor(private readonly blogRepository: BlogRepository) {}

  async createBlog(data: CreateBlogDto): Promise<BlogResponse> {
    const blog = await this.blogRepository.createBlog(data);

    logger.info(
      { blogId: blog.id, authorId: blog.authorId, title: blog.title },
      "Blog created",
    );

    return toBlogResponse(blog);
  }

  async getBlogById(id: string): Promise<BlogResponse> {
    const blog = await this.blogRepository.findById(id);

    if (!blog) {
      throw new NotFoundError("Blog not found");
    }

    return toBlogResponse(blog);
  }

  async getAllBlogs(): Promise<BlogResponse[]> {
    const blogs = await this.blogRepository.findAll();
    return blogs.map(toBlogResponse);
  }

  async getBlogsByAuthorId(authorId: string): Promise<BlogResponse[]> {
    const blogs = await this.blogRepository.findByAuthorId(authorId);
    return blogs.map(toBlogResponse);
  }

  async getMyBlogs(authorId: string): Promise<BlogResponse[]> {
    const blogs = await this.blogRepository.findByAuthorId(authorId);
    return blogs.map(toBlogResponse);
  }
}
