import { useLang } from '../i18n'
import { FloralDivider } from './Florals'
import Countdown from './Countdown'
import PhotoSlot from './PhotoSlot'
import { useFadeIn } from '../hooks/useFadeIn'

export default function Hero() {
  const { t } = useLang()
  const textRef = useFadeIn(0.1)

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative min-h-screen bg-cream-light flex items-center pt-16"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 md:items-stretch">

          {/* Text block */}
          <div ref={textRef} className="relative order-2 md:order-1 flex flex-col">
            <div className="border border-sage/40 p-8 sm:p-12 relative flex-1">
              <p className="section-label text-blue-muted text-center mb-4" aria-hidden="true">
                — ♡ —
              </p>
              <h1
                id="hero-heading"
                className="font-script text-6xl sm:text-7xl md:text-8xl text-navy text-center leading-tight"
              >
                Kristin
                <span className="block font-display italic text-3xl sm:text-4xl text-blue-accent py-2">&amp;</span>
                Daniel
              </h1>

              <FloralDivider className="mx-auto my-6" color="#5C7A5C" />

              <p className="text-center text-sm tracking-[0.2em] uppercase text-blue-muted">
                {t('hero_date')}
              </p>
              <p className="text-center text-sm tracking-wider text-navy/60 mt-1">
                {t('hero_location')}
              </p>
              <p className="text-center text-xs tracking-widest uppercase text-sage mt-3">
                {t('hero_dresscode')}
              </p>
            </div>

            {/* Countdown */}
            <div className="mt-10">
              <Countdown />
            </div>
          </div>

          {/* Two photos: then & now — fill the full column height */}
          <div className="order-1 md:order-2 flex gap-3 min-h-[420px] md:min-h-0">
            <div className="flex-1 flex flex-col gap-2">
              <PhotoSlot
                slot="hero_then"
                alt={t('hero_then_label')}
                className="flex-1 min-h-[200px]"
              />
              <p className="text-center text-xs tracking-widest uppercase text-navy/35 shrink-0">
                {t('hero_then_label')}
              </p>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <PhotoSlot
                slot="hero"
                alt={t('hero_now_label')}
                className="flex-1 min-h-[200px]"
              />
              <p className="text-center text-xs tracking-widest uppercase text-navy/35 shrink-0">
                {t('hero_now_label')}
              </p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-16" aria-hidden="true">
          <a
            href="#location"
            onClick={(e) => { e.preventDefault(); document.querySelector('#location')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="flex flex-col items-center gap-2 text-navy/40 hover:text-sage transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-accent"
            aria-label={t('hero_scroll')}
          >
            <span className="text-xs tracking-widest uppercase">{t('hero_scroll')}</span>
            <svg width="16" height="24" viewBox="0 0 16 24" fill="none" aria-hidden="true">
              <rect x="1" y="1" width="14" height="22" rx="7" stroke="currentColor" strokeWidth="1"/>
              <circle cx="8" cy="7" r="2" fill="currentColor" className="animate-bounce"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
