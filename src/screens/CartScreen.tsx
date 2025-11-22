import React, { useCallback, useMemo, useState } from "react";
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AuthStackNavigationProp } from "../navigation";
import { ROUTES } from "../constants";
import { CART_SUMMARY } from "../data/cart";
import { cartStyles as styles } from "../styles/cart/cartStyles";
import CartItemCard from "../components/cart/CartItemCard";
import Button from "../components/common/Button";
import { ScreenHeader } from "../components/common";
import {
  ShippingAddressSection,
  SavedAddressModal,
  NewAddressModal,
} from "../components/checkout";
import {
  getCartItems,
  CartItem as StorageCartItem,
} from "../services/storage/cartStorage";
import { useAppDispatch } from "../redux/hooks";
import {
  loadCart,
  removeItemFromCart,
  updateCartQuantity,
} from "../redux/thunks/cartThunks";
import {
  getAddresses,
  getDefaultAddress,
  SavedAddress,
} from "../services/storage/addressStorage";
import { PRODUCT_DETAILS } from "../data/products";
import Images from "../constants/images";
import { spacing } from "../theme/spacing";
import { fonts } from "../theme/fonts";
import { typeScale } from "../theme/scales";

// Map storage cart item to display cart item
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

export default function CartScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<AuthStackNavigationProp>();
  const dispatch = useAppDispatch();
  const [cartItems, setCartItems] = useState<DisplayCartItem[]>([]);

  // Address state
  const [selectedAddress, setSelectedAddress] = useState<SavedAddress | null>(
    null
  );
  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>([]);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showNewAddressModal, setShowNewAddressModal] = useState(false);

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

  const loadCartItems = async () => {
    try {
      const stored = await getCartItems();
      const mapped: DisplayCartItem[] = stored.map((item) => {
        const product = PRODUCT_DETAILS[item.productId];
        const imageKey =
          (product?.image as keyof typeof Images) || "placeholder1";
        return {
          id: item.id,
          brand: item.brand,
          title: item.title,
          size: item.selectedSize || "Free",
          qty: item.qty,
          price: item.price,
          originalPrice: item.originalPrice || item.price,
          discountPercent:
            item.discountPercent ||
            (item.originalPrice
              ? Math.round(
                  ((item.originalPrice - item.price) / item.originalPrice) * 100
                )
              : 0),
          image: imageKey,
          mode: item.mode,
          rentalDuration: item.rentalDuration,
          pricePerDay: item.pricePerDay,
          securityDeposit: item.securityDeposit,
        };
      });
      setCartItems(mapped);
    } catch (error) {
      console.error("Error loading cart items:", error);
    }
  };

  const loadAddresses = async () => {
    try {
      const addresses = await getAddresses();
      setSavedAddresses(addresses);
      const defaultAddr = await getDefaultAddress();
      setSelectedAddress(defaultAddr);
    } catch (error) {
      console.error("Error loading addresses:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadCartItems();
      loadAddresses();
      // Sync with Redux
      dispatch(loadCart());
    }, [dispatch])
  );

  const handleSelectAddress = (address: SavedAddress) => {
    setSelectedAddress(address);
    setShowAddressModal(false);
  };

  const handleIncrement = async (id: string) => {
    const item = cartItems.find((i) => i.id === id);
    if (!item) return;

    try {
      await dispatch(
        updateCartQuantity({ itemId: id, qty: item.qty + 1 })
      ).unwrap();
      await loadCartItems();
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleDecrement = async (id: string) => {
    const item = cartItems.find((i) => i.id === id);
    if (!item || item.qty <= 1) return;

    try {
      await dispatch(
        updateCartQuantity({ itemId: id, qty: item.qty - 1 })
      ).unwrap();
      await loadCartItems();
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleRemove = async (id: string) => {
    try {
      await dispatch(removeItemFromCart(id)).unwrap();
      await loadCartItems();
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={theme.name === "light" ? "dark-content" : "light-content"}
      />
      <ScreenHeader title="My Cart" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Shipping Address Section */}
        <ShippingAddressSection
          selectedAddress={selectedAddress}
          onChangePress={() => setShowAddressModal(true)}
          onAddPress={() => setShowNewAddressModal(true)}
        />

        {cartItems.length !== 0 && (
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
              Item(s) not deliverable to{" "}
              {selectedAddress?.postalCode || "selected address"}.
            </Text>
            <TouchableOpacity>
              <Text style={[styles.changeButton, { color: theme.primary }]}>
                View
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {cartItems.length !== 0 && (
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
        )}

        {/* Group items by mode */}
        {(() => {
          const rentItems = cartItems.filter((item) => item.mode === "rent");
          const buyItems = cartItems.filter((item) => item.mode === "buy");

          return (
            <>
              {rentItems.length > 0 && (
                <View style={{ marginTop: spacing.md }}>
                  <Text
                    style={[
                      {
                        fontFamily: fonts.semiBold,
                        fontSize: typeScale.fontSize.md,
                        color: theme.text,
                        marginHorizontal: spacing.md,
                        marginBottom: spacing.sm,
                      },
                    ]}
                  >
                    Rental Items ({rentItems.length})
                  </Text>
                  {rentItems.map((item) => (
                    <CartItemCard
                      key={item.id}
                      item={item}
                      onIncrement={handleIncrement}
                      onDecrement={handleDecrement}
                      onRemove={handleRemove}
                    />
                  ))}
                </View>
              )}

              {buyItems.length > 0 && (
                <View
                  style={{
                    marginTop: rentItems.length > 0 ? spacing.lg : spacing.md,
                  }}
                >
                  <Text
                    style={[
                      {
                        fontFamily: fonts.semiBold,
                        fontSize: typeScale.fontSize.md,
                        color: theme.text,
                        marginHorizontal: spacing.md,
                        marginBottom: spacing.sm,
                      },
                    ]}
                  >
                    Purchase Items ({buyItems.length})
                  </Text>
                  {buyItems.map((item) => (
                    <CartItemCard
                      key={item.id}
                      item={item}
                      onIncrement={handleIncrement}
                      onDecrement={handleDecrement}
                      onRemove={handleRemove}
                    />
                  ))}
                </View>
              )}

              {cartItems.length === 0 && (
                <View
                  style={{
                    marginHorizontal: spacing.md,
                    marginTop: spacing.xl,
                    alignItems: "center",
                    paddingVertical: spacing.xxxl,
                  }}
                >
                  <Text
                    style={[
                      {
                        fontFamily: fonts.semiBold,
                        fontSize: typeScale.fontSize.lg,
                        color: theme.secondaryText,
                      },
                    ]}
                  >
                    Your cart is empty
                  </Text>
                  <Text
                    style={[
                      {
                        fontFamily: fonts.regular,
                        fontSize: typeScale.fontSize.sm,
                        color: theme.muted,
                        marginTop: spacing.xs,
                      },
                    ]}
                  >
                    Add items to get started
                  </Text>
                </View>
              )}
            </>
          );
        })()}

        {cartItems.length !== 0 && (
          <View
            style={[
              styles.priceCard,
              { borderColor: theme.border, backgroundColor: theme.surface },
            ]}
          >
            <Text style={[styles.couponBadge, { color: theme.text }]}>
              Price Details ({totalSelected} item
              {totalSelected === 1 ? "" : "s"})
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
        )}
      </ScrollView>

      {cartItems.length !== 0 && (
        <View
          style={[
            styles.actionBar,
            { borderTopColor: theme.border, backgroundColor: theme.surface },
          ]}
        >
          <Button
            title={`Place Order · ₹${totals.totalAmount.toLocaleString(
              "en-IN"
            )}`}
            onPress={() => {
              if (cartItems.length === 0) {
                return;
              }
              navigation.navigate(ROUTES.CHECKOUT);
            }}
            fullWidth
          />
        </View>
      )}

      {/* Saved Addresses Modal */}
      <SavedAddressModal
        visible={showAddressModal}
        addresses={savedAddresses}
        selectedAddress={selectedAddress}
        onClose={() => setShowAddressModal(false)}
        onSelectAddress={handleSelectAddress}
        onAddNew={() => {
          setShowAddressModal(false);
          setShowNewAddressModal(true);
        }}
      />

      {/* New Address Modal */}
      <NewAddressModal
        visible={showNewAddressModal}
        onClose={() => setShowNewAddressModal(false)}
        onSave={loadAddresses}
      />
    </View>
  );
}
