export const max = ($container: JQuery, max: number) => {
  if (max > 0) {
    // Enable max.
    $container.on("click.checkboxes.max", ":checkbox", () => {
      if ($container.find(":checked").length === max) {
        $container.find(":checkbox:not(:checked)").prop("disabled", true);
      } else {
        $container.find(":checkbox:not(:checked)").prop("disabled", false);
      }
    });
  } else {
    // Disable max.
    $container.off("click.checkboxes.max");
  }
};
