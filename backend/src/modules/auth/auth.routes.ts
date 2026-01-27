import { Router } from "express";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthRepository } from "./auth.repository";
import { validateRequest } from "../../middlewares/validate.middleware";
import { authenticate } from "../../middlewares/auth.middleware";
import { authRateLimiter } from "../../middlewares/rateLimit.middleware";
import { registerSchema, loginSchema } from "./auth.schema";

const authRepository = new AuthRepository();
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

const router = Router();

router.post(
  "/register",
  authRateLimiter,
  validateRequest(registerSchema),
  authController.register,
);

router.post(
  "/login",
  authRateLimiter,
  validateRequest(loginSchema),
  authController.login,
);

router.get("/profile", authenticate, authController.getProfile);

export { router as authRoutes };
