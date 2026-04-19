# Vendoo — Go Flow Design System

Vendoo is a cross-marketplace listing management platform for resellers. Sellers list items once inside Vendoo, then crosspost them to Poshmark, eBay, Mercari, Depop, Grailed, Etsy, Facebook Marketplace, Kidizen, Shopify, and more from one place. The **Go Flow Design System** (codename for the refreshed Vendoo design language) is the component library powering the listing flow, AI-assisted drafting, marketplace selection, and product-management dashboards.

---

## Sources

- **Figma:** *Go Flow Design System — Claude DS* (.fig mounted as a read-only virtual filesystem for the agent — 11 pages, 68 top-level frames)
- **Fonts:** Lexend (provided as .ttf uploads — full weight range 100–900)
- **Brand assets:** `Variant=Lockup.svg`, `Variant=Mark.svg` and their PNG equivalents
- **In-file brand files:** `/Brand-assets/Brand/Vendoo-Brand-Horizontal.svg`, `/Brand-assets/Brand/Vendoo-Brand-Logo.svg`

---

## Index (what lives here)

| Path | What it is |
|---|---|
| `README.md` | This file — context, content fundamentals, visual foundations, iconography |
| `tokens.css` | **Source of truth** — generated 1:1 from Figma variable exports (Colors, Typography, Radius, Size, Border, Motion, Elevation) |
| `colors_and_type.css` | Back-compat alias (imports `tokens.css`) |
| `fonts/` | Lexend TTFs (100–900) |
| `assets/` | Logos (Mark, Lockup, Horizontal) in SVG + PNG |
| `preview/` | Design-system cards — swatches, type specimens, component states |
| `ui_kits/vendoo-app/` | Recreated Vendoo product surfaces — Listing Creator, Inventory, Crosslist |
| `slides/` | *Not generated* — no slide template provided |
| `SKILL.md` | Claude Code–compatible skill descriptor |

---

## Content fundamentals

The Go Flow design language follows a strict **product-language** voice — it is written, it is instructional, and it is stripped of marketing filler. From the system's own guidance frames:

> *"Use concise, instructional product language. Copy in the system should explain what something is, when to use it, and what the user can do next without inflating labels, helper text, or empty states with marketing filler."*

### Voice & tone

- **Instructional, not promotional.** Labels and helper text describe a mechanism, not a benefit. "Rewrite" ≠ "Make it magical."
- **Direct address** — second-person ("you"), imperative verbs for actions ("Add a title," "Crosslist to 4 marketplaces").
- **No exclamation marks** in product copy. No emoji. No first-person ("we" / "our") inside the product — that voice is reserved for marketing surfaces.
- **AI copy is honest about uncertainty.** Language stays assistive: *suggested*, *generated*, *review before publish*, *apply template*. Never imply certainty where the user still owns the decision.
- **Short sentences.** Helper text is one sentence, rarely two. Descriptions for listing sections average 10–20 words.

### Casing

- **Sentence case everywhere.** Buttons, labels, nav items, section titles, page titles — `Create a listing`, not `Create A Listing`.
- **Capitalize proper nouns** verbatim: *eBay*, *Poshmark*, *Mercari*, *Depop*, *Etsy*, *Facebook Marketplace*, *Grailed*, *Kidizen*, *Shopify*.
- **Acronyms** stay uppercase: *AI*, *SKU*, *SEO*, *URL*.

### Specific copy patterns (pulled from the Figma)

| Surface | Pattern | Example |
|---|---|---|
| Button (primary action) | Verb + object, 1–3 words | `Crosslist to 4`, `Apply template`, `Add photos` |
| Button (AI action) | Verb only, icon carries the AI meaning | `Rewrite`, `Generate`, `Suggest` |
| Field label | Noun, sentence case | `Title`, `Description`, `Price`, `Shipping weight` |
| Helper text | State a constraint or reduce ambiguity — never restate the label | `Up to 100 characters. Include brand and item type.` |
| Validation | Explain the problem *and* the fix | `Add a price to publish to Poshmark.` *not* `Invalid.` |
| Empty state | What's missing + the next action | `No drafts yet. Start a listing to see it here.` |
| AI tag | A pill labeled `AI generated` or `AI suggested` near the field |
| Marketplace rows | Brand name only — `Poshmark`, `eBay` — no taglines |
| Progress step | Numbered step + noun: `2 · Title & Description` |

