# Deployment Sanity Checklist

Use this checklist before each deployment or publish of the Skill Evals deck. The goal is to catch broken navigation, theme regressions, asset issues, and interactive behavior regressions before the deck is pushed.

## How To Use This

1. Open the deck locally in a Chromium-based browser.
2. Complete the manual checks below in order.
3. Treat any failed check as a deployment blocker.

## Scope

- Fixed 14-slide deck flow
- Shared runtime in `deck.js`
- Shared presentation styling in `deck.css`
- Review gallery interaction on slide 11
- Checklist interaction on slide 13
- Theme persistence and visible navigation behavior across the whole deck
- Responsive slide scaling inside the fixed 16:9 canvas
- Visual integrity for typography, spacing, images, and overlays

## Preconditions

- Browser zoom is set to 100%.
- The deck opens from `slide-01-title.html`.
- No local edits are pending that are unrelated to the release.
- The exact review gallery screenshots are present under `assets/review-gallery/`.
- Test in a Chromium-based browser on the target display size if one is known.
- Start with the browser window maximized.

## Manual Sanity Flow

Complete these broad checks before moving into the detailed cases:

- Open `slide-01-title.html` locally.
- Confirm the deck still contains slides 01 through 14 in order.
- Confirm the review gallery screenshots are present on slide 11.
- Confirm the checklist interaction is present on slide 13.
- Confirm no shared styling or asset is visibly broken.

## Coverage Matrix

Use this matrix to make sure the manual pass is not skipping entire categories.

| Area | Minimum coverage |
| --- | --- |
| Theme | Slides 01, 06, 11, 13, 14 |
| Arrow navigation | Slides 01, 05, 10, 11, 12, 13, 14 |
| Click-edge navigation | Slides 06, 07, 11, 12 |
| Keyboard navigation | Slides 03, 10, 14 |
| Size and scaling | Windowed desktop, maximized desktop, narrow width |
| Visual review | Every slide, with extra attention on slides 01, 10, 11, 13, 14 |
| Interactive widgets | Slide 11 gallery and slide 13 checklist |

## Test Environments

Run the manual pass in these view states:

1. Maximized desktop browser at 100% zoom.
2. Smaller windowed desktop browser at 100% zoom.
3. Fullscreen mode with `F11`.

If the actual presentation display is known before deployment, repeat the critical visual checks there.

## Visual Review Heuristics

Use these heuristics on every slide, not just on the opening and closing slides:

- No headline, paragraph, label, or footer text is clipped.
- No component overlaps the navigation arrows, footer, or slide number.
- Decorative background elements do not cover content.
- Panels, cards, tables, and screenshots remain inside the 16:9 slide canvas.
- Typography hierarchy is intact and legible.
- No unexpected scrollbar appears inside the page.
- No image appears stretched, blurry beyond expectation, or missing.

## Detailed Manual Test Cases

### TC-01 Opening Slide Loads Correctly

- Type: Happy path
- Priority: Blocker
- Steps:
  1. Open `slide-01-title.html`.
  2. Confirm the slide fills the viewport proportionally.
  3. Confirm Payoneer branding, title, presenter block, and footer appear.
- Expected result:
  - The first slide renders without broken styles or missing shared assets.

### TC-02 Deck Opens At Correct Scale

- Type: Happy path
- Priority: Blocker
- Steps:
  1. Open `slide-01-title.html` in a maximized browser window.
  2. Confirm the slide is centered within the viewport.
  3. Resize the window to a smaller desktop size.
  4. Confirm the slide rescales without horizontal scrolling.
  5. Enter fullscreen mode with `F11` and confirm the slide remains proportionally scaled.
- Expected result:
  - The 16:9 slide canvas scales to fit the available viewport.
  - No content is pushed off-screen.
  - The page does not introduce browser scrollbars during normal viewing.

### TC-03 Full Slide Sequence Is Reachable

- Type: Happy path
- Priority: Blocker
- Steps:
  1. From slide 01, use only the next arrow to move through slides 02 to 14.
  2. Confirm each slide number increments by 1.
  3. From slide 14, use only the previous arrow to move back to slide 01.
