"use client";

interface ApprovalData {
  prepared_by: string;
  reviewed_by: string;
  chairperson: string;
  dean: string;
}

interface Props {
  data: ApprovalData;
  onChange: (data: ApprovalData) => void;
}

export default function ApprovalSection({ data, onChange }: Props) {
  const set = (key: keyof ApprovalData, value: string) =>
    onChange({ ...data, [key]: value });

  const fields: { key: keyof ApprovalData; label: string; role: string }[] = [
    { key: "prepared_by",  label: "Prepared By",       role: "Faculty Member" },
    { key: "reviewed_by",  label: "Reviewed By",        role: "Peer Reviewer" },
    { key: "chairperson",  label: "Department Chair",   role: "Department Chairperson" },
    { key: "dean",         label: "Dean",               role: "College Dean" },
  ];

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-lg font-bold text-slate-900">Approval</h2>
        <p className="text-sm text-slate-500 mt-0.5">Names of the faculty and approving officials.</p>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fields.map(f => (
            <div key={f.key} className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide">
                {f.label}
              </label>
              <input
                type="text"
                className="w-full p-3 border border-slate-200 rounded-lg text-sm text-slate-900 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
                placeholder={`Full name of ${f.role.toLowerCase()}`}
                value={data[f.key]}
                onChange={e => set(f.key, e.target.value)}
              />
              <p className="text-[11px] text-slate-400">{f.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
