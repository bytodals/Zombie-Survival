const API_BASE = (import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000").replace(/\/+$/, "");

export async function apiGet<T>(path: string): Promise<T> {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const res = await fetch(`${API_BASE}${normalizedPath}`);

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  return res.json();
}
