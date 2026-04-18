# PayoPoint Workflow

Read this file immediately after the stop gates pass. It controls discovery, plan approval, generation order, and close-out.

## 1. Validate Applicability

Confirm all of the following before continuing:

- The user wants Payoneer-branded HTML slides or an HTML-based presentation app.
- The request is for one focused deck, not a large multi-section presentation program.
- The user is not asking for `.pptx`, Google Slides, or a generic visual design task.

If the request is too large, recommend splitting it into multiple decks before generating.

## 2. Ask Only The Missing Questions

Reuse what the user already gave you. Ask only for the decisions that still affect slide structure:

- topic or deck objective
- audience
- presentation goal: inform, persuade, train, or compare
- approximate slide count
- must-have content, metrics, diagrams, or sections
- presenter or contact details if the closing slide needs them
- whether PWA mode is required

If the user provided source markdown, validate it and ask only the questions needed to fill critical gaps.

## 3. Build The Deck Plan

Create a markdown plan that includes:

- presentation metadata
- slide order
- one chosen slide type per slide
- concise draft content or placeholders where necessary

Use [../templates/presentation-template.md](../templates/presentation-template.md) as the base format when the user needs a scaffold.

When choosing slide types:

- start with `title-slide`
- end with `closing-slide` or `next-steps-slide` plus `closing-slide`
- use `agenda-slide` only when the deck benefits from explicit navigation
- use `sequence-process-slide` when a process slide needs strong left-to-right progression with labeled panels instead of abstract step icons or a generic flow row
- prefer fewer stronger slides over padding the deck

## 4. Approval Gate

Show the markdown deck plan and stop.

Ask for one of these outcomes:

- approve and generate
- edit content first
- add or remove slides
- change slide types
- split into multiple decks

Do not generate HTML until the user explicitly approves the structure.

## 5. Generate Slides

After approval, read [generation-rules.md](generation-rules.md) for the detailed constraints, then generate all slides.

### Parallel generation with subagents (preferred when available)

If subagents are available and the deck has 4 or more slides, generate slides in parallel:

1. Read the generation rules and the relevant templates so you can include them in the subagent prompts.
2. Spawn one subagent per slide (or per batch of 2-3 adjacent slides for smaller decks). Each subagent prompt should include:
   - The slide number, slug, and declared type from the approved plan
   - The full content for that slide from the deck plan
   - The HTML source of the matching template from `templates/`
   - The file naming convention (`slide-NN-slug.html`)
   - Navigation: the filename of the previous and next slides so inter-slide links are correct
   - The output directory path
3. After all subagents complete, verify that every expected slide file was created and that navigation links between slides are consistent (first slide has no "prev", last slide has no "next").

**Subagent prompt structure:**

```
Generate a Payoneer-branded HTML slide with these details:

- Slide number: <NN>
- Slide type: <type from plan>
- Output filename: slide-<NN>-<slug>.html
- Previous slide file: <filename or "none">
- Next slide file: <filename or "none">
- Content: <slide content from the approved deck plan>
- Template HTML: <full HTML source of the matching template>
- Save to: <output directory>

Rules:
- Keep the existing Payoneer brand palette and typography from the template.
- Keep one primary idea per slide.
- Keep bullets short and presentation-ready.
- Preserve theme toggle behavior.
- Update prev/next navigation links.
```

### Sequential generation (fallback)

If subagents are not available, or the deck has 3 or fewer slides:

1. Parse each slide block.
2. Map the declared slide type to the closest template in `templates/`.
3. Fill content, navigation, and footer details.
4. Save slides as `slide-NN-slug.html` in deck order.
5. If requested, create the PWA wrapper after the slide files exist.

### Quality review with subagent (optional)

After all slides are generated, if subagents are available, spawn a review subagent to check:

- Every slide file exists and renders the correct content from the deck plan
- Navigation links form a correct chain (no broken prev/next)
- Brand consistency: Payoneer palette and typography are consistent across slides
- No placeholder text was left unfilled (unless the deck plan intentionally kept placeholders)

Report any issues found so they can be fixed before close-out.

### PWA assembly

If PWA mode was requested:

1. Generate the standalone slide files first (via the parallel or sequential path above).
2. If subagents are available, spawn a PWA subagent in parallel with the quality review to wire `templates/pwa/index.html`, `templates/pwa/manifest.json`, and `templates/pwa/sw.js`.
3. If no subagents, wire the PWA files sequentially after slide generation.
4. Fill the title, description, slide list, and cache entries.
5. Provide instructions for serving or opening the PWA entry point.

## 6. Close Out

Always finish with:

- the list of generated slide files in order
- the starting file to open
- PWA run/open instructions when applicable
- any scope tradeoffs you made, such as using the nearest existing template for a custom request