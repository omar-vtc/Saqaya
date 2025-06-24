<script lang="ts">
import ProductCard from "../components/ProductCard.vue";
import Pagination from "../shared/components/molecules/Pagination.vue";
import { fetchProducts } from "../data/api/getProducts";

import type Product from "../data/entities/Product";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProductsPage",
  components: {
    ProductCard,
    Pagination,
  },
  data() {
    return {
      products: [] as Product[],
    };
  },
  async mounted() {
    this.products = await fetchProducts();
  },
});
</script>

<template>
  <div class="grid-container">
    <ProductCard v-for="n in 8" :key="n" />
  </div>
  <Pagination />
</template>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 columns */
  gap: 4rem;
  padding: 2rem;
  justify-items: center;
  align-items: center;
  /* border: solid red; */
}
/* Stack cards vertically on small screens */
@media (max-width: 800px) {
  .grid-container {
    grid-template-columns: 1fr; /* Single column */
  }
}
</style>
