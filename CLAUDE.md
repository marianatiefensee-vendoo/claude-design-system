# Claude Design System

## Project structure
- Components: vendoo-design-system/project/ui_kits/vendoo-app/
- Preview pages: vendoo-design-system/project/preview/
- Design tokens: vendoo-design-system/project/tokens.css
- Launch config: .claude/launch.json (preview server on port 7890)

## Tech stack
React (JSX), inline styles, no build step.
Pattern: see Button.jsx — each component uses inline style objects
referencing CSS variables from tokens.css.

## Figma file
Key: Qsnityd6jwT6R6iuL8lRPi
Always pass: clientFrameworks=react, clientLanguages=javascript,css

## Component checklist
## When building a new component:
1. get_design_context for the parent Figma node
2. get_variable_defs once for token mapping
3. Create ComponentName.jsx in ui_kits/vendoo-app/
4. Add JSDoc with Figma node ID and prop types
5. Export from ui_kits/vendoo-app/index.js
6. Take ONE screenshot to verify
7. Commit

## When building a screen:
1. get_design_context for the screen Figma node
2. Check CLAUDE.md component registry to resolve 
   which React component maps to each Figma instance
3. Create screens/ScreenName.jsx importing from index.js
4. One screenshot to verify
5. Commit

## Existing components
- Icon.jsx — Icon sprite wrapper (`<Icon name="..." size={24} />`)
- Button.jsx — Button (variant: filled/tonal/outline/text/danger, size: sm/md/lg), IconButton
- Fields.jsx — Input, Textarea, PriceField, MarketplaceChip, MarketplaceLogo, Label, Helper
- ListingSectionCard.jsx — expandable numbered section card (state: expanded/done/todo)
- AppShell.jsx — AppShell (top bar + bottom nav frame), NavItem
- Inventory.jsx — Inventory grid, ListingRow, StatusPill
- CreateListing.jsx — multi-step listing flow (uses Fields + ListingSectionCard)
- SelectionControl.jsx (node 3001:4216) — Checkbox, Radio, Switch

## Screens built
- Inventory view (via Inventory.jsx)
- Create listing flow (via CreateListing.jsx)

## Data
- data.js — MARKETPLACES array (11 platforms), SAMPLE_LISTINGS array (6 listings)
    