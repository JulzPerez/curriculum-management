"use client";

import { useAuth } from "@/features/auth/context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="p-8">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Welcome Back, {user?.email?.split('@')[0]}
          </h2>
          <p className="text-slate-500 text-sm">
            Current Access: <span className="text-indigo-600 font-semibold">{user?.is_superuser ? "System Administrator" : "Faculty Member"}</span>
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right mr-2 hidden md:block">
            <p className="text-xs font-bold text-slate-800">{user?.email}</p>
            <p className="text-[10px] text-slate-400">ID: 2024-FAC-01</p>
          </div>
          <div className="h-12 w-12 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-200">
            {user?.email?.charAt(0).toUpperCase()}
          </div>
        </div>
      </header>

      {/* --- SCMS STATS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <SimpleStat label="Past Curriculums" value="124" color="bg-indigo-500" />
        <SimpleStat label="Active Syllabi" value="42" color="bg-emerald-500" />
        <SimpleStat label="AI Drafts Pending" value="12" color="bg-orange-500" />
        <SimpleStat label="Total Faculty" value="18" color="bg-blue-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick AI Action Card */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800 text-lg">Recent AI Generations</h3>
            <button className="text-xs font-bold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-lg hover:bg-indigo-100 transition-colors">
              + New AI Draft
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-lg">📄</div>
                <div>
                  <p className="text-sm font-bold text-slate-800">BSCS-2026-Revised.pdf</p>
                  <p className="text-[10px] text-slate-400">Generated 2 hours ago • Based on 2020 Archive</p>
                </div>
              </div>
              <span className="text-[10px] font-bold px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full">DRAFT</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-lg">📄</div>
                <div>
                  <p className="text-sm font-bold text-slate-800">Intro-to-AI-Syllabus.docx</p>
                  <p className="text-[10px] text-slate-400">Generated Yesterday • New Course</p>
                </div>
              </div>
              <span className="text-[10px] font-bold px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full">APPROVED</span>
            </div>
          </div>
        </div>

        {/* Archive Stats */}
        <div className="bg-[#1E1B4B] p-8 rounded-[32px] text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="font-bold text-lg mb-4">Archive Status</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="opacity-60">Archive Processed</span>
                  <span>85%</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full">
                  <div className="w-[85%] h-full bg-indigo-400 rounded-full" />
                </div>
              </div>
              <p className="text-xs leading-relaxed opacity-70">
                Your historical curriculum data (2015-2023) is currently being indexed for the LLM generator.
              </p>
              <button className="w-full py-3 bg-white text-indigo-900 rounded-xl text-xs font-bold hover:bg-opacity-90 transition-all">
                Upload Old Files
              </button>
            </div>
          </div>
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 rounded-full" />
        </div>
      </div>
    </div>
  );
}

function SimpleStat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="bg-white p-6 rounded-[28px] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <div className={`w-8 h-1 ${color} rounded-full mb-4`} />
      <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{label}</p>
      <h3 className="text-2xl font-black text-slate-900 mt-1">{value}</h3>
    </div>
  );
}
