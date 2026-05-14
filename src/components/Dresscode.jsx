import { useLang } from '../i18n'
import { FloralDivider } from './Florals'
import { useFadeIn } from '../hooks/useFadeIn'

export default function Dresscode() {
  const { t } = useLang()
  const ref = useFadeIn()

  return (
    <section id="dresscode" aria-labelledby="dresscode-heading" className="bg-cream-light py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <div ref={ref}>
          <p className="section-label text-blue-muted mb-3">{t('dresscode_label')}</p>
          <h2 id="dresscode-heading" className="font-display italic text-4xl md:text-5xl text-navy">
            {t('dresscode_title')}
          </h2>
          <FloralDivider className="mx-auto mt-4 mb-6" color="#5C7A5C" />
          <p className="text-navy/60 text-sm leading-relaxed max-w-lg mx-auto">
            {t('dresscode_intro')}
          </p>
        </div>
      </div>
    </section>
  )
}
