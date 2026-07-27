---
name: preprint-design
description: Use this skill to generate well-branded interfaces and assets for PREPRINT, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for protoyping.
user-invocable: true
---

Read `readme.md`, then `guidelines/invariants.md`. Between them they answer the
two questions that matter: what is fixed, and what is yours. `guidelines/laws.md`
covers deviation, which is allowed and budgeted rather than forbidden.

This is a design **language**, not a specification to comply with. The fixed part
is short and mostly colour. Everything else is a vocabulary to build from, and
two things made with it should look like siblings rather than like the same thing
twice.

So do not reproduce what is here. `surfaces/app.css` is parts, not an app. If you
find yourself lifting a whole screen out of this repo, you have taken the wrong
thing. Build the surface the job actually needs and let the constants make it
recognisable. The guidelines are written tersely and in the indicative, which is
a house style for stating a rule compactly and not a claim that the rule outranks
the judgement of whoever is designing.

If the task is to implement this system in a real repository, the workshop at
workshop.fubl.org or the personal site at fubl.org, read `handoff/README.md`
first and follow the brief for that job. Those briefs are authoritative for
migration decisions and supersede your own judgement about what to keep.

Never edit a consumer's `assets/preprint/`. It is a vendored copy, and the next
sync overwrites it. Change the system here and run `tools/push`, which lands it
in every consumer at once. `tools/status` says who is running which commit.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy
assets out and create static HTML files for the user to view. If working on
production code, you can copy assets and read the rules here to become an expert
in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they
want to build or design, ask some questions, and act as an expert designer who
outputs HTML artifacts _or_ production code, depending on the need.
