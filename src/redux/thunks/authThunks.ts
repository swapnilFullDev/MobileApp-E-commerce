import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { login, register } from '../../services/auth';
import {
  clearAuthSession,
  saveAuthSession,
  StoredAuthSession,
} from '../../services/storage/authStorage';
import type { AuthUser } from '../slices/authSlice';

type LoginArgs = {
  email: string;
  password: string;
};

type RegisterArgs = {
  FullName: string;
  Email: string;
  Password: string;
  ConfirmPassword: string;
  Phone: string;
  Address?: string;
  Gender?: string;
  ProfileImage?: string;
  Role?: string;
};

type AuthThunkResponse = {
  token: string;
  user: AuthUser | null;
};

function coerceAuthResponse(
  data: unknown,
  fallbackEmail: string,
): StoredAuthSession {
  const token =
    typeof (data as { token?: string })?.token === 'string'
      ? (data as { token: string }).token
      : '';

  const rawUser = (
    data as {
      user?: Partial<AuthUser> & {
        name?: string;
        _id?: string;
        FullName?: string;
        email?: string;
      };
    }
  )?.user;

  return {
    token: token || null,
    user: rawUser
      ? {
          id: rawUser.id ?? rawUser._id ?? '',
          fullName: rawUser.fullName ?? rawUser.FullName ?? rawUser.name ?? '',
          email: rawUser.email ?? fallbackEmail,
        }
      : null,
  };
}

export const loginThunk = createAsyncThunk<
  AuthThunkResponse,
  LoginArgs,
  { rejectValue: string }
>('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await login(credentials);
    const result = coerceAuthResponse(response.data, credentials.email);
    if (!result.token) {
      return rejectWithValue('Invalid credentials. Please try again.');
    }
    await saveAuthSession(result);
    return {
      token: result.token,
      user: result.user,
    };
  } catch (error) {
    const message = axios.isAxiosError(error)
      ? error.response?.data?.message ?? error.message
      : error instanceof Error
      ? error.message
      : 'Unable to log in. Please try again.';
    return rejectWithValue(message);
  }
});

export const registerThunk = createAsyncThunk<
  AuthThunkResponse,
  RegisterArgs,
  { rejectValue: string }
>('auth/register', async (payload, { rejectWithValue }) => {
  try {
    const response = await register(payload);
    const result = coerceAuthResponse(response.data, payload.Email);
    if (result.token) {
      await saveAuthSession(result);
    }
    return {
      token: result.token ?? '',
      user: result.user,
    };
  } catch (error) {
    const message = axios.isAxiosError(error)
      ? error.response?.data?.message ?? error.message
      : error instanceof Error
      ? error.message
      : 'Unable to register. Please try again.';
    return rejectWithValue(message);
  }
});

export const signOutThunk = createAsyncThunk('auth/signOut', async () => {
  await clearAuthSession();
});
