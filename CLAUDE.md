# Claude Design System — Vendoo / Go Flow

## Project structure
- Components: vendoo-design-system/project/ui_kits/vendoo-app/
- Design tokens: vendoo-design-system/project/tokens.css
- **Design spec: vendoo-design-system/project/DESIGN-SYSTEM-SPEC.md — read this before building any component**
- Hub page: vendoo-design-system/project/index.html (add a card here for every new component)
- Launch config: .claude/launch.json (preview server on port 7890)
- Preview (legacy, read-only reference): vendoo-design-system/project/preview/
- Brand + voice rules: vendoo-design-system/README.md

## Tech stack
React (JSX), inline styles, no build step. React 18 loaded via unpkg CDN.

## Figma file
Key: Qsnityd6jwT6R6iuL8lRPi
Always pass: clientFrameworks=react, clientLanguages=javascript,css

---

## Component pattern (structural rules — token values are in DESIGN-SYSTEM-SPEC.md)

- All styles are **inline JS objects** — no className, no external CSS, no styled-components
- State (focused / error / disabled) via `React.useState`
- Hover via inline `onMouseEnter` / `onMouseLeave`
- Transitions: `120ms linear` on background-color, border-color, opacity
- Export: `window.ComponentName = ComponentName` at bottom of every file
- Icons: `<Icon name="lower_snake_case" size={24} color="var(--sys-on-surface)" />` — always explicit color

---

## NEVER do these things
- Create any file in `preview/` — it is a read-only reference folder
- Read `Button.jsx` to understand the pattern — it is documented in DESIGN-SYSTEM-SPEC.md
- Run Glob to discover existing JSX files — use the file list below
- Take more than ONE screenshot per session (two only if the first reveals a console error)
- Use raw hex values — always use `var(--sys-*)` tokens
- Use `--sys-primary-container` for large fills — it is dark (#6231d8), see DESIGN-SYSTEM-SPEC.md section 1
- Call `get_design_context` more than once per component — use the exact frame node ID from the build queue
- Call `get_metadata` to explore — build queue already has the right node IDs
- Pass icon color implicitly — always use the explicit `color` prop on `<Icon />`

---

## When building a new component

1. Read `DESIGN-SYSTEM-SPEC.md` section for this component type (tokens, sizing, states)
2. Check the CSS reference table below — if a CSS reference exists, convert it, skip Figma
3. If no CSS reference: `get_design_context` for the exact frame node ID from the build queue
4. `get_variable_defs` once to confirm token mapping against the spec
5. Create `ComponentName.jsx` in `ui_kits/vendoo-app/`
6. Add JSDoc: Figma node ID, prop names + types, variant values
7. Export from `ui_kits/vendoo-app/index.js`
8. Add a card in `vendoo-design-system/project/index.html`
9. Create preview/components-{name}.html that loads the component via React+Babel
10. Take ONE screenshot to verify
11. Commit

## When building a screen

1. Read `DESIGN-SYSTEM-SPEC.md` for any component types used in the screen
2. `get_design_context` for the screen Figma node
3. Match Figma instances to React components using the registry below
4. Create `screens/ScreenName.jsx` importing from `./index.js`
5. Take ONE screenshot to verify
6. Commit

---

## CSS reference implementations in preview/ (convert to JSX — do not re-query Figma)

| Preview file | What's built | Convert to JSX as |
|---|---|---|
| `components-chips.html` | Assistive chip, Tag (Default+AI), StyleTag | `Tag.jsx` |
| `components-bottom-nav.html` | Navigation Bar, Nav Item states | `NavigationBar.jsx` |
| `components-ask-ai.html` | Ask AI bar (collapsed + open) | `AskAI.jsx` |

---

## Component registry

| File | Exports | Figma node | Status |
|---|---|---|---|
| `Icon.jsx` | `Icon` | — | complete |
| `Button.jsx` | `Button`, `IconButton` | `1219:5473` | complete |
| `IconButton.jsx` | `IconButton` (standalone) | `1227:5422` | complete |
| `SelectionControl.jsx` | `SelectionControl` | `3001:4216` | complete |
| `Fields.jsx` | `Input`, `Textarea`, `PriceField`, `MarketplaceChip`, `MarketplaceLogo`, `Label`, `Helper` | `3001:4217` | complete |
| `Field.jsx` | `Field` | `1243:5664` | complete |
| `ListingSectionCard.jsx` | `ListingSectionCard` | — | complete |
| `AppShell.jsx` | `AppShell`, `NavItem` | `555:32859` | complete |
| `Inventory.jsx` | `Inventory`, `ListingRow`, `StatusPill` | — | complete |
| `CreateListing.jsx` | `CreateListing` | — | complete |

**Prop reference — Button:** `variant` filled/tonal/outline/text · `size` sm/md · `leadingIcon` `trailingIcon` · `showLeadingIcon` `showTrailingIcon` · `loading` · `disabled`
**Prop reference — IconButton:** `type` standard/tonal/primary/outline · `size` standard/large · `icon` · `disabled`
**Prop reference — SelectionControl:** `type` checkbox/radio/switch · `state` enabled/disabled · `selected`
**Prop reference — Field:** `state` enabled/focused/filled/error/disabled · `label` `helper` `error`

---

## Files in ui_kits/vendoo-app/ (do not Glob — use this list)
`Icon.jsx`, `Button.jsx`, `IconButton.jsx`, `SelectionControl.jsx`, `Fields.jsx`, `Field.jsx`,
`ListingSectionCard.jsx`, `AppShell.jsx`, `Inventory.jsx`, `CreateListing.jsx`, `data.js`, `index.js`

## Screens built
- Inventory view → `Inventory.jsx`
- Create listing flow → `CreateListing.jsx`

## Data
`data.js` — `MARKETPLACES` array (11 platforms), `SAMPLE_LISTINGS` array (6 listings)

---

## Figma build queue — exact FRAME node IDs only

1. ~~Tag / Chip~~     → convert `preview/components-chips.html` (no Figma call needed)
2. ~~Navigation Bar~~ → convert `preview/components-bottom-nav.html` (no Figma call needed)
3. ~~Ask AI bar~~     → convert `preview/components-ask-ai.html` (no Figma call needed)
4. Nav Item / Bar  → `555:30509`
5. App Bar         → `555:32859`
6. FAB             → `1234:2624`
7. Extended FAB    → `668:1709`
8. Menu Item       → `758:4215`
9. Menu List Base  → `918:2598`

---

## Deployment
Live: https://claude-design-system.pages.dev/
Local: http://localhost:7890/ui_kits/vendoo-app/index.html

## Git workflow
- Create a feature branch for each task (e.g. `git checkout -b feat/component-name`).
- Commit to the branch, then open a pull request against main.
- After pushing the branch, run: `gh pr create` to open the PR.
