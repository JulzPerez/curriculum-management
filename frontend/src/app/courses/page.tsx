"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Link from "next/link";

// 1. Define the Course Interface to fix "Property does not exist on type never"
interface Course {
  id: number;
  course_code: string;
  title: string;
  lec_hours: number;
  lab_hours: number;
  units: number;
  prerequisite: string | null;
}

const API_URL = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"}/v1/courses`;

export default function CourseManagement() {
  // 2. Type the state as Course[] instead of an empty never[]
  const [courses, setCourses] = useState<Course[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    course_code: "",
    title: "",
    lec_hours: 0,
    lab_hours: 0,
    units: 0,
    prerequisite: "None"
  });

  const fetchCourses = async () => {
    try {
      const response = await fetch(`${API_URL}/`);
      const data: Course[] = await response.json();
      setCourses(data);
    } catch (err) { console.error("Fetch error:", err); }
  };

  useEffect(() => { fetchCourses(); }, []);

  // 3. Fix: Parameter 'course' has 'any' type
  const openEditModal = (course: Course) => {
    setEditingId(course.id);
    setFormData({
      course_code: course.course_code || "",
      title: course.title || "",
      lec_hours: course.lec_hours || 0,
      lab_hours: course.lab_hours || 0,
      units: course.units || 0,
      prerequisite: course.prerequisite || "None"
    });
    setIsModalOpen(true);
  };

  // 4. Fix: Parameter 'id' has 'any' type
  const handleDelete = async (id: number) => {
    if (!confirm("Delete this course?")) return;
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (response.ok) fetchCourses();
    } catch (err) { alert("Delete failed"); }
  };

  // 5. Fix: Parameter 'e' has 'any' type using FormEvent
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `${API_URL}/${editingId}` : `${API_URL}/`;

    try {
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            ...formData,
            // 6. Fix: Argument type 'number' not assignable to 'string'
            // We ensure we send numbers to the backend
            lec_hours: Number(formData.lec_hours),
            lab_hours: Number(formData.lab_hours),
            units: Number(formData.units),
        }),
      });

      if (response.ok) {
        setIsModalOpen(false);
        setEditingId(null);
        setFormData({ course_code: "", title: "", lec_hours: 0, lab_hours: 0, units: 0, prerequisite: "None" });
        fetchCourses();
      }
    } catch (err) { alert("Save failed"); }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Master Course List</h1>
          <button 
            onClick={() => { setEditingId(null); setIsModalOpen(true); }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold transition-all shadow-md"
          >
            + Add New Course
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b text-slate-500 text-xs uppercase font-bold">
                <th className="p-4">Code</th>
                <th className="p-4">Descriptive Title</th>
                <th className="p-4 text-center">Lec</th>
                <th className="p-4 text-center">Lab</th>
                <th className="p-4 text-center">Units</th>
                <th className="p-4">Prerequisite</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id} className="border-b hover:bg-blue-50/30 transition-colors">
                  <td className="p-4 font-bold text-slate-900">{course.course_code}</td>
                  <td className="p-4 text-red-600 font-bold">{course.title}</td>
                  <td className="p-4 text-center text-slate-600">{course.lec_hours}</td>
                  <td className="p-4 text-center text-slate-600">{course.lab_hours}</td>
                  <td className="p-4 text-center font-bold text-blue-600">{course.units}</td>
                  <td className="p-4 text-slate-500 text-sm">{course.prerequisite || "None"}</td>
                  <td className="p-4 text-right space-x-4">
                    <button onClick={() => openEditModal(course)} className="text-blue-600 hover:underline font-medium">Edit</button>
                    <button onClick={() => handleDelete(course.id)} className="text-red-600 hover:underline font-medium">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl w-full max-w-md shadow-2xl space-y-4">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">{editingId ? "Edit" : "Add"} Course</h2>
            
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-xs font-bold text-slate-500 uppercase">Course Code</label>
                    <input required className="w-full p-2 border rounded-lg text-slate-900 outline-none" 
                           value={formData.course_code} onChange={e => setFormData({...formData, course_code: e.target.value})} />
                </div>
                <div>
                    <label className="text-xs font-bold text-slate-500 uppercase">Total Units</label>
                    {/* Fixed: Value assigned to number input must be handled as string in JSX but stored as number */}
                    <input type="number" required className="w-full p-2 border rounded-lg text-slate-900 outline-none" 
                           value={formData.units} onChange={e => setFormData({...formData, units: Number(e.target.value)})} />
                </div>
            </div>

            <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Descriptive Title</label>
                <input required className="w-full p-2 border rounded-lg text-slate-900 outline-none" 
                       value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-xs font-bold text-slate-500 uppercase">Lec Hours</label>
                    <input type="number" className="w-full p-2 border rounded-lg text-slate-900 outline-none" 
                           value={formData.lec_hours} onChange={e => setFormData({...formData, lec_hours: Number(e.target.value)})} />
                </div>
                <div>
                    <label className="text-xs font-bold text-slate-500 uppercase">Lab Hours</label>
                    <input type="number" className="w-full p-2 border rounded-lg text-slate-900 outline-none" 
                           value={formData.lab_hours} onChange={e => setFormData({...formData, lab_hours: Number(e.target.value)})} />
                </div>
            </div>

            <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Prerequisite</label>
                <input className="w-full p-2 border rounded-lg text-slate-900 outline-none" 
                       placeholder="None" value={formData.prerequisite} onChange={e => setFormData({...formData, prerequisite: e.target.value})} />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-500 font-bold">Cancel</button>
              <button type="submit" className="bg-blue-600 text-white px-8 py-2 rounded-lg font-bold shadow-lg hover:bg-blue-700 transition-all">
                {editingId ? "Update Course" : "Save Course"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}