import React, { useCallback, useMemo, useState } from "react";
import { ScrollView, StatusBar, Text, View } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useTheme, useToast } from "../context";
import { ScreenHeader } from "../components/common";
import Button from "../components/common/Button";
import TextInput from "../components/common/TextInput";
import {
  ShippingAddressSection,
  SavedAddressModal,
  NewAddressModal,
  OrderSummary,
  PaymentMethodSection,
  PriceBreakdown,
} from "../components/checkout";
import { checkoutStyles as styles } from "../styles/checkout/checkoutStyles";
import { getCartItems } from "../services/storage/cartStorage";
import { useAppDispatch } from "../redux/hooks";
import { clearCartThunk } from "../redux/thunks/cartThunks";
import {
  getAddresses,
  getDefaultAddress,
  SavedAddress,
} from "../services/storage/addressStorage";
import { saveOrder, Order, OrderItem } from "../services/storage/orderStorage";
import { PRODUCT_DETAILS } from "../data/products";
import Images from "../constants/images";
import { spacing } from "../theme/spacing";
import { typeScale } from "../theme/scales";
import { AuthStackNavigationProp } from "../navigation";
import { scale } from "../theme/metrics";

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

type PaymentMethod = "card" | "upi" | "cod" | "wallet";

export default function CheckoutScreen() {
  const navigation = useNavigation<AuthStackNavigationProp>();
  const { theme } = useTheme();
  const { showSuccess, showInfo } = useToast();
  const dispatch = useAppDispatch();
  const [cartItems, setCartItems] = useState<DisplayCartItem[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>("cod");
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState("");

  // Address state
  const [selectedAddress, setSelectedAddress] = useState<SavedAddress | null>(
    null
  );
  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>([]);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showNewAddressModal, setShowNewAddressModal] = useState(false);

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
    }, [])
  );

  const rentItems = useMemo(
    () => cartItems.filter((item) => item.mode === "rent"),
    [cartItems]
  );
  const buyItems = useMemo(
    () => cartItems.filter((item) => item.mode === "buy"),
    [cartItems]
  );

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
    const platformFee = 23;
    const totalAmount = totalSelling + platformFee;
    return { totalMrp, discount, platformFee, totalAmount };
  }, [cartItems]);

  const handleSelectAddress = (address: SavedAddress) => {
    setSelectedAddress(address);
    setShowAddressModal(false);
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      showInfo("Please select a delivery address", "Address Required");
      return;
    }

    setLoading(true);
    try {
      await new Promise<void>((resolve) => setTimeout(() => resolve(), 2000));

      // Get full cart items from storage to get productId
      const fullCartItems = await getCartItems();

      // Create order items from cart items
      const orderItems: OrderItem[] = cartItems.map((displayItem) => {
        const fullItem = fullCartItems.find((ci) => ci.id === displayItem.id);
        return {
          id: displayItem.id,
          productId: fullItem?.productId || displayItem.id,
          title: displayItem.title,
          brand: displayItem.brand,
          image: displayItem.image,
          size: displayItem.size,
          qty: displayItem.qty,
          price: displayItem.price,
          mode: displayItem.mode,
          rentalDuration: displayItem.rentalDuration,
          pricePerDay: displayItem.pricePerDay,
          securityDeposit: displayItem.securityDeposit,
        };
      });

      const orderNumber = `ORD${Math.floor(Math.random() * 100000)}`;
      const orderId = `order_${Date.now()}`;

      // Create order object
      const order: Order = {
        id: orderId,
        orderNumber,
        status: "pending",
        items: orderItems,
        address: selectedAddress,
        paymentMethod:
          selectedPayment === "cod"
            ? "Cash on Delivery"
            : selectedPayment === "upi"
            ? "UPI"
            : selectedPayment === "card"
            ? "Credit/Debit Card"
            : "Wallet",
        totalAmount: totals.totalAmount,
        totalMrp: totals.totalMrp,
        discount: totals.discount,
        platformFee: totals.platformFee,
        note: note.trim() || undefined,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      // Save order
      await saveOrder(order);

      // Clear cart
      await dispatch(clearCartThunk()).unwrap();

      showSuccess(
        `Order placed successfully! Order ID: #${orderNumber}`,
        "Order Confirmed"
      );
      navigation.navigate("MainTabs", { screen: "Home" });
    } catch (error) {
      console.error("Error placing order:", error);
      showInfo("Failed to place order. Please try again.", "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={theme.name === "light" ? "dark-content" : "light-content"}
      />
      <ScreenHeader title="Checkout" />
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

        {/* Note Section */}
        <View
          style={[
            styles.sectionCard,
            { backgroundColor: theme.surface, borderColor: theme.border },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Note (Optional)
          </Text>
          <TextInput
            value={note}
            onChangeText={setNote}
            placeholder="Write your note..."
            multiline
            numberOfLines={4}
            style={[styles.noteInput, { minHeight: scale(100) }]}
          />
        </View>

        {/* Order Summary Section */}
        <OrderSummary rentItems={rentItems} buyItems={buyItems} />

        {/* Payment Method Section */}
        <PaymentMethodSection
          selectedPayment={selectedPayment}
          onSelectPayment={setSelectedPayment}
        />

        {/* Price Breakdown */}
        <PriceBreakdown
          totalMrp={totals.totalMrp}
          discount={totals.discount}
          platformFee={totals.platformFee}
          totalAmount={totals.totalAmount}
        />
      </ScrollView>

      {/* Place Order Button */}
      <View
        style={[
          styles.actionBar,
          { backgroundColor: theme.surface, borderTopColor: theme.border },
        ]}
      >
        <View style={styles.actionBarContent}>
          <View>
            <Text
              style={[styles.actionBarLabel, { color: theme.secondaryText }]}
            >
              Total Amount
            </Text>
            <Text style={[styles.actionBarValue, { color: theme.text }]}>
              ₹{totals.totalAmount.toLocaleString("en-IN")}
            </Text>
          </View>
          <Button
            title="Place Order"
            onPress={handlePlaceOrder}
            loading={loading}
            fullWidth={false}
            style={styles.placeOrderButton}
          />
        </View>
      </View>

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
