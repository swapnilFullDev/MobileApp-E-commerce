import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCartItems,
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
  CartItem,
} from "../../services/storage/cartStorage";
import {
  setCartItems,
  addItem,
  removeItem,
  updateItemQuantity,
  clearCart as clearCartAction,
} from "../slices/cartSlice";

// Load cart from storage
export const loadCart = createAsyncThunk(
  "cart/loadCart",
  async (_, { dispatch }) => {
    try {
      const items = await getCartItems();
      dispatch(setCartItems(items));
      return items;
    } catch (error) {
      console.error("Error loading cart:", error);
      throw error;
    }
  }
);

// Add item to cart
export const addItemToCart = createAsyncThunk(
  "cart/addItem",
  async (item: CartItem, { dispatch }) => {
    try {
      await addToCart(item);
      dispatch(addItem(item));
      return item;
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
    }
  }
);

// Remove item from cart
export const removeItemFromCart = createAsyncThunk(
  "cart/removeItem",
  async (itemId: string, { dispatch }) => {
    try {
      await removeFromCart(itemId);
      dispatch(removeItem(itemId));
      return itemId;
    } catch (error) {
      console.error("Error removing from cart:", error);
      throw error;
    }
  }
);

// Update item quantity
export const updateCartQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ itemId, qty }: { itemId: string; qty: number }, { dispatch }) => {
    try {
      await updateCartItemQuantity(itemId, qty);
      dispatch(updateItemQuantity({ id: itemId, qty }));
      return { itemId, qty };
    } catch (error) {
      console.error("Error updating cart quantity:", error);
      throw error;
    }
  }
);

// Clear cart
export const clearCartThunk = createAsyncThunk(
  "cart/clearCart",
  async (_, { dispatch }) => {
    try {
      await clearCart();
      dispatch(clearCartAction());
      return true;
    } catch (error) {
      console.error("Error clearing cart:", error);
      throw error;
    }
  }
);
