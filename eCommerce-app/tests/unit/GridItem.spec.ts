import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import GridItem from "../../src/shared/components/atoms/GridItem.vue"; // Adjust the path as needed

describe("GridItem.vue", () => {
  it("renders slot content", () => {
    const wrapper = mount(GridItem, {
      slots: {
        default: "<span>Test Content</span>",
      },
    });

    expect(wrapper.text()).toContain("Test Content");
  });

  it("applies passed className and prefixClassName", () => {
    const wrapper = mount(GridItem, {
      props: {
        className: "custom-class",
        prefixClassName: "prefix-class",
      },
    });

    expect(wrapper.classes()).toContain("custom-class");
    expect(wrapper.classes()).toContain("prefix-class");
  });
});
