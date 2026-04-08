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
