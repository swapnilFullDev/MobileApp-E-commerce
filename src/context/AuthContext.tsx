import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useEffect,
} from 'react';
import { useAppDispatch, useAppSelector } from '../redux';
import { hydrateAuth, signOut as signOutAction } from '../redux/slices/authSlice';
import { signOutThunk } from '../redux/thunks/authThunks';
import { getAuthSession, StoredAuthSession } from '../services/storage/authStorage';

type AuthContextValue = {
  isAuthenticated: boolean;
  signIn: () => void;
  signOut: () => void;
};

const DEFAULT_VALUE: AuthContextValue = {
  isAuthenticated: false,
  signIn: () => {},
  signOut: () => {},
};

const AuthContext = createContext<AuthContextValue>(DEFAULT_VALUE);

export function AuthProvider({ children }: PropsWithChildren) {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(state => state.auth.status);

  useEffect(() => {
    const restoreSession = async () => {
      const session: StoredAuthSession = await getAuthSession();
      if (session.token || session.user) {
        dispatch(hydrateAuth(session));
      }
    };
    restoreSession();
  }, [dispatch]);

  const signIn = useCallback(() => {}, []);

  const signOut = useCallback(() => {
    dispatch(signOutAction());
    dispatch(signOutThunk());
  }, [dispatch]);

  const value = useMemo(
    () => ({
      isAuthenticated: authStatus === 'authenticated',
      signIn,
      signOut,
    }),
    [authStatus, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}


