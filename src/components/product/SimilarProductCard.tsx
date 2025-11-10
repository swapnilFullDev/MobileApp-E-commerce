import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import Images from "../../constants/images";
import { Theme } from "../../context/ThemeContext";
import { ProductDetail } from "../../data/products";
import { productDetailStyles as styles } from "../../styles/product/productDetailStyles";
import { spacing } from "../../theme/spacing";
import { AnimatedTouchableOpacity } from "../common";

export type ProductCardData = {
  id: string;
  title: string;
  image: keyof typeof Images;
  price?: string;
  originalPrice?: string;
  discountLabel?: string;
  rentalPricePerDay?: number;
  rentalDurationOptions?: number[];
  buyAvailable?: boolean;
  rentalAvailable?: boolean;
};

type SimilarProductCardProps = {
  item: ProductCardData;
  theme: Theme;
  onPress: () => void;
  showAvailabilityChip?: boolean;
  showPricingChips?: boolean;
};

export default function SimilarProductCard({
  item,
  theme,
  onPress,
  showAvailabilityChip = true,
  showPricingChips = true,
}: SimilarProductCardProps) {
  const availabilityLabel = getAvailabilityLabel(item);
  const availabilityColors = getAvailabilityColors(theme, availabilityLabel);

  const chips: string[] = [];
  if (
    showPricingChips &&
    item.rentalAvailable !== false &&
    (item.rentalDurationOptions?.length ?? 0) > 0 &&
    (item.rentalPricePerDay ?? 0) > 0
  ) {
    chips.push(
      `Rent ₹${(item.rentalPricePerDay ?? 0).toLocaleString("en-IN")}/day`
    );
  }
  if (showPricingChips && item.buyAvailable !== false && item.price) {
    chips.push(`Buy ${item.price}`);
  }

  return (
    <AnimatedTouchableOpacity
      onPress={onPress}
      style={[
        styles.similarCard,
        {
          backgroundColor: theme.surface,
          borderColor: theme.border,
          shadowColor:
            theme.name === "light"
              ? "rgba(15,23,42,0.15)"
              : "rgba(15,23,42,0.35)",
          shadowOffset: { width: 0, height: 14 },
          shadowOpacity: theme.name === "light" ? 0.12 : 0.25,
          shadowRadius: 24,
          elevation: 8,
        },
      ]}
    >
      <Image
        source={Images[item.image]}
        style={styles.similarImage}
        resizeMode="cover"
      />
      <View style={styles.similarInfo}>
        <View style={styles.tagRow}>
          <Text
            style={[styles.similarTitle, { color: theme.text }]}
            numberOfLines={2}
          >
            {item.title}
          </Text>
          {showAvailabilityChip ? (
            <Text
              style={[
                styles.tagBadge,
                {
                  backgroundColor: availabilityColors.background,
                  color: availabilityColors.color,
                },
              ]}
            >
              {availabilityLabel}
            </Text>
          ) : null}
        </View>
        <View style={styles.similarPriceRow}>
          {item.originalPrice ? (
            <Text style={styles.similarOriginalPrice}>
              {item.originalPrice}
            </Text>
          ) : null}
          {item.price ? (
            <Text style={[styles.similarPrice, { color: theme.text }]}>
              {item.price}
            </Text>
          ) : null}
          {item.discountLabel ? (
            <Text style={[styles.similarDiscount, { color: theme.primary }]}>
              {item.discountLabel}
            </Text>
          ) : null}
        </View>
        {chips.length ? (
          <View style={[styles.chipRow, { marginBottom: spacing.xs }]}>
            {chips.map((label) => (
              <Text
                key={label}
                style={[
                  styles.tagBadge,
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

export function mapProductDetailToCardData(
  item: ProductDetail
): ProductCardData {
  return {
    id: item.id,
    title: item.title,
    image: item.image,
    price: item.price,
    originalPrice: item.originalPrice,
    discountLabel: item.discountLabel,
    rentalPricePerDay: item.rentalPricePerDay,
    rentalDurationOptions: item.rentalDurationOptions,
    buyAvailable: item.buyAvailable,
    rentalAvailable: item.rentalAvailable,
  };
}

function getAvailabilityLabel(item: ProductCardData) {
  const rentAvailable =
    item.rentalAvailable !== false &&
    (item.rentalDurationOptions?.length ?? 0) > 0 &&
    (item.rentalPricePerDay ?? 0) > 0;
  const buyAvailable = item.buyAvailable !== false && Boolean(item.price);

  if (rentAvailable && buyAvailable) {
    return "Rent & Buy";
  }
  if (rentAvailable) {
    return "Rent Only";
  }
  if (buyAvailable) {
    return "Buy Only";
  }
  return "Not Available";
}

function getAvailabilityColors(
  theme: Theme,
  label: string
): { background: string; color: string } {
  switch (label) {
    case "Rent Only":
      return {
        background: "rgba(56, 189, 248, 0.16)",
        color: "#0284C7",
      };
    case "Buy Only":
      return {
        background: "rgba(16, 185, 129, 0.16)",
        color: "#0F9D58",
      };
    case "Rent & Buy":
      return {
        background: `${theme.primary}1A`,
        color: theme.primary,
      };
    default:
      return {
        background: "rgba(148, 163, 184, 0.16)",
        color: "#475569",
      };
  }
}
