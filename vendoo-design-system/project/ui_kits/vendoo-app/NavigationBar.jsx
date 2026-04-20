/**
 * NavigationBar — Figma node 555:30780
 *
 * @prop {Array<{id:string, icon:string, label:string}>} items  4 nav items
 * @prop {string}   activeItem   id of the active item
 * @prop {Function} onItemChange called with item id on nav press
 * @prop {Function} onFabPress   called on FAB press
 */
function NavBarItem({ icon, label, active, onClick, left }) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-current={active ? 'page' : undefined}
      style={{
        position: 'absolute',
        left,
        top: 0,
        width: 89,
        height: 64,
        background: 'transparent',
        border: 0,
        cursor: 'pointer',
        fontFamily: 'inherit',
        padding: 0,
      }}
    >
      <span style={{
        position: 'absolute',
        left: 'calc(50% - 28px)',
        top: 6,
        width: 56,
        height: 32,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: active ? 5 : 16,
        backgroundColor: active ? '#ffffff' : 'transparent',
        transition: 'background-color 120ms linear, border-radius 120ms linear',
      }}>
        <span style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          backgroundColor: 'var(--sys-on-surface)',
          opacity: hovered ? 0.08 : 0,
          pointerEvents: 'none',
          transition: 'opacity 120ms linear',
        }} />
        <Icon name={icon} size={24} color="var(--sys-on-surface)" />
      </span>
      <span style={{
        position: 'absolute',
        left: 0,
        top: 42,
        width: '100%',
        height: 16,
        fontFamily: 'var(--font-sans)',
        fontWeight: 500,
        fontSize: 12,
        lineHeight: '16px',
        letterSpacing: '0.5px',
        textAlign: 'center',
        color: 'var(--sys-on-surface-variant)',
      }}>
        {label}
      </span>
    </button>
  );
}

function NavBarFAB({ onPress }) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <button
      onClick={onPress}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Create listing"
      style={{
        position: 'absolute',
        left: 178,
        top: 4,
        width: 56,
        height: 56,
        border: 0,
        padding: 0,
        cursor: 'pointer',
        borderRadius: 8,
        background: 'transparent',
      }}
    >
      <span style={{
        position: 'absolute',
        inset: 0,
        borderRadius: 8,
        backgroundColor: 'var(--sys-primary)',
        boxShadow: 'var(--sys-shadow-level3)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <span style={{
          position: 'absolute',
          left: 0,
          top: 8,
          width: 56,
          height: 40,
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <span style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            backgroundColor: 'var(--sys-on-primary)',
            opacity: hovered ? 0.08 : 0,
            transition: 'opacity 120ms linear',
            pointerEvents: 'none',
          }} />
          <Icon name="plus_circle" size={24} color="var(--sys-on-primary)" />
        </span>
      </span>
    </button>
  );
}

const ITEM_OFFSETS = [0, 89, 234, 323];

function NavigationBar({ items = [], activeItem, onItemChange, onFabPress }) {
  return (
    <nav
      aria-label="Primary navigation"
      style={{
        position: 'relative',
        width: 412,
        height: 64,
        backgroundColor: 'var(--sys-surface-container)',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      {items.slice(0, 4).map((item, i) => (
        <NavBarItem
          key={item.id}
          icon={item.icon}
          label={item.label}
          active={item.id === activeItem}
          onClick={() => onItemChange && onItemChange(item.id)}
          left={ITEM_OFFSETS[i]}
        />
      ))}
      <NavBarFAB onPress={onFabPress} />
    </nav>
  );
}

window.NavigationBar = NavigationBar;
window.NavBarItem = NavBarItem;
window.NavBarFAB = NavBarFAB;
