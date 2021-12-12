import { plugin } from "./plugin";

/**
 * API:
 *   data-checkboxes="selector=method=args..."
 *
 * Examples:
 *   data-checkboxes="#table1=check"
 *   data-checkboxes="#table1=uncheck"
 *   data-checkboxes="#table1=max=3"
 *   data-checkboxes="#table1=range"
 *   data-checkboxes="#table1=toggle"
 */
const dataApiClickHandler = (event: JQuery.ClickEvent) => {
  const $target = $(event.target);
  const api = $target.data("checkboxes");
  const href = $target.attr("href");
  const [selector, method, arg] = api.split("=");
  const $container = $(selector || href);

  if ($container && method) {
    if (!$target.is(":checkbox")) {
      event.preventDefault();
    }
    plugin.apply($container, [method, arg]);
  }
};

export const registerDataApi = () => {
  jQuery(document).on(
    "click.checkboxes.data-api",
    "[data-toggle^=checkboxes]",
    dataApiClickHandler
  );
};
