# Brief — re-skin felixubl/workshop

**Repo:** `felixubl/workshop` (branch `main`)
**Target:** `Workshop.dc.html` in this project. Match it.
**Fidelity:** high. Every value below is final.

Read `handoff/README.md` first and do Step 0.

This is a **migration, not a rewrite**. The stack stays: plain HTML/CSS/JS per
tool, no bundler, no framework, one folder per tool. All nineteen cards keep
their exact copy. Do not reword a single description.

---

## 1 · Files

| file | action |
|---|---|
| `assets/tokens.css` | **delete.** Superseded by `assets/preprint/tokens/colors.css` et al. |
| `assets/base.css` | **rewrite.** Keep the class names every tool already uses; replace the values from the mapping below. Drop the `@font-face` block into a new self-hosted `assets/preprint/tokens/fonts.css`. |
| `assets/workshop-theme.css` | **replace** with a much smaller file. See §4. |
| `assets/theme.js` | **keep the logic**, change `dataset.theme` → `dataset.mode`, `'workshop-theme'` → `'preprint-mode'`, and `[data-theme='dark']` → `[data-mode='dark']` everywhere. |
| `assets/fonts/` | keep `HeptaSlab.ttf`. **Add** Zilla Slab (400/500/600) and Cousine (400/700). `JetBrainsMono-*` may stay for `<pre>` inside tools, but Cousine is the system's mono — prefer replacing. |
| `index.html` | rebuild from `Workshop.dc.html`. See §2. |
| `draw-svg/` | re-skin last, after the shell is right. See §5. |
| `assets/favicon.svg` | replace with the plate mark: three 13px squares at (0,0) plate 1, (6,2) plate 2, (3,6) plate 3, `mix-blend-mode: multiply`. |

## 2 · Token mapping

Mechanical, one pass. Left column is what `base.css` uses today.

| old | new |
|---|---|
| `--bg` | `--pp-paper` |
| `--surface` | `--pp-surface` |
| `--surface2` | `--pp-sunk` |
| `--ink` | `--pp-ink` |
| `--muted` | `--pp-muted` |
| `--faint`, `--faint-soft` | `--pp-faint` (there is no second faint — pick one) |
| `--line` | `--pp-line` for a container edge, `--pp-hair` for a split inside one |
| `--line-soft` | `--pp-hair` |
| `--accent` | **no equivalent — this is the point.** See §3. |
| `--accent-soft` | a `color-mix` wash of the relevant plate at 7–8% |
| `--accent-line` | the plate itself, at full strength |
| `--good` / `--bad` / `--err` | `--pp-plate-1-text` / `--pp-plate-2-text` / `--pp-plate-2-text` |
| `--shadow-1`, `--shadow-2` | **delete.** Soft shadows do not exist here. Hard offsets only: `5px 5px 0 <plate>`. |
| `--glass` | **delete.** No transparency, no blur. |
| `--mono` | `--pp-font-mono` (Cousine) |
| `--slab` | `--pp-font-display` (Hepta Slab) — and add `--pp-font-body` (Zilla Slab) |
| `--ease` | `--pp-ease` from `tokens/motion.css` |
| `--w-pink` | `--pp-plate-2` |
| `--w-lime` | `--w-chip-live` (`#deee2e`, opaque) |
| `--w-teal` | `--pp-plate-1` |
| `--w-orange`, `--w-purple` | **delete.** Three plates, no more. |
| `--w-chip-ink` | keep the idea, use `#171716` |

### Type — the one real change to the reading experience

The site currently sets **JetBrains Mono as body text**. It should not be.

| what | face |
|---|---|
| headings, wordmark, tool names, stat figures | `--pp-font-display` Hepta Slab |
| **card descriptions, prose, anything read at length** | `--pp-font-body` Zilla Slab |
| labels, badges, counts, filenames, code, anything the machine said | `--pp-font-mono` Cousine |

