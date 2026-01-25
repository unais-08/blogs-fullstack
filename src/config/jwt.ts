import { env } from "./env";

export const jwtConfig = {
  secret: env.JWT_SECRET,
  expiresIn: env.JWT_EXPIRES_IN,
  algorithm: "HS256" as const,
  issuer: "blog-api",
  audience: "blog-users",
};

export const bcryptConfig = {
  rounds: env.BCRYPT_ROUNDS,
};
