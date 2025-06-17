import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Products from "../views/Products.vue";
import ContactUs from "../views/ContactUs.vue";
import Cart from "../views/Cart.vue";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/", redirect: "/home" },
  { path: "/products", name: "Products", component: Products },
  { path: "/contact-us", name: "ContactUs", component: ContactUs },
  { path: "/cart", name: "Cart", component: Cart },
  { path: "/home", name: "Home", component: Home },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
