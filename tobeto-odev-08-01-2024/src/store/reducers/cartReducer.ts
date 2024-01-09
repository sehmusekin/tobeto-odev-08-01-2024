import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductModel } from "../../models/responses/ProductModel";

interface CartItem {
  id: number;
  quantity: number;
  title: string;
}

interface CartState {
  cartItems: CartItem[];
}

const initialState: CartState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductModel>) => {
      const existingItem = state.cartItems.find(item => item.id === action.payload.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({
          id: action.payload.id,
          quantity: 1,
          title: action.payload.title,
        });
      }
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      const existingItem = state.cartItems.find(item => item.id === action.payload);

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
        }
      }
    },

    removeItem: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
    },

    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { addToCart, removeFromCart, removeItem, clearCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
