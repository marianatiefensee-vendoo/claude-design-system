/**
 * CameraScreen — Phase 1: Photo capture
 *                Phase 2: AI analysis fires from the Next handler
 *
 * @figma MgN9117UjMZknfMGuKYUTT node 167:9992 (Camera UI Ready)
 *
 * Props:
 *   draft        {Object}   — ListingDraftState from App
 *   updateDraft  {Function} — (Partial<ListingDraftState>) => void
 *   onNext       {Function} — navigate to "listing-form"
 *   onClose      {Function} — cancel flow, reset draft, go to inventory
 *
 * State model for images (local, merged into draft on Next):
 *   CapturedImageStateType { imageId, storagePath, uploadStatus, gradient }
 *
 * API surface (simulated):
 *   Phase 1: POST /v1/images/url  → PUT bytes  (per image, concurrent, 1 s sim)
 *   Phase 2: POST /v2/enrich-item/analyze-images  (1.5 s sim, fires on Next tap)
 *
 * Rules:
 *   - Next disabled while any slot has uploadStatus === "uploading"
 *   - Next shows loading spinner while analyzingStatus === "analyzing"
 *   - No Firestore / item write here — zero writes before Phase 7
 *   - All styles use var(--go-*) tokens defined in index.html :root
 */

const { useState } = React;

// ── Gradient pool — simulated photo thumbnails ──────────────────────────────
const PHOTO_GRADIENTS = [
  'linear-gradient(135deg,#E8DDFF 0%,#C3B0FF 100%)',
  'linear-gradient(135deg,#C3B0FF 0%,#9747FF 100%)',
  'linear-gradient(135deg,#FECB40 0%,#F7507C 100%)',
  'linear-gradient(135deg,#47CDAE 0%,#4852E8 100%)',
  'linear-gradient(135deg,#ECE6F3 0%,#D6CFE8 100%)',
  'linear-gradient(135deg,#1D1A24 0%,#494455 100%)',
  'linear-gradient(135deg,#F7507C 0%,#BA1A1A 100%)',
  'linear-gradient(135deg,#FECB40 0%,#F9A826 100%)',
];

