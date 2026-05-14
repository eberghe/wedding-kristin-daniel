import { useLang } from '../i18n'
import { FloralDivider } from './Florals'
import { useFadeIn } from '../hooks/useFadeIn'

function PlaneIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 2L11 13"/>
      <path d="M22 2L15 22L11 13L2 9L22 2Z"/>
    </svg>
  )
}

function SparkleIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"/>
    </svg>
  )
}

function GiftIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 12 20 22 4 22 4 12"/>
      <rect x="2" y="7" width="20" height="5"/>
      <line x1="12" y1="22" x2="12" y2="7"/>
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7Z"/>
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7Z"/>
    </svg>
  )
}

const GIFTS = [
  { key: 'travel', Icon: PlaneIcon },
  { key: 'experience', Icon: SparkleIcon },
  { key: 'wishlist', Icon: GiftIcon },
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
        <div ref={ref} className="text-center mb-14">
          <p className="section-label text-cream/50 mb-3">{t('gifts_label')}</p>
          <h2 id="gifts-heading" className="font-script text-4xl md:text-5xl text-cream">
            {t('gifts_title')}
          </h2>
          <FloralDivider className="mx-auto my-4" color="#EFEEF5" />
          <p className="text-cream/70 text-sm leading-relaxed max-w-lg mx-auto">
            {t('gifts_intro')}
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-8 md:gap-12 mb-14">
          {GIFTS.map(({ key, Icon }) => (
            <div key={key} className="text-center">
              <div className="flex justify-center mb-5 text-blue-accent/80">
                <Icon />
              </div>
              <h3 className="font-script text-xl text-cream mb-3">
                {t(`gifts_${key}`)}
              </h3>
              <p className="text-cream/65 text-sm leading-relaxed">
                {t(`gifts_${key}_text`)}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
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
      </div>
    </section>
  )
}
