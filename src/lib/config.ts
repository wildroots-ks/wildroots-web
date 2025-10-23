// src/lib/config.ts
// One source of truth. No trailing slash.
export const API_BASE_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") ??
  "http://localhost:5000/api"; // dev fallback only
