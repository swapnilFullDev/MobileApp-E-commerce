import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Images from "../../constants/images";
import { useTheme } from "../../context";
import { widthPercent } from "../../theme/metrics";
import { spacing } from "../../theme/spacing";
import { renderIconButton } from "../common/renderIconButton";
import { colors } from "../../theme/colors";

type HomeTopBarProps = {
  onSearchPress?: () => void;
  onProfilePress?: () => void;
  onCartPress?: () => void;
  onLogoPress?: () => void;
};

export default function HomeTopBar({
  onSearchPress,
  onProfilePress,
  onCartPress,
  onLogoPress,
}: HomeTopBarProps) {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <TouchableOpacity onPress={onLogoPress} activeOpacity={0.85}>
        <Image source={Images.brandName} style={styles.logo} />
      </TouchableOpacity>
      <View style={styles.actions}>
        {renderIconButton({
          icon: "search",
          onPress: onSearchPress,
        })}
        {/* {renderIconButton({
          icon: "shopping",
          onPress: onCartPress,
        })} */}
        {renderIconButton({
          icon: "user",
          onPress: onProfilePress,
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    backgroundColor: colors.white,
  },
  logo: {
    width: widthPercent(0.36),
    height: widthPercent(0.12),
    resizeMode: "contain",
  },
  actions: {
    flexDirection: "row",
    gap: spacing.md,
  },
});
