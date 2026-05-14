import { useLang } from '../i18n'
import { useFadeIn } from '../hooks/useFadeIn'
import PhotoSlot from './PhotoSlot'

export default function Welcome() {
  const { t } = useLang()
  const ref = useFadeIn()

  return (
    <section
      id="welcome"
      aria-labelledby="welcome-heading"
      className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background photo */}
      <div className="absolute inset-0">
        <PhotoSlot slot="welcome" alt="" className="w-full h-full" grayscale={false} />
        <div className="absolute inset-0 bg-navy/60" />
      </div>

      {/* Card */}
      <div
        ref={ref}
        className="relative z-10 mx-4 sm:mx-auto max-w-2xl w-full bg-navy/70 backdrop-blur-sm px-8 py-14 sm:px-14 sm:py-16 text-center"
      >
        <h2
          id="welcome-heading"
          className="font-script text-4xl sm:text-5xl text-cream mb-6"
        >
          {t('welcome_title')}
        </h2>

        <p className="text-cream/80 text-base leading-relaxed italic mb-8 font-display">
          {t('welcome_text')}
        </p>

        <p className="text-cream/60 text-sm tracking-wider mb-1">{t('welcome_sign')}</p>
        <p className="font-script text-3xl text-cream/90">{t('welcome_names')}</p>
      </div>
    </section>
  )
}
