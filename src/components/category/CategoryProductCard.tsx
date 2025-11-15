import React, { useMemo, useRef, useState } from "react";
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Images, { Icons } from "../../constants/images";
import { CategoryListingProduct } from "../../data/categories";
import { useTheme } from "../../context";
import { AnimatedTouchableOpacity } from "../common";
import { spacing } from "../../theme/spacing";
import { radii, typeScale } from "../../theme/scales";
import { widthPercent } from "../../theme/metrics";

type CategoryProductCardProps = {
  product: CategoryListingProduct;
  onPress?: (product: CategoryListingProduct) => void;
  favorite?: boolean;
};

export default function CategoryProductCard({
  product,
  onPress,
  favorite = false,
}: CategoryProductCardProps) {
  const { theme } = useTheme();
  const [isFavorite, setIsFavorite] = useState(false);
  const favoriteAnim = useRef(new Animated.Value(0)).current;

  const priceLabel = useMemo(
    () => `₹${product.price.toLocaleString("en-IN")}`,
    [product.price]
  );

  const originalPriceLabel = useMemo(() => {
    if (!product.originalPrice) {
      return undefined;
    }
    return `₹${product.originalPrice.toLocaleString("en-IN")}`;
  }, [product.originalPrice]);

  const discountLabel = useMemo(() => {
    if (!product.discountPercent) {
      return undefined;
    }
    return `-${product.discountPercent}%`;
  }, [product.discountPercent]);

  const ratingStars = useMemo(() => {
    const rounded = Math.round(product.rating);
    return "★".repeat(rounded).padEnd(5, "☆");
  }, [product.rating]);

  const ratingValue = useMemo(
    () => product.rating.toFixed(1),
    [product.rating]
  );

  const handleFavoriteToggle = () => {
    favoriteAnim.setValue(0);
    setIsFavorite((prev) => !prev);
    Animated.spring(favoriteAnim, {
      toValue: 1,
      friction: 4,
      tension: 120,
      useNativeDriver: true,
    }).start();
  };

  const favoriteScale = favoriteAnim.interpolate({
    inputRange: [0, 0.4, 1],
    outputRange: [1, 1.2, 1],
  });

  return (
    <AnimatedTouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: theme.surface,
          borderColor: `${theme.border}`,
          shadowColor:
            theme.name === "light" ? "rgba(15,23,42,0.08)" : "rgba(0,0,0,0.4)",
        },
      ]}
      onPress={() => onPress?.(product)}
    >
      <View style={styles.imageWrapper}>
        <Image source={Images[product.image]} style={styles.image} />
        {discountLabel ? (
          <View
            style={[styles.badge, { backgroundColor: `${theme.primary}1A` }]}
          >
            <Text style={[styles.badgeLabel, { color: theme.primary }]}>
              {discountLabel}
            </Text>
          </View>
        ) : null}
        <Pressable
          onPress={handleFavoriteToggle}
          hitSlop={12}
          style={[
            styles.favoriteButton,
            {
              backgroundColor:
                theme.name === "light"
                  ? "rgba(255,255,255,0.96)"
                  : `${theme.surface}F0`,
              borderColor:
                theme.name === "light" ? "rgba(15,23,42,0.08)" : theme.border,
            },
          ]}
        >
          <Animated.Image
            source={isFavorite || favorite ? Icons.loveFilled : Icons.love}
            style={[
              styles.favoriteIcon,
              { tintColor: isFavorite || favorite ? "#FF4D67" : theme.muted },
              { transform: [{ scale: favoriteScale }] },
            ]}
          />
        </Pressable>
      </View>

      <View style={styles.content}>
        <View style={styles.ratingRow}>
          <Text style={[styles.ratingStars, { color: "#F59E0B" }]}>
            {ratingStars}
          </Text>
          <Text style={[styles.ratingValue, { color: theme.text }]}>
            {ratingValue}
          </Text>
          <Text style={[styles.ratingCount, { color: theme.secondaryText }]}>
            ({product.reviews})
          </Text>
        </View>

        <Text style={[styles.brand, { color: theme.secondaryText }]}>
          {product.brand}
        </Text>
        <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>
          {product.title}
        </Text>

        <View style={styles.priceRow}>
          {originalPriceLabel ? (
            <Text style={[styles.originalPrice, { color: theme.muted }]}>
              {originalPriceLabel}
            </Text>
          ) : null}
          <Text style={[styles.price, { color: theme.text }]}>
            {priceLabel}
          </Text>
        </View>
      </View>
    </AnimatedTouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radii.xl,
    borderWidth: 1,
    overflow: "hidden",
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 16,
    shadowOpacity: 0.12,
  },
  imageWrapper: {
    position: "relative",
    width: "100%",
    aspectRatio: 0.78,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  badge: {
    position: "absolute",
    top: spacing.sm,
    left: spacing.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radii.md,
  },
  badgeLabel: {
    fontFamily: typeScale.fontFamily.semiBold,
    fontSize: typeScale.fontSize.xs,
    textTransform: "uppercase",
  },
  favoriteButton: {
    position: "absolute",
    top: spacing.sm,
    right: spacing.sm,
    width: widthPercent(0.085),
    height: widthPercent(0.085),
    borderRadius: widthPercent(0.085),
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "rgba(15,23,42,0.35)",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 12,
    elevation: 4,
  },
  favoriteIcon: {
    width: widthPercent(0.045),
    height: widthPercent(0.045),
    resizeMode: "contain",
  },
  content: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    gap: spacing.xs,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs * 0.75,
  },
  ratingStars: {
    fontFamily: typeScale.fontFamily.medium,
    fontSize: typeScale.fontSize.xs,
    letterSpacing: 1,
  },
  ratingValue: {
    fontFamily: typeScale.fontFamily.semiBold,
    fontSize: typeScale.fontSize.sm,
  },
  ratingCount: {
    fontFamily: typeScale.fontFamily.regular,
    fontSize: typeScale.fontSize.xs,
  },
  brand: {
    fontFamily: typeScale.fontFamily.medium,
    fontSize: typeScale.fontSize.xs,
    textTransform: "uppercase",
    letterSpacing: 0.7,
  },
  title: {
    fontFamily: typeScale.fontFamily.semiBold,
    fontSize: typeScale.fontSize.md,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  originalPrice: {
    fontFamily: typeScale.fontFamily.regular,
    fontSize: typeScale.fontSize.sm,
    textDecorationLine: "line-through",
  },
  price: {
    fontFamily: typeScale.fontFamily.semiBold,
    fontSize: typeScale.fontSize.md,
  },
});
