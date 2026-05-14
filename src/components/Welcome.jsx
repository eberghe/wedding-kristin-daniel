import { useLang } from '../i18n'
import { FloralDivider } from './Florals'
import { useFadeIn } from '../hooks/useFadeIn'
import PhotoSlot from './PhotoSlot'

export default function Welcome() {
  const { t } = useLang()
  const ref = useFadeIn()

  return (
    <section id="welcome" aria-labelledby="welcome-heading" className="bg-cream-light">
      <div className="grid lg:grid-cols-2">

        {/* Left: then + now photos side by side */}
        <div className="grid grid-cols-2 min-h-[320px] lg:min-h-[520px]">
          <PhotoSlot slot="hero_then" alt={t('hero_then_label')} className="h-full" />
          <PhotoSlot slot="hero" alt={t('hero_now_label')} className="h-full" />
        </div>

        {/* Right: story text */}
        <div ref={ref} className="flex flex-col justify-center px-8 py-14 sm:px-14 sm:py-20 lg:py-24">
          <p className="section-label text-blue-muted mb-3">{t('welcome_label')}</p>
          <h2
            id="welcome-heading"
            className="font-script text-4xl md:text-5xl text-navy mb-2"
          >
            {t('welcome_title')}
          </h2>
          <FloralDivider className="mt-2 mb-6" color="#5C7A5C" />
          <p className="text-navy/65 text-base leading-relaxed">
            {t('welcome_text')}
          </p>
          <p className="mt-8 font-script text-2xl text-navy/70">{t('welcome_names')}</p>
        </div>

      </div>
    </section>
  )
}
