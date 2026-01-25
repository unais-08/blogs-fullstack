export interface Blog {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogWithAuthor extends Blog {
  authorName: string;
  authorEmail: string;
}

export interface CreateBlogDto {
  title: string;
  content: string;
  authorId: string;
}

export interface BlogResponse {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export const toBlogResponse = (blog: BlogWithAuthor): BlogResponse => ({
  id: blog.id,
  title: blog.title,
  content: blog.content,
  author: {
    id: blog.authorId,
    name: blog.authorName,
    email: blog.authorEmail,
  },
  createdAt: blog.createdAt,
  updatedAt: blog.updatedAt,
});
