<template>
  <v-app-bar :elevation="2">
    <!-- Left-side menu (dropdown on small screens) -->
    <div class="d-flex d-md-none">
      <v-menu>
        <template #activator="{ props }">
          <v-app-bar-nav-icon v-bind="props" />
        </template>

        <v-list>
          <v-list-item :to="'/products'" title="Products" />
          <v-list-item :to="'/contact-us'" title="Contact Us" />
          <v-list-item :to="'/cart'" title="Cart" />
        </v-list>
      </v-menu>
    </div>

    <!-- Keep nav icon as static icon on md+ (optional) -->
    <div class="d-none d-md-flex">
      <v-app-bar-nav-icon />
    </div>

    <!-- App title -->
    <div style="max-width: 120px">
      <v-app-bar-title class="text-left">SaQaya</v-app-bar-title>
    </div>
    <!-- Center nav links on md+ -->
    <v-spacer />
    <div class="d-none d-md-flex align-center">
      <v-btn text :to="'/home'" class="mx-2">Home</v-btn>

      <v-btn text :to="'/products'" class="mx-2">Products</v-btn>
      <v-btn text :to="'/contact-us'" class="mx-2">Contact Us</v-btn>
    </div>
    <v-spacer />

    <!-- Right-side icons -->
    <template v-slot:append>
      <v-btn icon="mdi-cart" :to="'/cart'" />
      <v-btn icon="mdi-magnify" />
    </template>
  </v-app-bar>
</template>
