import { defineStore } from "pinia";
import type Product from "../../../../data/entities/Product";
import { fetchProducts } from "../../../../data/api/getProducts";

interface State {
  products: Product[];
}

export const useProductStore = defineStore("products", {
  state: (): State => ({
    products: [],
  }),

  getters: {
    allProducts: (state) => state.products,
    getProductById: (state) => {
      return (id: number) =>
        state.products.find((product) => product.id === id);
    },
  },

  actions: {
    setProducts(newProducts: Product[]) {
      this.products = newProducts;
    },

    async loadProducts() {
      const loadedProducts = await fetchProducts();
      console.log("Loaded products from pinia store:", loadedProducts);
      this.setProducts(loadedProducts);
    },
  },
});
