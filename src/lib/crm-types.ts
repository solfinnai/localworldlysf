import { z } from 'zod';

// Business types
export const BusinessSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  category: z.string(),
  address: z.string(),
  neighborhood: z.string(),
  city: z.string().default('San Francisco'),
  phone: z.string().nullable(),
  website: z.string().url().nullable(),
  email: z.string().email().nullable(),
  social: z.object({
    instagram: z.string().url().nullable().optional(),
    facebook: z.string().url().nullable().optional(),
    twitter: z.string().url().nullable().optional(),
  }).optional(),
  rating: z.number().min(0).max(5).optional(),
  reviewCount: z.number().optional(),
  status: z.enum(['prospect', 'contacted', 'interviewing', 'featured', 'declined', 'unresponsive']).default('prospect'),
  notes: z.string().optional(),
  tags: z.array(z.string()).default([]),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Business = z.infer<typeof BusinessSchema>;

// Interview types
export const InterviewQuestionsSchema = z.object({
  q1: z.object({
    question: z.string(),
    prompt: z.string(),
  }),
  q2: z.object({
    question: z.string(),
    prompt: z.string(),
  }),
  q3: z.object({
    question: z.string(),
    prompt: z.string(),
  }),
  q4: z.object({
    question: z.string(),
    prompt: z.string(),
  }),
  q5: z.object({
    question: z.string(),
    prompt: z.string(),
  }),
});

export const INTERVIEW_QUESTIONS: z.infer<typeof InterviewQuestionsSchema> = {
  q1: {
    question: "Tell me about yourself and how [Business Name] came to be.",
    prompt: "Establishes founder's story and business origin. Often reveals unexpected paths, personal struggles, dreams.",
  },
  q2: {
    question: "What makes [Business Name] different from other places in San Francisco?",
    prompt: "Identifies unique value proposition and competitive edge. Creates opportunity for proprietary techniques, secret menu items, etc.",
  },
  q3: {
    question: "What's the most memorable moment you've had with a customer?",
    prompt: "Humanizes the business through emotional storytelling. Generates viral-worthy stories that readers share.",
  },
  q4: {
    question: "What do you want people to know about [neighborhood] that they probably don't?",
    prompt: "Ties business to community, establishes local expertise. Uncovers hidden gems, local history, community secrets.",
  },
  q5: {
    question: "If someone visits [Business Name] for the first time, what should they absolutely try/do?",
    prompt: "Actionable advice that drives conversions. Signature items, secret tips, insider knowledge.",
  },
};

export const InterviewResponseSchema = z.object({
  id: z.string(),
  businessId: z.string(),
  articleId: z.string().nullable(),
  responses: z.object({
    q1: z.string().optional(),
    q2: z.string().optional(),
    q3: z.string().optional(),
    q4: z.string().optional(),
    q5: z.string().optional(),
  }),
  images: z.array(z.string()).default([]),
  status: z.enum(['pending', 'received', 'in_review', 'approved', 'published', 'rejected']).default('pending'),
  receivedAt: z.string().nullable(),
  approvedAt: z.string().nullable(),
  notes: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type InterviewResponse = z.infer<typeof InterviewResponseSchema>;

// Outreach types
export const OutreachSchema = z.object({
  id: z.string(),
  businessId: z.string(),
  channel: z.enum(['email', 'instagram', 'facebook', 'linkedin', 'phone', 'in_person']),
  templateId: z.string().nullable(),
  status: z.enum(['draft', 'scheduled', 'sent', 'opened', 'clicked', 'replied', 'bounced', 'failed']).default('draft'),
  scheduledAt: z.string().nullable(),
  sentAt: z.string().nullable(),
  openedAt: z.string().nullable(),
  repliedAt: z.string().nullable(),
  error: z.string().nullable(),
  createdAt: z.string(),
});

export type Outreach = z.infer<typeof OutreachSchema>;

// Sponsorship types
export const SponsorshipSchema = z.object({
  id: z.string(),
  businessId: z.string(),
  tier: z.enum(['platinum', 'gold', 'silver', 'featured']),
  price: z.number(),
  billingCycle: z.enum(['one_time', 'monthly', 'quarterly', 'annual']).default('monthly'),
  startDate: z.string(),
  endDate: z.string().nullable(),
  status: z.enum(['active', 'paused', 'expired', 'cancelled']).default('active'),
  autoRenew: z.boolean().default(true),
  impressions: z.number().default(0),
  clicks: z.number().default(0),
  notes: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Sponsorship = z.infer<typeof SponsorshipSchema>;

// Ad types
export const AdPlacementSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(['display', 'native', 'sponsored_content', 'banner']),
  position: z.enum(['hero', 'sidebar', 'mid_article', 'below_content', 'footer']),
  pageContext: z.enum(['article', 'homepage', 'category', 'all']).default('all'),
  size: z.string().optional(),
  price: z.number(),
  status: z.enum(['active', 'paused', 'sold', 'available']).default('available'),
  advertiserId: z.string().nullable(),
  campaignId: z.string().nullable(),
  startsAt: z.string().nullable(),
  endsAt: z.string().nullable(),
  impressions: z.number().default(0),
  clicks: z.number().default(0),
  createdAt: z.string(),
});

export type AdPlacement = z.infer<typeof AdPlacementSchema>;

// Dashboard stats
export const DashboardStatsSchema = z.object({
  totalBusinesses: z.number(),
  businessesByStatus: z.record(z.string(), z.number()),
  totalArticles: z.number(),
  publishedArticles: z.number(),
  pendingInterviews: z.number(),
  activeSponsorships: z.number(),
  monthlyRevenue: z.number(),
  totalImpressions: z.number(),
  totalClicks: z.number(),
});

export type DashboardStats = z.infer<typeof DashboardStatsSchema>;
