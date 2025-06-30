/// <reference types="vitest" />
import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import Layout from "../../src/layouts/Layout.vue";
import Header from "../../src/shared/components/molecules/Header.vue";
import Footer from "../../src/shared/components/molecules/Footer.vue";
import { createStore } from "vuex";
import { createRouter, createWebHistory } from "vue-router";
import { h } from "vue";

// Stub for font-awesome-icon
const FontAwesomeIconStub = {
  name: "FontAwesomeIcon",
  template: "<i />",
};

// Define mock cart module
const cartModule = {
  namespaced: true,
  getters: {
    cartItems: () => [{ id: 1, name: "Mock Item" }],
  },
  actions: {
    removeProductFromCart: vi.fn(),
  },
};

// Create Vuex store with mocked module
const store = createStore({
  modules: {
    cart: cartModule,
  },
});

// Create minimal router setup
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: { template: "<div>Home View</div>" } },
    { path: "/products", component: { template: "<div>Products View</div>" } },
    { path: "/contact-us", component: { template: "<div>Contact View</div>" } },
  ],
});

describe("Layout.vue", () => {
  it("renders Header, router-view, and Footer", async () => {
    const wrapper = mount(Layout, {
      global: {
        plugins: [store, router],
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

    // Optional: check router-view content renders
    expect(wrapper.html()).toContain("Home View");
  });
});
