# PayoPoint Generation Rules

Read this file only after the user approves the deck plan.

## Slide Generation

- Reuse the existing HTML templates in `templates/`.
- Keep one primary idea per slide.
- Keep bullets short. Convert dense prose into brief phrases or supporting labels.
- Preserve the Payoneer look and feel already encoded in the templates instead of restyling each slide from scratch.
- Use `sequence-process-slide.html` for process-heavy technical slides that need 4-6 labeled stages and simple chevron separators between panels.
- Do not create a new template unless the request cannot be satisfied with any existing one and the user explicitly needs that change.

## File Naming

- Name slides `slide-01-title.html`, `slide-02-agenda.html`, and so on.
- Use a stable, readable slug based on the slide purpose.
- Keep numbering contiguous and aligned with presentation order.

## Navigation And Theme

- Update next-slide navigation between standalone slides.
- Preserve the existing theme toggle behavior inside standalone slides.
- Keep the closing slide free of broken next links.

## PWA Mode

If the user asks for installable, offline, fullscreen, or app-like presentation mode:

1. Generate the standalone slide files first.
2. Copy and wire `templates/pwa/index.html`, `templates/pwa/manifest.json`, and `templates/pwa/sw.js`.
3. Fill the title, description, slide list, and cache entries.
4. Provide instructions for serving or opening the PWA entry point.

Do not generate the PWA wrapper unless the user asked for it.

## Brand And Content Guardrails

- Use the existing Payoneer brand palette and typography already present in the templates.
- Keep executive decks outcome-focused and concise.
- Keep technical decks concrete: diagrams, process flow, architecture callouts, and metrics should be preferred over generic slogans.
- If source content is incomplete, preserve placeholders only where necessary and tell the user what still needs real values.

## Final Summary

Always report:

- what files were generated
- which file to open first
- whether PWA mode was included
- any notable approximations or missing source details