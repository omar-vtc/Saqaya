<script setup lang="ts">
import ListOfActionIcons from "../shared/components/molecules/ListOfActionIcons.vue";
import { defineProps } from "vue";

const props = defineProps<{
  title?: string;
  price?: number;
  description?: string;
  imageSrc?: string;
}>();
</script>

<template>
  <div class="card">
    <div class="card__title-container">
      <h3 class="card__title-container--title">{{ props.title }}</h3>
      <h3 class="card__title-container--price">{{ props.price }}$</h3>
    </div>
    <div class="card__img-container">
      <div class="card__img-container--img">
        <!-- <img src="../assets/img/apple17.png" alt="" /> -->
        <img :src="props.imageSrc" alt="" />
      </div>
    </div>
    <div class="card__description-container">
      <p>
        {{ props.description }}
      </p>
    </div>
    <ListOfActionIcons
      className="card__actions-container"
      iconClass="card__actions-container--icon"
      :icons="[
        { name: 'fa-regular fa-heart' },
        { name: 'fa-solid fa-cart-plus' },
        { name: ['far', 'square-plus'] },
      ]"
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

.card__actions-container--icon:hover {
  color: #ff00ae;
}
</style>
