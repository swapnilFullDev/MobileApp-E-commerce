/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AppContainer from "./src/app/AppContainer";
import { AppProviders } from "./src/app/AppProviders";
import { AppNavigator } from "./src/navigation";
import { colors } from "./src/theme/colors";
import { useTheme } from "./src/context";

function App() {
  const { theme } = useTheme();
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.surface }}>
        <AppProviders>
          <AppContainer>
            <StatusBar
              barStyle={
                theme.name === "light" ? "dark-content" : "light-content"
              }
              backgroundColor={theme.surface}
            />
            <AppNavigator />
          </AppContainer>
        </AppProviders>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
