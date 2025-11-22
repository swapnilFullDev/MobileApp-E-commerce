import { StyleSheet } from "react-native";
import { spacing } from "../../theme/spacing";
import { radii, typeScale } from "../../theme/scales";
import { fonts } from "../../theme/fonts";
import { colors } from "../../theme/colors";

export const screenHeaderStyles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: colors.white,
  },
  headerTitleWrap: {
    alignItems: "center",
    gap: spacing.xs / 2,
  },
  heroIconButton: {
    width: spacing.xl,
    height: spacing.xl,
    borderRadius: radii.round,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontFamily: fonts.bold,
    fontSize: typeScale.fontSize.lg,
  },
  headerSubtitle: {
    fontFamily: fonts.regular,
    fontSize: typeScale.fontSize.xs,
  },
});
