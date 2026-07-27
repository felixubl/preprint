# Decisions — PREPRINT

Why this repo is shaped the way it is. The decisions that belong to the SYSTEM
live here. Decisions about how one site consumes it live in that site's own
`DECISIONS.md` (fubl.org's is the reference).

## 2026-07-27 — The system became its own repo, scraped from what actually shipped

**Decided:** PREPRINT moved out of `felixubl/personalwebsite/design/` into this
repo, and its component layer was rebuilt from the CSS that two live surfaces
were really running: fubl.org's `assets/site.css` and the writing console's
`admin/admin.css`.

**Why:** the old `components/` held fourteen React `.jsx` files. The site this
system dresses is a Python generator emitting static HTML and linking plain
CSS, so nothing could ever load them. They drifted until they described a
system no surface had, while the real component layer was maintained by hand,
twice, in two stylesheets that had quietly duplicated fourteen class names. The
token layer was the only part that survived contact with reality, because both
surfaces genuinely shared it.

**Not explicitly requested** — dropping the JSX rather than porting it. The
component *names* were kept as the taxonomy in `readme.md`, because they turned
out to map one-to-one onto classes the surfaces had really built (Sidenote is
`.note`, Mark is `.mk`, DataTable is `.table`, Tag is `.pill`). Flagged for
review.

## 2026-07-27 — Three sheets, and two of them are never loaded together

**Decided:** `core.css` is what every surface gets. `reading.css` and `app.css`
are surface sheets and a page loads exactly one. Four class names (`.btn`,
`.note`, `.rail`, `.head__row`) are defined in both surface sheets, differently,
on purpose.

**Why:** those four collided when the two stylesheets were compared. A reading
page's `.note` is a numbered sidenote on a plate 3 rule. An app's `.note` is a
faint hint on a hair rule. They are not one component that drifted, they are two
components that collided, and the readme already opened by calling this "a
design system for pages that are read and apps that are used". The collision was
structure the system had declared and never encoded.

**The alternative not taken:** prefixing every colliding class (`.rd-btn`,
`.app-btn`) would have churned every template on both surfaces to fix a problem
that only exists if you insist one sheet must serve both. A base-plus-modifier
scheme was rejected because the two buttons share almost no declarations, so the
base would have been nearly empty. Felix picked surface scoping with all three
options in front of him.

## 2026-07-27 — `reading.css` styles what a renderer emits, not the page around it

**Decided:** the row grid, the article, sidenotes, figures, tables, code,
callouts, mathematics and the marker layer are the system's. The page shell (the
page grid, the contents rail, the top bar, the reading progress) is the
consumer's.

**Why:** the first cut put the shell in the system and immediately broke the rule
the system exists to keep. `.read` and `.rail` read `--site-page`, `--site-rail`
and `--site-gap`, which are one site's variables, so a "system" file would have
depended on its consumer. Moving the boundary to what a renderer emits fixed
that and turned out to be the more useful line anyway: a console previewing this
renderer's output can load exactly `reading.css` and get exactly the reader's
geometry, with none of the site furniture that would be a lie inside an editor.

**Consequence:** `.row`'s gutter is now `--pp-column-gap`, declared in
`reading.css` at the value `--site-gap` already carried, so nothing computes
differently.

**Not explicitly requested** — the boundary itself. Flagged for review.

## 2026-07-27 — `app.css` is the console, verbatim, for now

**Decided:** all 586 lines of the console's stylesheet became `app.css`,
including classes that are clearly one site's content model rather than generic
app furniture: `.pill[data-state='scheduled']`, `.reg-sq`, `.staged`, `.pipe`,
`.srcrow` and the settings rows.

**Why:** the console is currently the only app this system dresses, so it is the
app surface. Splitting generic furniture from content model is a real and worthwhile
distinction, but making that cut inside a refactor that had to prove it changed
nothing would have risked breaking the console silently. A second app is the
honest moment to make it.

**Not explicitly requested** — promoting the console's domain vocabulary into the
system. Flagged for review, and the cheapest thing here to reverse.

## 2026-07-27 — Consumers vendor a copy, they do not track a live file

**Decided:** a consumer takes a committed copy of this repo's output and adopts a
change by re-running its own sync. fubl.org's `tools/sync-preprint` is the
reference implementation. It re-copies every file, refuses to touch the one the
site deliberately overrides, and writes a `VERSION` stamp naming the commit.

