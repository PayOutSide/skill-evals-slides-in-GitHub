---
name: payopoint
description: Create Payoneer-branded HTML presentation decks and browser-based slide experiences from outlines or markdown. Use this whenever the user wants a Payoneer deck, stakeholder slides, an executive update, an architecture presentation, or an installable presentation app in HTML or PWA form, even if they just say "deck" or "slides" without naming HTML. Do not use for PowerPoint or Keynote authoring, generic non-Payoneer visual design, single-page posters, or PDF-only deliverables.
---

# PayoPoint

Use this skill to turn structured content into a short, polished, Payoneer-branded HTML presentation.

## Outcome

The workflow should leave the user with:

- an approved markdown deck plan
- a set of generated HTML slide files that reuse the existing templates in `templates/`
- an optional PWA wrapper when the user explicitly asks for installable or offline presentation mode
- a short summary of generated files and how to open them

## Stop Gates

Before planning or generating slides, verify all of these are true:

1. The requested output is HTML slides or an HTML-based presentation app, not `.pptx`, Google Slides, or a PDF-only artifact.
2. The deck should follow Payoneer branding. If the user wants a different brand system, stop and say this skill is not the right fit.
3. The scope is one focused deck, normally 5-20 slides. If the user wants a much larger deck, stop and recommend splitting it into multiple presentations before generating.

If any gate fails, stop and explain why instead of forcing this skill onto the request.

## Mandatory Order

Follow this sequence exactly:

1. Validate applicability and missing inputs.
2. Ask only the unresolved discovery questions.
3. Build the markdown deck plan.
4. Present the plan and wait for explicit approval.
5. Generate slides only after approval.
6. Summarize the outputs and opening instructions.

Do not generate HTML before the user approves the deck plan.

## Discovery Rules

- Reuse information the user already supplied. Do not re-ask for topic, audience, tone, or format if it is already clear.
- Ask only for missing decisions that change the slide structure, such as audience, goal, slide count, required content, presenter details, or whether PWA mode is needed.
- If the user has only rough content, propose a concrete slide map with light placeholders rather than blocking on perfect input.
- If the user supplied markdown already, validate and refine it instead of replacing it with a brand new structure.

Use the exact workflow in [references/workflow.md](references/workflow.md) after the stop gates pass.

## Generation Rules

- Reuse the existing templates in `templates/` and map each slide to the closest supported type.
- Prefer the simplest template that matches the message of the slide. Do not invent a new slide type when an existing one is close enough.
- Prefer `sequence-process-slide` for technical workflows that need 4-6 explicit left-to-right stages with compact panel copy and visible chevron separators.
- Keep slide copy concise and presentation-ready. Short bullets beat dense paragraphs.
- When PWA mode is requested, generate the normal slides first and then wire the files in `templates/pwa/`.

Use [references/generation-rules.md](references/generation-rules.md) after approval for the detailed slide-generation rules, and use [references/slide-catalog.md](references/slide-catalog.md) when selecting slide types.

## Subagent Execution Strategy

When subagents are available, use them to parallelize slide generation and quality review. This significantly speeds up deck creation for larger presentations.

### When to use subagents

- **Slide generation (step 5)**: After the user approves the deck plan, spawn one subagent per slide (or per batch of 2-3 slides) to generate HTML files in parallel. Each subagent receives its slide spec, the matching template, and the generation rules. This is the highest-impact opportunity because slides are fully independent of each other.
- **Quality review (after step 5)**: Spawn a single review subagent to check all generated slides for brand consistency, navigation link integrity, and content completeness before presenting the final summary to the user.
- **PWA assembly**: If PWA mode was requested, spawn a subagent to wire the PWA wrapper in parallel with the quality review.

### When to skip subagents

- During discovery and planning (steps 1–4): these are conversational and require the user's input at each stage. Keep them in the main flow.
- For decks with 3 or fewer slides: the overhead of spawning subagents outweighs the time saved. Generate sequentially instead.
- When subagents are not available in the environment: fall back to sequential generation as before.

See [references/workflow.md](references/workflow.md) step 5 for the detailed subagent spawning instructions.

## Reference Usage Map

- [references/workflow.md](references/workflow.md): read this immediately after the stop gates pass; it controls discovery, planning, approval, generation order, and close-out behavior.
- [references/slide-catalog.md](references/slide-catalog.md): read this when mapping slide goals to the available templates.
- [references/generation-rules.md](references/generation-rules.md): read this only after approval; it contains naming, navigation, PWA, and brand-consistency rules.
- [templates/presentation-template.md](templates/presentation-template.md): use this as the base content template when the user needs a markdown scaffold or when an attached draft needs normalization.

## Required Deliverable

After generation, provide:

- the finalized markdown deck structure or confirmed source markdown
- the list of generated HTML files in deck order
- PWA run/open instructions when applicable
