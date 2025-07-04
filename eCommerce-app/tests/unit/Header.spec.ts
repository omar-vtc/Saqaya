import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useCartStore } from "../../src/shared/store/pinia/index";
import Header from "../../src/shared/components/molecules/Header.vue";
import ListOfActionIcons from "../../src/shared/components/molecules/ListOfActionIcons.vue";
import ActionIcon from "../../src/shared/components/atoms/ActionIcon.vue";

// Mock cart items
const mockCartItems = [
  { id: 1, name: "P1", price: 10, image: "" },
  { id: 2, name: "P2", price: 20, image: "" },
  { id: 3, name: "P3", price: 30, image: "" },
];

let pinia: ReturnType<typeof createPinia>;

function createWrapperWithCart(items = mockCartItems) {
  pinia = createPinia();
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
}

describe("Header.vue", () => {
  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
  });

  it("renders core components", () => {
    const wrapper = createWrapperWithCart([]);
    const icons = wrapper.findAllComponents(ActionIcon);
    const iconProps = icons.map((el) => el.props("IconClass"));
    expect(iconProps).toEqual(
      expect.arrayContaining(["magnifying-glass", "shopping-cart"])
    );
  });

  it("toggles cart drawer when shopping-cart icon is clicked", async () => {
    const wrapper = createWrapperWithCart([
      { id: 1, name: "Test", price: 20, image: "" },
    ]);
    const cartIcon = wrapper.find('[data-testid="icon-shopping-cart"]');
    expect(cartIcon.exists()).toBe(true);

    await cartIcon.trigger("click");
    await wrapper.vm.$nextTick();

    const cartDrawer = wrapper.find(".cart-drawer");
    expect(cartDrawer.exists()).toBe(true);
  });

  it("displays correct cart item count in badge", () => {
    const wrapper = createWrapperWithCart(mockCartItems);
    const badge = wrapper.find(
      '[data-testid="icon-shopping-cart"] .icon-badge'
    );
    expect(badge.exists()).toBe(true);
    expect(badge.text()).toBe(String(mockCartItems.length));
  });
});
