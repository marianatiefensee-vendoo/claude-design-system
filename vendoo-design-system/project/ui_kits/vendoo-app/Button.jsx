// Button — Filled / Tonal / Outline / Text (standalone IconButton → IconButton.jsx)
// Radius 4px, padding scale matching Go Flow Fields frame
function Button({
  variant = "filled",
  size = "md",
  icon,
  trailingIcon,
  disabled,
  children,
  onClick,
  style = {},
  ...rest
}) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 4,
    border: "none",
    cursor: disabled ? "not-allowed" : "pointer",
    fontFamily: "var(--font-sans)",
    fontWeight: 500,
    letterSpacing: "0.1px",
    transition: "background-color 120ms linear, opacity 120ms linear",
    whiteSpace: "nowrap",
  };
  const sizes = {
    sm: { padding: "8px 14px", fontSize: 13, lineHeight: "18px" },
    md: { padding: "12px 20px", fontSize: 14, lineHeight: "20px" },
    lg: { padding: "16px 24px", fontSize: 16, lineHeight: "24px" },
  };
  const variants = {
    filled: { background: "var(--sys-primary)", color: "#fff" },
    tonal:  { background: "var(--sys-secondary-container)", color: "var(--sys-on-secondary-container)" },
    outline:{ background: "transparent", color: "var(--sys-primary)", border: "1px solid var(--sys-outline)" },
    text:   { background: "transparent", color: "var(--sys-primary)" },
    danger: { background: "var(--sys-error)", color: "#fff" },
  };
  const disabledStyle = disabled
    ? { background: "rgba(29,26,36,0.12)", color: "rgba(29,26,36,0.38)", cursor: "not-allowed" }
    : {};

  return (
    <button
      onClick={disabled ? undefined : onClick}
      style={{ ...base, ...sizes[size], ...variants[variant], ...disabledStyle, ...style }}
      {...rest}
    >
      {icon && <Icon name={icon} size={size === "sm" ? 16 : 18} />}
      {children}
      {trailingIcon && <Icon name={trailingIcon} size={size === "sm" ? 16 : 18} />}
    </button>
  );
}

window.Button = Button;
