---
name: "Margevia"
description: "A precise, light purchasing review interface with violet actions and visible source evidence."
colors:
  paper: "#f3f2ef"
  white: "#fff"
  ink: "#191b1d"
  muted: "#62666b"
  line: "#d9dad9"
  purple: "#5758db"
  purple-bright: "#6264ef"
  purple-soft: "#efefff"
  navy: "#122432"
  green: "#277455"
  amber: "#946127"
typography:
  display:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "clamp(44px, 4.15vw, 64px)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-.035em"
  headline:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "clamp(31px, 3.1vw, 44px)"
    fontWeight: 400
    lineHeight: 1.17
    letterSpacing: "-.035em"
  title:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "20px"
    fontWeight: 500
    letterSpacing: "-.5px"
  body:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "16px"
    fontWeight: 400
  label:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "12px"
    fontWeight: 400
rounded:
  square: "0"
  field: "3px"
  tag: "4px"
  option: "5px"
  panel: "7px"
  workspace: "8px"
  hub: "16px"
spacing:
  tight: "8px"
  small: "12px"
  medium: "24px"
  large: "32px"
  gutter: "clamp(26px, 4.4vw, 72px)"
components:
  button-primary:
    backgroundColor: "{colors.purple}"
    textColor: "{colors.white}"
    rounded: "{rounded.square}"
    padding: "13px 21px"
  button-secondary:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "13px 21px"
  pilot-select:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.tag}"
    padding: "12px 44px 12px 14px"
    height: "52px"
  navigation:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    height: "88px"
  status-tag:
    backgroundColor: "#f0efff"
    textColor: "{colors.purple}"
    rounded: "{rounded.tag}"
    padding: "5px 9px"
  source-card:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.panel}"
    padding: "17px 14px"
    width: "238px"
  invoice-option:
    rounded: "{rounded.option}"
    padding: "15px 10px"
  feature-tab:
    padding: "22px"
  comparison-table:
    width: "100%"
---

# Design System: Margevia

## Overview

**Creative North Star: "Light technical precision"**

Margevia adapts the user-selected Nanonets reference through DM Sans, off-white framing, white content surfaces, fine grey borders and violet actions. The atmosphere is calm and precise: generous marketing space leads into a denser, source-backed working sample.

Black square frame markers give the page its structural signature. Small rounded document cards describe the reconciliation story, while primary actions remain rectangular. Product facts and human review remain visible alongside the interface.

**Key Characteristics:**
- Regular-weight headlines with restrained violet emphasis.
- Inset hairline framing with black square markers.
- White evidence surfaces against warm off-white sections.
- Compact tabular figures and explicit review status.

## Colors

The palette combines warm paper and cool neutral text with concentrated violet emphasis. The frontmatter records the implemented root colors; component-specific status fills remain in their component definitions.

### Primary
- **Review Violet** (`purple`): primary buttons, selected features, flagged amounts and focus rings.
- **Bright Violet** (`purple-bright`): headline emphasis, brand mark and reconciliation hub.
- **Pale Violet** (`purple-soft`): small discrepancy labels and active review steps.

### Secondary
- **Confirmation Green** (`green`): matched evidence and completed visual steps; never a claim that a flagged amount was recovered.
- **Review Amber** (`amber`): reserved root status token; the actual warning tag uses its own warmer text and background values.

### Neutral
- **Warm Paper** (`paper`) frames white content surfaces.
- **White** (`white`) supports evidence, controls and main content.
- **Near Black** (`ink`) establishes the main text hierarchy.
- **Slate Grey** (`muted`) holds supporting copy and metadata.
- **Hairline Grey** (`line`) divides sections and structural rows.
- **Deep Navy** (`navy`) anchors the announcement strip.

## Typography

DM Sans is locally supplied in weights 400, 500, 600 and 700, with sans-serif fallback. Display and section headings primarily use 400, with negative tracking rather than heavy weight to establish hierarchy. The hero's final phrase uses violet, upright emphasis.

The frontmatter display and headline roles describe desktop defaults. Invoice titles use the title role. Body defaults to the body role, but actual explanatory copy varies by context: hero copy is 17px with 1.6 line height, section support is 14px with 1.7 line height, and operational text is predominantly 12px. Amounts and table values use tabular numerals. There is no separate monospace family. Team roles are real headings, without an eyebrow above them.

