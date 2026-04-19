// Vendoo icon — <use href="../../assets/icons.svg#name"/>
// 116 icons, single 24×24 outline set. Colors inherit via `currentColor`.
function Icon({ name, size = 24, color = "currentColor", style = {}, spritePath = "../../assets/icons.svg" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      style={{ color, flex: "none", display: "inline-block", verticalAlign: "middle", ...style }}
    >
      <use href={`${spritePath}#${name}`} />
    </svg>
  );
}
window.Icon = Icon;
