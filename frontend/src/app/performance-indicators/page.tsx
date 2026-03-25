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

function formatValue(value: number | string | null | undefined) {
  if (value === null || value === undefined || value === "") return "-";
  return value;
}

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
        target_value:
          form.target_value !== "" ? Number(form.target_value) : undefined,
        current_value:
          form.current_value !== "" ? Number(form.current_value) : undefined,
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
    <main className="h-screen overflow-hidden bg-gradient-to-br from-[#7f0c10] via-[#8f0d10] to-[#6f0d17] p-3">
      <div className="mx-auto flex h-full w-full max-w-[1600px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/95 shadow-2xl">
        {/* Compact Header */}
        <div className="border-b border-[#f1d7cf] bg-gradient-to-r from-[#8f0d10] via-[#a31621] to-[#6f0d17] px-5 py-4 text-white">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
                Curriculum Management System
              </p>
              <div className="mt-1 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-lg shadow-inner">
                  📊
                </div>
                <div className="min-w-0">
                  <h1 className="truncate text-xl font-bold leading-tight sm:text-2xl">
                    Performance Indicators
                  </h1>
                  <p className="mt-0.5 truncate text-xs text-white/75 sm:text-sm">
                    View and manage all performance indicators.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-center backdrop-blur-sm">
                  <p className="text-[10px] uppercase tracking-[0.12em] text-white/70">
                    Records
                  </p>
                  <p className="text-base font-bold">{items.length}</p>
                </div>
                <div className="rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-center backdrop-blur-sm">
                  <p className="text-[10px] uppercase tracking-[0.12em] text-white/70">
                    Results
                  </p>
                  <p className="text-base font-bold">{filteredItems.length}</p>
                </div>
              </div>

              <div className="w-full sm:w-[280px]">
                <input
                  type="text"
                  placeholder="Search code, name, description..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="h-10 w-full rounded-xl border border-white/15 bg-white/90 px-3 text-sm text-[#7a1b1b] outline-none placeholder:text-[#b07272] focus:ring-2 focus:ring-[#d9b233]/50"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid min-h-0 flex-1 gap-3 bg-[#f8f5f3] p-3 xl:grid-cols-[330px_minmax(0,1fr)]">
          {/* Left Form Panel */}
          <section className="flex min-h-0 flex-col overflow-hidden rounded-2xl border border-[#ead9d3] bg-white shadow-sm">
            <div className="border-b border-[#f2e2dc] px-4 py-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-base font-bold text-[#8f0d10]">
                    {editingId !== null ? "Edit Indicator" : "Add Indicator"}
                  </h2>
                  <p className="mt-1 text-xs text-[#9d7774]">
                    Enter details for the selected performance indicator.
                  </p>
                </div>

                {editingId !== null && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="rounded-lg border border-[#ead6cf] px-3 py-1.5 text-xs font-semibold text-[#8f0d10] hover:bg-[#fff6f3]"
                  >
                    Cancel
                  </button>
                )}
              </div>

              {(error || success) && (
                <div className="mt-3 space-y-2">
                  {error && (
                    <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
                      {error}
                    </div>
                  )}
                  {success && (
                    <div className="rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-xs font-medium text-green-700">
                      {success}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3">
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-[#8f0d10]">
                    Indicator Code
                  </label>
                  <input
                    type="text"
                    value={form.indicator_code}
                    onChange={(e) =>
                      setForm({ ...form, indicator_code: e.target.value })
                    }
                    placeholder="PI-001"
                    className="h-10 w-full rounded-xl border border-[#ead6cf] bg-[#fffdfc] px-3 text-sm text-[#6e3d3d] outline-none focus:ring-2 focus:ring-[#d9b233]/30"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-[#8f0d10]">
                    Indicator Name
                  </label>
                  <input
                    type="text"
                    value={form.indicator_name}
                    onChange={(e) =>
                      setForm({ ...form, indicator_name: e.target.value })
                    }
                    placeholder="Graduation Rate"
                    className="h-10 w-full rounded-xl border border-[#ead6cf] bg-[#fffdfc] px-3 text-sm text-[#6e3d3d] outline-none focus:ring-2 focus:ring-[#d9b233]/30"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-[#8f0d10]">
                    Description
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    placeholder="Short description..."
                    rows={3}
                    className="w-full rounded-xl border border-[#ead6cf] bg-[#fffdfc] px-3 py-2.5 text-sm text-[#6e3d3d] outline-none focus:ring-2 focus:ring-[#d9b233]/30"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-[#8f0d10]">
                      Target
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={form.target_value}
                      onChange={(e) =>
                        setForm({ ...form, target_value: e.target.value })
                      }
                      placeholder="95"
                      className="h-10 w-full rounded-xl border border-[#ead6cf] bg-[#fffdfc] px-3 text-sm text-[#6e3d3d] outline-none focus:ring-2 focus:ring-[#d9b233]/30"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold text-[#8f0d10]">
                      Current
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={form.current_value}
                      onChange={(e) =>
                        setForm({ ...form, current_value: e.target.value })
                      }
                      placeholder="88"
                      className="h-10 w-full rounded-xl border border-[#ead6cf] bg-[#fffdfc] px-3 text-sm text-[#6e3d3d] outline-none focus:ring-2 focus:ring-[#d9b233]/30"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="h-10 w-full rounded-xl bg-gradient-to-r from-[#8f0d10] to-[#b3131f] text-sm font-bold text-white shadow-md transition hover:brightness-110 disabled:opacity-70"
                >
                  {saving
                    ? "Saving..."
                    : editingId !== null
                    ? "Update Indicator"
                    : "Add Indicator"}
                </button>
              </form>
            </div>
          </section>

          {/* Right List Panel */}
          <section className="flex min-h-0 flex-col overflow-hidden rounded-2xl border border-[#ead9d3] bg-white shadow-sm">
            <div className="border-b border-[#f2e2dc] px-4 py-3">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-base font-bold text-[#8f0d10]">
                    Indicator List
                  </h2>
                  <p className="mt-1 text-xs text-[#9d7774]">
                   Manage academic performance indicators, including targets and current progress.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="rounded-lg bg-[#faf4f1] px-3 py-2 text-xs font-semibold text-[#8f0d10]">
                    Total: {filteredItems.length}
                  </div>
                  <button
                    type="button"
                    onClick={() => resetForm()}
                    className="rounded-lg bg-[#8f0d10] px-3 py-2 text-xs font-semibold text-white hover:bg-[#7a0b0e]"
                  >
                    New
                  </button>
                </div>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto p-3">
              {loading ? (
                <div className="rounded-xl border border-[#ead9d3] bg-[#fcfbfa] px-4 py-8 text-center text-sm text-[#8f6b69]">
                  Loading performance indicators...
                </div>
              ) : filteredItems.length === 0 ? (
                <div className="rounded-xl border border-[#ead9d3] bg-[#fcfbfa] px-4 py-8 text-center text-sm text-[#8f6b69]">
                  No performance indicators found.
                </div>
              ) : (
                <div className="grid gap-3 lg:grid-cols-2 2xl:grid-cols-3">
                  {filteredItems.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-2xl border border-[#eee0da] bg-[#fffdfc] p-3 shadow-sm transition hover:-translate-y-[1px] hover:shadow-md"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <span className="inline-flex rounded-full bg-[#fdf0e8] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#b14e2e]">
                            {item.indicator_code}
                          </span>

                          <h3 className="mt-2 line-clamp-2 text-sm font-bold leading-5 text-[#8f0d10]">
                            {item.indicator_name}
                          </h3>
                        </div>

                        <div className="flex shrink-0 items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleEdit(item)}
                            className="rounded-lg bg-amber-500 px-2.5 py-1.5 text-[11px] font-bold text-white hover:bg-amber-600"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(item.id)}
                            className="rounded-lg bg-red-600 px-2.5 py-1.5 text-[11px] font-bold text-white hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </div>

                      <p className="mt-2 line-clamp-2 text-xs leading-5 text-[#8f6b69]">
                        {item.description || "No description provided."}
                      </p>

                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <div className="rounded-xl border border-[#f0e2dc] bg-[#faf7f5] px-3 py-2">
                          <p className="text-[10px] uppercase tracking-[0.12em] text-[#a07a76]">
                            Target
                          </p>
                          <p className="mt-1 text-lg font-bold text-[#8f0d10]">
                            {formatValue(item.target_value)}
                          </p>
                        </div>

                        <div className="rounded-xl border border-[#f0e2dc] bg-[#faf7f5] px-3 py-2">
                          <p className="text-[10px] uppercase tracking-[0.12em] text-[#a07a76]">
                            Current
                          </p>
                          <p className="mt-1 text-lg font-bold text-[#8f0d10]">
                            {formatValue(item.current_value)}
                          </p>
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
    </main>
  );
}