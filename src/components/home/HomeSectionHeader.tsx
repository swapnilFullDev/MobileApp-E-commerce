import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
  View,
} from "react-native";
import { useTheme } from "../../context";
import { spacing } from "../../theme/spacing";
import { fonts } from "../../theme/fonts";
import { scale, widthPercent } from "../../theme/metrics";
import { radii, typeScale } from "../../theme/scales";
import { colors } from "../../theme/colors";
import { AnimatedTouchableOpacity } from "../common";

type HomeSectionHeaderProps = {
  title: string;
  actionLabel?: string;
  onActionPress?: () => void;
  containerStyle?: ViewStyle;
};

export default function HomeSectionHeader({
  title,
  actionLabel,
  onActionPress,
  containerStyle,
}: HomeSectionHeaderProps) {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
      {actionLabel ? (
        <AnimatedTouchableOpacity
          onPress={onActionPress}
          style={[styles.actionButton, { backgroundColor: theme.primary }]}
        >
          <Text style={styles.actionLabel}>{actionLabel}</Text>
        </AnimatedTouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    // marginTop: spacing.lg,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: typeScale.fontSize.lg,
    textTransform: "capitalize",
    color: colors.textPrimary,
  },
  actionButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: widthPercent(0.012),
    borderRadius: radii.md,
  },
  actionLabel: {
    color: colors.white,
    fontFamily: typeScale.fontFamily.semiBold,
    fontSize: typeScale.fontSize.sm,
    textTransform: "capitalize",
  },
});
