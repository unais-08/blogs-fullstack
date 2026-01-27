import { createApp } from "./app";
import { env } from "./config/env";
import { db } from "./config/db";
import { logger } from "./utils/logger";

const startServer = async (): Promise<void> => {
  try {
    // Test database connection
    const isDbConnected = await db.ping();
    if (!isDbConnected) {
      throw new Error("Failed to connect to database");
    }
    logger.info("✅ Database connection established");

    // Create Express app
    const app = createApp();

    // Start server
    const server = app.listen(env.PORT, () => {
      logger.info(
        {
          port: env.PORT,
          env: env.NODE_ENV,
        },
        `🚀 Server is running on port ${env.PORT}`,
      );
    });

    // Graceful shutdown
    const shutdown = async (signal: string) => {
      logger.info(`${signal} received, starting graceful shutdown`);

      server.close(async () => {
        logger.info("HTTP server closed");

        await db.close();
        logger.info("Database connection closed");

        process.exit(0);
      });

      // Force shutdown after 10 seconds
      setTimeout(() => {
        logger.error("Forced shutdown after timeout");
        process.exit(1);
      }, 10000);
    };

    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT", () => shutdown("SIGINT"));

    // Handle unhandled rejections
    process.on("unhandledRejection", (reason, promise) => {
      logger.error(
        {
          reason,
          promise,
        },
        "Unhandled rejection",
      );
    });

    process.on("uncaughtException", (error) => {
      logger.error(
        {
          err: error,
        },
        "Uncaught exception",
      );
      process.exit(1);
    });
  } catch (error) {
    logger.error({ err: error }, "Failed to start server");
    process.exit(1);
  }
};

startServer();
