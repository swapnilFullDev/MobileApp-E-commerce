import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AuthUser } from '../../redux/slices/authSlice';

const TOKEN_KEY = '@attireBandhan/token';
const USER_KEY = '@attireBandhan/user';

export type StoredAuthSession = {
  token: string | null;
  user: AuthUser | null;
};

export async function saveAuthSession(session: StoredAuthSession) {
  await Promise.all([
    session.token
      ? AsyncStorage.setItem(TOKEN_KEY, session.token)
      : AsyncStorage.removeItem(TOKEN_KEY),
    session.user
      ? AsyncStorage.setItem(USER_KEY, JSON.stringify(session.user))
      : AsyncStorage.removeItem(USER_KEY),
  ]);
}

export async function clearAuthSession() {
  await Promise.all([AsyncStorage.removeItem(TOKEN_KEY), AsyncStorage.removeItem(USER_KEY)]);
}

export async function getAuthSession(): Promise<StoredAuthSession> {
  const [token, userJson] = await Promise.all([
    AsyncStorage.getItem(TOKEN_KEY),
    AsyncStorage.getItem(USER_KEY),
  ]);

  let user: AuthUser | null = null;
  if (userJson) {
    try {
      user = JSON.parse(userJson) as AuthUser;
    } catch {
      user = null;
    }
  }

  return { token, user };
}


