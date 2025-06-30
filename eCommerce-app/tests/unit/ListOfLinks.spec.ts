import { mount } from "@vue/test-utils";
import NavList from "../../src/shared/components/molecules/NavList.vue";
import LinkRouter from "../../src/shared/components/atoms/LinkRouter.vue";
import { describe, expect, it } from "vitest";

describe("NavList.vue", () => {
  it("renders the correct number of LinkRouter items", () => {
    const wrapper = mount(NavList, {
      global: {
        stubs: {
          LinkRouter: {
            template: '<div class="stub">Link</div>',
          },
        },
      },
    });

    const items = wrapper.findAllComponents(LinkRouter);
    expect(items.length).toBe(3); // Home, Products, Contact Us
  });

  it("applies the correct classes from props", () => {
    const wrapper = mount(NavList, {
      props: {
        divClassName: "wrapper",
        className: "link-list",
        eleClassName: "link-item",
      },
      global: {
        stubs: {
          LinkRouter: true,
        },
      },
    });

    expect(wrapper.find("div").classes()).toContain("wrapper");
    expect(wrapper.find("ul").classes()).toContain("link-list");
    const items = wrapper.findAll("li");
    items.forEach((item) => {
      expect(item.classes()).toContain("link-item");
    });
  });

  it("matches snapshot", () => {
    const wrapper = mount(NavList, {
      global: {
        stubs: {
          LinkRouter: true,
        },
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
