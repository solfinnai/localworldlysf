import { getSupabase, isSupabaseConfigured } from './client';
import { Business, InterviewResponse, Outreach, Sponsorship, AdPlacement } from '@/lib/crm-types';

export interface DbBusiness {
  id: string;
  name: string;
  slug: string;
  category: string | null;
  address: string | null;
  neighborhood: string | null;
  city: string;
  phone: string | null;
  website: string | null;
  email: string | null;
  social: { instagram?: string; facebook?: string };
  rating: number | null;
  review_count: number;
  status: Business['status'];
  tags: string[];
  notes: string | null;
  created_at: string;
  updated_at: string;
}

function toBusiness(row: DbBusiness): Business {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    category: row.category || '',
    address: row.address || '',
    neighborhood: row.neighborhood || '',
    city: row.city,
    phone: row.phone,
    website: row.website,
    email: row.email,
    social: row.social || { instagram: '', facebook: '' },
    rating: row.rating || 0,
    reviewCount: row.review_count,
    status: row.status,
    tags: row.tags || [],
    notes: row.notes || undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function toDbBusiness(business: Partial<Business>): Partial<DbBusiness> {
  return {
    name: business.name,
    slug: business.slug,
    category: business.category,
    address: business.address,
    neighborhood: business.neighborhood,
    city: business.city || 'San Francisco',
    phone: business.phone,
    website: business.website,
    email: business.email,
    social: business.social ? {
      instagram: business.social.instagram || undefined,
      facebook: business.social.facebook || undefined,
    } : undefined,
    rating: business.rating,
    review_count: business.reviewCount,
    status: business.status,
    tags: business.tags,
    notes: business.notes,
  };
}

export const db = {
  isConfigured: isSupabaseConfigured,

  businesses: {
    async getAll(): Promise<Business[]> {
      if (!isSupabaseConfigured) return [];
      const supabase = getSupabase();
      if (!supabase) return [];
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) { console.error('DB error:', error); return []; }
      return (data || []).map(toBusiness);
    },

    async getById(id: string): Promise<Business | null> {
      if (!isSupabaseConfigured) return null;
      const supabase = getSupabase();
      if (!supabase) return null;
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('id', id)
        .single();
      if (error) return null;
      return toBusiness(data);
    },

    async create(business: Omit<Business, 'id' | 'createdAt' | 'updatedAt'>): Promise<Business | null> {
      if (!isSupabaseConfigured) return null;
      const supabase = getSupabase();
      if (!supabase) return null;
      const { data, error } = await supabase
        .from('businesses')
        .insert(toDbBusiness(business))
        .select()
        .single();
      if (error) { console.error('DB error:', error); return null; }
      return toBusiness(data);
    },

    async update(id: string, updates: Partial<Business>): Promise<Business | null> {
      if (!isSupabaseConfigured) return null;
      const supabase = getSupabase();
      if (!supabase) return null;
      const { data, error } = await supabase
        .from('businesses')
        .update({ ...toDbBusiness(updates), updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      if (error) { console.error('DB error:', error); return null; }
      return toBusiness(data);
    },

    async delete(id: string): Promise<boolean> {
      if (!isSupabaseConfigured) return false;
      const supabase = getSupabase();
      if (!supabase) return false;
      const { error } = await supabase
        .from('businesses')
        .delete()
        .eq('id', id);
      return !error;
    },
  },

  interviews: {
    async getAll(): Promise<InterviewResponse[]> {
      if (!isSupabaseConfigured) return [];
      const supabase = getSupabase();
      if (!supabase) return [];
      const { data, error } = await supabase
        .from('interviews')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) return [];
      return (data || []).map(row => ({
        id: row.id,
        businessId: row.business_id,
        articleId: row.article_id,
        responses: row.responses,
        images: row.images || [],
        status: row.status,
        receivedAt: row.received_at,
        approvedAt: row.approved_at,
        notes: row.notes,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      }));
    },

    async create(interview: Omit<InterviewResponse, 'id' | 'createdAt' | 'updatedAt'>): Promise<InterviewResponse | null> {
      if (!isSupabaseConfigured) return null;
      const supabase = getSupabase();
      if (!supabase) return null;
      const { data, error } = await supabase
        .from('interviews')
        .insert({
          business_id: interview.businessId,
          article_id: interview.articleId,
          responses: interview.responses,
          images: interview.images,
          status: interview.status,
          received_at: interview.receivedAt,
          approved_at: interview.approvedAt,
          notes: interview.notes,
        })
        .select()
        .single();
      if (error) return null;
      return {
        id: data.id,
        businessId: data.business_id,
        articleId: data.article_id,
        responses: data.responses,
        images: data.images || [],
        status: data.status,
        receivedAt: data.received_at,
        approvedAt: data.approved_at,
        notes: data.notes,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      };
    },

    async updateStatus(id: string, status: InterviewResponse['status']): Promise<boolean> {
      if (!isSupabaseConfigured) return false;
      const supabase = getSupabase();
      if (!supabase) return false;
      const updates: Record<string, string> = { status, updated_at: new Date().toISOString() };
      if (status === 'approved') updates.approved_at = new Date().toISOString();
      const { error } = await supabase
        .from('interviews')
        .update(updates)
        .eq('id', id);
      return !error;
    },
  },

  outreach: {
    async getAll(): Promise<Outreach[]> {
      if (!isSupabaseConfigured) return [];
      const supabase = getSupabase();
      if (!supabase) return [];
      const { data, error } = await supabase
        .from('outreach')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) return [];
      return (data || []).map(row => ({
        id: row.id,
        businessId: row.business_id,
        channel: row.channel,
        templateId: row.template_id,
        status: row.status,
        scheduledAt: row.scheduled_at,
        sentAt: row.sent_at,
        openedAt: row.opened_at,
        repliedAt: row.replied_at,
        error: row.error,
        createdAt: row.created_at,
      }));
    },

    async create(outreach: Omit<Outreach, 'id' | 'createdAt'>): Promise<Outreach | null> {
      if (!isSupabaseConfigured) return null;
      const supabase = getSupabase();
      if (!supabase) return null;
      const { data, error } = await supabase
        .from('outreach')
        .insert({
          business_id: outreach.businessId,
          channel: outreach.channel,
          template_id: outreach.templateId,
          status: outreach.status,
          scheduled_at: outreach.scheduledAt,
          sent_at: outreach.sentAt,
          opened_at: outreach.openedAt,
          replied_at: outreach.repliedAt,
          error: outreach.error,
        })
        .select()
        .single();
      if (error) return null;
      return {
        id: data.id,
        businessId: data.business_id,
        channel: data.channel,
        templateId: data.template_id,
        status: data.status,
        scheduledAt: data.scheduled_at,
        sentAt: data.sent_at,
        openedAt: data.opened_at,
        repliedAt: data.replied_at,
        error: data.error,
        createdAt: data.created_at,
      };
    },
  },

  sponsorships: {
    async getAll(): Promise<Sponsorship[]> {
      if (!isSupabaseConfigured) return [];
      const supabase = getSupabase();
      if (!supabase) return [];
      const { data, error } = await supabase
        .from('sponsorships')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) return [];
      return (data || []).map(row => ({
        id: row.id,
        businessId: row.business_id,
        tier: row.tier,
        price: row.price,
        billingCycle: row.billing_cycle,
        startDate: row.start_date,
        endDate: row.end_date,
        status: row.status,
        autoRenew: row.auto_renew,
        impressions: row.impressions,
        clicks: row.clicks,
        notes: row.notes,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      }));
    },

    async create(sponsorship: Omit<Sponsorship, 'id' | 'createdAt' | 'updatedAt'>): Promise<Sponsorship | null> {
      if (!isSupabaseConfigured) return null;
      const supabase = getSupabase();
      if (!supabase) return null;
      const { data, error } = await supabase
        .from('sponsorships')
        .insert({
          business_id: sponsorship.businessId,
          tier: sponsorship.tier,
          price: sponsorship.price,
          billing_cycle: sponsorship.billingCycle,
          start_date: sponsorship.startDate,
          end_date: sponsorship.endDate,
          status: sponsorship.status,
          auto_renew: sponsorship.autoRenew,
          impressions: sponsorship.impressions,
          clicks: sponsorship.clicks,
          notes: sponsorship.notes,
        })
        .select()
        .single();
      if (error) return null;
      return {
        id: data.id,
        businessId: data.business_id,
        tier: data.tier,
        price: data.price,
        billingCycle: data.billing_cycle,
        startDate: data.start_date,
        endDate: data.end_date,
        status: data.status,
        autoRenew: data.auto_renew,
        impressions: data.impressions,
        clicks: data.clicks,
        notes: data.notes,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      };
    },
  },

  adPlacements: {
    async getAll(): Promise<AdPlacement[]> {
      if (!isSupabaseConfigured) return [];
      const supabase = getSupabase();
      if (!supabase) return [];
      const { data, error } = await supabase
        .from('ad_placements')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) return [];
      return (data || []).map(row => ({
        id: row.id,
        name: row.name,
        type: row.type,
        position: row.position,
        pageContext: row.page_context,
        size: row.size,
        price: row.price,
        status: row.status,
        advertiserId: row.advertiser_id,
        campaignId: row.campaign_id,
        startsAt: row.starts_at,
        endsAt: row.ends_at,
        impressions: row.impressions,
        clicks: row.clicks,
        createdAt: row.created_at,
      }));
    },
  },
};

export { getSupabase, isSupabaseConfigured };
