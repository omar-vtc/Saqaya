// src/types/vue-shim.d.ts
import { Store } from "vuex";
import type { ComponentCustomProperties } from "vue";
import type { ProductsState } from "../shared/store/modules/products";
import type { CartState } from "../shared/store/modules/cart";

declare module "@vue/runtime-core" {
  interface State {
    products: ProductsState;
    cart: CartState;
  }

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
