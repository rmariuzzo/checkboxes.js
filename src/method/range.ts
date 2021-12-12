export const range = ($container: JQuery, enable: boolean) => {
  if (enable) {
    $container.on("click.checkboxes.range", ":checkbox", (event) => {
      let $checkbox = $(event.target);
      const $last = $container.data("checkboxes:range:last");

      if (event.shiftKey && $last) {
        let $checkboxes = $container.find(":checkbox:visible");
        let from = $checkboxes.index($last);
        let to = $checkboxes.index($checkbox);
        let start = Math.min(from, to);
        let end = Math.max(from, to) + 1;

        $checkboxes
          .slice(start, end)
          .filter(":not(:disabled)")
          .prop("checked", $checkbox.prop("checked"))
          .trigger("change");
      }

      $container.data("checkboxes:range:last", $checkbox);
    });
  } else {
    $container.off("click.checkboxes.range");
    $container.removeData("click.checkboxes.range");
  }
};
