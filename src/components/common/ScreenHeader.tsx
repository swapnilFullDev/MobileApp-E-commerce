import React from "react";
import { Text, View, ViewStyle } from "react-native";
import { renderIconButton } from "./renderIconButton";
import { handleBack } from "./HandleBack";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useTheme } from "../../context";
import { screenHeaderStyles as styles } from "../../styles/common/screenHeaderStyles";

type ScreenHeaderProps = {
  title: string;
  containerStyle?: ViewStyle;
  subtitle?: string;
  rightIcon?: "loveFilled";
  onRightPress?: () => void;
};

export function ScreenHeader({
  title,
  containerStyle,
  subtitle,
  rightIcon,
  onRightPress,
}: ScreenHeaderProps) {
  const navigation = useNavigation<NavigationProp<any>>();
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.headerRow,
        containerStyle,
        { backgroundColor: theme.surface },
      ]}
    >
      <View style={{ flex: 1, alignItems: "flex-start" }}>
        {renderIconButton({
          icon: "leftArrow",
          onPress: () => handleBack(navigation),
          tintColor: theme.text,
        })}
      </View>
      <View style={styles.headerTitleWrap}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>{title}</Text>
        {subtitle ? (
          <Text style={[styles.headerSubtitle, { color: theme.secondaryText }]}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      <View style={{ flex: 1, alignItems: "flex-end" }} />
    </View>
  );
}
