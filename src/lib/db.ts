import { Pool } from "pg";

if (!process.env.DATABASE_URL) {
  throw new Error("Missing DATABASE_URL environment variable.");
}

/**
 * PostgreSQL connection pool — server-side only.
 * Use this ONLY in Next.js API routes (never in client components).
 *
 * Vercel serverless tip: pool.max = 1 avoids connection limit issues
 * since each function invocation is isolated.
 */
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for Supabase hosted PostgreSQL
  },
  max: 1,             // 1 connection per serverless invocation
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 5000,
});

export default pool;
