// SelectionControl — Checkbox / Radio / Switch
// Maps to Figma "Selection Control" (node 3001:4216)
// Variants: type × state × selected

// ─── Checkbox ────────────────────────────────────────────────────────────────
function Checkbox({ checked = false, disabled = false, onChange, style = {}, ...rest }) {
  return (
    <button
      role="checkbox"
      aria-checked={checked}
      disabled={disabled}
      onClick={disabled ? undefined : onChange}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 24,
        height: 24,
        padding: 2,
        background: "transparent",
        border: "none",
        borderRadius: 0,
        boxSizing: "border-box",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.38 : 1,
        flexShrink: 0,
        transition: "opacity 120ms linear",
        ...style,
      }}
      {...rest}
    >
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: 5,
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "background 150ms ease, border-color 150ms ease",
          ...(checked
            ? { background: "var(--sys-primary)", border: "none" }
            : { border: "1.25px solid var(--sys-outline)", background: "transparent" }),
        }}
      >
        {checked && (
          <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
            <path
              d="M1.5 5L4.5 8.5L11.5 1.5"
              stroke="white"
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
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 24,
        height: 24,
        padding: 1,
        background: "transparent",
        border: "none",
        boxSizing: "border-box",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.38 : 1,
        flexShrink: 0,
        transition: "opacity 120ms linear",
        ...style,
      }}
      {...rest}
    >
      <div
        style={{
          width: 22,
          height: 22,
          borderRadius: 999,
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "background 150ms ease, border-color 150ms ease",
          ...(checked
            ? { background: "var(--sys-primary)", border: "none" }
            : { border: "1.5px solid var(--sys-on-surface-variant)", background: "transparent" }),
        }}
      >
        {checked && (
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "var(--sys-on-primary)",
              flexShrink: 0,
            }}
          />
        )}
      </div>
    </button>
  );
}

// ─── Switch ──────────────────────────────────────────────────────────────────
function Switch({ checked = false, disabled = false, onChange, style = {}, ...rest }) {
  const trackBase = {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    width: 52,
    height: 32,
    borderRadius: 999,
    boxSizing: "border-box",
    flexShrink: 0,
    transition: "background 150ms ease, border-color 150ms ease",
  };

  const trackStyles = disabled
    ? checked
      ? { ...trackBase, background: "rgba(29,26,36,0.10)", border: "2px solid transparent", justifyContent: "flex-end", padding: "2px 4px" }
      : { ...trackBase, background: "rgba(231,223,244,0.10)", border: "2px solid rgba(29,26,36,0.10)", justifyContent: "flex-start", padding: 4 }
    : checked
      ? { ...trackBase, background: "var(--sys-primary)", border: "2px solid transparent", justifyContent: "flex-end", padding: "2px 4px" }
      : { ...trackBase, background: "var(--sys-surface-container-highest)", border: "2px solid var(--sys-outline)", justifyContent: "flex-start", padding: 4 };

  const thumbSize = checked ? 24 : 16;
  const thumbStyle = {
    width: thumbSize,
    height: thumbSize,
    borderRadius: 999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    transition: "width 150ms ease, height 150ms ease, background 150ms ease",
    background: disabled
      ? checked ? "var(--sys-surface)" : "var(--sys-on-surface-variant)"
      : checked ? "var(--sys-on-primary)" : "var(--sys-outline)",
  };

  return (
    <button
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={disabled ? undefined : onChange}
      style={{
        background: "transparent",
        border: "none",
        padding: 0,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.38 : 1,
        transition: "opacity 120ms linear",
        ...style,
      }}
      {...rest}
    >
      <div style={trackStyles}>
        <div style={thumbStyle}>
          {checked && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M2 6L4.5 8.5L10 3"
                stroke={disabled ? "rgba(29,26,36,0.38)" : "var(--sys-primary)"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </div>
    </button>
  );
}

window.Checkbox = Checkbox;
window.Radio = Radio;
window.Switch = Switch;
