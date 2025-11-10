import React from "react";
import { Text, View } from "react-native";
import { Theme } from "../../context/ThemeContext";
import { ProductDetail } from "../../data/products";
import { productDetailStyles as styles } from "../../styles/product/productDetailStyles";

type ProductPricingSectionProps = {
  product: ProductDetail;
  isRenting: boolean;
  buyAvailable: boolean;
  theme: Theme;
};

export default function ProductPricingSection({
  product,
  isRenting,
  buyAvailable,
  theme,
}: ProductPricingSectionProps) {
  return (
    <>
      <View style={styles.priceRow}>
        {isRenting ? (
          <>
            <View style={styles.priceGroup}>
              <Text style={[styles.price, { color: theme.text }]}>
                ₹{product.rentalPricePerDay.toLocaleString("en-IN")}
              </Text>
              <Text
                style={[styles.priceSuffix, { color: theme.secondaryText }]}
              >
                /day
              </Text>
            </View>
            <Text style={[styles.priceHelper, { color: theme.secondaryText }]}>
              Deposit ₹{product.securityDeposit.toLocaleString("en-IN")}
            </Text>
          </>
        ) : (
          <>
            <View style={styles.priceGroup}>
              <Text style={[styles.price, { color: theme.text }]}>
                {product.price}
              </Text>
              {product.discountLabel ? (
                <Text style={[styles.discount, { color: theme.primary }]}>
                  {product.discountLabel}
                </Text>
              ) : null}
            </View>
            {product.originalPrice ? (
              <Text
                style={[styles.priceHelper, { color: theme.secondaryText }]}
              >
                MRP {product.originalPrice}
              </Text>
            ) : null}
          </>
        )}
      </View>
      {!buyAvailable ? (
        <Text style={[styles.unavailableText, { color: theme.muted }]}>
          Purchase option currently unavailable for this outfit. Rent it instead
          and enjoy premium care.
        </Text>
      ) : null}
    </>
  );
}