**Why:** the brief was "change one thing and it changes everywhere", and that is
the thing design system teams deliberately do not build. Instant propagation
means any tweak can break every consumer at once with no way to stage the fix.
Single source of truth plus explicit adoption is what the practice actually is.
A CDN URL was rejected for that reason and because it hands a third party a
request per reader, which is the same objection that made fubl.org self-host its
fonts in the first place.

**Not explicitly requested** — the font-family guard in the sync script. It reads
the family names out of both copies of `tokens/fonts.css` and refuses to sync if
the system has changed which families it asks for. Without it, a consumer's
self-hosted override would keep serving the old faces and look correct while
being wrong, which is exactly the failure that is hardest to notice. Flagged for
review.

## 2026-07-27 — This repo was initialised and committed without being asked

**Decided:** three commits were made here during the extraction.

**Why:** the sync script stamps `VERSION` from `git describe`, so a repo with no
commits has no version to record and the staleness check the vendoring model
depends on would not work. The consuming site was deliberately left uncommitted
so its diff can be reviewed.

**Not explicitly requested** — flagged for review. Nothing here is pushed
anywhere and there is no remote configured.

## 2026-07-27 — The system took the pointer paths back

**Decided:** `tokens/cursors.css` declares its thirteen pointers at absolute
paths from `/assets/preprint/`, and vendoring there is now a stated contract
rather than a convention.

**Why:** a relative `url()` inside a custom property is resolved against the
DOCUMENT in Chrome and Safari, not against the stylesheet that declares it. The
vendored file said `../assets/cursors/…`, which 404s from any page depth, and the
browser then falls back to the keyword in the same declaration, so every pointer
merely looks stock and nothing reports it. fubl.org hit this and restated all
twenty six declarations in its own layer. The workshop hit it independently and
restated the same twenty six at a different path. `guidelines/laws.md` already
rules on that case: a breach used twice is an undeclared token. Both consumers
deleted their block and neither lost a pixel.

**The cost, stated plainly:** absolute paths hard-code the mount point. A
consumer that cannot vendor to `/assets/preprint/` has to rewrite this one file.
That was weighed against the alternative of generating the file per consumer at
vendor time, which would have made one vendored file differ by design and
removed the ability to diff a copy against the source. Felix chose the fixed
mount point with both options in front of him.

## 2026-07-27 — Variants belong to their consumer

**Decided:** `variants/` was created in this repo and then removed in the same
session. A site's variant layer lives in that site's repo as `assets/site.css`
and is never vendored back.

**Why:** holding `workshop.css` here made fubl.org vendor a file it will never
link, and put a round trip through this repo in front of changing a workshop
colour, which is the file most likely to change. The contract is documented in
`readme.md` instead, and each site's harness enforces it by reading its own
variant layer and failing on any `--pp-paper`, `--pp-ink` or `--pp-plate-N`
declaration.

**Not explicitly requested** — creating `variants/` in the first place was my
call, from the surface-versus-variant framing, and removing it again is the
correction. Flagged so the reasoning is on the record rather than just the
outcome.

## 2026-07-27 — A consumer may ship a subset of the faces, if it says so

**Decided:** `tools/sync-preprint` refuses to sync when the consumer's
self-hosted `tokens/fonts.css` no longer covers the families the system asks
for, unless the file names the omission explicitly:

    omits: Source Serif 4 — mathematics only, and the workshop has none

**Why:** the guard fired for real on its first run against the workshop, which
self-hosts three faces and not the fourth. That is correct for a tools site with
no equations, and it is indistinguishable in a diff from a face that went missing
by accident. Making the site say which one it is costs one line and turns a
silent divergence into a declared one.

**Not explicitly requested** — the subset escape hatch. The guard as originally
written would have blocked the workshop's sync outright. Flagged for review.

## 2026-07-27 — MIT, `main`, and what was checked before agreeing to publish

**Decided:** this repo carries the MIT licence, its branch was renamed `master`
to `main`, and it gained a `.gitignore` for `.DS_Store` and `__pycache__`.

**Why the licence:** Felix chose to make the repo public. A public repo with no
licence is all rights reserved by default, which is the opposite of what
publishing a design system is for. MIT is the licence `neo-retro` already
carries, and that is the closest precedent: his other public design system.
Copying an existing choice rather than inventing one.

**Why the branch rename:** `git init` produced `master` here while
`personalwebsite`, `workshop` and `fubl-admin` are all on `main`. One repo
disagreeing about its default branch is a small thing that costs an extra thought
every time someone pushes.

**Checked before agreeing it should be public**, because "no secrets" is a claim
that has to be earned rather than assumed:

- No private keys, GitHub or Slack tokens, AWS keys or quoted passwords anywhere
  in the tree.
