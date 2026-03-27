'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Business, InterviewResponse, Outreach, Sponsorship, AdPlacement } from '@/lib/crm-types';
import { 
  sampleBusinesses, 
  sampleInterviews, 
  sampleOutreach, 
  sampleSponsorships, 
  sampleAdPlacements,
  INTERVIEW_QUESTIONS 
} from '@/data/crm-data';

interface CRMContextType {
  businesses: Business[];
  interviews: InterviewResponse[];
  outreach: Outreach[];
  sponsorships: Sponsorship[];
  adPlacements: AdPlacement[];
  
  // Business CRUD
  addBusiness: (business: Omit<Business, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateBusiness: (id: string, updates: Partial<Business>) => void;
  deleteBusiness: (id: string) => void;
  
  // Interview CRUD
  addInterview: (interview: Omit<InterviewResponse, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateInterview: (id: string, updates: Partial<InterviewResponse>) => void;
  approveInterview: (id: string) => void;
  rejectInterview: (id: string) => void;
  
  // Outreach CRUD
  addOutreach: (outreach: Omit<Outreach, 'id' | 'createdAt'>) => void;
  updateOutreach: (id: string, updates: Partial<Outreach>) => void;
  
  // Sponsorship CRUD
  addSponsorship: (sponsorship: Omit<Sponsorship, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateSponsorship: (id: string, updates: Partial<Sponsorship>) => void;
  
  // Ad Placement CRUD
  addAdPlacement: (ad: Omit<AdPlacement, 'id' | 'createdAt'>) => void;
  updateAdPlacement: (id: string, updates: Partial<AdPlacement>) => void;
  
  // Stats
  getStats: () => {
    totalBusinesses: number;
    activeSponsorships: number;
    totalAdRevenue: number;
    pendingInterviews: number;
  };
}

const CRMContext = createContext<CRMContextType | null>(null);

function generateId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function getToday() {
  return new Date().toISOString().split('T')[0];
}

export function CRMProvider({ children }: { children: ReactNode }) {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [interviews, setInterviews] = useState<InterviewResponse[]>([]);
  const [outreach, setOutreach] = useState<Outreach[]>([]);
  const [sponsorships, setSponsorships] = useState<Sponsorship[]>([]);
  const [adPlacements, setAdPlacements] = useState<AdPlacement[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const storedBusinesses = localStorage.getItem('crm_businesses');
    const storedInterviews = localStorage.getItem('crm_interviews');
    const storedOutreach = localStorage.getItem('crm_outreach');
    const storedSponsorships = localStorage.getItem('crm_sponsorships');
    const storedAds = localStorage.getItem('crm_adPlacements');
    
    setBusinesses(storedBusinesses ? JSON.parse(storedBusinesses) : sampleBusinesses);
    setInterviews(storedInterviews ? JSON.parse(storedInterviews) : sampleInterviews);
    setOutreach(storedOutreach ? JSON.parse(storedOutreach) : sampleOutreach);
    setSponsorships(storedSponsorships ? JSON.parse(storedSponsorships) : sampleSponsorships);
    setAdPlacements(storedAds ? JSON.parse(storedAds) : sampleAdPlacements);
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('crm_businesses', JSON.stringify(businesses));
    }
  }, [businesses, isHydrated]);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('crm_interviews', JSON.stringify(interviews));
    }
  }, [interviews, isHydrated]);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('crm_outreach', JSON.stringify(outreach));
    }
  }, [outreach, isHydrated]);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('crm_sponsorships', JSON.stringify(sponsorships));
    }
  }, [sponsorships, isHydrated]);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('crm_adPlacements', JSON.stringify(adPlacements));
    }
  }, [adPlacements, isHydrated]);

  const addBusiness = (business: Omit<Business, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newBusiness: Business = {
      ...business,
      id: generateId('biz'),
      createdAt: getToday(),
      updatedAt: getToday(),
    };
    setBusinesses(prev => [...prev, newBusiness]);
  };

  const updateBusiness = (id: string, updates: Partial<Business>) => {
    setBusinesses(prev => prev.map(b => 
      b.id === id ? { ...b, ...updates, updatedAt: getToday() } : b
    ));
  };

  const deleteBusiness = (id: string) => {
    setBusinesses(prev => prev.filter(b => b.id !== id));
  };

  const addInterview = (interview: Omit<InterviewResponse, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newInterview: InterviewResponse = {
      ...interview,
      id: generateId('int'),
      createdAt: getToday(),
      updatedAt: getToday(),
    };
    setInterviews(prev => [...prev, newInterview]);
  };

  const updateInterview = (id: string, updates: Partial<InterviewResponse>) => {
    setInterviews(prev => prev.map(i => 
      i.id === id ? { ...i, ...updates, updatedAt: getToday() } : i
    ));
  };

  const approveInterview = (id: string) => {
    setInterviews(prev => prev.map(i => 
      i.id === id ? { ...i, status: 'approved', approvedAt: getToday(), updatedAt: getToday() } : i
    ));
  };

  const rejectInterview = (id: string) => {
    setInterviews(prev => prev.map(i => 
      i.id === id ? { ...i, status: 'rejected', updatedAt: getToday() } : i
    ));
  };

  const addOutreach = (newOutreach: Omit<Outreach, 'id' | 'createdAt'>) => {
    const outreach: Outreach = {
      ...newOutreach,
      id: generateId('out'),
      createdAt: getToday(),
    };
    setOutreach(prev => [...prev, outreach]);
  };

  const updateOutreach = (id: string, updates: Partial<Outreach>) => {
    setOutreach(prev => prev.map(o => 
      o.id === id ? { ...o, ...updates } : o
    ));
  };

  const addSponsorship = (sponsorship: Omit<Sponsorship, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newSponsorship: Sponsorship = {
      ...sponsorship,
      id: generateId('spon'),
      createdAt: getToday(),
      updatedAt: getToday(),
    };
    setSponsorships(prev => [...prev, newSponsorship]);
  };

  const updateSponsorship = (id: string, updates: Partial<Sponsorship>) => {
    setSponsorships(prev => prev.map(s => 
      s.id === id ? { ...s, ...updates, updatedAt: getToday() } : s
    ));
  };

  const addAdPlacement = (ad: Omit<AdPlacement, 'id' | 'createdAt'>) => {
    const newAd: AdPlacement = {
      ...ad,
      id: generateId('ad'),
      createdAt: getToday(),
    };
    setAdPlacements(prev => [...prev, newAd]);
  };

  const updateAdPlacement = (id: string, updates: Partial<AdPlacement>) => {
    setAdPlacements(prev => prev.map(a => 
      a.id === id ? { ...a, ...updates } : a
    ));
  };

  const getStats = () => {
    const activeSponsors = sponsorships.filter(s => s.status === 'active');
    const pendingInts = interviews.filter(i => i.status === 'pending' || i.status === 'received');
    const soldAds = adPlacements.filter(a => a.status === 'sold');
    
    return {
      totalBusinesses: businesses.length,
      activeSponsorships: activeSponsors.length,
      totalAdRevenue: soldAds.reduce((sum, ad) => sum + ad.price, 0),
      pendingInterviews: pendingInts.length,
    };
  };

  return (
    <CRMContext.Provider value={{
      businesses,
      interviews,
      outreach,
      sponsorships,
      adPlacements,
      addBusiness,
      updateBusiness,
      deleteBusiness,
      addInterview,
      updateInterview,
      approveInterview,
      rejectInterview,
      addOutreach,
      updateOutreach,
      addSponsorship,
      updateSponsorship,
      addAdPlacement,
      updateAdPlacement,
      getStats,
    }}>
      {children}
    </CRMContext.Provider>
  );
}

export function useCRM() {
  const context = useContext(CRMContext);
  if (!context) {
    throw new Error('useCRM must be used within a CRMProvider');
  }
  return context;
}

export { INTERVIEW_QUESTIONS };
