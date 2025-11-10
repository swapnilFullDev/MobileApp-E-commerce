import { StyleSheet } from "react-native";
import { spacing } from "../../theme/spacing";
import { radii, typeScale } from "../../theme/scales";
import { fonts } from "../../theme/fonts";

export const categoriesStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: spacing.xxxl,
    paddingHorizontal: spacing.md,
    gap: spacing.md,
  },
  listContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xxxl,
    paddingTop: spacing.md,
  },
  emptyContent: {
    flexGrow: 1,
  },
  header: {
    gap: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  headerTitle: {
    paddingHorizontal: 0,
  },
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
  },
  headerAction: {
    width: spacing.xl * 1.2,
    height: spacing.xl * 1.2,
    borderRadius: radii.round,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitleText: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.fontSize.xl,
    textTransform: "capitalize",
  },
  chipScroll: {
    paddingHorizontal: spacing.md,
  },
  chipList: {
    flexDirection: "row",
    alignItems: "center",
  },
  helperText: {
    fontFamily: fonts.regular,
    fontSize: typeScale.fontSize.sm,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },
  categoryItem: {
    width: "48%",
    aspectRatio: 1,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
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
  chip: {
    borderRadius: radii.round,
    borderWidth: 1,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.lg,
    marginRight: spacing.sm,
  },
  chipLabel: {
    fontFamily: fonts.medium,
    fontSize: typeScale.fontSize.sm,
  },
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: radii.md,
    borderWidth: 1,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    gap: spacing.xs,
  },
  filterIcon: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.fontSize.sm,
  },
  filterButtonLabel: {
    fontFamily: fonts.medium,
    fontSize: typeScale.fontSize.sm,
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  sortLabel: {
    fontFamily: fonts.medium,
    fontSize: typeScale.fontSize.sm,
  },
  viewToggleButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radii.md,
    borderWidth: 1,
    gap: spacing.xs / 2,
  },
  viewToggleIcon: {
    width: spacing.md,
    height: spacing.md,
    resizeMode: "contain",
  },
  resultsMeta: {
    fontFamily: fonts.medium,
    fontSize: typeScale.fontSize.xs,
    paddingHorizontal: spacing.md,
  },
  productsRow: {
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },
  productCardWrapper: {
    width: "48%",
    marginBottom: spacing.lg,
  },
  footerSpacing: {
    height: spacing.xxl,
  },
});
