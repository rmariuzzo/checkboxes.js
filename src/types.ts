type CheckboxesMethods =
  | ((method: "check") => JQuery)
  | ((method: "uncheck") => JQuery)
  | ((method: "toggle") => JQuery)
  | ((method: "range", active: boolean) => JQuery)
  | ((method: "max", limit: number) => JQuery);

interface JQuery {
  checkboxes: CheckboxesMethods;
}
