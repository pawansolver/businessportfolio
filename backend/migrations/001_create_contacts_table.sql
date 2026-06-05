-- ============================================================
-- Migration: 001_create_contacts_table
-- Table: contacts
-- Fields match Contact form UI (name, email, phone, service, message)
-- ============================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Service types (matches frontend dropdownServices)
DO $$ BEGIN
  CREATE TYPE service_type AS ENUM (
    'web-dev',
    'ecommerce',
    'mobile-app',
    'ui-ux',
    'saas-software',
    'digital-marketing',
    'graphic-branding',
    'maintenance-support'
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Status types
DO $$ BEGIN
  CREATE TYPE contact_status AS ENUM ('new', 'read', 'replied', 'archived');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id          UUID            DEFAULT gen_random_uuid() PRIMARY KEY,
  name        VARCHAR(100)    NOT NULL,
  email       VARCHAR(255)    NOT NULL,
  phone       VARCHAR(20)     DEFAULT '',
  service     service_type,
  message     TEXT            NOT NULL,
  status      contact_status  DEFAULT 'new',
  notes       TEXT            DEFAULT '',
  ip_address  VARCHAR(45)     DEFAULT '',
  created_at  TIMESTAMPTZ     DEFAULT NOW(),
  updated_at  TIMESTAMPTZ     DEFAULT NOW()
);

-- Auto-update updated_at on row change
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS contacts_updated_at ON contacts;
CREATE TRIGGER contacts_updated_at
  BEFORE UPDATE ON contacts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Indexes for fast queries
CREATE INDEX IF NOT EXISTS idx_contacts_status     ON contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_service    ON contacts(service);
CREATE INDEX IF NOT EXISTS idx_contacts_email      ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);

-- Row Level Security
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Allow service role (backend) full access
CREATE POLICY "service_role_full_access" ON contacts
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Public can only INSERT (submit form) — no reads without auth
CREATE POLICY "public_can_insert" ON contacts
  FOR INSERT
  TO anon
  WITH CHECK (true);
