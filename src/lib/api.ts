import type { ApiResponse } from '@/types';

const API_BASE = import.meta.env.VITE_API_BASE || '/api';

interface RequestOptions extends RequestInit {
  token?: string;
}

async function request<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const { token, ...fetchOptions } = options;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...fetchOptions.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...fetchOptions,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.message || 'An error occurred',
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
}

export const api = {
  // Public endpoints
  public: {
    getSettings: () => request('/public/settings'),
    getHours: () => request('/public/hours'),
    getBanners: () => request('/public/banners'),
    getClasses: () => request('/public/classes'),
    getClass: (slug: string) => request(`/public/classes/${slug}`),
    submitContact: (data: unknown) =>
      request('/public/contact', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    registerForClass: (data: unknown) =>
      request('/public/classes/register', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  },

  // Auth endpoints
  auth: {
    login: (email: string, password: string) =>
      request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),
    me: (token: string) =>
      request('/admin/me', {
        token,
      }),
  },

  // Admin endpoints
  admin: {
    // Settings
    updateSettings: (data: unknown, token: string) =>
      request('/admin/settings', {
        method: 'PUT',
        body: JSON.stringify(data),
        token,
      }),

    // Hours
    getHours: (token: string) => request('/admin/hours', { token }),
    createHours: (data: unknown, token: string) =>
      request('/admin/hours', {
        method: 'POST',
        body: JSON.stringify(data),
        token,
      }),
    updateHours: (id: string, data: unknown, token: string) =>
      request(`/admin/hours/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        token,
      }),
    deleteHours: (id: string, token: string) =>
      request(`/admin/hours/${id}`, {
        method: 'DELETE',
        token,
      }),

    // Banners
    getBanners: (token: string) => request('/admin/banners', { token }),
    createBanner: (data: unknown, token: string) =>
      request('/admin/banners', {
        method: 'POST',
        body: JSON.stringify(data),
        token,
      }),
    updateBanner: (id: string, data: unknown, token: string) =>
      request(`/admin/banners/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        token,
      }),
    deleteBanner: (id: string, token: string) =>
      request(`/admin/banners/${id}`, {
        method: 'DELETE',
        token,
      }),

    // Classes
    getClasses: (token: string) => request('/admin/classes', { token }),
    createClass: (data: unknown, token: string) =>
      request('/admin/classes', {
        method: 'POST',
        body: JSON.stringify(data),
        token,
      }),
    updateClass: (id: string, data: unknown, token: string) =>
      request(`/admin/classes/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        token,
      }),
    deleteClass: (id: string, token: string) =>
      request(`/admin/classes/${id}`, {
        method: 'DELETE',
        token,
      }),
  },
};