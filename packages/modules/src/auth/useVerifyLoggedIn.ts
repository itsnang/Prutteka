import { useEffect } from 'react';
import { useTokenStore } from './useTokenStore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'firebase-config';

export const useVerifyLoggedIn = () => {
  const hasToken = useTokenStore((s) => !!s.token);
  const setToken = useTokenStore((s) => s.setToken);
  const clearToken = useTokenStore((s) => s.clearToken);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        setToken(token);
      } else {
        clearToken();
      }
    });

    return () => {
      unsubscribe();
    };
  }, [setToken, clearToken]);

  return hasToken;
};
