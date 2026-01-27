import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const setupDatabase = async () => {
  // Connect to default postgres database
  const adminPool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: "postgres",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  try {
    const dbName = process.env.DB_NAME;

    // Check if database exists
    const result = await adminPool.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [dbName],
    );

    if (result.rows.length === 0) {
      console.log(`🔄 Creating database "${dbName}"...`);
      await adminPool.query(`CREATE DATABASE ${dbName}`);
      console.log(`✅ Database "${dbName}" created successfully`);
    } else {
      console.log(`ℹ️  Database "${dbName}" already exists`);
    }
  } catch (error) {
    console.error("❌ Database setup failed:", error);
    process.exit(1);
  } finally {
    await adminPool.end();
  }
};

setupDatabase();
