<template>
  <div class="card">
    <div class="card__title-container">
      <h3 class="card__title-container--title">Product Name</h3>
    </div>
    <div class="card__img-container">
      <div class="card__img-container--img">
        <img src="../assets/img/apple17.png" alt="" />
      </div>
    </div>
    <div class="card__description-container">
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error
        perferendis ipsa, odio, illum consectetur voluptatum eligendi quod
      </p>
    </div>
    <div class="card__actions-container">
      <div class="action-icon">
        <font-awesome-icon icon="fa-regular fa-heart" />
      </div>
      <div class="action-icon">
        <font-awesome-icon icon="fa-solid fa-cart-plus" />
      </div>
      <div class="action-icon">
        <font-awesome-icon :icon="['far', 'square-plus']" />
      </div>
    </div>
  </div>
</template>

<style scoped>
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
}

.card__title-container--title {
  /* border: solid saddlebrown; */
}

/* =========================== Product image part =================================*/

.card__img-container {
  flex: 4;
  /* border: solid blue; */
  padding: 0.2rem;
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
}

/* =========================== Product description part =================================*/

.card__description-container {
  flex: 2;
  /* border: solid black; */
  padding: 0.5rem;
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

.action-icon {
  font-size: 1.2rem;
  font-weight: 500;
  color: #333;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.action-icon:hover {
  color: #ff00ae;
}
</style>
