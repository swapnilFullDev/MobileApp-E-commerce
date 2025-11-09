import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Images from "../../constants/images";
import { PromoBanner } from "../../data/home";
import { useTheme } from "../../context";
import { scale } from "../../theme/metrics";
import { spacing } from "../../theme/spacing";
import { typography } from "../../theme/typography";

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
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.primary }]}
          onPress={() => onPress?.(banner)}
          activeOpacity={0.9}
        >
          <Text style={styles.buttonLabel}>{banner.cta}</Text>
        </TouchableOpacity>
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
    width: scale(60),
    height: scale(120),
    resizeMode: "cover",
    borderRadius: spacing.sm,
  },
  content: {
    flex: 1,
    gap: spacing.sm,
    alignItems: "center",
  },
  title: {
    ...typography.subheading,
    textAlign: "center",
  },
  subtitle: {
    ...typography.caption,
    textAlign: "center",
  },
  button: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: spacing.lg,
  },
  buttonLabel: {
    color: "#FFFFFF",
    ...typography.label,
  },
});
