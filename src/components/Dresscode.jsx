import { useLang } from '../i18n'
import { FloralDivider } from './Florals'
import { useFadeIn } from '../hooks/useFadeIn'

const COLORS = ['#697C9F', '#2E3D52', '#6E6C83', '#9BA8C0']

export default function Dresscode() {
  const { t } = useLang()
  const ref = useFadeIn()

  return (
    <section id="dresscode" aria-labelledby="dresscode-heading" className="bg-cream-light py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <div ref={ref}>
          <p className="section-label text-blue-muted mb-3">{t('dresscode_label')}</p>
          <h2 id="dresscode-heading" className="font-script text-4xl md:text-5xl text-navy">
            {t('dresscode_title')}
          </h2>
          <FloralDivider className="mx-auto mt-4 mb-6" color="#5C7A5C" />
          <p className="text-navy/60 text-base leading-relaxed max-w-lg mx-auto">
            {t('dresscode_intro')}
          </p>

          {/* Color palette */}
          <div className="flex justify-center gap-4 mt-8">
            {COLORS.map((color) => (
              <div key={color} className="flex flex-col items-center gap-2">
                <div
                  className="w-10 h-10 rounded-full border border-navy/10 shadow-sm"
                  style={{ backgroundColor: color }}
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
