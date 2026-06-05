require("dotenv").config();

const express   = require("express");
const cors      = require("cors");
const helmet    = require("helmet");
const morgan    = require("morgan");
const rateLimit = require("express-rate-limit");

const { sequelize }                           = require("./models");
const routes                                  = require("./routes");
const { errorHandler, notFoundHandler }       = require("./middleware/errorHandler");
const { port, clientUrl, nodeEnv, rateLimit: rlConfig } = require("./config");

const app = express();

// ── Security headers
app.use(helmet());

// ── CORS
app.use(
  cors({
    origin:       clientUrl,
    credentials:  true,
    methods:      ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ── Rate limiting
app.use(
  "/api",
  rateLimit({
    windowMs:        rlConfig.windowMs,
    max:             rlConfig.max,
    standardHeaders: true,
    legacyHeaders:   false,
    message: { success: false, message: "Too many requests, please try again later." },
  })
);

// ── Request logging
app.use(morgan(nodeEnv === "production" ? "combined" : "dev"));

// ── Body parsers
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// ── Health check
app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Pawan Business Portfolio API",
    version: "1.0.0",
    env:     nodeEnv,
  });
});

// ── API routes
app.use("/api", routes);

// ── 404 & global error handler (keep last)
app.use(notFoundHandler);
app.use(errorHandler);

// ── DB sync then start server
const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("✓ Database connected");

    // alter:true → auto-creates table if missing, adds new columns if schema changes
    await sequelize.sync({ alter: true });
    console.log("✓ Models synced (alter: true)");

    app.listen(port, () => {
      console.log(`✓ Server running on port ${port} [${nodeEnv}]`);
    });
  } catch (err) {
    console.error("✗ Failed to start server:", err.message);
    process.exit(1);
  }
};

start();
