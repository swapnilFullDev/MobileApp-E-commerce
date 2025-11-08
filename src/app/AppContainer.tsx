import { ReactNode } from 'react';
import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';

type AppContainerProps = {
  children: ReactNode;
};

export default function AppContainer({ children }: AppContainerProps) {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <SafeAreaView
        style={[
          styles.container,
          {
            backgroundColor: isDarkMode
              ? colors.backgroundDark
              : colors.surface,
          },
        ]}
      >
        {children}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
