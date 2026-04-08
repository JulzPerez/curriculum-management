"use client";

import { useAuth } from "@/features/auth/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Dashboard() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <div className="text-slate-500 font-medium animate-pulse">Initializing SCMS...</div>
    </div>
  );

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* --- SIDEBAR --- */}
      <aside className="w-64 bg-[#1E1B4B] m-4 rounded-3xl flex flex-col p-6 text-white/80 shadow-xl">
        <div className="mb-10 px-2">
          <h1 className="text-2xl font-bold text-white tracking-tight">SCMS</h1>
          <p className="text-[10px] opacity-50 font-semibold tracking-widest uppercase">Curriculum AI</p>
        </div>

        <nav className="flex-1 space-y-1">
          <Link href="/dashboard">
            <NavItem label="Dashboard" active />
          </Link>
          <Link href="/courses">
            <NavItem label="Course Management" />
          </Link>
          <Link href="/outcomes">
            <NavItem label="Graduate Outcomes" />
          </Link>
          <NavItem label="Curriculum Maps" />
          <NavItem label="Syllabus Review" />
          <NavItem label="Department Settings" />
        </nav>

        <div className="mt-auto pt-6 border-t border-white/10">
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-300 hover:bg-red-500/10 rounded-xl transition-all text-sm font-medium"
          >
            <span>Sign Out →</span>
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Welcome Back, {user.email?.split('@')[0]}
            </h2>
            <p className="text-slate-500 text-sm">
              Current Access: <span className="text-indigo-600 font-semibold">{user.is_superuser ? "System Administrator" : "Faculty Member"}</span>
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right mr-2 hidden md:block">
               <p className="text-xs font-bold text-slate-800">{user.email}</p>
               <p className="text-[10px] text-slate-400">ID: 2024-FAC-01</p>
            </div>
            <div className="h-12 w-12 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-200">
              {user.email?.charAt(0).toUpperCase()}
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
                <h3 className="font-bold text-slate-800 text-lg font-display">Recent AI Generations</h3>
                <button className="text-xs font-bold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-lg hover:bg-indigo-100 transition-colors">
                  + New AI Draft
                </button>
             </div>

             {/* Simple Table for Drafts */}
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

          {/* System Notifications / Archive Stats */}
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
             {/* Decorative Background Circle */}
             <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 rounded-full" />
          </div>
        </div>
      </main>
    </div>
  );
}

// --- HELPER COMPONENTS ---

function NavItem({ label, active = false }: { label: string, active?: boolean }) {
  return (
    <div className={`
      flex items-center w-full px-4 py-3.5 rounded-2xl transition-all text-sm font-medium
      ${active
        ? 'bg-white/15 text-white shadow-sm'
        : 'text-white/40 hover:text-white hover:bg-white/5'}
    `}>
      {label}
    </div>
  );
}

function SimpleStat({ label, value, color }: { label: string, value: string, color: string }) {
  return (
    <div className="bg-white p-6 rounded-[28px] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <div className={`w-8 h-1 ${color} rounded-full mb-4`} />
      <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{label}</p>
      <h3 className="text-2xl font-black text-slate-900 mt-1">{value}</h3>
    </div>
  );
}
