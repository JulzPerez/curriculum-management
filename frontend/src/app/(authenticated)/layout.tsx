"use client";

import { useAuth } from "@/features/auth/context/AuthContext";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
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
      <aside className="w-64 bg-[#1E1B4B] m-4 rounded-3xl flex flex-col p-6 text-white/80 shadow-xl shrink-0">
        <div className="mb-10 px-2">
          <h1 className="text-2xl font-bold text-white tracking-tight">SCMS</h1>
          <p className="text-[10px] opacity-50 font-semibold tracking-widest uppercase">Curriculum AI</p>
        </div>

        <nav className="flex-1 space-y-1">
          <Link href="/dashboard"><NavItem label="Dashboard" href="/dashboard" /></Link>
          <Link href="/courses"><NavItem label="Course Management" href="/courses" /></Link>
          <Link href="/outcomes"><NavItem label="Graduate Outcomes" href="/outcomes" /></Link>
          <Link href="/course-outcomes"><NavItem label="Course Outcomes" href="/course-outcomes" /></Link>
          <Link href="/performance-indicators">
  <NavItem label="Performance Indicators" href="/performance-indicators" />
</Link>
          <NavItem label="Curriculum Maps" />
          <Link href="/syllabus"><NavItem label="Create Syllabus" href="/syllabus" /></Link>
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

      {/* --- PAGE CONTENT --- */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

function NavItem({ label, href }: { label: string; href?: string }) {
  const pathname = usePathname();
  const active = href ? pathname === href : false;

  return (
    <div className={`
      flex items-center w-full px-4 py-3.5 rounded-2xl transition-all text-sm font-medium
      ${active ? "bg-white/15 text-white shadow-sm" : "text-white/40 hover:text-white hover:bg-white/5"}
    `}>
      {label}
    </div>
  );
}
