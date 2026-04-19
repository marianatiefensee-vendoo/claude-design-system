// Inventory — grid of listings with marketplace indicators.
function Inventory({ onOpen, onCreate }) {
  const [tab, setTab] = React.useState("active");
  const listings = window.SAMPLE_LISTINGS.filter(l =>
    tab === "all" ? true : l.status.toLowerCase() === tab
  );

  return (
    <div style={{ padding: "16px 16px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Ask AI bar */}
      <div style={{
        background: "var(--sys-surface-container-high)",
        border: "1px solid var(--sys-outline)",
        borderRadius: 4,
        padding: "10px 14px",
        display: "flex", alignItems: "center", gap: 10,
      }}>
        <Icon name="sparkle" size={20} color="var(--sys-primary)" />
        <span style={{
          flex: 1,
          font: "300 15px/22px var(--font-sans)", letterSpacing: "0.5px",
          color: "var(--sys-on-surface-variant)",
        }}>Ask AI about your inventory</span>
        <IconButton icon="search" size={36} />
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 0, borderBottom: "1px solid var(--sys-outline-variant)" }}>
        {[["active","Active"],["draft","Drafts"],["all","All"]].map(([k, lbl]) => {
          const on = tab === k;
          const count = k === "all"
            ? window.SAMPLE_LISTINGS.length
            : window.SAMPLE_LISTINGS.filter(l => l.status.toLowerCase() === k).length;
          return (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, border: "none", background: "transparent", cursor: "pointer",
              padding: "12px 8px",
              color: on ? "var(--sys-primary)" : "var(--sys-on-surface-variant)",
              font: "500 14px/20px var(--font-sans)", letterSpacing: "0.1px",
              borderBottom: on ? "2px solid var(--sys-primary)" : "2px solid transparent",
              marginBottom: -1,
            }}>{lbl} <span style={{ opacity: 0.6 }}>·&nbsp;{count}</span></button>
          );
        })}
      </div>

      {/* Listings */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {listings.map(l => (
          <ListingRow key={l.id} listing={l} onOpen={() => onOpen?.(l)} />
        ))}
        {listings.length === 0 && (
          <div style={{
            padding: "40px 20px",
            textAlign: "center",
            border: "1px dashed var(--sys-outline-variant)",
            borderRadius: 12,
            color: "var(--sys-on-surface-variant)",
            font: "400 14px/20px var(--font-sans)",
          }}>
            No drafts yet. Start a listing to see it here.
            <div style={{ marginTop: 12 }}>
              <Button variant="tonal" size="sm" icon="plus" onClick={onCreate}>Create a listing</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ListingRow({ listing, onOpen }) {
  const mps = window.MARKETPLACES.filter(m => listing.markets.includes(m.id));
  return (
    <div onClick={onOpen} style={{
      display: "flex", gap: 12,
      padding: 12,
      border: "1px solid var(--sys-outline-variant)",
      borderRadius: 12,
      background: "var(--sys-surface)",
      cursor: "pointer",
      transition: "border-color 120ms linear, background-color 120ms linear",
    }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--sys-primary)"; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--sys-outline-variant)"; }}
    >
      <div style={{
        width: 72, height: 72, flex: "none", borderRadius: 8,
        background: listing.photo,
      }} />
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{
          font: "500 14px/20px var(--font-sans)", letterSpacing: "0.1px",
          color: "var(--sys-on-surface)",
          overflow: "hidden", textOverflow: "ellipsis",
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
        }}>{listing.title}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{
            font: "600 14px/20px var(--font-sans)", color: "var(--sys-on-surface)",
          }}>${listing.price}</span>
          <StatusPill status={listing.status} />
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
          {mps.map(m => (
            <MarketplaceLogo key={m.id} mp={m} size={22} />
          ))}
          {mps.length === 0 && (
            <span style={{
              font: "400 12px/16px var(--font-sans)", letterSpacing: "0.4px",
              color: "var(--sys-on-surface-variant)",
            }}>Not crosslisted yet</span>
          )}
        </div>
      </div>
    </div>
  );
}

function StatusPill({ status }) {
  const map = {
    Active: { bg: "var(--sys-primary-container)", fg: "var(--sys-primary)" },
    Draft:  { bg: "var(--sys-surface-container-high)", fg: "var(--sys-on-surface-variant)" },
  };
  const s = map[status] || map.Draft;
  return (
    <span style={{
      font: "500 11px/16px var(--font-sans)", letterSpacing: "0.5px", textTransform: "uppercase",
      padding: "2px 8px", borderRadius: 999, background: s.bg, color: s.fg,
    }}>{status}</span>
  );
}

window.Inventory = Inventory;
