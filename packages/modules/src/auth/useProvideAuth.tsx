import axios from 'axios';
import { APIResponseUser } from 'custom-types';
import { auth } from 'firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
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
      try {
        if (user) {
          const token = await user.getIdToken();
          const loggedInUser = await axios.post(
            '/login',
            {},
            { headers: { Authorization: 'Bearer ' + token } }
          );
          const userData = loggedInUser.data as APIResponseUser;

          setToken(token);
          setUser(userData.data.id, userData.data.attributes);
        } else {
          clearToken();
          resetUser();
        }
      } catch (error) {
        // console.log(error);

        auth.signOut();
        clearToken();
        resetUser();
      }
    });

    return () => unsubscribe();
  }, [setToken, clearToken, setUser, resetUser]);

  return { setToken, clearToken } as const;
}
