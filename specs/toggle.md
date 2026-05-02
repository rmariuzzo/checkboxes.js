# `toggle()`

> Flips the checked state of every eligible checkbox in the context individually.

## Signature

```js
$(context).checkboxes('toggle');
```

No parameters.

## Behavior

1. Every checkbox within the context that is both **visible** and **not disabled** has its state inverted: checked becomes unchecked, unchecked becomes checked.
2. Each checkbox is evaluated and flipped **independently** — the result depends on that checkbox's own current state, not on the majority state of the context.
3. A `change` event is triggered on the full set of affected checkboxes after all states have been flipped.

## Edge Cases

- **Disabled checkboxes** — their state is left unchanged.
- **Hidden checkboxes** (`display:none` or otherwise not `:visible`) — their state is left unchanged.
- **Mixed state** — a context with 3 checked and 2 unchecked eligible checkboxes will result in 3 unchecked and 2 checked; there is no "majority wins" logic.
- **Empty context** — no checkboxes are found; no events are fired; no error is thrown.

## Constraints

- Both visibility and enabled conditions must hold simultaneously (same gate as `check()` and `uncheck()`).
- The `change` event fires once on the set, after all individual flips are done — not once per checkbox.

## Events

- `change` is triggered on the set of affected checkboxes (fired once after all flips).

## Data API

```html
<a href="#context" data-toggle="checkboxes" data-action="toggle">Toggle all</a>
```

See [data-api.md](data-api.md) for full Data API behaviour.

## Related

- Test file: `tests/specs/jquery_checkboxes_toggle_spec.js`
- Fixture: `tests/fixtures/mixed.html`
- Docs section: `docs/index.html` (Toggling all checkboxes)
