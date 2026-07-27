# Handoff — fubl.org and its admin console

Everything needed to build the personal site and the writing console behind it.
The workshop (`workshop.fubl.org`) is done and out of scope — do not touch it,
but do link to it from the front page as specified below.

Read in this order:

1. **`handoff/README.md`** — Step 0–2: vendor the design system, fonts and
   tokens. Not optional. Nothing else works until it is done.
2. **`readme.md`** (project root) — the system itself: the laws, the type scale,
   the three plates, the reading page. This is the constitution.
3. **`handoff/fubl-org-brief.md`** — the public site.
4. **`handoff/admin-console-brief.md`** — the console, and the register rename.

## The three reference designs

Open all three in a browser before writing anything. They are prototypes, not
mockups: every colour, size, weight, spacing value and line of copy in them is
final. Where prose in a brief and a reference design disagree, **the design
wins.**

| file | what it is |
|---|---|
| `Preprint.dc.html` | the system document — every rule, demonstrated, including the reading page with its sticky contents rail |
| `Preprint Index.dc.html` | the public front page — the answer to "one page or many" |
| `Preprint Admin.dc.html` | the writing and publishing console — seven screens |

They are `.dc.html` files using a component runtime that does not exist in a
plain repo. **Read them for structure, values and copy; do not try to port the
runtime.** Write the site as a static generator and the console the way the box
is already written.

## The two jobs, in one sentence each

**The site** is one page — bio, then everything written, listed in full — plus
one page per piece at its own URL. No nav.

**The console** is a writing environment on the Hetzner box that reads and writes
markdown files in git and can build and push the static site to GitHub Pages.
Scrap the existing console; do not migrate it.

## What changed since the last build

Three things, all of which need checking against what is currently deployed:

1. **Registers renamed** — `research → science`, `notes → notebook`,
   `argument → opinion`. Full checklist at the end of
   `handoff/admin-console-brief.md`. Touches frontmatter, selectors, eyebrow
   copy, index groupings, drop-cap colour mapping and docs.
2. **The front page was rebuilt** — see `Preprint Index.dc.html` and the "Site
   structure" section of the admin brief. The first attempt added chrome the
   design does not have; there is now an explicit list of what must not appear.
3. **The reading page has a contents rail** — sticky, on the left, highlighting
   the current section, with a per-section progress bar. Specified in the
   reading-page section of `handoff/fubl-org-brief.md`.

## Front-page header — the final layout

Two compact lines. The header was deliberately tightened; do not reintroduce
vertical air.

**Line 1** — `Felix Ubl` at `clamp(2.1rem, 6.5vw, 3.4rem)`, weight 900,
`letter-spacing: -0.05em`, and **opposite it, vertically centred, the two site
buttons**. There is no registration-mark logo and no standfirst: the mark is
now the **F**, set red with a 2px blue `-webkit-text-stroke` (`paint-order:
stroke fill`) and a green `text-shadow` at `.05em .05em 0`.

**The pink scrawl** — "A collection of small tools I built" in `--p-text`,
Hepta Slab 400 at `.94rem`, rotated `-2deg`, with a hand-drawn arrow curving
down-right into the workshop button. It is `position: absolute` off the button
group and `pointer-events: none`: it must contribute **zero height** to the row
and is allowed to overlap the name. The text hangs to the left of the arrow
(`position: absolute; right: 100%`), so the arrow springs from the last word and
lands on the citron button. On narrow screens it drops into normal flow and the
arrow is hidden.

**Line 2**, on a 1px rule: the three social icons (44×44, GitHub / Bluesky /
LinkedIn, `--pp-muted` → `--pp-blue-text`), then the jump nav
`writing 8 · research 2`, then the **cv** button, then `last added …` and the
dark-mode square pushed right with `margin-left: auto`.

### The three header buttons

| | ground | border | type |
|---|---|---|---|
| `workshop.fubl.org` | citron `#deee2e` / `rgba(222,238,46,.34)` dark | 2px ink + `3px 3px 0` ink shadow | Cousine .76rem, 700 |
| `projects.fubl.org` | none | 1px hairline | `--pp-faint`, `cursor: not-allowed` |
| `cv` | ink | 2px ink | `--pp-paper`, hover → plate 3 blue |

- The workshop button presses onto its own shadow (`translate(2px,2px)`, shadow
  to `1px 1px 0`). Not a colour fade. No arrow glyph on any of the three — each
  is labelled with the bare domain and an ink square.
- **projects.fubl.org does not exist yet.** Ship it disabled with a red **SOON**
  sticker rotated `6deg` over its top-right corner (`--pp-plate-2` ground, white
  Cousine `.58rem` uppercase). When the site launches, drop the sticker and give
  it an href; the formal outline stays — it is the serious sibling of the
  citron button.
- **cv** opens `cv.md` (placeholder committed at the project root). It is the one
  legitimate second page and the only place an email address appears.
- Citron is spent on the workshop button and nowhere else on the public site.

## Writing list — length control

Only the **current year** is expanded. Every earlier year collapses to one row —
`2 pieces from 2025 · show ↓` — using the same left-rule geometry as an article
row, so a decade of writing adds one line per year instead of a hundred rows.
Expanding a past year adds a `hide 2025 ↑` control under its rows; the state is
per-year and must toggle both ways. Selecting a **register filter expands
everything** — a filtered list is already short, and hiding matches inside it
would be a lie. Year labels sit in the margin column, Hepta Slab 200, sticky.

There is **no Elsewhere section**. The contact links are the header icons; saying
it twice on a one-page site is once too many.

## The console must be able to edit all of it

Anything on the front page that is not an article is edited in the console, not
in the repo. Specifically (see `Preprint Admin.dc.html` → Settings and Pages):

- **Bio** — the two paragraphs under the masthead.
- **Social links** — the three URLs, each with a shown/hidden toggle. The icon
  set is fixed at GitHub / Bluesky / LinkedIn; a fourth is a code change.
- **`cv.md`** — edited as markdown in Settings, with a word count. It is a page
  like any other; it simply never appears in Writing.
- **Sections** — order, titles, on/off, and the Writing list's mode
  (`all` / `latest` / `register`; `all` is the intended answer).
- **Repo, branch, domain** — `felixubl/felixubl.github.io`, `main`, `fubl.org`.

The **three header buttons are not editable** — they are shown in Pages as
read-only swatches so you can see what the header holds. Three buttons is the
set; if a fourth is ever wanted, that is a deliberate code change, not a row in
a settings table.

## Definition of done

- [ ] `fubl.org/` renders the header exactly as specified, two lines, no nav.
- [ ] Every published piece is on that page; past years collapse and expand.
- [ ] Register filter works and reflects real counts.
- [ ] `fubl.org/<slug>/` renders an article with sidenotes in the margin, the
      sticky contents rail, generated references, and highlight-and-share.
- [ ] `cv.md` renders from the header button.
- [ ] Drafts are not built. Unlisted are built, unindexed, `noindex`.
- [ ] The console can write an article, cite a source, flip a state, and deploy.
- [ ] `⌘Z` undoes a phrase, not a character.
- [ ] No occurrence of `research`, `notes`, or `argument` as a register anywhere.


