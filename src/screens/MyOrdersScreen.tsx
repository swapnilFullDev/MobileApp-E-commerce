import React, { useCallback, useState } from "react";
import {
  FlatList,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from "../context";
import { ScreenHeader } from "../components/common";
import { OrderCard, OrderDetailModal } from "../components/orders";
import { orderStyles as styles } from "../styles/orders/orderStyles";
import {
  getOrders,
  Order,
  OrderStatus,
} from "../services/storage/orderStorage";
import { spacing } from "../theme/spacing";
import { fonts } from "../theme/fonts";
import { typeScale } from "../theme/scales";

type FilterStatus = "all" | OrderStatus;

const filterOptions: { id: FilterStatus; label: string }[] = [
  { id: "all", label: "All" },
  { id: "pending", label: "Pending" },
  { id: "confirmed", label: "Confirmed" },
  { id: "processing", label: "Processing" },
  { id: "shipped", label: "Shipped" },
  { id: "delivered", label: "Delivered" },
  { id: "cancelled", label: "Cancelled" },
];

export default function MyOrdersScreen() {
  const { theme } = useTheme();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<FilterStatus>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderDetail, setShowOrderDetail] = useState(false);

  const loadOrders = async () => {
    try {
      const allOrders = await getOrders();
      setOrders(allOrders);
    } catch (error) {
      console.error("Error loading orders:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadOrders();
    }, [])
  );

  const filteredOrders = orders.filter(
    (order) => selectedFilter === "all" || order.status === selectedFilter
  );

  const handleOrderPress = (order: Order) => {
    setSelectedOrder(order);
    setShowOrderDetail(true);
  };

  const renderOrder = ({ item }: { item: Order }) => (
    <OrderCard order={item} onPress={() => handleOrderPress(item)} />
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={theme.name === "light" ? "dark-content" : "light-content"}
      />
      <ScreenHeader title="My Orders" />

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
        >
          {filterOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.filterChip,
                {
                  backgroundColor:
                    selectedFilter === option.id
                      ? theme.primary
                      : theme.surface,
                  borderColor:
                    selectedFilter === option.id ? theme.primary : theme.border,
                },
              ]}
              onPress={() => setSelectedFilter(option.id)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.filterChipText,
                  {
                    color:
                      selectedFilter === option.id ? theme.surface : theme.text,
                  },
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Orders List */}
      {filteredOrders.length > 0 ? (
        <FlatList
          data={filteredOrders}
          keyExtractor={(item) => item.id}
          renderItem={renderOrder}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyTitle, { color: theme.text }]}>
            No Orders Found
          </Text>
          <Text style={[styles.emptySubtitle, { color: theme.secondaryText }]}>
            {selectedFilter === "all"
              ? "You haven't placed any orders yet. Start shopping to see your orders here!"
              : `No ${filterOptions
                  .find((o) => o.id === selectedFilter)
                  ?.label.toLowerCase()} orders found.`}
          </Text>
        </View>
      )}

      {/* Order Detail Modal */}
      <OrderDetailModal
        visible={showOrderDetail}
        order={selectedOrder}
        onClose={() => {
          setShowOrderDetail(false);
          setSelectedOrder(null);
        }}
      />
    </View>
  );
}
