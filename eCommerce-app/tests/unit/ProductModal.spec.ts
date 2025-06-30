import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import ProductModal from "../../src/components/ProductModal.vue";

const mockProduct = {
  id: 1,
  name: "Sample Product",
  price: 49.99,
  description: "A very nice product",
  image: "https://example.com/image.jpg",
  category: "electronics",
  rating: {
    rate: 4.3,
    count: 120,
  },
};

describe("ProductModal.vue", () => {
  it("renders product details when product prop is passed", () => {
    const wrapper = mount(ProductModal, {
      props: {
        product: mockProduct,
      },
    });

    expect(wrapper.text()).toContain(mockProduct.name);
    expect(wrapper.text()).toContain(mockProduct.description);
    expect(wrapper.text()).toContain(mockProduct.category);
    expect(wrapper.text()).toContain(mockProduct.rating.rate.toString());
    expect(wrapper.text()).toContain(mockProduct.rating.count.toString());
    expect(wrapper.text()).toContain(`$${mockProduct.price}`);
    expect(wrapper.find("img").attributes("src")).toBe(mockProduct.image);
  });

  it("does not render anything if product prop is not provided", () => {
    const wrapper = mount(ProductModal, {
      props: {
        product: undefined,
      },
    });

    expect(wrapper.find(".overlay").exists()).toBe(false);
    expect(wrapper.find(".overlay__content").exists()).toBe(false);
  });

  it("emits 'close' when close button is clicked", async () => {
    const wrapper = mount(ProductModal, {
      props: {
        product: mockProduct,
      },
    });

    await wrapper.find(".overlay__close").trigger("click");
    expect(wrapper.emitted("close")).toBeTruthy();
  });

  it("emits 'close' when clicking outside modal content", async () => {
    const wrapper = mount(ProductModal, {
      props: {
        product: mockProduct,
      },
    });

    await wrapper.find(".overlay").trigger("click");
    expect(wrapper.emitted("close")).toBeTruthy();
  });

  it("does not emit 'close' when clicking inside modal content", async () => {
    const wrapper = mount(ProductModal, {
      props: {
        product: mockProduct,
      },
    });

    await wrapper.find(".overlay__content").trigger("click");
    expect(wrapper.emitted("close")).toBeFalsy();
  });
});
