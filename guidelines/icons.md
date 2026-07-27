# Icons and pointers

There is no icon font and no third-party set. 28 glyphs, authored here, in
[`assets/icons/`](../assets/icons/).

## The angle law

A **16-unit grid, a 1.35px stroke, square caps, and only horizontal, vertical and
45° lines**, plus at most **one filled square** per glyph where it needs a real
dot rather than a stub of stroke. No arcs, no circles, no curves.

Consequences worth knowing, because they look like mistakes until you know the
law:

- the search glass is a square
- the eye is a lozenge
- the warning is a diamond, because a true 45° triangle is always twice as wide
  as it is tall and so has no room to stand up
- caps are square, because a round cap would reintroduce the curve the law
  removed

Colour enters a glyph **only where it reports a state**: check is plate 1, warn
and trash are plate 2, info is plate 3. Never to decorate. Inside a button an
icon inherits `currentColor`.

**Emoji: never. Unicode as iconography: only `·` as a mono separator.**

## Pointers

Twelve drawn cursors in [`assets/cursors/`](../assets/cursors/), light and dark,
exposed as `--pp-cursor-*`. Same three angles, ink-filled with a ground-coloured
keyline.

Hotspots are a contract: a surface may repaint a pointer, never move its point.

`point` is the plain arrow with the same silhouette **cast 1.1px in plate 3**
behind it, so a clickable surface reads as raised. `pressed` casts 0.5px. The
four states usually left to the operating system (help, working, blocked, resize)
are drawn, because here the pointer *becomes* the state instead of wearing a
badge. All are dropped on touch, where a drawn cursor is a lie about the input
device.

`tokens/cursors.css` declares its urls **absolutely**, from `/assets/preprint/`.
This is not a preference. Chrome and Safari resolve a relative `url()` inside a
custom property against the document rather than the stylesheet, so a relative
path silently 404s and every pointer quietly goes stock. That is also why a
consumer vendors to `assets/preprint/` and nowhere else.

A pointer that fails to load reports nothing anywhere a reader or a developer
would see it. It falls back to the keyword in its own declaration and simply
looks ordinary, which is why both consumers' harnesses load every pointer file
as an image, in both modes, and fail on any that will not decode.

## The mark

Three offset plate squares, multiplied (screen in dark mode). That is the whole
mark. The wordmark is Cousine, letterspaced.

**No logo exists and none should be drawn.** A site may wear its own mark
instead, as the workshop does, and that is a licensed variant rather than a
replacement for this one.
