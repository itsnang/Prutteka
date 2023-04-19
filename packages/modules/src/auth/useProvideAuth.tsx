import axios from 'axios';
import { APIResponseUser } from 'custom-types';
import { auth } from 'firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useAuth } from './useAuth';

import { create } from 'zustand';

interface IsLoggedInState {
  isLoggedIn: boolean | null;
  loggedIn: () => void;
  clear: () => void;
}

const useIsLoggedIn = create<IsLoggedInState>((set) => ({
  isLoggedIn: null,
  loggedIn: () => {
    set({ isLoggedIn: true });
  },
  clear: () => {
    set({ isLoggedIn: false });
  },
}));

export function useProvideAuth() {
  const setUser = useAuth((state) => state.setUser);
  const resetUser = useAuth((state) => state.reset);
  const isLoggedIn = useIsLoggedIn((s) => s.isLoggedIn);
  const loggedIn = useIsLoggedIn((s) => s.loggedIn);
  const clear = useIsLoggedIn((s) => s.clear);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          const token = await user.getIdToken();
          const loggedInUser = await axios.post(
            '/login',
            {},
            { headers: { Authorization: 'Bearer ' + token } }
          );
          const userData = loggedInUser.data as APIResponseUser;

          setUser(userData.data.id, userData.data.attributes);
          loggedIn();
        } else {
          resetUser();
          clear();
        }
      } catch (error) {
        // console.log(error);

        auth.signOut();
        clear();
        resetUser();
      }
    });

    return () => unsubscribe();
  }, [setUser, resetUser, loggedIn, clear]);

  return { isLoggedIn } as const;
}
