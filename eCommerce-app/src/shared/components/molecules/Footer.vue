<script setup lang="ts">
import GridItem from "../atoms/GridItem.vue";
import Grid from "../molecules/Grid.vue";
import ListOfActionIcons from "./ListOfActionIcons.vue";
</script>

<template>
  <footer class="footer">
    <Grid>
      <GridItem
        prefixClassName="grid__item"
        className="grid__item--column-title"
        >Navigate</GridItem
      >
      <GridItem
        prefixClassName="grid__item"
        className="grid__item--column-title"
        >Collection</GridItem
      >
      <GridItem
        prefixClassName="grid__item"
        className="grid__item--column-title"
        >Categories</GridItem
      >

      <GridItem prefixClassName="grid__item">About Us</GridItem>
      <GridItem prefixClassName="grid__item">New Arrivals</GridItem>
      <GridItem prefixClassName="grid__item">Men</GridItem>

      <GridItem prefixClassName="grid__item">Blog</GridItem>
      <GridItem prefixClassName="grid__item">Featured</GridItem>
      <GridItem prefixClassName="grid__item">Women</GridItem>

      <GridItem prefixClassName="grid__item">Contact</GridItem>
      <GridItem prefixClassName="grid__item">Sale</GridItem>
      <GridItem prefixClassName="grid__item">Kids</GridItem>

      <GridItem prefixClassName="grid__item">FAQ</GridItem>
      <GridItem prefixClassName="grid__item">Best Sellers</GridItem>
      <GridItem prefixClassName="grid__item">Accessories</GridItem>
    </Grid>
    <div class="infoContainer">
      <div class="info__title">
        <p>399 Nadi Elseid Road, Dokki District 4587</p>
      </div>
      <div class="info__email">Saqaya@saqaya.com</div>
      <div class="info__email">+44 123456678</div>
      <div class="info__email">+44 123456678</div>
    </div>
    <div class="social">
      <div class="social__copy-right">
        &copy; 2025 Saqaya. All rights reserved.
      </div>

      <!-- social media actions -->
      <ListOfActionIcons
        className="social__media"
        iconClass="social__media--icon"
        :icons="[
          { name: ['fab', 'square-instagram'] },
          { name: ['fab', 'square-facebook'] },
          { name: ['fab', 'linkedin'] },
          { name: ['fab', 'square-x-twitter'] },
        ]"
      />
    </div>
  </footer>
</template>

<style>
.footer {
  width: 100%;
  /* border: solid red; */
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  padding: 2rem;
  flex-wrap: wrap;
  background-color: #65656534;
}
.grid {
  display: grid;
  grid-template-columns: repeat(3, 0.2fr); /* 3 columns */
  grid-template-rows: repeat(5, 30px); /* 5 rows */
  gap: 1rem;
  padding: 1rem;
  /* border: solid; */
  flex: 1;
  justify-content: center;
}

.grid__item {
  text-align: center;
}

.grid__item--column-title {
  font-weight: 600;
}

.infoContainer {
  flex: 1;
  /* border: solid blue; */
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  padding: 1rem 2rem;
}

.info__title,
.info__email {
  width: 35%;
  text-align: right;
}

.info__title {
  /* border: solid blue; */
  font-weight: normal;
  font-size: 1.5rem;
}

.info__email {
  /* border: solid red; */
}
.social {
  /* border: solid green; */
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  gap: 0.3rem;
  padding-top: 1.5rem;
}

.social__copy-right {
  /* border: solid rebeccapurple; */
  font-size: 1rem;
}
.social__media {
  /* border: solid red; */
  display: flex;
  gap: 1rem;
}
.social__media--icon {
  font-size: 1.7rem;
  font-weight: 500;
  color: #333;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
  /* border: solid; */
}

.social__media--icon:hover {
  color: #ff00ae;
}
</style>
