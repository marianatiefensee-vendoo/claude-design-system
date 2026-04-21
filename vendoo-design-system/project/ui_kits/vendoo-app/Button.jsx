const { useState } = React;

// Inject spinner keyframes once per page
if (typeof document !== 'undefined' && !document.getElementById('vendoo-button-spin')) {
  const el = document.createElement('style');
  el.id = 'vendoo-button-spin';
  el.textContent = '@keyframes vendoo-button-spin { to { transform: rotate(360deg); } }';
  document.head.appendChild(el);
}

/**
 * Button — Figma node 1219:5473 (Go Flow Design System)
 *
 * Variants: filled | tonal | outline | text
 * Sizes:    sm | md
 * States:   available (default) · hover · focus · loading · disabled
 *
 * Icons accept a sprite name string (e.g. leadingIcon="plus") or a ReactNode.
 * Icons inherit color via currentColor and render at 20×20 uniformly.
 *
 * Deviations from Figma (intentional, documented):
 *   - Text variant supports hover/focus (Figma defines only Available + Disabled)
 *   - Loading state supported on all 4 variants (Figma only has Filled/Small)
 *   - Icon size fixed at 20 (Figma mixes 20 and 24 — revisit when Figma is normalized)
 */
function Button({
  variant = 'filled',
  size = 'md',
  leadingIcon,
  trailingIcon,
  showLeadingIcon = true,
  showTrailingIcon = true,
  loading = false,
  disabled = false,
  children,
  onClick,
  type = 'button',
  style = {},
  ...rest
}) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  const isInteractive = !disabled && !loading;
  const showFocus = focused && isInteractive;
  const showHover = hovered && isInteractive && !showFocus;

  // Per-variant tokens: base fill/text + state-layer overlay for hover (08) and focus (10)
  const variants = {
    filled: {
      bg:    'var(--sys-primary)',
      fg:    'var(--sys-on-primary)',
      hover: 'var(--state-onPrimary-08)',
      focus: 'var(--state-onPrimary-10)',
    },
    tonal: {
      bg:    'var(--sys-secondary-container)',
      fg:    'var(--sys-on-secondary-container)',
      hover: 'var(--state-onSecondaryContainer-08)',
      focus: 'var(--state-onSecondaryContainer-10)',
    },
    outline: {
      bg:    'transparent',
      fg:    'var(--sys-on-surface-variant)',
      hover: 'var(--state-onSurface-08)',
      focus: 'var(--state-onSurface-10)',
    },
    text: {
      bg:    'transparent',
      fg:    'var(--sys-primary)',
      hover: 'var(--state-primary-08)',
      focus: 'var(--state-primary-10)',
    },
  };

  const v = variants[variant] || variants.filled;

  // Outer frame: base bg, radius, optional outline stroke
  const outerStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    margin: 0,
    border: variant === 'outline' ? '1px solid var(--sys-outline-variant)' : 'none',
    borderRadius: 'var(--radius-alias-button, 4px)',
    background: disabled ? 'var(--state-onSurface-10)' : v.bg,
    color: disabled ? 'var(--sys-on-surface)' : v.fg,
    cursor: disabled ? 'not-allowed' : loading ? 'wait' : 'pointer',
    fontFamily: 'var(--font-sans)',
    fontSize: 14,
    fontWeight: 500,
    lineHeight: '20px',
    letterSpacing: '0.1px',
    whiteSpace: 'nowrap',
    outline: 'none',
    appearance: 'none',
    WebkitAppearance: 'none',
    boxSizing: 'border-box',
    transition: 'background 120ms linear',
    ...style,
  };

  // Inner state-layer wrapper: padding, gap, state overlay, disabled opacity
  const innerBg = !isInteractive
    ? 'transparent'
    : showFocus
      ? v.focus
      : showHover
        ? v.hover
        : 'transparent';

  const innerStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    padding: size === 'sm' ? '10px 16px' : '16px 24px',
    borderRadius: 'var(--radius-alias-button, 4px)',
    background: innerBg,
    opacity: disabled ? 0.38 : 1,
    transition: 'background 120ms linear',
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
  };

  // Label wrapper: 4px inline padding per Figma alias-space-button-label-padding-inline
  const labelStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0 4px',
  };

  const renderIcon = (icon) => {
    if (!icon) return null;
    if (typeof icon === 'string') return <Icon name={icon} size={20} color="currentColor" />;
    return icon;
  };

  const Spinner = () => (
    <span
      role="status"
      aria-label="Loading"
      style={{
        display: 'inline-block',
        width: 20,
        height: 20,
        border: '2px solid currentColor',
        borderTopColor: 'transparent',
        borderRadius: '50%',
        animation: 'vendoo-button-spin 800ms linear infinite',
      }}
    />
  );

  return (
    <button
      type={type}
      onClick={isInteractive ? onClick : undefined}
      onMouseEnter={() => { if (isInteractive) setHovered(true); }}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => { if (isInteractive) setFocused(true); }}
      onBlur={() => setFocused(false)}
      disabled={disabled}
      aria-busy={loading || undefined}
      style={outerStyle}
      {...rest}
    >
      <span style={innerStyle}>
        {loading ? (
          <Spinner />
        ) : (
          <>
            {showLeadingIcon && renderIcon(leadingIcon)}
            {children != null && <span style={labelStyle}>{children}</span>}
            {showTrailingIcon && renderIcon(trailingIcon)}
          </>
        )}
      </span>
    </button>
  );
}

window.Button = Button;
