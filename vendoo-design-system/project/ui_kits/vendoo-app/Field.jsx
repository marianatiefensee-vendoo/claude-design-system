const { useState } = React;

/**
 * Field + FieldSelect — text input components (Go Flow Design System)
 * Figma: Field node 1243:5664 · Field/Select node 1243:5824
 *
 * Both share a Title row (label + optional Tag chip + optional AssistiveChip)
 * and an input box, with optional Supporting text below.
 *
 * Field states:   enabled | focused | filled | validated | long-text | disabled | error
 *   - filled    = has value, primary border (just-entered emphasis)
 *   - validated = has value, outline border (settled)
 *   - long-text = has value, outline border; name covers the overflow-truncation demo
 *
 * FieldSelect states: enabled | focused | filled | disabled
 *   - trailing chevron rotates 180° when focused or filled (open state)
 */

// ─── Internal helpers ────────────────────────────────────────────────────────

function FieldTag({ icon = 'info', label = 'Status', error = false }) {
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      minHeight: 20,
      padding: '0 4px',
      borderRadius: 'var(--radius-alias-chip, 8px)',
      background: error ? 'var(--sys-surface-dim)' : 'var(--sys-primary-fixed)',
      color: error ? 'var(--sys-on-surface-variant)' : 'var(--sys-on-primary-fixed)',
      fontFamily: 'var(--font-sans)',
      fontSize: 11,
      lineHeight: '14px',
      fontWeight: 400,
      whiteSpace: 'nowrap',
      flexShrink: 0,
    }}>
      {icon && <Icon name={icon} size={12} color="currentColor" />}
      {label}
    </span>
  );
}

function FieldAssistiveChip({ icon = 'sparkle', label = 'Label', onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        height: 32,
        padding: '6px 8px',
        marginLeft: 'auto',
        background: hovered ? 'var(--state-primary-08)' : 'transparent',
        border: 'none',
        borderRadius: 8,
        color: 'var(--sys-primary)',
        fontFamily: 'var(--font-sans)',
        fontSize: 12,
        fontWeight: 500,
        lineHeight: '16px',
        letterSpacing: '0.5px',
        cursor: 'pointer',
        flexShrink: 0,
        transition: 'background 120ms linear',
        appearance: 'none',
      }}
    >
      {icon && <Icon name={icon} size={18} color="currentColor" />}
      {label}
    </button>
  );
}

// ─── Field ───────────────────────────────────────────────────────────────────

function Field({
  state = 'enabled',
  label = 'Label',
  value = '',
  placeholder = '',
  supportingText,
  showTag = false,
  tag,
  showAssistiveChip = false,
  assistiveChip,
  showSupportingText = false,
  onChange,
  onClear,
  clearIcon = 'x',
  onFocus,
  onBlur,
  style = {},
  ...rest
}) {
  const isDisabled  = state === 'disabled';
  const isError     = state === 'error';
  const isFocused   = state === 'focused';
  const isFilled    = state === 'filled';

  const borderColor = isError
    ? 'var(--sys-error)'
    : (isFocused || isFilled)
      ? 'var(--sys-primary)'
      : 'var(--sys-outline)';

  const showTrailingClear = isFilled || isError;
  const tagVisible  = showTag && !isDisabled;
  const chipVisible = showAssistiveChip && !isDisabled && !isError;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      width: '100%',
      opacity: isDisabled ? 0.38 : 1,
      ...style,
    }}>
      {label && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}>
          <span style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 500,
            fontSize: 16,
            lineHeight: '24px',
            letterSpacing: '0.15px',
            color: isError ? 'var(--sys-error)' : 'var(--sys-on-surface-variant)',
            whiteSpace: 'nowrap',
          }}>{label}</span>
          {tagVisible && <FieldTag error={isError} {...(tag || {})} />}
          {chipVisible && <FieldAssistiveChip {...(assistiveChip || {})} />}
        </div>
      )}

      <div style={{
        display: 'flex',
        alignItems: 'center',
        height: 56,
        border: `1px solid ${borderColor}`,
        borderRadius: 'var(--radius-alias-field, 4px)',
        paddingLeft: 16,
        paddingRight: showTrailingClear ? 4 : 16,
        paddingTop: 4,
        paddingBottom: 4,
        boxSizing: 'border-box',
        background: 'transparent',
        transition: 'border-color 150ms ease',
      }}>
        <input
          value={value}
          placeholder={placeholder}
          disabled={isDisabled}
          onChange={isDisabled ? undefined : (e) => onChange?.(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          style={{
            flex: '1 0 0',
            minWidth: 0,
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontFamily: 'var(--font-sans)',
            fontWeight: 400,
            fontSize: 16,
            lineHeight: '24px',
            letterSpacing: '0.5px',
            color: 'var(--sys-on-surface)',
            cursor: isDisabled ? 'not-allowed' : 'text',
          }}
          {...rest}
        />
        {showTrailingClear && (
          <button
            type="button"
            onClick={onClear}
            aria-label="Clear"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              width: 40,
              height: 40,
              border: 'none',
              borderRadius: 'var(--radius-alias-circular, 999px)',
              background: 'transparent',
              color: isError ? 'var(--sys-error)' : 'var(--sys-on-surface-variant)',
              cursor: 'pointer',
              transition: 'background 120ms linear',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--state-onSurface-08)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <Icon name={clearIcon} size={24} color="currentColor" />
          </button>
        )}
      </div>

      {showSupportingText && supportingText && (
        <span style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 400,
          fontSize: 11,
          lineHeight: '14px',
          color: isError ? 'var(--sys-error)' : 'var(--sys-on-surface-variant)',
          paddingLeft: 16,
          paddingTop: 4,
        }}>{supportingText}</span>
      )}
    </div>
  );
}

