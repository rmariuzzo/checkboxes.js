export const toggle = ($container: JQuery) => {
  $container
    .find(":checkbox:visible")
    .filter(":not(:disabled)")
    .each((i, element) => {
      const $checkbox = $(element);
      $checkbox.prop("checked", !$checkbox.is(":checked"));
    })
    .trigger("change");
};
