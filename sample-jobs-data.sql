-- Sample Job Data for PilotPulse
-- Run this in your Supabase SQL Editor after running the main schema

-- Note: You'll need to replace 'YOUR_USER_ID' with your actual user ID from the profiles table
-- To get your user ID, run: SELECT id FROM profiles WHERE email = 'qdelarre@gmail.com';

-- First, let's create a variable for the posted_by user (you can replace this with your actual user ID)
-- For now, we'll use a placeholder that you'll need to update

-- Sample Pilot Jobs
INSERT INTO jobs (
  title,
  airline_name,
  airline_logo_url,
  contract_type,
  region,
  country,
  city,
  description,
  requirements,
  benefits,
  salary_min,
  salary_max,
  salary_currency,
  salary_period,
  tags,
  status,
  posted_at,
  is_featured
) VALUES
(
  'Qatar First Officer A320',
  'Qatar Airways',
  '/images/airlines/qatar.svg',
  'Full-time',
  'Middle East',
  'Qatar',
  'Doha',
  'Join Qatar Airways as a First Officer on the Airbus A320 fleet. This is an excellent opportunity to work with one of the world''s leading airlines, operating state-of-the-art aircraft on routes across the globe.',
  'Valid ATPL license, A320 type rating, Minimum 1500 hours total time, Clean record, English proficiency',
  'Tax-free salary, Accommodation provided, Annual leave tickets, Medical insurance, End of service benefits',
  85000,
  110000,
  'USD',
  'year',
  ARRAY['VIP', 'Tax Free', 'Accommodation'],
  'active',
  NOW() - INTERVAL '2 days',
  true
),
(
  'Talic Acean Captain B777',
  'Alifewite Airlines',
  '/logos/emirates.png',
  'Full-time',
  'Middle East',
  'UAE',
  'Dubai',
  'Experienced Captain position on Boeing 777 fleet. Lead our international operations with competitive compensation and excellent benefits package.',
  'ATPL with B777 type rating, 5000+ hours total time including 1000+ hours on type, Current Class 1 Medical',
  'Competitive salary package, Housing allowance, Annual tickets for family, Medical coverage, Pension plan',
  150000,
  200000,
  'USD',
  'year',
  ARRAY['PalDv', 'VIP', 'Mediam'],
  'active',
  NOW() - INTERVAL '5 days',
  true
),
(
  'Senior First Officer A350',
  'Singapore Airlines',
  '/logos/singapore.png',
  'Full-time',
  'Asia Pacific',
  'Singapore',
  'Singapore',
  'Singapore Airlines is seeking experienced First Officers for our Airbus A350 fleet. Join one of the world''s most awarded airlines.',
  'ATPL, A350 or similar wide-body type rating, 3000+ hours total time, Excellent safety record',
  'Attractive salary, Comprehensive benefits, Career progression, Training opportunities',
  95000,
  125000,
  'USD',
  'year',
  ARRAY['Virtuj', 'Medom'],
  'active',
  NOW() - INTERVAL '1 day',
  false
),
(
  'Qatar FIRC First Officer',
  'Qatar Airways',
  '/images/airlines/qatar.svg',
  'Contract',
  'Middle East',
  'Qatar',
  'Doha',
  'Flight Instructor Rating Course (FIRC) position for qualified First Officers. Excellent opportunity for career development.',
  'ATPL, Current type rating, Instructor rating preferred, 2000+ hours',
  'Competitive daily rate, Accommodation, Per diem allowance',
  NULL,
  NULL,
  'USD',
  NULL,
  ARRAY['Midiel', 'VIP', 'Contract'],
  'active',
  NOW() - INTERVAL '3 days',
  false
),
(
  'Captain A380',
  'Emirates',
  '/logos/emirates.png',
  'Full-time',
  'Middle East',
  'UAE',
  'Dubai',
  'Emirates is recruiting experienced Captains for the world''s largest A380 fleet. Fly to over 150 destinations worldwide.',
  'ATPL, Heavy jet experience, 7000+ hours total time, Command experience required',
  'Tax-free income, Furnished accommodation, Annual leave tickets, Premium medical insurance',
  180000,
  230000,
  'USD',
  'year',
  ARRAY['Aclae', 'Rapid'],
  'active',
  NOW() - INTERVAL '4 days',
  true
),
(
  'First Officer Boeing 787',
  'British Airways',
  '/logos/ba.png',
  'Full-time',
  'Europe',
  'United Kingdom',
  'London',
  'Join British Airways flying the advanced Boeing 787 Dreamliner on long-haul routes. Excellent career progression opportunities.',
  'ATPL, B787 or similar type rating, 2500+ hours, Right to work in UK',
  'Competitive salary, Pension scheme, Staff travel benefits, Annual bonus',
  75000,
  95000,
  'GBP',
  'year',
  ARRAY['Michelast'],
  'active',
  NOW() - INTERVAL '6 days',
  false
),
(
  'Pilot Training Cadet Program',
  'Lufthansa',
  '/logos/lufthansa.png',
  'Full-time',
  'Europe',
  'Germany',
  'Frankfurt',
  'Lufthansa Group Pilot Training - Ab Initio program. Full sponsorship for qualified candidates to obtain all licenses and type ratings.',
  'High school diploma, Good English and German, Pass aptitude tests, Medical Class 1',
  'Full training sponsorship, Guaranteed position upon completion, Competitive starting salary',
  NULL,
  NULL,
  'EUR',
  NULL,
  ARRAY['Training', 'Mediam'],
  'active',
  NOW() - INTERVAL '7 days',
  false
);

