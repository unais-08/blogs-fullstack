import bcrypt from "bcrypt";
import { bcryptConfig } from "../config/jwt";

export class HashUtil {
  static async hash(plain: string): Promise<string> {
    return bcrypt.hash(plain, bcryptConfig.rounds);
  }

  static async compare(plain: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plain, hashed);
  }
}
