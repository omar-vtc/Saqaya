// stores/products.ts
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type Product from "../../../../data/entities/Product";
import { fetchProducts } from "../../../../data/api/getProducts";

export const useProductStore = defineStore("products", () => {
  const products = ref<Product[]>([]);

  const setProducts = (newProducts: Product[]) => {
    products.value = newProducts;
  };

  const loadProducts = async () => {
    const loadedProducts = await fetchProducts();
    console.log("Loaded products from pinia store:", loadedProducts);
    setProducts(loadedProducts);
  };

  const allProducts = computed(() => products.value);
  const getProductById = (id: number) =>
    products.value.find((product) => product.id === id);

  return {
    products,
    loadProducts,
    setProducts,
    allProducts,
    getProductById,
  };
});
