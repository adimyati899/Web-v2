# DIMYATI_XBT — 2 TAB FINAL

## Structure
- `index.html` = main portfolio. No video elements are rendered on the homepage.
- `work.html` = Example Work tab. Contains the 9:16 and 16:9 video portfolio.
- `style.css` = existing visual system plus only the additive styles needed for the two-tab split.
- `script.js` = page-aware rendering, grouped ecosystem links, video controls and GIMI 3D orb.

## Important changes
- Homepage keeps the existing layout/style but removes all video sections from the page.
- `Example Work` opens `work.html` and contains the videos + project descriptions.
- Social links, creator campaign platforms, and AI tools are separated into three groups.
- No duplicate VEED/Pollo entries.
- No local `gimi-logo.png` dependency. GIMI logo is loaded from the official GIMI website favicon URL and placed into a JS/CSS 3D glass orb.
- Videos do not autoplay. Each video has its own play/pause control; only one video plays at a time.
- Same-page anchors are handled without a forced jump-to-top.
- Spacing remains intentionally compact; the existing visual language is not rebuilt.

## Repo note
Remove the old `gimi-logo.png` from the repository after this version is confirmed working.
Keep the existing video assets in the repository (`v1.mp4` ... `v10.mp4`, `h1.mp4` ... `h6.mp4`, and `h7_compressed_20mb.mp4`).
