import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../../services/storage/cartStorage";
import { getCartItems } from "../../services/storage/cartStorage";
import type { RootState } from "../store";

export type CartState = {
  items: CartItem[];
  isLoading: boolean;
  error: string | null;
};

const initialState: CartState = {
  items: [],
  isLoading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
      state.error = null;
    },
    addItem(state, action: PayloadAction<CartItem>) {
      const newItem = action.payload;
      const existingIndex = state.items.findIndex(
        (item) =>
          item.productId === newItem.productId &&
          item.mode === newItem.mode &&
          item.selectedSize === newItem.selectedSize &&
          item.selectedColor === newItem.selectedColor
      );

      if (existingIndex >= 0) {
        state.items[existingIndex].qty += newItem.qty;
      } else {
        state.items.push(newItem);
      }
      state.error = null;
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.error = null;
    },
    updateItemQuantity(
      state,
      action: PayloadAction<{ id: string; qty: number }>
    ) {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.qty = action.payload.qty;
      }
      state.error = null;
    },
    clearCart(state) {
      state.items = [];
      state.error = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const {
  setCartItems,
  addItem,
  removeItem,
  updateItemQuantity,
  clearCart,
  setLoading,
  setError,
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartItemCount = (state: RootState): number => {
  return state.cart.items.reduce((total, item) => total + item.qty, 0);
};
export const selectCartIsLoading = (state: RootState) => state.cart.isLoading;
export const selectCartError = (state: RootState) => state.cart.error;

export default cartSlice.reducer;
