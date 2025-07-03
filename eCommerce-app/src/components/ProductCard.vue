<script lang="ts" setup>
import { computed } from "vue";
import { useCartStore } from "../shared/store/pinia/index";
import type Product from "../data/entities/Product";
import ListOfActionIcons from "../shared/components/molecules/ListOfActionIcons.vue";
import { defineProps, defineEmits } from "vue";

const props = defineProps<{
  id: number;
  title: string;
  price: number;
  description: string;
  imageSrc: string;
}>();

const emit = defineEmits<{
  (e: "card-click", id: number): void;
}>();

const cartStore = useCartStore();

const isInCart = computed(() =>
  cartStore.cartItems.some((item) => item.id === props.id)
);

const cartIconClass = computed(() =>
  isInCart.value
    ? "card__actions-container--icon active"
    : "card__actions-container--icon"
);

function toggleCart() {
  const product: Product = {
    id: props.id ?? 0,
    name: props.title ?? "",
    price: props.price ?? 0,
    description: props.description ?? "",
    image: props.imageSrc ?? "",
  };

  if (isInCart.value) {
    cartStore.removeFromCart(product.id);
  } else {
    cartStore.addToCart(product);
  }
}

function handleCardClick(event: MouseEvent) {
  const target = event.target as HTMLElement;
  if (target.closest(".card__actions-container--icon")) return;
  emit("card-click", props.id);
}

const actionIcons = computed((): any[] => [
  { name: "fa-regular fa-heart" },
  {
    name: "fa-solid fa-cart-plus",
    onClick: toggleCart,
    class: cartIconClass.value,
  },
  { name: ["far", "square-plus"] },
]);
</script>

<template>
  <div class="card" @click="handleCardClick">
    <div class="card__title-container">
      <h3 class="card__title-container--title">{{ title }}</h3>
      <h3 class="card__title-container--price">{{ price }}$</h3>
    </div>

    <div class="card__img-container">
      <div class="card__img-container--img">
        <img :src="imageSrc" alt="" />
      </div>
    </div>

    <div class="card__description-container">
      <p>{{ description }}</p>
    </div>

    <ListOfActionIcons
      :className="'card__actions-container'"
      :iconClass="'card__actions-container--icon'"
      :icons="actionIcons"
    />
  </div>
</template>

<style>
.card {
  width: 22rem;
  height: 27rem;
  /* border: solid red; */
  display: flex;
  flex-direction: column;
  border: solid 1px rgba(154, 149, 149, 0.189);
  box-shadow: 5px 5px 5px 5px rgba(117, 116, 116, 0.05);
  border-radius: 10px;

  /* gap: 5px; */
}

/* =========================== Product title part =================================*/
.card__title-container {
  width: 100%;
  /* border: solid rebeccapurple; */
  padding: 0.5rem;
  flex: 0.5;
  display: flex;
}

.card__title-container--title {
  flex: 3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  /* border: solid saddlebrown; */
}
.card__title-container--price {
  flex: 1;
  text-align: right;
  font-weight: 500;
  color: #610243;
  font-size: 1.2rem;
  /* border: solid red; */
}
/* =========================== Product image part =================================*/

.card__img-container {
  flex: 4;
  /* border: solid blue; */
  padding: 0.2rem;
  overflow: hidden;
}
.card__img-container--img {
  /* border: solid black; */
  width: 100%;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
}

.card__img-container--img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* border: solid red; */
}

/* =========================== Product description part =================================*/

.card__description-container {
  flex: 2;
  padding: 0.5rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4; /* change this to how many lines you want */
  line-clamp: 4;
}
.card__description-container p {
  font-size: 1rem;
  padding-left: 0.4rem;
}
/* =========================== Product actions part =================================*/
.card__actions-container {
  /* border: solid green; */
  flex: 1;
  display: flex;
  justify-content: center;
  gap: 1rem;
  align-items: center;
}

.card__actions-container--icon {
  font-size: 1rem;
  font-weight: 500;
  color: #333;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.card__actions-container--icon.active {
  color: #ff00ae;
}

.card__actions-container--icon:hover {
  color: #ff00ae;
}
</style>
