import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
    token: string | null;
    userId: string;
    logout: () => void;
    updateToken: (token: string) => void;
    setUserId: (userId: string) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      userId: null,
      logout: () => set({ token: null }),
      updateToken: (token) => set({ token }),
      setUserId: (userId) => set({ userId }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage)
    },
  ),
)