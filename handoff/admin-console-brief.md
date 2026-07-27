# Handoff — the admin console

**Scrap and build.** Do not migrate the existing admin console. Read it once to
recover anything it knows that this brief does not (credentials, paths, cron
entries, the deploy command that actually works on the box), write those down,
then delete it and build this. A console that fights its editor is worse than no
console.

Reference design: **`Preprint Admin.dc.html`** in this project's root. Open it in
a browser. It is a working prototype of every screen, and every value in it —
colours, sizes, weights, spacing, copy — is final. Read Step 0–2 of
`handoff/README.md` first; the system is vendored the same way here.

The `.dc.html` file uses a component runtime that does not exist in a plain repo.
Read it for structure, exact values and copy. Write the console the way the box
is already written.

---

## The shape of the thing

```
GitHub Pages  ←  git push  ←  Hetzner box  ←  browser
   static           build         admin          editor
```

- **Content is files in git.** One markdown file per article, one `sources.json`
  (or `.bib`), one `index.json` for the front page. Git is the database; there is
  no second one. Revision history, which you asked for, is then free — it is
  `git log` on one file.
- **The admin is a small server** on the box (whatever you are fastest in) that
  reads and writes those files and can run the build and the push.
- **The build is a static generator.** Markdown + frontmatter → the Preprint
  reading page. It runs on the box, not in a GitHub Action, so a deploy is one
  commit of built output and nothing depends on a runner being up.
- **Drafts never reach git-of-record.** Keep the working copy on the box (its own
  branch, or a plain directory that is not the published tree). What gets
  committed to the published branch is what is published. This is the whole
  point of the state machine.
- **Local-first.** Save on keystroke debounce to disk on the box; the editor
  queues writes and replays them if the connection drops. Never a save button.

## Data model

Article frontmatter — exactly these keys:

```yaml
title:     On the reluctance of systems to break their own rules
dek:       Why consistency is cheap, exceptions are expensive…
slug:      systems-reluctance
register:  science | notebook | opinion
state:     draft | scheduled | unlisted | published
schedule:  2026-08-04T09:00        # only when state = scheduled
created:   2026-07-02T11:04
updated:   2026-07-26T18:12
```

`sources.json` — one entry per source, keyed by the citation key:

```json
{ "key": "roth2002", "type": "paper", "authors": "Roth, A. E.", "year": "2002",
  "title": "The economist as engineer…", "container": "Econometrica",
  "volume": "70(4)", "pages": "1341–1378", "doi": "10.1111/1468-0262.00335",
  "url": "", "note": "" }
```

`type` ∈ `paper | book | chapter | working | web | data`. Ingest: parse real
BibTeX in full (the prototype's parser handles `@article`/`@book`/
`@incollection`/`@unpublished`/`@misc`, `{}` and `""` values, and maps
`journal|booktitle|publisher`); a bare DOI or URL creates a stub with the fields
left empty. Resolving a DOI against Crossref server-side is the obvious next
step and the prototype leaves a seam for it.

`index.json` — the front page: `headline`, `standfirst`, and an ordered list of
sections `{ id, kind: bio|writing|research|links, title, body, mode, on }`.
`mode` for `writing` ∈ `all | latest | register`.

## Site structure — read this before you touch the generator

**Reference design: `Preprint Index.dc.html` in the project root.** Open it. That
is the public front page, and it is final. The first build did not get this
right, so what follows is the vision spelled out, point by point. Where prose and
the reference design disagree, the design wins.

**One page, plus one page per piece.** The index carries a bio and then
everything written, listed in full: no nav, no landing page that sends the reader
somewhere else to start reading. Each article still gets its own URL — writing
that cannot be linked cannot be cited, and a working paper nobody can cite is a
PDF nobody found. Research is a *section* of the index, not a destination. Add a
second page only for something that genuinely is not writing (a CV).

Consequences for the generator: `/` renders `index.json` plus the published list;
`/<slug>/` renders one article. Unlisted articles are built and reachable by URL,
are absent from the index, and carry `<meta name="robots" content="noindex">`.
Drafts are not built at all.

### What the front page is, exactly

Read down `Preprint Index.dc.html` — sections are labelled `Bio`, `Writing`,
`Research`, `Elsewhere`, in that order, with no navigation anywhere on the page.

- **No nav bar. None.** Not a sticky header, not a hamburger, not a row of links
  under the name. The page is short enough to scroll and the scroll *is* the
  navigation. If you feel the urge to add a nav, the page has too much on it.
- **The masthead is the name, set enormous** — `clamp(2.6rem, 10vw, 5.5rem)`,
  weight 900, `letter-spacing: -0.055em`, `line-height: .94`. Beneath it one
  sentence in Hepta Slab **200** at `clamp(1.15rem, 3.2vw, 1.7rem)`, capped at
  `44ch`. Above both, the three-plate registration mark at 34px. That is the
  whole hero: no photo, no tagline stack, no call to action.
- **A thin metadata rule** under the masthead — city · piece count · last added,
  mono at `.72rem` in `--pp-faint`, separated by a 1px rule. It tells the reader
  the site is alive without a "recently updated" badge.
