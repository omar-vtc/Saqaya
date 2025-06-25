<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import type Product from "../data/entities/Product";
import ListOfActionIcons from "../shared/components/molecules/ListOfActionIcons.vue";

export default defineComponent({
  name: "ProductCard",
  components: {
    ListOfActionIcons,
  },
  props: {
    id: Number,
    title: String,
    price: Number,
    description: String,
    imageSrc: String,
  },
  methods: {
    handleAddToCart() {
      const product: Product = {
        id: this.id ?? 0,
        name: this.title ?? "",
        price: this.price ?? 0,
        description: this.description ?? "",
        image: this.imageSrc ?? "",
      };
      console.log("Adding product to cart:", product);
      const store = useStore();
      this.$store.dispatch("cart/addProductToCart", product);
    },
  },
  computed: {
    isInCart(): boolean {
      const items: Product[] = this.$store.getters["cart/cartItems"];
      return items.some((item) => item.id === this.id);
    },
    cartIconClass(): string {
      return this.isInCart
        ? "card__actions-container--icon active"
        : "card__actions-container--icon";
    },
    actionIcons(): any[] {
      return [
        { name: "fa-regular fa-heart" },
        {
          name: "fa-solid fa-cart-plus",
          onClick: () => this.handleAddToCart(),
          class: this.cartIconClass, // ✅ only cart icon gets dynamic class
        },
        { name: ["far", "square-plus"] },
      ];
    },
  },
});
</script>

<template>
  <div class="card">
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
