'use client';

import Link from 'next/link';
import { useCRM } from '@/context/CRMContext';

export default function AdminDashboard() {
  const { businesses, sponsorships, outreach, interviews } = useCRM();
  
  const stats = {
    totalBusinesses: businesses.length,
    byStatus: businesses.reduce((acc, b) => {
      acc[b.status] = (acc[b.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    pendingInterviews: interviews.filter(i => i.status === 'received' || i.status === 'pending').length,
    activeSponsors: sponsorships.filter(s => s.status === 'active').length,
    monthlyRevenue: sponsorships
      .filter(s => s.status === 'active')
      .reduce((sum, s) => sum + s.price, 0),
    totalOutreach: outreach.length,
    sentOutreach: outreach.filter(o => o.status === 'sent' || o.status === 'opened' || o.status === 'replied').length,
    replyRate: outreach.length > 0 
      ? Math.round((outreach.filter(o => o.repliedAt).length / outreach.length * 100)) 
      : 0,
    openRate: outreach.length > 0 
      ? Math.round((outreach.filter(o => o.openedAt).length / outreach.length * 100))
      : 0,
  };

  const recentOutreach = outreach.slice(0, 5);
  const recentBusinesses = businesses.slice(0, 5);
  
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      prospect: 'bg-blue-100 text-blue-700 border-blue-200',
      contacted: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      interviewing: 'bg-purple-100 text-purple-700 border-purple-200',
      featured: 'bg-green-100 text-green-700 border-green-200',
      declined: 'bg-gray-100 text-gray-700 border-gray-200',
      unresponsive: 'bg-red-100 text-red-700 border-red-200',
    };
    return colors[status] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const getOutreachStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      draft: 'bg-gray-100 text-gray-600',
      scheduled: 'bg-blue-100 text-blue-600',
      sent: 'bg-purple-100 text-purple-600',
      opened: 'bg-green-100 text-green-600',
      clicked: 'bg-emerald-100 text-emerald-600',
      replied: 'bg-yellow-100 text-yellow-700',
      bounced: 'bg-red-100 text-red-600',
      failed: 'bg-red-100 text-red-600',
    };
    return colors[status] || 'bg-gray-100 text-gray-600';
  };

  const statusOrder = ['prospect', 'contacted', 'interviewing', 'featured', 'unresponsive', 'declined'];
  const sortedStatuses = statusOrder.filter(s => stats.byStatus[s]).map(s => ({ status: s, count: stats.byStatus[s] }));

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-primary font-display">Dashboard</h1>
          <p className="text-muted mt-1">Welcome back! Here&apos;s your LocalWorld overview.</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-3">
          <Link
            href="/admin/businesses/new"
            className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            <span>➕</span>
            Add Business
          </Link>
          <Link
            href="/admin/outreach/new"
            className="inline-flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-lg font-medium hover:bg-accent/90 transition-colors"
          >
            <span>📧</span>
            Start Campaign
          </Link>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xl">
              🏪
            </span>
            <span className="text-xs text-green-600 font-medium flex items-center gap-1">
              <span>↑</span> Active
            </span>
          </div>
          <p className="text-3xl font-bold text-primary">{stats.totalBusinesses}</p>
          <p className="text-sm text-gray-500 mt-1">Total Businesses</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="w-10 h-10 rounded-lg bg-yellow-50 text-yellow-600 flex items-center justify-center text-xl">
              💰
            </span>
            <span className="text-xs text-green-600 font-medium">Monthly</span>
          </div>
          <p className="text-3xl font-bold text-primary">${stats.monthlyRevenue.toLocaleString()}</p>
          <p className="text-sm text-gray-500 mt-1">{stats.activeSponsors} Active Sponsors</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center text-xl">
              🎤
            </span>
            {stats.pendingInterviews > 0 && (
              <span className="w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {stats.pendingInterviews}
              </span>
            )}
          </div>
          <p className="text-3xl font-bold text-primary">{stats.pendingInterviews}</p>
          <p className="text-sm text-gray-500 mt-1">Pending Interviews</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="w-10 h-10 rounded-lg bg-green-50 text-green-600 flex items-center justify-center text-xl">
              📧
            </span>
            <span className="text-xs text-green-600 font-medium">
              {stats.replyRate}% reply
            </span>
          </div>
          <p className="text-3xl font-bold text-primary">{stats.openRate}%</p>
          <p className="text-sm text-gray-500 mt-1">Email Open Rate</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Business Pipeline */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-primary">Business Pipeline</h2>
              <Link
                href="/admin/businesses"
                className="text-sm text-accent font-medium hover:underline"
              >
                Manage →
              </Link>
            </div>
          </div>
          <div className="p-6">
            {sortedStatuses.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {sortedStatuses.map(({ status, count }) => (
                  <div key={status} className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(status)}`}>
                        {status.replace('-', ' ')}
                      </span>
                      <span className="text-xl font-bold text-primary">{count}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          status === 'featured' ? 'bg-green-500' :
                          status === 'interviewing' ? 'bg-purple-500' :
                          status === 'prospect' ? 'bg-blue-500' :
                          status === 'contacted' ? 'bg-yellow-500' :
                          status === 'unresponsive' ? 'bg-red-500' : 'bg-gray-400'
                        }`}
                        style={{ width: `${stats.totalBusinesses > 0 ? (count / stats.totalBusinesses) * 100 : 0}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-400 mb-4">No businesses in your pipeline yet</p>
                <Link
                  href="/admin/businesses/new"
                  className="text-accent font-medium hover:underline"
                >
                  Add your first business →
                </Link>
              </div>
            )}
          </div>
        </div>
        
        {/* Recent Outreach */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-primary">Recent Outreach</h2>
              <Link
                href="/admin/outreach"
                className="text-sm text-accent font-medium hover:underline"
              >
                View all →
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {recentOutreach.length > 0 ? recentOutreach.map((out) => {
              const business = businesses.find(b => b.id === out.businessId);
              return (
                <div key={out.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-primary text-sm">{business?.name || 'Unknown'}</p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {out.sentAt ? new Date(out.sentAt).toLocaleDateString() : 'Scheduled'}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getOutreachStatusColor(out.status)}`}>
                      {out.status}
                    </span>
                  </div>
                </div>
              );
            }) : (
              <div className="p-6 text-center">
                <p className="text-gray-400 text-sm mb-3">No outreach campaigns yet</p>
                <Link
                  href="/admin/outreach/new"
                  className="text-accent font-medium hover:underline text-sm"
                >
                  Start your first campaign →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Two Column Section */}
      <div className="grid md:grid-cols-2 gap-8 mt-8">
        {/* Recent Businesses */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-primary">Recent Businesses</h2>
              <Link
                href="/admin/businesses"
                className="text-sm text-accent font-medium hover:underline"
              >
                View all →
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {recentBusinesses.length > 0 ? recentBusinesses.slice(0, 5).map((business) => (
              <div key={business.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {business.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-primary truncate">{business.name}</p>
                    <p className="text-sm text-gray-500 truncate">{business.neighborhood}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(business.status)}`}>
                    {business.status.replace('-', ' ')}
                  </span>
                </div>
              </div>
            )) : (
              <div className="p-6 text-center">
                <p className="text-gray-400 text-sm">No businesses added yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Action Items */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-primary">Action Items</h2>
          </div>
          <div className="p-4 space-y-3">
            {stats.pendingInterviews > 0 && (
              <Link
                href="/admin/outreach"
                className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
              >
                <span className="w-8 h-8 bg-purple-500 text-white rounded-lg flex items-center justify-center text-sm">
                  {stats.pendingInterviews}
                </span>
                <div>
                  <p className="font-medium text-primary">Interview Responses Ready</p>
                  <p className="text-sm text-gray-500">Review and approve</p>
                </div>
              </Link>
            )}
            
            {stats.byStatus['unresponsive'] > 0 && (
              <Link
                href="/admin/outreach/new"
                className="flex items-center gap-3 p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
              >
                <span className="w-8 h-8 bg-red-500 text-white rounded-lg flex items-center justify-center text-sm">
                  {stats.byStatus['unresponsive']}
                </span>
                <div>
                  <p className="font-medium text-primary">Follow Up Needed</p>
                  <p className="text-sm text-gray-500">Reached out but no response</p>
                </div>
              </Link>
            )}
            
            {stats.byStatus['prospect'] > 0 && (
              <Link
                href="/admin/outreach"
                className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <span className="w-8 h-8 bg-blue-500 text-white rounded-lg flex items-center justify-center text-sm">
                  {stats.byStatus['prospect']}
                </span>
                <div>
                  <p className="font-medium text-primary">New Prospects</p>
                  <p className="text-sm text-gray-500">Ready for first outreach</p>
                </div>
              </Link>
            )}
            
            {stats.pendingInterviews === 0 && stats.byStatus['unresponsive'] === 0 && stats.byStatus['prospect'] === 0 && (
              <div className="text-center py-8">
                <span className="text-4xl mb-3 block">✨</span>
                <p className="text-gray-500">All caught up! No pending actions.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sponsorship & Revenue Section */}
      <div className="grid md:grid-cols-2 gap-8 mt-8">
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Sponsorship Revenue</h2>
            <Link href="/admin/sponsorships" className="text-white/80 hover:text-white text-sm">
              Manage →
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold">${stats.monthlyRevenue.toLocaleString()}</p>
              <p className="text-sm text-white/80">Monthly</p>
            </div>
            <div className="text-center border-x border-white/20">
              <p className="text-3xl font-bold">{stats.activeSponsors}</p>
              <p className="text-sm text-white/80">Sponsors</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">${(stats.monthlyRevenue * 12).toLocaleString()}</p>
              <p className="text-sm text-white/80">Yearly</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-primary">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/admin/businesses/new"
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-xl">
                🏪
              </span>
              <span className="font-medium text-primary">Add Business</span>
            </Link>
            <Link
              href="/admin/articles/new"
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span className="w-10 h-10 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center text-xl">
                📝
              </span>
              <span className="font-medium text-primary">Write Article</span>
            </Link>
            <Link
              href="/admin/outreach/new"
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center text-xl">
                📧
              </span>
              <span className="font-medium text-primary">Send Outreach</span>
            </Link>
            <Link
              href="/admin/sponsorships"
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span className="w-10 h-10 bg-yellow-100 text-yellow-600 rounded-lg flex items-center justify-center text-xl">
                💰
              </span>
              <span className="font-medium text-primary">Add Sponsor</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
