import AsyncStorage from "@react-native-async-storage/async-storage";
import Images from "../../constants/images";

const CART_KEY = "@attireBandhan/cart";

export type CartItem = {
  id: string;
  productId: string;
  mode: "rent" | "buy";
  selectedSize: string;
  selectedColor: string;
  image: keyof typeof Images;
  title: string;
  brand: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  qty: number;
  // Rental specific
  rentalDuration?: number;
  pricePerDay?: number;
  securityDeposit?: number;
};

export async function getCartItems(): Promise<CartItem[]> {
  try {
    const json = await AsyncStorage.getItem(CART_KEY);
    if (!json) return [];
    return JSON.parse(json) as CartItem[];
  } catch (error) {
    console.error("Error loading cart items:", error);
    return [];
  }
}

export async function addToCart(item: CartItem): Promise<void> {
  try {
    const items = await getCartItems();
    const existingIndex = items.findIndex(
      (i) =>
        i.productId === item.productId &&
        i.mode === item.mode &&
        i.selectedSize === item.selectedSize &&
        i.selectedColor === item.selectedColor
    );

    if (existingIndex >= 0) {
      // Update quantity if same item exists
      items[existingIndex].qty += item.qty;
    } else {
      // Add new item
      items.push(item);
    }

    await AsyncStorage.setItem(CART_KEY, JSON.stringify(items));
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
}

export async function removeFromCart(itemId: string): Promise<void> {
  try {
    const items = await getCartItems();
    const filtered = items.filter((item) => item.id !== itemId);
    await AsyncStorage.setItem(CART_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error("Error removing from cart:", error);
    throw error;
  }
}

export async function updateCartItemQuantity(
  itemId: string,
  qty: number
): Promise<void> {
  try {
    const items = await getCartItems();
    const updated = items.map((item) =>
      item.id === itemId ? { ...item, qty: Math.max(1, qty) } : item
    );
    await AsyncStorage.setItem(CART_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error("Error updating cart item:", error);
    throw error;
  }
}

export async function clearCart(): Promise<void> {
  try {
    await AsyncStorage.removeItem(CART_KEY);
  } catch (error) {
    console.error("Error clearing cart:", error);
    throw error;
  }
}
