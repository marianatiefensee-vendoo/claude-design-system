/**
 * NavigationBar — Figma Go Flow Design System
 *   Container: node 555:30780
 *   Nav item:  node 555:30509 (8 variants; we implement Enabled × Selected × hover/focus state-layer)
 *   FAB:       node 550:26273
 *
 * Structure (flex, matches Figma):
 *   [nav-item 0] [nav-item 1] [FAB] [nav-item 2] [nav-item 3]
 *   Each nav-item: flex: 1 0 0. FAB: 56×56 fixed.
 *   Container: 412px wide, padding 8px 0, bg --sys-surface-container, auto-height (~68px).
 *
 * @prop {Array<{id:string, icon:string, label:string}>} items  up to 4 nav items
 * @prop {string}   activeItem   id of the currently active item
 * @prop {Function} onItemChange called with item id on nav-item press
 * @prop {Function} onFabPress   called on FAB press
 */
const { useState } = React;

function NavBarItem({ icon, label, active, onClick }) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  const showFocus = focused;
  const showHover = hovered && !focused;

  // State layer pairs with the bg's on-color:
  //   active  → onSecondaryContainer (pill is secondary-container)
  //   inactive → onSurface (no pill, icon uses on-surface-variant)
  const stateLayer = showFocus
    ? (active ? 'var(--state-onSecondaryContainer-10)' : 'var(--state-onSurface-10)')
    : showHover
      ? (active ? 'var(--state-onSecondaryContainer-08)' : 'var(--state-onSurface-08)')
      : 'transparent';

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      aria-current={active ? 'page' : undefined}
      style={{
        flex: '1 0 0',
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        padding: 0,
        background: 'transparent',
        border: 0,
        cursor: 'pointer',
        fontFamily: 'inherit',
        appearance: 'none',
        WebkitAppearance: 'none',
        boxSizing: 'border-box',
      }}
    >
      {/* Icon container — pill when active */}
      <span style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 56,
        height: 32,
        padding: '4px 0',
        boxSizing: 'border-box',
        background: active ? 'var(--sys-secondary-container)' : 'transparent',
        borderRadius: active ? 'var(--radius-ref-extra-small, 4px)' : 0,
        color: active ? 'var(--sys-on-secondary-container)' : 'var(--sys-on-surface-variant)',
        overflow: 'hidden',
        transition: 'background 120ms linear, color 120ms linear, border-radius 120ms linear',
      }}>
        {/* Hover/focus state layer */}
        <span style={{
          position: 'absolute',
          inset: 0,
          background: stateLayer,
          pointerEvents: 'none',
          transition: 'background 120ms linear',
        }} />
        <Icon name={icon} size={24} color="currentColor" />
      </span>

      {/* Label */}
      <span style={{
        fontFamily: 'var(--font-sans)',
        fontWeight: 500,
        fontSize: 12,
        lineHeight: '16px',
        letterSpacing: '0.5px',
        textAlign: 'center',
        color: active ? 'var(--sys-secondary)' : 'var(--sys-on-surface-variant)',
        transition: 'color 120ms linear',
      }}>
        {label}
      </span>
    </button>
  );
}

function NavBarFAB({ onPress }) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  const showFocus = focused;
  const showHover = hovered && !focused;

  const stateLayer = showFocus
    ? 'var(--state-onPrimary-10)'
    : showHover
      ? 'var(--state-onPrimary-08)'
      : 'transparent';

  return (
    <button
      onClick={onPress}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      aria-label="Create listing"
      style={{
        width: 56,
        height: 56,
        flexShrink: 0,
        padding: 0,
        border: 0,
        borderRadius: 'var(--radius-alias-fab, 8px)',
        background: 'var(--sys-primary)',
        color: 'var(--sys-on-primary)',
        boxShadow: 'var(--sys-shadow-level3)',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        cursor: 'pointer',
        appearance: 'none',
        WebkitAppearance: 'none',
      }}
    >
      <span style={{
        position: 'absolute',
        inset: 0,
        background: stateLayer,
        pointerEvents: 'none',
        transition: 'background 120ms linear',
      }} />
      <Icon name="plus_circle" size={24} color="currentColor" />
    </button>
  );
}

function NavigationBar({ items = [], activeItem, onItemChange, onFabPress }) {
  const list = items.slice(0, 4);
  const renderItem = (item) =>
    item ? (
      <NavBarItem
        key={item.id}
        icon={item.icon}
        label={item.label}
        active={item.id === activeItem}
        onClick={() => onItemChange && onItemChange(item.id)}
      />
    ) : null;

  return (
    <nav
      aria-label="Primary navigation"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 412,
        padding: '8px 0',
        background: 'var(--sys-surface-container)',
        flexShrink: 0,
        boxSizing: 'border-box',
      }}
    >
      {renderItem(list[0])}
      {renderItem(list[1])}
      <NavBarFAB onPress={onFabPress} />
      {renderItem(list[2])}
      {renderItem(list[3])}
    </nav>
  );
}

window.NavigationBar = NavigationBar;
window.NavBarItem = NavBarItem;
window.NavBarFAB = NavBarFAB;
