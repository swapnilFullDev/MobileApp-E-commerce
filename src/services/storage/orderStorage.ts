import AsyncStorage from "@react-native-async-storage/async-storage";
import { SavedAddress } from "./addressStorage";

const ORDERS_KEY = "@attireBandhan/orders";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type OrderItem = {
  id: string;
  productId: string;
  title: string;
  brand: string;
  image: string;
  size: string;
  color?: string;
  qty: number;
  price: number;
  mode: "rent" | "buy";
  rentalDuration?: number;
  pricePerDay?: number;
  securityDeposit?: number;
};

export type Order = {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  items: OrderItem[];
  address: SavedAddress;
  paymentMethod: string;
  totalAmount: number;
  totalMrp: number;
  discount: number;
  platformFee: number;
  note?: string;
  createdAt: number;
  updatedAt: number;
  estimatedDelivery?: string;
  trackingNumber?: string;
};

export async function getOrders(): Promise<Order[]> {
  try {
    const json = await AsyncStorage.getItem(ORDERS_KEY);
    if (!json) return [];
    const orders = JSON.parse(json) as Order[];
    // Sort by most recent first
    return orders.sort((a, b) => b.createdAt - a.createdAt);
  } catch (error) {
    console.error("Error loading orders:", error);
    return [];
  }
}

export async function saveOrder(order: Order): Promise<void> {
  try {
    const orders = await getOrders();
    const existingIndex = orders.findIndex((o) => o.id === order.id);
    if (existingIndex >= 0) {
      orders[existingIndex] = order;
    } else {
      orders.push(order);
    }
    await AsyncStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  } catch (error) {
    console.error("Error saving order:", error);
    throw error;
  }
}

export async function getOrder(orderId: string): Promise<Order | null> {
  try {
    const orders = await getOrders();
    return orders.find((o) => o.id === orderId) || null;
  } catch (error) {
    console.error("Error getting order:", error);
    return null;
  }
}

export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus
): Promise<void> {
  try {
    const orders = await getOrders();
    const updated = orders.map((order) =>
      order.id === orderId ? { ...order, status, updatedAt: Date.now() } : order
    );
    await AsyncStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
}