- **Bio is two paragraphs at reading size** (`1.0625rem/1.68`) in the 66ch
  column. No register legend beside it — the filter above the Writing list does
  that job, and saying it twice on one page is one time too many.
- **Writing is a list, not cards.** One row per piece: title (Hepta Slab 700,
  `1.075rem`) with the dek underneath (`.9375rem`, `--pp-muted`), date
  right-aligned in mono, and **a 2px left rule in the register's plate colour**
  — that rule is the only register marker in the list. No letter badge, no
  coloured title text, no thumbnails, no read-time, no tag pills, no "read
  more". Rows separated by 1px hairlines, `--pp-tint` on hover.
- **A register filter sits beside the Writing heading**, not in the bio and not
  in a sidebar: `everything 8 · science 2 · notebook 3 · opinion 3`, mono
  `.7rem` uppercase, each with a `.4rem` plate square, counts from the data.
  Active one is ink with a 1px underline; the rest `--pp-faint`. Hit boxes must
  be **44px tall** — put the underline on an inner span so the rule stays tight
  under the label while the button grows. Filtering hides empty year groups.
  There is no separate legend explaining the registers; the filter is the
  legend.
- **Years live in the margin column**, Hepta Slab **200** at
  `clamp(1.6rem, 4vw, 2.4rem)` in `--pp-faint`, `position: sticky; top: 1.5rem`
  — the year floats beside its group as you scroll it. This is the only
  decorative move on the page and it is doing real work.
- **Everything is listed.** No "latest 5", no pagination, no archive link. Eight
  pieces or eighty, they are all here. The admin's `writing` section supports
  `latest`/`register` modes, but `all` is the default and the intended answer.
- **Research is prose plus entries**, not a publication table: status eyebrow in
  plate colour, year, title as a link, a real abstract at `.9375rem` capped to
  `58ch`, then mono action links (`read in full ↓`, `bibtex`). Working papers are
  **pages, not PDF attachments** — that is the point of building this at all.
- **Elsewhere is a label/value list** on an `8ch` label column. Email is a
  `mailto:`; the CV is the one legitimate second page.
- **The footer states what the site does not do**: no analytics, no cookie
  notice, nothing to consent to. Set the typefaces on the record and stop.
- **Dark mode is one 34px button** in the masthead corner, no label, no
  three-state toggle. Persist the choice; honour `prefers-color-scheme` first.
- **Measure holds everywhere:** the page is `max-width: 88ch` centred, and every
  section is the same `66ch + 20ch` grid as an article body. Below 820px the
  margin column folds under the text column and the year goes static. That
  single grid is what makes the index and the articles feel like one document.

What must **not** appear on it: hero image, feature cards, "Selected work"
carousel, newsletter box, social icon row, tag cloud, search field, reading-time
badges, `View all →` links, or a footer sitemap. Every one of those was a
decision to make the reader click instead of read.

### The masthead corner and the workshop button

- **Dark-mode button**: one 34px square, top right, no label. Persist the
  choice; honour `prefers-color-scheme` first.
- **Social links** stack under it, right-aligned: `email ↗`, `scholar ↗`,
  `github ↗`. Mono `.72rem`, `letter-spacing:.06em`, `--pp-muted`, hover
  `--pp-blue-text`, each row min-height 34px. Words, not icons.
- **The workshop button** sits at the right end of the metadata rule
  (`margin-left:auto`), opposite city · count · last added. The one loud object
  on the page and the **only** use of citron on the public site:

```
background   #deee2e        (light)   rgba(222,238,46,.34) (dark)
border       2px solid var(--pp-ink)
shadow       3px 3px 0 var(--pp-ink)
type         Cousine .74rem / .08em / uppercase / 700, ink
label        ■ the workshop ↗        (■ = .45rem ink square)
hover        shadow → 1px 1px 0, transform translate(2px,2px)
min-height   44px
href         https://workshop.fubl.org
```

The press is a real displacement — the object moves onto its own shadow. Do not
substitute a colour fade; it should behave like a key being pressed. The
workshop appears once more as a plain row in Elsewhere, where a reader looks for
it deliberately instead of being sold it. Citron is spent here and nowhere else
on the site — it stays the reader's highlight colour, which is why it exists.

## Preprint markdown — the full syntax

This is the contract between the editor and the generator. Both ends must agree.

| you type | it becomes | notes |
|---|---|---|
| `## `, `### ` | section head, sub-head | Hepta Slab |
| `> ` | editorial note block | 2px ink rule, sunk ground |
| `---` | dashed rule | plate 2, dashed = a boundary the reader may cross |
| `**b**`, `*i*`, `` `c` `` | bold, italic, inline code | |
| `==text==` | citron marker | translucent field **behind** type, never recolours ink |
| `~~text~~` | pink marker | |
| `++text++` | cyan marker | |
| `^[note text]` | sidenote | numbered `<sup>`; note goes in the 20ch margin column, level with the paragraph that cites it |
| `?[term](definition)` | glossary term | dotted plate-3 underline, definition on hover/press |
| `[@key]` | citation | renders `[1]` in mono plate-3-text |
| `[@key, p. 12]` | citation with locator | renders `[1, p. 12]` |
| `[@a; @b]` | grouped citation | renders `[1, 2]` |
| `$$ … $$` | display equation | Source Serif 4, 2px ink rule, sunk ground |
| ` ```lang ` | code block | plate dots in the header, `//` lines in `--pp-faint` |
| `![caption](src)` | figure | full-grid width — the one licensed breach of the column |
| `:::def Title. \| body` | definition callout | 1px plate-1 border |
| `- ` | list | |

