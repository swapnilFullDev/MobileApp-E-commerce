import axios from 'axios';
import { API_BASE_URL } from '../config/env';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    const message =
      error.response?.data?.message ??
      error.response?.data?.error ??
      error.message ??
      'Something went wrong';
    return Promise.reject(new Error(message));
  },
);
