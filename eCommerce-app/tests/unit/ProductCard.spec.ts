/// <reference types="vitest" />
import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import ProductCard from "../../src/components/ProductCard.vue";
import { useCartStore } from "../../src/shared/store/pinia"; // adjust the path to your Pinia cart store

// Mock product
const mockProduct = {
  id: 1,
  title: "Test Product",
  price: 99.99,
  description: "A test product description",
  imageSrc: "https://example.com/image.jpg",
};

const createWrapper = (
  cartItems = [],
  customCartStore?: ReturnType<typeof useCartStore>
) => {
  const pinia = createPinia();
  setActivePinia(pinia);
  const cartStore = useCartStore();

  if (customCartStore) {
    Object.assign(cartStore, customCartStore);
  } else {
    cartStore.items = cartItems;
    cartStore.addToCart = vi.fn();
    cartStore.removeFromCart = vi.fn();
  }

  return mount(ProductCard, {
    props: {
      ...mockProduct,
    },
    global: {
      plugins: [pinia],
      stubs: {
        "font-awesome-icon": true,
      },
    },
  });
};

describe("ProductCard.vue", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders product title, price, image, and description", () => {
    const wrapper = createWrapper();

    expect(wrapper.text()).toContain(mockProduct.title);
    expect(wrapper.text()).toContain(`${mockProduct.price}$`);
    expect(wrapper.find("img").attributes("src")).toBe(mockProduct.imageSrc);
    expect(wrapper.text()).toContain(mockProduct.description);
  });

  it("calls removeFromCart when product is in cart and cart icon is clicked", async () => {
    const wrapper = createWrapper([
      {
        id: 1,
        name: mockProduct.title,
        price: mockProduct.price,
        image: mockProduct.imageSrc,
      },
    ]);

    const cartStore = useCartStore();

    const cartIcon = wrapper.find(".card__actions-container--icon.active");
    await cartIcon.trigger("click");

    expect(cartStore.removeFromCart).toHaveBeenCalledWith(mockProduct.id);
  });

  it("calls addToCart when product is not in cart and cart icon is clicked", async () => {
    const wrapper = createWrapper([]);

    const cartStore = useCartStore();

    const cartIcon = wrapper.findAll(".card__actions-container--icon")[1];
    await cartIcon.trigger("click");

    expect(cartStore.addToCart).toHaveBeenCalledWith({
      id: mockProduct.id,
      name: mockProduct.title,
      price: mockProduct.price,
      description: mockProduct.description,
      image: mockProduct.imageSrc,
    });
  });

  it("emits 'card-click' when card is clicked outside icons", async () => {
    const wrapper = createWrapper([]);

    await wrapper.trigger("click");

    expect(wrapper.emitted("card-click")).toBeTruthy();
    expect(wrapper.emitted("card-click")?.[0]).toEqual([mockProduct.id]);
  });

  it("does NOT emit 'card-click' when clicking an icon", async () => {
    const wrapper = createWrapper([]);

    const icon = wrapper.find(".card__actions-container--icon");
    await icon.trigger("click");

    expect(wrapper.emitted("card-click")).toBeFalsy();
  });
});