## Layout

The page has a 20px exterior frame inset and a fluid internal gutter. Its sticky header is 88px high. Major sections use 90px vertical padding. The hero uses a 1.08fr / 1fr split and the feature panel a .9fr / 1.1fr split. The sample workspace uses a 224px invoice rail beside the detail view; the detail summary uses three equal columns. Team and FAQ sections use paired columns. The pilot uses a .9fr / 1.1fr split aligned to the top. The hero visual is 450px high; its caption sits at bottom -10px and its motion controls at bottom -51px, aligned right.

Responsive rules follow the final cascade:

- At 1600px and above, the frame is capped at 1480px and centered; the hero has a 670px minimum height and its visual a 530px maximum width.
- At 1100px and below, the invoice rail becomes 195px and spacing tightens. The hero heading becomes 45px.
- At 800px and below, the header becomes 74px, its CTA disappears, sections use 70px by 32px padding, and the invoice selector becomes a horizontal row above the detail. Feature content stacks; the hero heading is 39px. The pilot section becomes one column with a 25px gap and a form capped at 600px width.
- At 600px and below, the header becomes 68px and a button toggles vertical navigation. The frame inset becomes 12px; sections use 53px by 23px padding. Hero content stacks with a 43px heading and a 470px illustrative area. Its caption sits at bottom -2px and motion controls at bottom -43px; control targets have a 40px minimum height. Invoice choices stack; amount summaries become label/value rows. The table retains a 490px minimum width inside a horizontal scroll region with a visible swipe hint. The three process steps, team, FAQ and pilot sections stack. Detail action targets have a 44px minimum height. The demo view tabs fill the width with equal buttons, 12px labels and 11px by 10px padding. The video panel follows the workspace’s -10px side margins; its placeholder uses a 420px minimum height, 40px by 22px padding, a 26px heading and 13px supporting text. The pilot form uses 20px by 16px padding; focus rows use 13px by 9px padding and location segments keep four columns with 6px gaps.

## Elevation & Depth

Most depth comes from white surfaces, warm section backgrounds and one-pixel borders. Shadows are concentrated in the illustrative hero: source documents use `0 8px 32px #1521330a`, the hub uses `0 10px 30px #5355d42b`, and the result ticket uses `0 14px 44px #302f6f0e`. The expanded mobile menu uses `0 10px 20px #20203a0d`. The working table and ordinary sections do not use lifted shadows.

## Shapes

Square buttons and black 8px frame markers establish the outer geometry. Small soft corners distinguish individual objects: 3px form fields, 4px status tags, 5px invoice options, 7px source cards and feature panels, and 8px workspace/result surfaces. The reconciliation hub is deliberately softer at 16px, reduced to 12px on mobile. Fine one-pixel borders define panels and divisions; circular dots indicate small status cues.

## Components

