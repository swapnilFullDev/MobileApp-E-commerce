import React, { useMemo, useState } from "react";
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../context";
import { CART_ADDRESS, CART_ITEMS, CART_SUMMARY } from "../data/cart";
import { cartStyles as styles } from "../styles/cart/cartStyles";
import CartItemCard from "../components/cart/CartItemCard";
import Button from "../components/common/Button";

export default function CartScreen() {
  const { theme } = useTheme();
  const [cartItems, setCartItems] = useState(CART_ITEMS);

  const totals = useMemo(() => {
    const totalMrp = cartItems.reduce(
      (sum, item) => sum + item.originalPrice * item.qty,
      0
    );
    const totalSelling = cartItems.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );
    const discount = totalMrp - totalSelling;
    const platformFee = CART_SUMMARY.platformFee;
    const totalAmount = totalSelling + platformFee;
    return { totalMrp, discount, platformFee, totalAmount };
  }, [cartItems]);

  const totalSelected = cartItems.length;

  const handleIncrement = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const handleDecrement = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
      )
    );
  };

  const handleRemove = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={theme.name === "light" ? "dark-content" : "light-content"}
      />
      <View style={styles.headerRow}>
        <View style={{ flex: 1, alignItems: "flex-start" }}>
          <TouchableOpacity
            style={[
              styles.heroIconButton,
              {
                borderColor: theme.border,
                backgroundColor: `${theme.surface}CC`,
              },
            ]}
          >
            <Text style={{ color: theme.text, fontSize: 16 }}>←</Text>
          </TouchableOpacity>
        </View>
        <Text style={[styles.headerTitle, { color: theme.text }]}>My Cart</Text>
        <View style={{ flex: 1 }} />
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.addressCard,
            { borderColor: theme.border, backgroundColor: theme.surface },
          ]}
        >
          <View style={styles.addressRow}>
            <Text style={[styles.addressLabel, { color: theme.secondaryText }]}>
              Deliver to:
            </Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={[styles.changeButton, { color: theme.primary }]}>
                Change
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={[styles.addressValue, { color: theme.text }]}>
            {CART_ADDRESS.name}, {CART_ADDRESS.pincode}
          </Text>
          <Text style={[styles.addressLine, { color: theme.secondaryText }]}>
            {CART_ADDRESS.addressLine}
          </Text>
        </View>

        <View
          style={[
            styles.alertCard,
            { borderColor: "#F87171", backgroundColor: "#FEF2F2" },
          ]}
        >
          <View style={[styles.alertIcon, { backgroundColor: "#FEE2E2" }]}>
            <Text style={{ color: "#DC2626", fontWeight: "bold" }}>!</Text>
          </View>
          <Text style={[styles.alertText, { color: "#DC2626" }]}>
            Item(s) not deliverable to {CART_ADDRESS.pincode}.
          </Text>
          <TouchableOpacity>
            <Text style={[styles.changeButton, { color: theme.primary }]}>
              View
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={[
            styles.summaryRow,
            { borderColor: theme.border, backgroundColor: theme.surface },
          ]}
        >
          <Text style={[styles.summaryText, { color: theme.secondaryText }]}>
            {totalSelected} item(s) selected
          </Text>
          <Text style={[styles.summaryTag, { color: "#E11D48" }]}>
            ₹{totals.totalAmount.toLocaleString("en-IN")}
          </Text>
        </View>

        {cartItems.map((item) => (
          <CartItemCard
            key={item.id}
            item={item}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onRemove={handleRemove}
          />
        ))}

        <View
          style={[
            styles.priceCard,
            { borderColor: theme.border, backgroundColor: theme.surface },
          ]}
        >
          <Text style={[styles.couponBadge, { color: theme.text }]}>
            Price Details ({totalSelected} item{totalSelected === 1 ? "" : "s"})
          </Text>
          <View style={styles.priceRowItem}>
            <Text style={[styles.priceLabel, { color: theme.secondaryText }]}>
              Total MRP
            </Text>
            <Text style={[styles.priceValue, { color: theme.text }]}>
              ₹{totals.totalMrp.toLocaleString("en-IN")}
            </Text>
          </View>
          <View style={styles.priceRowItem}>
            <Text style={[styles.priceLabel, { color: theme.secondaryText }]}>
              Discount on MRP
            </Text>
            <Text style={[styles.priceValue, { color: "#16A34A" }]}>
              -₹{totals.discount.toLocaleString("en-IN")}
            </Text>
          </View>
          <View style={styles.priceRowItem}>
            <Text style={[styles.priceLabel, { color: theme.secondaryText }]}>
              Platform Fee
            </Text>
            <Text style={[styles.priceValue, { color: theme.text }]}>
              ₹{totals.platformFee.toLocaleString("en-IN")}
            </Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={[styles.totalLabel, { color: theme.text }]}>
              Total Amount
            </Text>
            <Text style={[styles.totalValue, { color: theme.text }]}>
              ₹{totals.totalAmount.toLocaleString("en-IN")}
            </Text>
          </View>
        </View>
      </ScrollView>
      <View
        style={[
          styles.actionBar,
          { borderTopColor: theme.border, backgroundColor: theme.surface },
        ]}
      >
        <Button
          title={`Place Order · ₹${totals.totalAmount.toLocaleString("en-IN")}`}
          onPress={() => {}}
          fullWidth
        />
      </View>
    </View>
  );
}
