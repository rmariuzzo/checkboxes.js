export const check = ($container: JQuery) => {
  $container
    .find(":checkbox")
    .filter(":not(:disabled)")
    .prop("checked", true)
    .trigger("change");
};
