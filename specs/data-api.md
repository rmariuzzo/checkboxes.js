# Data API

> Declarative interface that wires up `checkboxes.js` behaviour through HTML `data-*` attributes, requiring no JavaScript.

## Overview

The Data API provides two integration points:

1. **Click handler** — responds to clicks on trigger elements to invoke a method on a target context.
2. **DOM-ready scanner** — reads `data-*` attributes on context elements at page load and calls the corresponding methods automatically.

## Click Handler

Any element with `data-toggle="checkboxes"` and `data-action="<method>"` becomes a trigger. When clicked, the plugin invokes `<method>` on the target context.

### Identifying the context

The target context is resolved in this order:

1. The value of the `data-context` attribute on the trigger element (used as a jQuery selector).
2. The hash fragment of the trigger element's `href` attribute (e.g. `href="#my-list"` → `$('#my-list')`).

`data-context` takes priority over `href`.

### Default action prevention

If the trigger element is **not** a checkbox itself, the browser's default action for that element (e.g. navigation for an `<a>`) is prevented. If the trigger element is a checkbox, the default action is not prevented so the checkbox remains interactive.

### Examples

```html
<!-- Trigger using href hash -->
<a href="#my-list" data-toggle="checkboxes" data-action="check">Check all</a>

<!-- Trigger using data-context -->
<button data-toggle="checkboxes" data-context="#my-list" data-action="uncheck">Uncheck all</button>

<div id="my-list">
    <input type="checkbox"> ...
</div>
```

## DOM-Ready Scanner

At DOM ready the plugin scans every element matching `[data-toggle^=checkboxes]` and reads all its `data-*` attributes (the `toggle` attribute itself is excluded). Each attribute is treated as a method call:

```
data-<method>="<value>"  →  $(element).checkboxes('<method>', <value>)
```

This allows `max` and `range` to be configured declaratively:

```html
<!-- Enables range selection on #my-list at page load -->
<div id="my-list" data-toggle="checkboxes" data-range="true">
    <input type="checkbox"> ...
</div>

<!-- Limits #my-list to 3 checked checkboxes at page load -->
<div id="my-list" data-toggle="checkboxes" data-max="3">
    <input type="checkbox"> ...
</div>
```

## Constraints

- The click handler is attached once at plugin load time as a **delegated** listener on `document`. It works for elements present in the DOM at any time, including those added dynamically after page load.
- The DOM-ready scanner runs **once**. Elements added dynamically after DOM ready are not processed by the scanner. If you add a `[data-toggle^=checkboxes]` element later, call `$(element).checkboxes('<method>', value)` manually.
- If neither `data-context` nor `href` resolves to a non-empty jQuery set, or if `data-action` is absent, the click handler does nothing.
- Unknown `data-action` values are silently ignored (the plugin's method dispatch no-ops on unknown names).

## Related

- Source: `src/jquery.checkboxes.js` (`dataApiClickHandler`, `dataApiDomReadyHandler`)
- *(No dedicated test file yet — `data-api` behaviour is covered informally by the interactive demos in `docs/index.html`)*
