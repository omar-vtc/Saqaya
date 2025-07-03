<script lang="ts">
import { defineComponent, PropType } from "vue";
import type Product from "../data/entities/Product";

export default defineComponent({
  name: "ProductModal",
  props: {
    product: {
      type: Object as PropType<Product>,
      required: false,
    },
  },
});
</script>

<!-- components/ProductModal.vue -->
<template>
  <div v-if="product" class="overlay" @click.self="$emit('close')">
    <div class="overlay__content">
      <button class="overlay__close" @click="$emit('close')">×</button>
      <h2>{{ product.name }}</h2>
      <img :src="product.image" alt="Product Image" />
      <p>{{ product.description }}</p>
      <p><strong>Category:</strong> {{ product.category }}</p>
      <p>
        <strong>Rating:</strong> {{ product.rating?.rate }} ⭐ ({{
          product.rating?.count
        }}
        reviews)
      </p>
      <p><strong>Price:</strong> ${{ product.price }}</p>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.overlay__content {
  background: #fff;
  padding: 2rem;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 10px;
  position: relative;
  animation: fadeIn 0.3s ease-in-out;
}

.overlay__close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.overlay__content img {
  max-width: 100%;
  margin: 1rem 0;
  border-radius: 8px;
}
</style>
