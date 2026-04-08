"use client";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function ClassroomPoliciesSection({ value, onChange }: Props) {
  return (
    <div>
      <div className="mb-5">
        <h2 className="text-lg font-bold text-slate-900">Classroom Policies</h2>
        <p className="text-sm text-slate-500 mt-0.5">Rules and expectations for the course.</p>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <textarea
          rows={10}
          className="w-full p-3 border border-slate-200 rounded-lg text-sm text-slate-900 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 resize-none transition"
          placeholder="e.g. Please refer to the Students' Handbook. Additional rules specific to this course..."
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}
