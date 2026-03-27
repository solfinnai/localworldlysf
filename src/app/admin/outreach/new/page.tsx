'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { sampleBusinesses, INTERVIEW_QUESTIONS } from '@/data/crm-data';
import { Business } from '@/lib/crm-types';

const OUTREACH_TEMPLATES = {
  'intro-email': {
    id: 'intro-email',
    name: 'Initial Outreach',
    subject: 'We\'d love to feature {businessName} in LocalWorld Spotlight!',
    body: `Hi {ownerName},

I came across {businessName} and fell in love with what you&apos;re doing in San Francisco.

LocalWorld Spotlight is a local media platform that tells the stories behind SF&apos;s best businesses. We&apos;re looking for incredible places like yours to feature.

Would you be open to a quick chat? I&apos;d love to learn more about your story.

Best,
{senderName}`,
  },
  'interview-request': {
    id: 'interview-request',
    name: 'Interview Request',
    subject: '5 quick questions about {businessName}',
    body: `Hi {ownerName},

Thanks for connecting! We&apos;d love to share {businessName}&apos;s story with our readers.

We keep it simple - just 5 quick questions that you can answer whenever you have a moment. No pressure, no rush.

Here&apos;s what we typically ask:
1. Tell me about yourself and how {businessName} came to be
2. What makes {businessName} different?
3. A memorable customer moment?
4. Hidden gems in the neighborhood?
5. What should first-timers absolutely try?

Would you be up for it?

{senderName}`,
  },
  'follow-up': {
    id: 'follow-up',
    name: 'Follow Up',
    subject: 'Checking in on {businessName}',
    body: `Hi {ownerName},

Just following up on my earlier message about featuring {businessName}.

I know you&apos;re busy running an amazing business! Whenever you have a moment, I&apos;d love to connect.

If now isn&apos;t a good time, just let me know and I&apos;ll check back later.

Best,
{senderName}`,
  },
};

const CHANNELS = [
  { id: 'email', name: 'Email', icon: '📧', placeholder: 'hello@business.com' },
  { id: 'instagram', name: 'Instagram DM', icon: '📸', placeholder: '@business' },
  { id: 'facebook', name: 'Facebook', icon: '📘', placeholder: 'Facebook Page' },
];

