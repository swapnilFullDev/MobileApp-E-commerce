import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Images from "../../constants/images";
import { useTheme } from "../../context";
import { scale, widthPercent } from "../../theme/metrics";
import { spacing } from "../../theme/spacing";

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

  const renderIconButton = (
    icon: keyof typeof Images,
    onPress?: () => void
  ) => (
    <TouchableOpacity
      key={icon}
      style={[styles.iconButton]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Image
        source={Images[icon]}
        style={[styles.icon, { tintColor: theme.primary }]}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onLogoPress} activeOpacity={0.85}>
        <Image source={Images.brandName} style={styles.logo} />
      </TouchableOpacity>
      <View style={styles.actions}>
        {renderIconButton("search", onSearchPress)}
        {renderIconButton("shopping", onCartPress)}
        {renderIconButton("user", onProfilePress)}
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
  iconButton: {
    width: widthPercent(0.07),
    height: widthPercent(0.07),
    borderRadius: scale(20),
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: widthPercent(0.06),
    height: widthPercent(0.06),
    resizeMode: "contain",
  },
});
