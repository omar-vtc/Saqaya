<template>
  <div class="card">
    <div class="card__title-container">
      <h3 class="card__title-container--title">Product Name</h3>
    </div>
    <div class="card__img-container">
      <div class="card__img-container--img"></div>
    </div>
    <div class="card__description-container"></div>
    <div class="card__actions-container"></div>
  </div>
</template>

<style>
.card {
  width: 22rem;
  height: 27rem;
  border: solid red;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

/* =========================== Product title part =================================*/
.card__title-container {
  width: 100%;
  border: solid rebeccapurple;
  padding: 0.5rem;
  flex: 0.5;
}

.card__title-container--title {
  border: solid saddlebrown;
}

/* =========================== Product image part =================================*/

.card__img-container {
  flex: 4;
  border: solid blue;
}

/* =========================== Product description part =================================*/

.card__description-container {
  flex: 2;
  border: solid black;
}
/* =========================== Product actions part =================================*/
.card__actions-container {
  border: solid green;
  flex: 1;
}
</style>
