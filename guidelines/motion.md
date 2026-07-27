# Motion

Four licences. Everything else is still — including on load and on scroll. A
page that moves while being read is arguing with its reader.

### 1 · The process IS time
A parameter converging, a simulation running, gradient descent stepping. Motion
is the content here; a static frame would be a worse figure. Duration: as long
as the process takes.

### 2 · Continuity of state
A mark appearing, a menu opening, a panel arriving. Just enough that the thing
does not teleport and the eye keeps its place.
`100–140ms`, `ease-out`, opacity plus a 3px offset. Never more.

### 3 · Confirming the irreversible
One beat on an action that cannot be undone, so the hand knows it landed before
the page changes underneath it. `≤ 200ms`, once.

### 4 · Restoring position
Returning a reader to where they stopped. Smooth, because a jump loses the
context that makes the return useful. User-initiated only.

## Revoked

No entrance animations. No scroll-triggered reveals. No parallax. No hover
lifts. No looping accents. No skeleton shimmer.

## The pointer press is deliberately NOT animated

`point` casts 1.1px in plate 3; `pressed` casts 0.5px. The swap is instant. A
reader clicks hundreds of times in a session and a transition on a press is
felt as lag, not as polish.

## Reduced motion

`prefers-reduced-motion: reduce` sets every duration token to `0ms`
(tokens/motion.css). Licence 1 figures should also stop auto-running and expose
a Step control, which they do by default.
