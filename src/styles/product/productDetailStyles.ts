import { StyleSheet } from "react-native";
import { fonts } from "../../theme/fonts";
import { radius } from "../../theme/radius";
import { spacing } from "../../theme/spacing";

export const productDetailStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxxl * 2,
    gap: spacing.lg,
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
    fontSize: 18,
  },
  headerSpacer: {
    width: spacing.xxl,
  },
  modeSwitch: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: spacing.xs,
    marginHorizontal: spacing.md,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
    borderRadius: radius.full,
    borderWidth: 1,
    gap: spacing.xs,
  },
  modeOption: {
    flex: 1,
    borderRadius: radius.full,
    borderWidth: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    alignItems: "center",
  },
  modeOptionText: {
    fontFamily: fonts.semiBold,
    fontSize: 14,
    textAlign: "center",
  },
  modeOptionSubText: {
    fontFamily: fonts.regular,
    fontSize: 12,
    textAlign: "center",
    marginTop: 2,
  },
  heroCard: {
    marginHorizontal: spacing.md,
    borderRadius: radius.xl,
    borderWidth: 1,
    overflow: "hidden",
  },
  heroImage: {
    width: "100%",
    height: 320,
  },
  thumbnailRow: {
    flexDirection: "row",
    padding: spacing.sm,
    gap: spacing.sm,
    // justifyContent: "center",
  },
  thumbnail: {
    width: 72,
    height: 72,
    borderRadius: radius.lg,
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
    fontFamily: fonts.semiBold,
    fontSize: 24,
    lineHeight: 30,
  },
  rentalTagline: {
    fontFamily: fonts.medium,
    fontSize: 14,
    lineHeight: 20,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  ratingValue: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
  },
  ratingStars: {
    fontFamily: fonts.medium,
    fontSize: 14,
    letterSpacing: 2,
  },
  reviewsText: {
    fontFamily: fonts.regular,
    fontSize: 14,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: spacing.sm,
    flexWrap: "wrap",
  },
  priceGroup: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: spacing.xs,
  },
  originalPrice: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: "#767676",
    textDecorationLine: "line-through",
  },
  price: {
    fontFamily: fonts.semiBold,
    fontSize: 24,
  },
  discount: {
    fontFamily: fonts.medium,
    fontSize: 14,
  },
  priceSuffix: {
    fontFamily: fonts.medium,
    fontSize: 14,
  },
  priceHelper: {
    fontFamily: fonts.regular,
    fontSize: 13,
  },
  unavailableText: {
    fontFamily: fonts.medium,
    fontSize: 13,
  },
  description: {
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 22,
  },
  sectionTitle: {
    fontFamily: fonts.semiBold,
    fontSize: 18,
  },
  optionRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  optionBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    borderWidth: 1,
  },
  optionLabel: {
    fontFamily: fonts.medium,
    fontSize: 14,
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
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 22,
  },
  deliveryText: {
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 22,
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
    fontFamily: fonts.medium,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  summaryValue: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
  },
  summaryMeta: {
    fontFamily: fonts.regular,
    fontSize: 13,
  },
  actionButtons: {
    flexDirection: "row",
    gap: spacing.md,
  },
  primaryButton: {
    flex: 1,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: "#2F2D2D",
  },
  similarList: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  similarCard: {
    width: 180,
    borderRadius: radius.xl,
    overflow: "hidden",
    borderWidth: 1,
    marginRight: spacing.xs,
  },
  similarImage: {
    width: "100%",
    height: 140,
  },
  similarInfo: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    gap: spacing.xs,
  },
  similarTitle: {
    fontFamily: fonts.medium,
    fontSize: 14,
  },
  similarPriceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  similarOriginalPrice: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: "#9CA3AF",
    textDecorationLine: "line-through",
  },
  similarPrice: {
    fontFamily: fonts.semiBold,
    fontSize: 14,
  },
  similarDiscount: {
    fontFamily: fonts.medium,
    fontSize: 12,
  },
  purchaseCard: {
    marginHorizontal: spacing.md,
    borderRadius: radius.xl,
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
    fontFamily: fonts.semiBold,
    fontSize: 24,
  },
  discountPill: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
    borderWidth: 1,
    textAlign: "center",
    fontFamily: fonts.medium,
    fontSize: 12,
  },
  purchaseOriginal: {
    fontFamily: fonts.medium,
    fontSize: 13,
  },
  purchaseInfo: {
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 20,
  },
  purchaseMetaRow: {
    borderRadius: radius.md,
    padding: spacing.sm,
    borderWidth: 1,
  },
  purchaseMetaText: {
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 20,
  },
  rentalCard: {
    marginHorizontal: spacing.md,
    borderRadius: radius.xl,
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
    fontFamily: fonts.semiBold,
    fontSize: 24,
  },
  rentalHelper: {
    fontFamily: fonts.regular,
    fontSize: 14,
    marginTop: 4,
  },
  rentalSummary: {
    alignItems: "flex-end",
    gap: 2,
  },
  rentalSummaryLabel: {
    fontFamily: fonts.medium,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  rentalSummaryValue: {
    fontFamily: fonts.semiBold,
    fontSize: 18,
  },
  durationRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  durationChip: {
    borderWidth: 1,
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm * 0.75,
  },
  durationLabel: {
    fontFamily: fonts.medium,
    fontSize: 14,
  },
  rentalMetaRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  metaColumn: {
    flex: 1,
    borderRadius: radius.md,
    padding: spacing.sm,
    gap: 4,
    borderWidth: 1,
  },
  metaLabel: {
    fontFamily: fonts.medium,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  metaValue: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
  },
});
