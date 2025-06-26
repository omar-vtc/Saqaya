<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapActions } from "vuex";

export default defineComponent({
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    ...mapGetters("cart", ["cartItems"]),
    totalPrice(): number {
      return this.cartItems.reduce(
        (sum: number, item: any) => sum + item.price,
        0
      );
    },
  },
  methods: {
    ...mapActions("cart", ["removeProductFromCart"]),
    handleRemove(id: number) {
      this.removeProductFromCart(id);
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
