
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
│   │       ├── organisms/
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

- Uses a persistent layout with:
  - `Header.vue`
  - `Footer.vue`
- `router-view` dynamically renders page components
- Padding is added to avoid overlap with fixed header

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

#### Features

- Logo
- Nav links (desktop)
- Hamburger menu (mobile)
- Cart drawer toggle

#### Logic

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

Renders a row of `ActionIcon` buttons with optional click handlers.

#### Props

| Prop        | Type             | Required | Description                              |
|-------------|------------------|----------|------------------------------------------|
| `className` | `string`         | No       | Container class                           |
| `iconClass` | `string`         | No       | Default icon class                        |
| `icons`     | `IconItem[]`     | ✅ Yes   | Array of icons with optional click events |

```ts
type IconItem = {
  name: string | [string, string];
  onClick?: () => void;
  class?: string;
  badgeCount?: number;
  [key: string]: unknown;
};
```

#### Example

```vue
<ListOfActionIcons
  className="header__actions"
  iconClass="action-icon"
  :icons="[
    { name: 'magnifying-glass' },
    {
      name: 'shopping-cart',
      onClick: toggleCartDrawer,
      badgeCount: cartItems.length
    },
    { name: 'right-to-bracket' }
  ]"
/>
```

---

### NavList.vue

A basic vertical or horizontal list of navigation links.

```vue
<template>
  <div :class="props.divClassName">
    <ul :class="props.className">
      <li :class="props.eleClassName">
        <LinkRouter :to="'/'" class-name="list-item__ele" value="Home" />
      </li>
      <li :class="props.eleClassName">
        <LinkRouter :to="'/products'" class-name="list-item__ele" value="Products" />
      </li>
      <li :class="props.eleClassName">
        <LinkRouter :to="'/contact-us'" class-name="list-item__ele" value="Contact Us" />
      </li>
    </ul>
  </div>
</template>
```

---

### Cart.vue

Shows cart contents in a right drawer.

#### Logic

```ts
const props = defineProps<{ isOpen: boolean }>();
const emit = defineEmits<{ (e: "close"): void }>();

const cartStore = useCartStore();
const cartItems = computed(() => cartStore.cartItems);
const totalPrice = computed(() => cartStore.totalPrice);

function handleRemove(id: number) {
  cartStore.removeFromCart(id);
}
```

#### Template Snippet

```vue
<Cart :isOpen="isCartOpen" @close="toggleCartDrawer" />
```

- Displays cart items
- Shows total price
- Supports removing items and closing cart drawer

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
    totalPrice: (state) => state.items.reduce((sum, item) => sum + item.price, 0),
  },
  actions: {
    addToCart(product) { this.items.push(product); },
    removeFromCart(id) { this.items = this.items.filter(item => item.id !== id); }
  },
  persist: import.meta.env.MODE !== "test"
});
```

### useProductStore

Fetches and stores product list.

```ts
export const useProductStore = defineStore("products", {
  state: () => ({ products: [] }),
  getters: {
    allProducts: (state) => state.products,
    getProductById: (state) => (id) => state.products.find((p) => p.id === id),
  },
  actions: {
    setProducts(newProducts) { this.products = newProducts; },
    async loadProducts() {
      const loadedProducts = await fetchProducts();
      this.setProducts(loadedProducts);
    }
  }
});
```
