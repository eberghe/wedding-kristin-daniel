import { useState, useEffect } from 'react'
import { supabase } from '../supabase'
import { getPhotoUrl } from '../utils/storage'
import { useLang } from '../i18n'
import { FloralDivider } from './Florals'
import { useFadeIn } from '../hooks/useFadeIn'

const DEFAULT_COLORS = ['#697C9F', '#2E3D52', '#6E6C83', '#9BA8C0']
const DRESSCODE_SLOTS = ['dresscode_1', 'dresscode_2', 'dresscode_3', 'dresscode_4', 'dresscode_5', 'dresscode_6']
const COLOR_KEYS = ['dresscode_color_1', 'dresscode_color_2', 'dresscode_color_3', 'dresscode_color_4']

export default function Dresscode() {
  const { t } = useLang()
  const ref = useFadeIn()
  const [colors, setColors] = useState(DEFAULT_COLORS)
  const [images, setImages] = useState(Array(6).fill(null))

  useEffect(() => {
    const loadColors = async () => {
      try {
        const { data } = await supabase
          .from('site_settings')
          .select('key, value')
          .in('key', COLOR_KEYS)
        if (data && data.length > 0) {
          const map = Object.fromEntries(data.map(r => [r.key, r.value]))
          setColors(COLOR_KEYS.map((k, i) => map[k] || DEFAULT_COLORS[i]))
        }
      } catch {}
    }

    const loadImages = async () => {
      const urls = await Promise.all(DRESSCODE_SLOTS.map(slot => getPhotoUrl(slot)))
      setImages(urls)
    }

    loadColors()
    loadImages()
  }, [])

  return (
    <section id="dresscode" aria-labelledby="dresscode-heading" className="bg-white py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div ref={ref} className="text-center mb-12">
          <p className="section-label text-blue-muted mb-3">{t('dresscode_label')}</p>
          <h2 id="dresscode-heading" className="font-script italic text-4xl md:text-5xl text-navy">
            {t('dresscode_title')}
          </h2>
          <FloralDivider className="mx-auto mt-4" color="#697C9F" />
          <p className="text-navy/60 text-sm mt-4 max-w-lg mx-auto leading-relaxed">
            {t('dresscode_intro')}
          </p>
        </div>

        {/* Color palette */}
        <div className="mb-14">
          <p className="text-xs tracking-widest uppercase text-blue-muted text-center mb-6">
            {t('dresscode_palette_label')}
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {colors.map((color, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div
                  className="w-16 h-16 rounded-full border border-navy/10 shadow-sm"
                  style={{ backgroundColor: color }}
                  role="img"
                  aria-label={`${t('dresscode_color_label')} ${i + 1}: ${color}`}
                />
                <span className="text-xs tracking-wider text-navy/50 font-mono">{color}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Images grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {images.map((url, i) =>
            url ? (
              <div key={i} className="aspect-[3/4] overflow-hidden">
                <img
                  src={url}
                  alt={`${t('dresscode_img_alt')} ${i + 1}`}
                  className="w-full h-full object-cover transition-all duration-500"
                  loading="lazy"
                />
              </div>
            ) : (
              <div
                key={i}
                className="aspect-[3/4] bg-navy/5 flex items-center justify-center"
                role="img"
                aria-label={`${t('dresscode_img_alt')} ${i + 1} — ${t('dresscode_img_placeholder')}`}
              >
                <div className="text-center text-navy/25 select-none">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"
                    className="mx-auto mb-1" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <path d="m21 15-5-5L5 21"/>
                  </svg>
                  <span className="text-xs tracking-wider uppercase">{i + 1}</span>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  )
}
