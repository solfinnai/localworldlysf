'use client';

import Link from 'next/link';
import { sampleSponsorships, sampleBusinesses } from '@/data/crm-data';

export default function SponsorshipsPage() {
  const getBusiness = (id: string) => sampleBusinesses.find(b => b.id === id);
  
  const getTierColor = (tier: string) => {
    const colors: Record<string, string> = {
      platinum: 'bg-gray-900 text-white',
      gold: 'bg-yellow-500 text-yellow-900',
      silver: 'bg-gray-400 text-white',
      featured: 'bg-accent text-primary',
    };
    return colors[tier] || 'bg-gray-100 text-gray-700';
  };

  const totalMonthlyRevenue = sampleSponsorships
    .filter(s => s.status === 'active')
    .reduce((sum, s) => sum + s.price, 0);

  const totalImpressions = sampleSponsorships
    .filter(s => s.status === 'active')
    .reduce((sum, s) => sum + s.impressions, 0);

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-primary font-display">Sponsorships</h1>
          <p className="text-muted mt-1">Manage your sponsorship packages</p>
        </div>
        <Link
          href="/admin/sponsorships/new"
          className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          <span>💰</span>
          Add Sponsorship
        </Link>
      </div>
      
      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <p className="text-sm text-gray-500">Active Sponsors</p>
          <p className="text-3xl font-bold text-primary mt-1">{sampleSponsorships.filter(s => s.status === 'active').length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <p className="text-sm text-gray-500">Monthly Revenue</p>
          <p className="text-3xl font-bold text-green-600 mt-1">${totalMonthlyRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <p className="text-sm text-gray-500">Total Impressions</p>
          <p className="text-3xl font-bold text-primary mt-1">{totalImpressions.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <p className="text-sm text-gray-500">Avg. CTR</p>
          <p className="text-3xl font-bold text-accent mt-1">
            {totalImpressions > 0 
              ? ((sampleSponsorships.reduce((sum, s) => sum + s.clicks, 0) / totalImpressions * 100)).toFixed(1)
              : 0}%
          </p>
        </div>
      </div>
      
      {/* Sponsorship Tiers */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <h2 className="text-lg font-bold text-primary mb-4">Sponsorship Tiers</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-gray-900 text-white rounded-xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🏆</span>
              <h3 className="text-xl font-bold">Platinum</h3>
            </div>
            <p className="text-3xl font-bold text-yellow-400">$2,500<span className="text-sm text-gray-400">/mo</span></p>
            <ul className="mt-4 space-y-2 text-sm text-gray-300">
              <li>✓ Exclusive category sponsorship</li>
              <li>✓ Featured on ALL articles</li>
              <li>✓ 1 premium spotlight/month</li>
              <li>✓ Homepage hero rotation</li>
              <li>✓ Newsletter feature</li>
            </ul>
          </div>
          
          <div className="bg-yellow-500 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🥇</span>
              <h3 className="text-xl font-bold text-yellow-900">Gold</h3>
            </div>
            <p className="text-3xl font-bold text-yellow-900">$1,200<span className="text-sm text-yellow-800">/mo</span></p>
            <ul className="mt-4 space-y-2 text-sm text-yellow-900">
              <li>✓ Business card on 10 articles</li>
              <li>✓ 1 standard spotlight/month</li>
              <li>✓ Sidebar banner on category</li>
              <li>✓ Quarterly newsletter</li>
            </ul>
          </div>
          
          <div className="bg-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🥈</span>
              <h3 className="text-xl font-bold text-gray-700">Silver</h3>
            </div>
            <p className="text-3xl font-bold text-gray-700">$500<span className="text-sm text-gray-500">/mo</span></p>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>✓ Business card on 5 articles</li>
              <li>✓ "Supported by" badge</li>
              <li>✓ 2 social mentions/month</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Active Sponsors */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-primary">Active Sponsors</h2>
        </div>
        
        <div className="divide-y divide-gray-100">
          {sampleSponsorships.map((sponsorship) => {
            const business = getBusiness(sponsorship.businessId);
            return (
              <div key={sponsorship.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1.5 rounded-full text-sm font-bold uppercase ${getTierColor(sponsorship.tier)}`}>
                      {sponsorship.tier}
                    </span>
                    <div>
                      <p className="font-medium text-primary">{business?.name}</p>
                      <p className="text-sm text-gray-500">Since {new Date(sponsorship.startDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Monthly Rate</p>
                      <p className="text-lg font-bold text-green-600">${sponsorship.price.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Impressions</p>
                      <p className="text-lg font-bold text-primary">{sponsorship.impressions.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Clicks</p>
                      <p className="text-lg font-bold text-accent">{sponsorship.clicks}</p>
                    </div>
                    <Link
                      href={`/admin/sponsorships/${sponsorship.id}`}
                      className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                    >
                      Manage
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
