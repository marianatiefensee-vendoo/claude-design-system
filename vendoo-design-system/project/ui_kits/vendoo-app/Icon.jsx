/**
 * Icon — SVG sprite consumer. Figma: Go Flow Design System → node 1188:3323.
 *
 * Renders a single <svg><use href /></svg> pointing at the sprite. Every icon
 * inherits color from currentColor, so pass `color` or set CSS `color` on any
 * ancestor.
 *
 * Sprite path resolution order:
 *   1. spritePath prop (per-instance override)
 *   2. window.VENDOO_ICON_SPRITE (global override — set in HTML before load)
 *   3. default: "../../assets/icons.svg" (relative to the document loading it)
 *
 * Accessibility:
 *   - Default: aria-hidden="true" (decorative — wrappers like IconButton carry the label)
 *   - Pass aria-label → becomes role="img" with the label announced to screen readers
 *   - Pass title → renders a <title> child for native SVG tooltips
 *
 * Dev warning: when window.VENDOO_ICON_NAMES is present, unknown names log once.
 */
const _warnedIconNames = new Set();

function Icon({
  name,
  size = 24,
  color = 'currentColor',
  title,
  spritePath,
  style = {},
  'aria-label': ariaLabel,
  ...rest
}) {
  const resolvedPath =
    spritePath ||
    (typeof window !== 'undefined' && window.VENDOO_ICON_SPRITE) ||
    '../../assets/icons.svg';

  if (
    typeof window !== 'undefined' &&
    window.VENDOO_ICON_NAMES &&
    !window.VENDOO_ICON_NAMES.includes(name) &&
    !_warnedIconNames.has(name)
  ) {
    _warnedIconNames.add(name);
    console.warn(
      `<Icon name="${name}" /> — unknown icon name. ` +
      `See window.VENDOO_ICON_NAMES (${window.VENDOO_ICON_NAMES.length} available).`
    );
  }

  const isDecorative = !ariaLabel;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden={isDecorative ? 'true' : undefined}
      role={isDecorative ? undefined : 'img'}
      aria-label={ariaLabel}
      style={{
        color,
        flex: 'none',
        display: 'inline-block',
        verticalAlign: 'middle',
        ...style,
      }}
      {...rest}
    >
      {title && <title>{title}</title>}
      <use href={`${resolvedPath}#${name}`} />
    </svg>
  );
}

Object.defineProperty(Icon, 'names', {
  get() {
    return (typeof window !== 'undefined' && window.VENDOO_ICON_NAMES) || [];
  },
});

window.Icon = Icon;
