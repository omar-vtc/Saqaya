<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import ProductCard from "../components/ProductCard.vue";
import Pagination from "../shared/components/molecules/Pagination.vue";
import type Product from "../data/entities/Product";

export default defineComponent({
  name: "ProductsPage",
  components: {
    ProductCard,
    Pagination,
  },
  data() {
    return {
      cartItems: [] as Product[],
    };
  },
  computed: {
    products(): Product[] {
      // Access the Vuex getter from the products module
      return this.$store.getters["products/allProducts"];
    },
  },
  async mounted() {
    // Dispatch the action to load products once component mounts
    await this.$store.dispatch("products/loadProducts");
    // ✅ Get cart items from cart module
    this.cartItems = this.$store.getters["cart/cartItems"];

    console.log("Cart contains FROM store:", this.cartItems);
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
    />
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
