import React from "react";
import { Text, View } from "react-native";
import { Theme } from "../../context/ThemeContext";
import { ProductDetail } from "../../data/products";
import { productDetailStyles as styles } from "../../styles/product/productDetailStyles";

type PurchaseDetailsCardProps = {
  product: ProductDetail;
  theme: Theme;
};

export default function PurchaseDetailsCard({
  product,
  theme,
}: PurchaseDetailsCardProps) {
  return (
    <View
      style={[
        styles.purchaseCard,
        {
          backgroundColor: theme.surface,
          borderColor: theme.border,
        },
      ]}
    >
      <View style={styles.purchasePriceRow}>
        <Text style={[styles.purchasePrice, { color: theme.text }]}>
          {product.price}
        </Text>
        {product.discountLabel ? (
          <Text
            style={[
              styles.discountPill,
              {
                color: theme.primary,
                backgroundColor: `${theme.primary}1A`,
                borderColor: theme.primary,
              },
            ]}
          >
            {product.discountLabel}
          </Text>
        ) : null}
      </View>
      {product.originalPrice ? (
        <Text style={[styles.purchaseOriginal, { color: theme.muted }]}>
          MRP {product.originalPrice}
        </Text>
      ) : null}
      <Text style={[styles.purchaseInfo, { color: theme.secondaryText }]}>
        Own this outfit with complimentary fitting support and lifetime access
        to premium care services.
      </Text>
      <View
        style={[
          styles.purchaseMetaRow,
          {
            backgroundColor:
              theme.name === "light"
                ? "#F3F4F6"
                : "rgba(255,255,255,0.05)",
            borderColor: theme.border,
          },
        ]}
      >
        <Text style={[styles.purchaseMetaText, { color: theme.secondaryText }]}>
          Ready to ship · Free dry cleaning before dispatch · Easy alterations
          within 7 days
        </Text>
      </View>
    </View>
  );
}

