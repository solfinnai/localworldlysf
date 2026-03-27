import Link from 'next/link';
import { sampleBusinesses, sampleInterviews, sampleSponsorships, sampleOutreach } from '@/data/crm-data';

export default function AdminDashboard() {
  const stats = {
    totalBusinesses: sampleBusinesses.length,
    byStatus: sampleBusinesses.reduce((acc, b) => {
      acc[b.status] = (acc[b.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    pendingInterviews: sampleInterviews.filter(i => i.status === 'received').length,
    activeSponsors: sampleSponsorships.filter(s => s.status === 'active').length,
    monthlyRevenue: sampleSponsorships
      .filter(s => s.status === 'active')
      .reduce((sum, s) => sum + s.price, 0),
    totalOutreach: sampleOutreach.length,
    sentOutreach: sampleOutreach.filter(o => o.status === 'sent' || o.status === 'opened' || o.status === 'replied').length,
    replyRate: sampleOutreach.filter(o => o.repliedAt).length / sampleOutreach.length * 100,
  };

  const recentActivity = [
    { type: 'interview', message: 'Dandelion Chocolate interview responses received', time: '2 hours ago' },
    { type: 'sponsor', message: 'Ritual Coffee Gold sponsorship renewed', time: '1 day ago' },
    { type: 'outreach', message: 'Sightglass Coffee outreach email sent', time: '1 day ago' },
    { type: 'article', message: '"Heart of Mission" article published', time: '3 days ago' },
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      prospect: 'bg-blue-100 text-blue-700',
      contacted: 'bg-yellow-100 text-yellow-700',
      interviewing: 'bg-purple-100 text-purple-700',
      featured: 'bg-green-100 text-green-700',
      declined: 'bg-gray-100 text-gray-700',
      unresponsive: 'bg-red-100 text-red-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary font-display">Dashboard</h1>
        <p className="text-muted mt-1">Overview of your LocalWorld Spotlight CRM</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Total Businesses"
          value={stats.totalBusinesses}
          icon="🏪"
          color="blue"
        />
        <StatCard
          label="Active Sponsors"
          value={stats.activeSponsors}
          icon="💰"
          color="yellow"
          subtext={`$${stats.monthlyRevenue.toLocaleString()}/mo`}
        />
        <StatCard
          label="Pending Interviews"
          value={stats.pendingInterviews}
          icon="🎤"
          color="purple"
        />
        <StatCard
          label="Reply Rate"
          value={`${stats.replyRate.toFixed(0)}%`}
          icon="📧"
          color="green"
          subtext={`${stats.sentOutreach} sent`}
        />
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
                View all →
              </Link>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {Object.entries(stats.byStatus).map(([status, count]) => (
                <div key={status} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(status)}`}>
                      {status.replace('-', ' ')}
                    </span>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${(count / stats.totalBusinesses) * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-600 ml-4">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-primary">Recent Activity</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {recentActivity.map((activity, i) => (
              <div key={i} className="p-4">
                <p className="text-sm text-gray-700">{activity.message}</p>
                <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="mt-8 grid md:grid-cols-4 gap-4">
        <QuickAction
          href="/admin/businesses?action=new"
          icon="➕"
          label="Add Business"
          description="Add a new business to the pipeline"
        />
        <QuickAction
          href="/admin/outreach?action=new"
          icon="📧"
          label="Start Outreach"
          description="Send interview invitations"
        />
        <QuickAction
          href="/admin/articles?action=new"
          icon="📝"
          label="Write Article"
          description="Create a new spotlight article"
        />
        <QuickAction
          href="/admin/sponsorships?action=new"
          icon="💰"
          label="New Sponsor"
          description="Add a sponsorship package"
        />
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, color, subtext }: {
  label: string;
  value: string | number;
  icon: string;
  color: string;
  subtext?: string;
}) {
  const colors: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    purple: 'bg-purple-50 text-purple-600',
    green: 'bg-green-50 text-green-600',
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl ${colors[color]} flex items-center justify-center text-2xl`}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-2xl font-bold text-primary">{value}</p>
          {subtext && <p className="text-xs text-gray-400">{subtext}</p>}
        </div>
      </div>
    </div>
  );
}

function QuickAction({ href, icon, label, description }: {
  href: string;
  icon: string;
  label: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-accent transition-all group"
    >
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="font-bold text-primary group-hover:text-accent transition-colors">{label}</h3>
      <p className="text-sm text-gray-500 mt-1">{description}</p>
    </Link>
  );
}