- Expected result:
  - No slide is skipped.
  - No navigation loop or dead end appears.
  - The deck ends at slide 14 and starts at slide 01.

### TC-04 Slide Numbers Match The Sequence

- Type: Happy path
- Priority: Blocker
- Steps:
  1. Move through the full deck from slide 01 to slide 14.
  2. On each slide, verify the visible slide number matches the file order.
  3. Pay special attention to slides 10 through 14 after the gallery reorder.
- Expected result:
  - The visible numbering is sequential from `01 / 14` through `14 / 14`.
  - No duplicate or stale numbering remains.

### TC-05 Edge Navigation Behavior

- Type: Negative path
- Priority: High
- Steps:
  1. On slide 01, confirm there is no visible previous navigation.
  2. Click in the far-left edge area of the slide.
  3. On slide 14, confirm there is no visible next navigation.
  4. Click in the far-right edge area of the slide.
- Expected result:
  - Slide 01 does not navigate backward.
  - Slide 14 does not navigate forward.
  - Hidden edge arrows do not expose broken behavior.

### TC-06 Theme Toggle Works On Core Slides

- Type: Happy path
- Priority: Blocker
- Steps:
  1. On slide 01, toggle dark to light and back to dark.
  2. Repeat on slide 11, slide 13, and slide 14.
  3. Refresh one slide while in light mode.
- Expected result:
  - Each click flips the theme immediately.
  - The second click restores the original theme.
  - Refresh preserves the current theme.

### TC-07 Theme Visual Integrity In Light Mode

- Type: Visual check
- Priority: Blocker
- Steps:
  1. Switch to light mode on slide 01.
  2. Visit slides 06, 10, 11, 13, and 14.
  3. Inspect text contrast, panel contrast, screenshot borders, and footer readability.
- Expected result:
  - Text remains readable in light mode.
  - Cards and panels preserve separation from the background.
  - The gallery screenshots remain clearly framed.
  - No slide becomes washed out or low-contrast.

### TC-08 Theme Visual Integrity In Dark Mode

- Type: Visual check
- Priority: Blocker
- Steps:
  1. Switch back to dark mode.
  2. Revisit slides 06, 10, 11, 13, and 14.
  3. Compare contrast, legibility, and screenshot framing against light mode.
- Expected result:
  - Text remains readable in dark mode.
  - Decorative elements do not overpower content.
  - The visual hierarchy remains stable across themes.

### TC-09 Next And Previous Arrows Work On Interior Slides

- Type: Happy path
- Priority: Blocker
- Steps:
  1. On slide 05, click next.
  2. On slide 06, click previous.
  3. Repeat on slides 10, 11, 12, and 13.
- Expected result:
  - Each arrow lands on the expected adjacent slide.
  - The visible slide number matches the expected destination.

### TC-10 Navigation Arrows Stay Visually Clear

- Type: Visual check
- Priority: High
- Steps:
  1. Visit slides 05, 10, 11, 12, and 13.
  2. Confirm the navigation arrows are visible and not covered by slide content.
  3. Confirm the arrows remain readable in both dark and light themes.
- Expected result:
  - Arrows are clearly visible where navigation is available.
  - Content does not overlap or obscure the arrows.

### TC-11 Click-Edge Navigation Works

- Type: Happy path
- Priority: High
- Steps:
  1. On slide 06, click inside the far-right edge of the slide canvas, outside any interactive element.
  2. Confirm navigation to slide 07.
  3. On slide 07, click inside the far-left edge of the slide canvas, outside any interactive element.
  4. Repeat on slide 11 and slide 12.
- Expected result:
  - Right-edge clicks move forward.
  - Left-edge clicks move backward.
  - Clicks on content areas do not trigger accidental navigation.

### TC-12 Content Clicks Do Not Cause Unwanted Navigation

- Type: Negative path
- Priority: High
- Steps:
  1. On slide 10, click inside the main content panels away from the edges.
  2. On slide 11, click captions, counter text, and inactive image areas near the center.
  3. On slide 13, click within checklist card content.
