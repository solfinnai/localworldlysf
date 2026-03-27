'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCRM } from '@/context/CRMContext';

const statusColors: Record<string, string> = {
  prospect: 'bg-blue-100 text-blue-700 border-blue-200',
  contacted: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  interviewing: 'bg-purple-100 text-purple-700 border-purple-200',
  featured: 'bg-green-100 text-green-700 border-green-200',
  declined: 'bg-gray-100 text-gray-600 border-gray-200',
  unresponsive: 'bg-red-50 text-red-600 border-red-200',
};

export default function BusinessesPage() {
  const { businesses, deleteBusiness } = useCRM();
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  
  const filteredBusinesses = businesses.filter(business => {
    const matchesFilter = filter === 'all' || business.status === filter;
    const matchesSearch = business.name.toLowerCase().includes(search.toLowerCase()) ||
      business.neighborhood.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });
  
  const getStatusIcon = (status: string) => {
    const icons: Record<string, string> = {
      prospect: '🎯',
      contacted: '📧',
      interviewing: '🎤',
      featured: '⭐',
      declined: '✖',
      unresponsive: '😴',
    };
    return icons[status] || '📍';
  };

  const handleDelete = (id: string) => {
    deleteBusiness(id);
    setDeleteConfirm(null);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-primary font-display">Businesses</h1>
          <p className="text-muted mt-1">{businesses.length} businesses in your pipeline</p>
        </div>
        <Link
          href="/admin/businesses/new"
          className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          <span>➕</span>
          Add Business
        </Link>
      </div>
      
      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search businesses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {['all', 'prospect', 'contacted', 'interviewing', 'featured', 'unresponsive'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors ${
                  filter === status
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {status === 'all' ? 'All' : status.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Business List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Business</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Category</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Neighborhood</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Rating</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredBusinesses.map((business) => (
                <tr key={business.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-primary">{business.name}</p>
                      <p className="text-sm text-gray-500">{business.website ? new URL(business.website).hostname : ''}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${statusColors[business.status]}`}>
                      <span>{getStatusIcon(business.status)}</span>
                      <span className="capitalize">{business.status.replace('-', ' ')}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 hidden md:table-cell">
                    {business.category}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 hidden lg:table-cell">
                    {business.neighborhood}
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    {business.rating && (
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm font-medium">{business.rating}</span>
                        <span className="text-gray-400 text-xs">({business.reviewCount})</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/businesses/${business.id}`}
                        className="p-2 text-gray-400 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <span>✏️</span>
                      </Link>
                      <Link
                        href={`/admin/outreach?business=${business.id}`}
                        className="p-2 text-gray-400 hover:text-accent hover:bg-gray-100 rounded-lg transition-colors"
                        title="Send Outreach"
                      >
                        <span>📧</span>
                      </Link>
                      <button
                        onClick={() => setDeleteConfirm(business.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <span>🗑️</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredBusinesses.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-gray-400 text-lg">No businesses found</p>
            <p className="text-gray-400 text-sm mt-1">Try adjusting your filters</p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-primary mb-2">Delete Business?</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this business? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
