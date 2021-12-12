import * as $ from "jquery";
import * as methods from "./method";

export function plugin(this: JQuery, method: string, arg: any) {
  return this.each((index, element) => {
    const $element = $(element);
    if (method in methods) {
      (methods as { [index: string]: Function })[method].apply($element, [arg]);
    }
  });
}

export const registerJQueryPlugin = () => {
  $.fn.extend({ checkboxes: plugin });
};
