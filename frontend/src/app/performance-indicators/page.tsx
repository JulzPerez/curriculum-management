"use client";

import { useEffect, useMemo, useState } from "react";
import {
  getPerformanceIndicators,
  createPerformanceIndicator,
  updatePerformanceIndicator,
  deletePerformanceIndicator,
  PerformanceIndicator,
} from "@/lib/performanceIndicators";

type FormState = {
  indicator_code: string;
  indicator_name: string;
  description: string;
  target_value: string;
  current_value: string;
};

const emptyForm: FormState = {
  indicator_code: "",
  indicator_name: "",
  description: "",
  target_value: "",
  current_value: "",
};

export default function PerformanceIndicatorsPage() {
  const [items, setItems] = useState<PerformanceIndicator[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [query, setQuery] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function loadIndicators() {
    try {
      setLoading(true);
      setError("");
      const data = await getPerformanceIndicators();
      setItems(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load performance indicators.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadIndicators();
  }, []);

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
  }

  function handleEdit(item: PerformanceIndicator) {
    setEditingId(item.id);
    setForm({
      indicator_code: item.indicator_code ?? "",
      indicator_name: item.indicator_name ?? "",
      description: item.description ?? "",
      target_value:
        item.target_value !== undefined && item.target_value !== null
          ? String(item.target_value)
          : "",
      current_value:
        item.current_value !== undefined && item.current_value !== null
          ? String(item.current_value)
          : "",
    });
    setSuccess("");
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const payload = {
        indicator_code: form.indicator_code.trim(),
        indicator_name: form.indicator_name.trim(),
        description: form.description.trim() || undefined,
        target_value: form.target_value !== "" ? Number(form.target_value) : undefined,
        current_value: form.current_value !== "" ? Number(form.current_value) : undefined,
      };

      if (!payload.indicator_code || !payload.indicator_name) {
        setError("Indicator code and indicator name are required.");
        setSaving(false);
        return;
      }

      if (editingId !== null) {
        await updatePerformanceIndicator(editingId, payload);
        setSuccess("Performance indicator updated successfully.");
      } else {
        await createPerformanceIndicator(payload);
        setSuccess("Performance indicator added successfully.");
      }

      resetForm();
      await loadIndicators();
    } catch (err) {
      console.error(err);
      setError("Failed to save performance indicator.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this performance indicator?"
    );
    if (!confirmed) return;

    try {
      setError("");
      setSuccess("");
      await deletePerformanceIndicator(id);
      setSuccess("Performance indicator deleted successfully.");
      await loadIndicators();

      if (editingId === id) {
        resetForm();
      }
    } catch (err) {
      console.error(err);
      setError("Failed to delete performance indicator.");
    }
  }

  const filteredItems = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    if (!keyword) return items;

    return items.filter((item) => {
      return (
        item.indicator_code?.toLowerCase().includes(keyword) ||
        item.indicator_name?.toLowerCase().includes(keyword) ||
        item.description?.toLowerCase().includes(keyword)
      );
    });
  }, [items, query]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#7f0c10] via-[#990f14] to-[#6f0d17]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,214,102,0.10),transparent_28%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(255,190,120,0.07),transparent_28%)]" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full items-start justify-center px-4 py-6 sm:px-6 lg:px-8">
        <div className="w-full max-w-[1280px] overflow-hidden rounded-[26px] border border-yellow-100/15 bg-[#f6ede2]/96 shadow-[0_28px_70px_rgba(20,5,5,0.34)] backdrop-blur-xl">
          <div className="relative overflow-hidden border-b border-white/10 bg-[linear-gradient(135deg,#7f0c10_0%,#8f0d10_30%,#a31621_58%,#c88b2d_100%)] px-6 py-7 sm:px-8 sm:py-8">
            <div className="relative flex flex-col gap-5">
              <div>
                <p className="text-[13px] font-medium text-white/80">
                  Curriculum Management System
                </p>
                <h1 className="mt-1 text-[2rem] font-bold tracking-tight text-white sm:text-[2.25rem]">
                  📊 Performance Indicators
                </h1>
              </div>

              <p className="max-w-[760px] text-sm leading-7 text-white/85 sm:text-base">
                Manage performance indicators with full create, view, update, and delete functionality.
              </p>

              <div className="max-w-[760px]">
                <div className="flex items-center rounded-2xl border border-white/20 bg-white/90 px-4 py-3 shadow-[0_10px_30px_rgba(50,10,10,0.12)]">
                  <input
                    type="text"
                    placeholder="Search by code, name, or description..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full bg-transparent text-[15px] text-[#5b1013] outline-none placeholder:text-[#8b6a6d]"
                  />
                  <span className="ml-3 text-lg text-[#8f0d10]/70">⌕</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#f4eee7] px-5 py-6 sm:px-6 sm:py-7">
            <div className="grid gap-6 xl:grid-cols-[420px_minmax(0,1fr)]">
              <section className="rounded-[22px] border border-[#ead8d1] bg-white/78 p-5 shadow-[0_8px_18px_rgba(40,10,10,0.05)]">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-[1.15rem] font-bold text-[#6f0d17]">
                      {editingId !== null ? "✏️ Update Indicator" : "➕ Add Indicator"}
                    </h2>
                    <p className="mt-1 text-sm text-[#6e4d50]">
                      Fill in the details below.
                    </p>
                  </div>

                  {editingId !== null && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="rounded-xl border border-[#e3cfc8] bg-white px-4 py-2 text-sm font-semibold text-[#7a1a1d] transition hover:bg-[#fffaf7]"
                    >
                      Cancel
                    </button>
                  )}
                </div>

                {(error || success) && (
                  <div className="mt-4 space-y-2">
                    {error && (
                      <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error}
                      </div>
                    )}
                    {success && (
                      <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                        {success}
                      </div>
                    )}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#6f0d17]">
                      Indicator Code
                    </label>
                    <input
                      type="text"
                      value={form.indicator_code}
                      onChange={(e) =>
                        setForm({ ...form, indicator_code: e.target.value })
                      }
                      placeholder="e.g. PI-001"
                      className="w-full rounded-2xl border border-[#d8c5be] bg-white px-4 py-3 text-[#4e2d30] outline-none transition focus:border-[#d9b233] focus:ring-2 focus:ring-[#d9b233]/30"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#6f0d17]">
                      Indicator Name
                    </label>
                    <input
                      type="text"
                      value={form.indicator_name}
                      onChange={(e) =>
                        setForm({ ...form, indicator_name: e.target.value })
                      }
                      placeholder="e.g. Graduation Rate"
                      className="w-full rounded-2xl border border-[#d8c5be] bg-white px-4 py-3 text-[#4e2d30] outline-none transition focus:border-[#d9b233] focus:ring-2 focus:ring-[#d9b233]/30"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#6f0d17]">
                      Description
                    </label>
                    <textarea
                      value={form.description}
                      onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                      }
                      placeholder="Enter a short description..."
                      rows={4}
                      className="w-full rounded-2xl border border-[#d8c5be] bg-white px-4 py-3 text-[#4e2d30] outline-none transition focus:border-[#d9b233] focus:ring-2 focus:ring-[#d9b233]/30"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#6f0d17]">
                        Target Value
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={form.target_value}
                        onChange={(e) =>
                          setForm({ ...form, target_value: e.target.value })
                        }
                        placeholder="e.g. 95"
                        className="w-full rounded-2xl border border-[#d8c5be] bg-white px-4 py-3 text-[#4e2d30] outline-none transition focus:border-[#d9b233] focus:ring-2 focus:ring-[#d9b233]/30"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#6f0d17]">
                        Current Value
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={form.current_value}
                        onChange={(e) =>
                          setForm({ ...form, current_value: e.target.value })
                        }
                        placeholder="e.g. 88"
                        className="w-full rounded-2xl border border-[#d8c5be] bg-white px-4 py-3 text-[#4e2d30] outline-none transition focus:border-[#d9b233] focus:ring-2 focus:ring-[#d9b233]/30"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={saving}
                    className="w-full rounded-2xl bg-gradient-to-r from-[#8f0d10] via-[#b10f16] to-[#8f0d10] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(109,15,18,0.22)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {saving
                      ? "Saving..."
                      : editingId !== null
                      ? "Update Indicator"
                      : "Add Indicator"}
                  </button>
                </form>
              </section>

              <section className="rounded-[22px] border border-[#ead8d1] bg-white/78 p-5 shadow-[0_8px_18px_rgba(40,10,10,0.05)]">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-[1.15rem] font-bold text-[#6f0d17]">
                      📋 Indicator List
                    </h2>
                    <p className="mt-1 text-sm text-[#6e4d50]">
                      View and manage all saved indicators.
                    </p>
                  </div>

                  <div className="rounded-full bg-[#f9f0df] px-4 py-2 text-sm font-semibold text-[#7a1a1d] ring-1 ring-[#ecd9aa]">
                    Total: {filteredItems.length}
                  </div>
                </div>

                <div className="mt-5">
                  {loading ? (
                    <div className="rounded-2xl border border-[#ead8d1] bg-[#fffaf7] px-4 py-6 text-center text-sm text-[#6e4d50]">
                      Loading performance indicators...
                    </div>
                  ) : filteredItems.length === 0 ? (
                    <div className="rounded-2xl border border-[#ead8d1] bg-[#fffaf7] px-4 py-6 text-center text-sm text-[#6e4d50]">
                      No performance indicators found.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredItems.map((item) => (
                        <div
                          key={item.id}
                          className="rounded-2xl border border-[#ead8d1] bg-white p-4 shadow-[0_6px_14px_rgba(50,10,10,0.04)]"
                        >
                          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="rounded-full bg-[#f9f0df] px-3 py-1 text-xs font-bold tracking-wide text-[#7a1a1d] ring-1 ring-[#ecd9aa]">
                                  {item.indicator_code}
                                </span>
                              </div>

                              <h3 className="mt-3 text-lg font-bold text-[#6f0d17]">
                                {item.indicator_name}
                              </h3>

                              <p className="mt-2 text-sm leading-6 text-[#6e4d50]">
                                {item.description || "No description provided."}
                              </p>

                              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                <div className="rounded-xl bg-[#fcf8f1] px-4 py-3 ring-1 ring-[#eee0d7]">
                                  <p className="text-xs font-semibold uppercase tracking-wide text-[#9a6d70]">
                                    Target Value
                                  </p>
                                  <p className="mt-1 text-base font-bold text-[#6f0d17]">
                                    {item.target_value ?? "-"}
                                  </p>
                                </div>

                                <div className="rounded-xl bg-[#fcf8f1] px-4 py-3 ring-1 ring-[#eee0d7]">
                                  <p className="text-xs font-semibold uppercase tracking-wide text-[#9a6d70]">
                                    Current Value
                                  </p>
                                  <p className="mt-1 text-base font-bold text-[#6f0d17]">
                                    {item.current_value ?? "-"}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="flex shrink-0 flex-wrap gap-2">
                              <button
                                type="button"
                                onClick={() => handleEdit(item)}
                                className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-600"
                              >
                                Edit
                              </button>

                              <button
                                type="button"
                                onClick={() => handleDelete(item.id)}
                                className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}