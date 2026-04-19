// Fields — Input, Textarea, Price, MarketplaceChip
function Label({ children, aiTag }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 8,
      font: "500 14px/20px var(--font-sans)", letterSpacing: "0.1px",
      color: "var(--sys-on-surface-variant)",
    }}>
      <span>{children}</span>
      {aiTag && (
        <span style={{
          display: "inline-flex", alignItems: "center", gap: 4,
          font: "500 11px/16px var(--font-sans)", letterSpacing: "0.5px",
          textTransform: "uppercase",
          color: "var(--sys-primary)", background: "var(--sys-primary-container)",
          padding: "2px 8px", borderRadius: 999,
        }}>
          <Icon name="sparkle" size={12} /> AI generated
        </span>
      )}
    </div>
  );
}

function Helper({ children, error }) {
  return (
    <div style={{
      font: "400 12px/16px var(--font-sans)", letterSpacing: "0.4px",
      color: error ? "var(--sys-error)" : "var(--sys-on-surface-variant)",
    }}>{children}</div>
  );
}

function Input({ label, aiTag, value, onChange, placeholder, helper, error, onRewrite }) {
  const [focused, setFocused] = React.useState(false);
  const border = error
    ? "2px solid var(--sys-error)"
    : focused ? "2px solid var(--sys-primary)" : "1px solid var(--sys-outline)";
  const pad = (error || focused) ? "13px 15px" : "14px 16px";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {label && <Label aiTag={aiTag}>{label}</Label>}
      <div style={{
        border, borderRadius: 4, padding: pad, display: "flex", alignItems: "center", gap: 8,
        background: "var(--sys-surface)",
      }}>
        <input
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex: 1, border: "none", outline: "none", background: "transparent",
            font: "400 16px/24px var(--font-sans)", letterSpacing: "0.5px",
            color: "var(--sys-on-surface)",
          }}
        />
        {onRewrite && (
          <button onClick={onRewrite} style={{
            display: "inline-flex", alignItems: "center", gap: 4,
            border: "none", background: "transparent",
            color: "var(--sys-primary)", cursor: "pointer",
            font: "500 13px/18px var(--font-sans)", letterSpacing: "0.1px",
          }}>
            <Icon name="rewrite_ai" size={14} /> Rewrite
          </button>
        )}
      </div>
      {helper && <Helper error={error}>{helper}</Helper>}
    </div>
  );
}

function Textarea({ label, aiTag, value, onChange, placeholder, helper, rows = 5, onRewrite }) {
  const [focused, setFocused] = React.useState(false);
  const border = focused ? "2px solid var(--sys-primary)" : "1px solid var(--sys-outline)";
  const pad = focused ? "11px 15px" : "12px 16px";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {label && <Label aiTag={aiTag}>{label}</Label>}
      <div style={{
        border, borderRadius: 4, padding: pad, background: "var(--sys-surface)",
        display: "flex", flexDirection: "column", gap: 8,
      }}>
        <textarea
          rows={rows}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            border: "none", outline: "none", background: "transparent", resize: "vertical",
            font: "400 16px/24px var(--font-sans)", letterSpacing: "0.5px",
            color: "var(--sys-on-surface)",
          }}
        />
        {onRewrite && (
          <button onClick={onRewrite} style={{
            alignSelf: "flex-start",
            display: "inline-flex", alignItems: "center", gap: 4,
            border: "none", background: "transparent", padding: 0,
            color: "var(--sys-primary)", cursor: "pointer",
            font: "500 13px/18px var(--font-sans)", letterSpacing: "0.1px",
          }}>
            <Icon name="rewrite_ai" size={14} /> Rewrite with AI
          </button>
        )}
      </div>
      {helper && <Helper>{helper}</Helper>}
    </div>
  );
}

function PriceField({ label, value, onChange, helper, error }) {
  const [focused, setFocused] = React.useState(false);
  const border = error
    ? "2px solid var(--sys-error)"
    : focused ? "2px solid var(--sys-primary)" : "1px solid var(--sys-outline)";
  const pad = (error || focused) ? "13px 15px" : "14px 16px";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {label && <Label>{label}</Label>}
      <div style={{
        border, borderRadius: 4, padding: pad, display: "flex", alignItems: "center", gap: 8,
        background: "var(--sys-surface)",
      }}>
        <span style={{ color: "var(--sys-on-surface-variant)", font: "400 16px/24px var(--font-sans)" }}>$</span>
        <input
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="0.00"
          style={{
            flex: 1, border: "none", outline: "none", background: "transparent",
            font: "400 16px/24px var(--font-sans)", letterSpacing: "0.5px",
            color: "var(--sys-on-surface)",
          }}
        />
      </div>
      {helper && <Helper error={error}>{helper}</Helper>}
    </div>
  );
}

function MarketplaceLogo({ mp, size = 24, ring = true }) {
  return (
    <span style={{
      width: size, height: size, flex: "none",
      borderRadius: Math.max(6, Math.round(size * 0.22)),
      background: mp.bg || "var(--sys-surface-container-high)",
      border: ring ? "1px solid rgba(0,0,0,0.06)" : "none",
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      overflow: "hidden",
    }}>
      <img src={mp.logo} alt={mp.name} style={{
        width: "78%", height: "78%", objectFit: "contain",
      }} />
    </span>
  );
}

function MarketplaceChip({ mp, selected, onClick }) {
  return (
    <button onClick={onClick} style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      padding: "6px 12px 6px 6px", borderRadius: 999,
      background: selected ? "var(--sys-primary-container)" : "var(--sys-surface)",
      border: `1px solid ${selected ? "var(--sys-primary)" : "var(--sys-outline)"}`,
      color: selected ? "var(--sys-on-primary-container)" : "var(--sys-on-surface-variant)",
      cursor: "pointer",
      font: "500 13px/18px var(--font-sans)", letterSpacing: "0.1px",
      transition: "background-color 120ms linear, border-color 120ms linear",
    }}>
      <MarketplaceLogo mp={mp} size={24} ring={false} />
      {mp.name}
      {selected && (
        <span style={{
          width: 16, height: 16, borderRadius: 999,
          background: "var(--sys-primary)", color: "#fff",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          fontSize: 10, fontWeight: 700, marginLeft: 2,
        }}>✓</span>
      )}
    </button>
  );
}

window.Input = Input;
window.Textarea = Textarea;
window.PriceField = PriceField;
window.MarketplaceChip = MarketplaceChip;
window.MarketplaceLogo = MarketplaceLogo;
window.Label = Label;
window.Helper = Helper;
