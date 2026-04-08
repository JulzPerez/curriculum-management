import api from "./axios";

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
  const res = await api.get("/performance-indicators/");
  return res.data;
}

export async function createPerformanceIndicator(payload: PerformanceIndicatorPayload) {
  const res = await api.post("/performance-indicators/", payload);
  return res.data;
}

export async function updatePerformanceIndicator(
  id: number,
  payload: Partial<PerformanceIndicatorPayload>
) {
  const res = await api.put(`/performance-indicators/${id}`, payload);
  return res.data;
}

export async function deletePerformanceIndicator(id: number) {
  const res = await api.delete(`/performance-indicators/${id}`);
  return res.data;
}
