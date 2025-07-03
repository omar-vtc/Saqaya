/// <reference types="vitest" />
import { mount, flushPromises } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ProductsPage from "../../src/views/Products.vue";
import { useProductStore } from "../../src/shared/store/pinia";
import type Product from "../../src/data/entities/Product";

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Product A",
    price: 50,
    description: "Desc A",
    image: "a.jpg",
    category: "x",
    rating: { rate: 4, count: 10 },
  },
  {
    id: 2,
    name: "Product B",
    price: 30,
    description: "Desc B",
    image: "b.jpg",
    category: "y",
    rating: { rate: 5, count: 20 },
  },
  {
    id: 3,
    name: "Product C",
    price: 70,
    description: "Desc C",
    image: "c.jpg",
    category: "z",
    rating: { rate: 3, count: 5 },
  },
];

let loadProductsMock: ReturnType<typeof vi.fn>;

const createWrapper = async ({ withEmptyStore = false } = {}) => {
  const pinia = createPinia();
  setActivePinia(pinia);
  const store = useProductStore();

  loadProductsMock = vi.fn().mockResolvedValue(undefined);
  store.loadProducts = loadProductsMock;

  store.products = withEmptyStore ? [] : mockProducts;

  const wrapper = mount(ProductsPage, {
    global: {
      plugins: [pinia],
      stubs: {
        ProductCard: {
          name: "ProductCard",
          props: ["id", "title", "price", "description", "imageSrc"],
          template: `<div data-testid="product-card" @click="$emit('card-click', id)">{{ title }}</div>`,
        },
        ProductModal: {
          name: "ProductModal",
          props: ["product"],
          template: `<div data-testid="product-modal" @click="$emit('close')">Close Modal</div>`,
        },
      },
    },
  });

  await flushPromises();
  return wrapper;
};

describe("ProductsPage.vue", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("dispatches loadProducts on mount", async () => {
    await createWrapper({ withEmptyStore: true });
    expect(loadProductsMock).toHaveBeenCalled();
  });

  it("renders all products by default", async () => {
    const wrapper = await createWrapper();
    const cards = wrapper.findAll('[data-testid="product-card"]');
    expect(cards.length).toBe(mockProducts.length);
  });

  it("sorts products ascending by price when sortOrder is 'asc'", async () => {
    const wrapper = await createWrapper();
    wrapper.vm.sortOrder = "asc";
    await flushPromises();
  });

  it("sorts products descending by price when sortOrder is 'desc'", async () => {
    const wrapper = await createWrapper();
    wrapper.vm.sortOrder = "desc";
    await flushPromises();
    const cards = wrapper.findAll('[data-testid="product-card"]');
    const prices = cards.map((card) => parseFloat(card.text()));
    const sortedPrices = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sortedPrices);
  });

  it("opens product modal when a product card emits 'card-click'", async () => {
    const wrapper = await createWrapper();
    const firstCard = wrapper.find('[data-testid="product-card"]');
    await firstCard.trigger("click");
    await flushPromises();

    expect(wrapper.vm.selectedProductId).toBe(1);
    const modal = wrapper.find('[data-testid="product-modal"]');
    expect(modal.exists()).toBe(true);
  });

  it("closes product modal when ProductModal emits 'close'", async () => {
    const wrapper = await createWrapper();
    wrapper.vm.selectedProductId = 2;
    await flushPromises();

    const modal = wrapper.find('[data-testid="product-modal"]');
    await modal.trigger("click");
    await flushPromises();

    expect(wrapper.vm.selectedProductId).toBe(null);
  });
});
