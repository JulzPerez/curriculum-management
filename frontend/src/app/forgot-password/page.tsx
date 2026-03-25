"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      setMessage("If the email exists, a reset link has been sent.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#7f0c10] p-[10px] md:p-3">
      <div className="relative mx-auto flex min-h-[calc(100vh-20px)] w-full max-w-[1520px] overflow-hidden rounded-[26px] border border-white/10 bg-gradient-to-br from-[#a00813] via-[#98010f] to-[#7f0c10] shadow-[0_24px_80px_rgba(25,0,0,0.34)] md:min-h-[calc(100vh-24px)]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,220,140,0.10),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.05),transparent_24%)]" />
          <div className="absolute left-[10%] top-[8%] h-44 w-44 rounded-full bg-[#ffcc66]/10 blur-3xl" />
          <div className="absolute bottom-[-4rem] left-[-3rem] h-72 w-72 rounded-full bg-black/10 blur-3xl" />
        </div>

        <section className="relative flex w-full flex-col justify-between px-6 py-6 text-[#f7dfb0] md:w-[56%] md:px-10 md:py-9 lg:px-11 lg:py-10">
          <div>
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-[#d9b233]/30 bg-white/10 px-4 py-2 text-[11px] font-semibold tracking-[0.18em] text-[#f0cf76] backdrop-blur-sm md:text-[12px]">
              <span className="h-2.5 w-2.5 rounded-full bg-[#d9b233]" />
              Curriculum Management System
            </div>

            <div className="flex max-w-[720px] items-center gap-4">
              <div className="flex h-[82px] w-[82px] shrink-0 items-center justify-center rounded-[22px] bg-white shadow-[0_10px_28px_rgba(0,0,0,0.18)]">
                <Image
                  src="/msu-iit-logo.png"
                  alt="MSU-IIT Logo"
                  width={56}
                  height={56}
                  className="object-contain"
                />
              </div>

              <div className="leading-[0.93]">
                <h1 className="max-w-[560px] text-[2.25rem] font-bold tracking-[-0.04em] text-[#f8dfb2] md:text-[2.9rem] lg:text-[3.2rem]">
                  MSU-Iligan Institute
                  <br />
                  of Technology
                </h1>
              </div>
            </div>

            <p className="mt-8 max-w-[690px] text-[1rem] leading-[1.7] text-[#f3d5b0]/95 md:text-[1.04rem]">
              Access a refined workspace for managing curricula, academic
              structures, and program records with clarity, control, and
              confidence.
            </p>
          </div>

          <div className="mt-10 grid max-w-[760px] grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-[22px] border border-white/10 bg-white/8 px-5 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-[2px]">
              <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.28em] text-[#f0c65b]">
                Secure
              </p>
              <p className="text-[1rem] leading-[1.55] text-[#f7dfb8]">
                Protected access for institutional users.
              </p>
            </div>

            <div className="rounded-[22px] border border-white/10 bg-white/8 px-5 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-[2px]">
              <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.28em] text-[#f0c65b]">
                Organized
              </p>
              <p className="text-[1rem] leading-[1.55] text-[#f7dfb8]">
                Structured curriculum and program management.
              </p>
            </div>

            <div className="rounded-[22px] border border-white/10 bg-white/8 px-5 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-[2px]">
              <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.28em] text-[#f0c65b]">
                Efficient
              </p>
              <p className="text-[1rem] leading-[1.55] text-[#f7dfb8]">
                Built for faster academic workflows.
              </p>
            </div>
          </div>
        </section>

        <aside className="relative flex w-full items-center justify-center bg-[#efe3d7] px-4 py-5 md:w-[44%] md:px-5 md:py-5">
          <div className="w-full max-w-[320px] rounded-[28px] bg-[#efe3d7] px-5 py-5 md:max-w-[330px] md:px-5 md:py-5">
            <div className="mb-4 inline-flex rounded-full border border-[#d9b233] px-4 py-[7px] text-[10px] font-semibold uppercase tracking-[0.28em] text-[#b77d7d] md:text-[11px]">
              Account Recovery
            </div>

            <h2 className="text-[2.05rem] font-bold tracking-[-0.05em] text-[#6d070d] md:text-[2.2rem]">
              Forgot password
            </h2>

            <p className="mt-2 max-w-[280px] text-[0.88rem] leading-[1.7] text-[#b88484] md:text-[0.92rem]">
              Enter your registered email to receive a password reset link.
            </p>

            <form onSubmit={handleSubmit} className="mt-5 w-full">
              {message && (
                <div className="mb-2 rounded-md border border-green-200 bg-green-50 px-2 py-1 text-[10px] text-green-700">
                  {message}
                </div>
              )}

              <div className="space-y-2.5">
                <div>
                  <label className="mb-1 block text-[12px] font-semibold text-[#6e2a2a]">
                    Email
                  </label>
                  <div className="flex h-[36px] items-center rounded-[12px] border border-[#efd15b] bg-white px-2.5 shadow-[0_2px_6px_rgba(120,70,40,0.05)]">
                    <span className="mr-1.5 text-[11px] text-[#d5a5a0]">✉</span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-transparent text-[13px] text-[#6b2f2f] outline-none placeholder:text-[#c19795]"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-1 flex h-[38px] w-full items-center justify-center rounded-[12px] bg-[#c46d69] text-[13px] font-bold text-white shadow-[0_6px_12px_rgba(160,80,80,0.18)] hover:brightness-95 disabled:opacity-70"
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>

                <div className="pt-0.5 text-center">
                  <Link
                    href="/login"
                    className="text-[10px] text-[#c17a78] hover:text-[#8f0d10]"
                  >
                    Back to Login
                  </Link>
                </div>
              </div>
            </form>

            <div className="mt-6 border-t border-[#dbc8b6] pt-4">
              <div className="flex flex-wrap items-center gap-2 text-[0.82rem] text-[#b88484]">
                <Link href="/help" className="transition hover:text-[#8f0d10]">
                  Help
                </Link>
                <span>•</span>
                <Link
                  href="/privacy"
                  className="transition hover:text-[#8f0d10]"
                >
                  Privacy
                </Link>
                <span>•</span>
                <Link
                  href="/contact"
                  className="transition hover:text-[#8f0d10]"
                >
                  Contact
                </Link>
              </div>

              <p className="mt-4 text-[0.78rem] leading-[1.55] text-[#c09b9b]">
                © 2026 MSU-Iligan Institute of Technology. All rights reserved.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}