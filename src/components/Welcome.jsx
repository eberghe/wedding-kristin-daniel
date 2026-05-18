import { useLang } from '../i18n'
import { FloralDivider } from './Florals'
import { useFadeIn } from '../hooks/useFadeIn'
import PhotoSlot from './PhotoSlot'

function Polaroid({ slot, label, className = '' }) {
  return (
    <div className={`bg-white shadow-[0_6px_28px_rgba(46,61,82,0.18)] p-3 pb-10 ${className}`}>
      <PhotoSlot slot={slot} alt={label} className="w-full aspect-square" grayscale={false} />
      <p className="text-center mt-3 font-script text-navy/55 text-xl leading-none">{label}</p>
    </div>
  )
}

export default function Welcome() {
  const { t } = useLang()
  const ref = useFadeIn()

  return (
    <section id="welcome" aria-labelledby="welcome-heading" className="bg-cream-light">
      <div className="grid lg:grid-cols-2">

        {/* Left: polaroid photos */}

        {/* Mobile: stacked vertically */}
        <div className="lg:hidden flex flex-col items-center gap-6 py-14 bg-cream-light">
          <div className="w-[70%] max-w-[280px] -rotate-[3deg] transition-all duration-500 hover:rotate-0 hover:scale-[1.03] hover:shadow-2xl cursor-pointer">
            <Polaroid slot="hero_then" label={t('hero_then_label')} />
          </div>
          <div className="w-[70%] max-w-[280px] rotate-[2deg] transition-all duration-500 hover:rotate-0 hover:scale-[1.03] hover:shadow-2xl cursor-pointer">
            <Polaroid slot="hero" label={t('hero_now_label')} />
          </div>
        </div>

        {/* Desktop: overlapping */}
        <div className="hidden lg:flex items-center justify-center relative min-h-[680px] bg-cream-light overflow-hidden">
          {/* Damals — behind by default, hover brings to front */}
          <div
            className="absolute w-[46%] z-10 hover:z-30
              -translate-x-[28%] translate-y-[6%] -rotate-[5deg]
              transition-all duration-500 ease-out
              hover:scale-[1.04] hover:-rotate-[3deg] hover:shadow-2xl
              cursor-pointer"
          >
            <Polaroid slot="hero_then" label={t('hero_then_label')} />
          </div>

          {/* Heute — in front by default */}
          <div
            className="absolute w-[46%] z-20 hover:z-30
              translate-x-[28%] -translate-y-[5%] rotate-[4deg]
              transition-all duration-500 ease-out
              hover:scale-[1.04] hover:rotate-[2deg] hover:shadow-2xl
              cursor-pointer"
          >
            <Polaroid slot="hero" label={t('hero_now_label')} />
          </div>
        </div>

        {/* Right: story text */}
        <div ref={ref} className="flex flex-col justify-center px-8 py-14 sm:px-12 lg:px-14 lg:py-24">
          <p className="section-label text-blue-muted mb-3">{t('welcome_label')}</p>
          <h2
            id="welcome-heading"
            className="font-script text-4xl md:text-5xl text-navy mb-2"
          >
            {t('welcome_title')}
          </h2>
          <FloralDivider className="mt-2 mb-5" color="#5C7A5C" />
          <div className="flex flex-col gap-3">
            {t('welcome_text').split('\n\n').map((p, i) => (
              <p key={i} className="text-navy/65 text-sm leading-relaxed">{p}</p>
            ))}
          </div>
          <p className="mt-7 font-script text-2xl text-navy/70">{t('welcome_names')}</p>
        </div>

      </div>
    </section>
  )
}
