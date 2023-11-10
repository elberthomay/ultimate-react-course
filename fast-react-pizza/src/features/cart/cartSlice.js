import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = { cart: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItem(state, action) {
      state.cart.push(action.payload);
    },
    deleteCartItem(state, action) {
      const id = action.payload;
      state.cart = state.cart.filter((item) => item.pizzaId !== id);
    },
    incItemQuantity(state, action) {
      const id = action.payload;
      const item = state.cart.find((item) => item.pizzaId === id);
      if (item) {
        item.quantity++;
        item.totalprice += item.unitPrice;
      }
    },
    decItemQuantity(state, action) {
      const id = action.payload;
      const item = state.cart.find((item) => item.pizzaId === id);
      if (item) {
        if (item.quantity === 1)
          cartSlice.caseReducers.deleteCartItem(state, action);
        else {
          item.quantity--;
          item.totalprice -= item.unitPrice;
        }
      }
    },
    clearCart(state, action) {
      state.cart = [];
    },
  },
});

export default cartSlice.reducer;

export const {
  addCartItem,
  deleteCartItem,
  incItemQuantity,
  decItemQuantity,
  clearCart,
} = cartSlice.actions;

export const getCartItemQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;

export const getCart = (state) => state.cart.cart;
export const getCartTotalQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);
export const getCartTotalPrice = (state) =>
  state.cart.cart.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0,
  );
