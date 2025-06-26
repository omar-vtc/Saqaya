// store/index.ts
import { createStore } from "vuex";
import { products, type ProductsState } from "./modules/products";
import { cart, type CartState } from "./modules/cart";
import createPersistedState from "vuex-persistedstate";

export interface RootState {
  products: ProductsState;
  cart: CartState;
}

export const store = createStore<RootState>({
  modules: {
    products,
    cart,
  },
  plugins: [
    createPersistedState({
      paths: ["cart"], // only persist the cart module
    }),
  ],
});
