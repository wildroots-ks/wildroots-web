// src/store/adminStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AdminUser, AuthResponse } from "@/types";
import { api } from "@/lib/api";

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
        try {
          const response = await api.auth.login(email, password);

          if (response.success && response.data) {
            const authData = response.data as AuthResponse;
            set({
              user: authData.user,
              token: authData.token,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
            return true;
          }

          set({
            error: response.error || "Login failed",
            isLoading: false,
          });
          return false;
        } catch (err: any) {
          set({
            isLoading: false,
            isAuthenticated: false,
            error: err?.message || "Login request failed",
          });
          return false;
        }
      },

      logout: () => {
        // persist will overwrite storage on next set
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
          isLoading: false,
        });
      },

      verifyAuth: async () => {
        const { token } = get();
        if (!token) {
          set({ isAuthenticated: false, user: null });
          return false;
        }

        set({ isLoading: true, error: null });
        try {
          const response = await api.auth.me(token);
          if (response.success && response.data) {
            set({
              user: response.data as AdminUser,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
            return true;
          }

          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: response.error || "Session verification failed",
          });
          return false;
        } catch (err: any) {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: err?.message || "Session verification failed",
          });
          return false;
        }
      },
    }),
    {
      name: "admin-storage",
      partialize: (state) => ({
        token: state.token,
      }),
    }
  )
);