# Claude Design System — Vendoo / Go Flow

## Project structure
- Components (JSX): `vendoo-design-system/project/ui_kits/vendoo-app/`
- CSS reference previews: `vendoo-design-system/project/preview/` (see list below — use as reference, do not add new files)
- Design tokens: `vendoo-design-system/project/tokens.css` (965 lines, source of truth)
- Hub page: `vendoo-design-system/project/index.html` (add a card here for every new component)
- Launch config: `.claude/launch.json` (preview server on port 7890)
- Design rules: `vendoo-design-system/README.md` (read for voice, color, type, spacing decisions)

## Tech stack
React (JSX), inline styles, no build step. React 18 loaded via unpkg CDN.

## Figma file
Key: `Qsnityd6jwT6R6iuL8lRPi`
Always pass: `clientFrameworks=react`, `clientLanguages=javascript,css`

---

## Component pattern (memorize this — do NOT read Button.jsx to learn it)

- All styles are **inline JS objects** — no className, no external CSS, no styled-components
- **Token prefix:** always `var(--sys-*)` — never raw hex values
- **Font:** `var(--font-sans)` (Lexend). Weights: 400 regular / 500 medium / 700 bold only
- **Border radius:** fields + buttons = 4px, cards = 12px, dialogs = 28px, pills = 999px, chips = 8px
- **Focus border pattern:** default `1px solid var(--sys-outline)` → focused `2px solid var(--sys-primary)` — subtract 1px from padding to compensate
- **Disabled pattern:** `background: rgba(29,26,36,0.12)`, `color: rgba(29,26,36,0.38)`
- **State management:** focused / error / disabled via `React.useState`
- **Hover:** inline `onMouseEnter` / `onMouseLeave` — use `color-mix(in srgb, var(--sys-primary) 8%, transparent)` for hover tint
- **Transitions:** `120ms linear` for state layers; `150ms ease-out` for expand/collapse
- **Export:** `window.ComponentName = ComponentName` at the bottom of every file
- **Icons:** `<Icon name="lower_snake_case" size={24} />` — sprite at `../../assets/icons.svg`
- **AI affordances:** icon-led only — use `sparkle`, `rewrite_ai`, `regenerate_ai`, `list_ai` icons + verb label. Never a text-only "AI" label.

---

## Complete --sys-* token reference (use these — never raw hex)

### Color roles
```
Backgrounds:    --sys-background, --sys-surface, --sys-surface-dim
                --sys-surface-container-lowest (#fff), --sys-surface-container-low
                --sys-surface-container, --sys-surface-container-high
                --sys-surface-container-highest, --sys-surface-bright

Primary:        --sys-primary (#4a00bf), --sys-on-primary (#fff)
                --sys-primary-container (#6231d8), --sys-on-primary-container (#d5c7ff)
                --sys-primary-fixed (#e8ddff), --sys-primary-fixed-dim (#cebdff)
                --sys-inverse-primary (#cebdff)

Secondary:      --sys-secondary (#64539b), --sys-on-secondary (#fff)
                --sys-secondary-container (#c3b0ff), --sys-on-secondary-container (#503f86)

Tertiary:       --sys-tertiary (#790070), --sys-on-tertiary (#fff)
                --sys-tertiary-container (#9d1791), --sys-on-tertiary-container (#ffbaed)

Surface text:   --sys-on-surface (#1d1a24), --sys-on-surface-variant (#494455)
                --sys-inverse-surface (#322f39), --sys-inverse-on-surface (#f5eefc)

Error:          --sys-error (#ba1a1a), --sys-on-error (#fff)
                --sys-error-container (#ffdad6), --sys-on-error-container (#93000a)

Borders:        --sys-outline (#7a7486), --sys-outline-variant (#cbc3d7)

Other:          --sys-scrim (#000), --sys-surface-tint (#683adf)
```

### Alias tokens (use for elevation, motion, easing)
```
Elevation:      --alias-elevation-card: 1px
                --alias-elevation-dialog: 4px
                --alias-elevation-menu: 3px

Motion:         --alias-motion-hover: 100ms
                --alias-motion-state-change: 150ms
                --alias-motion-loading-step: 300ms
                --alias-motion-drag: 100ms

Easing:         --alias-easing-hover: ease-out
                --alias-easing-state-change: ease-in-out
                --alias-easing-drag: linear
```

### Type scale shortcuts
```
Display:   --type-display-lg (400 57px/64px), --type-display-md (400 45px/52px)
           --type-display-sm (400 36px/44px)
Headline:  --type-headline-lg (400 32px/40px), --type-headline-md (400 28px/36px)
           --type-headline-sm (400 24px/32px)
Title:     --type-title-lg (500 22px/28px), --type-title-md (500 16px/24px)
           --type-title-sm (500 14px/20px)
Body:      --type-body-lg (400 16px/24px), --type-body-md (400 14px/20px)
           --type-body-sm (400 12px/16px)
Label:     --type-label-lg (500 14px/20px), --type-label-md (500 12px/16px)
           --type-label-sm (500 11px/16px)
```

