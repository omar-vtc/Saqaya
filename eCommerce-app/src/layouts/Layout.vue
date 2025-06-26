<template>
  <div class="app">
    <Header />
    <main class="main page-content">
      <router-view />
    </main>
    <Footer />
  </div>
</template>
<script setup lang="ts">
import Header from "../shared/components/molecules/Header.vue";
import Footer from "../shared/components/molecules/Footer.vue";
</script>
<style>
html,
body,
#app {
  height: 100%;
  margin: 0;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
}

.main {
  flex: 1; /* pushes the footer down */
}
/* Add this to your styles */
.page-content {
  padding-top: 6rem; /* Equal to header height */
}
</style>
