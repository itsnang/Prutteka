import { create } from 'zustand';
import { combine } from 'zustand/middleware';

export const useTokenStore = create(
  combine(
    {
      token: '',
    },
    (set) => ({
      setToken: (token: string) => {
        set({ token });
      },
      clearToken: () => {
        set({ token: '' });
      },
    })
  )
);
