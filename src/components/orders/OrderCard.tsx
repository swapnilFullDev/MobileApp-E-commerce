import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../context";
import { Order } from "../../services/storage/orderStorage";
import { orderStyles as styles } from "../../styles/orders/orderStyles";
import Images from "../../constants/images";
import { spacing } from "../../theme/spacing";
import { fonts } from "../../theme/fonts";
import { typeScale } from "../../theme/scales";

type OrderCardProps = {
  order: Order;
  onPress: () => void;
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

export default function OrderCard({ order, onPress }: OrderCardProps) {
  const { theme } = useTheme();

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const totalItems = order.items.reduce((sum, item) => sum + item.qty, 0);
  const statusColor = statusColors[order.status];
  const statusLabel = statusLabels[order.status];

  return (
    <TouchableOpacity
      style={[
        styles.orderCard,
        {
          backgroundColor: theme.surface,
          borderColor: theme.border,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Order Header */}
      <View style={styles.orderHeader}>
        <View style={styles.orderHeaderLeft}>
          <Text style={[styles.orderNumber, { color: theme.text }]}>
            Order #{order.orderNumber}
          </Text>
          <Text style={[styles.orderDate, { color: theme.secondaryText }]}>
            {formatDate(order.createdAt)}
          </Text>
        </View>
        <View
          style={[styles.statusBadge, { backgroundColor: `${statusColor}15` }]}
        >
          <Text style={[styles.statusText, { color: statusColor }]}>
            {statusLabel}
          </Text>
        </View>
      </View>

      {/* Order Items Preview */}
      <View style={styles.itemsPreview}>
        {order.items.slice(0, 3).map((item, index) => (
          <View key={item.id} style={styles.itemPreview}>
            <Image
              source={
                Images[item.image as keyof typeof Images] || Images.placeholder1
              }
              style={styles.itemPreviewImage}
            />
            {index < 2 && order.items.length > 3 && index === 1 && (
              <View style={styles.moreItemsOverlay}>
                <Text style={styles.moreItemsText}>
                  +{order.items.length - 2}
                </Text>
              </View>
            )}
          </View>
        ))}
        {order.items.length === 1 && (
          <View style={styles.itemInfo}>
            <Text
              style={[styles.itemTitle, { color: theme.text }]}
              numberOfLines={1}
            >
              {order.items[0].title}
            </Text>
            <Text style={[styles.itemMeta, { color: theme.secondaryText }]}>
              {order.items[0].size} · Qty: {order.items[0].qty}
            </Text>
          </View>
        )}
      </View>

      {/* Order Footer */}
      <View style={styles.orderFooter}>
        <View>
          <Text style={[styles.footerLabel, { color: theme.secondaryText }]}>
            {totalItems} item{totalItems === 1 ? "" : "s"}
          </Text>
          <Text style={[styles.footerValue, { color: theme.text }]}>
            ₹{order.totalAmount.toLocaleString("en-IN")}
          </Text>
        </View>
        <View style={styles.footerRight}>
          <Text style={[styles.viewDetailsText, { color: theme.primary }]}>
            View Details
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
