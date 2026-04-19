// Numbered, expandable section card — core building block of the listing flow.
// Mirrors /05-Product-patterns/Listing-Section-Card in the Figma.
function ListingSectionCard({ step, title, subtitle, state = "expanded", onToggle, children }) {
  const expanded = state === "expanded";
  const active = expanded; // active when expanded
  const stepBadge = (done) => (
    <span style={{
      width: 32, height: 32, borderRadius: 999, flex: "none",
      background: done ? "var(--sys-primary)" : "var(--sys-surface-container-high)",
      color: done ? "#fff" : "var(--sys-on-surface-variant)",
      font: "700 14px/32px var(--font-sans)", textAlign: "center",
    }}>{state === "done" ? "✓" : step}</span>
  );

  return (
    <div style={{
      borderRadius: 12,
      border: active ? "1px solid var(--sys-primary)" : "1px solid var(--sys-outline-variant)",
      overflow: "hidden",
      background: active ? "var(--sys-primary-container)" : "var(--sys-surface)",
      transition: "border-color 150ms ease-out",
    }}>
      <div style={{
        background: active ? "#F5EEFC" : "var(--sys-surface)",
        borderBottom: active ? "1px solid var(--sys-outline-variant)" : "none",
        padding: "16px 20px",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
        cursor: "pointer",
      }} onClick={onToggle}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
          {stepBadge(state === "done")}
          <div style={{ minWidth: 0 }}>
            <div style={{
              font: "500 16px/24px var(--font-sans)", letterSpacing: "0.15px",
              color: "var(--sys-on-surface)",
            }}>{title}</div>
            {subtitle && <div style={{
              font: "400 13px/18px var(--font-sans)", letterSpacing: "0.25px",
              color: "var(--sys-on-surface-variant)", marginTop: 2,
            }}>{subtitle}</div>}
          </div>
        </div>
        <Icon name={expanded ? "chevron_up" : "chevron_down"} size={22} color="var(--sys-on-surface-variant)" />
      </div>
      {expanded && (
        <div style={{
          background: "var(--sys-surface)",
          padding: "18px 20px",
          display: "flex", flexDirection: "column", gap: 16,
        }}>
          {children}
        </div>
      )}
    </div>
  );
}

window.ListingSectionCard = ListingSectionCard;
