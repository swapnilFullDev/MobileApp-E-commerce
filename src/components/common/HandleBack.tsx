import { NavigationProp } from "@react-navigation/native";

export const handleBack = (navigation: NavigationProp<any>) => {
  if (navigation.canGoBack()) {
    navigation.goBack();
  }
};
