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
