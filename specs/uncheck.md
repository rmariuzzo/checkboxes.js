# `uncheck()`

> Sets all eligible checkboxes in the context to the unchecked state.

## Signature

```js
$(context).checkboxes('uncheck');
```

No parameters.

## Behavior

1. Every checkbox within the context that is both **visible** and **not disabled** is set to the unchecked state (`checked = false`).
2. A `change` event is triggered on each affected checkbox.

## Edge Cases

- **Disabled checkboxes** — their state is left unchanged (whether previously checked or unchecked).
- **Hidden checkboxes** (`display:none` or otherwise not `:visible`) — their state is left unchanged.
- **Already-unchecked checkboxes** — remain unchecked; the `change` event is still triggered on them.
- **Empty context** — no checkboxes are found; no events are fired; no error is thrown.

## Constraints

- Both conditions must hold simultaneously: a visible-but-disabled checkbox is skipped, and a hidden-but-enabled checkbox is also skipped.

## Events

- `change` is triggered on every checkbox whose state was updated.

## Data API

```html
<a href="#context" data-toggle="checkboxes" data-action="uncheck">Uncheck all</a>
```

See [data-api.md](data-api.md) for full Data API behaviour.

## Related

- Test file: `tests/specs/jquery_checkboxes_uncheck_spec.js`
- Fixture: `tests/fixtures/mixed.html`
- Docs section: `docs/index.html` (Unchecking all checkboxes)
