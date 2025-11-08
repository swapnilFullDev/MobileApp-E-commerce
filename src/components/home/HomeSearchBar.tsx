import React from 'react';
import { Image, StyleSheet, TextInput, View } from 'react-native';
import Images from '../../constants/images';
import { useTheme } from '../../context';
import { scale } from '../../theme/metrics';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { radius } from '../../theme/radius';

type HomeSearchBarProps = {
  value: string;
  placeholder?: string;
  onChangeText: (value: string) => void;
  onSubmitEditing?: () => void;
};

export default function HomeSearchBar({
  value,
  placeholder = 'Search for Attire...',
  onChangeText,
  onSubmitEditing,
}: HomeSearchBarProps) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.surface,
          borderColor: theme.border,
        },
      ]}
    >
      <Image
        source={Images.search}
        style={[styles.icon, { tintColor: theme.muted }]}
      />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.muted}
        style={[styles.input, { color: theme.text }]}
        returnKeyType="search"
        onSubmitEditing={onSubmitEditing}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.md,
    borderWidth: 1,
    borderRadius: radius.xl,
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  icon: {
    width: scale(18),
    height: scale(18),
  },
  input: {
    flex: 1,
    ...typography.body,
  },
});
