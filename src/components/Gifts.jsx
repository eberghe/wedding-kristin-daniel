import { useLang } from '../i18n'
import { FloralDivider } from './Florals'
import { useFadeIn } from '../hooks/useFadeIn'
import PhotoSlot from './PhotoSlot'

const GIFTS = [
  { key: 'travel', icon: '✈️' },
  { key: 'experience', icon: '🎭' },
  { key: 'wishlist', icon: '📝' },
]

export default function Gifts() {
  const { t } = useLang()
  const ref = useFadeIn()

  return (
    <section
      id="gifts"
      aria-labelledby="gifts-heading"
      className="bg-navy text-cream py-20 md:py-28"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">

          {/* Content */}
          <div ref={ref}>
            <p className="section-label text-cream/50 mb-3">{t('gifts_label')}</p>
            <h2 id="gifts-heading" className="font-script italic text-4xl md:text-5xl text-cream">
              {t('gifts_title')}
            </h2>
            <FloralDivider className="my-4" color="#EFEEF5" />

            <p className="text-cream/70 text-sm leading-relaxed mb-8">
              {t('gifts_intro')}
            </p>

            <div className="flex flex-col gap-4 mb-8">
              {GIFTS.map(({ key, icon }) => (
                <div key={key} className="border border-cream/20 p-5 bg-cream/5 flex gap-4">
                  <span className="text-2xl" role="img" aria-hidden="true">{icon}</span>
                  <div>
                    <h3 className="font-script italic text-xl text-cream mb-1">
                      {t(`gifts_${key}`)}
                    </h3>
                    <p className="text-cream/65 text-sm leading-relaxed">
                      {t(`gifts_${key}_text`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="https://paypal.me/kristinunddaniel"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('gifts_paypal_aria')}
              className="inline-block border border-cream/40 text-cream px-8 py-3 text-xs tracking-widest uppercase hover:bg-cream/10 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
            >
              {t('gifts_paypal')} ↗
            </a>
          </div>

          {/* Photo */}
          {/* <!-- Replace with actual couple photo: gifts section --> */}
          <PhotoSlot
            slot="gifts"
            alt="Kristin und Daniel"
            className="w-full aspect-[3/4] hidden md:flex"
          />
        </div>
      </div>
    </section>
  )
}
