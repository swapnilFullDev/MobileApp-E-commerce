import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Images from '../../constants/images';
import { ProductItem } from '../../data/home';
import { useTheme } from '../../context';
import { moderateScale, scale } from '../../theme/metrics';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { radius } from '../../theme/radius';
import { fonts } from '../../theme/fonts';
import { colors } from '../../theme/colors';

type HomeProductCardProps = {
  product: ProductItem;
  onPress?: (product: ProductItem) => void;
};

export default function HomeProductCard({
  product,
  onPress,
}: HomeProductCardProps) {
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
      onPress={() => onPress?.(product)}
      activeOpacity={0.9}
    >
      <Image source={Images[product.image]} style={styles.image} />
      <View style={styles.footer}>
        <Text style={[styles.title, { color: '#3F3D3D' }]} numberOfLines={2}>
          {product.title}
        </Text>
        {product.price ? (
          <View style={styles.priceRow}>
            {product.originalPrice ? (
              <Text style={styles.originalPrice}>{product.originalPrice}</Text>
            ) : null}
            <Text style={styles.price}>{product.price}</Text>
            {product.discountLabel ? (
              <Text style={styles.discount}>{product.discountLabel}</Text>
            ) : null}
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: scale(220),
    borderRadius: radius.xl,
    borderWidth: 1,
    overflow: 'hidden',
    backgroundColor: '#FBF7F1',
  },
  image: {
    width: '100%',
    height: scale(200),
    resizeMode: 'cover',
  },
  footer: {
    paddingHorizontal: scale(10),
    paddingVertical: scale(5),
    gap: scale(5),
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontFamily: fonts.regular,
    fontSize: moderateScale(14),
    color: colors.textPrimary,
  },
  price: {
    fontFamily: fonts.semiBold,
    fontSize: moderateScale(14),
    color: '#2F2D2D',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  originalPrice: {
    fontFamily: fonts.regular,
    fontSize: moderateScale(14),
    color: '#B3B0B0',
    textDecorationLine: 'line-through',
  },
  discount: {
    fontFamily: fonts.bold,
    fontSize: moderateScale(14),
    color: '#B91C1C',
  },
});
