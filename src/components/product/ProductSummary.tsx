import React from "react";
import { Text, View } from "react-native";
import { Theme } from "../../context/ThemeContext";
import { productDetailStyles as styles } from "../../styles/product/productDetailStyles";
import { ProductDetail } from "../../data/products";

type ProductSummaryProps = {
  product: ProductDetail;
  theme: Theme;
};

export default function ProductSummary({
  product,
  theme,
}: ProductSummaryProps) {
  return (
    <View style={styles.section}>
      <Text style={[styles.title, { color: theme.text }]}>{product.title}</Text>
      <Text style={[styles.rentalTagline, { color: theme.secondaryText }]}>
        Premium outfit rentals tailored for your celebrations
      </Text>
      <View style={styles.ratingRow}>
        <Text style={[styles.ratingValue, { color: theme.primary }]}>
          {product.rating.toFixed(1)}
        </Text>
        <Text style={[styles.ratingStars, { color: theme.primary }]}>
          {generateRatingStars(product.rating)}
        </Text>
        <Text style={[styles.reviewsText, { color: theme.secondaryText }]}>
          ({product.reviewsCount} reviews)
        </Text>
      </View>
    </View>
  );
}

function generateRatingStars(rating: number) {
  const rounded = Math.round(rating);
  return Array.from({ length: 5 })
    .map((_, index) => (index < rounded ? "*" : "-"))
    .join(" ");
}
