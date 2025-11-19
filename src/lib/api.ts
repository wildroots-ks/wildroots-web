// src/lib/api.ts
import axios from "axios";
import { API_BASE_URL } from "@/lib/config";

export const http = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false,
});

const authz = (t?: string) => (t ? { Authorization: `Bearer ${t}` } : undefined);

export const api = {
  // ---------- AUTH ----------
  auth: {
    login: (email: string, password: string) =>
      http.post("/auth/login", { email, password }).then(r => r.data),

    me: (token: string) =>
      http.get("/auth/me", { headers: authz(token) }).then(r => r.data),
  },

  // ---------- ADMIN (what your tabs expect) ----------
  admin: {
    // BANNERS
    getBanners: (token: string) =>
      http.get("/admin/banners", { headers: authz(token) }).then(r => r.data),
    createBanner: (payload: any, token: string) =>
      http.post("/admin/banners", payload, { headers: authz(token) }).then(r => r.data),
    updateBanner: (id: string, payload: any, token: string) =>
      http.put(`/admin/banners/${id}`, payload, { headers: authz(token) }).then(r => r.data),
    deleteBanner: (id: string, token: string) =>
      http.delete(`/admin/banners/${id}`, { headers: authz(token) }).then(r => r.data),

    // CLASSES
    getClasses: (token: string) =>
      http.get("/admin/classes", { headers: authz(token) }).then(r => r.data),
    createClass: (payload: any, token: string) =>
      http.post("/admin/classes", payload, { headers: authz(token) }).then(r => r.data),
    updateClass: (id: string, payload: any, token: string) =>
      http.put(`/admin/classes/${id}`, payload, { headers: authz(token) }).then(r => r.data),
    deleteClass: (id: string, token: string) =>
      http.delete(`/admin/classes/${id}`, { headers: authz(token) }).then(r => r.data),

    // HOURS (fixed updateHours to accept id parameter)
    getHours: (token: string) =>
      http.get("/admin/hours", { headers: authz(token) }).then(r => r.data),
    createHours: (payload: any, token: string) =>
      http.post("/admin/hours", payload, { headers: authz(token) }).then(r => r.data),
    updateHours: (id: string, payload: any, token: string) =>
      http.put(`/admin/hours/${id}`, payload, { headers: authz(token) }).then(r => r.data),
    deleteHours: (id: string, token: string) =>
      http.delete(`/admin/hours/${id}`, { headers: authz(token) }).then(r => r.data),

    // SETTINGS
    getSettings: (token: string) =>
      http.get("/admin/settings", { headers: authz(token) }).then(r => r.data),
    updateSettings: (payload: any, token: string) =>
      http.put("/admin/settings", payload, { headers: authz(token) }).then(r => r.data),

    // REGISTRATIONS
    getRegistrations: (token: string) =>
      http.get("/admin/registrations", { headers: authz(token) }).then(r => r.data),
    updateRegistrationStatus: (id: string, status: string, token: string) =>
      http.put(`/admin/registrations/${id}/status`, { status }, { headers: authz(token) }).then(r => r.data),
    deleteRegistration: (id: string, token: string) =>
      http.delete(`/admin/registrations/${id}`, { headers: authz(token) }).then(r => r.data),

    // PAGE CONTENT
    getPageContent: (page: string, token: string) =>
      http.get(`/admin/page-content?page=${page}`, { headers: authz(token) }).then(r => r.data),
    createPageContent: (payload: any, token: string) =>
      http.post("/admin/page-content", payload, { headers: authz(token) }).then(r => r.data),
    updatePageContent: (id: string, payload: any, token: string) =>
      http.put(`/admin/page-content/${id}`, payload, { headers: authz(token) }).then(r => r.data),
    deletePageContent: (id: string, token: string) =>
      http.delete(`/admin/page-content/${id}`, { headers: authz(token) }).then(r => r.data),
    uploadImage: (formData: FormData, token: string) =>
      http.post("/admin/upload-image", formData, { 
        headers: { 
          ...authz(token),
          'Content-Type': 'multipart/form-data'
        } 
      }).then(r => r.data),
  },

  // ---------- PUBLIC (added getClass method) ----------
  public: {
    getBanners: () => http.get("/public/banners").then(r => r.data),
    getClasses: () => http.get("/public/classes").then(r => r.data),
    getClass: (slug: string) => http.get(`/public/classes/${slug}`).then(r => r.data),
    getHours: () => http.get("/public/hours").then(r => r.data),
    getSettings: () => http.get("/public/settings").then(r => r.data),
    registerForClass: (payload: any) => http.post("/registrations", payload).then(r => r.data),
  },
};