The first paragraph of an article takes the drop cap automatically, coloured by
register. Everything else about the reading page — measure, leading, the
sidenote fold below 820px, table scroll behaviour — is already specified in
`readme.md` and demonstrated in `ui_kits/reader/`.

### References are generated, never written

Collect `[@…]` in document order. Number by **first appearance**. Emit a
`References` section at the foot of the article containing only what was actually
cited, in that order, `[n]` in mono plate-3-text, with a `doi.org` or site link
where one exists. An unknown key must render visibly wrong — `[?key]` in plate 2
— rather than silently vanishing.

## The editor — non-obvious requirements

- **Panes.** `src / split / read`, each able to take the whole width. Below
  980px there is no split: offer `src / read` only, and make the segmented
  control show what is actually rendered. The same applies to the inspector:
  below 980px it opens as a full-screen sheet with its own Close, because a
  toggle that paints an on-state and changes nothing is a bug.
- **Undo is yours to build.** A live-preview editor holds the source in
  application state, which destroys the browser's native undo stack. Implement a
  per-article history: push a snapshot on change, **coalesce bursts** inside
  ~550ms so one ⌘Z removes a phrase and not a letter, truncate the redo tail on
  new input, and restore the caret with the text. Also wire cut/copy/paste,
  select all, and move-line (⌥↑/↓) so the palette can list them.
- **Typewriter mode** needs a hidden mirror element that copies the textarea's
  *computed* font, size, line-height, letter-spacing and width — measure the
  caret's offset there, do not multiply a hard-coded line height.
- **The cursor drives the preview.** Tint the block the caret sits in. It is the
  cheapest possible scroll-sync and it never fights the reader.
- **Annotation happens twice.** Select text and a menu appears at the pointer;
  the inspector does the same work by keyboard. Build both — the prototype
  switches between them so you can decide which stays.
- **Citing must cost nothing.** ⌘⇧C, type an author, ↵, and `[@key]` lands at
  the cursor. If nothing matches, ↵ opens Sources with the paste box focused.
- **Keyboard map** (the prototype is complete on this):

```
⌘K palette      ⌘1–7 screens     ⌘\ cycle panes    ⌘S no-op (already saved)
⌘Z / ⌘⇧Z undo   ⌘X ⌘C ⌘V ⌘A      ⌥↑ ⌥↓ move line
⌘B bold         ⌘I italic        ⌘E code
⌘H citron mark  ⌘⇧H sidenote     ⌘⇧C cite          ⌘J inspector
```

## Publishing

Two switches, on purpose: a piece becomes `published` when you say so, and the
site changes when you deploy. Flipping three things and sleeping on it must be
possible. (The prototype also has an *immediate* mode behind a setting; pick one
and keep it.)

- **Deploy** = build → commit → push. Report it honestly: what is staged, what
  is held back, the build log, the commit sha, the live URL.
- **Scheduled** publishing is a cron entry on the box that flips state and runs
  the same deploy. Say so in the UI — if the box is off, nothing goes live.
- **Revisions** are `git log -- content/<slug>.md`. A restore is a checkout of
  one blob into the working copy, which then stages like any other edit.

## Screens

Each screen in the prototype carries a `data-screen-label`:
`Editor`, `Library`, `Sources`, `Pages`, `Figures`, `Deploy`, `Settings`.
Build them in that order of importance. `Figures` is deliberately thin — it lists
dropped images and repo-resident plots and hands you the one line that inserts
one. Decide the plot story with me before expanding it.

---

## Also: the register rename

The three registers were renamed after the personal site was first built. Go
through the site repo built from `handoff/fubl-org-brief.md` and fix all three
ends of this:

| was | is now | drop cap |
|---|---|---|
| research | **science** | plate 1 · green |
| notes / notes · learned | **notebook** | plate 3 · blue |
| argument / opinion | **opinion** | plate 2 · red |

Check, specifically:

1. **Frontmatter values** in every content file (`register:`).
2. **Class names, data attributes and CSS selectors** keyed on the old words.
3. **Eyebrow copy** above article titles — it prints the register, lowercase,
   letterspaced.
4. **Index groupings and filters** that name a register in copy or in code.
5. **Drop-cap colour mapping** — green/blue/red must still map as above.
6. Any **README or content docs** in that repo that list the registers.

`notebook` is deliberate: it promises nothing about length, so a two-line entry
and a forty-page piece on something outside the field can both sit under it.
Nothing else about the system changed.

Then re-check that repo against the structure section above — if it currently
has multiple destination pages, that is the thing to reconsider, not the CSS.
