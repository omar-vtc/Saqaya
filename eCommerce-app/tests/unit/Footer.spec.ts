import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Footer from "../../src/shared/components/molecules/Footer.vue";
import GridItem from "../../src/shared/components/atoms/GridItem.vue";
import ListOfActionIcons from "../../src/shared/components/molecules/ListOfActionIcons.vue";

describe("Footer.vue", () => {
  it("renders all GridItem components with correct text", () => {
    const wrapper = mount(Footer);

    const gridItems = wrapper.findAllComponents(GridItem);
    expect(gridItems).toHaveLength(15); // 15 GridItems

    const expectedTexts = [
      "Navigate",
      "Collection",
      "Categories",
      "About Us",
      "New Arrivals",
      "Men",
      "Blog",
      "Featured",
      "Women",
      "Contact",
      "Sale",
      "Kids",
      "FAQ",
      "Best Sellers",
      "Accessories",
    ];

    const actualTexts = gridItems.map((item) => item.text());
    expect(actualTexts).toEqual(expectedTexts);
  });

  it("renders the contact information", () => {
    const wrapper = mount(Footer);

    expect(wrapper.text()).toContain(
      "399 Nadi Elseid Road, Dokki District 4587"
    );
    expect(wrapper.text()).toContain("Saqaya@saqaya.com");
    expect(wrapper.text()).toContain("+44 123456678");
  });

  it("renders copyright notice", () => {
    const wrapper = mount(Footer);

    expect(wrapper.find(".social__copy-right").text()).toContain(
      "© 2025 Saqaya"
    );
  });

  it("renders 4 social media icons", () => {
    const wrapper = mount(Footer);
    const icons = wrapper.findComponent(ListOfActionIcons).props("icons");

    expect(Array.isArray(icons)).toBe(true);
    expect(icons).toHaveLength(4);
    expect(icons.map((i: any) => i.name)).toEqual([
      ["fab", "square-instagram"],
      ["fab", "square-facebook"],
      ["fab", "linkedin"],
      ["fab", "square-x-twitter"],
    ]);
  });
});