Body is `--pp-size-body` (17px) at `--pp-leading-body` (1.68). Nothing on the
page goes below `--pp-size-label` (0.7rem / 11.2px) — the old badges were at
9.9px and that was a bug.

## 3 · No accent. Three plates.

The single `--accent` becomes three inks that carry **no fixed meaning**. Green
is not "success" and red is not "error" unless the component also says so in
words. On the index they register a category:

| ink | tools |
|---|---|
| `--pp-plate-1` green | PDF, Metadata Cleaner, Text & Document, CSV & Spreadsheet, Calendar & Date, Email |
| `--pp-plate-2` red | Image, SVG, Audio, Video, QR & Barcodes, Font, Colour & Design — and Draw SVG |
| `--pp-plate-3` blue | Random Number Generator, Developer, Archive & File, Geospatial |
| `--pp-line` (none) | Odds & Ends — the tool that fits no category gets no colour implying it does |

The register is **unnamed**. No category label on any card. The four-ink bar
beside the tally is the only hint and it explains nothing.

Below 18px a plate hands over to its `-text` companion. `--pp-plate-1` as 13px
type is a bug; `--pp-plate-1-text` is the fix.

## 4 · The workshop's own deviations — the whole list

`assets/site.css` should contain roughly this and nothing more:

```css
:root {
  --pp-screen-dot: var(--pp-hair);
  --w-wash-1: color-mix(in srgb, var(--pp-plate-1) 8%, transparent);
  --w-wash-2: color-mix(in srgb, var(--pp-plate-2) 7%, transparent);
  --w-wash-3: color-mix(in srgb, var(--pp-plate-3) 7%, transparent);
  --w-wash-0: color-mix(in srgb, var(--pp-ink) 4%, transparent);
  --w-chip-live: #deee2e;
  --w-chip-soon: #40ccff;
  --w-chip-ink: #171716;
  --w-tilt: -1.5deg;
}
[data-mode='dark'] {
  --pp-screen-dot: rgba(239, 238, 232, .16);
  --w-wash-1: color-mix(in srgb, var(--pp-plate-1) 14%, transparent);
  --w-wash-2: color-mix(in srgb, var(--pp-plate-2) 14%, transparent);
  --w-wash-3: color-mix(in srgb, var(--pp-plate-3) 14%, transparent);
  --w-wash-0: color-mix(in srgb, var(--pp-ink) 7%, transparent);
}
body {
  background-image: radial-gradient(var(--pp-screen-dot) 1px, transparent 1.5px);
  background-size: 15px 15px;
  background-attachment: fixed;   /* the screen is ON the paper */
}
```

Note what is **not** in there: no ground override, no ink override, no plate
override. One dark mode for every surface.

### Kept from the current look, and why

- **Halftone dot grid.** Kept, and now justified: it is how a plate is laid
  down, which makes it functional texture rather than decoration. Pinned with
  `background-attachment: fixed` so the work slides over it.
- **Hard offset shadow.** Kept and reinterpreted: the cast is the same
  silhouette printed again in a plate ink, off register — which is the plate
  mark itself. `5px 5px 0 var(--pp-plate-2)` on the live card.
- **Sticker tilt.** Kept, and declared as `--w-tilt`. Badges rotate at full
  strength (`-1.5deg`, and `+1.275deg` for "Coming soon" so the pair
  disagrees). Cards rotate at a **third** of it, cycling `[0.4, -0.34, 0.26]`
  by grid position. Eighteen cards at full tilt is a spill.
- **Loud badges.** `--w-chip-live` / `--w-chip-soon`, **opaque**, 2px ink
  border, `2px 2px 0` ink cast, `--w-chip-ink` text in both modes. A
  translucent chip goes to a dim smudge on a dark ground.

### Dropped, and why

- **Film grain overlay** (`body::before`). Misregistration says "printed"
  better, and grain over body text costs contrast for nothing.