- No mention of the VPS address, the bcrypt hash, `basic_auth` or the deploy key
  in any of the briefs. The deployment runbook lives in the private `fubl-admin`
  repo and did not come along.
- All three screenshots in `uploads/` were opened and looked at: a warning
  callout demonstrating law 00, the three register drop caps, and a breach
  specimen. Design documentation, nothing personal.
- `uploads/the-framework-12-skins.html` (992K) is the lineage document the readme
  already cites. The only matches for "token" in it are design tokens.

**Not explicitly requested** — the licence, the branch rename and the
`.gitignore`. Flagged for review. The repo itself was NOT created on GitHub:
Felix asked for that to wait for his go-ahead, and it has.

## 2026-07-27 — A drift dashboard, and what "behind" is allowed to mean

**Decided:** `tools/status` reports, for every consumer sitting beside this repo,
which commit its vendored copy came from, whether any vendored file has been
edited by hand, and what is uncommitted or unpushed. It is read-only and exits
0 in sync, 1 behind, 2 hand-edited.

**Why:** vendoring buys deliberate adoption and charges for it in visibility.
Nothing in the model tells you what is actually deployed, and "remember to check"
is not a mechanism. Felix asked how to keep everything nicely synced, and the
honest answer is that he should not have to hold it in his head.

**The one design call worth arguing about:** "behind" counts only commits that
touched a path a consumer actually vendors. This repo's decision log, licence
and tooling change often and reach nobody, and the first run of the tool proudly
announced that both sites were three commits behind when not one vendored byte
had moved. A status tool that cries wolf is a status tool people stop reading, so
doc-only commits are silent by construction.

**Hand-edit detection is the part that matters.** A stale copy announces itself
eventually. A vendored file someone edited in place looks exactly like a synced
one, survives every future sync as a silent revert, and is the failure this whole
model exists to prevent. Verified in both directions before committing: green
when the trees match, and exit 2 naming `assets/preprint/core.css` when a single
comment line was planted in it.

**Not explicitly requested** — the tool, and the definition of behind. Flagged
for review.

## 2026-07-27 — `app.css` is parts, not an app. The console went home

**Decided:** the 560-line `app.css` was cut to roughly 270. What stayed is what a
second app would want: the rail, screens, heads, `.btn`, `.seg`, `.find`,
`.stat`, `.panel`, `.ico`, `.tgl`, `.onoff`, `.srow`, `.legend`, `.drop`,
`.foot`, the base `.pill`, and the overlays. What left is what only the writing
console knows about: the library list, the whole editor, deploy, the source
picker, the figure list, `.swatch`, `.secrow`, and `.pill[data-state]`. Those
live in `personalwebsite/admin/console.css` now.

**Why:** the entry above ("`app.css` is the console, verbatim, for now") called a
second app the honest moment to make this cut. The second app never arrived, but
the requirement did: the system is meant to be a signature rather than a uniform,
and an app that links a finished console has been handed a uniform. The cut was
verified by comparing selector sets before and after: 226 rules in, 107 + 119
out, nothing dropped and nothing invented except the rename below.

**Not explicitly requested** — where exactly each rule landed. The test applied
was one question: would a second app, doing something else entirely, still want
this? `.drop` and `.onoff` passed it and stayed. `.swatch` and `.secrow` did not.
The line is written into `app.css`'s header so the next person applies the same
test rather than a new one.

## 2026-07-27 — `.field` is the input. The wrapper became `.frow`

**Decided:** `app.css`'s `.field` (a label-above-control grid wrapper) was
renamed `.frow`. The name `.field` now belongs to `controls.css`, where it styles
the input itself.

**Why:** the two meanings collided the moment `controls.js` joined the system.
The workshop had used `.field` for the input in eight places and `controls.js`
generates it; the console had used it for the wrapper in two, both inside
`admin.js`. Two occurrences lose to eight, and the input is the more natural
reading of the word anyway.

**Not explicitly requested.** It touched two lines of `admin.js`.

## 2026-07-27 — Behaviour joined the system, and brought its faces with it

**Decided:** `js/mode.js` and `js/controls.js` are vendored alongside the CSS,
and `controls.css` came with them as a root-level optional sheet.

**Why:** the mode switch was written twice, once in fubl.org's `site.js` and once
in the workshop's `theme.js`, and both files described it as "the same object the
other one wears". By this system's own rule a breach used twice is an undeclared
token. The drawn controls were only in the workshop, but they are enhancement
over native inputs and the console is the obvious second customer.

