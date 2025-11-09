import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../context';
import { spacing } from '../theme/spacing';
import { fonts } from '../theme/fonts';

export default function ProfileScreen() {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Profile</Text>
      <Text style={[styles.subtitle, { color: theme.muted }]}>
        Sign in to manage your profile and orders.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    gap: spacing.sm,
  },
  title: {
    fontFamily: fonts.semiBold,
    fontSize: 24,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 16,
    textAlign: 'center',
  },
});

