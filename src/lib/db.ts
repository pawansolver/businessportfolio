import { Pool } from "pg";

if (!process.env.DATABASE_URL) {
  throw new Error("Missing DATABASE_URL environment variable.");
}

/**
 * PostgreSQL connection pool — server-side only.
 * Use this ONLY in Next.js API routes (never in client components).
 *
 * Vercel serverless: pool.max = 1 avoids connection limit issues.
 * For Supabase on Vercel, use the Connection Pooler URL (port 6543)
 * from Supabase Dashboard → Settings → Database → Connection Pooling → Transaction mode.
 */
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for Supabase hosted PostgreSQL
  },
  max: 1,                        // 1 connection per serverless invocation
  idleTimeoutMillis: 30000,      // close idle connections after 30s
  connectionTimeoutMillis: 10000, // 10s timeout for Vercel cold starts
  allowExitOnIdle: true,         // allow process to exit when pool is idle
});

export default pool;
