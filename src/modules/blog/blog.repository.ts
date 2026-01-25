import { db } from "../../config/db";
import { BlogWithAuthor, CreateBlogDto } from "./blog.types";

export class BlogRepository {
  async createBlog(data: CreateBlogDto): Promise<BlogWithAuthor> {
    // Since we need to join, let's use a different approach
    const insertQuery = `
      INSERT INTO blogs (title, content, author_id)
      VALUES ($1, $2, $3)
      RETURNING id
    `;

    const insertResult = await db.query<{ id: string }>(insertQuery, [
      data.title,
      data.content,
      data.authorId,
    ]);

    const blogId = insertResult.rows[0]?.id;
    if (!blogId) {
      throw new Error("Failed to create blog");
    }

    const blog = await this.findById(blogId);
    if (!blog) {
      throw new Error("Failed to retrieve created blog");
    }

    return blog;
  }

  async findById(id: string): Promise<BlogWithAuthor | null> {
    const query = `
      SELECT 
        blogs.id,
        blogs.title,
        blogs.content,
        blogs.author_id as "authorId",
        blogs.created_at as "createdAt",
        blogs.updated_at as "updatedAt",
        users.name as "authorName",
        users.email as "authorEmail"
      FROM blogs
      INNER JOIN users ON blogs.author_id = users.id
      WHERE blogs.id = $1
    `;

    const result = await db.query<BlogWithAuthor>(query, [id]);
    return result.rows[0] || null;
  }

  async findAll(): Promise<BlogWithAuthor[]> {
    const query = `
      SELECT 
        blogs.id,
        blogs.title,
        blogs.content,
        blogs.author_id as "authorId",
        blogs.created_at as "createdAt",
        blogs.updated_at as "updatedAt",
        users.name as "authorName",
        users.email as "authorEmail"
      FROM blogs
      INNER JOIN users ON blogs.author_id = users.id
      ORDER BY blogs.created_at DESC
    `;

    const result = await db.query<BlogWithAuthor>(query);
    return result.rows;
  }

  async findByAuthorId(authorId: string): Promise<BlogWithAuthor[]> {
    const query = `
      SELECT 
        blogs.id,
        blogs.title,
        blogs.content,
        blogs.author_id as "authorId",
        blogs.created_at as "createdAt",
        blogs.updated_at as "updatedAt",
        users.name as "authorName",
        users.email as "authorEmail"
      FROM blogs
      INNER JOIN users ON blogs.author_id = users.id
      WHERE blogs.author_id = $1
      ORDER BY blogs.created_at DESC
    `;

    const result = await db.query<BlogWithAuthor>(query, [authorId]);
    return result.rows;
  }
}
