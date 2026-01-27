import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../utils/errors";
import { JwtUtil } from "../utils/jwt";

export const authenticate = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedError("No token provided");
    }

    const token = authHeader.substring(7);

    try {
      const payload = JwtUtil.verify(token);
      req.user = {
        userId: payload.userId,
        email: payload.email,
      };
      next();
    } catch (error) {
      if (error instanceof Error) {
        throw new UnauthorizedError(error.message);
      }
      throw new UnauthorizedError("Invalid token");
    }
  } catch (error) {
    next(error);
  }
};
