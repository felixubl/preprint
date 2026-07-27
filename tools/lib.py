"""What is vendored, and who consumes it.

Shared by sync, push and status, because three scripts holding three copies of
the vendored file list is exactly the drift those scripts exist to prevent.
"""
import subprocess
from pathlib import Path

SYS = Path(__file__).resolve().parent.parent

# What a site actually links. The system carries more (cards, guidelines, the
# living documents, the handoff briefs) and none of it belongs in a deploy.
#
# The destination is always assets/preprint/ and that is not a preference:
# tokens/cursors.css declares its pointer urls absolutely, from
# /assets/preprint/, because a relative url() inside a custom property is
# resolved against the document by Chrome and Safari and silently 404s. Vendor
# elsewhere and the pointers go stock without telling you.
VENDOR = [
    "styles.css",    # the token entry point
    "core.css",      # every surface
    "controls.css",  # optional, pairs with js/controls.js
    "surfaces",      # reading.css and app.css
    "tokens",
    "assets",        # icons, cursors
    "js",            # mode.js, controls.js
    # The one thing here a harness rather than a page loads. Vendored anyway,
    # because a check that a site keeps its own copy of is a check that drifts
    # from the rules it is supposed to be enforcing.
    "tools/conformance.js",
]

# Never overwritten in a consumer: the system ships the Google Fonts @import and
# a site replaces it with self-hosted @font-face rules. A difference here is the
# design rather than a fault.
KEEP = {"tokens/fonts.css"}


def git(repo, *args):
    r = subprocess.run(["git", "-C", str(repo), *args], capture_output=True, text=True)
    return r.stdout.strip() if r.returncode == 0 else ""


def head():
    """The system's current commit, as a consumer would stamp it."""
    return subprocess.run(
        ["git", "-C", str(SYS), "describe", "--always", "--dirty"],
        capture_output=True, text=True,
    ).stdout.strip() or "unknown"


def find_consumers(argv=None):
    """Explicit paths if given, otherwise every sibling already carrying a copy.

    A consumer registers itself by having been synced once. There is no list to
    keep in step with reality, which is the only kind of list that stays true.
    """
    if argv:
        return [Path(a).resolve() for a in argv]
    return [
        d for d in sorted(SYS.parent.iterdir())
        if d.is_dir() and (d / "assets" / "preprint" / "VERSION").exists()
    ]


def vendored_files():
    """Every file the system would copy, as paths relative to the system root."""
    out = set()
    for item in VENDOR:
        s = SYS / item
        if s.is_dir():
            out |= {str(f.relative_to(SYS)) for f in s.rglob("*") if f.is_file()}
        elif s.exists():
            out.add(item)
    return out