- Expected result:
  - Normal content clicks do not move the deck unless they intentionally target an interactive navigation area.

### TC-13 Keyboard Navigation Works

- Type: Happy path
- Priority: Medium
- Steps:
  1. On slide 03, press `ArrowRight`.
  2. Press `ArrowLeft`.
  3. Press `PageDown`.
  4. Press `PageUp`.
  5. Press `Space`.
- Expected result:
  - `ArrowRight`, `PageDown`, and `Space` move forward.
  - `ArrowLeft` and `PageUp` move backward.

### TC-14 Keyboard Navigation Stops At Closing Slide

- Type: Negative path
- Priority: High
- Steps:
  1. Open slide 14.
  2. Press `ArrowRight`, `PageDown`, and `Space`.
  3. Press `ArrowLeft`.
- Expected result:
  - Forward keyboard commands do not move beyond slide 14.
  - Backward keyboard navigation still works.

### TC-15 Gallery Slide Loads Exact Images

- Type: Happy path
- Priority: Blocker
- Steps:
  1. Open slide 11.
  2. Confirm four screenshots appear in the carousel.
  3. Confirm the captions match the intended evidence flow.
- Expected result:
  - The gallery shows these exact states in order:
    - Outputs: prompt and implementation plan
    - Formal grades and reviewer feedback
    - Benchmark summary: pass rate, time, and tokens
    - Per-eval assertions and analysis notes

### TC-16 Gallery Layout And Size Integrity

- Type: Visual check
- Priority: Blocker
- Steps:
  1. Open slide 11 in both dark and light modes.
  2. Confirm the gallery height feels intentional and does not collapse.
  3. Confirm the screenshots fit within their frame without clipping.
  4. Confirm captions and dot controls remain visible without overlapping the footer or title.
- Expected result:
  - The gallery occupies the intended visual space.
  - Screenshots are not clipped, squashed, or misaligned.
  - Supporting UI stays readable and well-spaced.

### TC-17 Gallery Dot Navigation Works

- Type: Happy path
- Priority: High
- Steps:
  1. On slide 11, click dot 2.
  2. Confirm the counter reads `2 / 4`.
  3. Click dot 4.
  4. Confirm the counter reads `4 / 4`.
  5. Click dot 1.
- Expected result:
  - The active gallery image changes to the chosen state.
  - The counter always matches the visible image.

### TC-18 Gallery Click Zones Work

- Type: Happy path
- Priority: High
- Steps:
  1. On slide 11, move to image 4.
  2. Click the right half of the gallery.
  3. Confirm it wraps to image 1.
  4. Click the left half of the gallery.
  5. Confirm it wraps back to image 4.
- Expected result:
  - Right-half clicks advance.
  - Left-half clicks reverse.
  - Wrap behavior works at the boundaries.

### TC-19 Gallery Does Not Hijack Dot Clicks

- Type: Negative path
- Priority: Medium
- Steps:
  1. On slide 11, click any dot control repeatedly.
  2. Watch for unexpected slide-to-slide navigation.
- Expected result:
  - Dot clicks only change gallery state.
  - The deck does not move to another slide.

### TC-20 Gallery Counter And Captions Stay In Sync

- Type: Visual check
- Priority: High
- Steps:
  1. Cycle through all four gallery states using the dots.
  2. After each step, compare the visible screenshot, caption, and counter value.
- Expected result:
  - The screenshot, caption, and `X / 4` counter all refer to the same gallery item.

### TC-21 Checklist Cards Expand And Collapse

- Type: Happy path
- Priority: Blocker
- Steps:
  1. Open slide 13.
  2. Hover over one checklist card.
  3. Click the card toggle.
  4. Move focus away.
  5. Press `Escape`.
- Expected result:
  - Hover opens the detail state.
  - Click toggles the detail state.
  - Moving away or pressing `Escape` closes it cleanly.

### TC-22 Checklist Card Layout Integrity

- Type: Visual check
- Priority: High
- Steps:
  1. Open slide 13.
  2. Expand multiple cards one at a time.
  3. Watch the size and placement of the expanded overlay.
  4. Repeat in both dark and light themes.
