import React from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import Images from "../../constants/images";
import { useTheme } from "../../context";
import { scale, verticalScale, widthPercent } from "../../theme/metrics";
import { spacing } from "../../theme/spacing";
import { typeScale } from "../../theme/scales";

type AuthHeaderProps = {
  title: string;
  subtitle: string;
  logoSource?: ImageSourcePropType;
  badgeText?: string;
  badgeColor?: string;
  containerStyle?: ViewStyle;
};

export default function AuthHeader({
  title,
  subtitle,
  logoSource = Images.brandName,
  badgeText,
  badgeColor,
  containerStyle,
}: AuthHeaderProps) {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, containerStyle]}>
      {badgeText ? (
        <View style={styles.badgeContainer}>
          <View
            style={[
              styles.badge,
              { backgroundColor: badgeColor ?? theme.primary },
            ]}
          >
            <Text style={styles.badgeText}>{badgeText}</Text>
          </View>
        </View>
      ) : null}

      <View style={styles.logoContainer}>
        <Image source={logoSource} style={styles.logo} />
      </View>

      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
        <Text style={[styles.subtitle, { color: theme.muted }]}>
          {subtitle}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  badgeContainer: {
    alignSelf: "flex-end",
    width: "100%",
    alignItems: "flex-end",
  },
  badge: {
    paddingHorizontal: scale(12),
    paddingVertical: scale(6),
    borderRadius: 999,
  },
  badgeText: {
    fontFamily: typeScale.fontFamily.semiBold,
    fontSize: typeScale.fontSize.xs,
    textTransform: "uppercase",
    color: "#FFFFFF",
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    width: widthPercent(0.48),
    height: widthPercent(0.2),
    resizeMode: "contain",
  },
  textContainer: {
    alignItems: "center",
    gap: spacing.xs,
  },
  title: {
    fontFamily: typeScale.fontFamily.bold,
    fontSize: typeScale.fontSize.xl,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: typeScale.fontFamily.medium,
    fontSize: typeScale.fontSize.md,
    textAlign: "center",
  },
});
