import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { getPhotoUrl } from '../utils/storage'

const SLIDER_SLOTS = Array.from({ length: 8 }, (_, i) => `slider_${i + 1}`)
// Width of each image tile + gap (must match the inline style below)
const TILE_W = 224 // w-56 = 14rem = 224px
const GAP = 12    // gap-3 = 0.75rem = 12px

function Lightbox({ images, startIndex, onClose }) {
  const [index, setIndex] = useState(startIndex)

  const prev = useCallback(() => setIndex(i => (i - 1 + images.length) % images.length), [images.length])
  const next = useCallback(() => setIndex(i => (i + 1) % images.length), [images.length])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, prev, next])

  return createPortal(
    <div
      className="fixed inset-0 z-[200] bg-black/92 flex items-center justify-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Foto-Lightbox"
    >
      {/* Image container — stop click from bubbling to backdrop */}
      <div
        className="relative flex items-center justify-center w-full max-w-4xl px-16"
        onClick={e => e.stopPropagation()}
      >
        <img
          src={images[index]}
          alt={`Kristin & Daniel — Foto ${index + 1} von ${images.length}`}
          className="max-h-[85vh] max-w-full object-contain select-none"
          draggable="false"
        />
        {/* Counter */}
        <p className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-white/40 text-xs tracking-widest select-none">
          {index + 1} / {images.length}
        </p>
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Lightbox schließen"
        className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors w-10 h-10 flex items-center justify-center text-xl focus-visible:outline-2 focus-visible:outline-white"
      >
        ✕
      </button>

      {/* Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={e => { e.stopPropagation(); prev() }}
            aria-label="Vorheriges Foto"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors w-12 h-12 flex items-center justify-center text-2xl focus-visible:outline-2 focus-visible:outline-white"
          >
            ←
          </button>
          <button
            onClick={e => { e.stopPropagation(); next() }}
            aria-label="Nächstes Foto"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors w-12 h-12 flex items-center justify-center text-2xl focus-visible:outline-2 focus-visible:outline-white"
          >
            →
          </button>
        </>
      )}
    </div>,
    document.body
  )
}

export default function PhotoSlider() {
  const [images, setImages] = useState([])
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const load = async () => {
      const results = await Promise.all(SLIDER_SLOTS.map(slot => getPhotoUrl(slot)))
      setImages(results.filter(Boolean))
    }
    load()
  }, [])

  if (images.length === 0) return null

  // Duplicate track for seamless infinite loop
  const track = [...images, ...images]
  const trackWidth = images.length * (TILE_W + GAP)
  const duration = Math.max(images.length * 3.5, 14) // seconds

  return (
    <>
      <section
        aria-label="Fotogalerie Kristin & Daniel"
        className="w-full overflow-hidden bg-cream py-10"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="flex gap-3"
          style={{
            width: `${track.length * (TILE_W + GAP)}px`,
            animation: `slider-scroll ${duration}s linear infinite`,
            animationPlayState: paused ? 'paused' : 'running',
          }}
        >
          {track.map((url, i) => {
            const realIndex = i % images.length
            return (
              <button
                key={i}
                onClick={() => setLightboxIndex(realIndex)}
                aria-label={`Foto ${realIndex + 1} in Lightbox öffnen`}
                className="flex-shrink-0 overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-accent"
                style={{ width: TILE_W, height: TILE_W }}
              >
                <img
                  src={url}
                  alt={`Kristin & Daniel — Foto ${realIndex + 1}`}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  loading="lazy"
                  draggable="false"
                />
              </button>
            )
          })}
        </div>
      </section>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  )
}
