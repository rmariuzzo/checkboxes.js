# Plugin

> The `checkboxes` jQuery plugin registers a `Checkboxes` instance on a context element and exposes its methods through the standard jQuery plugin interface.

## Signature

```js
$(context).checkboxes(method [, ...args]);
```

| Parameter | Type | Required | Description |
|---|---|---|---|
| `method` | `string` | No | Name of the method to invoke (`'check'`, `'uncheck'`, `'toggle'`, `'max'`, `'range'`). |
| `...args` | any | No | Arguments forwarded to the method. |

## Behavior

1. Calling `$(context).checkboxes(method)` on a jQuery-wrapped element creates a `Checkboxes` instance for that element and stores it in jQuery's internal data store under the key `'checkboxes'`.
2. The same instance is reused on every subsequent call — the instance is created once per element.
3. The named `method` is looked up on the instance and called with any extra arguments. Unrecognised method names are silently ignored.
4. `$.fn.checkboxes` is chainable: it returns the original jQuery object so calls can be chained.
5. `$.fn.checkboxes.Constructor` holds a reference to the `Checkboxes` class.

## Edge Cases

- **Empty selection** (`$().checkboxes()`) — no instance is created; no error is thrown; the empty jQuery set is returned.
- **Unknown method name** — silently ignored; the instance is still created and stored.
- **Method called before instance exists** — the instance is created on the first call, regardless of the method name.

## No-Conflict

`$.fn.checkboxes.noConflict()` restores the previous value of `$.fn.checkboxes` (if another plugin occupied that name before this one was loaded) and returns the plugin function so it can be assigned to a different name:

```js
let checkboxes = $.fn.checkboxes.noConflict();
$.fn.myCheckboxes = checkboxes;
```

## Related

- Test file: `tests/specs/jquery_checkboxes_spec.js`
- Source: `src/jquery.checkboxes.js`
