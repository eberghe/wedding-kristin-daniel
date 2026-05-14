import { useLang } from '../i18n'
import { FloralDivider } from './Florals'
import Countdown from './Countdown'
import PhotoSlot from './PhotoSlot'
import { useFadeIn } from '../hooks/useFadeIn'

export default function Hero() {
  const { t } = useLang()
  const ref = useFadeIn(0.1)

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative min-h-screen bg-navy flex flex-col overflow-hidden"
    >
      {/* Split background: then | now */}
      <div className="absolute inset-0 flex">
        <div className="flex-1">
          <PhotoSlot slot="hero_then" alt="" className="w-full h-full" />
        </div>
        <div className="w-px bg-cream/20 shrink-0" aria-hidden="true" />
        <div className="flex-1">
          <PhotoSlot slot="hero" alt="" className="w-full h-full" />
        </div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-navy/50" />

      {/* Main content — centered vertically */}
      <div
        ref={ref}
        className="relative z-10 flex flex-col items-center justify-center flex-1 text-cream text-center px-6 py-28"
      >
        <p className="text-[10px] tracking-[0.35em] uppercase text-cream/50 mb-6" aria-hidden="true">
          — ♡ —
        </p>

        <h1 id="hero-heading" className="leading-none">
          <span className="block font-script text-6xl sm:text-7xl md:text-8xl text-cream drop-shadow-lg">
            Kristin
          </span>
          <span className="block font-script text-3xl sm:text-4xl text-cream/75 my-1">
            &amp;
          </span>
          <span className="block font-script text-6xl sm:text-7xl md:text-8xl text-cream drop-shadow-lg">
            Daniel
          </span>
        </h1>

        <FloralDivider className="mx-auto mt-6 mb-5 opacity-60" color="#EFEEF5" />

        <p className="text-sm sm:text-base tracking-[0.25em] uppercase text-cream/90">
          {t('hero_date')}
        </p>

        <div className="mt-10">
          <Countdown light />
        </div>
      </div>

      {/* Then / Now labels at bottom corners */}
      <div className="relative z-10 flex justify-between items-end px-6 pb-10 text-xs tracking-[0.25em] uppercase text-cream/55">
        <span>{t('hero_then_label')}</span>
        <a
          href="#location"
          onClick={(e) => { e.preventDefault(); document.querySelector('#location')?.scrollIntoView({ behavior: 'smooth' }) }}
          className="flex flex-col items-center gap-2 text-cream/35 hover:text-cream/60 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream/50"
          aria-label={t('hero_scroll')}
        >
          <span className="text-[9px] tracking-[0.3em] uppercase">{t('hero_scroll')}</span>
          <svg width="14" height="22" viewBox="0 0 16 24" fill="none" aria-hidden="true">
            <rect x="1" y="1" width="14" height="22" rx="7" stroke="currentColor" strokeWidth="1"/>
            <circle cx="8" cy="7" r="2" fill="currentColor" className="animate-bounce"/>
          </svg>
        </a>
        <span>{t('hero_now_label')}</span>
      </div>
    </section>
  )
}
