import {
  createContext,
  useState,
  useCallback,
  type ReactNode,
  useMemo,
} from "react";
import {
  blogsApi,
  type CreateBlogPayload,
} from "@/features/blogs/api/blogs.api";
import type { BlogResponse } from "@/types/api";

// 1. Define the shape of the context state
interface BlogContextType {
  blogs: BlogResponse[];
  myBlogs: BlogResponse[];
  currentBlog: BlogResponse | null;
  isLoading: boolean;
  isCreating: boolean;
  error: string | null;
  fetchAllBlogs: (force?: boolean) => Promise<void>;
  fetchMyBlogs: (force?: boolean) => Promise<void>;
  fetchBlogById: (id: string, force?: boolean) => Promise<void>;
  createNewBlog: (payload: CreateBlogPayload) => Promise<BlogResponse>;
  invalidateCache: () => void;
}

// 2. Create the context with a default value
export const BlogContext = createContext<BlogContextType | undefined>(
  undefined,
);

// 3. Create the provider component
interface BlogProviderProps {
  children: ReactNode;
}

export function BlogProvider({ children }: BlogProviderProps) {
  const [blogs, setBlogs] = useState<BlogResponse[]>([]);
  const [myBlogs, setMyBlogs] = useState<BlogResponse[]>([]);
  const [currentBlog, setCurrentBlog] = useState<BlogResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Track if data has been fetched to avoid unnecessary refetches
  const [blogsFetched, setBlogsFetched] = useState(false);
  const [myBlogsFetched, setMyBlogsFetched] = useState(false);
  const [blogCache, setBlogCache] = useState<Map<string, BlogResponse>>(
    new Map(),
  );

  const fetchAllBlogs = useCallback(
    async (force = false) => {
      // Skip if already fetched and not forced
      if (blogsFetched && !force) {
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const data = await blogsApi.getBlogs();
        setBlogs(data);
        setBlogsFetched(true);

        // Update cache with fetched blogs
        const newCache = new Map(blogCache);
        data.forEach((blog) => newCache.set(blog.id, blog));
        setBlogCache(newCache);
      } catch (err) {
        setError("Failed to fetch blogs.");
      } finally {
        setIsLoading(false);
      }
    },
    [blogsFetched, blogCache],
  );

  const fetchMyBlogs = useCallback(
    async (force = false) => {
      // Skip if already fetched and not forced
      if (myBlogsFetched && !force) {
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const data = await blogsApi.getMyBlogs();
        setMyBlogs(data);
        setMyBlogsFetched(true);

        // Update cache with fetched blogs
        const newCache = new Map(blogCache);
        data.forEach((blog) => newCache.set(blog.id, blog));
        setBlogCache(newCache);
      } catch (err) {
        setError("Failed to fetch your blogs.");
      } finally {
        setIsLoading(false);
      }
    },
    [myBlogsFetched, blogCache],
  );

  const fetchBlogById = useCallback(
    async (id: string, force = false) => {
      // Check cache first
      if (!force && blogCache.has(id)) {
        setCurrentBlog(blogCache.get(id)!);
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const data = await blogsApi.getBlogById(id);
        setCurrentBlog(data);

        // Update cache
        const newCache = new Map(blogCache);
        newCache.set(id, data);
        setBlogCache(newCache);
      } catch (err) {
        setError("Failed to fetch blog details.");
      } finally {
        setIsLoading(false);
      }
    },
    [blogCache],
  );

  const createNewBlog = useCallback(
    async (payload: CreateBlogPayload): Promise<BlogResponse> => {
      setIsCreating(true);
      setError(null);
      try {
        const newBlog = await blogsApi.createBlog(payload);

        // Invalidate cache and refetch data
        setBlogsFetched(false);
        setMyBlogsFetched(false);
        await Promise.all([fetchAllBlogs(true), fetchMyBlogs(true)]);

        return newBlog;
      } catch (err) {
        setError("Failed to create blog.");
        throw err; // Re-throw to allow form error handling
      } finally {
        setIsCreating(false);
      }
    },
    [fetchMyBlogs, fetchAllBlogs],
  );

  // Function to manually invalidate cache (useful for updates/deletes)
  const invalidateCache = useCallback(() => {
    setBlogsFetched(false);
    setMyBlogsFetched(false);
    setBlogCache(new Map());
  }, []);

  // 4. Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      blogs,
      myBlogs,
      currentBlog,
      isLoading,
      isCreating,
      error,
      fetchAllBlogs,
      fetchMyBlogs,
      fetchBlogById,
      createNewBlog,
      invalidateCache,
    }),
    [
      blogs,
      myBlogs,
      currentBlog,
      isLoading,
      isCreating,
      error,
      fetchAllBlogs,
      fetchMyBlogs,
      fetchBlogById,
      createNewBlog,
      invalidateCache,
    ],
  );

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
}