### Vibe

Calm, focused, **workshop-like**. The product treats reselling as craft: the UI doesn't celebrate listings, it helps the user finish them. Copy assumes the user knows what reselling is — no onboarding handholding once past the first-run.

---

## Visual foundations

The system follows the **Material Design 3 role model exactly** — token layers, naming conventions, and component-to-role mappings are identical to M3. What's Vendoo-specific is the theme (the key color, the surface treatments, and the shape commitments). If you've worked with M3, everything will feel familiar; just source your values from `tokens.css`.

### Token architecture

Three layers, same as M3:

1. **Reference (`--ref-*`)** — color primitives laid out as tonal palettes (primary, secondary, tertiary, neutral, neutral-variant, error — each with tones 0 → 100). Never referenced directly from components.
2. **System (`--sys-*`)** — semantic role tokens (`--sys-primary`, `--sys-on-surface`, `--sys-surface-container-high`, etc). **This is what components use.**
3. **Dimensional** — `--type-*`, `--radius-*`, `--elev-*`, `--space-*`, `--motion-*` for non-color systems.

Every color, typography, radius, elevation, and spacing value in the product is a token. Raw hex codes should never appear outside `tokens.css`.

### Color

The seed color is a deep, saturated violet — **`#4A00BF`** (the "Vendoo primary," tone 30 in the primary tonal palette). This is load-bearing: primary buttons, focused field borders, selected nav items, focused chips, step badges, the FAB. Around that seed sits a Material 3–style tonal palette (primary / secondary / tertiary / error / neutral / neutral-variant) with explicit light-theme roles.

- **Backgrounds** are warm off-whites with a hint of violet: `#FDF7FF` (surface container low), `#F8F1FF` (surface container), `#F2EBF9` (surface container high). Never pure `#FFFFFF` on full-page backgrounds — always the violet-tinted `#FDF7FF`.
- **Body text** is near-black with violet bias: `#1D1A24` for on-surface, `#494455` for on-surface-variant (secondary text).
- **Strokes** run `#D6CFE8` (standard) and `#CBC3D7` (slightly darker for elevated cards).
- **The brand mark itself is polychrome** — a four-stop gradient (yellow → pink → blue → teal). It appears only on the logo and is never used as a general-purpose background or decorative treatment in-product.
- **Error** is `#BA1A1A` on `#FFDAD6`. There is no explicit success or warning scale in the Figma — those states are implied via neutral + context.

### Type

**Lexend** is the sole product typeface. The Figma also references Inter in a couple of guide/annotation layers; those are *system documentation only* — production UI uses Lexend.

Weight usage:
- **400 Regular** — body, input text
- **500 Medium** — buttons, field labels, titles
- **600–700** — headlines and page intros (sparingly)

Sizes follow Material 3 type roles (headline / title / body / label), scaled to Lexend's slightly airier metrics. See `colors_and_type.css` for exact specs. Letter-spacing is tracked: `+0.15px` on titles, `+0.25–0.50px` on body — this is Material 3 behavior, preserved here.

### Spacing & rhythm

Multiples of **4**. The working scale is 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64. Section gaps are 32; field stacks are 16; inline icon→label gaps are 8.

Page gutters adapt with breakpoint: 16 (compact) / 24 (medium) / 32 (expanded).

### Cards & surfaces

