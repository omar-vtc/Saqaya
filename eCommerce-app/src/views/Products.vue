<script lang="ts" setup>
import { ref, computed, onMounted, defineExpose } from "vue";
import { useProductStore } from "../shared/store/pinia/index";
import ProductCard from "../components/ProductCard.vue";
import Pagination from "../shared/components/molecules/Pagination.vue";
import ProductModal from "../components/ProductModal.vue";
import type Product from "../data/entities/Product";
import SortBanner from "../shared/components/molecules/SortBanner.vue";

const productStore = useProductStore();

const selectedProductId = ref<number | null>(null);
const sortOrder = ref<"default" | "asc" | "desc">("default");

defineExpose({
  selectedProductId,
  sortOrder,
});

const products = computed(() => productStore.allProducts);

const sortedProducts = computed(() => {
  const list = [...products.value];
  if (sortOrder.value === "asc") {
    return list.sort((a, b) => a.price - b.price);
  } else if (sortOrder.value === "desc") {
    return list.sort((a, b) => b.price - a.price);
  }
  return list;
});

const selectedProduct = computed(() => {
  return selectedProductId.value !== null
    ? productStore.getProductById(selectedProductId.value)
    : undefined;
});

function openProductModal(productId: number) {
  selectedProductId.value = productId;
}

function closeProductModal() {
  selectedProductId.value = null;
}

onMounted(async () => {
  if (productStore.products.length === 0) {
    await productStore.loadProducts();
  }
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