- Expected result:
  - Expanded content stays inside the slide canvas.
  - The overlay does not clip against the viewport.
  - The opened card remains readable and visually centered.

### TC-23 Checklist Interaction Does Not Trigger Navigation

- Type: Negative path
- Priority: High
- Steps:
  1. On slide 13, interact with multiple checklist cards.
  2. Click text and toggles inside the expanded card.
- Expected result:
  - Checklist interaction never moves to the next or previous slide.
  - Internal interactions remain isolated from deck navigation.

### TC-24 Checklist Focus Behavior Is Stable

- Type: Negative path
- Priority: Medium
- Steps:
  1. On slide 13, focus a card toggle using the keyboard.
  2. Move focus off the toggle.
  3. Repeat on a different card.
- Expected result:
  - Focus opens the intended card.
  - Blur closes it when focus leaves the card.
  - Focus changes do not leave stale overlays behind.

### TC-25 Closing Slide Is Terminal

- Type: Negative path
- Priority: High
- Steps:
  1. Open slide 14.
  2. Confirm only previous navigation is available.
  3. Attempt keyboard forward navigation.
- Expected result:
  - The closing slide stays on slide 14 when moving forward.
  - Backward navigation still works.

### TC-26 Closing Slide Visual Balance

- Type: Visual check
- Priority: High
- Steps:
  1. Open slide 14 in both dark and light modes.
  2. Confirm the three closing panels are aligned and readable.
  3. Confirm the footer, slide number, and navigation do not overlap the content.
- Expected result:
  - The closing slide remains balanced and presentable in both themes.
  - No content collision appears near the footer or edges.

### TC-27 Asset Integrity

- Type: Negative path
- Priority: Blocker
- Steps:
  1. Scan every slide for broken image icons.
  2. Confirm Payoneer branding renders correctly.
  3. Confirm the gallery screenshots are crisp and present.
- Expected result:
  - No broken image placeholders appear.
  - Shared assets and review screenshots render correctly.

### TC-28 Typography And Spacing Consistency

- Type: Visual check
- Priority: High
- Steps:
  1. Move through all slides in order.
  2. Look for abrupt typography, spacing, or panel padding regressions.
  3. Pay extra attention to slides 10 through 14 where recent edits landed.
- Expected result:
  - Headings, body text, labels, and footers follow a consistent system.
  - Recent slides do not feel visually detached from the rest of the deck.

### TC-29 No Unexpected Overflow Or Scrollbars

- Type: Negative path
- Priority: Blocker
- Steps:
  1. Check slides 01, 10, 11, 13, and 14 in maximized mode.
  2. Repeat in a smaller desktop window.
  3. Look for page scrollbars, clipped footers, or content running outside the slide.
- Expected result:
  - No unexpected page scrollbars appear.
  - Content remains contained within the intended canvas.

### TC-30 Presentation Readiness Sweep

- Type: Final visual check
- Priority: Blocker
- Steps:
  1. Run the deck from slide 01 to slide 14 without stopping.
  2. Use the final theme intended for the presentation.
  3. Watch for any distracting jitter, layout jump, broken asset, or inconsistent spacing.
- Expected result:
  - The deck feels production-ready as a continuous presentation.
  - No slide stands out as visually broken, unfinished, or inconsistent.

## Minimum Release Gate

Do not deploy if any of these fail:

- Slide order or numbering is wrong.
- Dark/light theme does not toggle and persist.
- Theme contrast or readability is degraded in either mode.
- Any slide-to-slide navigation is broken.
- Click-edge or keyboard navigation behaves inconsistently.
- Any slide shows clipping, overlap, overflow, or scrollbars.
- Any major visual regression is visible during the full-deck sweep.
- The gallery shows the wrong screenshots or wrong order.
- The gallery layout, captions, or counter fall out of sync.
- The checklist interaction is broken or triggers navigation.
- The checklist overlay is clipped or mispositioned.
- The closing slide can move forward.

## Suggested Sign-Off Template

```md
Date:
Build/commit:
Tester:
Manual sanity pass: Pass / Fail
Notes:
```
