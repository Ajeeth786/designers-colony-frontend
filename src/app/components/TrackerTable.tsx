import { useState, useRef, useEffect } from 'react';
import React from 'react';
import { Trash2, Plus } from 'lucide-react';
import { Application } from '../pages/Tracker';
import { LoginGate } from './LoginGate';

interface TrackerTableProps {
  applications: Application[];
  onUpdate: (id: string, field: keyof Application, value: string) => void;
  onDelete: (id: string) => void;
  onAddRow: () => void;
  isReadOnly?: boolean;
  showLoginGate?: boolean;
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

interface EditingCell {
  id: string;
  field: keyof Application;
}

export function TrackerTable({ applications, onUpdate, onDelete, onAddRow, isReadOnly = false, showLoginGate = false }: TrackerTableProps) {
  const [editingCell, setEditingCell] = useState<EditingCell | null>(null);
  const [editValue, setEditValue] = useState('');
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(null);

  useEffect(() => {
    if (editingCell && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingCell]);

  const toggleRowExpansion = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const handleCellClick = (id: string, field: keyof Application, currentValue: string) => {
    if (field === 'id' || isReadOnly) return; // Don't allow editing in read-only mode
    setEditingCell({ id, field });
    setEditValue(currentValue);
  };

  const handleSave = () => {
    if (editingCell) {
      onUpdate(editingCell.id, editingCell.field, editValue);
      setEditingCell(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, isTextArea: boolean = false) => {
    if (e.key === 'Enter' && !isTextArea) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      setEditingCell(null);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '—';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const isEmptyRow = (app: Application) => {
    return !app.company && !app.role && !app.appliedOn && !app.interviewNotes && !app.whatILearned;
  };

  return (
    <>
      <div className="bg-white border border-[#E7E5E4] rounded-xl overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px]">
            <thead>
              <tr className="border-b border-[#E7E5E4]">
                <th className="text-left px-6 py-3 text-[13px] font-semibold text-[#44403C] bg-[#FAFAF9]">
                  Company
                </th>
                <th className="text-left px-6 py-3 text-[13px] font-semibold text-[#44403C] bg-[#FAFAF9]">
                  Role
                </th>
                <th className="text-left px-6 py-3 text-[13px] font-semibold text-[#44403C] bg-[#FAFAF9]">
                  Applied On
                </th>
                <th className="text-left px-6 py-3 text-[13px] font-semibold text-[#44403C] bg-[#FAFAF9]">
                  Current Stage
                </th>
                <th className="text-left px-6 py-3 text-[13px] font-semibold text-[#44403C] bg-[#FAFAF9]">
                  Interview Notes
                </th>
                <th className="text-left px-6 py-3 text-[13px] font-semibold text-[#44403C] bg-[#FAFAF9]">
                  Outcome
                </th>
                <th className="text-left px-6 py-3 text-[13px] font-semibold text-[#44403C] bg-[#FAFAF9]">
                  What I learned
                </th>
                <th className="text-left px-6 py-3 text-[13px] font-semibold text-[#44403C] bg-[#FAFAF9] w-[60px]">
                </th>
              </tr>
            </thead>
            <tbody>
              {applications.length === 0 ? (
                <tr className="border-b border-[#E7E5E4]">
                  <td
                    className="px-6 py-4 text-[14px] text-[#A8A29E] italic cursor-pointer hover:text-[#78716C]"
                    onClick={onAddRow}
                    colSpan={8}
                  >
                    Type here to start tracking…
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr key={app.id} className={`border-b border-[#E7E5E4] last:border-0 transition-colors group ${isReadOnly ? 'opacity-60' : 'hover:bg-[#FAFAF9]/50'}`}>
                    {/* Company */}
                    <td
                      className={`px-6 py-3 text-[14px] text-[#1C1917] ${!isReadOnly && 'cursor-text'}`}
                      onClick={() => handleCellClick(app.id, 'company', app.company)}
                    >
                      {editingCell?.id === app.id && editingCell.field === 'company' ? (
                        <input
                          ref={inputRef as React.RefObject<HTMLInputElement>}
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onBlur={handleSave}
                          onKeyDown={(e) => handleKeyDown(e)}
                          placeholder="Company name"
                          className="w-full px-2 py-1.5 border border-[#D6D3D1] rounded text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0F172A]/20 focus:border-[#0F172A]"
                        />
                      ) : (
                        <span className={`block py-1.5 px-2 rounded ${!app.company && isEmptyRow(app) ? 'text-[#A8A29E] italic' : ''}`}>
                          {app.company || 'Type here…'}
                        </span>
                      )}
                    </td>

                    {/* Role */}
                    <td
                      className={`px-6 py-3 text-[14px] text-[#1C1917] ${!isReadOnly && 'cursor-text'}`}
                      onClick={() => handleCellClick(app.id, 'role', app.role)}
                    >
                      {editingCell?.id === app.id && editingCell.field === 'role' ? (
                        <input
                          ref={inputRef as React.RefObject<HTMLInputElement>}
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onBlur={handleSave}
                          onKeyDown={(e) => handleKeyDown(e)}
                          placeholder="Role title"
                          className="w-full px-2 py-1.5 border border-[#D6D3D1] rounded text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0F172A]/20 focus:border-[#0F172A]"
                        />
                      ) : (
                        <span className="block py-1.5 px-2 rounded">{app.role || '—'}</span>
                      )}
                    </td>

                    {/* Applied On */}
                    <td
                      className={`px-6 py-3 text-[14px] text-[#78716C] ${!isReadOnly && 'cursor-text'}`}
                      onClick={() => handleCellClick(app.id, 'appliedOn', app.appliedOn)}
                    >
                      {editingCell?.id === app.id && editingCell.field === 'appliedOn' ? (
                        <input
                          ref={inputRef as React.RefObject<HTMLInputElement>}
                          type="date"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onBlur={handleSave}
                          onKeyDown={(e) => handleKeyDown(e)}
                          className="w-full px-2 py-1.5 border border-[#D6D3D1] rounded text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0F172A]/20 focus:border-[#0F172A]"
                        />
                      ) : (
                        <span className="block py-1.5 px-2 rounded">{formatDate(app.appliedOn)}</span>
                      )}
                    </td>

                    {/* Current Stage */}
                    <td
                      className={`px-6 py-3 text-[14px] text-[#1C1917] ${!isReadOnly && 'cursor-pointer'}`}
                      onClick={() => handleCellClick(app.id, 'currentStage', app.currentStage)}
                    >
                      {editingCell?.id === app.id && editingCell.field === 'currentStage' ? (
                        <select
                          ref={inputRef as React.RefObject<HTMLSelectElement>}
                          value={editValue}
                          onChange={(e) => {
                            setEditValue(e.target.value);
                            onUpdate(app.id, 'currentStage', e.target.value);
                            setEditingCell(null);
                          }}
                          onBlur={handleSave}
                          className="w-full px-2 py-1.5 border border-[#D6D3D1] rounded text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0F172A]/20 focus:border-[#0F172A]"
                        >
                          {CURRENT_STAGES.map((stage) => (
                            <option key={stage} value={stage}>
                              {stage}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span className={`block py-1.5 px-2 rounded ${!isReadOnly && 'hover:bg-[#F5F5F4]'}`}>{app.currentStage}</span>
                      )}
                    </td>

                    {/* Interview Notes */}
                    <td
                      className={`px-6 py-3 text-[14px] text-[#78716C] align-top ${!isReadOnly && 'cursor-text'}`}
                      onClick={() => handleCellClick(app.id, 'interviewNotes', app.interviewNotes)}
                    >
                      {editingCell?.id === app.id && editingCell.field === 'interviewNotes' ? (
                        <textarea
                          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onBlur={handleSave}
                          onKeyDown={(e) => {
                            if (e.key === 'Escape') {
                              setEditingCell(null);
                            }
                          }}
                          placeholder="Notes..."
                          rows={3}
                          className="w-full px-2 py-1.5 border border-[#D6D3D1] rounded text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0F172A]/20 focus:border-[#0F172A] resize-none"
                        />
                      ) : (
                        <span className="block py-1.5 px-2 rounded whitespace-pre-wrap">{app.interviewNotes || '—'}</span>
                      )}
                    </td>

                    {/* Outcome */}
                    <td
                      className={`px-6 py-3 text-[14px] text-[#1C1917] ${!isReadOnly && 'cursor-pointer'}`}
                      onClick={() => handleCellClick(app.id, 'outcome', app.outcome)}
                    >
                      {editingCell?.id === app.id && editingCell.field === 'outcome' ? (
                        <select
                          ref={inputRef as React.RefObject<HTMLSelectElement>}
                          value={editValue}
                          onChange={(e) => {
                            setEditValue(e.target.value);
                            onUpdate(app.id, 'outcome', e.target.value);
                            setEditingCell(null);
                          }}
                          onBlur={handleSave}
                          className="w-full px-2 py-1.5 border border-[#D6D3D1] rounded text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0F172A]/20 focus:border-[#0F172A]"
                        >
                          {OUTCOMES.map((outcome) => (
                            <option key={outcome} value={outcome}>
                              {outcome}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span className={`block py-1.5 px-2 rounded ${!isReadOnly && 'hover:bg-[#F5F5F4]'}`}>{app.outcome}</span>
                      )}
                    </td>

                    {/* What I learned */}
                    <td
                      className={`px-6 py-3 text-[14px] text-[#78716C] align-top ${!isReadOnly && 'cursor-text'}`}
                      onClick={() => handleCellClick(app.id, 'whatILearned', app.whatILearned)}
                    >
                      {editingCell?.id === app.id && editingCell.field === 'whatILearned' ? (
                        <textarea
                          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onBlur={handleSave}
                          onKeyDown={(e) => {
                            if (e.key === 'Escape') {
                              setEditingCell(null);
                            }
                          }}
                          placeholder="Reflection..."
                          rows={3}
                          className="w-full px-2 py-1.5 border border-[#D6D3D1] rounded text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0F172A]/20 focus:border-[#0F172A] resize-none"
                        />
                      ) : (
                        <span className="block py-1.5 px-2 rounded whitespace-pre-wrap">{app.whatILearned || '—'}</span>
                      )}
                    </td>

                    {/* Delete */}
                    <td className="px-6 py-3">
                      {!isReadOnly && (
                        <button
                          onClick={() => onDelete(app.id)}
                          className="opacity-0 group-hover:opacity-100 text-[#A8A29E] hover:text-[#d4183d] transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Add New Row */}
        {!showLoginGate && (
          <div className="border-t border-[#E7E5E4] px-6 py-3">
            <button
              onClick={onAddRow}
              className="flex items-center gap-2 text-[14px] font-medium text-[#78716C] hover:text-[#1C1917] transition-colors"
            >
              <Plus className="w-4 h-4" />
              New row
            </button>
          </div>
        )}
      </div>

      {/* Login Gate - appears after 3 rows */}
      {showLoginGate && <LoginGate />}
    </>
  );
}