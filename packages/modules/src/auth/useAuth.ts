import create from 'zustand';
import { combine } from 'zustand/middleware';

const initialState = {
  id: '',
  email: '',
  image_src: '',
  display_name: '',
  last_name: '',
  first_name: '',
  gender: '',
  date_of_birth: '',
  notications: [],
  interested_events: [],
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
