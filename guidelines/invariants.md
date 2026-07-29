# What never changes, and what is yours

This system exists to make everything built with it look like it came from the
same hand, without making any two of them look like the same thing. That is one
sentence with two halves, and they pull against each other, so this file says
exactly where the line is.

The short version: **the invariants below are the signature, and everything else
is yours.** The list is deliberately short. If a rule is not on it, and not a law
in [laws.md](laws.md), you may do as you like.

---

## The invariants

These are not "important tokens". They are the identity. Restate one in a site's
own stylesheet and the family stops being a family, because the thing that made
two pages recognisably siblings was never the layout, it was these.

### The two ink families

**Plates.** Three, pressed with the page, at full strength, never translucent.

| token | light | dark |
|---|---|---|
| `--pp-plate-1` | `#01a368` | `#26d494` |
| `--pp-plate-2` | `#ed0a3f` | `#ff4d68` |
| `--pp-plate-3` | `#0066ff` | `#6a9dff` |

They carry **no fixed meaning**. A plate is chosen by position and weight, the
way a printer assigns a colour to a layer, and what a plate means on your surface
is your business (fubl.org spends them on three registers, the workshop on
category washes). Below 18px they hand over to `--pp-plate-N-text`: a plate that
was never measured as 13px text is not a text colour, and a plate is never a fill
behind white.

**Markers.** Three, added afterwards, translucent, and **only ever a field behind
type**.

| token | light | dark |
|---|---|---|
| `--pp-marker-citron` | `rgba(222,238,46,.62)` | `rgba(222,238,46,.32)` |
| `--pp-marker-pink` | `rgba(255,79,163,.34)` | `rgba(255,79,163,.30)` |
| `--pp-marker-cyan` | `rgba(64,204,255,.38)` | `rgba(64,204,255,.30)` |

A marker never recolours the ink. Citron as text on eggshell is 1.6:1 and fails
everything. As a field behind ink it is 14:1. That one rule is what keeps a
shared highlight readable at any size in either mode, and it is why the opacity
drops in dark rather than the ink changing.

The pen is `.mk--citron` / `.mk--pink` / `.mk--cyan` (or `data-pp-mark`), and it
is in [`core.css`](../core.css) so that every surface has it rather than only
the one that is read. A site writing `background: var(--pp-marker-…)` by hand is
the signal that it could not reach the pen, which is a bug in this system and
not in that site.

### Ground and ink

Offwhite, barely warm. `--pp-paper` `#fbfbf9`, `--pp-surface` `#ffffff`,
`--pp-sunk` `#f2f2ee`, `--pp-ink` `#171716`. Dark is a designed graphite
(`#111214`) and not an inversion.

`--pp-muted` and `--pp-faint` are *chosen* quieter colours, not opacity on ink.
No greys that are really ink pretending to be quiet.

### One dark mode

`data-mode="dark"` on the root element, one implementation
([`js/mode.js`](../js/mode.js)), one set of values. A site may add its own
dark-mode adjustments for its own devices. It may not fork the ground, the ink or
the plates. There is no second dark mode and there is no per-page dark mode.

### Three faces, three jobs

**Hepta Slab** for display. **Zilla Slab** for anything read at length.
**Cousine** for anything the machine said. Source Serif 4 appears only inside
mathematics, and a site with no mathematics may leave it out by saying so in its
own `tokens/fonts.css`.

Body is 17px over 66 characters at 1.68. Micro never goes below 13px. A site may
set any of it differently where its content genuinely differs. What it may not do
is use one of the three faces for a job that belongs to another, because that is
the part a reader recognises before they have read a word.

### The scales

Corners on the **cut scale**, 2 / 3 / 4 / 6, trimmed rather than moulded, rising
with control size so a large button never looks softer than a small one. **Pill
is not a step**: it belongs to tags and nothing else.

Space on 4 / 8 / 12 / 20 / 32 / 52. Rules in four weights (hairline, line,
structure 2px, spine 6px) and three styles with fixed meanings: solid is
structure, dotted is provisional or optional, dashed is a boundary the reader may
cross.

### The things that are simply out

No gradients. No blur. No transparency as decoration. No soft glow shadows: a
cast is a hard offset (`5px 5px 0`) or there is no cast. No hover lift. No
entrance animations. No emoji, anywhere. No icon that breaks the angle law (16
grid, 1.35px stroke, square caps, horizontal, vertical and 45° only).

---

## What is yours

Everything else, and that is meant to be a lot.

- **Layout.** Column widths, grids, how a page is arranged, what goes where.
- **Density.** The workshop runs tight, a reading page runs open. Both are right.
- **Texture**, where it is functional rather than decorative. The workshop's
  halftone screen is how a plate is actually laid down, so it earns its place.
- **Your own variables**, as many as you want, under **your own prefix**
  (`--w-*` in the workshop). Naming one `--pp-something` the system does not
  define is squatting on the system's namespace and the conformance check will
  say so.
- **Overriding a non-invariant token.** `--pp-tint`, `--pp-radius-*`,
  `--pp-space-*` and the rest are defaults, not law. Change them where your
  surface needs different, and note why.
- **Which parts you link at all.** `core.css` is small on purpose. `app.css` is
  parts rather than an app, `reading.css` is the reading contract, `controls.css`
  is optional. Take what you want and write the rest yourself.
- **One licensed breach per law per view**, spent as [laws.md](laws.md)
  describes. Two in one view cancel each other, which is worse than none.

A variant layer that stays inside this is doing it right even if it looks nothing
like the last one. The workshop's whole deviation from the system is 65 lines,
and nobody would mistake it for fubl.org.

---

## The check

One file, vendored with the system, that reads a site's own stylesheets and
fails on the three ways a site drifts. Wire it in before you write any other
check:

```html
<script src="/assets/preprint/tools/conformance.js"
        data-layers="/assets/site.css"></script>
```

Or from inside a harness, so its results join the rest:

```js
preprintConformance({ layers: ['/assets/site.css'] })
  .then(function (results) {
    results.forEach(function (r) { ok(r.name, r.pass, r.detail); });
  });
```

It asserts that the layer does not restate ground, ink, plates or markers, that
every `--pp-*` it sets is one the system actually defines, and that nothing from
an earlier system survives. It reads the token files to find out what the system
defines rather than holding a list, so it stays true when the system gains a
token.

Everything it does not check is yours.
