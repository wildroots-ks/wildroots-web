import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AdminUser, AuthResponse } from '@/types';
import { api } from '@/lib/api';

interface AdminState {
  user: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  verifyAuth: () => Promise<boolean>;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        const response = await api.auth.login(email, password);
        
        if (response.success && response.data) {
          const authData = response.data as AuthResponse;
          set({
            user: authData.user,
            token: authData.token,
            isAuthenticated: true,
            isLoading: false,
          });
          return true;
        } else {
          set({
            error: response.error || 'Login failed',
            isLoading: false,
          });
          return false;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
      },

      verifyAuth: async () => {
        const { token } = get();
        if (!token) {
          set({ isAuthenticated: false });
          return false;
        }

        set({ isLoading: true });
        const response = await api.auth.me(token);

        if (response.success && response.data) {
          set({
            user: response.data as AdminUser,
            isAuthenticated: true,
            isLoading: false,
          });
          return true;
        } else {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          });
          return false;
        }
      },
    }),
    {
      name: 'admin-storage',
      partialize: (state) => ({
        token: state.token,
      }),
    }
  )
);