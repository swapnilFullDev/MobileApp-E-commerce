import React from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { useTheme } from "../../context";
import { Order } from "../../services/storage/orderStorage";
import { checkoutStyles as styles } from "../../styles/checkout/checkoutStyles";
import { orderStyles } from "../../styles/orders/orderStyles";
import Images from "../../constants/images";
import { spacing } from "../../theme/spacing";
import { fonts } from "../../theme/fonts";
import { typeScale } from "../../theme/scales";
import { widthPercent } from "../../theme/metrics";
import { radii } from "../../theme";

type OrderDetailModalProps = {
  visible: boolean;
  order: Order | null;
  onClose: () => void;
};

const statusColors: Record<Order["status"], string> = {
  pending: "#F59E0B",
  confirmed: "#3B82F6",
  processing: "#8B5CF6",
  shipped: "#10B981",
  delivered: "#059669",
  cancelled: "#DC2626",
};

const statusLabels: Record<Order["status"], string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export default function OrderDetailModal({
  visible,
  order,
  onClose,
}: OrderDetailModalProps) {
  const { theme } = useTheme();

  if (!order) return null;

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const statusColor = statusColors[order.status];
  const statusLabel = statusLabels[order.status];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <Pressable
          style={[styles.modalContent, { backgroundColor: theme.surface }]}
          onPress={(e) => e.stopPropagation()}
        >
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>
              Order Details
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={[styles.closeButtonText, { color: theme.text }]}>
                ✕
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.modalScrollView}
            showsVerticalScrollIndicator={false}
          >
            {/* Order Info */}
            <View
              style={[
                orderStyles.orderCard,
                {
                  backgroundColor: theme.background,
                  borderColor: theme.border,
                  marginHorizontal: 0,
                },
              ]}
            >
              <View style={orderStyles.orderHeader}>
                <View style={orderStyles.orderHeaderLeft}>
                  <Text
                    style={[orderStyles.orderNumber, { color: theme.text }]}
                  >
                    Order #{order.orderNumber}
                  </Text>
                  <Text
                    style={[
                      orderStyles.orderDate,
                      { color: theme.secondaryText },
                    ]}
                  >
                    Placed on {formatDate(order.createdAt)}
                  </Text>
                </View>
                <View
                  style={[
                    orderStyles.statusBadge,
                    { backgroundColor: `${statusColor}15` },
                  ]}
                >
                  <Text
                    style={[orderStyles.statusText, { color: statusColor }]}
                  >
                    {statusLabel}
                  </Text>
                </View>
              </View>
            </View>

            {/* Order Items */}
            <View
              style={[
                styles.sectionCard,
                {
                  backgroundColor: theme.background,
                  borderColor: theme.border,
                },
              ]}
            >
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                Order Items ({order.items.length})
              </Text>
              {order.items.map((item) => (
                <View key={item.id} style={styles.orderItem}>
                  <Image
                    source={
                      Images[item.image as keyof typeof Images] ||
                      Images.placeholder1
                    }
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
                      style={[
                        styles.orderItemMeta,
                        { color: theme.secondaryText },
                      ]}
                    >
                      {item.size} · Qty: {item.qty}
                      {item.mode === "rent" && item.rentalDuration
                        ? ` · ${item.rentalDuration} days rental`
                        : ""}
                    </Text>
                    <Text
                      style={[styles.orderItemPrice, { color: theme.text }]}
                    >
                      ₹{item.price.toLocaleString("en-IN")}
                    </Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Delivery Address */}
            <View
              style={[
                styles.sectionCard,
                {
                  backgroundColor: theme.background,
                  borderColor: theme.border,
                },
              ]}
            >
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                Delivery Address
              </Text>
              <Text style={[styles.addressName, { color: theme.text }]}>
                {order.address.name}
              </Text>
              <Text
                style={[styles.addressPhone, { color: theme.secondaryText }]}
              >
                {order.address.phone}
              </Text>
              <Text
                style={[styles.addressLine, { color: theme.secondaryText }]}
              >
                {[
                  order.address.area,
                  order.address.flat,
                  order.address.addressLine1,
                  order.address.addressLine2,
                  order.address.postalCode,
                ]
                  .filter(Boolean)
                  .join(", ")}
              </Text>
            </View>

            {/* Payment Info */}
            <View
              style={[
                styles.sectionCard,
                {
                  backgroundColor: theme.background,
                  borderColor: theme.border,
                },
              ]}
            >
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                Payment Information
              </Text>
              <View style={styles.priceRow}>
                <Text
                  style={[styles.priceLabel, { color: theme.secondaryText }]}
                >
                  Payment Method
                </Text>
                <Text style={[styles.priceValue, { color: theme.text }]}>
                  {order.paymentMethod}
                </Text>
              </View>
              {order.trackingNumber && (
                <View style={styles.priceRow}>
                  <Text
                    style={[styles.priceLabel, { color: theme.secondaryText }]}
                  >
                    Tracking Number
                  </Text>
                  <Text style={[styles.priceValue, { color: theme.text }]}>
                    {order.trackingNumber}
                  </Text>
                </View>
              )}
              {order.estimatedDelivery && (
                <View style={styles.priceRow}>
                  <Text
                    style={[styles.priceLabel, { color: theme.secondaryText }]}
                  >
                    Estimated Delivery
                  </Text>
                  <Text style={[styles.priceValue, { color: theme.text }]}>
                    {order.estimatedDelivery}
                  </Text>
                </View>
              )}
            </View>

            {/* Price Breakdown */}
            <View
              style={[
                styles.sectionCard,
                {
                  backgroundColor: theme.background,
                  borderColor: theme.border,
                },
              ]}
            >
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                Price Details
              </Text>
              <View style={styles.priceRow}>
                <Text
                  style={[styles.priceLabel, { color: theme.secondaryText }]}
                >
                  Total MRP
                </Text>
                <Text style={[styles.priceValue, { color: theme.text }]}>
                  ₹{order.totalMrp.toLocaleString("en-IN")}
                </Text>
              </View>
              <View style={styles.priceRow}>
                <Text
                  style={[styles.priceLabel, { color: theme.secondaryText }]}
                >
                  Discount
                </Text>
                <Text style={[styles.priceValue, { color: "#16A34A" }]}>
                  -₹{order.discount.toLocaleString("en-IN")}
                </Text>
              </View>
              <View style={styles.priceRow}>
                <Text
                  style={[styles.priceLabel, { color: theme.secondaryText }]}
                >
                  Platform Fee
                </Text>
                <Text style={[styles.priceValue, { color: theme.text }]}>
                  ₹{order.platformFee.toLocaleString("en-IN")}
                </Text>
              </View>
              <View style={[styles.priceRow, styles.totalRow]}>
                <Text style={[styles.totalLabel, { color: theme.text }]}>
                  Total Amount
                </Text>
                <Text style={[styles.totalValue, { color: theme.text }]}>
                  ₹{order.totalAmount.toLocaleString("en-IN")}
                </Text>
              </View>
            </View>

            {order.note && (
              <View
                style={[
                  styles.sectionCard,
                  {
                    backgroundColor: theme.background,
                    borderColor: theme.border,
                  },
                ]}
              >
                <Text style={[styles.sectionTitle, { color: theme.text }]}>
                  Note
                </Text>
                <Text
                  style={[styles.addressLine, { color: theme.secondaryText }]}
                >
                  {order.note}
                </Text>
              </View>
            )}
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
