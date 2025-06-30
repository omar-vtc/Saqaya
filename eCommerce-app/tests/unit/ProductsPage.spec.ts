import { mount, flushPromises } from "@vue/test-utils";
import ProductsPage from "../../src/views/Products.vue";
import { describe, it, expect, vi, beforeEach } from "vitest";
import type Product from "../../src/data/entities/Product";

// Mock data
const mockProducts: Product[] = [
  {
    id: 1,
    name: "Product A",
    price: 50,
    description: "Description A",
    image: "a.jpg",
    category: "electronics",
    rating: { rate: 4.1, count: 100 },
  },
  {
    id: 2,
    name: "Product B",
    price: 30,
    description: "Description B",
    image: "b.jpg",
    category: "books",
    rating: { rate: 4.5, count: 80 },
  },
  {
    id: 3,
    name: "Product C",
    price: 70,
    description: "Description C",
    image: "c.jpg",
    category: "clothing",
    rating: { rate: 3.9, count: 50 },
  },
];

// Mocks
const dispatchMock = vi.fn();
const gettersMock = {
  "products/allProducts": mockProducts,
  "products/getProductById": (id: number) =>
    mockProducts.find((p) => p.id === id),
  "cart/cartItems": [], // ✅ Fix: mock cart module to avoid 'undefined.some'
};

const createWrapper = () =>
  mount(ProductsPage, {
    global: {
      mocks: {
        $store: {
          dispatch: dispatchMock,
          getters: gettersMock,
        },
      },
    },
  });

describe("ProductsPage.vue", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("dispatches loadProducts on mount", () => {
    createWrapper();
    expect(dispatchMock).toHaveBeenCalledWith("products/loadProducts");
  });

  it("renders all products by default", () => {
    const wrapper = createWrapper();
    const cards = wrapper.findAllComponents({ name: "ProductCard" });
    expect(cards).toHaveLength(mockProducts.length);
  });

  it("sorts products ascending by price when sortOrder is 'asc'", async () => {
    const wrapper = createWrapper();
    await wrapper.setData({ sortOrder: "asc" });

    const sortedPrices = wrapper.vm.sortedProducts.map((p: Product) => p.price);
    expect(sortedPrices).toEqual([30, 50, 70]);
  });

  it("sorts products descending by price when sortOrder is 'desc'", async () => {
    const wrapper = createWrapper();
    await wrapper.setData({ sortOrder: "desc" });

    const sortedPrices = wrapper.vm.sortedProducts.map((p: Product) => p.price);
    expect(sortedPrices).toEqual([70, 50, 30]);
  });

  it("opens product modal when a product card emits 'card-click'", async () => {
    const wrapper = createWrapper();
    const card = wrapper.findAllComponents({ name: "ProductCard" })[0];

    await card.vm.$emit("card-click", 1);
    await flushPromises();

    expect(wrapper.vm.selectedProductId).toBe(1);
    expect(wrapper.findComponent({ name: "ProductModal" }).exists()).toBe(true);
  });

  it("closes product modal when ProductModal emits 'close'", async () => {
    const wrapper = createWrapper();
    await wrapper.setData({ selectedProductId: 2 });

    await wrapper.findComponent({ name: "ProductModal" }).vm.$emit("close");
    expect(wrapper.vm.selectedProductId).toBe(null);
  });
});
