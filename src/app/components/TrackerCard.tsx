import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Application } from '../pages/Tracker';

interface TrackerCardProps {
  application: Application;
  onUpdate: (id: string, field: keyof Application, value: string) => void;
  onDelete: (id: string) => void;
  isReadOnly?: boolean;
}

const CURRENT_STAGES = [
  'Applied',
  'Shortlisted',
  'Interview – R1',
  'Interview – R2',
  'Interview – Final',
  'Rejected',
  'Offer',
];

const OUTCOMES = [
  'Waiting',
  'Rejected',
  'Offer received',
  'Offer accepted',
  'Dropped by me',
];

export function TrackerCard({ application, onUpdate, onDelete, isReadOnly = false }: TrackerCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [editingField, setEditingField] = useState<keyof Application | null>(null);
  const [showSaveMessage, setShowSaveMessage] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(null);

  useEffect(() => {
    if (editingField && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingField]);

  const handleBlur = (field: keyof Application, value: string) => {
    if (value !== application[field]) {
      onUpdate(application.id, field, value);
      
      // Show save message briefly
      setShowSaveMessage(true);
      setTimeout(() => setShowSaveMessage(false), 2000);
    }
    setEditingField(null);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '—';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Build status line: "Applied · Interview R1 · Waiting"
  const buildStatusLine = () => {
    const parts = [];
    if (application.currentStage) parts.push(application.currentStage);
    if (application.outcome && application.outcome !== 'Waiting') parts.push(application.outcome);
    return parts.join(' · ') || 'No status yet';
  };

  return (
    <div className="bg-white border border-[#F1F1F1] rounded-[12px] p-3 mb-3">
      {/* COLLAPSED STATE */}
      <div 
        className="cursor-pointer"
        onClick={() => !isReadOnly && setIsExpanded(!isExpanded)}
      >
        {/* Company Name */}
        <div className="text-[12px] leading-[16px] font-normal text-[#A8A29E] mb-1">
          {application.company || 'Company name'}
        </div>

        {/* Role Title - HERO */}
        <h3 className="text-[15px] leading-[20px] font-semibold text-[#1C1917] mb-1.5 line-clamp-2">
          {application.role || 'Role title'}
        </h3>

        {/* Status Line */}
        <div className="text-[12px] leading-[16px] font-normal text-[#78716C] mb-2">
          {buildStatusLine()}
        </div>

        {/* Expand/Collapse indicator */}
        <div className="flex items-center justify-between">
          <button 
            className="text-[12px] font-medium text-[#1C1917] hover:text-[#78716C] transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
          >
            {isExpanded ? 'Collapse' : 'Edit'}
          </button>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-[#A8A29E]" />
          ) : (
            <ChevronDown className="w-4 h-4 text-[#A8A29E]" />
          )}
        </div>
      </div>

      {/* EXPANDED STATE */}
      {isExpanded && (
        <div 
          className="mt-3 pt-3 border-t border-[#F1F1F1] space-y-3"
          style={{
            animation: 'expandCard 140ms ease-out'
          }}
        >
          {/* Company Field */}
          <div>
            <label className="block text-[11px] leading-[14px] font-medium text-[#A8A29E] mb-1">
              Company
            </label>
            {editingField === 'company' ? (
              <input
                ref={inputRef as React.RefObject<HTMLInputElement>}
                type="text"
                defaultValue={application.company}
                onBlur={(e) => handleBlur('company', e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') e.currentTarget.blur();
                  if (e.key === 'Escape') setEditingField(null);
                }}
                className="w-full px-3 py-2 text-[13px] leading-[18px] border border-[#EAEAEA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F172A]/20 focus:border-[#0F172A]"
                placeholder="Company name"
              />
            ) : (
              <div
                onClick={() => !isReadOnly && setEditingField('company')}
                className="text-[13px] leading-[18px] font-normal text-[#1C1917] cursor-text py-2"
              >
                {application.company || '—'}
              </div>
            )}
          </div>

          {/* Role Field */}
          <div>
            <label className="block text-[11px] leading-[14px] font-medium text-[#A8A29E] mb-1">
              Role
            </label>
            {editingField === 'role' ? (
              <input
                ref={inputRef as React.RefObject<HTMLInputElement>}
                type="text"
                defaultValue={application.role}
                onBlur={(e) => handleBlur('role', e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') e.currentTarget.blur();
                  if (e.key === 'Escape') setEditingField(null);
                }}
                className="w-full px-3 py-2 text-[13px] leading-[18px] border border-[#EAEAEA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F172A]/20 focus:border-[#0F172A]"
                placeholder="Role title"
              />
            ) : (
              <div
                onClick={() => !isReadOnly && setEditingField('role')}
                className="text-[13px] leading-[18px] font-normal text-[#1C1917] cursor-text py-2"
              >
                {application.role || '—'}
              </div>
            )}
          </div>

          {/* Applied On Field */}
          <div>
            <label className="block text-[11px] leading-[14px] font-medium text-[#A8A29E] mb-1">
              Applied on
            </label>
            {editingField === 'appliedOn' ? (
              <input
                ref={inputRef as React.RefObject<HTMLInputElement>}
                type="date"
                defaultValue={application.appliedOn}
                onBlur={(e) => handleBlur('appliedOn', e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') e.currentTarget.blur();
                  if (e.key === 'Escape') setEditingField(null);
                }}
                className="w-full px-3 py-2 text-[13px] leading-[18px] border border-[#EAEAEA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F172A]/20 focus:border-[#0F172A]"
              />
            ) : (
              <div
                onClick={() => !isReadOnly && setEditingField('appliedOn')}
                className="text-[13px] leading-[18px] font-normal text-[#1C1917] cursor-text py-2"
              >
                {formatDate(application.appliedOn)}
              </div>
            )}
          </div>

          {/* Current Stage Dropdown */}
          <div>
            <label className="block text-[11px] leading-[14px] font-medium text-[#A8A29E] mb-1">
              Current stage
            </label>
            {editingField === 'currentStage' ? (
              <select
                ref={inputRef as React.RefObject<HTMLSelectElement>}
                defaultValue={application.currentStage}
                onChange={(e) => {
                  handleBlur('currentStage', e.target.value);
                }}
                className="w-full h-9 px-3 text-[13px] border border-[#EAEAEA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F172A]/20 focus:border-[#0F172A] bg-white"
              >
                {CURRENT_STAGES.map((stage) => (
                  <option key={stage} value={stage}>
                    {stage}
                  </option>
                ))}
              </select>
            ) : (
              <div
                onClick={() => !isReadOnly && setEditingField('currentStage')}
                className="text-[13px] leading-[18px] font-normal text-[#1C1917] cursor-pointer py-2"
              >
                {application.currentStage || 'Applied'}
              </div>
            )}
          </div>

          {/* Interview Notes */}
          <div>
            <label className="block text-[11px] leading-[14px] font-medium text-[#A8A29E] mb-1">
              Interview notes
            </label>
            {editingField === 'interviewNotes' ? (
              <textarea
                ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                defaultValue={application.interviewNotes}
                onBlur={(e) => handleBlur('interviewNotes', e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') setEditingField(null);
                }}
                className="w-full min-h-[72px] px-2 py-2 text-[13px] leading-[18px] border border-[#EAEAEA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F172A]/20 focus:border-[#0F172A] resize-y"
                placeholder="Add notes..."
              />
            ) : (
              <div
                onClick={() => !isReadOnly && setEditingField('interviewNotes')}
                className="text-[13px] leading-[18px] font-normal text-[#1C1917] cursor-text py-2 min-h-[36px] whitespace-pre-wrap"
              >
                {application.interviewNotes || '—'}
              </div>
            )}
          </div>

          {/* Outcome Dropdown */}
          <div>
            <label className="block text-[11px] leading-[14px] font-medium text-[#A8A29E] mb-1">
              Outcome
            </label>
            {editingField === 'outcome' ? (
              <select
                ref={inputRef as React.RefObject<HTMLSelectElement>}
                defaultValue={application.outcome}
                onChange={(e) => {
                  handleBlur('outcome', e.target.value);
                }}
                className="w-full h-9 px-3 text-[13px] border border-[#EAEAEA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F172A]/20 focus:border-[#0F172A] bg-white"
              >
                {OUTCOMES.map((outcome) => (
                  <option key={outcome} value={outcome}>
                    {outcome}
                  </option>
                ))}
              </select>
            ) : (
              <div
                onClick={() => !isReadOnly && setEditingField('outcome')}
                className="text-[13px] leading-[18px] font-normal text-[#1C1917] cursor-pointer py-2"
              >
                {application.outcome || 'Waiting'}
              </div>
            )}
          </div>

          {/* What I Learned */}
          <div>
            <label className="block text-[11px] leading-[14px] font-medium text-[#A8A29E] mb-1">
              What I learned
            </label>
            {editingField === 'whatILearned' ? (
              <textarea
                ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                defaultValue={application.whatILearned}
                onBlur={(e) => handleBlur('whatILearned', e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') setEditingField(null);
                }}
                className="w-full min-h-[72px] px-2 py-2 text-[13px] leading-[18px] border border-[#EAEAEA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F172A]/20 focus:border-[#0F172A] resize-y"
                placeholder="Reflection..."
              />
            ) : (
              <div
                onClick={() => !isReadOnly && setEditingField('whatILearned')}
                className="text-[13px] leading-[18px] font-normal text-[#1C1917] cursor-text py-2 min-h-[36px] whitespace-pre-wrap"
              >
                {application.whatILearned || '—'}
              </div>
            )}
          </div>

          {/* Delete Button */}
          {!isReadOnly && (
            <button
              onClick={() => onDelete(application.id)}
              className="w-full mt-2 py-2 text-[12px] font-medium text-[#d4183d] hover:bg-[#FEF2F2] rounded-lg transition-colors"
            >
              Delete application
            </button>
          )}

          {/* Auto-save message */}
          {showSaveMessage && (
            <p className="text-[11px] text-[#A8A29E] text-center mt-2">
              Changes saved automatically
            </p>
          )}
        </div>
      )}
    </div>
  );
}