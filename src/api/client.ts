const API_BASE = (globalThis as { VITE_API_BASE_URL?: string }).VITE_API_BASE_URL ?? "";

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`);

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  return res.json();
}