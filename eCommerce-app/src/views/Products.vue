<script lang="ts">
import { defineComponent } from "vue";
import { useProductStore } from "../shared/store/pinia/index"; // adjust if needed
import ProductCard from "../components/ProductCard.vue";
import Pagination from "../shared/components/molecules/Pagination.vue";
import ProductModal from "../components/ProductModal.vue";
import type Product from "../data/entities/Product";
import SortBanner from "../shared/components/molecules/SortBanner.vue";

export default defineComponent({
  name: "ProductsPage",
  components: {
    ProductCard,
    Pagination,
    ProductModal,
    SortBanner,
  },
  data() {
    return {
      productStore: useProductStore(),
      selectedProductId: null as number | null,
      sortOrder: "default" as "default" | "asc" | "desc",
    };
  },
  computed: {
    products(): Product[] {
      return this.productStore.allProducts;
    },
    sortedProducts(): Product[] {
      const products = [...this.products];
      if (this.sortOrder === "asc") {
        return products.sort((a, b) => a.price - b.price);
      } else if (this.sortOrder === "desc") {
        return products.sort((a, b) => b.price - a.price);
      }
      return products;
    },
    selectedProduct(): Product | undefined {
      return this.selectedProductId !== null
        ? this.productStore.getProductById(this.selectedProductId)
        : undefined;
    },
  },
  methods: {
    openProductModal(productId: number) {
      this.selectedProductId = productId;
    },
    closeProductModal() {
      this.selectedProductId = null;
    },
  },
  async mounted() {
    if (this.productStore.products.length === 0) {
      await this.productStore.loadProducts();
    }
  },
});
</script>

<template>
  <SortBanner v-model="sortOrder" class="sort-container" />
  <div class="grid-container">
    <ProductCard
      v-for="product in sortedProducts"
      :id="product.id"
      :key="product.id"
      :title="product.name"
      :price="product.price"
      :description="product.description"
      :imageSrc="product.image"
      @card-click="openProductModal"
    />
  </div>

  <ProductModal :product="selectedProduct" @close="closeProductModal" />

  <!-- <Pagination /> -->
</template>

<style>
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4rem;
  padding: 2rem;
  justify-items: center;
  align-items: center;
}

@media (max-width: 800px) {
  .grid-container {
    grid-template-columns: 1fr;
  }
}

.sort-container {
  margin: 1rem 2rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  background-color: #f9f9f9;
  border: 1px solid rgba(154, 149, 149, 0.2);
  border-radius: 8px;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.05);
  max-width: 300px;
  font-family: inherit;
}

.sort-container label {
  font-weight: 500;
  font-size: 1rem;
  color: #610243;
}

.sort-container select {
  padding: 0.4rem 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: #fff;
  color: #333;
  transition: border-color 0.2s ease;
}

.sort-container select:focus {
  outline: none;
  border-color: #ff00ae;
  box-shadow: 0 0 0 2px rgba(255, 0, 174, 0.2);
}
</style>
