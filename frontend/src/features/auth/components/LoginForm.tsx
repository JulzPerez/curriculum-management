"use client";

import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function LoginForm() {
  const { login } = useAuth();

  const [email, setEmail] = useState("admin@university.edu");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      await login(email, password);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      {error && (
        <div className="mb-2 rounded-md border border-red-200 bg-red-50 px-2 py-1 text-[10px] text-red-700">
          {error}
        </div>
      )}

      <div className="space-y-2.5">
        {/* EMAIL */}
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
              placeholder="admin@university.edu"
              required
            />
          </div>
        </div>

        {/* PASSWORD */}
        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className="text-[12px] font-semibold text-[#6e2a2a]">
              Password
            </label>
            <a
              href="/forgot-password"
              className="text-[10px] text-[#c17a78] hover:text-[#8f0d10]"
            >
              Forgot?
            </a>
          </div>

          <div className="flex h-[36px] items-center rounded-[12px] border border-[#efd15b] bg-white px-2.5 shadow-[0_2px_6px_rgba(120,70,40,0.05)]">
            <span className="mr-1.5 text-[11px] text-[#d5a5a0]">🔒</span>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent text-[13px] text-[#6b2f2f] outline-none placeholder:text-[#c19795]"
              placeholder="Enter password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="ml-1 rounded-full border border-[#efd15b] px-1.5 py-[3px] text-[10px] font-semibold text-[#9f4d4d] hover:bg-[#faf2df]"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="mt-1 flex h-[38px] w-full items-center justify-center rounded-[12px] bg-[#c46d69] text-[13px] font-bold text-white shadow-[0_6px_12px_rgba(160,80,80,0.18)] hover:brightness-95 disabled:opacity-70"
        >
          {loading ? "Signing..." : "Sign In"}
        </button>
      </div>
    </form>
  );
}