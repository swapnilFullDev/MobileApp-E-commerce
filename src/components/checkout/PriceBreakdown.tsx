import React from "react";
import { Text, View } from "react-native";
import { useTheme } from "../../context";
import { checkoutStyles as styles } from "../../styles/checkout/checkoutStyles";

type PriceBreakdownProps = {
  totalMrp: number;
  discount: number;
  platformFee: number;
  totalAmount: number;
};

export default function PriceBreakdown({
  totalMrp,
  discount,
  platformFee,
  totalAmount,
}: PriceBreakdownProps) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.sectionCard,
        { backgroundColor: theme.surface, borderColor: theme.border },
      ]}
    >
      <Text style={[styles.sectionTitle, { color: theme.text }]}>
        Price Details
      </Text>
      <View style={styles.priceRow}>
        <Text style={[styles.priceLabel, { color: theme.secondaryText }]}>
          Total MRP
        </Text>
        <Text style={[styles.priceValue, { color: theme.text }]}>
          ₹{totalMrp.toLocaleString("en-IN")}
        </Text>
      </View>
      <View style={styles.priceRow}>
        <Text style={[styles.priceLabel, { color: theme.secondaryText }]}>
          Discount
        </Text>
        <Text style={[styles.priceValue, { color: "#16A34A" }]}>
          -₹{discount.toLocaleString("en-IN")}
        </Text>
      </View>
      <View style={styles.priceRow}>
        <Text style={[styles.priceLabel, { color: theme.secondaryText }]}>
          Platform Fee
        </Text>
        <Text style={[styles.priceValue, { color: theme.text }]}>
          ₹{platformFee.toLocaleString("en-IN")}
        </Text>
      </View>
      <View style={[styles.priceRow, styles.totalRow]}>
        <Text style={[styles.totalLabel, { color: theme.text }]}>
          Total Amount
        </Text>
        <Text style={[styles.totalValue, { color: theme.text }]}>
          ₹{totalAmount.toLocaleString("en-IN")}
        </Text>
      </View>
    </View>
  );
}