---

## NEVER do these things
- Create any file in `preview/` — it's a read-only reference folder
- Read `Button.jsx` to understand the pattern (documented above)
- Run Glob to discover existing JSX files (listed below)
- Take more than ONE screenshot per session (two only if the first reveals a console error)
- Use raw hex values — always use `var(--sys-*)` tokens
- Call `get_design_context` more than once per component — use the exact frame node ID from the build queue
- Call `get_metadata` to explore sections — the build queue already has the right node IDs
- Use `color-mix()` for disabled states — use the rgba pattern above instead

---

## When building a new component

**First: check if a CSS reference implementation exists in preview/ (table below). If yes, convert it to JSX — do NOT query Figma.**

If no CSS reference exists:
1. `get_design_context` for the exact frame node ID from the build queue
2. `get_variable_defs` once for token mapping
3. Create `ComponentName.jsx` in `ui_kits/vendoo-app/`
4. Add JSDoc: Figma node ID, prop names + types, variant values
5. Export from `ui_kits/vendoo-app/index.js`
6. Add a card for the component in `vendoo-design-system/project/index.html`
7. Navigate preview server to `http://localhost:7890/ui_kits/vendoo-app/index.html`
8. Take ONE screenshot to verify
9. Commit

## When building a screen
1. `get_design_context` for the screen Figma node
2. Check component registry below — match Figma instances to React components by node ID
3. Create `screens/ScreenName.jsx` importing from `./index.js`
4. Take ONE screenshot to verify
5. Commit

---

## CSS reference implementations in preview/ (convert to JSX, do not re-query Figma)

| Preview file | What's built | Convert to JSX as |
|---|---|---|
| `components-chips.html` | Assistive chip, Tag (Default+AI), StyleTag/Chip (Default/Disabled × Removable Yes/No) | `Tag.jsx` |
| `components-bottom-nav.html` | Navigation Bar (412×64), Nav Item (selected/unselected states) | `NavigationBar.jsx` |
| `components-ask-ai.html` | Ask AI bar (collapsed chip + open input states) | `AskAI.jsx` |
| `components-buttons.html` | Button variants reference | already done as `Button.jsx` |
| `components-fields.html` | Field variants reference | already done as `Fields.jsx` |
| `components-section-card.html` | Section card reference | already done as `ListingSectionCard.jsx` |

---

## Component registry

| File | Exports | Figma node | Status |
|---|---|---|---|
| `Icon.jsx` | `Icon` | — (sprite wrapper) | complete |
| `Button.jsx` | `Button`, `IconButton` | `1219:5473` | complete |
| `IconButton.jsx` | `IconButton` (standalone, extended variants) | `1227:5422` | complete |
| `SelectionControl.jsx` | `SelectionControl` | `3001:4216` | complete (check open PRs) |
| `Fields.jsx` | `Input`, `Textarea`, `PriceField`, `MarketplaceChip`, `MarketplaceLogo`, `Label`, `Helper` | `3001:4217` | complete |
| `Field.jsx` | `Field` | `1243:5664` | complete (check open PRs) |
| `ListingSectionCard.jsx` | `ListingSectionCard` | — | complete |
| `AppShell.jsx` | `AppShell`, `NavItem` | `555:32859` | complete |
| `Inventory.jsx` | `Inventory`, `ListingRow`, `StatusPill` | — | complete |
| `CreateListing.jsx` | `CreateListing` | — | complete |

**Prop reference — Button**
`variant`: filled / tonal / outline / text / danger · `size`: sm / md / lg
`icon`, `trailingIcon`: icon name · `disabled`: boolean

**Prop reference — IconButton (standalone)**
`type`: standard / tonal / primary / outline · `size`: standard / large
`icon`: icon name · `disabled`: boolean

**Prop reference — SelectionControl**
`type`: checkbox / radio / switch · `state`: enabled / disabled · `selected`: boolean

**Prop reference — Field**
`state`: enabled / focused / filled / error / disabled · `label`, `helper`, `error`: strings

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

## Figma build queue — only needed when no CSS reference exists
1. ~~Tag / Chip~~ → use `preview/components-chips.html` reference instead
2. ~~Navigation Bar~~ → use `preview/components-bottom-nav.html` reference instead
3. ~~Ask AI bar~~ → use `preview/components-ask-ai.html` reference instead
4. Nav Item / Bar    → `555:30509` (variants not in bottom-nav preview)
5. App Bar           → `555:32859`
6. FAB               → `1234:2624`
7. Extended FAB      → `668:1709`
8. Menu Item         → `758:4215`
9. Menu List Base    → `918:2598`

---

## Deployment
Live: https://claude-design-system.pages.dev/
Local: http://localhost:7890/ui_kits/vendoo-app/index.html
