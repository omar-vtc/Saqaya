import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Grid from "../../src/shared/components/molecules/Grid.vue";

describe("Grid.vue", () => {
  it("renders default slot content", () => {
    const wrapper = mount(Grid, {
      slots: {
        default: '<div class="slot-content">Hello Grid</div>',
      },
    });

    expect(wrapper.find(".slot-content").exists()).toBe(true);
    expect(wrapper.text()).toContain("Hello Grid");
  });

  it('applies default "grid" class', () => {
    const wrapper = mount(Grid);

    expect(wrapper.classes()).toContain("grid");
  });

  it("applies additional class from className prop", () => {
    const wrapper = mount(Grid, {
      props: {
        className: "custom-grid",
      },
    });

    expect(wrapper.classes()).toContain("grid");
    expect(wrapper.classes()).toContain("custom-grid");
  });
});
