/**
 * Tag, StyleTag, AssistiveChip
 *
 * Tag         — Figma node 555:30509 (chips frame), static status indicator
 *   props: type="default"|"ai", label (string)
 *
 * StyleTag    — applied style chip, 22h, primary-container fill
 *   props: label (string), removable=false, disabled=false, onRemove (fn)
 *
 * AssistiveChip — single-action chip, 32h, no background at rest
 *   props: icon (string), label (string), onClick (fn)
 */

const { useState } = React;

// ─── Tag ────────────────────────────────────────────────────────────────────

function Tag({ type = 'default', label }) {
  const isAI = type === 'ai';

  const containerStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    height: '20px',
    padding: '0 8px',
    boxSizing: 'border-box',
    borderRadius: '8px',
    font: '400 11px/14px var(--font-sans)',
    background: isAI ? 'var(--sys-primary-fixed)' : 'var(--ref-neutral-70)',
    color: isAI ? 'var(--sys-on-primary-fixed)' : 'var(--sys-on-primary)',
  };

  const iconColor = isAI ? 'var(--sys-on-primary-fixed)' : 'var(--sys-on-primary)';

  return (
    <span style={containerStyle}>
      <Icon name="sparkle" size={12} color={iconColor} />
      {label}
    </span>
  );
}

// ─── StyleTag ───────────────────────────────────────────────────────────────

function StyleTag({ label, removable = false, disabled = false, onRemove }) {
  const containerStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    height: '22px',
    padding: '4px 8px',
    boxSizing: 'border-box',
    borderRadius: '8px',
    font: '400 11px/14px var(--font-sans)',
    background: disabled
      ? 'color-mix(in srgb, var(--sys-on-surface) 12%, transparent)'
      : 'var(--sys-secondary-container)',
    color: disabled
      ? 'color-mix(in srgb, var(--sys-on-surface) 38%, transparent)'
      : 'var(--sys-on-secondary-container)',
    cursor: disabled ? 'not-allowed' : 'default',
  };

  const xButtonStyle = {
    position: 'relative',
    width: '12px',
    height: '12px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    border: '0',
    padding: '0',
    margin: '0',
    cursor: disabled ? 'not-allowed' : 'pointer',
    color: 'inherit',
    flexShrink: 0,
    appearance: 'none',
    WebkitAppearance: 'none',
  };

  const xBarBase = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    width: '10px',
    height: '1.5px',
    borderRadius: '1px',
    background: 'currentColor',
  };

  return (
    <span style={containerStyle}>
      {label}
      {removable && (
        <button
          style={xButtonStyle}
          aria-label={`Remove ${label}`}
          disabled={disabled}
          onClick={disabled ? undefined : onRemove}
        >
          <span style={{ ...xBarBase, transform: 'translate(-50%, -50%) rotate(45deg)' }} />
          <span style={{ ...xBarBase, transform: 'translate(-50%, -50%) rotate(-45deg)' }} />
        </button>
      )}
    </span>
  );
}

// ─── AssistiveChip ──────────────────────────────────────────────────────────

function AssistiveChip({ icon, label, onClick }) {
  const [hovered, setHovered] = useState(false);

  const chipStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    height: '32px',
    padding: '6px 8px',
    boxSizing: 'border-box',
    borderRadius: '8px',
    background: hovered
      ? 'color-mix(in srgb, var(--sys-primary) 8%, transparent)'
      : 'transparent',
    border: '0',
    color: 'var(--sys-primary)',
    font: '500 12px/16px var(--font-sans)',
    letterSpacing: '0.5px',
    cursor: 'pointer',
    transition: 'background 120ms linear',
    appearance: 'none',
    WebkitAppearance: 'none',
  };

  return (
    <button
      style={chipStyle}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Icon name={icon} size={18} color="var(--sys-primary)" />
      {label}
    </button>
  );
}

// ─── Exports ────────────────────────────────────────────────────────────────

window.Tag = Tag;
window.StyleTag = StyleTag;
window.AssistiveChip = AssistiveChip;
