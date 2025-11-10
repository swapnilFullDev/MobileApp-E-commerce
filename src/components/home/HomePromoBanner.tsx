import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Images from "../../constants/images";
import { PromoBanner } from "../../data/home";
import { useTheme } from "../../context";
import { scale, width, widthPercent } from "../../theme/metrics";
import { spacing } from "../../theme/spacing";
import { radii, typeScale } from "../../theme/scales";
import { colors } from "../../theme/colors";
import { AnimatedTouchableOpacity } from "../common";

type HomePromoBannerProps = {
  banner: PromoBanner;
  onPress?: (banner: PromoBanner) => void;
};

export default function HomePromoBanner({
  banner,
  onPress,
}: HomePromoBannerProps) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: banner.colors[0],
        },
      ]}
    >
      <Image source={Images[banner.leftImage]} style={styles.sideImage} />
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>
          {banner.title}
        </Text>
        <Text style={[styles.subtitle, { color: theme.muted }]}>
          {banner.subtitle}
        </Text>
        <AnimatedTouchableOpacity
          style={[styles.button, { backgroundColor: theme.primary }]}
          onPress={() => onPress?.(banner)}
        >
          <Text style={styles.buttonLabel}>{banner.cta}</Text>
        </AnimatedTouchableOpacity>
      </View>
      <Image source={Images[banner.rightImage]} style={styles.sideImage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginHorizontal: spacing.xl,
    // borderRadius: spacing.md,
    padding: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  sideImage: {
    width: widthPercent(0.14),
    height: widthPercent(0.26),
    resizeMode: "cover",
    borderRadius: radii.md,
  },
  content: {
    flex: 1,
    gap: spacing.sm,
    alignItems: "center",
  },
  title: {
    fontFamily: typeScale.fontFamily.medium,
    fontSize: typeScale.fontSize.lg,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: typeScale.fontFamily.regular,
    fontSize: typeScale.fontSize.xs,
    textAlign: "center",
  },
  button: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: spacing.lg,
  },
  buttonLabel: {
    color: "#FFFFFF",
    fontFamily: typeScale.fontFamily.semiBold,
    fontSize: typeScale.fontSize.sm,
  },
});
