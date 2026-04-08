"use client";

import { useState } from "react";
import CourseInfoSection from "./components/sections/CourseInfoSection";
import CourseOutcomesSection from "./components/sections/CourseOutcomesSection";
import COPOAlignmentSection from "./components/sections/COPOAlignmentSection";
import LearningPlanSection from "./components/sections/LearningPlanSection";
import GradingSystemSection from "./components/sections/GradingSystemSection";
import ReferencesSection from "./components/sections/ReferencesSection";
import ClassroomPoliciesSection from "./components/sections/ClassroomPoliciesSection";
import ApprovalSection from "./components/sections/ApprovalSection";

const SECTIONS = [
  { id: "course-info",  label: "Course Information",  icon: "📋" },
  { id: "outcomes",     label: "Course Outcomes",      icon: "🎯" },
  { id: "copo",         label: "CO-PO Alignment",      icon: "🔗" },
  { id: "learning",     label: "Learning Plan",        icon: "📅" },
  { id: "grading",      label: "Grading System",       icon: "📊" },
  { id: "references",   label: "References",           icon: "📚" },
  { id: "policies",     label: "Classroom Policies",   icon: "📌" },
  { id: "approval",     label: "Approval",             icon: "✅" },
];

function useCRUD(initial: Record<string, any>[] = []) {
  const [data, setData] = useState(initial);
  const add    = (item: Record<string, any>) => setData(d => [...d, item]);
  const update = (i: number, item: Record<string, any>) => setData(d => d.map((r, idx) => idx === i ? item : r));
  const remove = (i: number) => setData(d => d.filter((_, idx) => idx !== i));
  return { data, add, update, remove };
}

export default function SyllabusPage() {
  const [activeSection, setActiveSection] = useState("course-info");

  const [courseInfo, setCourseInfo] = useState({
    course_code: "", course_title: "", description: "",
    credits: "", modality: "", contact_hours: "",
    prerequisite: "", ay_semester: "",
  });

  const outcomes    = useCRUD();
  const copo        = useCRUD();
  const learning    = useCRUD();
  const grading     = useCRUD();
  const references  = useCRUD();
  const [policies, setPolicies]   = useState("");
  const [approval, setApproval]   = useState({ prepared_by: "", reviewed_by: "", chairperson: "", dean: "" });

  const renderSection = () => {
    switch (activeSection) {
      case "course-info": return <CourseInfoSection data={courseInfo} onChange={setCourseInfo} />;
      case "outcomes":    return <CourseOutcomesSection data={outcomes.data} onAdd={outcomes.add} onUpdate={outcomes.update} onDelete={outcomes.remove} />;
      case "copo":        return <COPOAlignmentSection  data={copo.data}     onAdd={copo.add}     onUpdate={copo.update}     onDelete={copo.remove} />;
      case "learning":    return <LearningPlanSection   data={learning.data} onAdd={learning.add} onUpdate={learning.update} onDelete={learning.remove} />;
      case "grading":     return <GradingSystemSection  data={grading.data}  onAdd={grading.add}  onUpdate={grading.update}  onDelete={grading.remove} />;
      case "references":  return <ReferencesSection     data={references.data} onAdd={references.add} onUpdate={references.update} onDelete={references.remove} />;
      case "policies":    return <ClassroomPoliciesSection value={policies} onChange={setPolicies} />;
      case "approval":    return <ApprovalSection data={approval} onChange={setApproval} />;
    }
  };

  const activeIndex = SECTIONS.findIndex(s => s.id === activeSection);

  return (
    <div className="flex h-full min-h-screen">
      {/* Section Navigation */}
      <nav className="w-64 shrink-0 bg-slate-50 border-r border-slate-200 p-4 flex flex-col gap-1">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-3 mb-2">
          Sections
        </p>
        {SECTIONS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            className={`
              flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left
              ${activeSection === s.id
                ? "bg-indigo-600 text-white shadow-sm shadow-indigo-200"
                : "text-slate-600 hover:bg-slate-200/70 hover:text-slate-900"}
            `}
          >
            <span className="text-base">{s.icon}</span>
            <span className="leading-tight">{s.label}</span>
            {activeSection === s.id && (
              <span className="ml-auto text-indigo-300 text-xs">→</span>
            )}
          </button>
        ))}

        <div className="mt-auto pt-4 border-t border-slate-200">
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm">
            Save Syllabus
          </button>
        </div>
      </nav>

      {/* Section Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <span>Create Syllabus</span>
          <span>/</span>
          <span className="text-slate-700 font-semibold">
            {SECTIONS[activeIndex]?.icon} {SECTIONS[activeIndex]?.label}
          </span>
        </div>

        {renderSection()}

        {/* Prev / Next navigation */}
        <div className="flex justify-between mt-10 pt-6 border-t border-slate-200">
          <button
            onClick={() => setActiveSection(SECTIONS[activeIndex - 1].id)}
            disabled={activeIndex === 0}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            ← Previous
          </button>
          <button
            onClick={() => setActiveSection(SECTIONS[activeIndex + 1].id)}
            disabled={activeIndex === SECTIONS.length - 1}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
