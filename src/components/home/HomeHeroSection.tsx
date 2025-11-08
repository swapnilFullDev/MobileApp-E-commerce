import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../context';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { responsiveFont } from '../../theme/metrics';
import { fonts } from '../../theme/fonts';

type HomeHeroSectionProps = {
  title: string;
  subtitle: string;
  ctaLabel: string;
  onPressCta?: () => void;
};

export default function HomeHeroSection({
  title,
  subtitle,
  ctaLabel,
  onPressCta,
}: HomeHeroSectionProps) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          //  backgroundColor: theme.surface
        },
      ]}
    >
      <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
      <Text style={[styles.subtitle, { color: theme.muted }]}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: spacing.xs,
    // alignItems: 'center',
    // gap: spacing.md,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: responsiveFont(20),
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontFamily: fonts.medium,
    fontSize: responsiveFont(12),
    textAlign: 'center',
  },
  button: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: spacing.lg,
  },
  buttonLabel: {
    color: '#FFFFFF',
    ...typography.label,
  },
});
