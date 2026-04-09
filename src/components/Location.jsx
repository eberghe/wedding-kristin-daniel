import { useLang } from '../i18n'
import { FloralDivider } from './Florals'
import { useFadeIn } from '../hooks/useFadeIn'

export default function Location() {
  const { t } = useLang()
  const ref = useFadeIn()

  return (
    <section
      id="location"
      aria-labelledby="location-heading"
      className="bg-navy text-cream py-20 md:py-28"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div ref={ref} className="text-center mb-12">
          <p className="section-label text-cream/50 mb-3">{t('location_label')}</p>
          <h2 id="location-heading" className="font-script italic text-4xl md:text-5xl text-cream">
            {t('location_title')}
          </h2>
          <FloralDivider className="mx-auto mt-4" color="#EFEEF5" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {/* Address */}
          <div className="border border-cream/20 p-6 sm:p-8">
            <h3 className="section-label text-cream/60 mb-3">{t('location_address_title')}</h3>
            <address className="not-italic">
              <p className="font-script italic text-2xl text-cream mb-3">Gut Hermannsberg</p>
              <p className="text-cream/70 text-sm leading-relaxed">
                Hermannsberg 1<br />
                83410 Laufen, Bayern<br />
                Deutschland
              </p>
            </address>
            <a
              href="https://maps.google.com/?q=Gut+Hermannsberg+Laufen+Bayern"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-xs tracking-widest uppercase border border-cream/40 px-5 py-2.5 text-cream/80 hover:bg-cream/10 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
              aria-label="Route auf Google Maps öffnen (öffnet externe Seite)"
            >
              Google Maps ↗
            </a>
          </div>

          {/* Info cards */}
          <div className="flex flex-col gap-4">
            <div className="border border-cream/20 p-5 bg-cream/5">
              <h3 className="section-label text-cream/60 mb-2">{t('location_outdoor_title')}</h3>
              <p className="text-cream/75 text-sm leading-relaxed">{t('location_outdoor_text')}</p>
            </div>
            <div className="border border-cream/20 p-5 bg-cream/5">
              <h3 className="section-label text-cream/60 mb-2">{t('location_parking_title')}</h3>
              <p className="text-cream/75 text-sm leading-relaxed">{t('location_parking_text')}</p>
            </div>
          </div>
        </div>

        {/* Map embed */}
        <div className="border border-cream/20 overflow-hidden">
          <iframe
            title={t('location_map_label')}
            aria-label={t('location_map_label')}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2694.0!2d12.9!3d47.94!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zGut+Hermannsberg!5e0!3m2!1sde!2sde!4v1234567890"
            width="100%"
            height="300"
            style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(0.9)' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Schedule coming soon */}
        <p className="text-center text-cream/50 text-sm tracking-wider mt-10 italic font-script text-xl">
          {t('location_schedule_coming')}
        </p>
      </div>
    </section>
  )
}
