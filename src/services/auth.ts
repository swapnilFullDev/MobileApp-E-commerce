import { apiClient } from './api';

type LoginResponse = {
  token: string;
  user: {
    id: string;
    fullName?: string;
    name: string;
    email: string;
  };
};

type LoginPayload = {
  email: string;
  password: string;
};

export function login(payload: LoginPayload) {
  return apiClient.post<LoginResponse>('/api/user/login', payload);
}

type RegisterResponse = {
  message: string;
  user: {
    id: string;
    fullName: string;
    email: string;
  };
};

type RegisterPayload = {
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

export function register(payload: RegisterPayload) {
  return apiClient.post<RegisterResponse>('/api/user/register', payload);
}
