// store/modules/cart.ts
import type { Module } from "vuex";
import type { RootState } from "../index";
import type Product from "../../../data/entities/Product";

export interface CartState {
  items: Product[];
}

export const cart: Module<CartState, RootState> = {
  namespaced: true,
  state: () => ({
    items: [],
  }),
  mutations: {
    addToCart(state, product: Product) {
      state.items.push(product);
    },
    removeFromCart(state, productId: number) {
      state.items = state.items.filter((item) => item.id !== productId);
    },
  },
  getters: {
    cartItems: (state) => state.items,
    cartCount: (state) => state.items.length,
  },
};
