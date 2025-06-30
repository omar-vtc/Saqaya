import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Logo from "../../src/shared/components/atoms/Logo.vue";

describe("Logo.vue", () => {
  it("renders correctly", () => {
    const wrapper = mount(Logo);
    const img = wrapper.find("img");

    expect(img.exists()).toBe(true);
    expect(img.attributes("src")).toContain("logo2.png");
    expect(img.attributes("alt")).toBe("Logo");
  });

  it("applies passed className and imgClassName props", () => {
    const wrapper = mount(Logo, {
      props: {
        className: "wrapper-class",
        imgClassName: "image-class",
      },
    });

    const wrapperDiv = wrapper.find("div");
    const img = wrapper.find("img");

    expect(wrapperDiv.classes()).toContain("wrapper-class");
    expect(img.classes()).toContain("image-class");
  });
});
