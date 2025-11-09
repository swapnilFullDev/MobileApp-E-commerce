import React from "react";
import { Pressable, Text, View } from "react-native";
import { Theme } from "../../context/ThemeContext";
import { ProductDetail } from "../../data/products";
import { productDetailStyles as styles } from "../../styles/product/productDetailStyles";

type RentalDetailsCardProps = {
  product: ProductDetail;
  selectedDuration: number;
  onSelectDuration: (duration: number) => void;
  theme: Theme;
  totalCost: number;
};

export default function RentalDetailsCard({
  product,
  selectedDuration,
  onSelectDuration,
  theme,
  totalCost,
}: RentalDetailsCardProps) {
  return (
    <View
      style={[
        styles.rentalCard,
        {
          backgroundColor: theme.surface,
          borderColor: theme.border,
        },
      ]}
    >
      <View style={styles.rentalPricingRow}>
        <View>
          <Text style={[styles.rentalPrice, { color: theme.text }]}>
            ₹{product.rentalPricePerDay.toLocaleString("en-IN")}/day
          </Text>
          <Text style={[styles.rentalHelper, { color: theme.secondaryText }]}>
            Ideal for {selectedDuration}-day bookings
          </Text>
        </View>
        <View style={styles.rentalSummary}>
          <Text style={[styles.rentalSummaryLabel, { color: theme.muted }]}>
            Estimated total
          </Text>
          <Text style={[styles.rentalSummaryValue, { color: theme.text }]}>
            ₹{totalCost.toLocaleString("en-IN")}
          </Text>
        </View>
      </View>

      <View style={styles.durationRow}>
        {product.rentalDurationOptions.map(days => {
          const isSelected = selectedDuration === days;
          return (
            <Pressable
              key={days}
              onPress={() => onSelectDuration(days)}
              style={[
                styles.durationChip,
                {
                  borderColor: isSelected ? theme.primary : theme.border,
                  backgroundColor: isSelected
                    ? `${theme.primary}20`
                    : theme.surface,
                },
              ]}
            >
              <Text
                style={[
                  styles.durationLabel,
                  { color: isSelected ? theme.primary : theme.text },
                ]}
              >
                {days}-day rental
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.rentalMetaRow}>
        <View
          style={[
            styles.metaColumn,
            {
              backgroundColor:
                theme.name === "light"
                  ? "#F3F4F6"
                  : "rgba(255,255,255,0.05)",
              borderColor: theme.border,
            },
          ]}
        >
          <Text style={[styles.metaLabel, { color: theme.muted }]}>
            Security deposit
          </Text>
          <Text style={[styles.metaValue, { color: theme.text }]}>
            ₹{product.securityDeposit.toLocaleString("en-IN")}
          </Text>
        </View>
        <View
          style={[
            styles.metaColumn,
            {
              backgroundColor:
                theme.name === "light"
                  ? "#F3F4F6"
                  : "rgba(255,255,255,0.05)",
              borderColor: theme.border,
            },
          ]}
        >
          <Text style={[styles.metaLabel, { color: theme.muted }]}>
            Purchase price
          </Text>
          <Text style={[styles.metaValue, { color: theme.text }]}>
            {product.price}
          </Text>
        </View>
        {product.discountLabel ? (
          <View
            style={[
              styles.metaColumn,
              {
                backgroundColor:
                  theme.name === "light"
                    ? "#F3F4F6"
                    : "rgba(255,255,255,0.05)",
                borderColor: theme.border,
              },
            ]}
          >
            <Text style={[styles.metaLabel, { color: theme.muted }]}>
              Savings
            </Text>
            <Text style={[styles.metaValue, { color: theme.primary }]}>
              {product.discountLabel}
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}

