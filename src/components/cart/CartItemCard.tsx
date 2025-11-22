import React from "react";
import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { cartStyles as styles } from "../../styles/cart/cartStyles";
import Images, { Icons } from "../../constants/images";
import { useTheme } from "../../context";
import { spacing } from "../../theme/spacing";
import { fonts } from "../../theme/fonts";
import { radii, typeScale } from "../../theme/scales";
import { widthPercent } from "../../theme/metrics";

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

type CartItemCardProps = {
  item: DisplayCartItem;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onRemove: (id: string) => void;
};

export default function CartItemCard({
  item,
  onIncrement,
  onDecrement,
  onRemove,
}: CartItemCardProps) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.itemCard,
        {
          borderColor: theme.border,
        },
      ]}
    >
      <View style={styles.itemBody}>
        <Image source={Images[item.image]} style={styles.itemImage} />
        <View style={styles.itemContent}>
          <View style={localStyles.headerRow}>
            <Text
              style={[
                styles.title,
                {
                  color: theme.text,
                  width: widthPercent(0.42),
                },
              ]}
              numberOfLines={2}
            >
              {item.title}
            </Text>
            <View
              style={[
                localStyles.modeBadge,
                {
                  backgroundColor:
                    item.mode === "rent"
                      ? `${theme.primary}15`
                      : `${theme.primary}20`,
                  borderColor:
                    item.mode === "rent" ? theme.primary : `${theme.primary}80`,
                },
              ]}
            >
              <Text
                style={[
                  localStyles.modeBadgeText,
                  {
                    color: item.mode === "rent" ? theme.primary : theme.primary,
                  },
                ]}
              >
                {item.mode === "rent" ? "RENT" : "BUY"}
              </Text>
            </View>
            <TouchableOpacity onPress={() => onRemove(item.id)}>
              <Image source={Icons.trash} style={styles.trashIcon} />
            </TouchableOpacity>
          </View>

          {item.mode === "rent" && item.rentalDuration && (
            <View style={localStyles.rentalInfo}>
              <Text
                style={[localStyles.rentalText, { color: theme.secondaryText }]}
              >
                {item.rentalDuration}-day rental
                {item.securityDeposit
                  ? ` · Deposit: ₹${item.securityDeposit.toLocaleString(
                      "en-IN"
                    )}`
                  : ""}
              </Text>
            </View>
          )}

          <View style={[styles.metaRow, { justifyContent: "space-between" }]}>
            <View style={styles.metaPill}>
              <Text style={[styles.metaLabel, { color: theme.secondaryText }]}>
                Size
              </Text>
              <Text style={[styles.metaValue, { color: theme.text }]}>
                {item.size}
              </Text>
            </View>
            <View style={styles.qtyControls}>
              <TouchableOpacity
                style={[styles.qtyButton, styles.qtyButtonMinus]}
                onPress={() => onDecrement(item.id)}
              >
                {/* <Text style={styles.qtyButtonMinusText}>−</Text>\ */}
                <Image source={Icons.minus} style={styles.qtyButtonMinusIcon} />
              </TouchableOpacity>
              <Text style={[styles.qtyValue, { color: theme.text }]}>
                {item.qty}
              </Text>
              <TouchableOpacity
                style={[styles.qtyButton, styles.qtyButtonPlus]}
                onPress={() => onIncrement(item.id)}
              >
                {/* <Text style={styles.qtyButtonPlusText}>＋</Text> */}
                <Image source={Icons.plus} style={styles.qtyButtonPlusIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.priceRow}>
            <Text style={[styles.price, { color: theme.text }]}>
              ₹{item.price.toLocaleString("en-IN")}
            </Text>
            <Text style={styles.originalPrice}>
              ₹{item.originalPrice.toLocaleString("en-IN")}
            </Text>
            <Text style={[styles.discount, { color: "#E11D48" }]}>
              {item.discountPercent}% OFF
            </Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={[styles.returnText, { color: theme.secondaryText }]}>
              {item.mode === "rent"
                ? item.pricePerDay
                  ? `₹${item.pricePerDay.toLocaleString("en-IN")}/day`
                  : "Rental item"
                : item.discountPercent > 0
                ? `${item.discountPercent}% savings applied`
                : "Purchase item"}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const localStyles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: spacing.sm,
    marginBottom: spacing.xs / 2,
  },
  modeBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: radii.sm,
    borderWidth: 1,
    alignSelf: "flex-start",
  },
  modeBadgeText: {
    fontFamily: fonts.bold,
    fontSize: typeScale.fontSize.xs,
    letterSpacing: 0.5,
  },
  rentalInfo: {
    marginBottom: spacing.xs / 2,
  },
  rentalText: {
    fontFamily: fonts.medium,
    fontSize: typeScale.fontSize.xs,
  },
});
