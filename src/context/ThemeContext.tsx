import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react';

export type Theme = {
  name: 'light' | 'dark';
  background: string;
  surface: string;
  text: string;
  muted: string;
  primary: string;
  border: string;
};

const lightTheme: Theme = {
  name: 'light',
  background: '#FAF5EF',
  surface: '#FFFFFF',
  text: '#1F2933',
  muted: '#6B7280',
  primary: '#2F4157',
  border: '#E5E7EB',
};

const darkTheme: Theme = {
  name: 'dark',
  background: '#0F172A',
  surface: '#1E293B',
  text: '#F8FAFC',
  muted: '#CBD5F5',
  primary: '#10B981',
  border: '#334155',
};

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: lightTheme,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<Theme>(lightTheme);

  const toggleTheme = () =>
    setTheme(current => (current.name === 'light' ? darkTheme : lightTheme));

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
