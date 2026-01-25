import express, { Application } from "express";
import helmet from "helmet";
import cors from "cors";
import { authRoutes } from "./modules/auth/auth.routes";
import { blogRoutes } from "./modules/blog/blog.routes";
import { errorHandler, notFoundHandler } from "./middlewares/error.middleware";
import { globalRateLimiter } from "./middlewares/rateLimit.middleware";
import { logger } from "./utils/logger";

export const createApp = (): Application => {
  const app = express();

  // Security middlewares
  app.use(helmet());
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN || "*",
      credentials: true,
    }),
  );

  // Body parsing
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));

  // Rate limiting
  app.use(globalRateLimiter);

  // Request logging
  app.use((req, _res, next) => {
    logger.info(
      {
        method: req.method,
        url: req.url,
        ip: req.ip,
      },
      "Incoming request",
    );
    next();
  });

  // Health check
  app.get("/health", (_req, res) => {
    res.status(200).json({
      status: "success",
      message: "Server is running",
      timestamp: new Date().toISOString(),
    });
  });

  // API routes
  app.use("/api/auth", authRoutes);
  app.use("/api/blogs", blogRoutes);

  // Error handlers (must be last)
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
