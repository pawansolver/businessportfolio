import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

// ── Valid service values (matches Contact.tsx dropdownServices) ───────────────
const VALID_SERVICES = [
  "web-dev",
  "ecommerce",
  "mobile-app",
  "ui-ux",
  "saas-software",
  "digital-marketing",
  "graphic-branding",
  "maintenance-support",
];

// ── Simple in-memory rate limiter (5 submissions per IP per 15 mins) ─────────
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function getRealIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const WINDOW = 15 * 60 * 1000; // 15 minutes
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW });
    return false;
  }
  entry.count += 1;
  return entry.count > 5;
}

// ── POST /api/contact ─────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const ip = getRealIp(req);

  // 1. Rate limit
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, message: "Too many requests. Please try again in 15 minutes." },
      { status: 429 }
    );
  }

  // 2. Parse body
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body." },
      { status: 400 }
    );
  }

  const {
    name,
    email,
    phone = "",
    service = null,
    message,
  } = body as {
    name?: string;
    email?: string;
    phone?: string;
    service?: string | null;
    message?: string;
  };

  // 3. Validation
  const errors: { field: string; message: string }[] = [];

  if (!name || typeof name !== "string" || name.trim().length < 2)
    errors.push({ field: "name", message: "Name must be at least 2 characters." });

  if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
    errors.push({ field: "email", message: "A valid email address is required." });

  if (!message || typeof message !== "string" || message.trim().length < 5)
    errors.push({ field: "message", message: "Message must be at least 5 characters." });

  if (service && !VALID_SERVICES.includes(service as string))
    errors.push({ field: "service", message: "Invalid service selected." });

  if (errors.length > 0) {
    return NextResponse.json(
      { success: false, message: "Validation failed.", errors },
      { status: 422 }
    );
  }

  // 4. Insert into PostgreSQL (same table that Express backend used)
  try {
    const result = await pool.query(
      `INSERT INTO contacts
         (id, name, email, phone, service, message, status, notes, ip_address, created_at, updated_at)
       VALUES
         (gen_random_uuid(), $1, $2, $3, $4, $5, 'new', '', $6, NOW(), NOW())
       RETURNING *`,
      [
        name!.trim(),
        email!.trim().toLowerCase(),
        typeof phone === "string" ? phone.trim() : "",
        service || null,
        message!.trim(),
        ip,
      ]
    );

    const contact = result.rows[0];

    return NextResponse.json(
      { success: true, message: "Contact inquiry submitted successfully", data: contact },
      { status: 201 }
    );
  } catch (err) {
    console.error("[/api/contact] DB insert error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to save your message. Please try again." },
      { status: 500 }
    );
  }
}
