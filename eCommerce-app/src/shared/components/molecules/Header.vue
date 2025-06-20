<script setup lang="ts">
import { ref } from "vue";
import Logo from "../atoms/Logo.vue";
import LinkRouter from "../atoms/LinkRouter.vue";
import NavList from "./NavList.vue";

const isDrawerOpen = ref(false);
const toggleDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value;
};

const isCartOpen = ref(false);
const toggleCartDrawer = () => {
  isCartOpen.value = !isCartOpen.value;
};
</script>

<template>
  <div class="header">
    <Logo class-name="header__logo" img-class-name="header__logo--img" />
    <!-- Hamburger icon for mobile -->
    <div class="header__hamburger" @click="toggleDrawer">
      <font-awesome-icon icon="bars" />
    </div>

    <!-- Main navigation (hidden on small screens) -->
    <NavList
      div-class-name="header__list-container"
      class-name="header__list"
      ele-class-name="header__list-item"
    />

    <!-- Icons -->
    <div class="header__actions">
      <div class="action-icon">
        <font-awesome-icon icon="magnifying-glass" />
      </div>
      <div class="action-icon" @click="toggleCartDrawer">
        <font-awesome-icon icon="shopping-cart" />
      </div>
      <div class="action-icon">
        <font-awesome-icon icon="right-to-bracket" />
      </div>
    </div>
  </div>

  <!-- Drawer on small screens -->
  <transition name="slide">
    <div class="mobile-drawer" v-if="isDrawerOpen">
      <!-- Logo -->
      <div class="mobile-drawer__logo">
        <img src="../../assets/img/logo2.png" alt="Logo" />
      </div>

      <!-- Nav Links -->
      <ul class="mobile-drawer__list">
        <li @click="toggleDrawer">Home</li>
        <li @click="toggleDrawer">Products</li>
        <li @click="toggleDrawer">Contact Us</li>
      </ul>

      <!-- Actions -->
      <div class="mobile-drawer__actions">
        <div class="action-icon">
          <font-awesome-icon icon="magnifying-glass" />
        </div>
        <div class="action-icon" @click="toggleCartDrawer">
          <font-awesome-icon icon="shopping-cart" />
        </div>
        <div class="action-icon">
          <font-awesome-icon icon="right-to-bracket" />
        </div>
      </div>
    </div>
  </transition>

  <!-- Cart Drawer -->
  <transition name="slide">
    <div class="cart-drawer" v-if="isCartOpen">
      <div class="cart-drawer__header">
        <h3>Your Cart</h3>
        <span class="close-btn" @click="toggleCartDrawer">&times;</span>
      </div>
      <div class="cart-drawer__content">
        <p>Your cart is empty.</p>
      </div>
    </div>
  </transition>
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.list-item__ele.router-link-exact-active,
.list-item__ele.router-link-active {
  background-color: #b6b5b510;
  color: #ff00ae !important;
}

.header {
  width: 100%;
  height: 6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  position: relative;
  z-index: 1000;
}

.header__logo {
  flex: 1;
  height: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  /* border: solid; */
}

.header__logo--img {
  object-fit: contain;
  height: 95%;
  max-width: 150px;
}

.header__hamburger {
  display: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;
}

.header__list-container {
  flex: 5;
  height: inherit;
  display: flex;
  align-items: center;
}

.header__list {
  list-style: none;
  display: flex;
  gap: 2.5rem;
}

.header__list-item .list-item__ele {
  font-size: 1.2rem;
  font-weight: 500;
  color: #333;
  cursor: pointer;
  transition: color 0.2s ease;
  min-width: max-content;
  padding: 0.5rem 1.2rem;
  width: max-content;
  border-radius: 7px;
  text-decoration: none;
}

.header__list-item .list-item__ele:hover {
  color: #ff00ae;
  background-color: #b6b5b510;
}

.header__actions {
  flex: 1;
  height: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
}

.action-icon {
  font-size: 1.5rem;
  font-weight: 500;
  color: #333;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.action-icon:hover {
  color: #ff00ae;
}

/* Slide transition */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

/* Mobile Drawer */
.mobile-drawer {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 75%;
  max-width: 300px;
  background-color: white;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  padding-top: 6rem;
  z-index: 999;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.mobile-drawer__logo {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
}

.mobile-drawer__logo img {
  height: 40px;
  object-fit: contain;
}

.mobile-drawer__list {
  list-style: none;
  padding: 1rem 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  padding-left: 2rem;
  flex: 1;
}

.mobile-drawer__list li {
  font-size: 1.2rem;
  font-weight: 500;
  color: #333;
  cursor: pointer;
  padding: 0.5rem 1.5rem;
  transition: color 0.2s ease;
}

.mobile-drawer__list li:hover {
  color: #ff00ae;
}

.mobile-drawer__actions {
  display: flex;
  justify-content: center;
  gap: 1.2rem;
  padding: 1rem 0;
  border-top: 1px solid #eee;
}

/* Cart Drawer */
.cart-drawer {
  position: fixed;
  top: 6rem;
  right: 0;
  height: 100%;
  width: 300px;
  background-color: white;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
  z-index: 999;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  /* border: solid black; */
}

.cart-drawer__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding-bottom: 1rem;
}

.cart-drawer__header h3 {
  font-size: 1.3rem;
  margin: 0;
}

.close-btn {
  font-size: 1.5rem;
  cursor: pointer;
}

.cart-drawer__content {
  flex: 1;
  padding-top: 1rem;
  overflow-y: auto;
}

/* Responsive */
@media (max-width: 922px) {
  .header {
    padding: 0 1rem;
  }

  .header__list {
    gap: 1.5rem;
  }

  .header__list-item .list-item__ele {
    font-size: 1rem;
    padding: 0.4rem 0.8rem;
  }

  .header__logo img {
    max-width: 90px;
    display: none;
  }

  .action-icon {
    font-size: 1.3rem;
  }

  .header__actions {
    display: none;
  }
}

@media (max-width: 600px) {
  .header {
    flex-wrap: wrap;
    height: auto;
    gap: 1rem;
    padding: 1rem;
  }

  .header__hamburger {
    display: block;
  }

  .header__list-container {
    display: none;
  }

  .header__logo {
    flex: none;
    justify-content: center;
    width: 100%;
  }

  .header__actions {
    flex: none;
    justify-content: center;
    width: 100%;
  }

  .action-icon {
    font-size: 1.2rem;
  }
}
</style>
