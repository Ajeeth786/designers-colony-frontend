import { useState, useRef, useEffect } from "react";
import { Trash2, Plus } from "lucide-react";
import { Application } from "../pages/Tracker";

interface TrackerTableProps {
  applications: Application[];
  onUpdate: (
    id: string,
    field: keyof Application,
    value: string
  ) => void;
  onDelete: (id: string) => void;
  onAddRow: () => void;
}

const CURRENT_STAGES = [
  "Applied",
  "Shortlisted",
  "Interview – R1",
  "Interview – R2",
  "Interview – Final",
  "Rejected",
  "Offer",
];

const OUTCOMES = [
  "Waiting",
  "Rejected",
  "Offer received",
  "Offer accepted",
  "Dropped by me",
];

interface EditingCell {
  id: string;
  field: keyof Application;
}

export function TrackerTable({
  applications,
  onUpdate,
  onDelete,
  onAddRow,
}: TrackerTableProps) {
  const [editingCell, setEditingCell] =
    useState<EditingCell | null>(null);
  const [editValue, setEditValue] = useState("");
  const inputRef =
    useRef<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(null);

  useEffect(() => {
    if (editingCell && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingCell]);

  const handleCellClick = (
    id: string,
    field: keyof Application,
    currentValue: string
  ) => {
    if (field === "id") return;
    setEditingCell({ id, field });
    setEditValue(currentValue);
  };

  const handleSave = () => {
    if (!editingCell) return;
    onUpdate(editingCell.id, editingCell.field, editValue);
    setEditingCell(null);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white border border-[#E7E5E4] rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1200px]">
          <thead>
            <tr className="border-b border-[#E7E5E4] bg-[#FAFAF9]">
              {[
                "Company",
                "Role",
                "Applied On",
                "Current Stage",
                "Interview Notes",
                "Outcome",
                "What I learned",
                "",
              ].map((h) => (
                <th
                  key={h}
                  className="text-left px-6 py-3 text-[13px] font-semibold text-[#44403C]"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {applications.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  onClick={onAddRow}
                  className="px-6 py-4 text-[14px] text-[#A8A29E] italic cursor-pointer hover:text-[#78716C]"
                >
                  Type here to start tracking…
                </td>
              </tr>
            ) : (
              applications.map((app) => (
                <tr
                  key={app.id}
                  className="border-b border-[#E7E5E4] last:border-0 hover:bg-[#FAFAF9]/50"
                >
                  {/* Company */}
                  <td
                    className="px-6 py-3 cursor-text"
                    onClick={() =>
                      handleCellClick(app.id, "company", app.company)
                    }
                  >
                    {editingCell?.id === app.id &&
                    editingCell.field === "company" ? (
                      <input
                        ref={inputRef as React.RefObject<HTMLInputElement>}
                        value={editValue}
                        onChange={(e) =>
                          setEditValue(e.target.value)
                        }
                        onBlur={handleSave}
                        className="w-full px-2 py-1.5 border rounded"
                      />
                    ) : (
                      app.company || "—"
                    )}
                  </td>

                  {/* Role */}
                  <td
                    className="px-6 py-3 cursor-text"
                    onClick={() =>
                      handleCellClick(app.id, "role", app.role)
                    }
                  >
                    {editingCell?.id === app.id &&
                    editingCell.field === "role" ? (
                      <input
                        ref={inputRef as React.RefObject<HTMLInputElement>}
                        value={editValue}
                        onChange={(e) =>
                          setEditValue(e.target.value)
                        }
                        onBlur={handleSave}
                        className="w-full px-2 py-1.5 border rounded"
                      />
                    ) : (
                      app.role || "—"
                    )}
                  </td>

                  {/* Applied On */}
                  <td
                    className="px-6 py-3 cursor-text"
                    onClick={() =>
                      handleCellClick(
                        app.id,
                        "appliedOn",
                        app.appliedOn
                      )
                    }
                  >
                    {editingCell?.id === app.id &&
                    editingCell.field === "appliedOn" ? (
                      <input
                        ref={inputRef as React.RefObject<HTMLInputElement>}
                        type="date"
                        value={editValue}
                        onChange={(e) =>
                          setEditValue(e.target.value)
                        }
                        onBlur={handleSave}
                        className="w-full px-2 py-1.5 border rounded"
                      />
                    ) : (
                      formatDate(app.appliedOn)
                    )}
                  </td>

                  {/* Stage */}
                  <td
                    className="px-6 py-3 cursor-pointer"
                    onClick={() =>
                      handleCellClick(
                        app.id,
                        "currentStage",
                        app.currentStage
                      )
                    }
                  >
                    {editingCell?.id === app.id &&
                    editingCell.field === "currentStage" ? (
                      <select
                        ref={
                          inputRef as React.RefObject<HTMLSelectElement>
                        }
                        value={editValue}
                        onChange={(e) => {
                          onUpdate(
                            app.id,
                            "currentStage",
                            e.target.value
                          );
                          setEditingCell(null);
                        }}
                        className="w-full px-2 py-1.5 border rounded"
                      >
                        {CURRENT_STAGES.map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    ) : (
                      app.currentStage
                    )}
                  </td>

                  {/* Interview Notes */}
                  <td
                    className="px-6 py-3 cursor-text"
                    onClick={() =>
                      handleCellClick(
                        app.id,
                        "interviewNotes",
                        app.interviewNotes
                      )
                    }
                  >
                    {editingCell?.id === app.id &&
                    editingCell.field === "interviewNotes" ? (
                      <textarea
                        ref={
                          inputRef as React.RefObject<HTMLTextAreaElement>
                        }
                        value={editValue}
                        onChange={(e) =>
                          setEditValue(e.target.value)
                        }
                        onBlur={handleSave}
                        rows={2}
                        className="w-full px-2 py-1.5 border rounded"
                      />
                    ) : (
                      app.interviewNotes || "—"
                    )}
                  </td>

                  {/* Outcome */}
                  <td
                    className="px-6 py-3 cursor-pointer"
                    onClick={() =>
                      handleCellClick(
                        app.id,
                        "outcome",
                        app.outcome
                      )
                    }
                  >
                    {editingCell?.id === app.id &&
                    editingCell.field === "outcome" ? (
                      <select
                        ref={
                          inputRef as React.RefObject<HTMLSelectElement>
                        }
                        value={editValue}
                        onChange={(e) => {
                          onUpdate(
                            app.id,
                            "outcome",
                            e.target.value
                          );
                          setEditingCell(null);
                        }}
                        className="w-full px-2 py-1.5 border rounded"
                      >
                        {OUTCOMES.map((o) => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                    ) : (
                      app.outcome
                    )}
                  </td>

                  {/* Delete */}
                  <td className="px-6 py-3">
                    <button
                      onClick={() => onDelete(app.id)}
                      className="text-[#A8A29E] hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add row */}
      <div className="border-t border-[#E7E5E4] px-6 py-3">
        <button
          onClick={onAddRow}
          className="flex items-center gap-2 text-[14px] font-medium text-[#78716C] hover:text-[#1C1917]"
        >
          <Plus className="w-4 h-4" />
          New row
        </button>
      </div>
    </div>
  );
}
