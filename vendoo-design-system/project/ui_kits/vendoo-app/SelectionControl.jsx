// SelectionControl — Checkbox / Radio / Switch
// Figma: Go Flow Design System → node 1237:5457 ("Selection Control")
// Variants: type × state × selected (12 total — no hover/focus/loading defined)

// ─── Checkbox ────────────────────────────────────────────────────────────────
function Checkbox({ checked = false, disabled = false, onChange, style = {}, ...rest }) {
  return (
    <button
      role="checkbox"
      aria-checked={checked}
      disabled={disabled}
      onClick={disabled ? undefined : onChange}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 24,
        height: 24,
        padding: 2,
        background: 'transparent',
        border: 'none',
        borderRadius: 0,
        boxSizing: 'border-box',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.38 : 1,
        flexShrink: 0,
        transition: 'opacity 120ms linear',
        ...style,
      }}
      {...rest}
    >
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: 5,
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          transition: 'background 150ms ease, border-color 150ms ease',
          ...(checked
            ? { background: 'var(--sys-primary)', border: 'none' }
            : { border: '1.25px solid var(--sys-outline)', background: 'transparent' }),
        }}
      >
        {checked && (
          <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
            <path
              d="M1.5 5L4.5 8.5L11.5 1.5"
              stroke="var(--sys-on-primary)"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
    </button>
  );
}

// ─── Radio ───────────────────────────────────────────────────────────────────
function Radio({ checked = false, disabled = false, onChange, style = {}, ...rest }) {
  return (
    <button
      role="radio"
      aria-checked={checked}
      disabled={disabled}
      onClick={disabled ? undefined : onChange}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 24,
        height: 24,
        padding: 1,
        background: 'transparent',
        border: 'none',
        boxSizing: 'border-box',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.38 : 1,
        flexShrink: 0,
        transition: 'opacity 120ms linear',
        ...style,
      }}
      {...rest}
    >
      <div
        style={{
          width: 22,
          height: 22,
          borderRadius: 999,
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          transition: 'background 150ms ease, border-color 150ms ease',
          ...(checked
            ? { background: 'var(--sys-primary)', border: 'none' }
            : { border: '1.5px solid var(--sys-on-surface-variant)', background: 'transparent' }),
        }}
      >
        {checked && (
          <svg width="14" height="11" viewBox="0 0 13 10" fill="none">
            <path
              d="M1.5 5L4.5 8.5L11.5 1.5"
              stroke="var(--sys-on-primary)"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
    </button>
  );
}

// ─── Switch ──────────────────────────────────────────────────────────────────
function Switch({ checked = false, disabled = false, onChange, style = {}, ...rest }) {
  const trackBase = {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    width: 52,
    height: 32,
    borderRadius: 999,
    boxSizing: 'border-box',
    flexShrink: 0,
    transition: 'background 150ms ease, border-color 150ms ease',
  };

  // Track color per state — all from tokens (replaces old raw rgba)
  let trackStyle;
  if (disabled && checked) {
    trackStyle = {
      ...trackBase,
      background: 'var(--state-onSurface-10)',
      border: '2px solid transparent',
      justifyContent: 'flex-end',
      padding: '2px 4px',
    };
  } else if (disabled && !checked) {
    trackStyle = {
      ...trackBase,
      background: 'var(--state-surfaceVariant-10)',
      border: '2px solid var(--state-onSurface-10)',
      justifyContent: 'flex-start',
      padding: 4,
    };
  } else if (checked) {
    trackStyle = {
      ...trackBase,
      background: 'var(--sys-primary)',
      border: '2px solid transparent',
      justifyContent: 'flex-end',
      padding: '2px 4px',
    };
  } else {
    trackStyle = {
      ...trackBase,
      background: 'var(--sys-surface-container-highest)',
      border: '2px solid var(--sys-outline)',
      justifyContent: 'flex-start',
      padding: 4,
    };
  }

  // Thumb: 24 when on, 16 when off; color depends on checked × disabled.
  // Opacity 0.38 applies to the thumb only (Figma pattern), not the outer button.
  const thumbSize = checked ? 24 : 16;
  let thumbBg;
  if (disabled && checked) thumbBg = 'var(--sys-surface)';
  else if (disabled && !checked) thumbBg = 'var(--sys-outline)';
  else if (checked) thumbBg = 'var(--sys-on-primary)';
  else thumbBg = 'var(--sys-outline)';

  const thumbStyle = {
    width: thumbSize,
    height: thumbSize,
    borderRadius: 999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    background: thumbBg,
    opacity: disabled ? 0.38 : 1,
    transition: 'width 150ms ease, height 150ms ease, background 150ms ease, opacity 120ms linear',
  };

  return (
    <button
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={disabled ? undefined : onChange}
      style={{
        background: 'transparent',
        border: 'none',
        padding: 0,
        cursor: disabled ? 'not-allowed' : 'pointer',
        ...style,
      }}
      {...rest}
    >
      <div style={trackStyle}>
        <div style={thumbStyle}>
          {checked ? (
            // Check mark (primary on white thumb when enabled; inherits thumb opacity when disabled)
            <svg width="14" height="11" viewBox="0 0 13 10" fill="none">
              <path
                d="M1.5 5L4.5 8.5L11.5 1.5"
                stroke="var(--sys-primary)"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            // "x" icon (on-surface) per Figma node 550:23467
            <Icon name="x" size={10} color="var(--sys-on-surface)" />
          )}
        </div>
      </div>
    </button>
  );
}

window.Checkbox = Checkbox;
window.Radio = Radio;
window.Switch = Switch;
