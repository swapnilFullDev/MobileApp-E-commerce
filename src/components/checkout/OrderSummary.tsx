import React from "react";
import { Image, Text, View } from "react-native";
import { useTheme } from "../../context";
import { checkoutStyles as styles } from "../../styles/checkout/checkoutStyles";
import Images from "../../constants/images";
import { spacing } from "../../theme/spacing";

type DisplayCartItem = {
  id: string;
  brand: string;
  title: string;
  size: string;
  qty: number;
  price: number;
  originalPrice: number;
  discountPercent: number;
  image: keyof typeof Images;
  mode: "rent" | "buy";
  rentalDuration?: number;
  pricePerDay?: number;
  securityDeposit?: number;
};

type OrderSummaryProps = {
  rentItems: DisplayCartItem[];
  buyItems: DisplayCartItem[];
};

export default function OrderSummary({
  rentItems,
  buyItems,
}: OrderSummaryProps) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.sectionCard,
        { backgroundColor: theme.surface, borderColor: theme.border },
      ]}
    >
      <Text style={[styles.sectionTitle, { color: theme.text }]}>
        Order Summary
      </Text>

      {rentItems.length > 0 && (
        <View style={styles.itemsGroup}>
          <Text
            style={[
              styles.groupTitle,
              { color: theme.secondaryText, marginBottom: spacing.sm },
            ]}
          >
            Rental Items ({rentItems.length})
          </Text>
          {rentItems.map((item) => (
            <View key={item.id} style={styles.orderItem}>
              <Image
                source={Images[item.image]}
                style={styles.orderItemImage}
              />
              <View style={styles.orderItemContent}>
                <Text
                  style={[styles.orderItemTitle, { color: theme.text }]}
                  numberOfLines={2}
                >
                  {item.title}
                </Text>
                <Text
                  style={[styles.orderItemMeta, { color: theme.secondaryText }]}
                >
                  {item.size} · Qty: {item.qty}
                  {item.rentalDuration ? ` · ${item.rentalDuration} days` : ""}
                </Text>
                <Text style={[styles.orderItemPrice, { color: theme.text }]}>
                  ₹{item.price.toLocaleString("en-IN")}
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {buyItems.length > 0 && (
        <View style={styles.itemsGroup}>
          <Text
            style={[
              styles.groupTitle,
              { color: theme.secondaryText, marginBottom: spacing.sm },
            ]}
          >
            Purchase Items ({buyItems.length})
          </Text>
          {buyItems.map((item) => (
            <View key={item.id} style={styles.orderItem}>
              <Image
                source={Images[item.image]}
                style={styles.orderItemImage}
              />
              <View style={styles.orderItemContent}>
                <Text
                  style={[styles.orderItemTitle, { color: theme.text }]}
                  numberOfLines={2}
                >
                  {item.title}
                </Text>
                <Text
                  style={[styles.orderItemMeta, { color: theme.secondaryText }]}
                >
                  {item.size} · Qty: {item.qty}
                </Text>
                <Text style={[styles.orderItemPrice, { color: theme.text }]}>
                  ₹{item.price.toLocaleString("en-IN")}
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
