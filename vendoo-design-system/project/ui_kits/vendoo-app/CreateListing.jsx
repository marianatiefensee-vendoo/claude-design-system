// CreateListing — multi-step listing flow with expandable section cards
function CreateListing({ markets: marketsProp, setMarkets: setMarketsProp }) {
  const [open, setOpen] = React.useState("details");
  const [title, setTitle] = React.useState("Vintage 90s Knit Sweater — Pastel Purple");
  const [desc, setDesc]   = React.useState("Soft pastel purple knit sweater with a vintage 90s look. Wool blend, great condition, size medium. Cozy everyday layer for fall and winter.");
  const [price, setPrice] = React.useState("48");
  const [marketsLocal, setMarketsLocal] = React.useState(["poshmark", "ebay", "mercari"]);
  const markets = marketsProp ?? marketsLocal;
  const setMarkets = setMarketsProp ?? setMarketsLocal;

  const toggle = (id) => setOpen(open === id ? null : id);
  const toggleMp = (id) => setMarkets(m => m.includes(id) ? m.filter(x => x !== id) : [...m, id]);

  const priceError = !price || Number(price) <= 0;

  return (
    <div style={{ padding: "16px 16px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
      {/* Progress strip */}
      <div style={{
        display: "flex", alignItems: "center", gap: 6,
        font: "500 12px/16px var(--font-sans)", letterSpacing: "0.5px",
        color: "var(--sys-on-surface-variant)", textTransform: "uppercase",
      }}>
        <span style={{ color: "var(--sys-primary)" }}>Step 2 of 5</span>
        <span>·</span>
        <span>Applies to all marketplaces</span>
      </div>

      {/* Photos */}
      <ListingSectionCard
        step={1}
        title="Photos"
        subtitle="Up to 12 photos · first photo is the cover"
        state={open === "photos" ? "expanded" : "done"}
        onToggle={() => toggle("photos")}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
          {[
            "linear-gradient(135deg,#E8DDFF 0%,#C3B0FF 100%)",
            "linear-gradient(135deg,#C3B0FF 0%,#9747FF 100%)",
            "linear-gradient(135deg,#FECB40 0%,#F7507C 100%)",
          ].map((bg, i) => (
            <div key={i} style={{
              aspectRatio: "1 / 1", borderRadius: 8, background: bg,
              position: "relative",
            }}>
              {i === 0 && <span style={{
                position: "absolute", left: 6, top: 6,
                font: "500 10px/14px var(--font-sans)", letterSpacing: "0.5px",
                textTransform: "uppercase",
                background: "var(--sys-primary)", color: "#fff",
                padding: "2px 6px", borderRadius: 999,
              }}>Cover</span>}
            </div>
          ))}
          <button style={{
            aspectRatio: "1 / 1", borderRadius: 8,
            border: "1px dashed var(--sys-outline)", background: "transparent",
            color: "var(--sys-primary)", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Icon name="plus" size={24} />
          </button>
        </div>
      </ListingSectionCard>

      {/* Title & Description */}
      <ListingSectionCard
        step={2}
        title="Title & Description"
        subtitle="Applies to all marketplaces"
        state={open === "details" ? "expanded" : "todo"}
        onToggle={() => toggle("details")}
      >
        <Input
          label="Title"
          aiTag
          value={title}
          onChange={setTitle}
          helper="Up to 100 characters. Include brand and item type."
          onRewrite={() => alert("AI would rewrite the title here.")}
        />
        <Textarea
          label="Description"
          aiTag
          value={desc}
          onChange={setDesc}
          rows={5}
          helper="Describe condition, fit, and what makes it special."
          onRewrite={() => alert("AI would rewrite the description here.")}
        />
      </ListingSectionCard>

      {/* Price */}
      <ListingSectionCard
        step={3}
        title="Price"
        subtitle="Set once · override per marketplace later"
        state={open === "price" ? "expanded" : "todo"}
        onToggle={() => toggle("price")}
      >
        <PriceField
          label="Listing price"
          value={price}
          onChange={setPrice}
          helper={priceError ? "Add a price to publish to Poshmark." : "You can set marketplace overrides after crosslisting."}
          error={priceError}
        />
      </ListingSectionCard>

      {/* Marketplaces */}
      <ListingSectionCard
        step={4}
        title="Marketplaces"
        subtitle={`${markets.length} selected`}
        state={open === "markets" ? "expanded" : "todo"}
        onToggle={() => toggle("markets")}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {window.MARKETPLACES.map(mp => (
            <MarketplaceChip
              key={mp.id}
              mp={mp}
              selected={markets.includes(mp.id)}
              onClick={() => toggleMp(mp.id)}
            />
          ))}
        </div>
      </ListingSectionCard>
    </div>
  );
}

window.CreateListing = CreateListing;
