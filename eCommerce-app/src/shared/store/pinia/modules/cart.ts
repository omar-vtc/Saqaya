import { defineStore } from "pinia";
import type Product from "../../../../data/entities/Product";

interface State {
  items: Product[];
}

export const useCartStore = defineStore("cart", {
  state: (): State => ({
    items: [],
  }),

  getters: {
    cartItems: (state) => state.items,
    cartCount: (state) => state.items.length,
    totalPrice: (state) =>
      state.items.reduce((sum, item) => sum + item.price, 0),
  },

  actions: {
    addToCart(product: Product) {
      console.log("Adding product to cart from pinia store:", product);
      this.items.push(product);
    },

    removeFromCart(productId: number) {
      console.log("Removing product from cart pinia store:", productId);
      this.items = this.items.filter((item) => item.id !== productId);
    },
  },

  persist: import.meta.env.MODE !== "test", // disable persist in test
});
