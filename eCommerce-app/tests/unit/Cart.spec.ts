import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia, type Pinia } from "pinia";
import Cart from "../../src/shared/components/molecules/Cart.vue";
import { useCartStore } from "../../src/shared/store/pinia/index";

// Mock cart items
const mockCartItems = [
  { id: 1, name: "Product A", price: 100, image: "a.jpg" },
  { id: 2, name: "Product B", price: 150, image: "b.jpg" },
];

let cartStore: ReturnType<typeof useCartStore>;
let pinia: Pinia;

const createWrapper = (isOpen = true) =>
  mount(Cart, {
    global: {
      plugins: [pinia],
    },
    props: {
      isOpen,
    },
  });

describe("Cart.vue", () => {
  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
    cartStore = useCartStore();
    cartStore.$patch({ items: [...mockCartItems] });
  });

  it("renders when isOpen is true", () => {
    const wrapper = createWrapper(true);
    expect(wrapper.find(".cart-drawer").exists()).toBe(true);
  });

  it("renders all cart items", () => {
    const wrapper = createWrapper();
    const items = wrapper.findAll(".cart-product-card");
    expect(items).toHaveLength(mockCartItems.length);
  });

  it("displays correct total price", () => {
    const wrapper = createWrapper();
    const total = mockCartItems.reduce((sum, item) => sum + item.price, 0);
    const totalText = wrapper.find(".cart-total__amount");
    expect(totalText.exists()).toBe(true);
    expect(totalText.text()).toBe(`${total}$`);
  });

  it("emits close event when close button is clicked", async () => {
    const wrapper = createWrapper();
    const closeBtn = wrapper.find(".close-btn");
    expect(closeBtn.exists()).toBe(true);
    await closeBtn.trigger("click");
    expect(wrapper.emitted("close")).toBeTruthy();
  });

  it("calls removeProductFromCart when remove button is clicked", async () => {
    const spy = vi.spyOn(cartStore, "removeFromCart");
    const wrapper = createWrapper();
    const removeButtons = wrapper.findAll(".cart-product-card__remove");
    expect(removeButtons.length).toBeGreaterThan(0);
    await removeButtons[0].trigger("click");
    expect(spy).toHaveBeenCalledWith(mockCartItems[0].id);
  });

  it("does not render drawer if isOpen is false", () => {
    const wrapper = createWrapper(false);
    expect(wrapper.find(".cart-drawer").exists()).toBe(false);
  });
});
