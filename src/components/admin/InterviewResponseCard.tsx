'use client';

import { InterviewResponse } from '@/lib/crm-types';
import { INTERVIEW_QUESTIONS } from '@/data/crm-data';
import Image from 'next/image';

interface InterviewResponseCardProps {
  interview: InterviewResponse;
  businessName: string;
  onViewDetails?: (interview: InterviewResponse) => void;
}

export function InterviewResponseCard({ interview, businessName, onViewDetails }: InterviewResponseCardProps) {
  const getStatusColor = (status: InterviewResponse['status']) => {
    const colors: Record<string, string> = {
      pending: 'bg-gray-100 text-gray-600',
      received: 'bg-blue-100 text-blue-600',
      in_review: 'bg-yellow-100 text-yellow-700',
      approved: 'bg-green-100 text-green-600',
      published: 'bg-purple-100 text-purple-600',
      rejected: 'bg-red-100 text-red-600',
    };
    return colors[status] || 'bg-gray-100 text-gray-600';
  };

  const answeredCount = Object.values(interview.responses).filter(Boolean).length;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-bold text-primary text-lg">{businessName}</h3>
            <p className="text-sm text-gray-500">
              Received {interview.receivedAt ? new Date(interview.receivedAt).toLocaleDateString() : 'N/A'}
            </p>
          </div>
          <span className={`px-3 py-1.5 rounded-full text-sm font-medium capitalize ${getStatusColor(interview.status)}`}>
            {interview.status.replace('_', ' ')}
          </span>
        </div>

        <div className="mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <span>📝</span>
            <span>{answeredCount} of 5 questions answered</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all"
              style={{ width: `${(answeredCount / 5) * 100}%` }}
            />
          </div>
        </div>

        {interview.images && interview.images.length > 0 && (
          <div className="mb-4">
            <div className="flex gap-2">
              {interview.images.slice(0, 3).map((img, i) => (
                <div key={i} className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={img}
                    alt={`Image ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
              ))}
              {interview.images.length > 3 && (
                <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 text-sm font-medium">
                  +{interview.images.length - 3}
                </div>
              )}
            </div>
          </div>
        )}

        {interview.notes && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{interview.notes}</p>
        )}

        <div className="flex gap-2">
          <button
            onClick={() => onViewDetails?.(interview)}
            className="flex-1 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            View Full Response
          </button>
          {interview.status === 'received' && (
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors">
              Approve
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

interface InterviewResponseViewerProps {
  interview: InterviewResponse;
  businessName: string;
  onClose: () => void;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
}

export function InterviewResponseViewer({ interview, businessName, onClose, onApprove, onReject }: InterviewResponseViewerProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-primary">{businessName}</h2>
            <p className="text-sm text-gray-500">Interview Responses</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {Object.entries(INTERVIEW_QUESTIONS).map(([key, q], i) => (
              <div key={key} className="bg-gray-50 rounded-xl p-5">
                <div className="flex items-start gap-3 mb-3">
                  <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {i + 1}
                  </span>
                  <p className="font-medium text-primary italic leading-relaxed">&ldquo;{q.question}&rdquo;</p>
                </div>
                {interview.responses[key as keyof typeof interview.responses] ? (
                  <p className="text-gray-700 leading-relaxed pl-11">
                    {interview.responses[key as keyof typeof interview.responses]}
                  </p>
                ) : (
                  <p className="text-gray-400 italic pl-11">No response yet</p>
                )}
              </div>
            ))}
          </div>

          {interview.images && interview.images.length > 0 && (
            <div className="mt-8">
              <h3 className="font-bold text-primary mb-4">Photos</h3>
              <div className="grid grid-cols-2 gap-4">
                {interview.images.map((img, i) => (
                  <div key={i} className="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
                    <Image
                      src={img}
                      alt={`Image ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {interview.notes && (
            <div className="mt-8 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
              <h4 className="font-medium text-yellow-800 mb-1">Notes</h4>
              <p className="text-yellow-700">{interview.notes}</p>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-100 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
          {interview.status === 'received' && (
            <>
              <button
                onClick={() => onReject?.(interview.id)}
                className="px-4 py-2.5 bg-red-100 text-red-600 rounded-lg font-medium hover:bg-red-200 transition-colors"
              >
                Reject
              </button>
              <button
                onClick={() => onApprove?.(interview.id)}
                className="px-6 py-2.5 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
              >
                Approve for Publication
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
