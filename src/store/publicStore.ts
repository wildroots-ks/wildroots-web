import { create } from 'zustand';
import type { Settings, Hours, Banner, Class } from '@/types';
import { api } from '@/lib/api';

interface PublicState {
  settings: Settings | null;
  hours: Hours[];
  banners: Banner[];
  classes: Class[];
  isLoading: boolean;
  error: string | null;

  fetchSettings: () => Promise<void>;
  fetchHours: () => Promise<void>;
  fetchBanners: () => Promise<void>;
  fetchClasses: () => Promise<void>;
  fetchClass: (slug: string) => Promise<Class | null>;
}

export const usePublicStore = create<PublicState>((set) => ({
  settings: null,
  hours: [],
  banners: [],
  classes: [],
  isLoading: false,
  error: null,

  fetchSettings: async () => {
    set({ isLoading: true, error: null });
    const response = await api.public.getSettings();
    if (response.success && response.data) {
      set({ settings: response.data as Settings, isLoading: false });
    } else {
      set({ error: response.error || 'Failed to fetch settings', isLoading: false });
    }
  },

  fetchHours: async () => {
    set({ isLoading: true, error: null });
    const response = await api.public.getHours();
    if (response.success && response.data) {
      set({ hours: response.data as Hours[], isLoading: false });
    } else {
      set({ error: response.error || 'Failed to fetch hours', isLoading: false });
    }
  },

  fetchBanners: async () => {
    set({ isLoading: true, error: null });
    const response = await api.public.getBanners();
    if (response.success && response.data) {
      set({ banners: response.data as Banner[], isLoading: false });
    } else {
      set({ error: response.error || 'Failed to fetch banners', isLoading: false });
    }
  },

  fetchClasses: async () => {
    set({ isLoading: true, error: null });
    const response = await api.public.getClasses();
    if (response.success && response.data) {
      set({ classes: response.data as Class[], isLoading: false });
    } else {
      set({ error: response.error || 'Failed to fetch classes', isLoading: false });
    }
  },

  fetchClass: async (slug: string) => {
    set({ isLoading: true, error: null });
    const response = await api.public.getClass(slug);
    set({ isLoading: false });
    if (response.success && response.data) {
      return response.data as Class;
    } else {
      set({ error: response.error || 'Failed to fetch class' });
      return null;
    }
  },
}));