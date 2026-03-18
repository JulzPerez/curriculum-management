"use client";

import { useEffect, useMemo, useState } from "react";

type Indicator = {
  id: number;
  indicator_code: string;
  indicator_name: string;
  description: string;
  target_value: number;
  current_value: number;
};

const API_BASE_URL = "http://127.0.0.1:8000/api/indicators";

function getStatus(current: number, target: number) {
  return current >= target ? "On Track" : "Needs Attention";
}

export default function PerformanceIndicatorsPage() {
  const [indicators, setIndicators] = useState<Indicator[]>([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Indicator | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    indicator_code: "",
    indicator_name: "",
    description: "",
    target_value: "",
    current_value: "",
  });

  const fetchIndicators = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${API_BASE_URL}/`, {
        cache: "no-store",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to fetch indicators.");
      }

      setIndicators(Array.isArray(data) ? data : []);
    } catch (error: any) {
      alert(error.message || "Unable to load indicators.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIndicators();
  }, []);

  const filteredIndicators = useMemo(() => {
    return indicators.filter((item) =>
      `${item.indicator_code} ${item.indicator_name} ${item.description}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [indicators, search]);

  const totalIndicators = indicators.length;
  const onTrackCount = indicators.filter(
    (item) => item.current_value >= item.target_value
  ).length;
  const needsAttentionCount = totalIndicators - onTrackCount;

  const resetForm = () => {
    setForm({
      indicator_code: "",
      indicator_name: "",
      description: "",
      target_value: "",
      current_value: "",
    });
    setEditing(null);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (item: Indicator) => {
    setEditing(item);
    setForm({
      indicator_code: item.indicator_code,
      indicator_name: item.indicator_name,
      description: item.description,
      target_value: String(item.target_value),
      current_value: String(item.current_value),
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (
      !form.indicator_code.trim() ||
      !form.indicator_name.trim() ||
      !form.description.trim() ||
      !form.target_value ||
      !form.current_value
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const targetValue = Number(form.target_value);
    const currentValue = Number(form.current_value);

    if (Number.isNaN(targetValue) || Number.isNaN(currentValue)) {
      alert("Target value and current value must be valid numbers.");
      return;
    }

    const payload = {
      indicator_code: form.indicator_code.trim(),
      indicator_name: form.indicator_name.trim(),
      description: form.description.trim(),
      target_value: targetValue,
      current_value: currentValue,
    };

    try {
      setSubmitting(true);

      const url = editing
        ? `${API_BASE_URL}/${editing.id}`
        : `${API_BASE_URL}/`;

      const method = editing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data?.error || data?.detail || "Failed to save indicator."
        );
      }

      await fetchIndicators();
      setShowModal(false);
      resetForm();
    } catch (error: any) {
      alert(error.message || "Unable to save indicator.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this indicator?"
    );
    if (!confirmed) return;

    try {
      const res = await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
      });

      let data: any = {};
      try {
        data = await res.json();
      } catch {
        data = {};
      }

      if (!res.ok) {
        throw new Error(
          data?.error || data?.detail || "Failed to delete indicator."
        );
      }

      await fetchIndicators();
    } catch (error: any) {
      alert(error.message || "Unable to delete indicator.");
    }
  };

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#5f0b13_0%,#760f19_38%,#86111c_62%,#5b0912_100%)] text-white">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.10),rgba(255,255,255,0.05))] px-6 py-6 shadow-[0_18px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <p className="mb-3 inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/75">
                Academic Monitoring
              </p>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Performance Indicators Management
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
                View, add, update, and manage institutional performance
                indicators in a premium maroon monitoring workspace.
              </p>
            </div>

            <button
              onClick={openAddModal}
              className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/12 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-white/18"
            >
              + Add Indicator
            </button>
          </div>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-[24px] border border-white/10 bg-white/10 p-5 shadow-[0_14px_35px_rgba(0,0,0,0.20)] backdrop-blur-xl">
            <p className="text-sm font-medium text-white/70">Total Indicators</p>
            <h2 className="mt-3 text-4xl font-bold text-white">{totalIndicators}</h2>
            <p className="mt-2 text-sm text-white/55">
              Total performance metrics currently recorded.
            </p>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-white/10 p-5 shadow-[0_14px_35px_rgba(0,0,0,0.20)] backdrop-blur-xl">
            <p className="text-sm font-medium text-white/70">On Track</p>
            <h2 className="mt-3 text-4xl font-bold text-emerald-300">
              {onTrackCount}
            </h2>
            <p className="mt-2 text-sm text-white/55">
              Indicators that have met or exceeded their targets.
            </p>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-white/10 p-5 shadow-[0_14px_35px_rgba(0,0,0,0.20)] backdrop-blur-xl">
            <p className="text-sm font-medium text-white/70">Needs Attention</p>
            <h2 className="mt-3 text-4xl font-bold text-rose-300">
              {needsAttentionCount}
            </h2>
            <p className="mt-2 text-sm text-white/55">
              Indicators that are currently below target values.
            </p>
          </div>
        </div>

        <div className="mb-6 rounded-[24px] border border-white/10 bg-white/10 p-4 shadow-[0_14px_35px_rgba(0,0,0,0.18)] backdrop-blur-xl">
          <input
            type="text"
            placeholder="Search indicator code, name, or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/12 px-4 py-3 text-sm text-white placeholder:text-white/45 outline-none transition focus:border-white/20 focus:bg-white/15"
          />
        </div>

        <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm text-white/90">
              <thead className="bg-white/10 text-white/80">
                <tr>
                  <th className="px-6 py-4 font-semibold">Code</th>
                  <th className="px-6 py-4 font-semibold">Indicator Name</th>
                  <th className="px-6 py-4 font-semibold">Description</th>
                  <th className="px-6 py-4 font-semibold">Target</th>
                  <th className="px-6 py-4 font-semibold">Current</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-12 text-center text-white/60"
                    >
                      Loading indicators...
                    </td>
                  </tr>
                ) : filteredIndicators.length > 0 ? (
                  filteredIndicators.map((item) => {
                    const status = getStatus(
                      item.current_value,
                      item.target_value
                    );

                    return (
                      <tr
                        key={item.id}
                        className="border-t border-white/8 transition hover:bg-white/[0.045]"
                      >
                        <td className="px-6 py-4 text-white/78">
                          {item.indicator_code}
                        </td>
                        <td className="px-6 py-4 font-semibold text-white">
                          {item.indicator_name}
                        </td>
                        <td className="px-6 py-4 text-white/74">
                          {item.description}
                        </td>
                        <td className="px-6 py-4">{item.target_value}</td>
                        <td className="px-6 py-4">{item.current_value}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                              status === "On Track"
                                ? "border border-emerald-300/20 bg-emerald-400/15 text-emerald-200"
                                : "border border-rose-300/20 bg-rose-400/15 text-rose-200"
                            }`}
                          >
                            {status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-2">
                            <button
                              onClick={() => openEditModal(item)}
                              className="rounded-xl border border-amber-300/20 bg-amber-300/10 px-3 py-2 text-xs font-semibold text-amber-100 transition hover:bg-amber-300/18"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="rounded-xl border border-rose-300/20 bg-rose-300/10 px-3 py-2 text-xs font-semibold text-rose-100 transition hover:bg-rose-300/18"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-14 text-center text-white/60"
                    >
                      No indicators found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm">
            <div className="w-full max-w-2xl rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(103,13,22,0.98),rgba(85,10,18,0.98))] p-6 text-white shadow-[0_25px_70px_rgba(0,0,0,0.35)]">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/55">
                    Indicator Form
                  </p>
                  <h2 className="mt-2 text-2xl font-bold tracking-tight">
                    {editing
                      ? "Update Performance Indicator"
                      : "Add Performance Indicator"}
                  </h2>
                </div>

                <button
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-white/70 transition hover:bg-white/15 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/78">
                    Indicator Code
                  </label>
                  <input
                    type="text"
                    value={form.indicator_code}
                    onChange={(e) =>
                      setForm({ ...form, indicator_code: e.target.value })
                    }
                    className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none transition focus:border-white/20 focus:bg-white/14"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-white/78">
                    Indicator Name
                  </label>
                  <input
                    type="text"
                    value={form.indicator_name}
                    onChange={(e) =>
                      setForm({ ...form, indicator_name: e.target.value })
                    }
                    className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none transition focus:border-white/20 focus:bg-white/14"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-white/78">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none transition focus:border-white/20 focus:bg-white/14"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-white/78">
                    Target Value
                  </label>
                  <input
                    type="number"
                    value={form.target_value}
                    onChange={(e) =>
                      setForm({ ...form, target_value: e.target.value })
                    }
                    className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none transition focus:border-white/20 focus:bg-white/14"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-white/78">
                    Current Value
                  </label>
                  <input
                    type="number"
                    value={form.current_value}
                    onChange={(e) =>
                      setForm({ ...form, current_value: e.target.value })
                    }
                    className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none transition focus:border-white/20 focus:bg-white/14"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="rounded-2xl border border-white/12 bg-white/5 px-5 py-3 text-sm font-medium text-white/82 transition hover:bg-white/10"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSave}
                  disabled={submitting}
                  className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#6c0d16] transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submitting ? "Saving..." : editing ? "Update" : "Save"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}