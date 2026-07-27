# UI kit — the reader

The primary surface: a blogpost or paper, read on a screen, with interactive
figures and the reader's own highlight layer.

- `index.html` — the click-through. Select a passage and right-click (or
  long-press on touch) to highlight or copy a link that reopens on it.
- `Reader.jsx` — the article shell: progress rule, 66ch column, margin, marker
  layer, and the context menu.
- `GradientDescent.jsx` — the reference interactive figure. Any plotted figure
  (XOR surface, a neuron fitting a line) drops into the same frame.

## Geometry

| | |
|---|---|
| column | `--pp-measure` = 66ch, at every screen size |
| margin | `--pp-margin-column` = 20ch; folds inline below 820px |
| figures | span `1 / -1` — the one licensed breach of the column (law 03) |
| register | the drop cap: green research, blue notes, red argument |

## What it deliberately does not have

No notes, no reading log, no bookmarks, no export. Highlight, recolour, remove,
and share the highlight — that is the whole feature. A reader who wanted a
filing system would have opened a filing system.
