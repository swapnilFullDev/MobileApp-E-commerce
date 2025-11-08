const appEnv =
  (typeof globalThis !== 'undefined' &&
    // @ts-expect-error React Native does not expose type for global process
    globalThis?.process?.env?.APP_ENV) ||
  (__DEV__ ? 'development' : 'production');

export const isDevelopment = () => appEnv === 'development';

export const isStaging = () => appEnv === 'staging';

export const isProduction = () => appEnv === 'production';

export const API_BASE_URL = 'https://backend-e-commerce-gndx.onrender.com';
