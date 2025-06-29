<script lang="ts">
import { defineComponent } from "vue";
import ProductCard from "../components/ProductCard.vue";
import Pagination from "../shared/components/molecules/Pagination.vue";
import ProductModal from "../components/ProductModal.vue";
import type Product from "../data/entities/Product";

export default defineComponent({
  name: "ProductsPage",
  components: {
    ProductCard,
    Pagination,
    ProductModal,
  },
  data() {
    return {
      selectedProductId: null as number | null,
    };
  },
  computed: {
    products(): Product[] {
      return this.$store.getters["products/allProducts"];
    },
    selectedProduct(): Product | undefined {
      return this.selectedProductId !== null
        ? this.$store.getters["products/getProductById"](this.selectedProductId)
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
    await this.$store.dispatch("products/loadProducts");
  },
});
</script>

<template>
  <div class="grid-container">
    <ProductCard
      v-for="product in products"
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

<style scoped>
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
</style>
