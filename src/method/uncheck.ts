export const uncheck = ($container: JQuery) => {
  $container
    .find(":checkbox:visible")
    .filter(":not(:disabled)")
    .prop("checked", false)
    .trigger("change");
};
