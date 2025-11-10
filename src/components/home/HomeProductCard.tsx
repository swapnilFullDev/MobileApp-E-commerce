import React, { useRef, useState } from "react";
import {
  Animated,
  GestureResponderEvent,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Images, { Icons } from "../../constants/images";
import { ProductItem } from "../../data/home";
import { PRODUCT_DETAILS } from "../../data/products";
import { ProductDetail } from "../../data/products";
import { useTheme } from "../../context";
import {
  heightPercent,
  moderateScale,
  scale,
  widthPercent,
} from "../../theme/metrics";
import { spacing } from "../../theme/spacing";
import { fonts } from "../../theme/fonts";
import { colors } from "../../theme/colors";
import { radii, typeScale } from "../../theme/scales";
import { AnimatedTouchableOpacity } from "../common";

type HomeProductCardProps = {
  product: ProductItem;
  onPress?: (product: ProductItem) => void;
};

export default function HomeProductCard({
  product,
  onPress,
}: HomeProductCardProps) {
  const { theme } = useTheme();
  const detail: ProductDetail | undefined = PRODUCT_DETAILS[product.id];
  const chips: string[] = [];
  const [isFavorite, setIsFavorite] = useState(false);
  const popAnim = useRef(new Animated.Value(0)).current;

  if (detail?.rentalAvailable !== false) {
    const rentPrice = detail?.rentalPricePerDay ?? 0;
    if (rentPrice > 0) {
      chips.push(`Rent ₹${rentPrice.toLocaleString("en-IN")}/day`);
    }
  }

  if ((detail?.buyAvailable ?? true) && product.price) {
    chips.push(`Buy ${product.price}`);
  }

  const handleFavoritePress = (event: GestureResponderEvent) => {
    event.stopPropagation();
    popAnim.setValue(0);
    setIsFavorite((prev) => !prev);
    Animated.spring(popAnim, {
      toValue: 1,
      friction: 4,
      tension: 120,
      useNativeDriver: true,
    }).start();
  };

  const heartScale = popAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.25, 1],
  });
  const heartRotate = popAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "6deg"],
  });

  return (
    <AnimatedTouchableOpacity
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
      <View style={styles.imageWrapper}>
        <Image source={Images[product.image]} style={styles.image} />
        <Pressable
          onPress={handleFavoritePress}
          style={[
            styles.favoriteButton,
            {
              backgroundColor:
                theme.name === "light"
                  ? "rgba(255,255,255,0.9)"
                  : theme.surface,
              borderColor:
                theme.name === "light" ? "rgba(15,23,42,0.15)" : theme.border,
            },
          ]}
          hitSlop={12}
        >
          <Animated.Image
            source={isFavorite ? Icons.loveFilled : Icons.love}
            style={[
              styles.favoriteIcon,
              {
                tintColor: isFavorite ? "#FF4D67" : theme.muted,
                transform: [{ scale: heartScale }, { rotate: heartRotate }],
              },
            ]}
          />
        </Pressable>
      </View>
      <View style={styles.footer}>
        <Text style={[styles.title, { color: "#3F3D3D" }]} numberOfLines={2}>
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
        {detail ? (
          <Text style={[styles.availability, { color: theme.secondaryText }]}>
            {getAvailabilityLabel(detail)}
          </Text>
        ) : null}
        {chips.length ? (
          <View style={styles.chipRow}>
            {chips.map((label) => (
              <Text
                key={label}
                style={[
                  styles.chip,
                  {
                    backgroundColor: `${theme.primary}0D`,
                    color: theme.primary,
                  },
                ]}
              >
                {label}
              </Text>
            ))}
          </View>
        ) : null}
      </View>
    </AnimatedTouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: widthPercent(0.59),
    borderRadius: radii.xl,
    borderWidth: 1,
    overflow: "hidden",
  },
  imageWrapper: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: heightPercent(0.26),
    resizeMode: "cover",
  },
  favoriteButton: {
    position: "absolute",
    top: spacing.sm,
    right: spacing.sm,
    width: widthPercent(0.08),
    height: widthPercent(0.08),
    borderRadius: widthPercent(0.08),
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "rgba(15,23,42,0.3)",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 4,
  },
  favoriteIcon: {
    width: widthPercent(0.05),
    height: widthPercent(0.05),
    resizeMode: "contain",
  },
  footer: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.xs,
  },
  title: {
    fontFamily: typeScale.fontFamily.regular,
    fontSize: typeScale.fontSize.sm,
    color: colors.textPrimary,
  },
  price: {
    fontFamily: typeScale.fontFamily.semiBold,
    fontSize: typeScale.fontSize.sm,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  originalPrice: {
    fontFamily: typeScale.fontFamily.regular,
    fontSize: typeScale.fontSize.sm,
    color: "#B3B0B0",
    textDecorationLine: "line-through",
  },
  discount: {
    fontFamily: fonts.bold,
    fontSize: typeScale.fontSize.sm,
    color: "#B91C1C",
  },
  availability: {
    fontFamily: typeScale.fontFamily.medium,
    fontSize: typeScale.fontSize.xs,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs,
  },
  chip: {
    fontFamily: typeScale.fontFamily.medium,
    fontSize: typeScale.fontSize.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radii.round,
  },
});

function getAvailabilityLabel(detail: ProductDetail) {
  const rentAvailable =
    detail.rentalAvailable !== false &&
    (detail.rentalDurationOptions?.length ?? 0) > 0 &&
    (detail.rentalPricePerDay ?? 0) > 0;
  const buyAvailable = detail.buyAvailable !== false && Boolean(detail.price);

  if (rentAvailable && buyAvailable) {
    return "Rent & Buy";
  }
  if (rentAvailable) {
    return "Rent Only";
  }
  if (buyAvailable) {
    return "Buy Only";
  }
  return "Currently Unavailable";
}
