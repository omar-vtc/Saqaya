import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import { describe, it, expect, vi } from "vitest";
import Header from "../../src/shared/components/molecules/Header.vue";
import ListOfActionIcons from "../../src/shared/components/molecules/ListOfActionIcons.vue";
import ActionIcon from "../../src/shared/components/atoms/ActionIcon.vue";

// Product type
type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

const createVuexStore = (items: Product[] = []) =>
  createStore({
    modules: {
      cart: {
        namespaced: true,
        state: () => ({
          items,
        }),
        getters: {
          cartItems: (state) => state.items,
        },
        actions: {
          removeProductFromCart: vi.fn(),
        },
      },
    },
  });

describe("Header.vue", () => {
  it("renders core components", () => {
    const store = createVuexStore([]);
    const wrapper = mount(Header, {
      global: {
        plugins: [store],
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

    const icons = wrapper.findAllComponents(ActionIcon);
    const iconProps = icons.map((el) => el.props("IconClass"));
    expect(iconProps).toEqual(
      expect.arrayContaining(["magnifying-glass", "shopping-cart"])
    );
  });

  it("toggles cart drawer when shopping-cart icon is clicked", async () => {
    const store = createVuexStore([
      { id: 1, name: "Test", price: 20, image: "" },
    ]);

    const wrapper = mount(Header, {
      global: {
        plugins: [store],
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

    const cartIcon = wrapper.find('[data-testid="icon-shopping-cart"]');
    expect(cartIcon.exists()).toBe(true);

    await cartIcon.trigger("click");
    await wrapper.vm.$nextTick();

    const cartDrawer = wrapper.find(".cart-drawer");
    expect(cartDrawer.exists()).toBe(true);
  });

  it("displays correct cart item count in badge", () => {
    const store = createVuexStore([
      { id: 1, name: "P1", price: 10, image: "" },
      { id: 2, name: "P2", price: 20, image: "" },
      { id: 3, name: "P3", price: 30, image: "" },
    ]);

    const wrapper = mount(Header, {
      global: {
        plugins: [store],
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

    const badge = wrapper.find(
      '[data-testid="icon-shopping-cart"] .icon-badge'
    );
    expect(badge.exists()).toBe(true);
    expect(badge.text()).toBe("3");
  });
});
