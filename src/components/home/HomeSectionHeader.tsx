import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
  View,
} from 'react-native';
import { useTheme } from '../../context';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { fonts } from '../../theme/fonts';
import { responsiveFont, scale } from '../../theme/metrics';
import { radius } from '../../theme/radius';

type HomeSectionHeaderProps = {
  title: string;
  actionLabel?: string;
  onActionPress?: () => void;
  containerStyle?: ViewStyle;
};

export default function HomeSectionHeader({
  title,
  actionLabel,
  onActionPress,
  containerStyle,
}: HomeSectionHeaderProps) {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
      {actionLabel ? (
        <TouchableOpacity
          onPress={onActionPress}
          style={[styles.actionButton, { backgroundColor: theme.primary }]}
          activeOpacity={0.9}
        >
          <Text style={styles.actionLabel}>{actionLabel}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    // marginTop: spacing.lg,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: responsiveFont(20),
    textTransform: 'capitalize',
  },
  actionButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: scale(6),
    borderRadius: radius.md,
  },
  actionLabel: {
    color: '#FFFFFF',
    ...typography.label,
    textTransform: 'capitalize',
  },
});
