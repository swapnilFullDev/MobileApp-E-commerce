import { StyleSheet } from "react-native";
import { spacing } from "../../theme/spacing";
import { fonts } from "../../theme/fonts";
import { radii, typeScale } from "../../theme/scales";
import { widthPercent, scale, heightPercent } from "../../theme/metrics";

export const checkoutStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xxxl * 1.5,
    paddingTop: spacing.md,
  },
  sectionCard: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderRadius: radii.xl,
    padding: spacing.lg,
    gap: spacing.md,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.xs,
  },
  sectionTitle: {
    fontFamily: fonts.bold,
    fontSize: typeScale.fontSize.lg,
    lineHeight: typeScale.lineHeight.lg,
  },
  changeButton: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.fontSize.md,
    lineHeight: typeScale.lineHeight.md,
  },
  // Address Card
  addressCard: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: radii.md,
    padding: spacing.md,
    gap: spacing.md,
    marginTop: spacing.sm,
  },
  addressCardLeft: {
    alignItems: "center",
    gap: spacing.xs,
  },
  addressIconContainer: {
    width: widthPercent(0.15),
    height: widthPercent(0.15),
    borderRadius: radii.md,
    alignItems: "center",
    justifyContent: "center",
  },
  locationPin: {
    width: scale(24),
    height: scale(24),
    borderRadius: radii.round,
  },
  addressTagBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: radii.sm,
  },
  addressTagText: {
    fontFamily: fonts.bold,
    fontSize: typeScale.fontSize.xs,
    letterSpacing: 0.5,
  },
  addressCardRight: {
    flex: 1,
    gap: spacing.xs / 2,
  },
  addressName: {
    fontFamily: fonts.bold,
    fontSize: typeScale.fontSize.md,
    lineHeight: typeScale.lineHeight.md,
  },
  addressPhone: {
    fontFamily: fonts.regular,
    fontSize: typeScale.fontSize.sm,
    lineHeight: typeScale.lineHeight.sm,
  },
  addressLine: {
    fontFamily: fonts.regular,
    fontSize: typeScale.fontSize.sm,
    lineHeight: typeScale.lineHeight.sm,
  },
  defaultBadge: {
    fontFamily: fonts.medium,
    fontSize: typeScale.fontSize.xs,
    lineHeight: typeScale.lineHeight.xs,
    marginTop: spacing.xs / 2,
  },
  emptyAddressCard: {
    borderWidth: 1,
    borderRadius: radii.md,
    padding: spacing.lg,
    alignItems: "center",
    marginTop: spacing.sm,
  },
  emptyAddressText: {
    fontFamily: fonts.regular,
    fontSize: typeScale.fontSize.md,
    marginBottom: spacing.md,
  },
  addAddressButton: {
    borderWidth: 1,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  addAddressText: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.fontSize.md,
  },
  // Note Input
  noteInput: {
    marginTop: spacing.xs,
    textAlignVertical: "top",
    paddingTop: spacing.sm,
  },
  input: {
    marginTop: spacing.xs,
  },
  textArea: {
    minHeight: scale(80),
    textAlignVertical: "top",
    paddingTop: spacing.sm,
  },
  // Order Items
  itemsGroup: {
    marginTop: spacing.sm,
  },
  groupTitle: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.fontSize.md,
    lineHeight: typeScale.lineHeight.md,
  },
  orderItem: {
    flexDirection: "row",
    gap: spacing.md,
    marginBottom: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  orderItemImage: {
    width: widthPercent(0.2),
    height: widthPercent(0.2),
    borderRadius: radii.md,
    resizeMode: "cover",
  },
  orderItemContent: {
    flex: 1,
    gap: spacing.xs / 2,
  },
  orderItemTitle: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.fontSize.md,
    lineHeight: typeScale.lineHeight.md,
  },
  orderItemMeta: {
    fontFamily: fonts.regular,
    fontSize: typeScale.fontSize.sm,
    lineHeight: typeScale.lineHeight.sm,
  },
  orderItemPrice: {
    fontFamily: fonts.bold,
    fontSize: typeScale.fontSize.md,
    lineHeight: typeScale.lineHeight.md,
    marginTop: spacing.xs / 2,
  },
  // Payment Methods
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: spacing.md,
    borderRadius: radii.md,
    borderWidth: 1,
    marginBottom: spacing.sm,
  },
  paymentOptionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    flex: 1,
  },
  radioButton: {
    width: scale(20),
    height: scale(20),
    borderRadius: radii.round,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonInner: {
    width: scale(10),
    height: scale(10),
    borderRadius: radii.round,
  },
  paymentLabel: {
    fontFamily: fonts.medium,
    fontSize: typeScale.fontSize.md,
    lineHeight: typeScale.lineHeight.md,
  },
  // Price Breakdown
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.xs,
  },
  priceLabel: {
    fontFamily: fonts.regular,
    fontSize: typeScale.fontSize.md,
    lineHeight: typeScale.lineHeight.md,
  },
  priceValue: {
    fontFamily: fonts.medium,
    fontSize: typeScale.fontSize.md,
    lineHeight: typeScale.lineHeight.md,
  },
  totalRow: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "rgba(0,0,0,0.1)",
    marginTop: spacing.sm,
    paddingTop: spacing.md,
  },
  totalLabel: {
    fontFamily: fonts.bold,
    fontSize: typeScale.fontSize.lg,
    lineHeight: typeScale.lineHeight.lg,
  },
  totalValue: {
    fontFamily: fonts.bold,
    fontSize: typeScale.fontSize.lg,
    lineHeight: typeScale.lineHeight.lg,
  },
  // Action Bar
  actionBar: {
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    paddingBottom: spacing.lg,
  },
  actionBarContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  actionBarLabel: {
    fontFamily: fonts.regular,
    fontSize: typeScale.fontSize.sm,
    lineHeight: typeScale.lineHeight.sm,
  },
  actionBarValue: {
    fontFamily: fonts.bold,
    fontSize: typeScale.fontSize.xl,
    lineHeight: typeScale.lineHeight.xl,
  },
  placeOrderButton: {
    flex: 1,
    maxWidth: widthPercent(0.5),
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    borderTopLeftRadius: radii.xl,
    borderTopRightRadius: radii.xl,
    padding: spacing.lg,
    maxHeight: heightPercent(0.85),
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  modalTitle: {
    fontFamily: fonts.bold,
    fontSize: typeScale.fontSize.xl,
    lineHeight: typeScale.lineHeight.xl,
  },
  closeButton: {
    width: scale(32),
    height: scale(32),
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonText: {
    fontSize: typeScale.fontSize.xl,
    fontFamily: fonts.bold,
  },
  modalScrollView: {
    maxHeight: heightPercent(0.6),
  },
  savedAddressCard: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: radii.md,
    padding: spacing.md,
    gap: spacing.md,
    marginBottom: spacing.md,
    position: "relative",
  },
  newAddressButton: {
    borderWidth: 1,
    borderRadius: radii.md,
    padding: spacing.md,
    alignItems: "center",
    marginTop: spacing.md,
  },
  newAddressButtonText: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.fontSize.md,
  },
  modalInput: {
    marginBottom: spacing.md,
  },
  modalSectionLabel: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.fontSize.md,
    marginBottom: spacing.sm,
  },
  tagRow: {
    flexDirection: "row",
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  tagOption: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.md,
    borderWidth: 1,
  },
  tagOptionText: {
    fontFamily: fonts.medium,
    fontSize: typeScale.fontSize.sm,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  checkbox: {
    width: scale(20),
    height: scale(20),
    borderRadius: radii.sm,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxLabel: {
    fontFamily: fonts.regular,
    fontSize: typeScale.fontSize.md,
  },
  submitButton: {
    marginTop: spacing.md,
  },
});
