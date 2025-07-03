// stores/cart.ts
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type Product from "../../../../data/entities/Product";

export const useCartStore = defineStore(
  "cart",
  () => {
    const items = ref<Product[]>([]);

    const addToCart = (product: Product) => {
      console.log("Adding product to cart from pinia store:", product);
      items.value.push(product);
    };

    const removeFromCart = (productId: number) => {
      console.log("Removing product from cart pinia store:", productId);
      items.value = items.value.filter((item) => item.id !== productId);
    };

    const cartItems = computed(() => items.value);
    const cartCount = computed(() => items.value.length);

    return {
      items,
      addToCart,
      removeFromCart,
      cartItems,
      cartCount,
    };
  },
  {
    persist: true, // Enable persistence for the entire cart store
  }
);