// ── Corner frame brackets drawn with borders ─────────────────────────────────
function CameraFrame() {
  const w = 'rgba(255,255,255,0.85)';
  const s = 36; // bracket size px
  const t = 2;  // stroke px
  const base = {
    position: 'absolute',
    width: s, height: s,
    pointerEvents: 'none',
  };
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <div style={{ ...base, top: 30, left: 20,  borderTop:    `${t}px solid ${w}`, borderLeft:   `${t}px solid ${w}`, borderRadius: '4px 0 0 0' }} />
      <div style={{ ...base, top: 30, right: 20, borderTop:    `${t}px solid ${w}`, borderRight:  `${t}px solid ${w}`, borderRadius: '0 4px 0 0' }} />
      <div style={{ ...base, bottom: 92, left: 20,  borderBottom: `${t}px solid ${w}`, borderLeft:   `${t}px solid ${w}`, borderRadius: '0 0 0 4px' }} />
      <div style={{ ...base, bottom: 92, right: 20, borderBottom: `${t}px solid ${w}`, borderRight:  `${t}px solid ${w}`, borderRadius: '0 0 4px 0' }} />
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
function CameraScreen({ draft, updateDraft, onNext, onClose }) {
  const [images,      setImages]      = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const MAX          = 8;
  const anyUploading = images.some(img => img.uploadStatus === 'uploading');
  const canNext      = images.length > 0 && !anyUploading && !isAnalyzing;

  // ── Capture a photo (simulate upload) ──────────────────────────────────────
  function addPhoto() {
    if (images.length >= MAX || isAnalyzing) return;

    const imageId     = 'img-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7);
    const storagePath = 'items/draft/' + imageId + '.jpg';
    const gradient    = PHOTO_GRADIENTS[images.length % PHOTO_GRADIENTS.length];

    setImages(prev => [...prev, { imageId, storagePath, uploadStatus: 'uploading', gradient }]);

    // Simulate: POST /v1/images/url (→ signedUploadUrl) then PUT bytes
    setTimeout(() => {
      setImages(prev =>
        prev.map(img => img.imageId === imageId ? { ...img, uploadStatus: 'uploaded' } : img)
      );
    }, 1000);
  }

  function removePhoto(imageId) {
    if (isAnalyzing) return;
    setImages(prev => prev.filter(img => img.imageId !== imageId));
  }

  // ── Next → Phase 2 analysis ─────────────────────────────────────────────────
  async function handleNext() {
    if (!canNext) return;
    setIsAnalyzing(true);
    updateDraft({ analyzingStatus: 'analyzing' });

    // Simulate POST /v2/enrich-item/analyze-images via Gateway (1.5 s)
    await new Promise(resolve => setTimeout(resolve, 1500));

    const enrichments = {
      title:       "Vintage 90s Knit Sweater — Pastel Purple",
      description: "Soft pastel purple knit sweater with a vintage 90s look. Wool blend, great condition, size medium. Cozy everyday layer for fall and winter.",
      brand:       "Levi's",
      condition:   "Good",
      model:       "Classic Fit",
      category:    "Clothing",
    };

    updateDraft({
      images,
      enrichments,
      analyzingStatus: 'ready',
      generalDetails: {
        brand:     enrichments.brand,
        condition: enrichments.condition,
        model:     enrichments.model,
        category:  enrichments.category,
      },
    });

    setIsAnalyzing(false);
    onNext(); // → "listing-form"
  }

  // ── Styles (all tokens, no hex literals) ─────────────────────────────────────
  const goNeutral   = 'var(--go-neutral)';
  const goSecondary = 'var(--go-secondary)';
  const goBgCamera  = 'var(--go-bg-camera)';

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      height: '100%', overflow: 'hidden',
      background: goBgCamera,
      fontFamily: 'var(--font-sans)',
    }}>

      {/* ── Top bar: close button ─────────────────────────────────────────── */}
      <div style={{
        flexShrink: 0,
        display: 'flex', alignItems: 'center',
        padding: '22px 12px 8px',
      }}>
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            width: 32, height: 32, padding: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <Icon name="x" size={22} color={goNeutral} />
        </button>
      </div>

      {/* ── Middle: viewfinder + divider + thumbnail grid ─────────────────── */}
      <div style={{
        flex: 1, minHeight: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: 14,
        padding: '0 12px',
      }}>

        {/* Viewfinder */}
        <div style={{
          width: '100%', flex: 1, minHeight: 0,
          borderRadius: 5, overflow: 'hidden',
          position: 'relative',
          background: 'linear-gradient(180deg,#1D2129 0%,#141A21 100%)',
        }}>
          <CameraFrame />

          {/* Top scrim */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '10%',
            background: 'rgba(20,26,33,0.40)',
          }} />

          {/* Tooltip */}
          <div style={{
            position: 'absolute', bottom: 92, left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(0,0,0,0.55)', borderRadius: 4,
            padding: '4px 10px', whiteSpace: 'nowrap',
          }}>
            <span style={{
              font: '300 12px/16px var(--font-sans)',
              letterSpacing: '0.4px', color: goNeutral,
            }}>
              Start taking photos to create your listing
            </span>
          </div>

          {/* Controls bar: flash · shutter · gallery */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 80,
            background: 'rgba(20,26,33,0.40)',
            display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
            alignItems: 'center', justifyItems: 'center',
          }}>
            {/* Flash */}
            <button
              aria-label="Toggle flash"
              style={{
                background: 'transparent', border: 'none', cursor: 'pointer',
                width: 44, height: 44,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <Icon name="zap" size={22} color={goNeutral} />
            </button>

            {/* Shutter */}
            <button
              onClick={addPhoto}
              disabled={images.length >= MAX || isAnalyzing}
              aria-label="Take photo"
              style={{
                width: 55, height: 55, borderRadius: '50%', padding: 0,
                border: '2px solid rgba(238,238,238,0.85)',
                background: 'transparent',
                cursor: images.length >= MAX || isAnalyzing ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: images.length >= MAX ? 0.38 : 1,
                transition: 'opacity 120ms linear',
              }}
            >
              <div style={{
                width: 42, height: 42, borderRadius: '50%',
                background: 'rgba(255,255,255,0.85)',
              }} />
            </button>

            {/* Gallery */}
            <button
              aria-label="Upload from gallery"
              style={{
                background: 'transparent', border: 'none', cursor: 'pointer',
                width: 44, height: 44,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <Icon name="image" size={22} color={goNeutral} />
            </button>
          </div>
        </div>

        {/* Divider pill */}
        <div style={{
          width: 134, height: 4, borderRadius: 100,
          background: 'rgba(255,255,255,0.85)', flexShrink: 0,
        }} />

        {/* Thumbnail grid — 2 × 4 */}
        <div style={{
          width: '100%', flexShrink: 0,
          background: 'rgba(255,255,255,0.10)',
          borderRadius: 5, padding: 12,
        }}>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10,
          }}>
            {Array.from({ length: MAX }).map((_, i) => {
              const img = images[i];
              return (
                <div key={i} style={{ aspectRatio: '1 / 1', position: 'relative' }}>
                  {img ? (
                    <div style={{
                      width: '100%', height: '100%', borderRadius: 4,
                      background: img.gradient,
                      position: 'relative', overflow: 'hidden',
                    }}>
                      {/* Upload spinner */}
                      {img.uploadStatus === 'uploading' && (
                        <div style={{
                          position: 'absolute', inset: 0,
                          background: 'rgba(0,0,0,0.45)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <div style={{
                            width: 18, height: 18,
                            border: '2px solid rgba(255,255,255,0.30)',
                            borderTop: '2px solid #fff',
                            borderRadius: '50%',
                            animation: 'go-spin 700ms linear infinite',
                          }} />
                        </div>
                      )}

                      {/* Remove button (uploaded only) */}
                      {img.uploadStatus === 'uploaded' && (
                        <button
                          onClick={() => removePhoto(img.imageId)}
                          aria-label="Remove photo"
                          style={{
                            position: 'absolute', top: 3, right: 3,
                            width: 18, height: 18, borderRadius: '50%',
                            background: 'rgba(0,0,0,0.60)', border: 'none',
                            cursor: 'pointer', padding: 0,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}
                        >
                          <Icon name="x" size={10} color="#fff" />
                        </button>
                      )}

                      {/* Cover badge on first slot */}
                      {i === 0 && img.uploadStatus === 'uploaded' && (
                        <span style={{
                          position: 'absolute', bottom: 3, left: 3,
                          font: '500 8px/12px var(--font-sans)', letterSpacing: '0.3px',
                          textTransform: 'uppercase',
                          background: goSecondary, color: '#fff',
                          padding: '1px 4px', borderRadius: 999,
                        }}>
                          Cover
                        </span>
                      )}
                    </div>
                  ) : (
                    <div style={{
                      width: '100%', height: '100%', borderRadius: 4,
                      border: '1.5px dashed rgba(238,238,238,0.55)',
                    }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Next button ───────────────────────────────────────────────────── */}
      <div style={{ padding: '16px 12px 32px', flexShrink: 0 }}>
        <button
          onClick={handleNext}
          disabled={!canNext}
          aria-label={isAnalyzing ? 'Analyzing photos…' : 'Next'}
          style={{
            width: '100%', height: 40, borderRadius: 5, border: 'none',
            background: canNext
              ? goSecondary
              : 'rgba(191,191,191,0.50)',
            color: canNext ? 'var(--go-gray-50)' : 'var(--go-gray-800)',
            font: '500 14px/20px "Lexend Deca", var(--font-sans)',
            letterSpacing: '0.014px',
            cursor: canNext ? 'pointer' : 'not-allowed',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            transition: 'background 120ms linear, color 120ms linear',
          }}
        >
          {isAnalyzing ? (
            <>
              <div style={{
                width: 16, height: 16,
                border: '2px solid rgba(255,255,255,0.30)',
                borderTop: '2px solid #fff',
                borderRadius: '50%',
                animation: 'go-spin 700ms linear infinite',
              }} />
              <span>Analyzing…</span>
            </>
          ) : (
            <>
              <Icon
                name="sparkle"
                size={14}
                color={canNext ? 'var(--go-gray-50)' : 'var(--go-gray-800)'}
              />
              <span>Next</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
}

window.CameraScreen = CameraScreen;
