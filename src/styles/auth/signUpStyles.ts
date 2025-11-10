import { StyleSheet } from "react-native";
import { scale, widthPercent } from "../../theme/metrics";
import { spacing } from "../../theme/spacing";
import { typeScale } from "../../theme/scales";

export const signUpScreenStyles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
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
  header: {
    paddingHorizontal: spacing.md,
  },
  formContainer: {
    gap: spacing.md,
  },
  termsRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: spacing.xs,
    marginHorizontal: spacing.md,
  },
  checkbox: {
    width: widthPercent(0.05),
    height: widthPercent(0.05),
    borderRadius: scale(4),
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    width: widthPercent(0.05),
    height: widthPercent(0.05),
    borderRadius: scale(2),
  },
  termsText: {
    textAlign: "center",
    fontSize: typeScale.fontSize.sm,
    fontFamily: typeScale.fontFamily.medium,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginVertical: spacing.md,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    textTransform: "uppercase",
    fontSize: typeScale.fontSize.xs,
    fontFamily: typeScale.fontFamily.medium,
  },
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.md,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.xs,
    marginTop: spacing.lg,
  },
  footerText: {
    fontSize: typeScale.fontSize.md,
    fontFamily: typeScale.fontFamily.medium,
  },
  footerLink: {
    fontSize: typeScale.fontSize.md,
    fontFamily: typeScale.fontFamily.bold,
  },
});
