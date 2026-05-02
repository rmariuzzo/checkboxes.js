# `range(enable)`

> Enables Shift+click range selection: holding Shift while clicking a checkbox checks or unchecks all visible checkboxes between the last-clicked checkbox and the current one.

## Signature

```js
$(context).checkboxes('range', enable);
```

| Parameter | Type | Required | Description |
|---|---|---|---|
| `enable` | `boolean` | Yes | `true` to enable range selection; `false` to disable it. |

## Behavior

1. After `range(true)` is called, a `click` listener is attached to the context.
2. Every click on a checkbox (Shift held or not) updates an internal **anchor** — the last-clicked checkbox.
3. When the user Shift+clicks a checkbox and an anchor exists, all visible checkboxes between the anchor and the clicked checkbox (inclusive, in DOM order) are set to the same checked state as the clicked checkbox.
4. Disabled checkboxes within the range are skipped; their state is not changed.
5. A `change` event is triggered on each checkbox whose state was updated by the range operation.
6. Calling `range(false)` removes the click listener; subsequent Shift+clicks behave as normal browser checkbox clicks.

## Edge Cases

- **First click without Shift** — recorded as the new anchor; no range action; normal checkbox toggle occurs.
- **Shift+click with no existing anchor** — no range action; the clicked checkbox toggles normally and becomes the new anchor.
- **Range of one** — Shift+clicking the same checkbox as the anchor affects only that checkbox.
- **Reverse direction** — Shift+clicking a checkbox that appears before the anchor in the DOM still selects the full range between them. Direction does not matter.
- **Hidden checkboxes in the range** — excluded from range computation. The range is calculated over the index of `:checkbox:visible` elements, so hidden checkboxes do not occupy a slot.
- **Disabled checkboxes in the range** — included in the index range but their state is not changed.
- **Calling `range(true)` twice** — attaches a second listener on top of the first; range actions fire twice per click. Call `range(false)` first to reset, or rely on the Data API which calls it only once.

## Constraints

- The range is computed using the visible-checkbox index at the moment of the Shift+click. Checkboxes added or removed between the anchor click and the Shift+click may shift indices and produce unexpected ranges.
- The state applied to the entire range is the **final checked state of the Shift+clicked checkbox** (i.e., the state after the browser has toggled it), not the state of the anchor.

## Events

- `change` is triggered on each checkbox in the range whose state was modified.

## Data API

```html
<div data-toggle="checkboxes" data-range="true">
    ...
</div>
```

The `data-range` attribute is read once at DOM-ready by the Data API scanner and calls `range(true)` on the element. See [data-api.md](data-api.md).

## Related

- Test file: `tests/specs/jquery_checkboxes_range_spec.js` *(existence only — Shift+click behaviour has no automated test yet)*
- Fixture: `tests/fixtures/mixed.html`
- Docs section: `docs/index.html` (Range selection of checkboxes)
