import { PropsWithChildren } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { AuthProvider, ThemeProvider } from '../context';
import { store } from '../redux';

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider>
        <AuthProvider>{children}</AuthProvider>
      </ThemeProvider>
    </ReduxProvider>
  );
}


