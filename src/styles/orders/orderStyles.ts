import { StyleSheet } from "react-native";
import { spacing } from "../../theme/spacing";
import { fonts } from "../../theme/fonts";
import { radii, typeScale } from "../../theme/scales";
import { widthPercent, scale } from "../../theme/metrics";

export const orderStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xxxl * 1.5,
    paddingTop: spacing.md,
  },
  // Order Card
  orderCard: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderRadius: radii.xl,
    padding: spacing.lg,
    gap: spacing.md,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: spacing.xs,
  },
  orderHeaderLeft: {
    flex: 1,
    gap: spacing.xs / 2,
  },
  orderNumber: {
    fontFamily: fonts.bold,
    fontSize: typeScale.fontSize.md,
    lineHeight: typeScale.lineHeight.md,
  },
  orderDate: {
    fontFamily: fonts.regular,
    fontSize: typeScale.fontSize.sm,
    lineHeight: typeScale.lineHeight.sm,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: radii.sm,
  },
  statusText: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.fontSize.xs,
    letterSpacing: 0.3,
  },
  // Items Preview
  itemsPreview: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  itemPreview: {
    width: widthPercent(0.15),
    height: widthPercent(0.15),
    borderRadius: radii.md,
    overflow: "hidden",
    position: "relative",
  },
  itemPreviewImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  moreItemsOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    alignItems: "center",
    justifyContent: "center",
  },
  moreItemsText: {
    fontFamily: fonts.bold,
    fontSize: typeScale.fontSize.sm,
    color: "#FFFFFF",
  },
  itemInfo: {
    flex: 1,
    marginLeft: spacing.sm,
    gap: spacing.xs / 2,
  },
  itemTitle: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.fontSize.sm,
    lineHeight: typeScale.lineHeight.sm,
  },
  itemMeta: {
    fontFamily: fonts.regular,
    fontSize: typeScale.fontSize.xs,
    lineHeight: typeScale.lineHeight.xs,
  },
  // Order Footer
  orderFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: spacing.xs,
    paddingTop: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "rgba(0,0,0,0.1)",
  },
  footerLabel: {
    fontFamily: fonts.regular,
    fontSize: typeScale.fontSize.sm,
    lineHeight: typeScale.lineHeight.sm,
  },
  footerValue: {
    fontFamily: fonts.bold,
    fontSize: typeScale.fontSize.lg,
    lineHeight: typeScale.lineHeight.lg,
    marginTop: spacing.xs / 2,
  },
  footerRight: {
    alignItems: "flex-end",
  },
  viewDetailsText: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.fontSize.sm,
    lineHeight: typeScale.lineHeight.sm,
  },
  // Empty State
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.xxxl * 2,
    paddingHorizontal: spacing.lg,
  },
  emptyTitle: {
    fontFamily: fonts.bold,
    fontSize: typeScale.fontSize.xl,
    lineHeight: typeScale.lineHeight.xl,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  emptySubtitle: {
    fontFamily: fonts.regular,
    fontSize: typeScale.fontSize.md,
    lineHeight: typeScale.lineHeight.md,
    textAlign: "center",
  },
  // Filter Tabs
  filterContainer: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginBottom: spacing.md,
  },
  filterRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  filterChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.md,
    borderWidth: 1,
  },
  filterChipText: {
    fontFamily: fonts.medium,
    fontSize: typeScale.fontSize.sm,
    lineHeight: typeScale.lineHeight.sm,
  },
});
