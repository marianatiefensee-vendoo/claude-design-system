// IconButton — Standard / Tonal / Primary / Outline  ×  Standard (48px) / Large (56px)
// Figma node: 1227:5422 (Icon Button frame, inside Buttons section 3001:4214)
//
// @prop icon     {string}                          Icon sprite name
// @prop type     {"standard"|"tonal"|"primary"|"outline"}  default "standard"
// @prop size     {"standard"|"large"}              default "standard" (48px hit, 40px visual)
// @prop disabled {boolean}
// @prop onClick  {function}
// @prop title    {string}                          Tooltip / aria label
// @prop style    {object}                          Outer button overrides

function IconButton({
  icon,
  type = "standard",
  size = "standard",
  disabled = false,
  onClick,
  title,
  style = {},
  ...rest
}) {
  const isLarge = size === "large";
  // Standard: 48px touch target, 40px visual; Large: 56px both
  const outerDim = isLarge ? 56 : 48;
  const innerDim = isLarge ? 56 : 40;

  const typeMap = {
    standard: {
      bg: "transparent",
      color: "var(--sys-on-surface-variant)",
      border: "none",
      hoverBg: "rgba(29,26,36,0.08)",
    },
    tonal: {
      bg: "var(--sys-secondary-container)",
      color: "var(--sys-on-secondary-container)",
      border: "none",
      hoverBg: null,
    },
    primary: {
      bg: "var(--sys-primary)",
      color: "#fff",
      border: "none",
      hoverBg: null,
    },
    outline: {
      bg: "transparent",
      color: "var(--sys-on-surface-variant)",
      border: "1px solid var(--sys-outline-variant)",
      hoverBg: "rgba(29,26,36,0.08)",
    },
  };

  const t = typeMap[type] ?? typeMap.standard;

  return (
    <button
      onClick={disabled ? undefined : onClick}
      title={title}
      style={{
        width: outerDim,
        height: outerDim,
        background: "transparent",
        border: "none",
        padding: 0,
        cursor: disabled ? "not-allowed" : "pointer",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!disabled && t.hoverBg) {
          e.currentTarget.firstChild.style.background = t.hoverBg;
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && t.hoverBg) {
          e.currentTarget.firstChild.style.background = t.bg;
        }
      }}
      {...rest}
    >
      <span
        style={{
          width: innerDim,
          height: innerDim,
          borderRadius: 4,
          background: t.bg,
          color: t.color,
          border: t.border,
          boxSizing: "border-box",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: disabled ? 0.38 : 1,
          transition: "background-color 120ms linear",
          pointerEvents: "none",
        }}
      >
        <Icon name={icon} size={24} />
      </span>
    </button>
  );
}

window.IconButton = IconButton;
