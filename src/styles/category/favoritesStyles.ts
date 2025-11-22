import { StyleSheet } from "react-native";
import { spacing } from "../../theme/spacing";
import { fonts } from "../../theme/fonts";
import { radii, typeScale } from "../../theme/scales";

export const favoritesStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  headerTextWrap: {
    flexDirection: "column",
    gap: spacing.xs / 2,
  },
  title: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.fontSize.lg,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: typeScale.fontSize.sm,
  },
  iconButton: {
    width: spacing.xl,
    height: spacing.xl,
    borderRadius: radii.round,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: StyleSheet.hairlineWidth,
  },
  listContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xxxl,
    paddingTop: spacing.md,
  },
  columnWrapper: {
    justifyContent: "space-between",
    // marginBottom: spacing.md,
  },
  cardWrapper: {
    width: "48%",
    marginBottom: spacing.lg,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.xl,
    gap: spacing.sm,
  },
  emptyTitle: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.fontSize.lg,
  },
  emptySubtitle: {
    fontFamily: fonts.regular,
    fontSize: typeScale.fontSize.sm,
    textAlign: "center",
  },
});
