// src/lib/api.ts
import { API_BASE_URL } from "@/lib/config";
import { API_BASE_URL } from "@/lib/config";

type Json =
  | Record<string, unknown>
  | Array<unknown>
  | string
  | number
  | boolean
  | null;

async function jsonFetch<T = Json>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const url = `${API_BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`;

  const res = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  // If the server (or Netlify) served HTML, fail loudly with a helpful message.
  const ct = res.headers.get("content-type") || "";
  const text = await res.text();
  if (!ct.toLowerCase().includes("application/json")) {
    throw new Error(
      `Expected JSON, got content-type "${ct}". First chars: "${text.slice(0, 60)}". ` +
      `This usually means the app hit your Netlify site instead of the API. ` +
      `Check VITE_API_URL and make sure requests go to ${API_BASE_URL}.`
    );
  }

  const data = JSON.parse(text);
  if (!res.ok) {
    const msg =
      (typeof data === "object" && data && "message" in data && (data as any).message) ||
      res.statusText ||
      "Request failed";
    throw new Error(String(msg));
  }
  return data as T;
}

function authHeaders(token?: string): HeadersInit {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const api = {
  auth: {
    login: (email: string, password: string) =>
      jsonFetch<{
        success: boolean;
        data?: { token: string; user: unknown };
        error?: string;
      }>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      }),

    me: (token: string) =>
      jsonFetch<{
        success: boolean;
        data?: unknown;
        error?: string;
      }>("/auth/me", {
        headers: authHeaders(token),
      }),
  },
};
