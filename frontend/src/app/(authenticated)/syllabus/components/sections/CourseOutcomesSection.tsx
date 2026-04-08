"use client";

import { useState, useEffect } from "react";
import CRUDSection from "../CRUDSection";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"}/v1/course-outcomes`;

interface MasterOutcome {
  id: number;
  code: string;
  description: string;
}

interface Props {
  data: Record<string, any>[];
  onAdd: (item: Record<string, any>) => void;
  onUpdate: (index: number, item: Record<string, any>) => void;
  onDelete: (index: number) => void;
}

export default function CourseOutcomesSection({ data, onAdd, onUpdate, onDelete }: Props) {
  const [masterList, setMasterList] = useState<MasterOutcome[]>([]);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [selected, setSelected] = useState<Set<number>>(new Set());

  useEffect(() => {
    fetch(API_URL)
      .then(r => r.json())
      .then(setMasterList)
      .catch(() => {});
  }, [isPickerOpen]);

  const alreadyAdded = new Set(data.map(d => d.code));

  const toggleSelect = (id: number) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const addSelected = () => {
    masterList
      .filter(o => selected.has(o.id) && !alreadyAdded.has(o.code))
      .forEach(o => onAdd({ code: o.code, description: o.description }));
    setSelected(new Set());
    setIsPickerOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-start mb-5">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Course Outcomes</h2>
          <p className="text-sm text-slate-500 mt-0.5">At the end of the semester, the students should be able to:</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => { setSelected(new Set()); setIsPickerOpen(true); }}
            className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm flex items-center gap-1.5"
          >
            📋 Add from List
          </button>
        </div>
      </div>

      <CRUDSection
        title=""
        columns={[
          { key: "code",        label: "CO Code" },
          { key: "description", label: "Description", truncate: true },
        ]}
        fields={[
          { key: "code",        label: "CO Code",     required: true, placeholder: "e.g. CO1" },
          { key: "description", label: "Description", required: true, type: "textarea", placeholder: "Describe what students should be able to do..." },
        ]}
        data={data}
        onAdd={onAdd}
        onUpdate={onUpdate}
        onDelete={onDelete}
      />

      {/* Picker Modal */}
      {isPickerOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl max-h-[80vh] flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-800">Add from Master List</h3>
                <p className="text-xs text-slate-400 mt-0.5">Select outcomes to add to this syllabus</p>
              </div>
              <button onClick={() => setIsPickerOpen(false)} className="text-slate-400 hover:text-slate-600 text-2xl leading-none">×</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {masterList.length === 0 ? (
                <div className="text-center py-10 text-slate-400">
                  <p className="text-2xl mb-2">🎯</p>
                  <p className="text-sm">No outcomes in master list yet.</p>
                  <p className="text-xs mt-1">Go to <strong>Course Outcomes</strong> in the sidebar to add some.</p>
                </div>
              ) : (
                masterList.map(o => {
                  const alreadyIn = alreadyAdded.has(o.code);
                  const isChecked = selected.has(o.id);
                  return (
                    <label
                      key={o.id}
                      className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all
                        ${alreadyIn ? "opacity-40 cursor-not-allowed bg-slate-50 border-slate-200"
                          : isChecked ? "border-indigo-400 bg-indigo-50"
                          : "border-slate-200 hover:border-indigo-300 hover:bg-slate-50"}`}
                    >
                      <input
                        type="checkbox"
                        disabled={alreadyIn}
                        checked={isChecked || alreadyIn}
                        onChange={() => !alreadyIn && toggleSelect(o.id)}
                        className="mt-0.5 accent-indigo-600"
                      />
                      <div>
                        <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-2 py-0.5 rounded-md mr-2">
                          {o.code}
                        </span>
                        {alreadyIn && <span className="text-[10px] text-slate-400 font-medium">Already added</span>}
                        <p className="text-sm text-slate-700 mt-1">{o.description}</p>
                      </div>
                    </label>
                  );
                })
              )}
            </div>

            <div className="flex justify-between items-center p-6 border-t border-slate-100">
              <span className="text-sm text-slate-400">
                {selected.size > 0 ? `${selected.size} selected` : "None selected"}
              </span>
              <div className="flex gap-3">
                <button onClick={() => setIsPickerOpen(false)} className="px-5 py-2.5 text-slate-500 font-semibold text-sm hover:text-slate-700">
                  Cancel
                </button>
                <button
                  onClick={addSelected}
                  disabled={selected.size === 0}
                  className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
                >
                  Add Selected
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
