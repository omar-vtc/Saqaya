<template>
  <div class="app">
    <Header />
    <main class="main">
      <router-view />
    </main>
    <Footer />
  </div>
</template>
<script setup lang="ts">
import Header from "../shared/components/molecules/Header.vue";
import Footer from "../components/navigation/Footer.vue";
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
</style>
