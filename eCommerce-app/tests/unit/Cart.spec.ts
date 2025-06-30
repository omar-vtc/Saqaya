import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import Cart from "../../src/shared/components/molecules/Cart.vue";

// Mock cart items
const mockCartItems = [
  { id: 1, name: "Product A", price: 100, image: "a.jpg" },
  { id: 2, name: "Product B", price: 150, image: "b.jpg" },
];

// Shared dispatch mock
const dispatchMock = vi.fn();

const createWrapper = (isOpen = true) =>
  mount(Cart, {
    global: {
      mocks: {
        $store: {
          getters: {
            "cart/cartItems": mockCartItems,
          },
          dispatch: dispatchMock,
          _modulesNamespaceMap: {
            "cart/": {
              context: {
                getters: {
                  cartItems: mockCartItems,
                },
                dispatch: dispatchMock,
              },
            },
          },
        },
      },
    },
    props: {
      isOpen,
    },
  });

describe("Cart.vue", () => {
  beforeEach(() => {
    dispatchMock.mockClear();
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
    expect(wrapper.find(".cart-total__amount").text()).toBe(`${total}$`);
  });

  it("emits close event when close button is clicked", async () => {
    const wrapper = createWrapper();
    await wrapper.find(".close-btn").trigger("click");
    expect(wrapper.emitted("close")).toBeTruthy();
  });

  it("calls removeProductFromCart when remove button is clicked", async () => {
    const wrapper = createWrapper();

    const removeButtons = wrapper.findAll(".cart-product-card__remove");
    await removeButtons[0].trigger("click");

    // Because you're using mapActions('cart', [...]), Vuex auto-handles namespacing,
    // so the dispatched action name is just the local one.
    expect(dispatchMock).toHaveBeenCalledWith(
      "removeProductFromCart",
      mockCartItems[0].id
    );
  });

  it("does not render drawer if isOpen is false", () => {
    const wrapper = createWrapper(false);
    expect(wrapper.find(".cart-drawer").exists()).toBe(false);
  });
});
