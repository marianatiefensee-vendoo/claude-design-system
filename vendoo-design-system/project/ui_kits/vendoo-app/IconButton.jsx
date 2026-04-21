const { useState } = React;

/**
 * IconButton — Figma node 1227:5422 (Go Flow Design System)
 *
 * Types: standard | tonal | primary | outline
 * Sizes: standard (48px hit / 40px visual) | large (56×56)
 * States: available (default) · hover · focus · disabled
 *
 * Icon accepts a sprite name string or a ReactNode; rendered at 24×24 (matches Figma).
 *
 * Deviations from Figma (intentional, documented):
 *   - Hover defined for all 4 types (Figma defines it only for Standard)
 *   - Focus (0.10 state layer) defined for all 4 types (absent in Figma)
 *   - Disabled bg is uniform onSurface/0.10 across all types including Outline
 *     (Figma's Outline/Disabled skips the fill; we match Button for consistency)
 *   - No Loading state (intentional — IconButton is atomic, no label to replace)
 */
function IconButton({
  icon,
  type = 'standard',
  size = 'standard',
  disabled = false,
  onClick,
  title,
  style = {},
  ...rest
}) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  const isInteractive = !disabled;
  const showFocus = focused && isInteractive;
  const showHover = hovered && isInteractive && !showFocus;

  const isLarge = size === 'large';
  const outerDim = isLarge ? 56 : 48; // touch target
  const innerDim = isLarge ? 56 : 40; // visual chrome

  // Per-type tokens: base fill/text + state-layer overlay for hover (08) and focus (10)
  const variants = {
    standard: {
      bg:    'transparent',
      fg:    'var(--sys-on-surface-variant)',
      hover: 'var(--state-onSurface-08)',
      focus: 'var(--state-onSurface-10)',
    },
    tonal: {
      bg:    'var(--sys-secondary-container)',
      fg:    'var(--sys-on-secondary-container)',
      hover: 'var(--state-onSecondaryContainer-08)',
      focus: 'var(--state-onSecondaryContainer-10)',
    },
    primary: {
      bg:    'var(--sys-primary)',
      fg:    'var(--sys-on-primary)',
      hover: 'var(--state-onPrimary-08)',
      focus: 'var(--state-onPrimary-10)',
    },
    outline: {
      bg:    'transparent',
      fg:    'var(--sys-on-surface-variant)',
      hover: 'var(--state-onSurface-08)',
      focus: 'var(--state-onSurface-10)',
    },
  };

  const v = variants[type] || variants.standard;

  // Inner chrome fill: disabled wins, then focus, then hover, else base
  const innerBg = disabled
    ? 'var(--state-onSurface-10)'
    : showFocus
      ? v.focus
      : showHover
        ? v.hover
        : v.bg;

  const innerBorder = type === 'outline' ? '1px solid var(--sys-outline-variant)' : 'none';

  // Icon renderer: accept string sprite name or ReactNode
  const renderIcon = () => {
    if (!icon) return null;
    if (typeof icon === 'string') return <Icon name={icon} size={24} color="currentColor" />;
    return icon;
  };

  return (
    <button
      type="button"
      onClick={isInteractive ? onClick : undefined}
      onMouseEnter={() => { if (isInteractive) setHovered(true); }}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => { if (isInteractive) setFocused(true); }}
      onBlur={() => setFocused(false)}
      disabled={disabled}
      title={title}
      aria-label={title}
      style={{
        width: outerDim,
        height: outerDim,
        padding: 0,
        margin: 0,
        background: 'transparent',
        border: 'none',
        outline: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        appearance: 'none',
        WebkitAppearance: 'none',
        boxSizing: 'border-box',
        ...style,
      }}
      {...rest}
    >
      <span
        style={{
          width: innerDim,
          height: innerDim,
          borderRadius: 'var(--radius-alias-icon-button, 4px)',
          background: innerBg,
          color: disabled ? 'var(--sys-on-surface)' : v.fg,
          border: innerBorder,
          boxSizing: 'border-box',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: disabled ? 0.38 : 1,
          transition: 'background 120ms linear',
          pointerEvents: 'none',
        }}
      >
        {renderIcon()}
      </span>
    </button>
  );
}

window.IconButton = IconButton;
