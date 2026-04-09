import { useLang } from '../i18n'
import { FloralCorner, FloralDivider } from './Florals'
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
      {/* Layout: text left, photo right on md+ */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">

          {/* Text block */}
          <div ref={textRef} className="relative order-2 md:order-1">
            {/* Floral corner decorations */}
            <FloralCorner
              className="absolute -top-6 -left-6 opacity-60"
              color="#697C9F"
              size={100}
            />
            <FloralCorner
              className="absolute -bottom-6 -right-6 rotate-180 opacity-40"
              color="#697C9F"
              size={80}
            />

            {/* Thin border frame */}
            <div className="border border-blue-accent/30 p-8 sm:p-12 relative">
              <p className="section-label text-blue-muted text-center mb-4" aria-hidden="true">
                — ♡ —
              </p>
              <h1
                id="hero-heading"
                className="font-script italic text-5xl sm:text-6xl md:text-7xl text-navy text-center leading-tight"
              >
                Kristin
                <span className="block text-3xl sm:text-4xl text-blue-accent py-1">&</span>
                Daniel
              </h1>

              <FloralDivider className="mx-auto my-6" color="#697C9F" />

              <p className="text-center text-sm tracking-[0.2em] uppercase text-blue-muted">
                {t('hero_date')}
              </p>
              <p className="text-center text-sm tracking-wider text-navy/60 mt-1">
                {t('hero_location')}
              </p>
              <p className="text-center text-xs tracking-widest uppercase text-blue-accent/70 mt-3">
                {t('hero_dresscode')}
              </p>
            </div>

            {/* Countdown */}
            <div className="mt-10">
              <Countdown />
            </div>
          </div>

          {/* Photo */}
          {/* <!-- Replace with actual couple photo: hero-photo --> */}
          <div className="order-1 md:order-2">
            <PhotoSlot
              slot="hero"
              alt="Kristin und Daniel"
              className="w-full aspect-[3/4] md:aspect-[2/3]"
            />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-16" aria-hidden="true">
          <a
            href="#location"
            onClick={(e) => { e.preventDefault(); document.querySelector('#location')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="flex flex-col items-center gap-2 text-navy/40 hover:text-blue-accent transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-accent"
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
