import { Dimensions, Platform, StyleSheet } from "react-native";
import { fonts } from "../../theme/fonts";
import { layoutSpacing, radii, typeScale } from "../../theme/scales";
import { spacing } from "../../theme/spacing";
import { heightPercent, scale, widthPercent } from "../../theme/metrics";

export const productDetailStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    // paddingTop: spacing.lg,
    paddingBottom: widthPercent(0.6),
    gap: spacing.md,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  backButton: {
    width: spacing.xxl,
    height: spacing.xxl,
    borderRadius: spacing.xxl,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  backLabel: {
    height: 16,
    width: 16,
  },
  headerTitle: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.fontSize.lg,
  },
  headerSpacer: {
    width: spacing.xxl,
  },
  modeSwitch: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: spacing.md,
    borderRadius: radii.round,
    borderWidth: 1,
    padding: spacing.xs / 2,
    position: "relative",
  },
  modeOption: {
    flex: 1,
    borderRadius: radii.round,
    // borderWidth: 1,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    alignItems: "center",
  },
  modeOptionText: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.fontSize.sm,
    textAlign: "center",
  },
  modeOptionSubText: {
    fontFamily: fonts.regular,
    fontSize: typeScale.fontSize.xs,
    textAlign: "center",
    marginTop: 2,
  },
  modeHighlight: {
    position: "absolute",
    top: spacing.xs / 2,
    bottom: spacing.xs / 2,
    left: spacing.xs / 2,
    borderRadius: radii.round,
  },
  heroWrapper: {
    overflow: "hidden",
    position: "relative",
  },
  heroImage: {
    width: "100%",
    height: widthPercent(1),
  },
  heroBackButton: {
    position: "absolute",
    top: spacing.md,
    left: spacing.md,
    width: widthPercent(0.1),
    height: widthPercent(0.1),
    borderRadius: spacing.xxl,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  thumbnailRow: {
    flexDirection: "row",
    padding: spacing.sm,
    gap: spacing.sm,
    paddingLeft: spacing.md,
  },
  thumbnail: {
    width: widthPercent(0.18),
    height: widthPercent(0.18),
    borderRadius: radii.lg,
    overflow: "hidden",
    borderWidth: 2,
  },
  thumbnailImage: {
    width: "100%",
    height: "100%",
  },
  section: {
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  title: {
    fontFamily: typeScale.fontFamily.semiBold,
    fontSize: typeScale.fontSize.xxl,
  },
  rentalTagline: {
    fontFamily: typeScale.fontFamily.medium,
    fontSize: typeScale.fontSize.sm,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  ratingValue: {
    fontFamily: typeScale.fontFamily.semiBold,
    fontSize: typeScale.fontSize.md,
  },
  ratingStars: {
    fontFamily: typeScale.fontFamily.medium,
    fontSize: typeScale.fontSize.sm,
    letterSpacing: 2,
  },
  reviewsText: {
    fontFamily: typeScale.fontFamily.regular,
    fontSize: typeScale.fontSize.sm,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: spacing.sm,
    flexWrap: "wrap",
    paddingHorizontal: spacing.md,
  },
  priceGroup: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: spacing.xs,
  },
  originalPrice: {
    fontFamily: typeScale.fontFamily.regular,
    fontSize: typeScale.fontSize.md,
    color: "#767676",
    textDecorationLine: "line-through",
  },
  price: {
    fontFamily: typeScale.fontFamily.semiBold,
    fontSize: typeScale.fontSize.xxl,
  },
  discount: {
    fontFamily: typeScale.fontFamily.medium,
    fontSize: typeScale.fontSize.sm,
  },
  priceSuffix: {
    fontFamily: typeScale.fontFamily.medium,
    fontSize: typeScale.fontSize.sm,
  },
  priceHelper: {
    fontFamily: typeScale.fontFamily.regular,
    fontSize: typeScale.fontSize.xs,
  },
  unavailableText: {
    fontFamily: typeScale.fontFamily.medium,
    fontSize: typeScale.fontSize.xs,
    paddingHorizontal: spacing.md,
  },
  description: {
    fontFamily: typeScale.fontFamily.medium,
    fontSize: typeScale.fontSize.sm,
  },
  sectionTitle: {
    fontFamily: typeScale.fontFamily.semiBold,
    fontSize: typeScale.fontSize.lg,
  },
  optionRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  optionBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radii.round,
    borderWidth: 1,
  },
  optionLabel: {
    fontFamily: typeScale.fontFamily.medium,
    fontSize: typeScale.fontSize.sm,
  },
  highlightsList: {
    gap: spacing.sm,
  },
  highlightRow: {
    flexDirection: "row",
    gap: spacing.sm,
    alignItems: "flex-start",
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: spacing.xs,
  },
  highlightText: {
    flex: 1,
    fontFamily: typeScale.fontFamily.medium,
    fontSize: typeScale.fontSize.sm,
  },
  deliveryText: {
    fontFamily: typeScale.fontFamily.medium,
    fontSize: typeScale.fontSize.sm,
  },
  actionBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    gap: spacing.sm,
  },
  actionInfo: {
    gap: spacing.xs,
  },
  summaryLabel: {
    fontFamily: typeScale.fontFamily.medium,
    fontSize: typeScale.fontSize.xs,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  summaryValue: {
    fontFamily: typeScale.fontFamily.semiBold,
    fontSize: typeScale.fontSize.md,
  },
  summaryMeta: {
    fontFamily: typeScale.fontFamily.regular,
    fontSize: typeScale.fontSize.xs,
  },
  actionButtons: {
    flexDirection: "row",
    gap: spacing.md,
  },
  primaryButton: {
    flex: 1,
    paddingVertical: scale(12),
  },
  secondaryButton: {
    flex: 1,
    paddingVertical: scale(12),
    // backgroundColor: "#2F2D2D",
  },
  similarList: {
    // paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  similarCard: {
    width: widthPercent(0.5),
    borderRadius: radii.xl,
    overflow: "hidden",
    borderWidth: 1,
    marginRight: spacing.md,
  },
  similarImage: {
    width: "100%",
    height: widthPercent(0.4),
  },
  similarInfo: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    gap: spacing.xs,
  },
  tagRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.xs,
  },
  tagBadge: {
    fontFamily: typeScale.fontFamily.medium,
    fontSize: 12,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: radii.round,
    overflow: "hidden",
  },
  similarTitle: {
    fontFamily: typeScale.fontFamily.medium,
    fontSize: typeScale.fontSize.sm,
    flex: 1,
  },
  similarPriceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    flexWrap: "wrap",
  },
  similarOriginalPrice: {
    fontFamily: typeScale.fontFamily.regular,
    fontSize: typeScale.fontSize.xs,
    color: "#9CA3AF",
    textDecorationLine: "line-through",
  },
  similarPrice: {
    fontFamily: typeScale.fontFamily.semiBold,
    fontSize: typeScale.fontSize.sm,
  },
  similarDiscount: {
    fontFamily: typeScale.fontFamily.medium,
    fontSize: typeScale.fontSize.xs,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs,
  },
  viewerOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.92)",
    justifyContent: "center",
    alignItems: "center",
  },
  viewerScroll: {
    flexGrow: 0,
  },
  viewerImage: {
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").height * 0.8,
    alignSelf: "center",
  },
  viewerCloseButton: {
    position: "absolute",
    top: Platform.OS === "ios" ? heightPercent(0.09) : spacing.xl,
    right: spacing.xl,
    padding: spacing.sm,
  },
  viewerCloseText: {
    color: "#FFFFFF",
    fontFamily: typeScale.fontFamily.semiBold,
    fontSize: typeScale.fontSize.lg,
  },
  purchaseCard: {
    marginHorizontal: spacing.md,
    borderRadius: radii.xl,
    borderWidth: 1,
    padding: spacing.md,
    gap: spacing.sm,
  },
  purchasePriceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
  },
  purchasePrice: {
    fontFamily: typeScale.fontFamily.semiBold,
    fontSize: typeScale.fontSize.xxl,
  },
  discountPill: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radii.round,
    borderWidth: 1,
    textAlign: "center",
    fontFamily: fonts.medium,
    fontSize: typeScale.fontSize.xs,
  },
  purchaseOriginal: {
    fontFamily: typeScale.fontFamily.medium,
    fontSize: typeScale.fontSize.xs,
  },
  purchaseInfo: {
    fontFamily: typeScale.fontFamily.regular,
    fontSize: typeScale.fontSize.sm,
  },
  purchaseMetaRow: {
    borderRadius: radii.md,
    padding: spacing.sm,
    borderWidth: 1,
  },
  purchaseMetaText: {
    fontFamily: typeScale.fontFamily.regular,
    fontSize: typeScale.fontSize.xs,
  },
  rentalCard: {
    marginHorizontal: spacing.md,
    borderRadius: radii.xl,
    borderWidth: 1,
    padding: spacing.md,
    gap: spacing.md,
  },
  rentalPricingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rentalPrice: {
    fontFamily: typeScale.fontFamily.semiBold,
    fontSize: typeScale.fontSize.xxl,
  },
  rentalHelper: {
    fontFamily: typeScale.fontFamily.regular,
    fontSize: typeScale.fontSize.sm,
    marginTop: 4,
  },
  rentalSummary: {
    alignItems: "flex-end",
    gap: 2,
  },
  rentalSummaryLabel: {
    fontFamily: typeScale.fontFamily.medium,
    fontSize: typeScale.fontSize.xs,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  rentalSummaryValue: {
    fontFamily: typeScale.fontFamily.semiBold,
    fontSize: typeScale.fontSize.lg,
  },
  durationRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  durationChip: {
    borderWidth: 1,
    borderRadius: radii.round,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  durationLabel: {
    fontFamily: typeScale.fontFamily.medium,
    fontSize: typeScale.fontSize.sm,
  },
  rentalMetaRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  metaColumn: {
    flex: 1,
    borderRadius: radii.md,
    padding: spacing.sm,
    gap: 4,
    borderWidth: 1,
  },
  metaLabel: {
    fontFamily: typeScale.fontFamily.medium,
    fontSize: typeScale.fontSize.xs,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  metaValue: {
    fontFamily: typeScale.fontFamily.semiBold,
    fontSize: typeScale.fontSize.md,
  },
});
