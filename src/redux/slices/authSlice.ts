import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginThunk, registerThunk, signOutThunk } from '../thunks/authThunks';

export type AuthUser = {
  id: string;
  fullName: string;
  email: string;
};

export type AuthState = {
  status: 'idle' | 'loading' | 'authenticated' | 'error';
  token: string | null;
  error: string | null;
  user: AuthUser | null;
};

const initialState: AuthState = {
  status: 'idle',
  token: null,
  error: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    hydrateAuth(
      state,
      action: PayloadAction<{ token: string | null; user: AuthUser | null }>,
    ) {
      const hasToken = Boolean(action.payload.token);
      state.status = hasToken ? 'authenticated' : 'idle';
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.error = null;
    },
    signOut(state) {
      state.status = 'idle';
      state.token = null;
      state.error = null;
      state.user = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginThunk.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.status = 'authenticated';
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload ?? 'Unable to log in.';
      })
      .addCase(registerThunk.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        const hasToken = Boolean(action.payload.token);
        state.status = hasToken ? 'authenticated' : 'idle';
        state.token = hasToken ? action.payload.token : null;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload ?? 'Unable to register.';
      })
      .addCase(signOutThunk.fulfilled, state => {
        state.status = 'idle';
        state.token = null;
        state.error = null;
        state.user = null;
      });
  },
});

export const { signOut, hydrateAuth } = authSlice.actions;

export default authSlice.reducer;
