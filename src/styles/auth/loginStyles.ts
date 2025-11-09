import { StyleSheet } from "react-native";
import { fonts } from "../../theme/fonts";
import { scale } from "../../theme/metrics";
import { spacing } from "../../theme/spacing";
import { typography } from "../../theme/typography";

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
    ...typography.body,
    fontFamily: fonts.medium,
  },
  actionLink: {
    ...typography.label,
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
    ...typography.caption,
    fontFamily: fonts.medium,
  },
  continueText: {
    textAlign: "center",
    ...typography.label,
  },
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  socialButton: {
    width: scale(56),
    height: scale(56),
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
    width: scale(56),
    height: scale(56),
    resizeMode: "contain",
  },
  signupRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.xs,
  },
  signupText: {
    ...typography.body,
  },
});