// ─── FieldSelect ─────────────────────────────────────────────────────────────

function FieldSelect({
  state = 'enabled',
  label = 'Label',
  value = '',
  placeholder = 'Select...',
  supportingText,
  showTag = false,
  tag,
  showAssistiveChip = false,
  assistiveChip,
  showSupportingText = false,
  onClick,
  onFocus,
  onBlur,
  style = {},
  ...rest
}) {
  const isDisabled = state === 'disabled';
  const isFocused  = state === 'focused';
  const isFilled   = state === 'filled';
  const isOpen     = isFocused || isFilled;

  const borderColor = isOpen ? 'var(--sys-primary)' : 'var(--sys-outline)';
  const tagVisible  = showTag && !isDisabled;
  const chipVisible = showAssistiveChip && !isDisabled;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      width: '100%',
      opacity: isDisabled ? 0.38 : 1,
      ...style,
    }}>
      {label && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}>
          <span style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 500,
            fontSize: 16,
            lineHeight: '24px',
            letterSpacing: '0.15px',
            color: 'var(--sys-on-surface-variant)',
            whiteSpace: 'nowrap',
          }}>{label}</span>
          {tagVisible && <FieldTag {...(tag || {})} />}
          {chipVisible && <FieldAssistiveChip {...(assistiveChip || {})} />}
        </div>
      )}

      <button
        type="button"
        onClick={isDisabled ? undefined : onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={isDisabled}
        style={{
          display: 'flex',
          alignItems: 'center',
          height: 56,
          border: `1px solid ${borderColor}`,
          borderRadius: 'var(--radius-alias-field, 4px)',
          paddingLeft: 16,
          paddingRight: 4,
          paddingTop: 4,
          paddingBottom: 4,
          boxSizing: 'border-box',
          background: 'transparent',
          cursor: isDisabled ? 'not-allowed' : 'pointer',
          transition: 'border-color 150ms ease',
          textAlign: 'left',
          appearance: 'none',
        }}
        {...rest}
      >
        <span style={{
          flex: '1 0 0',
          minWidth: 0,
          fontFamily: 'var(--font-sans)',
          fontWeight: 400,
          fontSize: 16,
          lineHeight: '24px',
          letterSpacing: '0.5px',
          color: value ? 'var(--sys-on-surface)' : 'var(--sys-outline)',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>{value || placeholder}</span>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          width: 40,
          height: 40,
          borderRadius: 'var(--radius-alias-circular, 999px)',
          color: 'var(--sys-on-surface-variant)',
          transform: isOpen ? 'rotate(180deg)' : 'none',
          transition: 'transform 150ms ease',
          pointerEvents: 'none',
        }}>
          <Icon name="chevron_down" size={24} color="currentColor" />
        </span>
      </button>

      {showSupportingText && supportingText && (
        <span style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 400,
          fontSize: 11,
          lineHeight: '14px',
          color: 'var(--sys-on-surface-variant)',
          paddingLeft: 16,
          paddingTop: 4,
        }}>{supportingText}</span>
      )}
    </div>
  );
}

window.Field = Field;
window.FieldSelect = FieldSelect;
