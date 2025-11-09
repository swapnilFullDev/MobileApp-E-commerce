import { StyleSheet } from "react-native";
import { scale } from "../../theme/metrics";
import { spacing } from "../../theme/spacing";
import { typography } from "../../theme/typography";

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
    width: scale(20),
    height: scale(20),
    borderRadius: scale(4),
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    width: scale(12),
    height: scale(12),
    borderRadius: scale(2),
  },
  termsText: {
    ...typography.caption,
    textAlign: "center",
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
    ...typography.caption,
    textTransform: "uppercase",
  },
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.md,
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
    width: scale(28),
    height: scale(28),
    resizeMode: "contain",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.xs,
    marginTop: spacing.lg,
  },
  footerText: {
    ...typography.body,
  },
  footerLink: {
    ...typography.label,
  },
});

