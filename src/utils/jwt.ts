import jwt, { SignOptions } from "jsonwebtoken";
import { jwtConfig } from "../config/jwt";

export interface JwtPayload {
  userId: string;
  email: string;
}

export class JwtUtil {
  static sign(payload: JwtPayload): string {
    const options: SignOptions = {
      expiresIn: parseInt(jwtConfig.expiresIn, 10),
      algorithm: jwtConfig.algorithm,
      issuer: jwtConfig.issuer,
      audience: jwtConfig.audience,
    };
    return jwt.sign(payload, jwtConfig.secret, options);
  }

  static verify(token: string): JwtPayload {
    try {
      const decoded = jwt.verify(token, jwtConfig.secret, {
        algorithms: [jwtConfig.algorithm],
        issuer: jwtConfig.issuer,
        audience: jwtConfig.audience,
      });

      return decoded as JwtPayload;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error("Token expired");
      }
      if (error instanceof jwt.JsonWebTokenError) {
        throw new Error("Invalid token");
      }
      throw error;
    }
  }

  static decode(token: string): JwtPayload | null {
    const decoded = jwt.decode(token);
    return decoded as JwtPayload | null;
  }
}
