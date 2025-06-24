// store/index.ts
import { createStore } from "vuex";
import { products, type ProductsState } from "./modules/products";
import { cart, type CartState } from "./modules/cart";

export interface RootState {
  products: ProductsState;
  cart: CartState;
}

export const store = createStore<RootState>({
  modules: {
    products,
    cart,
  },
});