- **Listing section cards** use `border-radius: 12px`, a 1px stroke (`#D6CFE8` default, `#4A00BF` when expanded/active), a tinted `#F2EBF9` header strip, and a `#FFFFFF` body panel.
- **Dialogs / sheets** use `border-radius: 28px`.
- **Pills / chips** use the full radius (`999px`).
- **Buttons** use `border-radius: 4px` (the Figma commits hard to Material 3's small-button corner — not the pill rounding common elsewhere).
- **Fields** use `border-radius: 4px`, same family as buttons.

### Elevation

Five levels of M3 elevation (see tokens) — but in practice the product leans on **strokes over shadows**. Most cards have only a 1px border; only menus, FABs, and bottom sheets pick up `elev-2` or `elev-3`.

### Motion & interaction

The Figma captures states but not timing. Inferring from the states that *do* exist:

- **Hover** — an 8% state-layer is overlaid on the role color (M3 pattern). For a violet button, hover darkens; for a ghost button, a violet tint appears.
- **Focus** — 10% state-layer + a 1px violet stroke on fields; focus rings are handled via border color change, not a separate outline.
- **Pressed** — 16% state-layer. No shrink / scale.
- **Disabled** — opacity drops to ~38% on text/icon, container drops to the 12% tint of on-surface.
- **Fades / bounces / springs** — the system does not prescribe them; assume short (150–200ms) `ease-out` for expansion, 80–120ms `linear` for state layers. No spring bounces.

### Imagery & textures

Vendoo does not ship hand-drawn illustrations, photography art direction, or repeating patterns as part of the design system. Photography is **user content** (listing photos) — the system frames it in square tiles with `border-radius: 8` and a neutral backdrop. No grain, no B&W, no warm/cool lookup tables. No full-bleed marketing imagery inside the product.

### Transparency & blur

Scrim uses `rgba(29, 26, 36, 0.40)` behind modals. No glass/blur effects on in-product surfaces — strokes and elevation do that job.

### Layout rules

- **App Bar** is always pinned to the top (mobile and desktop).
- **FAB** is an always-visible floating action at the bottom-right (mobile) or center of the bottom nav (tablet). It opens the Create Listing flow.
- **Bottom nav** has 4 items + a centered FAB.
- **Listing flow** uses a sticky footer with the primary `Crosslist to N` action — always visible, always enabled only when the draft is valid.

## Iconography

Vendoo ships a **custom, single-weight, 24×24 outline icon library** — 116 icons, shipped two ways:

- **`assets/icons.svg`** — single SVG symbol sprite (recommended). Two-tone fills remapped to `currentColor` so a single `color` declaration colors the whole glyph.
- **`assets/icons/*.svg`** — the same 116 icons as individual files, for tree-shakeable bundlers (Vite `?raw`, Next.js SVGR, etc.) or hand-pick into Figma/design tools.

### Usage (sprite)

```html
<svg width="24" height="24" style="color: var(--sys-primary)">
  <use href="/assets/icons.svg#sparkle"/>
</svg>
```

### Rules (from the Figma guide)

- **One glyph per icon.** Never bundle two symbols.
- **`lower_snake_case`** component naming — matches the sprite symbol IDs.
- **Reuse before extending.** Inspect the core set before drawing a new one.
- **24×24 viewBox** for all core icons.
- **Outline style**, single stroke weight, color via `currentColor`.
- **No emoji in-product. No Unicode character substitutes. No mixing of filled + outline icons in a single view.**
- **AI affordances are icon-led.** `sparkle`, `regenerate_ai`, `rewrite_ai`, `rewrite_ai_alt`, `list_ai`, `lightbulb_ai_tip` are the ONLY way the system indicates an AI action — there is no text label "AI" on buttons; the sparkle + verb label ("Rewrite", "Generate") is enough.

---

## Known caveats / substitutions

- **Fonts:** Lexend variable font, loaded via Google Fonts CDN (`@import` in `tokens.css`). Internet connection required at load time — swap to self-hosted `.ttf` if you need fully offline builds.
- **Icons:** 116-icon custom set shipped as SVG symbol sprite at `assets/icons.svg` — no substitution.
- **Marketplace logos:** 11 real brand SVGs shipped in `assets/marketplaces/` (Poshmark, eBay, Mercari, Depop, Etsy, Grailed, Facebook, Shopify, Vinted, Whatnot, Vestiaire Collective).
- **Motion timing & easing curves** are inferred, not documented.
