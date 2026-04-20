---
name: vendoo-design
description: Use this skill to generate well-branded interfaces and assets for Vendoo (the cross-marketplace listing manager), either for production components or throwaway prototypes/mocks. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components.
user-invocable: true
---

Read CLAUDE.md at the project root first — it contains the component pattern, token usage, file registry, and session checklists.

Then read vendoo-design-system/README.md for brand voice, color system, typography, spacing, and iconography rules.

Do not explore files beyond these two unless a specific file is needed for the task.

## For production components
Follow the component checklist in CLAUDE.md exactly.
Use inline styles and `var(--sys-*)` tokens. No className, no external CSS.
Export via `window.ComponentName = ComponentName`.

## For prototypes / mocks / throwaway artifacts
Create a self-contained HTML file that imports React and Babel via CDN (same pattern as `ui_kits/vendoo-app/index.html`), references `../../assets/icons.svg` for icons, and links `../../colors_and_type.css` for tokens.
Do NOT create files in `preview/components-*.html` — use a new path or output as an artifact.

## If invoked without guidance
Ask the user what they want to build. Then act as an expert Vendoo product designer and produce either a production component or a prototype HTML artifact depending on the need.
