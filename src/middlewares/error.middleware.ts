import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { AppError } from "../utils/errors";
import { logger } from "../utils/logger";
import { isDevelopment } from "../config/env";

interface ErrorResponse {
  status: "error";
  message: string;
  errors?: unknown;
  stack?: string;
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  logger.error(
    {
      err,
      url: req.url,
      method: req.method,
      body: req.body,
    },
    "Error occurred",
  );

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    const errorResponse: ErrorResponse = {
      status: "error",
      message: "Validation failed",
      errors: err.errors.map((e) => ({
        path: e.path.join("."),
        message: e.message,
      })),
    };
    res.status(400).json(errorResponse);
    return;
  }

  // Handle operational errors (AppError)
  if (err instanceof AppError) {
    const errorResponse: ErrorResponse = {
      status: "error",
      message: err.message,
    };

    if (isDevelopment) {
      errorResponse.stack = err.stack;
    }

    res.status(err.statusCode).json(errorResponse);
    return;
  }

  // Handle PostgreSQL errors
  if (err.name === "error" && "code" in err) {
    const pgError = err as { code: string; detail?: string };

    // Unique constraint violation
    if (pgError.code === "23505") {
      const errorResponse: ErrorResponse = {
        status: "error",
        message: "Resource already exists",
      };
      res.status(409).json(errorResponse);
      return;
    }

    // Foreign key violation
    if (pgError.code === "23503") {
      const errorResponse: ErrorResponse = {
        status: "error",
        message: "Referenced resource not found",
      };
      res.status(400).json(errorResponse);
      return;
    }
  }

  // Handle unknown errors
  const errorResponse: ErrorResponse = {
    status: "error",
    message: isDevelopment ? err.message : "Internal server error",
  };

  if (isDevelopment) {
    errorResponse.stack = err.stack;
  }

  res.status(500).json(errorResponse);
};

export const notFoundHandler = (
  req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  const errorResponse: ErrorResponse = {
    status: "error",
    message: `Route ${req.method} ${req.url} not found`,
  };
  res.status(404).json(errorResponse);
};
