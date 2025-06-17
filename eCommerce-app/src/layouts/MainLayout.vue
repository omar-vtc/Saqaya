<template>
  <v-app>
    <v-layout>
      <v-navigation-drawer expand-on-hover rail permanent>
        <v-list>
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
            subtitle="sandra_a88@gmailcom"
            title="Sandra Adams"
          ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item
            to="/products"
            prepend-icon="mdi-folder"
            title="Products"
          />
          <v-list-item
            to="/cart"
            prepend-icon="mdi-account-multiple"
            title="Cart"
          />
          <v-list-item
            to="/contact-us"
            prepend-icon="mdi-star"
            title="Contact Us"
          />
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <v-container
          class="d-flex align-center justify-center"
          style="height: 300px"
        >
          <v-sheet
            border="dashed md"
            color="surface-light"
            height="200"
            rounded="lg"
            width="100%"
          >
            <router-view />
          </v-sheet>
        </v-container>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup lang="ts">
import Footer from "../components/Footer.vue";
import Header from "../components/Header.vue";
</script>
