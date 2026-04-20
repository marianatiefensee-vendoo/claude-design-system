# Go Flow Design System — Component Specification
# Vendoo · Claude Code reference document
# Source of truth for all color, type, spacing, state, and component decisions.
# Read this before building any component. Never guess at token values.

---

## 1. Critical token warnings — read first

This system deviates from standard M3 in one important way:
`--sys-primary-container` is DARK (#6231d8), not a light tint.

```
WRONG assumptions (standard M3):        CORRECT values in this system:
--sys-primary-container = light tint  →  #6231d8 (dark purple) — small fills only
--sys-secondary-container = dark      →  #c3b0ff (light lavender) — tonal fills
```

Never use `--sys-primary-container` for large surface fills, card backgrounds,
button backgrounds, or tag backgrounds. See the usage table in section 2.

Icons must NEVER inherit color from a parent active/selected state.
Always pass `color` explicitly: `<Icon name="..." size={24} color="var(--sys-on-surface)" />`

---

## 2. Color roles — complete reference

### Primary
| Token | Value | Use |
|---|---|---|
| `--sys-primary` | #4a00bf | Filled button bg, FAB bg, active borders, step badge bg |
| `--sys-on-primary` | #ffffff | Text/icon on primary fills |
| `--sys-primary-container` | #6231d8 | Small badge fills ONLY — not large surfaces |
| `--sys-on-primary-container` | #d5c7ff | Text on primary-container |
| `--sys-primary-fixed` | #e8ddff | AI tag bg, soft primary tint on large areas |
| `--sys-on-primary-fixed` | #20005e | Text/icon on primary-fixed |
| `--sys-inverse-primary` | #cebdff | Primary on dark surfaces |

### Secondary
| Token | Value | Use |
|---|---|---|
| `--sys-secondary` | #64539b | Active nav label, secondary text accents |
| `--sys-on-secondary` | #ffffff | Text on secondary fills |
| `--sys-secondary-container` | #c3b0ff | Tonal button bg, nav selected pill, selected chip bg |
| `--sys-on-secondary-container` | #503f86 | Text on secondary-container |
| `--sys-secondary-fixed` | #e8ddff | Pale secondary tint |

### Surface (backgrounds)
| Token | Value | Use |
|---|---|---|
| `--sys-surface-container-lowest` | #ffffff | Cards, elevated panels, nav selected pill |
| `--sys-surface-container-low` | #f8f1ff | Subtle cards |
| `--sys-surface-container` | #f2ebf9 | App bar, bottom nav, page sections |
| `--sys-surface-container-high` | #ece6f3 | Input fields at rest, ask-ai bar |
| `--sys-surface-container-highest` | #e6e0ee | Highest emphasis surfaces |
| `--sys-surface` | #fdf7ff | Page background — never use pure #ffffff for full pages |
| `--sys-surface-dim` | #ded7e5 | Dimmed/scrimmed surface |
| `--sys-surface-variant` | #e7dff4 | Chip/tag alternative surface |

### Text and icons
| Token | Value | Use |
|---|---|---|
| `--sys-on-surface` | #1d1a24 | Primary text, all icons (explicit always) |
| `--sys-on-surface-variant` | #494455 | Secondary text, unselected labels, helper text |
| `--sys-on-background` | #1d1a24 | Same as on-surface, use on background fills |

### Borders
| Token | Value | Use |
|---|---|---|
| `--sys-outline` | #7a7486 | Input borders at rest, dividers |
| `--sys-outline-variant` | #cbc3d7 | Subtle dividers, card borders |

### Error
| Token | Value | Use |
|---|---|---|
| `--sys-error` | #ba1a1a | Error border, error icon |
| `--sys-on-error` | #ffffff | Text on error fills |
| `--sys-error-container` | #ffdad6 | Error bg fill |
| `--sys-on-error-container` | #93000a | Text on error-container |

### Reference neutrals (use only when no sys token maps correctly)
| Token | Value | Use |
|---|---|---|
| `--ref-neutral-70` | #aeaaae | Default/neutral tag background |
| `--ref-neutral-80` | #c9c5ca | Lighter neutral fill |
| `--ref-neutral-90` | #e6e1e6 | Palest neutral fill |

### Inverse and utility
| Token | Value | Use |
|---|---|---|
| `--sys-inverse-surface` | #322f39 | Dark tooltip/snackbar bg |
| `--sys-inverse-on-surface` | #f5eefc | Text on inverse-surface |
| `--sys-scrim` | #000000 | Modal scrim base (use at 40% opacity) |

---

## 3. Token quick-pick by use case

```
Tonal button bg:          --sys-secondary-container (#c3b0ff)
Tonal button text:        --sys-on-secondary-container (#503f86)
Filled button bg:         --sys-primary (#4a00bf)
Filled button text:       --sys-on-primary (#ffffff)
Outline button border:    --sys-outline (#7a7486)
Outline button text:      --sys-primary (#4a00bf)

AI tag bg:                --sys-primary-fixed (#e8ddff)
AI tag text/icon:         --sys-on-primary-fixed (#20005e)
Default tag bg:           --ref-neutral-70 (#aeaaae)
Default tag text:         --sys-on-primary (#ffffff)
Style tag bg:             --sys-secondary-container (#c3b0ff)
Style tag text:           --sys-on-secondary-container (#503f86)

Nav selected pill bg:     #ffffff (white, not a token)
Nav selected pill radius: 5px
Nav unselected pill:      transparent, radius 16px
Nav label (all states):   --sys-on-surface-variant (#494455)
Nav icon (all states):    --sys-on-surface (#1d1a24) — always explicit

Input border rest:        1px solid var(--sys-outline)
Input border focused:     2px solid var(--sys-primary) — subtract 1px from padding
Input border error:       2px solid var(--sys-error)
Input bg:                 --sys-surface (#fdf7ff)
Input text:               --sys-on-surface (#1d1a24)

Card border:              1px solid var(--sys-outline-variant)
Card bg:                  --sys-surface-container-lowest (#ffffff)
Card active border:       1px solid var(--sys-primary)
Card active header bg:    #f5eefc (tinted surface, not a named token)

Section card border rest: 1px solid var(--sys-outline-variant)
Section card border open: 1px solid var(--sys-primary)
Section card header bg:   #f5eefc when open
Section card body bg:     --sys-surface

Disabled bg:              rgba(29,26,36,0.12)
Disabled text/icon:       rgba(29,26,36,0.38)
Scrim:                    rgba(0,0,0,0.40)
```

---

## 4. Typography — full type scale

Use the shorthand `font:` property with the `--type-*` tokens.
Always add letter-spacing separately using the `--type-*-tracking` token.

```
Display:
  font: var(--type-display-lg);   /* 400 57px/64px */   tracking: -0.25px
  font: var(--type-display-md);   /* 400 45px/52px */   tracking: 0px
  font: var(--type-display-sm);   /* 400 36px/44px */   tracking: 0px

Headline:
  font: var(--type-headline-lg);  /* 400 32px/40px */   tracking: 0px
  font: var(--type-headline-md);  /* 400 28px/36px */   tracking: 0px
  font: var(--type-headline-sm);  /* 400 24px/32px */   tracking: 0px

Title:
  font: var(--type-title-lg);     /* 400 22px/28px */   tracking: 0px
  font: var(--type-title-md);     /* 500 16px/24px */   tracking: 0.15px
  font: var(--type-title-sm);     /* 500 14px/20px */   tracking: 0.1px

Body:
  font: var(--type-body-lg);      /* 400 16px/24px */   tracking: 0.5px
  font: var(--type-body-md);      /* 400 14px/20px */   tracking: 0.25px
  font: var(--type-body-sm);      /* 400 12px/16px */   tracking: 0.4px

Label:
  font: var(--type-label-lg);     /* 500 14px/20px */   tracking: 0.1px
  font: var(--type-label-md);     /* 500 12px/16px */   tracking: 0.5px
  font: var(--type-label-sm);     /* 500 11px/16px */   tracking: 0.5px
```

Weights: 400 regular, 500 medium, 700 bold only. Never 600.
Font family: always `var(--font-sans)` (Lexend).

---

## 5. Spacing

Base unit: 4px. Always use multiples of 4.

```
4px   — icon-to-label gap, tight internal spacing
8px   — component internal gap (icon + text in button)
12px  — small padding, chip padding
16px  — standard field padding, section padding, page gutter (mobile)
20px  — medium padding, button padding (md)
24px  — large padding, button padding (lg), page gutter (tablet)
32px  — section gap, page gutter (desktop)
40px  — large section gap
48px  — hero spacing
```

---

## 6. Border radius

```
4px   — buttons, fields, inputs, select (--alias-radius-button)
5px   — nav selected pill (exact Figma spec)
8px   — chips, tags, FAB, small cards (--alias-radius-chip)
12px  — listing cards, section cards, large panels
16px  — nav unselected pill container
20px  — sheets, larger modals
28px  — bottom sheets, dialogs
999px — pills, badges, full-radius chips
```

---

## 7. Elevation and shadows

```
Level 0:  no shadow
Level 1:  --sys-shadow-level1  →  box-shadow: 0px 1px 3px 1px rgba(0,0,0,0.30), 0px 1px 2px 0px rgba(0,0,0,0.15)
Level 2:  --sys-shadow-level2  →  box-shadow: 0px 2px 6px 2px rgba(0,0,0,0.30), 0px 1px 2px 0px rgba(0,0,0,0.15)
Level 3:  --sys-shadow-level3  →  box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.30), 0px 4px 8px 3px rgba(0,0,0,0.15)

Use level 1 for: cards with lift, dropdowns
Use level 2 for: FAB, dialogs
Use level 3 for: menus, tooltips, bottom sheets
```

In practice, most components use strokes not shadows.
Cards = 1px border, not shadow.
FAB = level 2 shadow.
Menus = level 3 shadow.

---

## 8. Motion and transitions

```
State layer changes (hover, press):  120ms linear
Focus border change:                 120ms linear
Expand / collapse:                   150ms ease-out (--alias-easing-hover)
State change (active/selected):      150ms ease-in-out (--alias-easing-state-change)
Loading steps:                       300ms
```

Standard transition line for most components:
`transition: "background-color 120ms linear, border-color 120ms linear, opacity 120ms linear"`

---

## 9. State layers

Applied as a semi-transparent overlay on top of the base color.

```
Hover:   8% opacity of the on-color  → color-mix(in srgb, var(--sys-on-surface) 8%, transparent)
Focus:   10% opacity of the on-color
Pressed: 16% opacity of the on-color
Dragged: 16% opacity of the on-color

For primary buttons, use on-primary (white) as the state layer color.
For surfaces, use on-surface (#1d1a24) as the state layer color.
```

---

## 10. Component-specific specs

### Button
```
Filled:   bg=--sys-primary, text=--sys-on-primary, radius=4px
Tonal:    bg=--sys-secondary-container, text=--sys-on-secondary-container, radius=4px
Outline:  bg=transparent, border=1px --sys-outline, text=--sys-primary, radius=4px
Text:     bg=transparent, text=--sys-primary, radius=4px
Danger:   bg=--sys-error, text=--sys-on-error, radius=4px

Size md:  padding=12px 20px, font=--type-label-lg (14px/20px 0.1px)
Size sm:  padding=8px 14px, font=--type-label-md (12px/16px 0.5px)
Size lg:  padding=16px 24px, font=16px/24px 500 0.1px

Icon size: sm=16px, md/lg=18px
Gap between icon and label: 8px
```

### IconButton
```
Size standard: 48×48px, icon=24px
Size large:    56×56px, icon=24px
Border-radius: 999px (circular)
Types: standard (transparent bg), tonal (secondary-container bg),
       primary (primary bg), outline (1px outline border)
Icon color: always explicit, matches on-color for filled types
```

### Field / Input
```
Height:          56px (md), 48px (sm)
Border rest:     1px solid var(--sys-outline)
Border focused:  2px solid var(--sys-primary) — padding shrinks by 1px
Border error:    2px solid var(--sys-error)
Background:      var(--sys-surface)
Text:            var(--sys-on-surface), --type-body-lg (16px/24px 0.5px)
Label:           var(--sys-on-surface-variant), --type-label-md (12px 0.5px)
Helper:          var(--sys-on-surface-variant), --type-body-sm (12px/16px 0.4px)
Error helper:    var(--sys-error), same size
Radius:          4px
Padding:         14px 16px (rest), 13px 15px (focused/error, -1px for border)
```

### Selection control (checkbox, radio, switch)
```
Checked fill:    --sys-primary (#4a00bf)
Checked icon:    --sys-on-primary (#ffffff)
Unchecked border:--sys-outline (#7a7486)
Unchecked bg:    transparent
Disabled:        rgba(29,26,36,0.12) fill, rgba(29,26,36,0.38) icon
Size:            24×24px (checkbox/radio), 52×32px (switch)
Radius:          4px (checkbox), 999px (radio, switch track)
```

### Navigation bar
```
Container:       412×64px, bg=--sys-surface-container (#f2ebf9)
Nav item:        89×64px wide, 5 per bar including FAB slot

Nav item unselected:
  Pill:          56×32px, radius=16px, bg=transparent
  Icon:          24×24px, color=--sys-on-surface (#1d1a24) — ALWAYS explicit
  Label:         --type-label-md (12px/16px 0.5px), color=--sys-on-surface-variant
  Icon and label color do NOT change on active state

Nav item selected:
  Pill:          56×32px, radius=5px, bg=#ffffff (white — NOT secondary-container)
  Icon:          same, 24×24px, --sys-on-surface
  Label:         same color and type — no change from unselected

FAB (center slot):
  Size:          56×56px, radius=8px
  Background:    --sys-primary
  Icon:          plus_circle, 24×24px, color=--sys-on-primary
  Shadow:        --sys-shadow-level3
```

### App bar
```
Height:          56px
Background:      --sys-surface
Border-bottom:   1px solid var(--sys-outline-variant)
Title:           --type-title-lg (22px/28px 500), color=--sys-on-surface
Leading icon:    28×28px brand mark
Trailing icons:  IconButton standard
Padding:         0 8px 0 16px
```

### Section card (listing flow)
```
Radius:          12px
Border rest:     1px solid var(--sys-outline-variant)
Border active:   1px solid var(--sys-primary)
Header bg rest:  --sys-surface
Header bg active:#f5eefc
Body bg:         --sys-surface
Body padding:    18px 20px
Header padding:  16px 20px

Step badge:
  Done:     32×32px circle, bg=--sys-primary, icon=check white
  Current:  32×32px circle, bg=--sys-primary, number white
  Todo:     32×32px circle, bg=--sys-surface-container-high, number --sys-on-surface-variant

Chevron icon: 22px, color=--sys-on-surface-variant
```

### Tag
```
Default tag:     bg=--ref-neutral-70 (#aeaaae), text=--sys-on-primary (#fff)
AI tag:          bg=--sys-primary-fixed (#e8ddff), text=--sys-on-primary-fixed (#20005e)
Both:            height=20px, radius=8px, padding=0 8px
                 font=400 11px/14px var(--font-sans), tracking=0
Sparkle icon:    12×12px, same color as text
```

### Style tag / chip
```
Default:   bg=--sys-secondary-container (#c3b0ff), text=--sys-on-secondary-container (#503f86)
Disabled:  bg=rgba(29,26,36,0.12), text=rgba(29,26,36,0.38)
Size:      height=22px, radius=8px, padding=4px 8px
Font:      400 11px/14px var(--font-sans)
Remove ×:  12×12px, CSS-drawn (not from sprite), inherits text color
```

### Marketplace chip
```
Selected:   bg=--sys-primary-container, border=1px --sys-primary
            text=--sys-on-primary-container
Unselected: bg=--sys-surface, border=1px --sys-outline
            text=--sys-on-surface-variant
Radius:     999px (pill)
Padding:    6px 12px 6px 6px
Logo:       24×24px rounded (radius=6px)
Font:       --type-label-md (12px/16px 0.5px) weight 500
```

---

## 11. Icon rules

```
Sprite path:  ../../assets/icons.svg (relative from ui_kits/vendoo-app/)
Usage:        <Icon name="icon_name" size={24} color="var(--sys-on-surface)" />
Default size: 24px
Small size:   16px (inside chips, tags)
Medium size:  20px (inside small buttons)

Color rule:   ALWAYS explicit. Never inherit from parent.
  On surface:          color="var(--sys-on-surface)"
  On primary fill:     color="var(--sys-on-primary)"
  On secondary-cont:   color="var(--sys-on-secondary-container)"
  On primary-fixed:    color="var(--sys-on-primary-fixed)"
  Muted/secondary:     color="var(--sys-on-surface-variant)"

AI icons (exclusive set — only these indicate AI):
  sparkle, rewrite_ai, rewrite_ai_alt, regenerate_ai, list_ai, lightbulb_ai_tip

Nav icons (Figma spec):
  Listings → listing_alt
  Store    → store
  Sales    → shopping_bag
  Insights → Analytics (note capital A — matches sprite ID)
  FAB      → plus_circle
```

---

## 12. Interaction patterns

### Hover
```js
onMouseEnter={(e) => e.currentTarget.style.background = "color-mix(in srgb, var(--sys-on-surface) 8%, transparent)"}
onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
// For primary buttons use on-primary instead of on-surface
```

### Focus (fields)
```js
// On focus: border 2px, padding shrinks 1px on each side
onFocus={() => setFocused(true)}
onBlur={() => setFocused(false)}
const border = focused ? "2px solid var(--sys-primary)" : "1px solid var(--sys-outline)"
const padding = focused ? "13px 15px" : "14px 16px"
```

### Disabled
```js
// Always use these values, not opacity on the whole component
background: "rgba(29,26,36,0.12)"
color: "rgba(29,26,36,0.38)"
cursor: "not-allowed"
// For outlined disabled: border: "1px solid rgba(29,26,36,0.12)"
```

---

## 13. Component export pattern

Every JSX file must end with window exports for the no-build setup:
```js
window.ComponentName = ComponentName;
// If multiple exports:
window.Button = Button;
window.IconButton = IconButton;
```

And add to index.js:
```js
export { default as ComponentName } from './ComponentName.jsx';
// or for named exports:
export { ComponentA, ComponentB } from './File.jsx';
```
