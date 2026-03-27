'use client';

import Link from 'next/link';
import { sampleAdPlacements } from '@/data/crm-data';

export default function AdsPage() {
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      available: 'bg-green-100 text-green-700',
      sold: 'bg-blue-100 text-blue-700',
      paused: 'bg-yellow-100 text-yellow-700',
      active: 'bg-green-100 text-green-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const getTypeIcon = (type: string) => {
    const icons: Record<string, string> = {
      display: '📊',
      native: '📰',
      banner: '🚩',
      sponsored_content: '⭐',
    };
    return icons[type] || '📢';
  };

  const totalValue = sampleAdPlacements
    .filter(a => a.status === 'available')
    .reduce((sum, a) => sum + a.price, 0);

  const totalImpressions = sampleAdPlacements
    .filter(a => a.status === 'sold' || a.status === 'active')
    .reduce((sum, a) => sum + a.impressions, 0);

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-primary font-display">Ad Placements</h1>
          <p className="text-muted mt-1">Manage advertising inventory and campaigns</p>
        </div>
        <Link
          href="/admin/ads/new"
          className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          <span>➕</span>
          Create Placement
        </Link>
      </div>
      
      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <p className="text-sm text-gray-500">Available Slots</p>
          <p className="text-3xl font-bold text-primary mt-1">
            {sampleAdPlacements.filter(a => a.status === 'available').length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <p className="text-sm text-gray-500">Inventory Value</p>
          <p className="text-3xl font-bold text-green-600 mt-1">${totalValue.toLocaleString()}<span className="text-sm font-normal">/mo</span></p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <p className="text-sm text-gray-500">Active Campaigns</p>
          <p className="text-3xl font-bold text-primary mt-1">
            {sampleAdPlacements.filter(a => a.status === 'sold' || a.status === 'active').length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <p className="text-sm text-gray-500">Total Impressions</p>
          <p className="text-3xl font-bold text-accent mt-1">{totalImpressions.toLocaleString()}</p>
        </div>
      </div>
      
      {/* Ad Placement Types */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <h2 className="text-lg font-bold text-primary mb-4">Ad Placement Options</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="border border-gray-200 rounded-xl p-5 hover:border-accent transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">🚩</span>
              <h3 className="font-bold text-primary">Hero Banner</h3>
            </div>
            <p className="text-2xl font-bold text-green-600 mb-2">$500<span className="text-sm font-normal text-gray-500">/mo</span></p>
            <p className="text-sm text-gray-500">970×250px on homepage</p>
            <p className="text-xs text-gray-400 mt-2">High visibility, premium placement</p>
          </div>
          
          <div className="border border-gray-200 rounded-xl p-5 hover:border-accent transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">📊</span>
              <h3 className="font-bold text-primary">Sidebar</h3>
            </div>
            <p className="text-2xl font-bold text-green-600 mb-2">$300<span className="text-sm font-normal text-gray-500">/mo</span></p>
            <p className="text-sm text-gray-500">300×250px on article pages</p>
            <p className="text-xs text-gray-400 mt-2">Sticky placement, high engagement</p>
          </div>
          
          <div className="border border-gray-200 rounded-xl p-5 hover:border-accent transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">📰</span>
              <h3 className="font-bold text-primary">Native Ad</h3>
            </div>
            <p className="text-2xl font-bold text-green-600 mb-2">$400<span className="text-sm font-normal text-gray-500">/mo</span></p>
            <p className="text-sm text-gray-500">Mid-article integration</p>
            <p className="text-xs text-gray-400 mt-2">Blend with content seamlessly</p>
          </div>
          
          <div className="border border-gray-200 rounded-xl p-5 hover:border-accent transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">⭐</span>
              <h3 className="font-bold text-primary">Sponsored Content</h3>
            </div>
            <p className="text-2xl font-bold text-green-600 mb-2">$800<span className="text-sm font-normal text-gray-500">/article</span></p>
            <p className="text-sm text-gray-500">Full spotlight article</p>
            <p className="text-xs text-gray-400 mt-2">Maximum brand integration</p>
          </div>
        </div>
      </div>
      
      {/* Placements List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-primary">All Placements</h2>
        </div>
        
        <div className="divide-y divide-gray-100">
          {sampleAdPlacements.map((placement) => (
            <div key={placement.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
                    {getTypeIcon(placement.type)}
                  </div>
                  <div>
                    <p className="font-medium text-primary">{placement.name}</p>
                    <p className="text-sm text-gray-500">
                      {placement.size} • {placement.position} • {placement.pageContext}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${getStatusColor(placement.status)}`}>
                    {placement.status}
                  </span>
                  
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Price</p>
                    <p className="text-lg font-bold text-green-600">${placement.price.toLocaleString()}<span className="text-sm font-normal">/mo</span></p>
                  </div>
                  
                  {placement.impressions > 0 && (
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Impressions</p>
                      <p className="text-lg font-bold text-primary">{placement.impressions.toLocaleString()}</p>
                    </div>
                  )}
                  
                  <Link
                    href={`/admin/ads/${placement.id}`}
                    className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    {placement.status === 'available' ? 'Sell' : 'Manage'}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
