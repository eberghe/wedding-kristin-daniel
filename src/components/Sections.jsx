import { useState } from 'react'
import { useLang } from '../i18n'
import { FloralDivider, FloralSmall } from './Florals'
import { useFadeIn } from '../hooks/useFadeIn'

const HOTELS = [
  {
    name: 'Hotel Gut Ising',
    distance: '8 km',
    note: { de: 'Ruhige Lage am Chiemsee, gehobenes Ambiente', en: 'Quiet location on Lake Chiemsee, upscale ambiance' },
    url: 'https://www.gutising.de',
  },
  {
    name: 'Gasthof zur Post',
    distance: '3 km',
    note: { de: 'Charmantes Gasthaus mit bayerischem Charakter', en: 'Charming guesthouse with Bavarian character' },
    url: 'https://example.com',
  },
  {
    name: 'Landhaus Laufen',
    distance: '5 km',
    note: { de: 'Familiär und entspannt, gute Frühstücksküche', en: 'Family-run and relaxed, excellent breakfast' },
    url: 'https://example.com',
  },
]

const FAQ_COUNT = 6

export function Hotels() {
  const { t, lang } = useLang()
  const ref = useFadeIn()

  return (
    <section
      id="hotels"
      aria-labelledby="hotels-heading"
      className="bg-cream py-20 md:py-28"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div ref={ref} className="text-center mb-12">
          <p className="section-label text-blue-muted mb-3">{t('hotels_label')}</p>
          <h2 id="hotels-heading" className="font-script italic text-4xl md:text-5xl text-navy">
            {t('hotels_title')}
          </h2>
          <FloralDivider className="mx-auto mt-4" color="#697C9F" />
          <p className="text-navy/60 text-sm mt-4 max-w-md mx-auto">{t('hotels_intro')}</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {HOTELS.map((hotel) => (
            <article key={hotel.name} className="bg-white border border-blue-accent/20 p-6">
              <h3 className="font-script italic text-xl text-navy mb-1">{hotel.name}</h3>
              <p className="text-xs tracking-widest uppercase text-blue-muted mb-3">
                {t('hotels_distance')}: {hotel.distance}
              </p>
              <p className="text-navy/65 text-sm leading-relaxed mb-4">
                {hotel.note[lang] || hotel.note.de}
              </p>
              <a
                href={hotel.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${hotel.name} — ${t('hotels_book_aria')}`}
                className="text-xs tracking-widest uppercase text-blue-accent hover:text-navy transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-accent"
              >
                {t('hotels_book')} ↗
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function FAQ() {
  const { t } = useLang()
  const ref = useFadeIn()
  const [open, setOpen] = useState(null)

  const toggle = (i) => setOpen(open === i ? null : i)

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="bg-navy text-cream py-20 md:py-28"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div ref={ref} className="text-center mb-12">
          <p className="section-label text-cream/50 mb-3">{t('faq_label')}</p>
          <h2 id="faq-heading" className="font-script italic text-4xl md:text-5xl text-cream">
            {t('faq_title')}
          </h2>
          <FloralDivider className="mx-auto mt-4" color="#EFEEF5" />
        </div>

        <dl className="flex flex-col gap-1">
          {Array.from({ length: FAQ_COUNT }, (_, i) => i + 1).map((n) => {
            const isOpen = open === n
            const questionId = `faq-q-${n}`
            const answerId = `faq-a-${n}`
            return (
              <div key={n} className="border border-cream/15">
                <dt>
                  <button
                    id={questionId}
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => toggle(n)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left text-sm text-cream/85 hover:text-cream transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-cream/60"
                  >
                    <span>{t(`faq_${n}_q`)}</span>
                    <span
                      className={`ml-4 flex-shrink-0 text-blue-accent transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </button>
                </dt>
                <dd
                  id={answerId}
                  role="region"
                  aria-labelledby={questionId}
                  hidden={!isOpen}
                  className="px-6 pb-4 text-sm text-cream/65 leading-relaxed"
                >
                  {t(`faq_${n}_a`)}
                </dd>
              </div>
            )
          })}
        </dl>
      </div>
    </section>
  )
}

export function Contact() {
  const { t } = useLang()
  const ref = useFadeIn()

  const witnesses = [
    {
      role: 'Trauzeugin',
      name: 'Sophie Müller',
      phone: '+49 151 12345678',
      email: 'sophie@beispiel.de',
    },
    {
      role: 'Trauzeuge',
      name: 'Felix Wagner',
      phone: '+49 151 87654321',
      email: 'felix@beispiel.de',
    },
  ]

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-white py-20 md:py-28"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div ref={ref} className="text-center mb-12">
          <FloralSmall className="mx-auto mb-4" color="#697C9F" />
          <p className="section-label text-blue-muted mb-3">{t('contact_label')}</p>
          <h2 id="contact-heading" className="font-script italic text-4xl md:text-5xl text-navy">
            {t('contact_title')}
          </h2>
          <FloralDivider className="mx-auto mt-4" color="#697C9F" />
          <p className="text-navy/60 text-sm mt-4">{t('contact_intro')}</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {witnesses.map((w) => (
            <article key={w.name} className="border border-blue-accent/20 p-6 sm:p-8 text-center">
              <p className="section-label text-blue-muted mb-2">{w.role}</p>
              <h3 className="font-script italic text-2xl text-navy mb-4">{w.name}</h3>
              <div className="flex flex-col gap-2">
                <a
                  href={`tel:${w.phone.replace(/\s/g, '')}`}
                  className="text-sm text-navy/65 hover:text-blue-accent transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-accent"
                  aria-label={`${t('contact_phone')}: ${w.phone}`}
                >
                  {t('contact_phone')}: {w.phone}
                </a>
                <a
                  href={`mailto:${w.email}`}
                  className="text-sm text-navy/65 hover:text-blue-accent transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-accent"
                  aria-label={`${t('contact_email')}: ${w.email}`}
                >
                  {w.email}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
