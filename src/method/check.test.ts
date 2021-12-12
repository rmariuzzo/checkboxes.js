import { check } from "./check";
import { registerJQueryPlugin } from "../plugin";

describe(check.name, () => {
  beforeAll(() => {
    registerJQueryPlugin();
  });

  beforeEach(() => {
    document.body.innerHTML = `
      <input data-test="checkbox-1" type="checkbox" />
      <input data-test="checkbox-2" type="checkbox" checked />
      <input data-test="checkbox-3" type="checkbox" checked style="display:none" />
      <input data-test="checkbox-4" type="checkbox" checked disabled="disabled" />
    `;
  });

  it("should exists", () => {
    expect($.fn).toHaveProperty("checkboxes");
  });
});
