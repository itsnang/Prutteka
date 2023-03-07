import create from 'zustand';
import { combine } from 'zustand/middleware';

const initialState = {
  email: '',
  username: '',
  notications: [],
  interested_events: [],
  id: '',
};

export const useAuth = create(
  combine(initialState, (set) => ({
    setUser: (id: string, attributes: any) => {
      set({ id, ...attributes });
    },
    reset: () => {
      set(initialState);
    },
  }))
);
