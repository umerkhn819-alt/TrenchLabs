-- =========================================================================
-- TrenchLabs Supabase Database Migration & Schema Setup Script
-- Paste this script directly into your Supabase SQL Editor to initialize.
-- =========================================================================

-- Enable UUID generation extension if not active
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. CONTACT SUBMISSIONS
CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Responded')),
    response_text TEXT
);

-- 2. CAREERS APPLICATIONS
CREATE TABLE IF NOT EXISTS careers_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    github TEXT NOT NULL,
    compensation TEXT NOT NULL,
    role TEXT NOT NULL,
    experience TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Under Review' CHECK (status IN ('Under Review', 'Interview Scheduled', 'Accepted', 'Rejected')),
    response_text TEXT
);

-- 3. INTERNSHIP APPLICATIONS
CREATE TABLE IF NOT EXISTS internship_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    university TEXT NOT NULL,
    github TEXT NOT NULL,
    statement TEXT NOT NULL,
    track TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Interview Scheduled', 'Accepted', 'Rejected')),
    response_text TEXT
);

-- 4. CONSULTATION BOOKINGS
CREATE TABLE IF NOT EXISTS consultation_bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    company TEXT NOT NULL,
    contact TEXT NOT NULL,
    email TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Scheduled' CHECK (status IN ('Scheduled', 'Completed', 'Cancelled')),
    meeting_link TEXT NOT NULL
);

-- 5. TELEMETRY LOGS
CREATE TABLE IF NOT EXISTS telemetry_logs (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    timestamp TEXT NOT NULL,
    query TEXT NOT NULL,
    status TEXT NOT NULL,
    latency TEXT NOT NULL
);

-- =========================================================================
-- INDEX OPTIMIZATIONS
-- =========================================================================
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_careers_status ON careers_applications(status);
CREATE INDEX IF NOT EXISTS idx_interns_status ON internship_applications(status);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON consultation_bookings(status);

-- =========================================================================
-- INITIAL SEED RECORDS FOR TESTING
-- =========================================================================
INSERT INTO contact_submissions (name, email, message, status) VALUES 
('Sarah Connor', 'sarah@skynet.resistance', 'We need automated security monitoring pipelines to secure critical databases.', 'Pending')
ON CONFLICT DO NOTHING;

INSERT INTO careers_applications (name, email, github, compensation, role, experience, status) VALUES 
('Thomas Anderson', 'neo@matrix.io', 'https://github.com/neo-matrix', '$5,000 / mo', 'Core Security Systems Specialist', 'Expertise in virtual container layers and firewall evasion.', 'Under Review')
ON CONFLICT DO NOTHING;

INSERT INTO internship_applications (name, email, university, github, statement, track, status) VALUES 
('John Doe', 'john.doe@mit.edu', 'https://github.com/johndoemit', 'N/A', 'Looking to build state-of-the-art SaaS projects in a fast-paced team.', 'AI & Automation Intern', 'Pending')
ON CONFLICT DO NOTHING;
