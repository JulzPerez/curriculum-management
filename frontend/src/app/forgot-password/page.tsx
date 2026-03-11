"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Later this will call backend API
    setMessage("If the email exists, a reset link has been sent.");
  }

  return (
    <div className="login-bg min-h-[100svh] flex items-start justify-center px-4 py-6">

      <div className="w-full max-w-lg">

        {/* HEADER */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="bg-white p-2.5 rounded-xl shadow-lg">
            <Image
              src="/msu-iit-logo.png"
              alt="MSU-IIT Logo"
              width={78}
              height={78}
            />
          </div>

          <div>
            <h1 className="text-yellow-200 font-extrabold">
              MSU-ILIGAN INSTITUTE OF TECHNOLOGY
            </h1>
            <p className="text-yellow-100/80 text-sm">
              Curriculum Management System
            </p>
          </div>
        </div>

        {/* CARD */}
        <div className="rounded-2xl bg-[#f7efe6] shadow-xl p-6">

          <h2 className="text-xl font-bold text-red-900 text-center">
            Forgot Password
          </h2>

          <p className="text-sm text-red-900/70 text-center mt-1">
            Enter your email to receive a password reset link
          </p>

          <form onSubmit={handleSubmit} className="mt-4 space-y-3">

            <input
              type="email"
              required
              placeholder="Enter your email"
              className="w-full rounded-xl px-4 py-2.5 bg-[#fff7ee] ring-1 ring-yellow-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              className="w-full rounded-xl py-2.5 text-white font-bold
              bg-gradient-to-r from-red-800 via-red-700 to-red-800"
            >
              Send Reset Link
            </button>

          </form>

          {message && (
            <p className="mt-3 text-sm text-green-700 text-center">
              {message}
            </p>
          )}

          <div className="text-center mt-4">
            <Link href="/login" className="text-red-900 hover:underline">
              Back to Login
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}