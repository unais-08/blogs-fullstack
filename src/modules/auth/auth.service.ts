import { AuthRepository } from "./auth.repository";
import {
  CreateUserDto,
  LoginResponse,
  toUserResponse,
  User,
} from "./auth.types";
import { HashUtil } from "../../utils/hash";
import { JwtUtil } from "../../utils/jwt";
import {
  ConflictError,
  UnauthorizedError,
  NotFoundError,
} from "../../utils/errors";
import { logger } from "../../utils/logger";

export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async register(data: CreateUserDto): Promise<LoginResponse> {
    // Check if user already exists
    const existingUser = await this.authRepository.findByEmail(data.email);
    if (existingUser) {
      throw new ConflictError("User with this email already exists");
    }

    // Hash password
    const hashedPassword = await HashUtil.hash(data.password);

    // Create user
    const user = await this.authRepository.createUser({
      ...data,
      password: hashedPassword,
    });

    logger.info({ userId: user.id, email: user.email }, "User registered");

    // Generate token
    const token = JwtUtil.sign({
      userId: user.id,
      email: user.email,
    });

    return {
      user: toUserResponse(user),
      token,
    };
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    // Find user by email
    const user = await this.authRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedError("Invalid email or password");
    }

    // Verify password
    const isPasswordValid = await HashUtil.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError("Invalid email or password");
    }

    logger.info({ userId: user.id, email: user.email }, "User logged in");

    // Generate token
    const token = JwtUtil.sign({
      userId: user.id,
      email: user.email,
    });

    return {
      user: toUserResponse(user),
      token,
    };
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.authRepository.findById(id);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    return user;
  }
}
