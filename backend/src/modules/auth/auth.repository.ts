import { db } from "../../config/db";
import { User, CreateUserDto } from "./auth.types";

export class AuthRepository {
  async createUser(data: CreateUserDto): Promise<User> {
    const query = `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, name, email, password, created_at as "createdAt", updated_at as "updatedAt"
    `;

    const result = await db.query<User>(query, [
      data.name,
      data.email,
      data.password,
    ]);

    if (!result.rows[0]) {
      throw new Error("Failed to create user");
    }

    return result.rows[0];
  }

  async findByEmail(email: string): Promise<User | null> {
    const query = `
      SELECT id, name, email, password, created_at as "createdAt", updated_at as "updatedAt"
      FROM users
      WHERE email = $1
    `;

    const result = await db.query<User>(query, [email]);
    return result.rows[0] || null;
  }

  async findById(id: string): Promise<User | null> {
    const query = `
      SELECT id, name, email, password, created_at as "createdAt", updated_at as "updatedAt"
      FROM users
      WHERE id = $1
    `;

    const result = await db.query<User>(query, [id]);
    return result.rows[0] || null;
  }

  async emailExists(email: string): Promise<boolean> {
    const query = `
      SELECT EXISTS(SELECT 1 FROM users WHERE email = $1) as exists
    `;

    const result = await db.query<{ exists: boolean }>(query, [email]);
    return result.rows[0]?.exists || false;
  }
}
