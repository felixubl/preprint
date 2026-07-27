# Handoff — PREPRINT

**New here? Read `handoff/START-HERE.md` first** — it says which job is which and
names the three reference designs. Then come back for Step 0 below.

Three jobs live here, one brief each:

- **`workshop-migration.md`** — re-skin the existing `felixubl/workshop` repo.
  A migration: the markup and the tools already exist and mostly stay.
- **`fubl-org-brief.md`** — build the personal site at fubl.org from nothing.
  A new build, with the reading page as its primary surface.
- **`admin-console-brief.md`** — scrap the existing admin console on the box and
  build the writing environment. Also carries the register rename (science /
  notebook / opinion) that the personal site must be checked against.

All three start with the same step, and it is not optional.

## Step 0 — copy the system in, verbatim

From this project's root, into the target repo:

```
styles.css            →  assets/preprint/styles.css
tokens/               →  assets/preprint/tokens/      (8 files)
assets/icons/         →  assets/preprint/icons/       (28 SVGs)
assets/cursors/       →  assets/preprint/cursors/     (light/ + dark/, 12 each)
```

`styles.css` is nothing but an `@import` list, so one `<link>` pulls the whole
system. **Do not edit the copied files.** They are vendored — the same way
`tokens.css` is vendored from neo-retro today. When the system changes, re-copy.

Every deviation a site needs goes in ONE file the site owns, layered on top:

```html
<link rel="stylesheet" href="assets/preprint/styles.css">
<link rel="stylesheet" href="assets/site.css">   <!-- yours -->
```

That is exactly the pattern `workshop-theme.css` already uses over
`tokens.css`, so it should feel familiar.

## Step 1 — read these three, in order

1. `readme.md` — content fundamentals (voice, casing, what the system never
   writes) and visual foundations. This is the one that matters most.
2. `guidelines/laws.md` — the seven laws, each with one licensed breach and a
   budget. **Law 00 is the important one:** two breaches in one view cancel
   each other. Budget one per view, not per element.
3. `guidelines/motion.md` — four motion licences. Everything else is still.
   No entrance animations, no scroll reveals, no hover lifts. This is
   enforced, not suggested.

## Step 2 — look at the reference designs

| file | what it demonstrates |
|---|---|
| `Workshop.dc.html` | the workshop index, already converted. The target. |
| `ui_kits/reader/index.html` | the reading page: margin notes, figures, marker layer |
| `ui_kits/docs/index.html` | docs page and data view with a nav rail |
| `Preprint.dc.html` | the living system document — every rule, demonstrated |
| `Preprint Index.dc.html` | the public front page — final, and the answer to "one page or many" |
| `Preprint Admin.dc.html` | the writing and publishing console — editor, sources, deploy |

These are **design references written in HTML**, not production code to paste.
The `.dc.html` files use a component runtime that does not exist in a plain
static repo; read them for structure, exact values and copy, then write ordinary
HTML and CSS. `ui_kits/*/index.html` are closer to shippable — plain HTML plus
React from a CDN — but the same rule applies: take the values, write it the way
the target repo is already written.

Everything here is **high fidelity**. Colours, sizes, weights and spacing are
final. Match them.

## The mode switch

The system reads `[data-mode="dark"]`. Set it on `<html>` from a synchronous
pre-paint script so there is no flash, and persist an explicit choice:

```js
(function () {
  var stored = null;
  try { stored = localStorage.getItem('preprint-mode'); } catch (e) {}
  document.documentElement.dataset.mode = stored ||
    (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
})();
```

There is **one** dark mode for every surface. Do not fork it per site. If a page
needs something adjusted in the dark, adjust that page's own devices — a
texture's opacity, a wash's strength — never the ground or the plates.

## Fonts

`tokens/fonts.css` pulls Hepta Slab, Zilla Slab, Cousine and Source Serif 4
from Google Fonts. Both target repos should **self-host instead** — the workshop
already self-hosts, and a personal site should not hand a third party a request
per reader. Replace that one file with local `@font-face` rules; the family
names in `tokens/typography.css` must not change.

## What to ask about rather than invent

- **A component the system does not have.** Say so and propose it against the
  laws; do not improvise a shape.
- **A layout that needs a second licensed breach in one view.** That is a
  hierarchy problem. Flag it.
- **Anything needing a new colour.** There are three plates and three markers.
  A fourth ink is a design decision, not an implementation one.
