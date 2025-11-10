import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../context";
import { spacing } from "../theme/spacing";
import { radii, typeScale } from "../theme/scales";

export default function CartScreen() {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View
        style={[styles.cartBadge, { backgroundColor: theme.primary + "1A" }]}
      >
        <Text style={[styles.cartBadgeText, { color: theme.primary }]}>9</Text>
      </View>
      <Text style={[styles.title, { color: theme.text }]}>Your Cart</Text>
      <Text style={[styles.subtitle, { color: theme.muted }]}>
        Items in your cart will appear here.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.lg,
    gap: spacing.sm,
  },
  cartBadge: {
    minWidth: 48,
    minHeight: 48,
    borderRadius: radii.round,
    alignItems: "center",
    justifyContent: "center",
  },
  cartBadgeText: {
    fontFamily: typeScale.fontFamily.semibold,
    fontSize: typeScale.fontSize.md,
  },
  title: {
    fontFamily: typeScale.fontFamily.semibold,
    fontSize: typeScale.fontSize.xxl,
  },
  subtitle: {
    fontFamily: typeScale.fontFamily.regular,
    fontSize: typeScale.fontSize.md,
    textAlign: "center",
  },
});
