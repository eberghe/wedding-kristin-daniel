import { useState, useEffect } from 'react'
import { getPhotoUrl } from '../utils/storage'

// Photo slots: 'hero' | 'gifts' | 'footer'
export default function PhotoSlot({ slot, className = '', alt = '', children }) {
  const [url, setUrl] = useState(null)

  useEffect(() => {
    getPhotoUrl(slot).then(u => { if (u) setUrl(u) })
  }, [slot])

  if (url) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <img
          src={url}
          alt={alt}
          className="w-full h-full object-cover grayscale"
          loading="lazy"
        />
        {children}
      </div>
    )
  }

  // Placeholder
  return (
    <div
      className={`relative flex items-center justify-center bg-navy/10 ${className}`}
      role="img"
      aria-label={`Foto-Platzhalter: ${alt} — wird nach dem Hochladen angezeigt`}
    >
      <div className="text-center text-navy/30 select-none">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"
          className="mx-auto mb-2" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <path d="m21 15-5-5L5 21"/>
        </svg>
        <span className="text-xs tracking-wider uppercase">{alt}</span>
      </div>
      {children}
    </div>
  )
}
