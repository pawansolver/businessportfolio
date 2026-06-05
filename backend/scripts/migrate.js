require("dotenv").config();
const { Client } = require("pg");
const fs   = require("fs");
const path = require("path");

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL || DATABASE_URL.includes("your_")) {
  console.error("❌  DATABASE_URL missing in backend/.env");
  console.error("    Supabase Dashboard → Settings → Database → Connection string → URI");
  process.exit(1);
}

const run = async () => {
  const client = new Client({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    console.log("✓ Connected to Supabase PostgreSQL");

    const migrationsDir = path.join(__dirname, "..", "migrations");
    const files = fs.readdirSync(migrationsDir)
      .filter((f) => f.endsWith(".sql"))
      .sort();

    for (const file of files) {
      const sql = fs.readFileSync(path.join(migrationsDir, file), "utf8");
      console.log(`\n⟶ Running: ${file}`);
      await client.query(sql);
      console.log(`✓ Done:    ${file}`);
    }

    console.log("\n✅ All migrations completed!");
  } catch (err) {
    console.error("\n❌ Migration failed:", err.message);
    process.exit(1);
  } finally {
    await client.end();
  }
};

run();
