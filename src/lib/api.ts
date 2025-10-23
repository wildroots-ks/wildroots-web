// src/lib/api.ts
import axios from "axios";
import { API_BASE_URL } from "@/lib/config";

// Single axios instance with absolute base URL
export const http = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false,
});

// Small helper to attach bearer tokens
const authz = (token?: string) =>
  token ? { Authorization: `Bearer ${token}` } : undefined;

export const api = {
  auth: {
    login: (email: string, password: string) =>
      http.post("/auth/login", { email, password }).then(r => r.data),

    me: (token: string) =>
      http.get("/auth/me", { headers: authz(token) }).then(r => r.data),
  },

  // Keep the shape your tabs expect
  admin: {
    // Banners
    getBanners: (token: string) =>
      http.get("/admin/banners", { headers: authz(token) }).then(r => r.data),
    createBanner: (payload: any, token: string) =>
      http.post("/admin/banners", payload, { headers: authz(token) }).then(r => r.data),
    updateBanner: (id: string, payload: any, token: string) =>
      http.put(`/admin/banners/${id}`, payload, { headers: authz(token) }).then(r => r.data),
    deleteBanner: (id: string, token: string) =>
      http.delete(`/admin/banners/${id}`, { headers: authz(token) }).then(r => r.data),

    // Classes
    getClasses: (token: string) =>
      http.get("/admin/classes", { headers: authz(token) }).then(r => r.data),
    createClass: (payload: any, token: string) =>
      http.post("/admin/classes", payload, { headers: authz(token) }).then(r => r.data),
    updateClass: (id: string, payload: any, token: string) =>
      http.put(`/admin/classes/${id}`, payload, { headers: authz(token) }).then(r => r.data),
    deleteClass: (id: string, token: string) =>
      http.delete(`/admin/classes/${id}`, { headers: authz(token) }).then(r => r.data),

    // Hours
    getHours: (token: string) =>
      http.get("/admin/hours", { headers: authz(token) }).then(r => r.data),
    updateHours: (payload: any, token: string) =>
      http.put("/admin/hours", payload, { headers: authz(token) }).then(r => r.data),

    // Settings
    getSettings: (token: string) =>
      http.get("/admin/settings", { headers: authz(token) }).then(r => r.data),
    updateSettings: (payload: any, token: string) =>
      http.put("/admin/settings", payload, { headers: authz(token) }).then(r => r.data),
  },

  // Public endpoints the publicStore uses
  public: {
    getBanners: () => http.get("/public/banners").then(r => r.data),
    getClasses: () => http.get("/public/classes").then(r => r.data),
    getHours: () => http.get("/public/hours").then(r => r.data),
    getSettings: () => http.get("/public/settings").then(r => r.data),
  },
};
