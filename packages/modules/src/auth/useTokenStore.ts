import create from 'zustand';
import { combine, persist } from 'zustand/middleware';

export const useTokenStore = create(
  persist(
    combine(
      {
        accessToken: '',
        refreshToken: '',
      },
      (set) => ({
        setTokens: (x: { accessToken: string; refreshToken: string }) => {
          set(x);
        },
      })
    ),
    { name: 'token' }
  )
);
