# Skill Evals Slides

This repository hosts a static HTML slide deck about skill evals and review workflows.

## Local preview

Open [slide-01-title.html](./slide-01-title.html) in a browser to preview the deck locally.

## Live presentation checklist

- Open the deck in a Chromium-based browser (Edge or Chrome).
- Ensure browser zoom is 100% before going live.
- Use browser fullscreen mode (`F11`) before presenting.
- Keep presenter notes on a separate display to avoid resizing the deck viewport.
- Test once on the target screen resolution before the session starts.

The deck now auto-fits a fixed 16:9 slide canvas to the available viewport, so it remains stable across different screen sizes and aspect ratios.

## Repository layout

- `slide-01-title.html` through `slide-13-closing.html`: individual slides
- `deck.css`: shared presentation styles
- `deck.js`: shared navigation, theme, and interactive behavior
- `assets/payoneer-mark.svg`: shared brand asset

## Publishing

This repository is intended to be published with GitHub Pages from the repository root.

Required support files:
- `index.html` redirects the site root to the opening slide
- `.nojekyll` disables Jekyll processing

After the remote repository is created, enable GitHub Pages from the default branch root.

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE).