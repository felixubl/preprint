# PREPRINT

A design system for pages that are **read** and apps that are **used**.

> Printed first, then annotated.

The premise is a scientific preprint that someone has annotated by hand. The base
is austere and precise: offwhite ground, near-black ink, weighted rules, a
66-character column. The second layer is added by hand and is allowed to be
strange: three fluorescent markers, a coloured drop cap, a rule in one of the
press inks. Funky socks under a lab coat.

It dresses long-form writing with interactive figures, and it dresses docs, tools
and dashboards. It is meant to be a signature rather than a uniform: enough is
fixed that anything built with it is recognisable, and everything else is left to
the thing being built.

## The layers

```
  tokens/          THE INVARIANTS      colours, faces, scales, rules, motion, pointers
  core.css         EVERY SURFACE       reset, .sq, .eyebrow, .mark, the toast. 78 lines.
  controls.css     OPTIONAL            faces for js/controls.js
  surfaces/
    reading.css    ONE OF THESE        the reading contract: article, sidenotes, figures
    app.css        OR THIS ONE         parts for an app: rail, screens, buttons, panels
  js/              OPTIONAL            mode.js (the one dark mode), controls.js
  ─────────────────────────────────────────────────────────────────────────────
  your-site.css    YOURS               everything the system did not decide
```

The two rules that keep it a system:

1. **Nothing above the line is edited by a consumer.** It is vendored, and
   `tools/sync` overwrites it.
2. **Nothing above the line is a finished thing.** `app.css` is parts, not an
   app. If a rule would only ever suit one app, it belongs in that app's own
   sheet. The test is one question: would a second app, doing something else
   entirely, still want this?

Rule 2 is the one that is easy to lose. `app.css` was 560 lines and about 320 of
them were one particular console, which meant any second app that linked it
inherited that console rather than the system. Those 320 lines now live with the
console that wanted them.

### How a surface loads it

```html
<script src="/assets/preprint/js/mode.js"></script>       <!-- in <head>     -->
<link rel="stylesheet" href="/assets/preprint/styles.css">     <!-- tokens   -->
<link rel="stylesheet" href="/assets/preprint/core.css">       <!-- always   -->
<link rel="stylesheet" href="/assets/preprint/controls.css">   <!-- optional -->
<link rel="stylesheet" href="/assets/preprint/surfaces/app.css"><!-- or reading -->
<link rel="stylesheet" href="/your-site.css">                  <!-- yours    -->
```

`mode.js` goes in the head and is not deferred: it sets `data-mode` before the
first paint, and a page that sets it afterwards flashes the wrong mode.

`reading.css` and `app.css` are **never loaded together**. Four class names,
`.btn`, `.note`, `.rail` and `.head__row`, mean different objects on the two
surfaces, and the system refuses to pretend one shape serves both. A reading
page's `.note` is a numbered sidenote on a blue rule. An app's `.note` is a faint
hint. Same name, different object, and the surface sheet decides which.

## The guide

| file | what it settles |
|---|---|
| [`guidelines/invariants.md`](guidelines/invariants.md) | **start here.** What never changes, and what is yours |
| [`guidelines/laws.md`](guidelines/laws.md) | seven laws, one licensed breach each, and the budget |
| [`guidelines/icons.md`](guidelines/icons.md) | the angle law, the drawn pointers, the mark |
| [`guidelines/motion.md`](guidelines/motion.md) | the four motion licences and nothing else moves |
| [`guidelines/voice.md`](guidelines/voice.md) | how the system writes |
| [`Preprint.dc.html`](Preprint.dc.html) | the living document, rev 15, every rule demonstrated |

The short form of all of it: three plates and three markers that never change,
one ground and one ink, three faces with three jobs, one dark mode, the cut scale
for corners, no gradients and no soft shadows. Everything else is the site's own
call, and a deviation that is named and budgeted is a **breach** while an unnamed
one is **drift**.

## Consuming it

A consumer takes a **vendored copy**, committed, so it builds and deploys with no
network and no dependency, and so a system change is adopted deliberately rather
than the moment someone saves a file somewhere else.

```bash
tools/status                 # who runs which commit, and what has drifted
tools/push                   # vendor into every consumer, in one command
tools/push --commit          # and commit the result in each
tools/sync ../some-site      # just the one
```

`tools/push` is the point of the system living in its own repo: change it here,
once, and it lands everywhere. What it deliberately does not do is deploy. Each
site publishes on its own terms, because a change that reaches every site the
instant it is saved is a change that can break every site the instant it is
wrong.

Consumers register themselves by having been synced once. There is no list to
keep in step with reality, which is the only kind of list that stays true.

Each consumer also keeps a `tools/sync-preprint` shim, which is the same thing
from the other end.

### Starting a new one

1. `mkdir -p newsite/assets && cd ~/code/preprint && tools/sync ../newsite`
2. Link the layers as above.
3. Wire in [`tools/conformance.js`](tools/conformance.js) before writing any
   other check. It is the one that defends the invariants.
4. Write `your-site.css` and enjoy the room.

### Variants live with their consumer

A variant is a site's identity. The workshop's halftone screen, its opaque
sticker chips, its 1.5° tilt. It changes often and it belongs to the site that
wears it, so it lives in that repo and is never vendored back. Keeping a copy
here would be a second source of truth for the one file most likely to change.

The workshop's entire deviation from this system is 65 lines, and nobody would
mistake it for fubl.org. That is the system working, not the system being
ignored.

## Index

| path | what |
|---|---|
| `styles.css` | the token entry point, an `@import` list only |
| `tokens/` | colors, typography, rules, spacing, motion, cursors, fonts, base |
| `core.css` | every surface: the reset, `.sq`, `.eyebrow`, `.toast`, the mark |
| `controls.css` | the drawn number field, checkbox, colour picker, select, tooltip |
| `surfaces/reading.css` | what a renderer emits: rows, article, sidenotes, figures, markers |
| `surfaces/app.css` | parts for an app: rail, screens, heads, buttons, panels, menus |
| `js/mode.js`, `js/controls.js` | the one dark mode, and the drawn controls |
| `assets/icons/`, `assets/cursors/` | 28 glyphs, 12 pointers × 2 modes |
| `guidelines/` | the guide. See the table above |
| `tools/` | sync, push, status, and the conformance check |
| `cards/` | foundation specimens for the design system tab |
| `ui_kits/` | two worked surfaces, as pages rather than components |
| `handoff/` | briefs for implementing agents, start at `handoff/README.md` |

## Provenance

Authored from scratch in conversation. The lineage is in `archive/`:
`Edges & Exceptions.dc.html` is the first diagnosis, that radius was locked in
`:root` and made twelve skins into twelve colourways, and it introduced the
grammar of licensed breaches. `Hard Rule.dc.html` has the icon angle law, the
drawn pointers and the weighted rules. `Preprint rev14.dc.html` is the first
two-ink-family revision.

**Known substitution.** Webfonts come from Google Fonts in `tokens/fonts.css`.
Both current consumers replace that one file with self-hosted `@font-face` rules,
which is the single vendored file a site is allowed to override. `tools/sync`
checks that the families still match and stops if they do not, so a face going
missing by accident and a face left out on purpose cannot look the same in a
diff.

**What was dropped.** `components/` held fourteen React `.jsx` files. Nothing
ever loaded them: the site this system dresses is a Python generator emitting
static HTML and plain CSS, so the JSX could only ever drift, and it did. The CSS
was scraped back out of the two surfaces that actually shipped. The component
*names* survive as the taxonomy, because they turned out to map one-to-one onto
the classes the surfaces had really built.
