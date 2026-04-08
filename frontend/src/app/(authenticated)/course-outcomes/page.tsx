"use client";

import { useState, useEffect } from "react";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"}/v1/course-outcomes`;

interface CourseOutcome {
  id: number;
  code: string;
  description: string;
}

export default function CourseOutcomesPage() {
  const [outcomes, setOutcomes] = useState<CourseOutcome[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ code: "", description: "" });

  const fetchAll = async () => {
    const res = await fetch(API_URL);
    if (res.ok) setOutcomes(await res.json());
  };

  useEffect(() => { fetchAll(); }, []);

  const openAdd = () => {
    setEditingId(null);
    setForm({ code: "", description: "" });
    setIsOpen(true);
  };

  const openEdit = (o: CourseOutcome) => {
    setEditingId(o.id);
    setForm({ code: o.code, description: o.description });
    setIsOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `${API_URL}/${editingId}` : `${API_URL}/`;
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) { setIsOpen(false); fetchAll(); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this course outcome?")) return;
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (res.ok) fetchAll();
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Course Outcomes</h1>
          <p className="text-sm text-slate-500 mt-1">Master list — reusable across all syllabuses.</p>
        </div>
        <button
          onClick={openAdd}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm"
        >
          + Add Outcome
        </button>
      </div>

      {outcomes.length === 0 ? (
        <div
          onClick={openAdd}
          className="cursor-pointer text-center py-16 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all"
        >
          <p className="text-3xl mb-2">🎯</p>
          <p className="text-sm font-medium text-slate-400">No course outcomes yet — click to add</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b text-slate-400 text-[11px] uppercase font-bold tracking-wide">
                <th className="px-4 py-3 w-10 text-center">#</th>
                <th className="px-4 py-3 w-28">CO Code</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {outcomes.map((o, i) => (
                <tr key={o.id} className="border-b last:border-0 hover:bg-slate-50/60 transition-colors">
                  <td className="px-4 py-3 text-xs text-slate-400 text-center">{i + 1}</td>
                  <td className="px-4 py-3">
                    <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-2.5 py-1 rounded-lg">
                      {o.code}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-700">{o.description}</td>
                  <td className="px-4 py-3 text-right space-x-3">
                    <button onClick={() => openEdit(o)} className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">Edit</button>
                    <button onClick={() => handleDelete(o.id)} className="text-red-500 hover:text-red-700 text-sm font-medium">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl w-full max-w-lg shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-800">
                {editingId ? "Edit" : "Add"} Course Outcome
              </h3>
              <button type="button" onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600 text-2xl leading-none">×</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">CO Code</label>
                <input
                  required
                  placeholder="e.g. CO1"
                  className="w-full p-3 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
                  value={form.code}
                  onChange={e => setForm(f => ({ ...f, code: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Description</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe what students should be able to do..."
                  className="w-full p-3 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 resize-none transition"
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-8">
              <button type="button" onClick={() => setIsOpen(false)} className="px-5 py-2.5 text-slate-500 font-semibold text-sm hover:text-slate-700">Cancel</button>
              <button type="submit" className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-indigo-700 transition-all shadow-sm">
                {editingId ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
