import { StyleSheet } from "react-native";
import { fonts } from "../../theme/fonts";
import { scale, widthPercent } from "../../theme/metrics";
import { spacing } from "../../theme/spacing";
import { typeScale } from "../../theme/scales";

export const loginScreenStyles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xxxl,
    paddingBottom: spacing.xl,
  },
  container: {
    flex: 1,
    gap: spacing.lg,
  },
  formContainer: {
    gap: spacing.md,
  },
  rememberRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  checkbox: {
    width: scale(20),
    height: scale(20),
    borderRadius: scale(4),
    borderWidth: scale(1.5),
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    width: scale(12),
    height: scale(12),
    borderRadius: scale(2),
  },
  rememberText: {
    fontSize: typeScale.fontSize.md,
    fontFamily: typeScale.fontFamily.medium,
  },
  actionLink: {
    fontSize: typeScale.fontSize.md,
    fontFamily: typeScale.fontFamily.medium,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginVertical: spacing.xs,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    fontSize: typeScale.fontSize.md,
    fontFamily: fonts.medium,
  },
  continueText: {
    textAlign: "center",
    fontSize: typeScale.fontSize.sm,
    fontFamily: typeScale.fontFamily.semiBold,
  },
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  socialButton: {
    width: widthPercent(0.14),
    height: widthPercent(0.14),
    borderRadius: scale(28),
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  socialIcon: {
    width: widthPercent(0.14),
    height: widthPercent(0.14),
    resizeMode: "contain",
  },
  signupRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.xs,
    paddingTop: spacing.xxl,
  },
  signupText: {
    fontSize: typeScale.fontSize.md,
    fontFamily: typeScale.fontFamily.medium,
  },
});
