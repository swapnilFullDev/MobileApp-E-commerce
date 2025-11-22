import { StyleSheet } from "react-native";
import { spacing } from "../../theme/spacing";
import { fonts } from "../../theme/fonts";
import { radii, typeScale } from "../../theme/scales";
import { widthPercent, scale, heightPercent } from "../../theme/metrics";

export const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xxxl * 1.5,
    paddingTop: spacing.md,
  },
  // Header Card
  headerCard: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderRadius: radii.xl,
    padding: spacing.lg,
    gap: spacing.lg,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  avatarContainer: {
    width: widthPercent(0.18),
    height: widthPercent(0.18),
    borderRadius: radii.round,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  avatarIcon: {
    width: widthPercent(0.12),
    height: widthPercent(0.12),
  },
  userDetails: {
    flex: 1,
    gap: spacing.xs / 2,
  },
  userName: {
    fontFamily: fonts.bold,
    fontSize: typeScale.fontSize.xl,
    lineHeight: typeScale.lineHeight.xl,
  },
  userEmail: {
    fontFamily: fonts.regular,
    fontSize: typeScale.fontSize.sm,
    lineHeight: typeScale.lineHeight.sm,
  },
  editButton: {
    width: widthPercent(0.12),
    height: widthPercent(0.12),
    borderRadius: radii.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  editIcon: {
    width: widthPercent(0.06),
    height: widthPercent(0.06),
  },
  // Stats Row
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "rgba(0,0,0,0.1)",
  },
  statItem: {
    alignItems: "center",
    gap: spacing.xs / 2,
    flex: 1,
  },
  statValue: {
    fontFamily: fonts.bold,
    fontSize: typeScale.fontSize.xl,
    lineHeight: typeScale.lineHeight.xl,
  },
  statLabel: {
    fontFamily: fonts.medium,
    fontSize: typeScale.fontSize.xs,
    lineHeight: typeScale.lineHeight.xs,
  },
  statDivider: {
    width: StyleSheet.hairlineWidth,
    height: scale(30),
    marginHorizontal: spacing.sm,
  },
  // Section
  section: {
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  sectionTitle: {
    fontFamily: fonts.bold,
    fontSize: typeScale.fontSize.md,
    lineHeight: typeScale.lineHeight.md,
    marginBottom: spacing.sm,
    paddingLeft: spacing.xs,
  },
  sectionCard: {
    borderWidth: 1,
    borderRadius: radii.xl,
    overflow: "hidden",
  },
  // Setting Item
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    minHeight: scale(56),
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    flex: 1,
  },
  settingIconContainer: {
    width: widthPercent(0.1),
    height: widthPercent(0.1),
    borderRadius: radii.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  settingIcon: {
    width: widthPercent(0.06),
    height: widthPercent(0.06),
  },
  settingLabel: {
    fontFamily: fonts.medium,
    fontSize: typeScale.fontSize.md,
    lineHeight: typeScale.lineHeight.md,
    flex: 1,
  },
  settingRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  settingArrow: {
    width: widthPercent(0.04),
    height: widthPercent(0.04),
  },
  // Logout Button
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginHorizontal: spacing.md,
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderRadius: radii.xl,
    minHeight: scale(56),
  },
  logoutText: {
    fontFamily: fonts.semiBold,
    fontSize: typeScale.fontSize.md,
    lineHeight: typeScale.lineHeight.md,
    flex: 1,
  },
  // Footer
  footer: {
    alignItems: "center",
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
  footerText: {
    fontFamily: fonts.regular,
    fontSize: typeScale.fontSize.xs,
    lineHeight: typeScale.lineHeight.xs,
  },
});
