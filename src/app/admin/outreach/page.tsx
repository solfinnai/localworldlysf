'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCRM } from '@/context/CRMContext';
import { InterviewResponse } from '@/lib/crm-types';
import { InterviewResponseCard, InterviewResponseViewer } from '@/components/admin/InterviewResponseCard';

export default function OutreachPage() {
  const { businesses, interviews, outreach, approveInterview, rejectInterview } = useCRM();
  const [selectedChannel, setSelectedChannel] = useState<string>('all');
  const [selectedInterview, setSelectedInterview] = useState<InterviewResponse | null>(null);
  
  const getBusiness = (id: string) => businesses.find(b => b.id === id);
  
  const getStatusIcon = (status: string) => {
    const icons: Record<string, string> = {
      draft: '📝',
      scheduled: '⏰',
      sent: '📤',
      opened: '👁',
      clicked: '👆',
      replied: '💬',
      bounced: '⚠️',
      failed: '❌',
    };
    return icons[status] || '📧';
  };
  
  const getStatusColor = (status: string) => {
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

  const filteredOutreach = selectedChannel === 'all' 
    ? outreach 
    : outreach.filter(o => o.channel === selectedChannel);

  const pendingInterviews = interviews.filter(i => i.status === 'received' || i.status === 'pending');

  const handleApprove = (id: string) => {
    approveInterview(id);
    setSelectedInterview(null);
  };

  const handleReject = (id: string) => {
    rejectInterview(id);
    setSelectedInterview(null);
  };

  return (
    <div>
      {selectedInterview && (
        <InterviewResponseViewer
          interview={selectedInterview}
          businessName={getBusiness(interviews.find(i => i.id === selectedInterview.id)?.businessId || '')?.name || 'Unknown'}
          onClose={() => setSelectedInterview(null)}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-primary font-display">Outreach & Interviews</h1>
          <p className="text-muted mt-1">Manage your 5-question interview campaign</p>
        </div>
        <Link
          href="/admin/outreach/new"
          className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          <span>📧</span>
          New Outreach Campaign
        </Link>
      </div>
      
      {/* The 5 Questions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <h2 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
          <span>🎤</span> Your 5 Interview Questions
        </h2>
        <div className="space-y-4">
          {Object.entries({
            q1: { question: "Tell me about yourself and how [Business Name] came to be.", prompt: "Establishes founder's story and business origin." },
            q2: { question: "What makes [Business Name] different from other places in San Francisco?", prompt: "Identifies unique value proposition." },
            q3: { question: "What's the most memorable moment you've had with a customer?", prompt: "Humanizes through emotional storytelling." },
            q4: { question: "What do you want people to know about [neighborhood]?", prompt: "Ties business to community." },
            q5: { question: "What should first-timers absolutely try/do?", prompt: "Actionable advice that drives conversions." },
          }).map(([key, q], i) => (
            <div key={key} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {i + 1}
                </span>
                <div>
                  <p className="font-medium text-primary italic">&ldquo;{q.question}&rdquo;</p>
                  <p className="text-sm text-gray-500 mt-1">{q.prompt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 p-4 bg-accent/10 rounded-lg border border-accent/20">
          <p className="text-sm text-gray-700">
            <strong className="text-accent">Pro tip:</strong> These questions are designed to extract compelling narratives 
            that drive engagement.
          </p>
        </div>
      </div>

      {/* Received Interviews */}
      {pendingInterviews.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
            <span>📥</span> Received Interview Responses ({pendingInterviews.length})
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pendingInterviews.map((interview) => (
              <InterviewResponseCard
                key={interview.id}
                interview={interview}
                businessName={getBusiness(interview.businessId)?.name || 'Unknown'}
                onViewDetails={setSelectedInterview}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Outreach Campaigns */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-lg font-bold text-primary">Campaign History ({outreach.length})</h2>
            <div className="flex gap-2">
              {['all', 'email', 'instagram', 'facebook'].map((channel) => (
                <button
                  key={channel}
                  onClick={() => setSelectedChannel(channel)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors ${
                    selectedChannel === channel
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {channel === 'all' ? 'All Channels' : channel}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="divide-y divide-gray-100">
          {filteredOutreach.map((out) => {
            const business = getBusiness(out.businessId);
            return (
              <div key={out.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xl">
                      {out.channel === 'email' ? '📧' : 
                       out.channel === 'instagram' ? '📸' : '📘'}
                    </div>
                    <div>
                      <p className="font-medium text-primary">{business?.name || 'Unknown Business'}</p>
                      <p className="text-sm text-gray-500 capitalize">{out.channel}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${getStatusColor(out.status)}`}>
                      <span>{getStatusIcon(out.status)}</span>
                      <span className="capitalize">{out.status}</span>
                    </span>
                    
                    {out.sentAt && (
                      <div className="text-right text-sm">
                        <p className="text-gray-500">Sent</p>
                        <p className="text-gray-700">{new Date(out.sentAt).toLocaleDateString()}</p>
                      </div>
                    )}
                    
                    {out.openedAt && (
                      <div className="text-right text-sm">
                        <p className="text-gray-500">Opened</p>
                        <p className="text-gray-700">{new Date(out.openedAt).toLocaleDateString()}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {filteredOutreach.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-gray-400 text-lg">No outreach campaigns yet</p>
            <Link
              href="/admin/outreach/new"
              className="text-accent font-medium hover:underline mt-2 inline-block"
            >
              Start your first campaign →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
