# Brief — build fubl.org

**Repo:** new. **Fidelity:** high — the reference designs are final.
**References:** `Preprint Index.dc.html` is the front page. `ui_kits/reader/
index.html` is the article surface. `Preprint.dc.html` demonstrates every rule
interactively, including the contents rail.

Read `handoff/START-HERE.md`, then `handoff/README.md` and do Step 0.

---

## 0 · The front page — `Preprint Index.dc.html`

One page: masthead, bio, everything written, research, elsewhere. **No nav bar
of any kind.** The full specification — including the list of things that must
not appear on it, the social links, and the citron workshop button — is the
"Site structure" section of `handoff/admin-console-brief.md`. Read it there and
build from the reference design; it is not duplicated here.

The front page and the article pages share the same `66ch + 20ch` grid. That one
shared measure is what makes the site read as a single document rather than a
site with a homepage.

---

## What this site is

Long-form writing that is **read**: research notes in economics and market
design, things learned, and the occasional argument. Interactive figures where
the process is the point. It should feel like a scientific preprint that
someone annotated by hand — austere and precise underneath, and allowed to be
strange on top.

The bar, in the author's words: *a professional who still has fun. Funky socks
and a funny tie, under a suit and a lab coat.* Precise, unexhausting, easy on
the eye except where disruption belongs. It should surprise **quietly and
often** — small strangeness everywhere, nothing loud.

It is not a blog template. There is no card grid of posts with reading times and
tags, no author bio box, no related-posts rail, no newsletter interstitial. An
index is a list of titles with dates.

## Stack

Match the workshop: plain HTML/CSS/JS, no bundler, no framework, static hosting.
Articles are the one open question — see §6. Start with hand-written HTML for
two real articles before building any pipeline.

## 1 · The reading page

Copy the geometry from `ui_kits/reader/index.html` exactly.

| | |
|---|---|
| column | `--pp-measure` 66ch, centred, **at every screen size** |
| margin | `--pp-margin-column` 20ch, for sidenotes |
| grid | `minmax(0, 66ch) minmax(0, 20ch)`, gap `clamp(1rem, 3vw, 2.25rem)` |
| body | `--pp-size-body` 17px / `--pp-leading-body` 1.68, Zilla Slab |
| figures | span `1 / -1` — the licensed breach of the column (law 03) |

**Do not shrink the measure on mobile.** Below 820px the column simply becomes
the screen: type stays 17px, margins do not vanish, and each sidenote folds
into the flow **directly after the paragraph that cites it**, keeping its number
and its blue rule. Nothing is collapsed behind a tap — a note you have to open
is a note nobody reads.

### The drop cap carries register

`--pp-dropcap-size` 3.6em, floated, `--pp-dropcap-leading`, tracking
`-0.04em`. Its colour says what kind of piece this is:

- **`--pp-plate-1` green** — **science**: a result I would defend at a seminar
- **`--pp-plate-3` blue** — **notebook**: worked through, or built. Outside the
  field is allowed, and length is not promised
- **`--pp-plate-2` red** — **opinion**: a position taken, on the record

These are the current names. Anything in the repo still saying `research`,
`notes` or `argument` is stale — see the rename checklist at the end of
`handoff/admin-console-brief.md`.

One glance at the cap and a reader knows the register. Set the same word in the
eyebrow above the title so it is legible as well as coded.

### Scholarly parts, all of which the reference implements

Citations with a reference list · sidenotes · block and inline equations
(`--pp-font-math`, Source Serif 4, **only** inside mathematics) · code blocks
with a filename bar and plate-coloured syntax · numbered figures with captions ·
data tables · callouts and definitions · a table of contents and a reading
progress rule.

### The contents rail — rebuilt, see `Preprint.dc.html`

The table of contents is **a sticky rail on the left of the article**, outside
the 66ch text column and the 20ch sidenote column. It is not a block at the top
of the piece and not a right-hand panel.

- Layout: the reading page is `17ch | article` with the rail
  `position: sticky; top: 4.5rem; align-self: start`. Below **1100px** the rail
  is `display: none` — the piece is read linearly on a phone and a persistent
  rail would eat the measure.
- Each entry is a button: section number in mono, label at `.8rem`, and
  **a 2px progress bar under the label** showing how much of *that section* has
  been read — ink while in progress, `--pp-plate-1` green at 100%.
- The **active** entry takes a 2px ink left-rule, a `--pp-tint` ground, ink text
  at weight 600. Inactive entries: hairline rule, muted text, weight 400.
- Active section = the last one whose top has passed a reading line at **42% of
  viewport height**. Per-section percentage = `(line - top) / height`, clamped.
  Compute both in one scroll handler, bail out early when nothing changed, and
  mark the listener `{ passive: true }`.
- Clicking an entry scrolls its section to 28% of viewport height, smooth.
  **Never `scrollIntoView`.**
- Under the list, the whole-piece percentage in mono `--pp-faint`. The 3px
  progress rule across the top of the article stays as well; they answer
  different questions (where am I in this section / in the piece).

