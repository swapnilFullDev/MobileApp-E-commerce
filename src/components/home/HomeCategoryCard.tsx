import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Images from '../../constants/images';
import { CategoryItem } from '../../constants/home';
import { useTheme } from '../../context';
import { moderateScale, scale } from '../../theme/metrics';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { radius } from '../../theme/radius';
import { fonts } from '../../theme/fonts';

type HomeCategoryCardProps = {
  category: CategoryItem;
  onPress?: (category: CategoryItem) => void;
};

export default function HomeCategoryCard({
  category,
  onPress,
}: HomeCategoryCardProps) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: theme.surface,
          borderColor: theme.border,
        },
      ]}
      onPress={() => onPress?.(category)}
      activeOpacity={0.9}
    >
      <Image source={Images[category.image]} style={styles.image} />
      <Text style={styles.label}>{category.label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: scale(120),
    borderRadius: radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: scale(100),
    resizeMode: 'cover',
  },
  label: {
    fontFamily: fonts.semiBold,
    fontSize: moderateScale(14),
    textAlign: 'center',
    paddingVertical: spacing.sm,
  },
});
