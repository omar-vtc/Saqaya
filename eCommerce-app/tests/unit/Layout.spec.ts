/// <reference types="vitest" />
import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import Layout from "../../src/layouts/Layout.vue";
import Header from "../../src/shared/components/molecules/Header.vue";
import Footer from "../../src/shared/components/molecules/Footer.vue";
import { useCartStore } from "../../src/shared/store/pinia/index";
import { createRouter, createWebHistory } from "vue-router";

// Stub for font-awesome-icon
const FontAwesomeIconStub = {
  name: "FontAwesomeIcon",
  template: "<i />",
};

// Create mock router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: { template: "<div>Home View</div>" } },
    { path: "/products", component: { template: "<div>Products View</div>" } },
    { path: "/contact-us", component: { template: "<div>Contact View</div>" } },
  ],
});

describe("Layout.vue", () => {
  beforeEach(() => {
    const pinia = createPinia();
    setActivePinia(pinia);

    // Optional: preload the cart store with items
    const cartStore = useCartStore();
    cartStore.$patch({
      items: [{ id: 1, name: "Mock Item", price: 10, image: "x.png" }],
    });
  });

  it("renders Header, router-view, and Footer", async () => {
    const wrapper = mount(Layout, {
      global: {
        plugins: [createPinia(), router],
        stubs: {
          FontAwesomeIcon: FontAwesomeIconStub,
        },
        components: {
          Header,
          Footer,
        },
      },
    });

    await router.isReady();

    expect(wrapper.findComponent(Header).exists()).toBe(true);
    expect(wrapper.find("main").exists()).toBe(true);
    expect(wrapper.findComponent(Footer).exists()).toBe(true);

    // Verify content inside <router-view>
    expect(wrapper.html()).toContain("Home View");
  });
});
