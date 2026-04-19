# Vendoo App — UI kit

Recreation of the Vendoo listing-management app, rooted in the Go Flow Design System (see `../../README.md` for foundations, `../../colors_and_type.css` for tokens).

## Surfaces

- **Inventory** (`index.html` default view) — draft / active listings grid with marketplace chips
- **Create Listing** — the multi-step listing flow with expandable section cards, AI-rewrite tags, and marketplace selection
- **Crosslist panel** — sticky footer + marketplace picker

## Files

| File | What |
|---|---|
| `index.html` | App shell + view switcher (click-through prototype) |
| `AppShell.jsx` | Top bar + bottom nav + FAB |
| `Inventory.jsx` | Inventory grid |
| `CreateListing.jsx` | Listing flow with expandable section cards |
| `ListingSectionCard.jsx` | Numbered section card with expand/collapse |
| `Fields.jsx` | Input / Textarea / Price / MarketplaceChip |
| `Button.jsx` | Filled / Tonal / Text + IconButton |
| `Icon.jsx` | Sprite wrapper — `<use href="../../assets/icons.svg#name"/>` |
| `data.js` | Mock listings + marketplace list |
