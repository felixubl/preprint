# PREPRINT

A design system for pages that are **read** and apps that are **used**.

> Printed first, then annotated.

The premise is a scientific preprint that someone has annotated by hand. The
base is austere and precise — offwhite ground, near-black ink, weighted rules, a
66-character column. The second layer is added by hand and is allowed to be
strange: three fluorescent markers, a coloured drop cap, a rule in one of the
press inks. Funky socks under a lab coat.

Its primary surface is long-form writing with interactive figures — research
notes in economics and market design, things learned, and the occasional
argument. It also dresses docs, tools and dashboards.

## Sources

Authored from scratch in conversation. Its lineage, kept in `archive/`:

- `archive/Edges & Exceptions.dc.html` — the first diagnosis: radius was locked
  in `:root`, which made twelve skins into twelve colourways. Introduced the
  grammar of licensed breaches.
- `archive/Hard Rule.dc.html` — the icon angle law, the drawn pointers, the
  weighted rules.
- `archive/Preprint rev14.dc.html` — the first two-ink-family revision.
- `Preprint.dc.html` (project root) — the living design document, rev 15. Every
  rule below is demonstrated there interactively.

No brand assets were provided and **no logo exists**. The mark is three offset
plate squares multiplied together; the wordmark is Cousine, letterspaced. Do not
draw a logo for this system.

---

## CONTENT FUNDAMENTALS

**Voice.** Declarative and flat. Rules are stated as law, not as advice: "Pill is
not a step." "Cancelled." "Ink is used at full strength or not at all." The
system never says "should" where it means "does", and never hedges a rule it
intends to enforce.

