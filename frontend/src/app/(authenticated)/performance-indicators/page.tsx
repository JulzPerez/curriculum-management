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
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isModalOpen && !saving) {
        closeModal();
      }
    }

    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen, saving]);

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
    setError("");
    setSuccess("");
  }

  function openAddModal() {
    resetForm();
    setIsModalOpen(true);
  }

  function openEditModal(item: PerformanceIndicator) {
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
    setError("");
    setSuccess("");
    setIsModalOpen(true);
  }

  function closeModal() {
    if (saving) return;
    setIsModalOpen(false);
    resetForm();
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

      await loadIndicators();
      closeModal();
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
        closeModal();
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
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8">
        <div className="mb-6 flex items-center gap-2 text-xs text-slate-400">
          <span>Performance Indicators</span>
          <span>/</span>
          <span className="font-semibold text-slate-700">Manage Indicators</span>
        </div>

        <div className="mb-8 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900">
              Performance Indicators
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              View and manage academic performance indicators, including targets
              and current progress.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center xl:w-auto">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                  Records
                </p>
                <p className="mt-1 text-xl font-black text-slate-900">
                  {items.length}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                  Results
                </p>
                <p className="mt-1 text-xl font-black text-slate-900">
                  {filteredItems.length}
                </p>
              </div>
            </div>

            <div className="w-full sm:w-[320px]">
              <input
                type="text"
                placeholder="Search code, name, description..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none placeholder:text-slate-400 transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <button
              type="button"
              onClick={openAddModal}
              className="inline-flex h-12 items-center justify-center rounded-2xl bg-indigo-600 px-5 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-700"
            >
              Add Indicator
            </button>
          </div>
        </div>

        {(error || success) && (
          <div className="mb-6 space-y-3">
            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {error}
              </div>
            )}
            {success && (
              <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                {success}
              </div>
            )}
          </div>
        )}

        <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Indicator List
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  A compact list of all performance indicators.
                </p>
              </div>

              <div className="rounded-xl bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-600">
                Total: {filteredItems.length}
              </div>
            </div>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-10 text-center text-sm text-slate-500">
                Loading performance indicators...
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-10 text-center text-sm text-slate-500">
                No performance indicators found.
              </div>
            ) : (
              <div className="grid gap-4 lg:grid-cols-2">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-[1px] hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
                          {item.indicator_code}
                        </span>

                        <h3 className="mt-3 line-clamp-2 text-lg font-bold leading-6 text-slate-900">
                          {item.indicator_name}
                        </h3>
                      </div>

                      <div className="flex shrink-0 items-center gap-2">
                        <button
                          type="button"
                          onClick={() => openEditModal(item)}
                          className="rounded-xl bg-amber-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-amber-600"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          className="rounded-xl bg-red-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500">
                      {item.description || "No description provided."}
                    </p>

                    <div className="mt-5 grid grid-cols-2 gap-4">
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
                          Target
                        </p>
                        <p className="mt-2 text-2xl font-black text-slate-900">
                          {formatValue(item.target_value)}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
                          Current
                        </p>
                        <p className="mt-2 text-2xl font-black text-slate-900">
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

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <button
            type="button"
            aria-label="Close modal backdrop"
            onClick={closeModal}
            className="absolute inset-0 bg-slate-900/45 backdrop-blur-[6px]"
          />

          <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-[30px] border border-white/20 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.22)]">
            <div className="border-b border-slate-200 bg-gradient-to-r from-slate-50 via-white to-slate-50 px-6 py-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="inline-flex rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-indigo-600">
                    Performance Indicator
                  </div>
                  <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-900">
                    {editingId !== null ? "Edit Indicator" : "Add Indicator"}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {editingId !== null
                      ? "Update the selected performance indicator details."
                      : "Enter the details of a new performance indicator."}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeModal}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-lg font-semibold text-slate-500 transition hover:bg-slate-50 hover:text-slate-700"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="max-h-[85vh] overflow-y-auto px-6 py-6">
              {(error || success) && (
                <div className="mb-5 space-y-3">
                  {error && (
                    <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                      {error}
                    </div>
                  )}
                  {success && (
                    <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                      {success}
                    </div>
                  )}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Indicator Code
                    </label>
                    <input
                      type="text"
                      value={form.indicator_code}
                      onChange={(e) =>
                        setForm({ ...form, indicator_code: e.target.value })
                      }
                      placeholder="PI-001"
                      className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none placeholder:text-slate-400 transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-500/20"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Indicator Name
                    </label>
                    <input
                      type="text"
                      value={form.indicator_name}
                      onChange={(e) =>
                        setForm({ ...form, indicator_name: e.target.value })
                      }
                      placeholder="Graduation Rate"
                      className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none placeholder:text-slate-400 transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-500/20"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Description
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    placeholder="Short description..."
                    rows={4}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Target Value
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={form.target_value}
                      onChange={(e) =>
                        setForm({ ...form, target_value: e.target.value })
                      }
                      placeholder="95"
                      className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none placeholder:text-slate-400 transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Current Value
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={form.current_value}
                      onChange={(e) =>
                        setForm({ ...form, current_value: e.target.value })
                      }
                      placeholder="88"
                      className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none placeholder:text-slate-400 transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </div>
                </div>

                <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={closeModal}
                    disabled={saving}
                    className="inline-flex h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex h-12 items-center justify-center rounded-2xl bg-indigo-600 px-5 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {saving
                      ? "Saving..."
                      : editingId !== null
                      ? "Update Indicator"
                      : "Add Indicator"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}