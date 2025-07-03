/// <reference types="vitest" />
import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { useCartStore } from "../../src/shared/store/pinia"; // adjust path to your Pinia store
import Header from "../../src/shared/components/molecules/Header.vue";
import ListOfActionIcons from "../../src/shared/components/molecules/ListOfActionIcons.vue";
import ActionIcon from "../../src/shared/components/atoms/ActionIcon.vue";

// Mock product type
type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

// Helper to create a fresh pinia instance and prefill the cart
const mountHeaderWithCart = (items: Product[]) => {
  const pinia = createPinia();
  setActivePinia(pinia);
  const cartStore = useCartStore();
  cartStore.$patch({ items });

  return mount(Header, {
    global: {
      plugins: [pinia],
      components: {
        ActionIcon,
        ListOfActionIcons,
      },
      stubs: {
        "font-awesome-icon": true,
        "router-link": true,
      },
    },
  });
};

describe("Header.vue", () => {
  it("renders core components", () => {
    const wrapper = mountHeaderWithCart([]);

    expect(wrapper.findComponent({ name: "Logo" }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: "NavList" }).exists()).toBe(true);

    const icons = wrapper.findAllComponents(ActionIcon);
    const iconProps = icons.map((el) => el.props("IconClass"));
    expect(iconProps).toEqual(
      expect.arrayContaining(["magnifying-glass", "shopping-cart"])
    );
  });

  it("toggles cart drawer when shopping-cart icon is clicked", async () => {
    const wrapper = mountHeaderWithCart([
      { id: 1, name: "Product 1", price: 100, image: "test.jpg" },
    ]);

    const cartButton = wrapper.find('[data-testid="icon-shopping-cart"]');
    expect(cartButton.exists()).toBe(true);

    await cartButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(wrapper.find(".cart-drawer").exists()).toBe(true);
  });

  it("displays correct cart item count in badge", () => {
    const wrapper = mountHeaderWithCart([
      { id: 1, name: "P1", price: 10, image: "" },
      { id: 2, name: "P2", price: 20, image: "" },
      { id: 3, name: "P3", price: 30, image: "" },
    ]);

    const badge = wrapper.find(
      '[data-testid="icon-shopping-cart"] .icon-badge'
    );
    expect(badge.exists()).toBe(true);
    expect(badge.text()).toBe("3");
  });
});
