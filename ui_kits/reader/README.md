# UI kit — the reader

The primary surface: a blogpost or paper, read on a screen, with interactive
figures and the reader's own highlight layer.

`index.html` is the whole kit and the only file here. The click-through: select a
passage and right-click (or long-press on touch) to highlight or copy a link that
reopens on it. It carries the article shell (progress rule, 66ch column, margin,
marker layer, context menu) and the reference interactive figure, both written
inline.

The figure is a gradient descent. Any plotted figure (an XOR surface, a neuron
fitting a line) drops into the same frame. It used to sit beside this file as a
standalone `GradientDescent.jsx`, next to a `Reader.jsx` that had already been
deleted from underneath this list. Nothing ever loaded either of them, which is
the same reason the whole `components/` directory went: a component nothing
renders can only drift, and both had.

## Geometry

| | |
|---|---|
| column | `--pp-measure` = 66ch, at every screen size |
| margin | `--pp-margin-column` = 20ch; folds inline below 820px |
| figures | span `1 / -1`, the one licensed breach of the column (law 03) |
| register | the drop cap: green science, blue notebook, red opinion |

## What it deliberately does not have

No notes, no reading log, no bookmarks, no export. Highlight, recolour, remove,
and share the highlight — that is the whole feature. A reader who wanted a
filing system would have opened a filing system.
