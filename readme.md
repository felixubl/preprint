# PREPRINT

A design language for pages that are **read** and apps that are **used**.

> Printed first, then annotated.

The premise is a scientific preprint that someone has annotated by hand. The base
is austere and precise: offwhite ground, near-black ink, weighted rules, a
66-character column. The second layer is added by hand and is allowed to be
strange: three fluorescent markers, a coloured drop cap, a rule in one of the
press inks. Funky socks under a lab coat.

## It is a language, not a specification

What this gives you is a vocabulary. Two families of ink, three faces with three
jobs, a scale for corners and one for space, a set of drawn parts, and a short
list of things that stay constant so that anything made with it reads as
related. What you say in that vocabulary is yours.

Almost none of it is compulsory. The things that genuinely are constant fit on
one page, in [`guidelines/invariants.md`](guidelines/invariants.md), and they are
mostly colour: three plates, three markers, one ground, one ink, one dark mode.
Everything else here is offered rather than imposed. A project that takes the
tokens, writes its own everything, and never links a single sheet from
`surfaces/` is using this correctly.

Even the parts that are stated as rules come with a budget rather than a ban.
[`guidelines/laws.md`](guidelines/laws.md) gives each of the seven laws exactly
one licensed breach and the condition that earns it. A deviation that is named
and budgeted is a **breach** and is fine. An unnamed one is **drift**, and the
difference is whether you meant it.

The aim is that two things built on this look like siblings and not like the same
thing twice. If everything made with it started to look identical, that would be
the language failing, not succeeding.

## What it offers

Take what you want:

```
  tokens/          the constants        colours, faces, scales, rules, motion, pointers
  core.css         shared, and growing  reset, .sq, .eyebrow, .sr, the marker, the mark,
                                        the mode switch, the toast. 369 lines.
  controls.css     optional             faces for js/controls.js
  surfaces/
    reading.css    if you are writing   article, sidenotes, figures, the marker menu
    app.css        if you are building  parts: rail, screens, buttons, panels, menus
  js/              optional             mode.js (the one dark mode), controls.js
  ─────────────────────────────────────────────────────────────────────────────
  your-site.css    yours                everything above left undecided
```

Two things worth knowing about that list, neither of them doctrine.

**The tree is vendored, so edits to it are lost.** `tools/sync` overwrites your
copy on the next run. That is mechanics rather than a prohibition: to change the
system, change it here and sync, and it will hold.

**Nothing offered here is a finished thing.** `app.css` is parts, not an app. The
test for whether something belongs in it: would a second app, doing something
else entirely, still want this? It is easy to lose. `app.css` was 560 lines and
about 320 of them were one particular console, so any second app that linked it
inherited that console rather than a design language. Those 320 lines live with
the console that wanted them now.

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

Load `reading.css` or `app.css`, not both. That one is a fact rather than a
preference: four class names, `.btn`, `.note`, `.rail` and `.head__row`, mean
different objects in the two sheets, so loading both leaves you with whichever
won the cascade. A reading page's `.note` is a numbered sidenote on a blue rule.
An app's `.note` is a faint hint. They are two objects that collided over a name,
not one object that drifted.

## The guide

| file | what it covers |
|---|---|
| [`guidelines/invariants.md`](guidelines/invariants.md) | **start here.** The short list that is fixed, and the long list that is yours |
| [`guidelines/laws.md`](guidelines/laws.md) | seven laws, and the licensed breach each one comes with |
| [`guidelines/icons.md`](guidelines/icons.md) | the angle law, the drawn pointers, the mark |
| [`guidelines/motion.md`](guidelines/motion.md) | the four things allowed to move |
| [`guidelines/voice.md`](guidelines/voice.md) | how the system writes about itself |
| [`Preprint.dc.html`](Preprint.dc.html) | the living document, rev 15, every rule demonstrated |

A note on how these are written. They are terse and they use the indicative:
"pill is not a step", "ink is used at full strength or not at all". That is a
house style for stating a rule compactly, and it is not a claim that the rule
outranks your judgement. When one of them is wrong for what you are building,
you are the one holding the budget. `laws.md` says as much in its own last line:
if breaking a law makes the law look arbitrary, the law was wrong, so delete it
rather than licensing around it.

The short form: three plates and three markers that stay put, one ground and one
ink, three faces with three jobs, one dark mode, corners on the cut scale, no
gradients and no soft shadows. That is the part that makes things look related.
The rest is the site's own call.

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
2. Link whichever layers the thing actually needs.
3. If the project has a harness, [`tools/conformance.js`](tools/conformance.js)
   is worth wiring in early. It checks the short list and nothing else, so it
   tells you when you have wandered off the invariants without having an opinion
   about anything else you did.
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
| `core.css` | every surface: the reset, `.sq`, `.eyebrow`, `.sr`, the marker, `.toast`, the mark, the mode switch |
| `controls.css` | the drawn number field, checkbox, colour picker, select, tooltip |
| `surfaces/reading.css` | what a renderer emits: rows, article, sidenotes, figures, the marker menu |
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
