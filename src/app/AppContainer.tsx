import { ReactNode } from "react";
import { StatusBar, StyleSheet, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme/colors";

type AppContainerProps = {
  children: ReactNode;
};

export default function AppContainer({ children }: AppContainerProps) {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <SafeAreaView
        style={[
          styles.safeArea,
          {
            backgroundColor: isDarkMode
              ? colors.backgroundDark
              : colors.surface,
          },
        ]}
      >
        {children}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
});
