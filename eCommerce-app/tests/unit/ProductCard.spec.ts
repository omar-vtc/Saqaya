import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import ProductCard from "../../src/components/ProductCard.vue";

// Mock product
const mockProduct = {
  id: 1,
  title: "Test Product",
  price: 99.99,
  description: "A test product description",
  imageSrc: "https://example.com/image.jpg",
};

// Mock Vuex store
const cartItemsMock = [mockProduct];

const createWrapper = (cartItems = cartItemsMock, dispatch = vi.fn()) => {
  return mount(ProductCard, {
    props: {
      ...mockProduct,
    },
    global: {
      mocks: {
        $store: {
          getters: {
            "cart/cartItems": cartItems,
          },
          dispatch,
        },
      },
    },
  });
};

describe("ProductCard.vue", () => {
  let dispatchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    dispatchMock = vi.fn();
  });

  it("renders product title, price, image, and description", () => {
    const wrapper = createWrapper(cartItemsMock, dispatchMock);

    expect(wrapper.text()).toContain(mockProduct.title);
    expect(wrapper.text()).toContain(`${mockProduct.price}$`);
    expect(wrapper.find("img").attributes("src")).toBe(mockProduct.imageSrc);
    expect(wrapper.text()).toContain(mockProduct.description);
  });

  it("calls removeProductFromCart when product is already in cart and cart icon clicked", async () => {
    const wrapper = createWrapper(cartItemsMock, dispatchMock);

    const cartIcon = wrapper.find(".card__actions-container--icon.active");
    await cartIcon.trigger("click");

    expect(dispatchMock).toHaveBeenCalledWith(
      "cart/removeProductFromCart",
      mockProduct.id
    );
  });

  it("calls addProductToCart when product is not in cart and cart icon clicked", async () => {
    const wrapper = createWrapper([], dispatchMock);

    const cartIcon = wrapper.findAll(".card__actions-container--icon")[1];
    await cartIcon.trigger("click");

    expect(dispatchMock).toHaveBeenCalledWith("cart/addProductToCart", {
      id: mockProduct.id,
      name: mockProduct.title,
      price: mockProduct.price,
      description: mockProduct.description,
      image: mockProduct.imageSrc,
    });
  });

  it("emits 'card-click' when card is clicked outside icons", async () => {
    const wrapper = createWrapper([], dispatchMock);

    await wrapper.trigger("click");

    expect(wrapper.emitted("card-click")).toBeTruthy();
    expect(wrapper.emitted("card-click")?.[0]).toEqual([mockProduct.id]);
  });

  it("does NOT emit 'card-click' when clicking an icon", async () => {
    const wrapper = createWrapper([], dispatchMock);

    const icon = wrapper.find(".card__actions-container--icon");
    await icon.trigger("click");

    expect(wrapper.emitted("card-click")).toBeFalsy();
  });
});
