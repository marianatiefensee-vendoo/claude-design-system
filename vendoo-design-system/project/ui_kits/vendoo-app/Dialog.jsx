const { useState, useEffect, useRef } = React;

// Inject dialog animation keyframes once per page (same pattern as vendoo-button-spin)
if (typeof document !== 'undefined' && !document.getElementById('vendoo-dialog-anim')) {
  const el = document.createElement('style');
  el.id = 'vendoo-dialog-anim';
  el.textContent = `
    @keyframes vendoo-backdrop-in  { from { opacity: 0 } to { opacity: 1 } }
    @keyframes vendoo-backdrop-out { from { opacity: 1 } to { opacity: 0 } }
    @keyframes vendoo-surface-in   { from { opacity: 0; transform: scale(0.96) } to { opacity: 1; transform: scale(1) } }
    @keyframes vendoo-surface-out  { from { opacity: 1; transform: scale(1)    } to { opacity: 0; transform: scale(0.96) } }
  `;
  document.head.appendChild(el);
}

/**
 * Dialog — Go Flow Design System (Pass 1)
 *
 * @prop {boolean}    open
 * @prop {Function}   onClose                           — called on Esc, backdrop click, or close button
 * @prop {string}     [title]                           — rendered as headline-sm above children
 * @prop {ReactNode}  children
 * @prop {{ label: string, onClick: Function, loading?: boolean, disabled?: boolean }} [primaryAction]
 * @prop {{ label: string, onClick: Function }}                                        [secondaryAction]
 *
 * Tokens: --radius-alias-dialog (12px) · --size-alias-dialog-min-width-compact (320px)
 *         --sys-shadow-level3 · --sys-surface-container-lowest · --sys-on-surface
 *         --sys-on-surface-variant · --sys-scrim (rgba 0,0,0 at 40% opacity)
 */
function Dialog({
  open,
  onClose,
  title,
  children,
  primaryAction,
  secondaryAction,
}) {
  const [mounted, setMounted]   = useState(false);
  const [exiting, setExiting]   = useState(false);
  const dialogRef               = useRef(null);
  const prevFocusRef            = useRef(null);
  const onCloseRef              = useRef(onClose);
  const ANIM_MS                 = 150;

  // Keep onClose ref current so the keydown handler never goes stale
  useEffect(() => { onCloseRef.current = onClose; }, [onClose]);

  // Mount/unmount lifecycle with exit animation
  useEffect(() => {
    if (open) {
      setMounted(true);
      setExiting(false);
    } else if (mounted) {
      setExiting(true);
      const t = setTimeout(() => { setMounted(false); setExiting(false); }, ANIM_MS);
      return () => clearTimeout(t);
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  // Focus trap + Esc key + restore focus on close
  useEffect(() => {
    if (!mounted || exiting) return;

    prevFocusRef.current = document.activeElement;

    const dialog = dialogRef.current;
    if (!dialog) return;

    const SELECTOR = 'button:not([disabled]),[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

    // Move focus into dialog on open
    const first = dialog.querySelector(SELECTOR);
    first?.focus();

    const handleKey = (e) => {
      if (e.key === 'Escape') {
        onCloseRef.current?.();
        return;
      }
      if (e.key === 'Tab') {
        const focusable = Array.from(dialog.querySelectorAll(SELECTOR));
        if (!focusable.length) { e.preventDefault(); return; }
        const head = focusable[0];
        const tail = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === head) { e.preventDefault(); tail.focus(); }
        } else {
          if (document.activeElement === tail) { e.preventDefault(); head.focus(); }
        }
      }
    };

    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('keydown', handleKey);
      prevFocusRef.current?.focus();
    };
  }, [mounted, exiting]);

  if (!mounted) return null;

  const phase       = exiting ? 'out' : 'in';
  const hasActions  = primaryAction || secondaryAction;

  return (
    <div
      onClick={onClose}
      style={{
        position:   'fixed',
        inset:      0,
        zIndex:     1000,
        background: 'rgba(0,0,0,0.40)',
        display:    'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding:    '16px',
        boxSizing:  'border-box',
        animation:  `vendoo-backdrop-${phase} ${ANIM_MS}ms ease-out forwards`,
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'vendoo-dialog-title' : undefined}
        onClick={(e) => e.stopPropagation()}
        style={{
          position:     'relative',
          background:   'var(--sys-surface-container-lowest)',
          borderRadius: 'var(--radius-alias-dialog, 12px)',
          boxShadow:    'var(--sys-shadow-level3)',
          minWidth:     'var(--size-alias-dialog-min-width-compact, 320px)',
          maxWidth:     'min(560px, calc(100vw - 32px))',
          width:        '100%',
          boxSizing:    'border-box',
          animation:    `vendoo-surface-${phase} ${ANIM_MS}ms ease-out forwards`,
        }}
      >
        {/* Close button — 16px from top-right edges per spec */}
        <div style={{ position: 'absolute', top: 16, right: 16 }}>
          <IconButton icon="x" title="Close dialog" onClick={onClose} />
        </div>

        {/* Title — headline-sm: 24/32 weight 400, 64px right padding clears the close button */}
        {title && (
          <div
            id="vendoo-dialog-title"
            style={{
              padding:        '24px 64px 16px 24px',
              fontFamily:     'var(--font-sans)',
              fontWeight:     400,
              fontSize:       24,
              lineHeight:     '32px',
              letterSpacing:  0,
              color:          'var(--sys-on-surface)',
            }}
          >
            {title}
          </div>
        )}

        {/* Body — body-md: 14/20 0.25px */}
        <div
          style={{
            padding:        title
              ? (hasActions ? '0 24px 0'   : '0 24px 24px')
              : (hasActions ? '24px 24px 0' : '24px'),
            fontFamily:     'var(--font-sans)',
            fontWeight:     400,
            fontSize:       14,
            lineHeight:     '20px',
            letterSpacing:  '0.25px',
            color:          'var(--sys-on-surface-variant)',
          }}
        >
          {children}
        </div>

        {/* Action row — right-aligned, gap 8px, padding 16px top · 24px sides · 24px bottom */}
        {hasActions && (
          <div
            style={{
              display:        'flex',
              justifyContent: 'flex-end',
              alignItems:     'center',
              gap:            8,
              padding:        '16px 24px 24px',
            }}
          >
            {secondaryAction && (
              <Button variant="text" onClick={secondaryAction.onClick}>
                {secondaryAction.label}
              </Button>
            )}
            {primaryAction && (
              <Button
                variant="filled"
                loading={primaryAction.loading}
                disabled={primaryAction.disabled}
                onClick={primaryAction.onClick}
              >
                {primaryAction.label}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

window.Dialog = Dialog;
