<script lang="ts">
import { ref, computed } from "vue";
import { mapGetters, mapActions } from "vuex";
import Logo from "../atoms/Logo.vue";
import NavList from "./NavList.vue";
import ListOfActionIcons from "./ListOfActionIcons.vue";
import ActionIcon from "../atoms/ActionIcon.vue";
import Cart from "./Cart.vue";

export default {
  components: {
    Logo,
    NavList,
    ListOfActionIcons,
    ActionIcon,
    Cart,
  },
  data() {
    return {
      isDrawerOpen: false,
      isCartOpen: false,
    };
  },
  computed: {
    ...mapGetters("cart", ["cartItems"]),
  },
  methods: {
    ...mapActions("cart", ["removeProductFromCart"]),
    toggleDrawer() {
      if (this.isCartOpen) this.isCartOpen = false;
      this.isDrawerOpen = !this.isDrawerOpen;
    },
    toggleCartDrawer() {
      if (this.isDrawerOpen) this.isDrawerOpen = false;
      this.isCartOpen = !this.isCartOpen;
    },
    handleRemove(id: number) {
      this.removeProductFromCart(id);
    },
  },
};
</script>

<template>
  <div class="header">
    <Logo class-name="header__logo" img-class-name="header__logo--img" />
    <!-- Hamburger icon for mobile -->
    <ActionIcon
      className="header__hamburger"
      IconClass="bars"
      @Click="toggleDrawer"
    />

    <!-- Main navigation (hidden on small screens) -->
    <NavList
      div-class-name="header__list-container"
      class-name="header__list"
      ele-class-name="header__list-item"
    />

    <!-- Action Icons -->
    <ListOfActionIcons
      className="header__actions"
      iconClass="action-icon"
      :icons="[
        { name: 'magnifying-glass', 'data-testid': 'icon-magnifying-glass' },
        {
          name: 'shopping-cart',
          onClick: toggleCartDrawer,
          badgeCount: cartItems.length,
          'data-testid': 'icon-shopping-cart',
        },
        { name: 'right-to-bracket', 'data-testid': 'icon-login' },
      ]"
    />
  </div>

  <!-- Drawer on small screens -->
  <transition name="mobile-slide">
    <div class="mobile-drawer" v-if="isDrawerOpen">
      <!-- Logo -->
      <Logo
        class-name="mobile-drawer__logo"
        img-class-name="mobile-drawer__logo--img"
      />

      <!-- drawer Nav Links -->

      <NavList div-class-name="mobile-drawer__list" class-name="header__list"
      ele-class-name="header__list-item" onClick: toggleCartDrawer />

      <!-- Actions -->
      <ListOfActionIcons
        className="mobile-drawer__actions"
        iconClass="action-icon"
        :icons="[
          { name: 'magnifying-glass' },
          { name: 'shopping-cart', onClick: toggleCartDrawer },
          { name: 'right-to-bracket' },
        ]"
      />
    </div>
  </transition>

  <!-- Cart Drawer -->
  <Cart :isOpen="isCartOpen" @close="toggleCartDrawer" />
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
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
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
.icon-container {
  position: relative;
  display: inline-block;
}
.icon-badge {
  position: absolute;
  top: -0.4rem;
  right: -0.6rem;
  background-color: #ff008c;
  color: white;
  font-size: 0.65rem;
  font-weight: bold;
  padding: 0.15rem 0.4rem;
  border-radius: 50%;
  line-height: 1;
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

/* Slide in from left (enter) */
.mobile-slide-enter-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.mobile-slide-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}
.mobile-slide-enter-to {
  transform: translateX(0%);
  opacity: 1;
}

/* Slide out to right (leave) */
.mobile-slide-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.mobile-slide-leave-from {
  transform: translateX(0%);
  opacity: 1;
}
.mobile-slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
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

.mobile-drawer__logo--img {
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

.mobile-drawer__list--listItem {
  font-size: 1.2rem;
  font-weight: 500;
  color: #333;
  padding: 0.5rem 1.5rem;
  transition: color 0.2s ease;
}

.mobile-drawer__list--listItem:hover {
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
  height: 90%;
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

/*cart content*/
.cart-product-card {
  display: flex;
  gap: 0.8rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.cart-product-card__image {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 6px;
}

.cart-product-card__info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
}

.cart-product-card__title {
  font-size: 1rem;
  font-weight: 500;
  margin: 0;
}

.cart-product-card__price {
  font-size: 0.95rem;
  color: #610243;
  margin: 0.25rem 0;
}

.cart-product-card__remove {
  background: none;
  border: none;
  color: #ff0040;
  font-size: 0.85rem;
  cursor: pointer;
  padding: 0;
  text-align: left;
}
.cart-drawer__footer {
  border-top: 1px solid #eee;
  padding-top: 1rem;
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-size: 1rem;
}
.cart-total {
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-size: 1rem;
  align-items: center;
}

.cart-total__amount {
  color: #610243;
}
.checkout-button {
  padding: 0.5rem 0.5rem;
  background-color: #610243;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: 20px;
}

.checkout-button:hover {
  background-color: #8a055d;
}
/* Responsive */
@media (max-width: 922px) {
  .header {
    padding: 0 1rem;
  }

  .header__list {
    gap: 1.5rem;
    /* flex-direction: column; */
  }

  .header__list-item .list-item__ele {
    font-size: 1rem;
    padding: 0.4rem 0.8rem;
  }

  .header__logo img {
    max-width: 70px;
  }

  .action-icon {
    font-size: 1.3rem;
  }
}

/* Mobile vertical layout */
@media (max-width: 600px) {
  .header__list {
    gap: 1.5rem;
    flex-direction: column;
  }
  .mobile-drawer__list {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    padding-left: 2rem;
  }

  .mobile-drawer__list .list-item__ele {
    padding: 0.5rem 1.5rem;
    width: 100%;
    text-align: left;
  }
  .header__logo img {
    max-width: 70px;
    display: none;
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

@media (min-width: 601px) {
  .header__hamburger {
    display: none !important;
  }
}
</style>
