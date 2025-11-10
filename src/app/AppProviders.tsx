import { PropsWithChildren } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider, ThemeProvider, ToastProvider } from "../context";
import { store } from "../redux";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <ReduxProvider store={store}>
      <SafeAreaProvider>
        <ThemeProvider>
          <ToastProvider>
            <AuthProvider>{children}</AuthProvider>
          </ToastProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </ReduxProvider>
  );
}
