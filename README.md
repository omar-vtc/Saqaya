# Saqaya Ecommerce App

A modern eCommerce frontend built with **Vue 3**, **TypeScript**, **Pinia**, and **Vue Router**. This app is designed with scalability, reusability, and performance in mind, showcasing product listings, cart functionality, and a responsive layout.

---

## 📁 Project Structure

```bash
├── public/                 # Static assets
├── src/
│   ├── assets/             # Images, fonts, etc.
│   ├── components/         # UI components
│   │   ├── products/
│   │   ├── ProductsModal/
│   ├── data/               # Product/entity models
│   ├── shared/
│   │   └── components/
│   │       ├── atoms/
│   │       ├── molecules/
│   ├── store/              # Pinia store
│   ├── pages/              # Page views
│   ├── router/             # Vue Router config
│   ├── tests/              # Unit tests (Vitest)
│   ├── App.vue             # Root component
│   └── main.ts             # App bootstrap
├── vite.config.ts          # Vite config
└── package.json
```

---

## 🧩 Components and Functionality

### Layout

Uses a persistent layout with:

- `Header.vue`
- `Footer.vue`

```vue
<template>
  <div class="app">
    <Header />
    <main class="main page-content">
      <router-view />
    </main>
    <Footer />
  </div>
</template>
```

---

## 🔹 Atoms

### ActionIcon.vue

Reusable action button that triggers events

```ts
<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  className?: string;
  IconClass: string | [string, string];
  onClick?: () => void;
  badgeCount?: number;
}>();
</script>
```

---

## 🔸 Molecules

### Header.vue

- Logo
- Nav links (desktop)
- Hamburger menu (mobile)
- Cart drawer toggle

```ts
const isDrawerOpen = ref(false);
const isCartOpen = ref(false);

function toggleDrawer() {
  if (isCartOpen.value) isCartOpen.value = false;
  isDrawerOpen.value = !isDrawerOpen.value;
}

function toggleCartDrawer() {
  if (isDrawerOpen.value) isDrawerOpen.value = false;
  isCartOpen.value = !isCartOpen.value;
}
```

---

### ListOfActionIcons.vue

Renders a row of icons with events.

```ts
type IconItem = {
  name: string | [string, string];
  onClick?: () => void;
  class?: string;
  badgeCount?: number;
};
```

---

## 📦 Pinia Stores

### useCartStore

Handles shopping cart state and logic.

```ts
export const useCartStore = defineStore("cart", {
  state: () => ({ items: [] }),
  getters: {
    cartItems: (state) => state.items,
    cartCount: (state) => state.items.length,
    totalPrice: (state) =>
      state.items.reduce((sum, item) => sum + item.price, 0),
  },
  actions: {
    addToCart(product) {
      this.items.push(product);
    },
    removeFromCart(id) {
      this.items = this.items.filter((item) => item.id !== id);
    },
  },
  persist: import.meta.env.MODE !== "test",
});
```

### useProductStore

Fetches and stores product list.

```ts
export const useProductStore = defineStore("products", {
  state: () => ({ products: [] }),
  getters: {
    allProducts: (state) => state.products,
    getProductById: (state) => (id) =>
      state.products.find((product) => product.id === id),
  },
  actions: {
    setProducts(newProducts) {
      this.products = newProducts;
    },
    async loadProducts() {
      const loadedProducts = await fetchProducts();
      this.setProducts(loadedProducts);
    },
  },
});
```

---

## 🧱 Main Components

### ProductCard.vue

Displays a product with title, price, image, and action icons.

- Emits: `card-click`
- Highlights if in cart
- Toggles cart on icon click

```ts
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
    id: props.id,
    name: props.title,
    price: props.price,
    description: props.description,
    image: props.imageSrc,
  };

  isInCart.value
    ? cartStore.removeFromCart(product.id)
    : cartStore.addToCart(product);
}
```

---

### ProductModal.vue

Displays a detailed view of a product in a modal overlay.

#### Props

- `product` (`Product | undefined`) — Optional, displays content if present

#### Emits

- `close` — Emitted when background or close button is clicked

```vue
<template>
  <div v-if="product" class="overlay" @click.self="$emit('close')">
    <div class="overlay__content">
      <button class="overlay__close" @click="$emit('close')">×</button>
      <h2>{{ product.name }}</h2>
      <img :src="product.image" alt="Product Image" />
      <p>{{ product.description }}</p>
      <p><strong>Category:</strong> {{ product.category }}</p>
      <p>
        <strong>Rating:</strong> {{ product.rating?.rate }} ⭐ ({{
          product.rating?.count
        }} reviews)
      </p>
      <p><strong>Price:</strong> ${{ product.price }}</p>
    </div>
  </div>
</template>
```

#### Styles

```css
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.overlay__content {
  background: #fff;
  padding: 2rem;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 10px;
  position: relative;
  animation: fadeIn 0.3s ease-in-out;
}

.overlay__close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.overlay__content img {
  max-width: 100%;
  margin: 1rem 0;
  border-radius: 8px;
}
```

---