export default function NewOutreachPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedBusinesses, setSelectedBusinesses] = useState<string[]>([]);
  const [channel, setChannel] = useState('email');
  const [template, setTemplate] = useState('intro-email');
  const [customMessage, setCustomMessage] = useState(false);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [sending, setSending] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBusinesses = sampleBusinesses.filter(b => 
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.neighborhood.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleBusiness = (id: string) => {
    setSelectedBusinesses(prev => 
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    setSelectedBusinesses(filteredBusinesses.map(b => b.id));
  };

  const deselectAll = () => {
    setSelectedBusinesses([]);
  };

  const handleTemplateChange = (templateId: string) => {
    setTemplate(templateId);
    const tmpl = OUTREACH_TEMPLATES[templateId as keyof typeof OUTREACH_TEMPLATES];
    setSubject(tmpl.subject);
    setBody(tmpl.body);
    setCustomMessage(false);
  };

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      const tmpl = OUTREACH_TEMPLATES[template as keyof typeof OUTREACH_TEMPLATES];
      if (!customMessage) {
        setSubject(tmpl.subject);
        setBody(tmpl.body);
      }
      setStep(3);
    } else if (step === 3) {
      handleSend();
    }
  };

  const handleSend = async () => {
    setSending(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSending(false);
    router.push('/admin/outreach?sent=true');
  };

  const previewMessage = (business: Business) => {
    return {
      subject: subject
        .replace('{businessName}', business.name)
        .replace('{ownerName}', 'there'),
      body: body
        .replace(/{businessName}/g, business.name)
        .replace(/{ownerName}/g, 'there')
        .replace('{senderName}', 'The LocalWorld Team'),
    };
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link href="/admin/outreach" className="text-primary hover:underline text-sm mb-4 inline-flex items-center gap-1">
          ← Back to Outreach
        </Link>
        <h1 className="text-2xl font-bold text-primary font-display">New Outreach Campaign</h1>
        <p className="text-muted mt-1">Create and send outreach to businesses</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center gap-4 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
              step >= s ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {step > s ? '✓' : s}
            </div>
            <span className={`ml-2 font-medium ${step >= s ? 'text-primary' : 'text-gray-400'}`}>
              {s === 1 ? 'Select Businesses' : s === 2 ? 'Choose Message' : 'Review & Send'}
            </span>
            {s < 3 && <div className="w-8 h-0.5 bg-gray-200 ml-4" />}
          </div>
        ))}
      </div>

      {/* Step 1: Select Businesses */}
      {step === 1 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-bold text-primary">Select Businesses</h2>
              <div className="flex gap-2">
                <button onClick={selectAll} className="text-sm text-primary hover:underline">Select All</button>
                <span className="text-gray-300">|</span>
                <button onClick={deselectAll} className="text-sm text-gray-500 hover:underline">Deselect All</button>
              </div>
            </div>
            <div className="mt-4">
              <input
                type="text"
                placeholder="Search businesses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              />
            </div>
          </div>
          <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
            {filteredBusinesses.map((business) => (
              <div
                key={business.id}
                onClick={() => toggleBusiness(business.id)}
                className={`p-4 cursor-pointer transition-colors ${
                  selectedBusinesses.includes(business.id) ? 'bg-primary/5' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    selectedBusinesses.includes(business.id) ? 'bg-primary border-primary' : 'border-gray-300'
                  }`}>
                    {selectedBusinesses.includes(business.id) && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-primary">{business.name}</p>
                    <p className="text-sm text-gray-500">{business.category} • {business.neighborhood}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                      business.status === 'featured' ? 'bg-green-100 text-green-700' :
                      business.status === 'prospect' ? 'bg-blue-100 text-blue-700' :
                      business.status === 'contacted' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {business.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-100 bg-gray-50">
            <p className="text-sm text-gray-600">
              {selectedBusinesses.length} businesses selected
            </p>
          </div>
        </div>
      )}

      {/* Step 2: Choose Message */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-primary mb-4">Choose Template</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {Object.values(OUTREACH_TEMPLATES).map((tmpl) => (
                <button
                  key={tmpl.id}
                  onClick={() => handleTemplateChange(tmpl.id)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    template === tmpl.id ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <p className="font-medium text-primary">{tmpl.name}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-primary">Message</h2>
              <button
                onClick={() => setCustomMessage(!customMessage)}
                className="text-sm text-primary hover:underline"
              >
                {customMessage ? 'Use Template' : 'Customize Message'}
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => { setSubject(e.target.value); setCustomMessage(true); }}
                  disabled={!customMessage}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message Body</label>
                <textarea
                  value={body}
                  onChange={(e) => { setBody(e.target.value); setCustomMessage(true); }}
                  disabled={!customMessage}
                  rows={10}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none disabled:bg-gray-50 disabled:text-gray-500 resize-none"
                />
              </div>
              <p className="text-xs text-gray-500">
                Use {'{businessName}'}, {'{ownerName}'}, {'{senderName}'} as placeholders
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Review & Send */}
      {step === 3 && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-primary mb-4">Review Campaign</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Channel</p>
                <p className="font-medium">{CHANNELS.find(c => c.id === channel)?.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Template</p>
                <p className="font-medium">{OUTREACH_TEMPLATES[template as keyof typeof OUTREACH_TEMPLATES].name}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50">
              <h3 className="font-bold text-primary">Message Preview ({selectedBusinesses.length} recipients)</h3>
            </div>
            <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
              {selectedBusinesses.map((id) => {
                const business = sampleBusinesses.find(b => b.id === id);
                if (!business) return null;
                const preview = previewMessage(business);
                return (
                  <div key={id} className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        {business.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-primary">{business.name}</p>
                        <p className="text-sm text-gray-500">
                          {channel === 'email' ? business.email : `@${business.social?.instagram?.split('/').pop() || business.name.toLowerCase().replace(/\s+/g, '')}`}
                        </p>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 text-sm">
                      <p className="font-medium text-gray-700 mb-2">{preview.subject}</p>
                      <p className="text-gray-600 whitespace-pre-wrap">{preview.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8">
        {step > 1 ? (
          <button
            onClick={() => setStep(step - 1)}
            className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Back
          </button>
        ) : (
          <Link
            href="/admin/outreach"
            className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Cancel
          </Link>
        )}
        <button
          onClick={handleNext}
          disabled={(step === 1 && selectedBusinesses.length === 0) || sending}
          className="px-6 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {sending ? (
            <>
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Sending...
            </>
          ) : step === 3 ? (
            <>
              <span>📤</span>
              Send Campaign
            </>
          ) : (
            'Continue →'
          )}
        </button>
      </div>
    </div>
  );
}