- **Primary and secondary buttons:** rectangular, 13px medium-weight labels; primary violet fills and secondary white outlined fills. Hover darkens the primary and lifts either button by 1px. Secondary hover introduces a pale violet surface. Disabled controls use reduced opacity.
- **Navigation:** sticky paper-colored header, simple text links and a desktop action. Under the mobile breakpoint, the labeled menu button reveals a stacked menu; Escape closes it and restores focus to the button.
- **Feature tabs:** three equal-width, bordered choices; selected tabs are white with violet text. Arrow keys, Home and End move selection. Only the active panel is displayed.
- **Demo view tabs:** Dashboard and Demo video share one tablist; Dashboard is selected initially. The selected tab is violet with white text, and the inactive tab is transparent grey with a pale-violet hover. The group has a 7px corner, 5px inset and 4px gap; buttons use 4px corners, 44px minimum height and 13px medium labels. Click, Left/Right, Home and End select the view; arrow and endpoint keys also move focus. Only the selected tab is in the tab order, and inactive panels are hidden. Returning through Explore the dashboard selects and focuses Dashboard; leaving the video view pauses playback.
- **Pending video panel:** a pale, thin-bordered 8px panel with a centered outlined video illustration, regular 30px heading, supporting copy and a dashboard-return control. The placeholder has a 510px minimum height and 58px by 30px padding. No video has been supplied; it displays “Coming soon on video.” A future configured source replaces the placeholder with native controls, inline playback and a 16:9 video surface; optional poster and English captions are supported.
- **Source cards:** compact document objects with a small icon, document title, metadata and file extension. The hero composition rotates these objects slightly and connects them to a violet hub.
- **Invoice selector:** compact supplier rows, selected pale-violet fill and border, small initial tile and discrepancy badge or matched check. Selection updates the detail, source note and review state.
- **Status tags:** violet follow-up, amber needs-review and green matched variants. The review action is reversible within the page session; a matched invoice disables it.
- **Comparison table:** right-aligned numerical columns and left-aligned items, tabular numerals, fine row separators, violet differences and green matched labels. Preserve readable content through horizontal scrolling on mobile.
- **Pilot planner:** a pale panel with a native 52px-high, 16px team select and 4px corners. The required team choice starts with a prompt, then Purchasing, Operations, Finance, Owner / management and Other. Three explained radio rows offer Supplier prices, Delivered quantities and Supplier credits; the selected row has a pale-violet fill and violet border. Four 48px-minimum location segments offer 1, 2–5, 6–10 and 11+; the selected segment adds a violet inset border. Native radio keyboard behavior remains available, and segment focus has a 3px violet outline. The full-width Send brief action is disabled in a muted fill, with an explicit notice that choices stay on the page. No brief is downloaded or sent; recipient and delivery setup are pending.
- **FAQ:** native details/summary rows with thin separators; the plus icon rotates on expansion.

Global interactive focus uses a 3px violet outline with 5px offset. The table region uses a 3px offset. Buttons, tabs, invoice options, menu bars and FAQ icons transition over .2s. Arrow icons and navigation underlines transition over .25s; action arrows move 3px right, download icons 2px down, and pressed buttons move 1px down. Team rows use a .22s background transition.

The hero runs a finite source-to-result sequence lasting 2.77 seconds of active playback with `cubic-bezier(.16,1,.3,1)`. Three documents settle over 750ms with 210ms staggering; their icons acknowledge the sources, connectors reveal and briefly illuminate, the hub pulses with an expanding ring, then the result connection, ticket, amount and confirmation icon settle. It plays once on entry; there is no Replay control. Enabling motion after reducing it starts the hero again. Motion never gates the complete resting content.

Feature selection settles the active panel children; invoice selection settles the heading, summary and rows. The shared settle motion lasts 380ms, moving from 8px below and .35 opacity. Review status responds over 260ms, newly opened FAQ text settles, and download feedback fades over 220ms. On their first observed entry, comparisons settle with an arrow cue, workflow stages draw temporary tracks, team rows fade in, the workspace summary settles and the pilot form briefly highlights its border. These entry observers run once, without scroll polling or perpetual loops.

Motion is enabled by default at the user’s explicit request, including when the operating system prefers reduced motion. The Reduce motion / Enable motion control changes this page session only. Reduced mode cancels active Web Animations and disables CSS animations, transitions and smooth scrolling. An active-animation map pauses animations when their scope leaves the viewport or the tab becomes hidden, then resumes visible scopes when appropriate. The animation layer uses Web Animations without a library, primarily transform/opacity with short connector clipping and isolated color cues. There is no Replay control or persisted motion setting.

The sidecar contains ten representative HTML/CSS previews. Interactive previews show the implemented visual states; they do not reproduce application JavaScript.

## Do's and Don'ts

### Do:
- Do keep source evidence and review status adjacent to the amounts they explain.
- Do preserve the square action buttons, fine borders and restrained violet emphasis.
- Do retain the visible mobile table scroll hint and keyboard-focusable scroll region.
- Do use role names as the team section headings.
- Do preserve the page-local Reduce motion control and its cancellation behavior.

### Don't:
- Don't turn flagged discrepancies into claims of recovered money.
- Don't substitute decorative customer logos or unverified social proof.
- Don't round every surface into the same card shape.
- Don't shrink the invoice table to fit mobile; preserve horizontal scrolling.
