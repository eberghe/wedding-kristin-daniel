import { useLang } from '../i18n'
import { FloralDivider } from './Florals'
import { useFadeIn } from '../hooks/useFadeIn'

const COLORS = [
  { hex: '#A0C5E8', outline: false },
  { hex: '#B4CAB3', outline: false },
  { hex: '#5B6959', outline: false },
  { hex: '#2E3D52', outline: true },
]

export default function Dresscode() {
  const { t } = useLang()
  const ref = useFadeIn()

  return (
    <section id="dresscode" aria-labelledby="dresscode-heading" className="bg-navy py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <div ref={ref}>
          <p className="section-label text-cream/50 mb-3">{t('dresscode_label')}</p>
          <h2 id="dresscode-heading" className="font-script text-4xl md:text-5xl text-cream">
            {t('dresscode_title')}
          </h2>
          <FloralDivider className="mx-auto mt-4 mb-6" color="#EFEEF5" />
          <div className="text-cream/65 text-base leading-relaxed max-w-lg mx-auto space-y-4">
            {t('dresscode_intro').split('\n\n').map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* Color palette */}
          <div className="flex justify-center gap-4 mt-8">
            {COLORS.map(({ hex, outline }) => (
              <div key={hex} className="flex flex-col items-center gap-2">
                <div
                  className="w-10 h-10 rounded-full shadow-sm"
                  style={{
                    backgroundColor: hex,
                    outline: outline ? '2px solid rgba(255,255,255,0.6)' : 'none',
                    outlineOffset: '2px',
                  }}
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
