import create from 'zustand';
import { combine, persist } from 'zustand/middleware';

export const useTokenStore = create(
  combine(
    {
      refreshToken: '',
    },
    (set) => ({
      setToken: (refreshToken: string) => {
        set({ refreshToken });
      },
      clearToken: () => {
        set({ refreshToken: '' });
      },
    })
  )
);
