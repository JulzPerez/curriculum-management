"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("admin@university.edu");
  const [password, setPassword] = useState("password");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await new Promise((r) => setTimeout(r, 700));
      if (!email || !password) {
        setError("Please enter your email and password.");
        return;
      }
      alert("Signed in (UI demo). Hook backend next.");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-bg min-h-[100svh] w-full flex items-start justify-center px-4 py-3 sm:py-4 overflow-hidden">
      <div className="relative w-full max-w-lg">
        {/* TOP BRAND HEADER */}
        <div className="flex items-center justify-center gap-3 text-center mb-3 sm:mb-4">
          <div className="shrink-0">
            <div className="bg-white p-2.5 rounded-xl shadow-lg border border-white">
              <Image
                src="/msu-iit-logo.png"
                alt="MSU-IIT Logo"
                width={78}
                height={78}
                priority
                className="object-contain"
              />
            </div>
          </div>

          <div className="text-left">
            <h1 className="text-base sm:text-lg font-extrabold tracking-wide text-yellow-200 leading-tight">
              MSU-ILIGAN INSTITUTE
              <br className="hidden sm:block" />
              OF TECHNOLOGY
            </h1>
            <p className="mt-1 text-xs text-yellow-100/80">
              Curriculum Management System
            </p>
          </div>
        </div>

        {/* CARD */}
        <div className="mx-auto w-full rounded-2xl bg-[#f7efe6] shadow-2xl ring-1 ring-yellow-200/50 overflow-hidden">
          <div className="p-[2px] bg-gradient-to-r from-yellow-200/70 via-yellow-100/40 to-yellow-200/70">
            <div className="rounded-2xl bg-[#f7efe6]">
              <div className="px-5 sm:px-6 pt-5 pb-4">
                {/* Title */}
                <div className="text-center">
                  <h2 className="text-lg sm:text-xl font-extrabold text-red-900">
                    Login
                  </h2>
                  <p className="mt-1 text-xs sm:text-sm text-red-900/70">
                    Sign in to manage curricula and programs
                  </p>
                </div>

                {error ? (
                  <div className="mt-3 rounded-xl bg-red-100 text-red-900 px-4 py-2.5 text-sm ring-1 ring-red-200">
                    {error}
                  </div>
                ) : null}

                {/* Form */}
                <form onSubmit={handleSubmit} className="mt-4 space-y-3">
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-red-900/80">
                      Email
                    </label>
                    <div className="mt-2 relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-red-800/60">
                        ✉
                      </span>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@university.edu"
                        className="w-full rounded-xl bg-[#fff7ee] ring-1 ring-yellow-300/60 px-10 py-2.5 text-red-950 placeholder:text-red-700/40 outline-none focus:ring-2 focus:ring-red-400"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-semibold text-red-900/80">
                      Password
                    </label>

                    <div className="mt-2 relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-red-800/60">
                        🔒
                      </span>

                      <input
                        type={showPw ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full rounded-xl bg-[#fff7ee] ring-1 ring-yellow-300/60 pl-10 pr-20 py-2.5 text-red-950 placeholder:text-red-700/40 outline-none focus:ring-2 focus:ring-red-400"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPw((v) => !v)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-white/70 px-3 py-1.5 text-xs font-semibold text-red-900 hover:bg-white transition"
                      >
                        {showPw ? "Hide" : "Show"}
                      </button>
                    </div>

                    {/* Forgot password link */}
                    <div className="mt-1.5 text-right">
                      <Link
                        href="/forgot-password"
                        className="text-sm text-red-900/70 hover:text-red-900 underline-offset-4 hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                  </div>

                  {/* Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl py-2.5 text-white font-bold text-base shadow-lg disabled:opacity-60 disabled:cursor-not-allowed
                               bg-gradient-to-r from-red-800 via-red-700 to-red-800 hover:brightness-110 transition"
                  >
                    {loading ? "Signing In..." : "Sign In"}
                  </button>
                </form>
              </div>

              {/* Footer links */}
              <div className="border-t border-yellow-200/60 bg-[#f3e7dc] px-5 sm:px-6 py-2.5">
                <div className="flex items-center justify-center gap-5 text-sm text-red-900/70">
                  <Link href="/help" className="hover:text-red-900 hover:underline">
                    Help
                  </Link>
                  <span className="opacity-40">•</span>
                  <Link href="/privacy" className="hover:text-red-900 hover:underline">
                    Privacy
                  </Link>
                  <span className="opacity-40">•</span>
                  <Link href="/contact" className="hover:text-red-900 hover:underline">
                    Contact
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page footer */}
        <p className="mt-3 text-center text-xs text-yellow-100/70">
          © {new Date().getFullYear()} MSU-Iligan Institute of Technology. All
          rights reserved.
        </p>
      </div>
    </div>
  );
}