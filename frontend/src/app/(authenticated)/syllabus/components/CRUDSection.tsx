"use client";

import { useState } from "react";

export interface Column {
  key: string;
  label: string;
  truncate?: boolean;
}

export interface Field {
  key: string;
  label: string;
  type?: "text" | "number" | "textarea" | "select";
  options?: string[];
  required?: boolean;
  placeholder?: string;
}

interface CRUDSectionProps {
  title: string;
  description?: string;
  columns: Column[];
  fields: Field[];
  data: Record<string, any>[];
  onAdd: (item: Record<string, any>) => void;
  onUpdate: (index: number, item: Record<string, any>) => void;
  onDelete: (index: number) => void;
}

export default function CRUDSection({
  title, description, columns, fields, data, onAdd, onUpdate, onDelete,
}: CRUDSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [form, setForm] = useState<Record<string, any>>({});

  const openAdd = () => {
    setEditingIndex(null);
    setForm({});
    setIsOpen(true);
  };

  const openEdit = (index: number) => {
    setEditingIndex(index);
    setForm({ ...data[index] });
    setIsOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingIndex !== null) {
      onUpdate(editingIndex, form);
    } else {
      onAdd(form);
    }
    setIsOpen(false);
  };

  const set = (key: string, value: any) => setForm(f => ({ ...f, [key]: value }));

  return (
    <div>
      <div className="flex justify-between items-start mb-5">
        <div>
          <h2 className="text-lg font-bold text-slate-900">{title}</h2>
          {description && <p className="text-sm text-slate-500 mt-0.5">{description}</p>}
        </div>
        <button
          onClick={openAdd}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm flex items-center gap-1.5"
        >
          <span className="text-base leading-none">+</span> Add Entry
        </button>
      </div>

      {data.length === 0 ? (
        <div
          onClick={openAdd}
          className="cursor-pointer text-center py-14 text-slate-400 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all"
        >
          <p className="text-3xl mb-2">＋</p>
          <p className="text-sm font-medium">No entries yet — click to add</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b text-slate-400 text-[11px] uppercase font-bold tracking-wide">
                <th className="px-4 py-3 w-10 text-center">#</th>
                {columns.map(col => (
                  <th key={col.key} className="px-4 py-3">{col.label}</th>
                ))}
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={i} className="border-b last:border-0 hover:bg-slate-50/60 transition-colors">
                  <td className="px-4 py-3 text-xs text-slate-400 text-center font-medium">{i + 1}</td>
                  {columns.map(col => (
                    <td key={col.key} className="px-4 py-3 text-sm text-slate-700">
                      <span className={col.truncate ? "line-clamp-2" : ""}>
                        {String(row[col.key] ?? "—")}
                      </span>
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right space-x-3">
                    <button onClick={() => openEdit(i)} className="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors">Edit</button>
                    <button onClick={() => onDelete(i)} className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-2xl w-full max-w-xl shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-800">
                {editingIndex !== null ? "Edit" : "Add"} Entry
              </h3>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors text-2xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              {fields.map(field => (
                <div key={field.key}>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                    {field.label}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      required={field.required}
                      rows={3}
                      placeholder={field.placeholder}
                      className="w-full p-3 border border-slate-200 rounded-lg text-sm text-slate-900 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 resize-none transition"
                      value={form[field.key] ?? ""}
                      onChange={e => set(field.key, e.target.value)}
                    />
                  ) : field.type === "select" ? (
                    <select
                      required={field.required}
                      className="w-full p-3 border border-slate-200 rounded-lg text-sm text-slate-900 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
                      value={form[field.key] ?? ""}
                      onChange={e => set(field.key, e.target.value)}
                    >
                      <option value="">Select...</option>
                      {field.options?.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type ?? "text"}
                      required={field.required}
                      placeholder={field.placeholder}
                      className="w-full p-3 border border-slate-200 rounded-lg text-sm text-slate-900 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
                      value={form[field.key] ?? ""}
                      onChange={e => set(field.key, field.type === "number" ? Number(e.target.value) : e.target.value)}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-5 py-2.5 text-slate-500 font-semibold text-sm hover:text-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-indigo-700 transition-all shadow-sm"
              >
                {editingIndex !== null ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
