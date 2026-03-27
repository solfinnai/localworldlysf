'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Business, InterviewResponse, Outreach, Sponsorship, AdPlacement } from '@/lib/crm-types';
import { 
  sampleBusinesses, 
  sampleInterviews, 
  sampleOutreach, 
  sampleSponsorships, 
  sampleAdPlacements 
} from '@/data/crm-data';

interface CRMContextType {
  businesses: Business[];
  interviews: InterviewResponse[];
  outreach: Outreach[];
  sponsorships: Sponsorship[];
  adPlacements: AdPlacement[];
  
  addBusiness: (business: Omit<Business, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateBusiness: (id: string, updates: Partial<Business>) => void;
  deleteBusiness: (id: string) => void;
  
  addInterview: (interview: Omit<InterviewResponse, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateInterview: (id: string, updates: Partial<InterviewResponse>) => void;
  approveInterview: (id: string) => void;
  rejectInterview: (id: string) => void;
  
  addOutreach: (outreach: Omit<Outreach, 'id' | 'createdAt'>) => void;
  updateOutreach: (id: string, updates: Partial<Outreach>) => void;
  
  addSponsorship: (sponsorship: Omit<Sponsorship, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateSponsorship: (id: string, updates: Partial<Sponsorship>) => void;
  
  addAdPlacement: (ad: Omit<AdPlacement, 'id' | 'createdAt'>) => void;
  updateAdPlacement: (id: string, updates: Partial<AdPlacement>) => void;
}

const CRMContext = createContext<CRMContextType | null>(null);

function generateId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function getToday() {
  return new Date().toISOString().split('T')[0];
}

function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage<T>(key: string, data: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
  }
}

export function CRMProvider({ children }: { children: ReactNode }) {
  const [businesses, setBusinesses] = useState<Business[]>(sampleBusinesses);
  const [interviews, setInterviews] = useState<InterviewResponse[]>(sampleInterviews);
  const [outreach, setOutreach] = useState<Outreach[]>(sampleOutreach);
  const [sponsorships, setSponsorships] = useState<Sponsorship[]>(sampleSponsorships);
  const [adPlacements, setAdPlacements] = useState<AdPlacement[]>(sampleAdPlacements);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setBusinesses(loadFromStorage('crm_businesses', sampleBusinesses));
    setInterviews(loadFromStorage('crm_interviews', sampleInterviews));
    setOutreach(loadFromStorage('crm_outreach', sampleOutreach));
    setSponsorships(loadFromStorage('crm_sponsorships', sampleSponsorships));
    setAdPlacements(loadFromStorage('crm_adPlacements', sampleAdPlacements));
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      saveToStorage('crm_businesses', businesses);
    }
  }, [businesses, isHydrated]);

  useEffect(() => {
    if (isHydrated) {
      saveToStorage('crm_interviews', interviews);
    }
  }, [interviews, isHydrated]);

  useEffect(() => {
    if (isHydrated) {
      saveToStorage('crm_outreach', outreach);
    }
  }, [outreach, isHydrated]);

  useEffect(() => {
    if (isHydrated) {
      saveToStorage('crm_sponsorships', sponsorships);
    }
  }, [sponsorships, isHydrated]);

  useEffect(() => {
    if (isHydrated) {
      saveToStorage('crm_adPlacements', adPlacements);
    }
  }, [adPlacements, isHydrated]);

  const addBusiness = useCallback((business: Omit<Business, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newBusiness: Business = {
      ...business,
      id: generateId('biz'),
      createdAt: getToday(),
      updatedAt: getToday(),
    };
    setBusinesses(prev => [...prev, newBusiness]);
  }, []);

  const updateBusiness = useCallback((id: string, updates: Partial<Business>) => {
    setBusinesses(prev => prev.map(b => 
      b.id === id ? { ...b, ...updates, updatedAt: getToday() } : b
    ));
  }, []);

  const deleteBusiness = useCallback((id: string) => {
    setBusinesses(prev => prev.filter(b => b.id !== id));
  }, []);

  const addInterview = useCallback((interview: Omit<InterviewResponse, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newInterview: InterviewResponse = {
      ...interview,
      id: generateId('int'),
      createdAt: getToday(),
      updatedAt: getToday(),
    };
    setInterviews(prev => [...prev, newInterview]);
  }, []);

  const updateInterview = useCallback((id: string, updates: Partial<InterviewResponse>) => {
    setInterviews(prev => prev.map(i => 
      i.id === id ? { ...i, ...updates, updatedAt: getToday() } : i
    ));
  }, []);

  const approveInterview = useCallback((id: string) => {
    setInterviews(prev => prev.map(i => 
      i.id === id ? { ...i, status: 'approved', approvedAt: getToday(), updatedAt: getToday() } : i
    ));
  }, []);

  const rejectInterview = useCallback((id: string) => {
    setInterviews(prev => prev.map(i => 
      i.id === id ? { ...i, status: 'rejected', updatedAt: getToday() } : i
    ));
  }, []);

  const addOutreach = useCallback((newOutreach: Omit<Outreach, 'id' | 'createdAt'>) => {
    const out: Outreach = {
      ...newOutreach,
      id: generateId('out'),
      createdAt: getToday(),
    };
    setOutreach(prev => [...prev, out]);
  }, []);

  const updateOutreach = useCallback((id: string, updates: Partial<Outreach>) => {
    setOutreach(prev => prev.map(o => 
      o.id === id ? { ...o, ...updates } : o
    ));
  }, []);

  const addSponsorship = useCallback((sponsorship: Omit<Sponsorship, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newSponsorship: Sponsorship = {
      ...sponsorship,
      id: generateId('spon'),
      createdAt: getToday(),
      updatedAt: getToday(),
    };
    setSponsorships(prev => [...prev, newSponsorship]);
  }, []);

  const updateSponsorship = useCallback((id: string, updates: Partial<Sponsorship>) => {
    setSponsorships(prev => prev.map(s => 
      s.id === id ? { ...s, ...updates, updatedAt: getToday() } : s
    ));
  }, []);

  const addAdPlacement = useCallback((ad: Omit<AdPlacement, 'id' | 'createdAt'>) => {
    const newAd: AdPlacement = {
      ...ad,
      id: generateId('ad'),
      createdAt: getToday(),
    };
    setAdPlacements(prev => [...prev, newAd]);
  }, []);

  const updateAdPlacement = useCallback((id: string, updates: Partial<AdPlacement>) => {
    setAdPlacements(prev => prev.map(a => 
      a.id === id ? { ...a, ...updates } : a
    ));
  }, []);

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
