import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

const useAuthStore = create(
  persist(
    immer((set) => ({
      _hasHydrated: false,
      logged: false,
      handleLogin: () =>
        set((state) => {
          state.logged = true;
        }),
      handleLogout: () =>
        set((state) => {
          state.logged = false;
        }),
      setHasHydrated: (payload) =>
        set((state) => {
          state._hasHydrated = payload;
        }),
    })),
    {
      version: 1,
      name: 'room-finder-auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ logged: state.logged }),
      onRehydrateStorage: () => (state) => {
        state.setHasHydrated(true);
      },
    },
  ),
);

export default useAuthStore;
