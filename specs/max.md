# `max(n)`

> Limits how many checkboxes can be checked simultaneously in a context by disabling all unchecked ones once the limit is reached.

## Signature

```js
$(context).checkboxes('max', n);
```

| Parameter | Type | Required | Description |
|---|---|---|---|
| `n` | `number` | Yes | Maximum number of checkboxes that may be checked at the same time. Pass `0` (or any non-positive value) to remove the limit. |

## Behavior

1. After `max(n)` is called with a positive integer `n`, a `click` listener is attached to the context.
2. After each click on any checkbox in the context, if the number of `:checked` checkboxes equals `n`, every unchecked checkbox in the context is disabled (`disabled = true`).
3. If the count of `:checked` checkboxes drops below `n`, every unchecked checkbox is re-enabled (`disabled = false`).
4. Calling `max(0)` (or any non-positive value) removes the click listener. Checkboxes that were disabled by the max mechanism are **not** automatically re-enabled when the limit is removed.
5. Calling `max(n)` a second time replaces the previous listener; only the most recent value of `n` is enforced.

## Edge Cases

- **Setting max when checkboxes are already checked** — the limit is enforced only on subsequent click events; the existing state at the time `max()` is called is not validated retroactively.
- **Unchecking when at the limit** — the click listener fires, the count drops below `n`, and unchecked checkboxes are re-enabled immediately.
- **Checkboxes that are already natively disabled** — the max mechanism writes `disabled = true/false` to them too, which can overwrite their original disabled state.
- **Clicking beyond the limit** — once all unchecked checkboxes are disabled, further clicks cannot increase the checked count.

## Constraints

- **`click`-only enforcement**: the limit is applied via a `click` event listener. Programmatic calls to `check()` or `toggle()` bypass the listener entirely and can result in more than `n` checkboxes being checked.
- The limit applies to the entire context, not per-row or per-group.
- The enforcement condition is `=== n` (strict equality, not `>= n`). If programmatic manipulation produces a count above `n`, unchecked checkboxes are not disabled until the count drops to exactly `n` through subsequent clicks.

## Events

No additional events are fired by the `max` mechanism itself. Normal browser `click` and `change` events on checkboxes are unaffected.

## Data API

```html
<div data-toggle="checkboxes" data-max="3">
    ...
</div>
```

The `data-max` attribute is read once at DOM-ready by the Data API scanner and calls `max(3)` on the element. See [data-api.md](data-api.md).

## Related

- Test file: `tests/specs/jquery_checkboxes_max_spec.js`
- Fixture: `tests/fixtures/unchecked.html`
- Docs section: `docs/index.html` (Limit max number of checked checkboxes)
