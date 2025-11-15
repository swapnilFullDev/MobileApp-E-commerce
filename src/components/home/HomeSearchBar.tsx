import React from "react";
import { Image, StyleSheet, TextInput, View } from "react-native";
import Images, { Icons } from "../../constants/images";
import { useTheme } from "../../context";
import { scale, widthPercent } from "../../theme/metrics";
import { spacing } from "../../theme/spacing";
import { radii, typeScale } from "../../theme/scales";
import { colors } from "../../theme/colors";

type HomeSearchBarProps = {
  value: string;
  placeholder?: string;
  onChangeText: (value: string) => void;
  onSubmitEditing?: () => void;
};

export default function HomeSearchBar({
  value,
  placeholder = "Search for Attire...",
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
        source={Icons.search}
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
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: spacing.md,
    borderWidth: 1,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  icon: {
    width: widthPercent(0.05),
    height: widthPercent(0.05),
  },
  input: {
    flex: 1,
    fontFamily: typeScale.fontFamily.medium,
    fontSize: typeScale.fontSize.md,
    color: colors.textSecondary,
  },
});
