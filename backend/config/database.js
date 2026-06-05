const { Sequelize } = require("sequelize");

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL || DATABASE_URL.includes("your_")) {
  console.warn("⚠  DATABASE_URL not set — Sequelize will not connect.");
  console.warn("   Dashboard → Settings → Database → Connection string → URI");
}

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: process.env.NODE_ENV === "development"
    ? (msg) => console.log(`[SQL] ${msg}`)
    : false,
});

module.exports = sequelize;
