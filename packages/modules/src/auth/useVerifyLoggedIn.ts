import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'firebase-config';

import { create } from 'zustand';
import { combine } from 'zustand/middleware';

const useIsLoggedIn = create(
  combine(
    {
      isLoggedIn: false,
    },
    (set) => ({
      loggedIn: () => {
        set({ isLoggedIn: true });
      },
      clear: () => {
        set({ isLoggedIn: false });
      },
    })
  )
);

export const useVerifyLoggedIn = () => {
  const isLoggedIn = useIsLoggedIn((s) => s.isLoggedIn);
  const loggedIn = useIsLoggedIn((s) => s.loggedIn);
  const clear = useIsLoggedIn((s) => s.clear);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        loggedIn();
      } else {
        clear();
      }
    });

    return () => {
      unsubscribe();
    };
  }, [loggedIn, clear]);

  return isLoggedIn;
};
