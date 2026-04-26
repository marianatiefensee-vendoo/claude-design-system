const { useState } = React;

/**
 * CameraScreen — Phase 2 of lazy item creation (photo capture step)
 * Figma ref: 167:10437 (Smart Listing Preview)
 *
 * @prop {string[]}  photos          — draft.photos array (mock color strings as placeholders)
 * @prop {Function}  onUpdatePhotos  — (string[]) => void — updates draft.photos
 */
function CameraScreen({ photos = [], onUpdatePhotos }) {
  const MOCK_COLORS = [
    '#E8D5F5', '#D5E8F5', '#F5E8D5',
    '#D5F5E8', '#F5D5E8', '#E8F5D5',
  ];

  const addPhoto = () => {
    if (photos.length >= 6) return;
    onUpdatePhotos([...photos, MOCK_COLORS[photos.length % MOCK_COLORS.length]]);
  };

  const removePhoto = (idx) => {
    onUpdatePhotos(photos.filter((_, i) => i !== idx));
  };

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      height: '100%', padding: '16px',
      boxSizing: 'border-box', gap: 16,
    }}>

      {/* Main viewfinder */}
      <div
        onClick={photos.length === 0 ? addPhoto : undefined}
        style={{
          flex: 1,
          borderRadius: 16,
          background: photos[0] || 'var(--sys-surface-container)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: 12,
          cursor: photos.length === 0 ? 'pointer' : 'default',
          overflow: 'hidden',
          border: photos.length === 0
            ? '1.5px dashed var(--sys-outline)'
            : '1.5px solid var(--sys-primary)',
          transition: 'border-color 120ms linear',
          position: 'relative',
        }}
      >
        {photos.length > 0 ? (
          <Icon name="image" size={56} color="var(--sys-on-surface-variant)" />
        ) : (
          <>
            <div style={{
              width: 72, height: 72, borderRadius: 36,
              background: 'var(--sys-surface-container-high)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon name="camera" size={36} color="var(--sys-on-surface-variant)" />
            </div>
            <span style={{
              fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 500,
              lineHeight: '24px', color: 'var(--sys-on-surface)',
            }}>
              Add your first photo
            </span>
            <span style={{
              fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 400,
              lineHeight: '20px', letterSpacing: '0.25px',
              color: 'var(--sys-on-surface-variant)',
              textAlign: 'center', maxWidth: 240, padding: '0 16px',
            }}>
              Tap to take a photo or import from your gallery
            </span>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      <div style={{
        display: 'flex', gap: 8, flexShrink: 0,
        overflowX: 'auto', paddingBottom: 2,
      }}>
        {photos.map((color, i) => (
          <div key={i} style={{
            position: 'relative', flexShrink: 0,
            width: 72, height: 72, borderRadius: 8,
            background: color,
            border: '2px solid var(--sys-primary)',
            overflow: 'hidden',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon name="image" size={28} color="var(--sys-on-surface-variant)" />
            <button
              onClick={() => removePhoto(i)}
              aria-label="Remove photo"
              style={{
                position: 'absolute', top: 4, right: 4,
                width: 20, height: 20, borderRadius: 10,
                background: 'rgba(0,0,0,0.55)',
                border: 'none', cursor: 'pointer', padding: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <Icon name="x" size={12} color="#fff" />
            </button>
          </div>
        ))}

        {photos.length < 6 && (
          <button
            onClick={addPhoto}
            aria-label="Add photo"
            style={{
              flexShrink: 0, width: 72, height: 72, borderRadius: 8,
              background: 'transparent',
              border: '1.5px dashed var(--sys-outline)',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'border-color 120ms linear',
            }}
          >
            <Icon name="plus" size={24} color="var(--sys-on-surface-variant)" />
          </button>
        )}
      </div>

      {/* Tip */}
      <div style={{
        display: 'flex', gap: 10, flexShrink: 0, alignItems: 'flex-start',
        padding: '12px 14px',
        background: 'var(--sys-surface-container)',
        borderRadius: 12,
      }}>
        <Icon name="lightbulb_ai_tip" size={20} color="var(--sys-primary)" />
        <span style={{
          fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 400,
          lineHeight: '18px', letterSpacing: '0.25px',
          color: 'var(--sys-on-surface-variant)',
        }}>
          Bright photos from multiple angles get{' '}
          <strong style={{ color: 'var(--sys-on-surface)', fontWeight: 500 }}>
            40% more views
          </strong>.
        </span>
      </div>

    </div>
  );
}

window.CameraScreen = CameraScreen;
