/**
 * Field — text input field (Go Flow Design System)
 * Figma node: 1243:5664 (Field frame) within section 3001:4217
 * @param {'enabled'|'focused'|'filled'|'error'|'disabled'} props.state
 * @param {string}   props.label           — label text above the input
 * @param {string}   props.value           — controlled input value
 * @param {string}   props.placeholder     — placeholder text
 * @param {string}   props.supportingText  — helper/error text below the input
 * @param {Function} props.onChange        — (value: string) => void
 * @param {Function} props.onClear         — called when trailing clear icon is clicked
 * @param {object}   props.style           — style overrides on the root wrapper
 */
function Field({
  state = "enabled",
  label = "Label",
  value = "",
  placeholder = "",
  supportingText,
  onChange,
  onClear,
  style = {},
  ...rest
}) {
  const isDisabled = state === "disabled";
  const isError    = state === "error";
  const isFocused  = state === "focused";
  const isFilled   = state === "filled";
  const showTrailingClear = isFilled || isError;

  const borderColor = isError
    ? "#ba2644"
    : isFocused || isFilled
    ? "var(--sys-primary)"
    : "var(--sys-outline)";

  const wrapper = {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    width: "100%",
    opacity: isDisabled ? 0.38 : 1,
  };

  const labelStyle = {
    fontFamily: "var(--font-sans)",
    fontWeight: 500,
    fontSize: 16,
    lineHeight: "24px",
    letterSpacing: "0.15px",
    color: isError ? "#ba2644" : "var(--sys-on-surface-variant)",
    whiteSpace: "nowrap",
  };

  const inputBox = {
    display: "flex",
    alignItems: "center",
    height: 56,
    border: `1px solid ${borderColor}`,
    borderRadius: 4,
    paddingLeft: 16,
    paddingRight: showTrailingClear ? 4 : 16,
    paddingTop: 4,
    paddingBottom: 4,
    boxSizing: "border-box",
    background: "transparent",
    transition: "border-color 150ms var(--sys-easing-standard)",
  };

  const inputStyle = {
    flex: "1 0 0",
    minWidth: 0,
    border: "none",
    outline: "none",
    background: "transparent",
    fontFamily: "var(--font-sans)",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: "24px",
    letterSpacing: "0.5px",
    color: "var(--sys-on-surface)",
    cursor: isDisabled ? "not-allowed" : "text",
  };

  const clearButton = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    width: 40,
    height: 40,
    border: "none",
    borderRadius: 999,
    background: "transparent",
    color: "var(--sys-on-surface-variant)",
    cursor: "pointer",
    transition: "background-color 120ms linear",
  };

  const supportingStyle = {
    fontFamily: "var(--font-sans)",
    fontWeight: 400,
    fontSize: 11,
    lineHeight: "14px",
    letterSpacing: "0px",
    color: isError ? "#ba2644" : "var(--sys-on-surface-variant)",
    paddingLeft: 16,
    paddingTop: 4,
  };

  return (
    <div style={{ ...wrapper, ...style }}>
      {label && <span style={labelStyle}>{label}</span>}
      <div style={inputBox}>
        <input
          style={inputStyle}
          value={value}
          placeholder={placeholder}
          disabled={isDisabled}
          onChange={isDisabled ? undefined : (e) => onChange?.(e.target.value)}
          {...rest}
        />
        {showTrailingClear && (
          <button
            type="button"
            onClick={onClear}
            style={clearButton}
            aria-label="Clear"
            onMouseEnter={(e) => e.currentTarget.style.background = "var(--state-onSurface-08)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"
                fill="currentColor"
              />
            </svg>
          </button>
        )}
      </div>
      {supportingText && <span style={supportingStyle}>{supportingText}</span>}
    </div>
  );
}

window.Field = Field;
