// AppShell — mobile-first frame with top App Bar + bottom nav + FAB
function AppShell({ view, setView, title, trailing, children, stickyFooter }) {
  return (
    <div style={{
      position: "relative",
      width: 420, height: 820,
      borderRadius: 28,
      overflow: "hidden",
      background: "var(--sys-background)",
      boxShadow: "var(--elev-3)",
      display: "flex", flexDirection: "column",
      fontFamily: "var(--font-sans)",
      border: "1px solid var(--sys-outline-variant)",
    }}>
      {/* App Bar */}
      <div style={{
        height: 56, flex: "none", padding: "0 8px 0 16px",
        display: "flex", alignItems: "center", gap: 12,
        borderBottom: "1px solid var(--sys-outline-variant)",
        background: "var(--sys-surface)",
      }}>
        <img src="../../assets/Vendoo-Mark.svg" alt="" style={{ width: 28, height: 28 }} />
        <div style={{
          flex: 1,
          font: "500 18px/24px var(--font-sans)", letterSpacing: "0.15px",
          color: "var(--sys-on-surface)",
        }}>{title}</div>
        {trailing}
        <IconButton icon="bell" title="Notifications" />
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflowY: "auto", position: "relative" }}>
        {children}
      </div>

      {stickyFooter && (
        <div style={{
          flex: "none", padding: "12px 16px",
          borderTop: "1px solid var(--sys-outline-variant)",
          background: "var(--sys-surface)",
          display: "flex", alignItems: "center", gap: 12,
        }}>
          {stickyFooter}
        </div>
      )}

      {/* Bottom nav with centered FAB */}
      <div style={{
        flex: "none", height: 72,
        background: "var(--sys-surface-container)",
        borderTop: "1px solid var(--sys-outline-variant)",
        display: "grid", gridTemplateColumns: "repeat(5, 1fr)", alignItems: "center",
        position: "relative",
      }}>
        <NavItem icon="store"   label="Home"      active={view === "home"}      onClick={() => setView("home")} />
        <NavItem icon="package" label="Inventory" active={view === "inventory"} onClick={() => setView("inventory")} />
        <div style={{
          width: 56, height: 56, borderRadius: 4, justifySelf: "center",
          background: "var(--sys-primary)", color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "var(--elev-3)", cursor: "pointer",
        }} onClick={() => setView("create")} title="Create listing">
          <Icon name="plus" size={28} color="#fff" />
        </div>
        <NavItem icon="live_megaphone" label="Messages" active={view === "messages"} onClick={() => setView("messages")} />
        <NavItem icon="user"    label="Profile"   active={view === "profile"}   onClick={() => setView("profile")} />
      </div>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      border: "none", background: "transparent", cursor: "pointer",
      display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
      color: active ? "var(--sys-secondary)" : "var(--sys-on-surface-variant)",
      font: "500 12px/16px var(--font-sans)", letterSpacing: "0.5px",
    }}>
      <span style={{
        width: 64, height: 32, borderRadius: 16,
        background: active ? "var(--sys-secondary-container)" : "transparent",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
      }}>
        <Icon name={icon} size={24} color="var(--sys-on-surface)" />
      </span>
      {label}
    </button>
  );
}

window.AppShell = AppShell;
