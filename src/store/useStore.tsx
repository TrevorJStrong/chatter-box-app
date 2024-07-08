import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
    userId: string;
    login: () => void;
    logout: () => void;
    updateToken: (token: string) => void;
    setUserId: (userId: string) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      token: null,
      userId: null,
      login: () => set({ isAuthenticated: true }),
      logout: () => set({ isAuthenticated: false }),
      updateToken: (token) => set({ token }),
      setUserId: (userId) => set({ userId }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage)
    },
  ),
)