`controls.css` had to follow `controls.js` and could not stay behind in the
workshop: the script generates class names, and a script whose faces live in one
consumer is not in the system in any useful sense. It sits at the root rather than
in `surfaces/` because it is not a surface. A reading page with one form and a
console with forty want the same number field, so it loads with either sheet.

**Not explicitly requested** — moving `controls.css`, and dropping `title` from
what `mode.js` sets. fubl.org's old implementation set `title` on the toggle,
which produces the operating system's tooltip box, and this system replaced that
with `[data-tip]`. `mode.js` sets `aria-label` and `data-tip` and leaves `title`
alone, so fubl.org loses a native tooltip on one button and gains the correct
accessible name.

## 2026-07-27 — The sync moved here, and `tools/push` is the point of the repo

**Decided:** `tools/sync-preprint` was byte-identical in both consumers. The real
implementation is now `tools/sync <consumer>` here, each consumer keeps a
three-line shim under the old name, and `tools/push` runs the sync across every
consumer in one command. `tools/lib.py` holds the vendored file list and the
consumer discovery that all three tools share.

**Why:** the ask was to change the system once and have it land everywhere
instead of visiting each site. Vendoring is worth keeping (offline builds, no
runtime dependency, a stale copy that is visible rather than suspected) and none
of it required the sync to be duplicated per consumer. Two byte-identical copies
of the anti-drift script was the joke writing itself.

`push` deliberately does not deploy, and only commits when asked. A change that
reaches every site the instant it is saved is a change that can break every site
the instant it is wrong.

**Not explicitly requested** — `tools/lib.py`. Three scripts holding three copies
of the vendor list would have been the same fault one layer up.

## 2026-07-27 — `status` can tell "behind" from "edited by hand"

**Decided:** a vendored file that differs from the system's HEAD is only reported
as hand-edited if it also differs from what the system shipped at the commit the
copy is stamped with.

**Why:** the old check compared against HEAD only. It had never been wrong
because the consumers had never been behind, and the first real system change
made it report both consumers as EDITED BY HAND when they were simply out of
date. A dashboard that cries wolf is a dashboard nobody reads, and this one is
the only thing standing between the vendoring model and silent drift.

## 2026-07-27 — The conformance check is vendored, not copied

**Decided:** `tools/conformance.js` is in the vendored set, so a consumer links
it rather than keeping a copy. The workshop's harness, which had this check
written out inline, now calls it.

**Why:** a check that each site owns a copy of is a check that drifts away from
the rules it is enforcing. It also gained a third assertion the inline version
never had: every `--pp-*` a variant layer sets must be one the system actually
defines. That immediately caught `--pp-screen-dot`, which the workshop invented
and which had been sitting under the system's prefix looking official.

It reads the token files to learn what the system defines rather than holding a
list, so it stays true when the system gains a token.

## 2026-07-27 — The readme became a front door, and the guide moved to `guidelines/`

**Decided:** `readme.md` was cut from 271 lines to a front door: the premise, the
layer diagram, how to load it, how to consume it, and an index.
`guidelines/invariants.md`, `guidelines/voice.md` and `guidelines/icons.md` are
new, and `laws.md` and `motion.md` were already there.

**Why:** the request was for the system to be, first, a design guide: general
rules, and when breaking them is fine. All of that existed and none of it was
findable, because the rules were prose in a readme that also had to explain the
loading order and the vendoring model. `invariants.md` is the one that answers
the actual question, which is what is fixed and what is mine.

**Not explicitly requested** — `guidelines/icons.md`. The angle law was one of
the readme's longest sections and is a rule, not an introduction.

## 2026-07-27 — No em dashes, and the last of the JSX

**Decided:** `guidelines/voice.md` now says no em or en dashes as punctuation,
reversing what the readme used to instruct. Prose already in the repo is
corrected as files are touched rather than in one sweep. Separately, `uploads/`
(1.3MB of screenshots and one unreferenced 1MB HTML file) and the last three
`GradientDescent.*` files in `ui_kits/reader/` were deleted.

**Why:** the dash rule contradicted the standing rule of the only person writing
here, and had never been a considered position. The `GradientDescent` files were
the final remnant of the `components/` layer that the first entry in this file
records dropping, for exactly the reason given there: nothing loaded them. The
kit's `index.html` defines its own figure inline and always did. `ui_kits/reader/
README.md` had also been listing a `Reader.jsx` that was already gone.

**Not explicitly requested** — the deletions were in the agreed plan, the prose
references pointing at them were not, and both were repointed at the file that
actually works.