-- Sample Cabin Crew Jobs (add a few for variety)
INSERT INTO jobs (
  title,
  airline_name,
  airline_logo_url,
  contract_type,
  region,
  country,
  city,
  description,
  requirements,
  benefits,
  salary_min,
  salary_max,
  salary_currency,
  salary_period,
  tags,
  status,
  posted_at,
  is_featured
) VALUES
(
  'Qatar First Officer Cabin Crew',
  'Dunitain Airways',
  '/images/airlines/qatar.svg',
  'Full-time',
  'Middle East',
  'Qatar',
  'Doha',
  'Join our award-winning cabin crew team. Deliver exceptional service on our global network.',
  'Minimum age 21, Minimum height 160cm (female) / 170cm (male), Fluent English, Excellent customer service skills',
  'Tax-free salary, Accommodation provided, Annual leave tickets, Medical insurance',
  35000,
  45000,
  'USD',
  'year',
  ARRAY['Conpeact', 'UEw', 'VIP'],
  'active',
  NOW() - INTERVAL '3 days',
  false
),
(
  'Flight Attendant - International',
  'Delta Air Lines',
  '/logos/delta.png',
  'Full-time',
  'Americas',
  'United States',
  'Atlanta',
  'Delta is hiring Flight Attendants for our international fleet. Provide world-class service to our customers.',
  'High school diploma, Fluent English, Customer service experience, Able to travel internationally',
  'Competitive salary, Flight benefits, 401k matching, Medical coverage',
  40000,
  60000,
  'USD',
  'year',
  ARRAY['Evrope', 'Midlest'],
  'active',
  NOW() - INTERVAL '5 days',
  false
);

-- Update airlines logos to match our PNG files
UPDATE featured_airlines SET logo_url = '/logos/emirates.png' WHERE name = 'Emirates';
UPDATE featured_airlines SET logo_url = '/images/airlines/qatar.svg' WHERE name = 'Qatar Airways';
UPDATE featured_airlines SET logo_url = '/logos/singapore.png' WHERE name = 'Singapore Airlines';
UPDATE featured_airlines SET logo_url = '/logos/lufthansa.png' WHERE name = 'Lufthansa';
UPDATE featured_airlines SET logo_url = '/logos/ba.png' WHERE name = 'British Airways';
UPDATE featured_airlines SET logo_url = '/logos/delta.png' WHERE name = 'Delta Air Lines';

-- Grant permissions (if needed)
-- Note: RLS policies should already be set up from main schema
