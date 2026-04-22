-- Create RSVP submissions table (one per form submission)
CREATE TABLE IF NOT EXISTS rsvp_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  total_guests INTEGER NOT NULL
);

-- Create RSVP guests table (one per guest in a submission)
CREATE TABLE IF NOT EXISTS rsvp_guests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id UUID NOT NULL REFERENCES rsvp_submissions(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  meal_choice TEXT NOT NULL CHECK (meal_choice IN ('osso_bucco', 'gnocchis_pesto')),
  dietary_restrictions TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE rsvp_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE rsvp_guests ENABLE ROW LEVEL SECURITY;

-- Allow public insert (no auth required for wedding RSVP)
CREATE POLICY "Allow public insert on rsvp_submissions" ON rsvp_submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public insert on rsvp_guests" ON rsvp_guests
  FOR INSERT WITH CHECK (true);

-- Allow public select for confirmation purposes
CREATE POLICY "Allow public select on rsvp_submissions" ON rsvp_submissions
  FOR SELECT USING (true);

CREATE POLICY "Allow public select on rsvp_guests" ON rsvp_guests
  FOR SELECT USING (true);
