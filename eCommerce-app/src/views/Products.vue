<script setup lang="ts">
import ProductCard from "../components/ProductCard.vue";
</script>

<template>
  <div class="grid-container">
    <ProductCard v-for="n in 8" :key="n" />
  </div>
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
</style>
