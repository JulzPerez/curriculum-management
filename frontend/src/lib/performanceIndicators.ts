const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export interface PerformanceIndicator {
  id: number;
  indicator_code: string;
  indicator_name: string;
  description?: string;
  target_value?: number;
  current_value?: number;
  created_at?: string;
  updated_at?: string;
}

export interface PerformanceIndicatorPayload {
  indicator_code: string;
  indicator_name: string;
  description?: string;
  target_value?: number;
  current_value?: number;
}

export async function getPerformanceIndicators(): Promise<PerformanceIndicator[]> {
  const res = await fetch(`${API_URL}/v1/performance-indicators/`);
  if (!res.ok) throw new Error("Failed to fetch performance indicators");
  return res.json();
}

export async function createPerformanceIndicator(payload: PerformanceIndicatorPayload) {
  const res = await fetch(`${API_URL}/v1/performance-indicators/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create performance indicator");
  return res.json();
}

export async function updatePerformanceIndicator(
  id: number,
  payload: Partial<PerformanceIndicatorPayload>
) {
  const res = await fetch(`${API_URL}/v1/performance-indicators/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update performance indicator");
  return res.json();
}

export async function deletePerformanceIndicator(id: number) {
  const res = await fetch(`${API_URL}/v1/performance-indicators/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete performance indicator");
  return res.json();
}