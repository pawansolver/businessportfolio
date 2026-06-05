const { createClient } = require("@supabase/supabase-js");

const supabaseUrl        = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey || supabaseServiceKey.includes("your_")) {
  console.warn("⚠  Supabase credentials missing — set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in backend/.env");
}

// Service role client — bypasses RLS (backend-only, never expose to frontend)
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { persistSession: false },
});

module.exports = supabase;
