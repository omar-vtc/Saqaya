<template>
  <v-app>
    <!-- Navigation Drawer -->
    <Header />

    <!-- Main Content -->
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>

    <!-- Footer -->
    <Footer />
  </v-app>
</template>

<script setup lang="ts">
import Footer from ".././components/Footer.vue";
import Header from ".././components/Header.vue";
</script>