**Dotted-underline terms.** `border-bottom: 1px dotted var(--pp-plate-3)` plus
`--pp-cursor-help`, revealing a small dark tooltip on hover. Use it for a term
whose definition would interrupt the sentence. The tooltip must be
`pointer-events: none` or it fights the cursor near a sidenote.

**Sidenote pairing.** Hovering a reference mark or its note tints **both** with
`--pp-tint` (5.5% ink). Faint on purpose — this is wayfinding, not annotation.

## 2 · Highlighting, and sharing the highlight

The one reader feature. Build exactly this and nothing adjacent.

- Select a passage, **right-click** for the menu. On touch, lifting the finger
  after a selection opens it — there is no right-click.
- Three markers: `--pp-marker-citron`, `--pp-marker-pink`,
  `--pp-marker-cyan`. A marker is **always a field behind type, never type
  itself**. Citron as text on eggshell measures 1.6:1; as a field behind ink,
  14:1. Same colour, opposite outcome. Never recolour the ink.
- Clicking an existing mark reopens the menu to recolour or remove it.
- **Copy link to this passage** writes `#:~:text=<encoded quote>`. On load,
  parse that fragment, re-wrap the matching text, and scroll to it —
  `getBoundingClientRect().top + scrollY - 140`, smooth. Never
  `scrollIntoView`.

**Explicitly out of scope:** notes, a reading log, bookmarks, resume-position,
PDF export of highlights. All of it was built and cut. A reader who wanted a
filing system would have opened a filing system. Do not add it back.

## 3 · Interactive figures

The figure inside `ui_kits/reader/index.html` is the reference. Two rules to copy
into every new figure:

1. **Plates by position, not meaning.** Curve in plate 3, trajectory in plate 2,
   the answer in plate 1. No plate means "good".
2. **Derive the sampled domain from the frame.** Clamping y instead draws a
   parabola flat exactly where it is steepest — worse than no figure at all.

Planned figures: gradient descent; XOR under a single neuron; a neuron
converging to the OLS fit (they are the same thing). Each gets a **Step**
control as well as **Run** — see §5.

Controls sit **below** their figure so a thumb never covers what it changes.
Range inputs are a square thumb on a 2px track. No round thumbs, no pill tracks.

## 4 · Pages beyond the article

- **Home** — masthead, then a list of pieces: title, date, register word, one
  line. No cards, no excerpts, no thumbnails.
- **About** — one column, one photograph, no timeline graphic.
- **An index of figures** would be genuinely useful and does not exist in the
  reference. Propose it before building it.

The masthead may take the page's licensed breach of law 07 — loud entry, calm
body — exactly as the workshop's does. **One** breach per view: at two, each
carries half the weight, which is worse than none. See law 00.

## 5 · Motion

Four licences, from `guidelines/motion.md`:

1. **The process IS time** — a figure converging. Motion is the content.
2. **Continuity of state** — a mark appearing, a menu opening. 100–140ms,
   `ease-out`, opacity plus a 3px offset. Never more.
3. **Confirming the irreversible** — one beat, ≤200ms, once.
4. **Restoring position** — smooth, user-initiated only.

Revoked: entrance animations, scroll reveals, parallax, hover lifts, looping
accents, skeleton shimmer. `prefers-reduced-motion: reduce` zeroes every
duration token, and licence-1 figures must then stop auto-running and expose
their Step control.

## 6 · Articles — the open question

The author writes long, possibly book-length, and wants a genuinely good writing
experience. Two viable paths; **do not pick one silently.**

**A. Extended Markdown.** Standard body, plus a small set of directives for
sidenotes, figures, equations, callouts and the register. Cheap to write,
portable, git-diffable. Costs a build step and every new device needs new syntax.

**B. Authored HTML with components.** No syntax to invent, arbitrary figures,
no build step. Costs comfort — nobody drafts twenty thousand words in tags.

The realistic answer is **A for prose with B as an escape hatch**: Markdown that
passes raw HTML through untouched, so a figure is a component and a paragraph is
a paragraph. Write two real articles by hand first. The pipeline should be
extracted from articles that exist, not designed for articles that do not.

The editor the author wants is a **separate, later project**. Do not build one
into the site. Note what the format would need from it and move on.

## 7 · Done when

- [ ] 66ch at every width; no measure shrinking on mobile.
- [ ] Sidenotes fold inline after their citing paragraph, never behind a tap.
- [ ] Highlight, recolour, remove, share — and nothing else.
- [ ] A shared link reopens on its exact sentence in a fresh browser.
- [ ] Drop cap register consistent, and named in the eyebrow.
- [ ] No marker used as text. No plate used as type below 18px.
- [ ] Nothing animates on load or on scroll.
- [ ] Light and dark both designed, using the vendored dark unforked.
- [ ] Reduced-motion honoured, and figures still usable.
- [ ] No blog furniture: no reading times, no tag clouds, no related posts.
