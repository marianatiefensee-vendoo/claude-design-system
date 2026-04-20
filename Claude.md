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
When building a new component from Figma:
1. get_design_context for the parent node only (children are fetched as needed)
2. get_variable_defs once for token mapping
3. Create ComponentName.jsx in ui_kits/vendoo-app/
4. Create components-{name}.html in preview/ (copy structure from components-buttons.html)
5. Take ONE screenshot at scroll 0 to verify, not three

## Existing components
- Button.jsx (node 1237:xxxx) — complete
- SelectionControl.jsx (node 3001:4216) — complete
    