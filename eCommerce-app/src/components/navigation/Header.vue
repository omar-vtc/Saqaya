<template>
  <div class="header">
    <div class="header__logo">
      <img src="../../assets//img/logo2.png" alt="" />
    </div>
    <div class="header__list-container">
      <ul class="header__list">
        <li class="header__list-item"><p class="list-item__ele">Home</p></li>
        <li class="header__list-item">
          <p class="list-item__ele">Products</p>
        </li>
        <li class="header__list-item">
          <p class="list-item__ele">Contact Us</p>
        </li>
      </ul>
    </div>
    <div class="header__actions">actions div</div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.header {
  width: 100%;
  height: 6rem;
  border: solid;
  display: flex;
  justify-content: space-between;
  padding: 0 2rem;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.header__logo {
  flex: 1;
  height: inherit;
  border: solid red;
  display: flex;
  justify-content: center;
}

.header__list-container {
  flex: 5;
  height: inherit;
  border: solid blue;
  display: flex;
  align-items: center;
  /* justify-content: center; */
}

.header__actions {
  flex: 1;
  height: inherit;
  border: solid green;
}

.header__list {
  list-style: none;
  display: flex;
  gap: 2.5rem;
  border: solid;
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
  /* border: solid green; */
  border-radius: 7px;
}

.header__list-item .list-item__ele:hover {
  color: #ff00ae;
  background-color: #6e6d6d1c;
}

.header__logo img {
  border: solid;
  object-fit: contain;
}
</style>