- **Pill radius everywhere.** Pill belongs to **tags and badges only**. Buttons,
  cards, fields and icon buttons use the cut scale: `--pp-radius-sm` 2px,
  `-md` 3px, `-lg` 4px, `-xl` 6px. Radius rises with control size.
- **Hover lift** (`transform: translate(-2px,-4px)`). Replaced: hover grows the
  cast from 5px to 8px — the plate slips **further out of register** instead of
  the card rising. Press is `translate(1px,1px)` with the cast pulled back to
  2px. Nothing moves that a printer could not do.
- **Round icon buttons.** Now 38px, `--pp-radius-md`, 1px `--pp-line`,
  hover to `--pp-edge`.
- **Soft shadows and `--glass`.** Gone entirely.

## 5 · Layout of the index

- Page max `--pp-page-max` 1280px (was 1040), gutters `--pp-gutter`.
- **Masthead** takes the page's one licensed breach — law 07, uniform density.
  It gets far more air than the grid, and the 6px spine marks where that stops.
  Wordmark is Hepta Slab 900 at `clamp(2.4rem, 7.5vw, 4.6rem)`, tracking
  `-0.055em`. "Workshop" sits on a `--pp-marker-citron` field with a
  `3px 3px 0` ink cast, rotated `--w-tilt`.
- The **privacy claim moves out of the footer** into the masthead, in a bordered
  strip with the lock glyph. It is the thing that makes this site different from
  every other tools site; it should not be a footnote.
- **Spine:** `border-top: 6px dashed var(--pp-plate-2)` directly under the
  masthead. Once per page. Nothing else on the page is 6px.
- **Grid:** `repeat(auto-fit, minmax(min(100%, 290px), 1fr))`, 20px gap.
- **Footer:** `3px dashed var(--pp-plate-2)`, then the fubl.org and
  felixubl/workshop links as labelled rows with the 45° external notch, then
  `Preprint rev 15`.

## 6 · Icons and pointers

Use `assets/preprint/icons/` — 28 glyphs on a 16-unit grid, 1.35px stroke,
square caps, only horizontal / vertical / 45° lines, plus at most one filled
square where a glyph needs a real dot. **Do not draw new glyphs.** If one is
missing, ask.

Two deliberate exceptions in the header, both defensible:
- The **GitHub octocat** stays as-is. A third-party brand mark on an outbound
  link, where recognition outranks the angle law. It is the only curve on the
  page and it is not ours to redraw.
- The **fubl.org link uses the plate mark**, not a glyph, because fubl.org is
  this system.

The **mode toggle** is not an icon. It is Preprint's control: a lowercase mono
state label, then a 32px button, 1px `--pp-line`, 3px radius, containing a
0.65rem solid-ink square and the **target** mode's name.

Wire the pointers from `tokens/cursors.css`: `--pp-cursor-arrow` on `body`,
`--pp-cursor-point` on anything clickable, `--pp-cursor-pressed` while the
mouse is down. Hotspots are contract — a surface may repaint a pointer, never
move its point. All are dropped on touch.

## 7 · Tools inherit the shell

`draw-svg/` and every future tool: link `preprint/styles.css` then
`site.css`, and use the system's own controls. Notably the range input — the
current one is a 16px round thumb on a 4px pill track, which is three law
breaks in one control. Replace with a square thumb on a 2px track.

## 8 · Done when

- [ ] No `--accent`, `--shadow-1`, `--shadow-2` or `--glass` anywhere.
- [ ] No `border-radius: 9999px` outside badges and tags.
- [ ] No soft `box-shadow` — every shadow is `Npx Npx 0`.
- [ ] Nothing below 11.2px.
- [ ] Body copy is Zilla Slab, not mono.
- [ ] Exactly one 6px rule on the page.
- [ ] Light and dark both checked; dark is the vendored one, unforked.
- [ ] Every one of the nineteen descriptions is byte-identical to before.
