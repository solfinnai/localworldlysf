-- LocalWorld Spotlight Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Businesses table
CREATE TABLE businesses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT,
  address TEXT,
  neighborhood TEXT,
  city TEXT DEFAULT 'San Francisco',
  phone TEXT,
  website TEXT,
  email TEXT,
  social JSONB DEFAULT '{}',
  rating DECIMAL(2,1),
  review_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'prospect',
  tags TEXT[] DEFAULT '{}',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Articles table
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  published_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  read_time INTEGER DEFAULT 5,
  featured BOOLEAN DEFAULT FALSE,
  sponsored BOOLEAN DEFAULT FALSE,
  hero_image JSONB,
  hero_caption TEXT,
  content JSONB DEFAULT '[]',
  primary_business_id UUID REFERENCES businesses(id),
  meta_title TEXT,
  meta_description TEXT,
  author JSONB DEFAULT '{}',
  view_count INTEGER DEFAULT 0,
  share_count INTEGER DEFAULT 0,
  bookmark_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Interviews table
CREATE TABLE interviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID REFERENCES businesses(id),
  article_id UUID REFERENCES articles(id),
  responses JSONB DEFAULT '{}',
  images TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'pending',
  received_at TIMESTAMPTZ,
  approved_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Outreach table
CREATE TABLE outreach (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID REFERENCES businesses(id),
  channel TEXT DEFAULT 'email',
  template_id TEXT,
  status TEXT DEFAULT 'draft',
  scheduled_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  opened_at TIMESTAMPTZ,
  replied_at TIMESTAMPTZ,
  error TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sponsorships table
CREATE TABLE sponsorships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID REFERENCES businesses(id),
  tier TEXT DEFAULT 'silver',
  price DECIMAL(10,2) NOT NULL,
  billing_cycle TEXT DEFAULT 'monthly',
  start_date DATE,
  end_date DATE,
  status TEXT DEFAULT 'active',
  auto_renew BOOLEAN DEFAULT TRUE,
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ad placements table
CREATE TABLE ad_placements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type TEXT DEFAULT 'display',
  position TEXT,
  page_context TEXT DEFAULT 'all',
  size TEXT,
  price DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'available',
  advertiser_id UUID,
  campaign_id UUID,
  starts_at TIMESTAMPTZ,
  ends_at TIMESTAMPTZ,
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_businesses_status ON businesses(status);
CREATE INDEX idx_businesses_category ON businesses(category);
CREATE INDEX idx_articles_category ON articles(category);
CREATE INDEX idx_articles_published ON articles(published_at);
CREATE INDEX idx_interviews_status ON interviews(status);
CREATE INDEX idx_outreach_status ON outreach(status);
CREATE INDEX idx_sponsorships_status ON sponsorships(status);

-- Enable Row Level Security (optional - comment out if not needed)
-- ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE interviews ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE outreach ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE sponsorships ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE ad_placements ENABLE ROW LEVEL SECURITY;
