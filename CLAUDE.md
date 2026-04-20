# Claude Design System — Vendoo / Go Flow

## Project structure
- Components: vendoo-design-system/project/ui_kits/vendoo-app/
- Design tokens: vendoo-design-system/project/tokens.css
- Launch config: .claude/launch.json (preview server on port 7890)
- Preview (legacy, do not add to): vendoo-design-system/project/preview/
- Design rules: vendoo-design-system/README.md (read this for color, type, spacing decisions)

## Tech stack
React (JSX), inline styles, no build step. React 18 loaded via unpkg CDN.

## Figma file
Key: Qsnityd6jwT6R6iuL8lRPi
Always pass: clientFrameworks=react, clientLanguages=javascript,css

---

## Component pattern (memorize this — do NOT read Button.jsx to learn it)

- All styles are **inline JS objects** — no className, no external CSS, no styled-components
- **Token prefix:** always `var(--sys-*)` — e.g. `var(--sys-primary)`, `var(--sys-on-surface)`,
  `var(--sys-outline)`, `var(--sys-surface)`, `var(--sys-error)`, `var(--sys-surface-container-high)`
- **Font:** `var(--font-sans)` (Lexend). Weights: 400 regular / 500 medium / 700 bold only
- **Border radius:** fields + buttons = 4px, cards = 12px, dialogs = 28px, pills = 999px
- **Focus border pattern:** default `1px solid var(--sys-outline)` →
  focused `2px solid var(--sys-primary)` — subtract 1px from padding to compensate
- **Disabled pattern:** `background: rgba(29,26,36,0.12)`, `color: rgba(29,26,36,0.38)`
- **State management:** focused / error / disabled via `React.useState`
- **Hover:** inline `onMouseEnter` / `onMouseLeave` to toggle background
- **Transitions:** `120ms linear` on background-color, border-color, opacity
- **Export:** `window.ComponentName = ComponentName` at the bottom of every file
- **Icons:** `<Icon name="lower_snake_case" size={24} />` — uses sprite at `../../assets/icons.svg`

---

## NEVER do these things
- Create any file matching `preview/components-*.html` (legacy pattern, discontinued)
- Read `Button.jsx` to understand the pattern (documented above)
- Run Glob to discover existing JSX files (listed below)
- Take more than ONE screenshot per session
- Use raw hex values in components — always use `var(--sys-*)` tokens
- Call `get_design_context` more than once per component (fetch parent node, not each variant)

---

## When building a new component
1. `get_design_context` for the **parent** Figma node only
2. `get_variable_defs` once for token mapping
3. Create `ComponentName.jsx` in `ui_kits/vendoo-app/`
4. Add JSDoc: Figma node ID, prop names + types, variant values
5. Export from `ui_kits/vendoo-app/index.js`
6. Navigate preview server to `http://localhost:7890/ui_kits/vendoo-app/index.html`
7. Take ONE screenshot per session. Two only if the first reveals a console error.
8. Commit

## When building a screen
1. `get_design_context` for the screen Figma node
2. Check component registry below — match Figma instances to React components by node ID
3. Create `screens/ScreenName.jsx` importing from `./index.js`
4. Take ONE screenshot per session. Two only if the first reveals a console error.
5. Commit

---

## Component registry

| File | Exports | Figma node |
|---|---|---|
| `Icon.jsx` | `Icon` | — (sprite wrapper) |
| `Button.jsx` | `Button`, `IconButton` | `1219:5473` |
| `SelectionControl.jsx` | `SelectionControl` | `3001:4216` |
| `Fields.jsx` | `Input`, `Textarea`, `PriceField`, `MarketplaceChip`, `MarketplaceLogo`, `Label`, `Helper` | `3001:4217` |
| `Field.jsx` | `Field` | `1243:5664` |
| `ListingSectionCard.jsx` | `ListingSectionCard` | — |
| `AppShell.jsx` | `AppShell`, `NavItem` | `555:32859` |
| `Inventory.jsx` | `Inventory`, `ListingRow`, `StatusPill` | — |
| `CreateListing.jsx` | `CreateListing` | — |

**Prop reference — Button**
`variant`: filled / tonal / outline / text / danger
`size`: sm / md / lg
`icon`, `trailingIcon`: icon name string (optional)
`disabled`: boolean

**Prop reference — SelectionControl**
`type`: checkbox / radio / switch
`state`: enabled / disabled
`selected`: boolean

**Prop reference — Field**
`state`: enabled / focused / filled / error / disabled
`label`, `helper`, `error`: strings

---

## Files in ui_kits/vendoo-app/ (do not Glob — use this list)
`Icon.jsx`, `Button.jsx`, `SelectionControl.jsx`, `Fields.jsx`, `Field.jsx`,
`ListingSectionCard.jsx`, `AppShell.jsx`, `Inventory.jsx`, `CreateListing.jsx`, `index.js`

## Screens built
- Inventory view → `Inventory.jsx`
- Create listing flow → `CreateListing.jsx`

## Data
`data.js` — `MARKETPLACES` array (11 platforms), `SAMPLE_LISTINGS` array (6 listings)

---

## Figma build queue — use FRAME node IDs, not section IDs
1. Tag / Chip        → 823:53207   (Tag frame inside Chips)
2. Nav Item / Bar    → 555:30509
3. Navigation Bar    → 555:30780
4. App Bar           → 555:32859
5. FAB               → 1234:2624
6. Extended FAB      → 668:1709
7. Menu Item         → 758:4215
8. Menu List Base    → 918:2598

---

## Deployment
Live: https://claude-design-system.pages.dev/
Local: http://localhost:7890/ui_kits/vendoo-app/index.html