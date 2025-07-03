// src/types/vue-shim.d.ts
import { Store } from "vuex";
import type { ComponentCustomProperties } from "vue";
import type { ProductsState } from "../shared/store/vuex/modules/products";
import type { CartState } from "../shared/store/vuex/modules/cart";

declare module "@vue/runtime-core" {
  interface State {
    products: ProductsState;
    cart: CartState;
  }

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
