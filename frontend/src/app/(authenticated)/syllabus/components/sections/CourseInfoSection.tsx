"use client";

interface CourseInfo {
  course_code: string;
  course_title: string;
  description: string;
  credits: string;
  modality: string;
  contact_hours: string;
  prerequisite: string;
  ay_semester: string;
}

interface Props {
  data: CourseInfo;
  onChange: (data: CourseInfo) => void;
}

export default function CourseInfoSection({ data, onChange }: Props) {
  const set = (key: keyof CourseInfo, value: string) =>
    onChange({ ...data, [key]: value });

  const fields: { key: keyof CourseInfo; label: string; span?: "full"; textarea?: boolean }[] = [
    { key: "course_code",   label: "Course Code" },
    { key: "course_title",  label: "Course Title" },
    { key: "description",   label: "Description",  span: "full", textarea: true },
    { key: "credits",       label: "Credits" },
    { key: "modality",      label: "Modality" },
    { key: "contact_hours", label: "Contact Hours" },
    { key: "prerequisite",  label: "Pre-requisite / Co-requisite" },
    { key: "ay_semester",   label: "A.Y. and Semester" },
  ];

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-lg font-bold text-slate-900">Course Information</h2>
        <p className="text-sm text-slate-500 mt-0.5">Basic details about the course.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {fields.map(f => (
            <div key={f.key} className={f.span === "full" ? "md:col-span-2" : ""}>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                {f.label}
              </label>
              {f.textarea ? (
                <textarea
                  rows={3}
                  className="w-full p-3 border border-slate-200 rounded-lg text-sm text-slate-900 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 resize-none transition"
                  value={data[f.key]}
                  onChange={e => set(f.key, e.target.value)}
                />
              ) : (
                <input
                  type="text"
                  className="w-full p-3 border border-slate-200 rounded-lg text-sm text-slate-900 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
                  value={data[f.key]}
                  onChange={e => set(f.key, e.target.value)}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
