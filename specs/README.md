# Functional Specifications

This directory contains the functional specifications for the `checkboxes.js` jQuery plugin. Each file describes **what** a feature must do — the observable behaviour, edge cases, and invariants — independently of implementation details.

## Who is this for?

- Contributors adding or changing behaviour: read the spec first, then update tests, then code.
- Reviewers: verify that a PR's code and tests match what the spec says.
- Users: understand exactly what to expect from each method.

## Relationship to other documentation

| This directory | `tests/specs/` | `docs/index.html` |
|---|---|---|
| Prose description of expected behaviour | Executable verification of behaviour | Interactive demos and usage examples |
| Source of truth for *what* | Source of truth for *how it's verified* | Source of truth for *how to use it* |

## Files

| Spec | Feature | Test file |
|---|---|---|
| [plugin.md](plugin.md) | Plugin instantiation, jQuery integration, no-conflict | `tests/specs/jquery_checkboxes_spec.js` |
| [check.md](check.md) | `check()` — check all eligible checkboxes | `tests/specs/jquery_checkboxes_check_spec.js` |
| [uncheck.md](uncheck.md) | `uncheck()` — uncheck all eligible checkboxes | `tests/specs/jquery_checkboxes_uncheck_spec.js` |
| [toggle.md](toggle.md) | `toggle()` — flip state of all eligible checkboxes | `tests/specs/jquery_checkboxes_toggle_spec.js` |
| [max.md](max.md) | `max(n)` — limit how many checkboxes can be checked | `tests/specs/jquery_checkboxes_max_spec.js` |
| [range.md](range.md) | `range(enable)` — Shift+click range selection | `tests/specs/jquery_checkboxes_range_spec.js` |
| [data-api.md](data-api.md) | Declarative Data API via `data-*` attributes | *(no dedicated test file yet)* |

## Cross-cutting invariant: the "visible AND enabled" gate

`check()`, `uncheck()`, and `toggle()` all share the same eligibility rule: a checkbox is only affected if it is both **visible** (not hidden via CSS) and **not disabled**. A checkbox that fails either condition is left completely unchanged.

The `mixed.html` fixture concretely captures all four combinations:

| Checkbox | Visible | Enabled | Affected by bulk methods? |
|---|---|---|---|
| `#5` | No (display:none) | Yes | No |
| `#6` | No (display:none) | Yes | No |
| `#7` | Yes | No (disabled) | No |
| `#8` | Yes | No (disabled) | No |
| `#1–#4, #9–#10` | Yes | Yes | **Yes** |

## Keeping specs in sync

When changing behaviour:
1. Update the relevant spec file first.
2. Update or add tests in `tests/specs/` to match.
3. Change the implementation in `src/jquery.checkboxes.js`.
4. Update `docs/index.html` if the user-facing API changed.
