import { StyleSheet } from "react-native";
import { spacing } from "../../theme/spacing";
import { fonts } from "../../theme/fonts";
import { radii, typeScale } from "../../theme/scales";
import { widthPercent } from "../../theme/metrics";

export const cartStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: spacing.xxxl,
    gap: spacing.md,
  },
  scrollContent: {
    paddingBottom: spacing.xxxl,
    paddingTop: spacing.md,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  headerTitleWrap: {
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
    fontFamily: fonts.semiBold,
    fontSize: typeScale.fontSize.xl,
  },
  headerStep: {
    fontFamily: fonts.medium,
    fontSize: typeScale.fontSize.sm,
  },
  addressCard: {
    marginHorizontal: spacing.md,
    borderWidth: 1,
    borderRadius: radii.xl,
    padding: spacing.md,
    gap: spacing.xs,
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  addressLabel: {
    fontFamily: fonts.regular,
    fontSize: typeScale.fontSize.sm,
  },
  addressValue: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.fontSize.md,
  },
  changeButton: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.fontSize.sm,
  },
  addressLine: {
    fontFamily: fonts.regular,
    fontSize: typeScale.fontSize.sm,
  },
  alertCard: {
    marginHorizontal: spacing.md,
    borderWidth: 1,
    borderRadius: radii.md,
    padding: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginTop: spacing.md,
  },
  alertIcon: {
    width: spacing.lg,
    height: spacing.lg,
    borderRadius: radii.round,
    alignItems: "center",
    justifyContent: "center",
  },
  alertText: {
    fontFamily: fonts.medium,
    fontSize: typeScale.fontSize.sm,
    flex: 1,
  },
  summaryRow: {
    marginHorizontal: spacing.md,
    padding: spacing.md,
    borderWidth: 1,
    borderRadius: radii.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: spacing.md,
  },
  summaryLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  summaryText: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.fontSize.sm,
  },
  summaryTag: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.fontSize.sm,
  },
  itemCard: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderRadius: radii.md,
    padding: spacing.md,
    gap: spacing.sm,
  },
  itemHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brand: {
    flex: 1,
    marginLeft: spacing.sm,
    fontFamily: fonts.semiBold,
    fontSize: typeScale.fontSize.md,
  },
  removeText: {
    fontFamily: fonts.medium,
    fontSize: typeScale.fontSize.xs,
  },
  itemBody: {
    flexDirection: "row",
    gap: spacing.md,
  },
  itemImage: {
    width: widthPercent(0.22),
    height: widthPercent(0.28),
    borderRadius: radii.md,
  },
  itemContent: {
    flex: 1,
    gap: spacing.xs,
  },
  title: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.fontSize.md,
  },
  seller: {
    fontFamily: fonts.regular,
    fontSize: typeScale.fontSize.xs,
  },
  metaRow: {
    flexDirection: "row",
    gap: spacing.sm,
    alignItems: "center",
  },
  metaPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs / 2,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: radii.lg,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
  },
  metaLabel: {
    fontFamily: fonts.regular,
    fontSize: typeScale.fontSize.xs,
  },
  metaValue: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.fontSize.xs,
  },
  qtyControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  qtyButton: {
    width: spacing.xl,
    height: spacing.xl,
    borderRadius: radii.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  qtyButtonMinus: {
    backgroundColor: "#F3F4F6",
  },
  qtyButtonPlus: {
    backgroundColor: "#6B7280",
  },

  qtyButtonPlusText: {
    color: "#FFFFFF",
    fontFamily: fonts.semiBold,
    fontSize: typeScale.fontSize.md,
  },
  qtyButtonMinusIcon: {
    width: spacing.sm,
    height: spacing.sm,
    tintColor: "#1F2937",
  },
  qtyButtonPlusIcon: {
    width: spacing.md,
    height: spacing.md,
    tintColor: "#FFFFFF",
  },
  qtyValue: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.fontSize.sm,
    minWidth: spacing.lg,
    textAlign: "center",
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  price: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.fontSize.md,
  },
  originalPrice: {
    fontFamily: fonts.regular,
    fontSize: typeScale.fontSize.sm,
    textDecorationLine: "line-through",
    color: "#9CA3AF",
  },
  discount: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.fontSize.sm,
  },
  returnText: {
    fontFamily: fonts.regular,
    fontSize: typeScale.fontSize.xs,
  },
  couponCard: {
    marginHorizontal: spacing.md,
    borderWidth: 1,
    borderRadius: radii.xl,
    padding: spacing.md,
    gap: spacing.md,
  },
  couponBadge: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.fontSize.sm,
  },
  couponCode: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.fontSize.sm,
    letterSpacing: 1,
  },
  priceCard: {
    marginHorizontal: spacing.md,
    borderWidth: 1,
    borderRadius: radii.xl,
    padding: spacing.md,
    gap: spacing.sm,
  },
  priceRowItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  priceLabel: {
    fontFamily: fonts.regular,
    fontSize: typeScale.fontSize.sm,
  },
  priceValue: {
    fontFamily: fonts.medium,
    fontSize: typeScale.fontSize.sm,
  },
  totalRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: spacing.sm,
    marginTop: spacing.sm,
  },
  totalLabel: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.fontSize.md,
  },
  totalValue: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.fontSize.md,
  },
  badgeRow: {
    flexDirection: "row",
    gap: spacing.lg,
    alignItems: "center",
    paddingHorizontal: spacing.md,
  },
  badgeItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs / 2,
  },
  badgeText: {
    fontFamily: fonts.medium,
    fontSize: typeScale.fontSize.xs,
  },
  actionBar: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
  },
  placeOrderButton: {
    borderRadius: radii.xl,
    paddingVertical: spacing.md,
    alignItems: "center",
  },
  placeOrderText: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.fontSize.md,
    color: "#FFFFFF",
  },
  trashIcon: {
    width: widthPercent(0.05),
    height: widthPercent(0.05),
  },
});
