<script lang="ts">
import { defineComponent } from "vue";
import { useCartStore } from "../../store/pinia/index"; // adjust the path if necessary
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "CartDrawer",
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    const cartStore = useCartStore();
    const { cartItems } = storeToRefs(cartStore);

    return {
      cartStore,
      cartItems,
    };
  },
  computed: {
    totalPrice(): number {
      return this.cartItems.reduce((sum, item) => sum + item.price, 0);
    },
  },
  methods: {
    handleRemove(id: number) {
      this.cartStore.removeFromCart(id);
    },
  },
});
</script>

<template>
  <transition name="slide">
    <div class="cart-drawer" v-if="isOpen">
      <div class="cart-drawer__header">
        <h3>Your Cart</h3>
        <span class="close-btn" @click="$emit('close')">&times;</span>
      </div>

      <div class="cart-drawer__content">
        <div v-if="cartItems.length === 0">
          <p>Your cart is empty</p>
        </div>
        <div v-else>
          <div
            class="cart-product-card"
            v-for="item in cartItems"
            :key="item.id"
          >
            <img :src="item.image" alt="" class="cart-product-card__image" />
            <div class="cart-product-card__info">
              <h4 class="cart-product-card__title">{{ item.name }}</h4>
              <p class="cart-product-card__price">{{ item.price }}$</p>
              <button
                class="cart-product-card__remove"
                @click="handleRemove(item.id)"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="cart-drawer__footer" v-if="cartItems.length > 0">
        <div class="cart-total">
          <span>Total:</span>
          <span class="cart-total__amount">{{ totalPrice }}$</span>
        </div>
        <button class="checkout-button">Checkout</button>
      </div>
    </div>
  </transition>
</template>