**Person.** No "we". Second person only in instructions ("Select a passage and
right-click"). Prose about the system is impersonal; prose in an article is
first person singular.

**Casing.** Sentence case everywhere. Mono labels are lowercase and letterspaced
(`plate 1`, `small screens · notes`). Never Title Case A Heading. Never ALL CAPS
except in the wordmark and mono eyebrows.

**Numerals and units.** Always concrete: "1.35px stroke", "66 characters",
"1 / view", "2.9:1, fails". A claim with a number in it beats an adjective. When
a measurement is the argument, show the measurement.

**Punctuation.** Em dashes for asides — like this — and a genuine `·` middot as
a separator in mono strings. Oxford comma. No exclamation marks.

**Rhetoric that recurs.** State the rule, then the reason, then the cost of
ignoring it. Short verdict sentences carry weight: "That is the argument."
"Ink is not a fourth colour; it is the sum of your three." A sentence that
earns its full stop is allowed to be a paragraph.

**Copy the system never writes.** Marketing superlatives, "beautiful",
"delightful", "seamless". Emoji — none, anywhere. Placeholder lorem: a slot says
what belongs in it instead ("figure 2 — XOR surface, or a photograph").

---

## VISUAL FOUNDATIONS

### Two ink families
**Plates** (`--pp-plate-1/2/3` = #01a368, #ed0a3f, #0066ff) are pressed with the
page: full strength, structural, never translucent, and carrying **no fixed
meaning** — chosen by position and weight the way a printer assigns a colour to a
layer. Below 18px they hand over to `--pp-plate-*-text`; a plate never measured
as 13px text is not a text colour, and a plate is never a fill behind white.

**Markers** (citron, pink, cyan) are added afterwards, translucent, and **only
ever a field behind type**. Citron as text on eggshell is 1.6:1; as a field
behind ink, 14:1. A marker never recolours the ink — that is what keeps a shared
highlight readable at any size, in either mode.

### Ground and ink
Offwhite, barely warm: paper `#fbfbf9`, surface `#ffffff`, sunk `#f2f2ee`. Ink
`#171716` at full strength, with `--pp-muted` and `--pp-faint` as *chosen*
quieter colours rather than opacity on ink. No greys that are really ink
pretending to be quiet.

### Type
Three faces, three jobs: **Hepta Slab** (display, 900/700/200), **Zilla Slab**
(everything read at length), **Cousine** (anything the machine said). Source
Serif 4 appears only inside mathematics. Body is **17px / 1.68 over 66
characters**; micro never below 13px; display tracks to −0.055em. The
serif-vs-sans reading studies wash out on screen — measure, leading, size and
contrast are what hold up.

**Drop caps** carry register: green = **science** (a result to defend), blue =
**notebook** (worked through, or built — length is not promised), red =
**opinion** (a position, on the record). Peek at the cap, know what kind of piece
it is. Three registers, three plates, no fourth.

### Rules, corners, space
Four weights — hairline (in-container splits), line (container edge), structure
(2px, noticed), spine (6px, once per page). Three styles with fixed meanings:
solid = structure, dotted = provisional or optional, dashed = a boundary the
reader may cross. The ink says which *thread* a rule belongs to, never how loud
it is.

Corners use the **cut scale** — 2 / 3 / 4 / 6 — trimmed rather than moulded, and
radius rises with control size so a large button never looks softer than a small
one. **Pill is not a step**: it belongs to tags and nothing else. Space runs
4 / 8 / 12 / 20 / 32 / 52.

### Cards, borders, shadows
Cards are a **1px border and no shadow** on `--pp-surface`; the 2px structure
weight marks the one panel that matters. Two elevation levels only. Shadows are
hard offsets (`5px 5px 0 var(--pp-shadow)`), never soft glows — a menu casts,
a card does not. No transparency, no blur, no gradients anywhere: a gradient in
this system is always a mistake.

### Hover and press
Hover changes a **border colour or a background tint**, never a lift and never a
shadow. Press moves 1px down-right (`translate(1px,1px)`) or shortens the
pointer's cast. Focus is a 3px `--pp-selection` ring plus the plate-3 border.
The sidenote pairing highlight is `--pp-tint` at 5.5% ink — faint, because it is
wayfinding, not annotation.

### Backgrounds and imagery
The page is flat colour. The only textures are functional: an 8px 45° hatch
behind pointer specimens, and a 45° stripe in an empty figure slot. Imagery is
never decorative — a figure is a plot, a diagram or a photograph that is the
content. Placeholders say what belongs there in mono.

### Layout
66ch reading column, 20ch margin column for notes, 1280px page max, gutters on
`clamp(1.15rem, 5vw, 3.5rem)`. Figures span the full grid — the one licensed
breach of the column. Below 820px the margin **folds inline directly after the
paragraph that cites it**, never behind a tap; the measure does not shrink, the
column simply becomes the screen. Tables keep real column widths and scroll
sideways rather than reflowing into stacks.

### Motion
Four licences only: the process IS time, continuity of state (100–140ms), one
beat on the irreversible, restoring reading position. Everything else still —
no entrances, reveals, parallax or hover lifts. The pointer press is
deliberately instant. See `guidelines/motion.md`.

### Dark mode
A designed graphite (`#111214`), not an inversion: plates brighten, markers drop
opacity so the ink above them never changes, and the mark's blend mode switches
from multiply to screen. Toggle with `data-mode="dark"` on `<body>`.

---

## ICONOGRAPHY

There is no icon font and no third-party set. **28 glyphs**, authored here, in
`assets/icons/` and as the closed `<Icon>` component.

The law: a **16-unit grid, 1.35px stroke, square caps, and only horizontal,
vertical and 45° lines** — plus at most **one filled square** per glyph where it
needs a real dot rather than a stub of stroke. No arcs, no circles, no curves.
Consequences worth knowing: the search glass is a square, the eye is a lozenge,
the warning is a diamond (a true 45° triangle is always twice as wide as it is
tall, so it has no room to stand up), and stroke caps are square because a round
cap would reintroduce the curve the law removed.

Colour enters a glyph **only where it reports a state** — check is plate 1, warn
and trash are plate 2, info is plate 3 — never to decorate. Inside a button an
icon inherits `currentColor`.

**Pointers.** Twelve drawn cursors in `assets/cursors/{light,dark}/`, exposed as
`--pp-cursor-*`. Same three angles, ink-filled with a ground-coloured keyline.
Hotspots are contract: a surface may repaint a pointer, never move its point.
`point` is the plain arrow with the same silhouette **cast 1.1px in plate 3**
behind it, so a clickable surface reads as raised; `pressed` casts 0.5px. The
four states usually left to the OS — help, working, blocked, resize — are drawn,
because here the pointer *becomes* the state instead of wearing a badge. All are
dropped on touch, where a drawn cursor is a lie about the input device.

**Emoji: never. Unicode as iconography: only `·` as a mono separator.**

---

## Index

| path | what |
|---|---|
| `styles.css` | the token entry point — `@import` list only |
| `tokens/` | colors, typography, rules, spacing, motion, cursors, fonts, base |
| `core.css` | every surface: the reset, `.sq`, `.eyebrow`, `.toast`, the mark, the ink fill |
| `reading.css` | what a renderer emits: row grid, article, sidenotes, figures, tables, code, markers |
| `app.css` | what a console is built from: rail, screens, buttons, panels, palette, menus |
| `ui_kits/reader/` | the primary surface — article, margin notes, figures, marker layer |
| `ui_kits/docs/` | docs page and data view with a nav rail |
| `cards/` | foundation specimens for the Design System tab |
| `guidelines/laws.md` | the seven laws, their breaches and budgets |
| `guidelines/motion.md` | the four motion licences |
| `assets/icons/`, `assets/cursors/` | 28 glyphs, 12 pointers × 2 modes |
| `Preprint.dc.html` | the living design document, rev 15 |
| `Workshop.dc.html` | felixubl/workshop re-set in this system |
| `handoff/` | briefs for implementing agents — start at `handoff/README.md` |

### How a surface loads it

Tokens, then core, then **exactly one** surface sheet, then the surface's own file:

```html
<link rel="stylesheet" href="/preprint/styles.css">     <!-- tokens        -->
<link rel="stylesheet" href="/preprint/core.css">       <!-- every surface -->
<link rel="stylesheet" href="/preprint/reading.css">    <!-- OR app.css    -->
<link rel="stylesheet" href="/your-site.css">           <!-- yours         -->
```

`reading.css` and `app.css` are never loaded together. Four class names —
`.btn`, `.note`, `.rail`, `.head__row` — mean different objects on the two
surfaces, and the system refuses to pretend one shape serves both. A reading
page's `.note` is a numbered sidenote on a blue rule. An app's `.note` is a
faint hint. Same name, different object, and the surface sheet decides which.

A consumer takes a **vendored copy**, committed, and adopts a system change by
re-running its own sync rather than by being updated from underneath. fubl.org's
`tools/sync-preprint` is the reference implementation: it re-copies every file,
preserves the one the site deliberately overrides, and stamps a `VERSION` so a
stale copy is visible instead of merely suspected.

### Intentional additions

- **Icon** — a wrapper over the closed glyph set, so the angle law is enforced by
  the component rather than remembered by whoever is drawing.
- **Rule** — separators are a first-class component here because the four
  weights × three styles × four inks vocabulary replaces most boxes.

### Known substitutions

Webfonts are served from Google Fonts rather than shipped binaries
(`tokens/fonts.css`). Swap in self-hosted `@font-face` rules if the system needs
to work offline, as fubl.org does.

### What was dropped

`components/` held fourteen React `.jsx` files — Button, Field, Sidenote,
Figure, DataTable and the rest. Nothing ever loaded them: the site that this
system dresses is a Python generator emitting static HTML and plain CSS, so the
JSX could only ever drift, and it did. The CSS in `core.css`, `reading.css` and
`app.css` was scraped back out of the two surfaces that actually shipped. The
component *names* above survive as the taxonomy, because they turned out to map
one-to-one onto the classes the surfaces had really built.
