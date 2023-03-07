import { auth } from 'firebase-config';
import { onAuthStateChanged, onIdTokenChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useAuth } from './useAuth';
import { useTokenStore } from './useTokenStore';

export function useProvideAuth() {
  const setToken = useTokenStore((state) => state.setToken);
  const clearToken = useTokenStore((state) => state.clearToken);
  const setUser = useAuth((state) => state.setUser);
  const resetUser = useAuth((state) => state.reset);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        setToken(token);
      } else {
        clearToken();
      }
    });

    return () => unsubscribe();
  }, [setToken, clearToken]);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        setToken(token);
      } else {
        clearToken();
      }
    });
    return () => unsubscribe();
  }, [setToken, clearToken]);

  return { setToken, clearToken } as const;
}
