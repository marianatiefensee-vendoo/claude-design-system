const { useState, useEffect, useRef } = React;

/**
 * ListingFormScreen — Phase 3 of lazy item creation (item details form)
 * Figma ref: 167:10437 (Smart Listing Preview — details step)
 *
 * Reads from and writes to draft.generalDetails via onUpdateGeneralDetails.
 * No API calls here — all changes are local draft mutations.
 * On Next (handled by parent FlowShell footer), parent fires Phase 4 in
 * background and navigates to the Pricing step.
 *
 * @prop {Object}   draft                  — full EMPTY_DRAFT shape
 * @prop {Function} onUpdateGeneralDetails — (Partial<generalDetails>) => void
 */
function ListingFormScreen({ draft, onUpdateGeneralDetails }) {
  const details = draft.generalDetails;
  const [focused, setFocused] = useState(null);

  const fieldState = (name) =>
    focused === name ? 'focused' : details[name] ? 'filled' : 'enabled';

  return (
    <div style={{
      padding: '20px 16px 40px',
      display: 'flex', flexDirection: 'column', gap: 20,
    }}>

      {/* Header */}
      <div>
        <h2 style={{
          fontFamily: 'var(--font-sans)', fontSize: 20, fontWeight: 500,
          lineHeight: '28px', letterSpacing: '0.15px',
          color: 'var(--sys-on-surface)', margin: '0 0 4px',
        }}>
          Tell us about your item
        </h2>
        <p style={{
          fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 400,
          lineHeight: '20px', letterSpacing: '0.25px',
          color: 'var(--sys-on-surface-variant)', margin: 0,
        }}>
          We'll use this to fill out your listings automatically.
        </p>
      </div>

      {/* Category */}
      <DropdownSelect
        label="Category"
        value={details.category}
        placeholder="Select a category"
        options={CATEGORIES}
        onChange={(v) => onUpdateGeneralDetails({ category: v })}
      />

      {/* Condition */}
      <DropdownSelect
        label="Condition"
        value={details.condition}
        placeholder="Select condition"
        options={CONDITIONS}
        onChange={(v) => onUpdateGeneralDetails({ condition: v })}
      />

      {/* Brand */}
      <Field
        label="Brand"
        value={details.brand}
        placeholder="e.g. Nike, Zara, Levi's"
        state={fieldState('brand')}
        onFocus={() => setFocused('brand')}
        onBlur={() => setFocused(null)}
        onChange={(v) => onUpdateGeneralDetails({ brand: v })}
      />

      {/* Model */}
      <Field
        label="Model / Style"
        value={details.model}
        placeholder="e.g. Air Force 1, Mom Jeans"
        state={fieldState('model')}
        onFocus={() => setFocused('model')}
        onBlur={() => setFocused(null)}
        onChange={(v) => onUpdateGeneralDetails({ model: v })}
      />

      {/* Color */}
      <Field
        label="Color"
        value={details.color}
        placeholder="e.g. Navy Blue"
        state={fieldState('color')}
        onFocus={() => setFocused('color')}
        onBlur={() => setFocused(null)}
        onChange={(v) => onUpdateGeneralDetails({ color: v })}
      />

      {/* Size */}
      <Field
        label="Size"
        value={details.size}
        placeholder="e.g. M, 8, 32×30"
        state={fieldState('size')}
        onFocus={() => setFocused('size')}
        onBlur={() => setFocused(null)}
        onChange={(v) => onUpdateGeneralDetails({ size: v })}
      />

    </div>
  );
}

// ── Static option lists ────────────────────────────────────────────────────────

const CATEGORIES = [
  "Women's Clothing",
  "Men's Clothing",
  "Shoes",
  "Accessories",
  "Bags & Handbags",
  "Jewelry",
  "Kids & Baby",
  "Activewear",
  "Electronics",
  "Home & Garden",
  "Collectibles",
  "Other",
];

const CONDITIONS = [
  { value: 'New with tags',    label: 'New with tags',    icon: 'package_new' },
  { value: 'New without tags', label: 'New without tags', icon: 'package_seal' },
  { value: 'Like new',         label: 'Like new',         icon: 'package_like_new' },
  { value: 'Very good',        label: 'Very good',        icon: 'package_verygood' },
  { value: 'Good',             label: 'Good',             icon: 'package_good' },
  { value: 'Fair',             label: 'Fair',             icon: 'package_fair' },
];

// ── DropdownSelect ─────────────────────────────────────────────────────────────
// Wraps FieldSelect with an inline option panel.

function DropdownSelect({ label, value, placeholder, options, onChange }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      <FieldSelect
        label={label}
        value={value}
        placeholder={placeholder}
        state={open ? 'focused' : value ? 'filled' : 'enabled'}
        onClick={() => setOpen((o) => !o)}
      />
      {open && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 4px)', left: 0, right: 0,
          background: 'var(--sys-surface-container-low)',
          borderRadius: 8,
          border: '1px solid var(--sys-outline-variant)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.14)',
          zIndex: 200,
          overflow: 'hidden',
          maxHeight: 220, overflowY: 'auto',
        }}>
          {options.map((opt) => {
            const optValue    = typeof opt === 'string' ? opt : opt.value;
            const optLabel    = typeof opt === 'string' ? opt : opt.label;
            const optIcon     = typeof opt === 'string' ? null : opt.icon;
            const isSelected  = value === optValue;
            return (
              <button
                key={optValue}
                onClick={() => { onChange(optValue); setOpen(false); }}
                style={{
                  width: '100%',
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '12px 16px',
                  border: 'none',
                  background: isSelected
                    ? 'var(--sys-secondary-container)'
                    : 'transparent',
                  cursor: 'pointer', textAlign: 'left',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 15, fontWeight: isSelected ? 500 : 400,
                  lineHeight: '22px', letterSpacing: '0.25px',
                  color: isSelected
                    ? 'var(--sys-on-secondary-container)'
                    : 'var(--sys-on-surface)',
                  transition: 'background 120ms linear',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) e.currentTarget.style.background = 'rgba(29,26,36,0.08)';
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) e.currentTarget.style.background = 'transparent';
                }}
              >
                {optIcon && (
                  <Icon
                    name={optIcon}
                    size={20}
                    color={isSelected
                      ? 'var(--sys-on-secondary-container)'
                      : 'var(--sys-on-surface-variant)'}
                  />
                )}
                {optLabel}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

window.ListingFormScreen = ListingFormScreen;
