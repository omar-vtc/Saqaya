// store/modules/products.ts
import type { Module } from "vuex";
import type { RootState } from "../index";
import type Product from "../../../data/entities/Product";
import { fetchProducts } from "../../../data/api/getProducts";

export interface ProductsState {
  products: Product[];
}

export const products: Module<ProductsState, RootState> = {
  namespaced: true,
  state: () => ({
    products: [],
  }),
  mutations: {
    setProducts(state, products: Product[]) {
      state.products = products;
    },
  },
  actions: {
    async loadProducts({ commit }) {
      const products = await fetchProducts();
      // console.log("Loaded products from store:", products);
      commit("setProducts", products);
    },
  },
  getters: {
    allProducts(state) {
      return state.products;
    },
  },
};
