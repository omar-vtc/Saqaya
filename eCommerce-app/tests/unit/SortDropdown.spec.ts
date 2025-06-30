import { mount } from "@vue/test-utils";
import SortDropdown from "../../src/shared/components/molecules/SortBanner.vue";
import { describe, expect, it } from "vitest";

describe("SortDropdown.vue", () => {
  it("renders with default label and value", () => {
    const wrapper = mount(SortDropdown, {
      props: {
        modelValue: "default",
      },
    });

    expect(wrapper.find("label").text()).toBe("Sort by Price:");
    const select = wrapper.find("select");
    expect((select.element as HTMLSelectElement).value).toBe("default");
  });

  it("emits update:modelValue event when selection changes", async () => {
    const wrapper = mount(SortDropdown, {
      props: {
        modelValue: "default",
      },
    });

    const select = wrapper.find("select");
    await select.setValue("asc");

    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")![0]).toEqual(["asc"]);
  });

  it("accepts optional className prop", () => {
    const wrapper = mount(SortDropdown, {
      props: {
        modelValue: "default",
        className: "custom-class",
      },
    });

    expect(wrapper.classes()).toContain("custom-class");
  });
});
