import { useState } from 'react'
import { useLang } from '../i18n'
import { FloralDivider, FloralSmall } from './Florals'
import { useFadeIn } from '../hooks/useFadeIn'
import PhotoSlot from './PhotoSlot'

const HOTELS = [
  // Hotels — sorted by distance
  { cat: 'hotel',    name: 'Arivo Aparthotel',              address: 'Bayreuther Straße 1, 91301 Forchheim',              url: 'https://www.arivo.de/',                                              distance: 4  },
  { cat: 'hotel',    name: 'The Niu Hop',                   address: 'Bahnhofplatz 10, 91301 Forchheim',                  url: 'https://www.novum-hotels.com/hotel-hop-forchheim',    distance: 5, badge: { de: 'Größtes Hotel im Landkreis', en: 'Largest hotel in the district' } },
  { cat: 'gasthaus', name: 'Brauerei Gasthof Pfister',      address: 'Eggerbachstraße 22, 91330 Eggolsheim',              url: 'http://www.gasthof-pfister.de/',      phone: '09545 94260',          distance: 6  },
  { cat: 'hotel',    name: 'Hotel Franken',                  address: 'Ziegeleistraße 17, 91301 Forchheim',                url: 'http://www.hotelfranken.de/',         phone: '09191 6240',           distance: 7  },
  { cat: 'hotel',    name: 'Landhotel Schloss Buttenheim',  address: 'Schloßstraße 16, 96155 Buttenheim',                 url: 'http://www.landhotel-buttenheim.de/', phone: '09545 94470',          distance: 8  },
  { cat: 'hotel',    name: 'Landgasthof Zehner',            address: 'Feuersteinstraße 55, 91330 Eggolsheim',             url: 'http://landgasthof-zehner.de/',       phone: '09545 950264',         distance: 9  },
  { cat: 'gasthaus', name: 'Landgasthof Rittmayer',         address: 'Willersdorf 108, 91352 Hallerndorf',                url: 'http://www.rittmayer.com/',           phone: '09195 94730',          distance: 11 },
  { cat: 'hotel',    name: 'Brauerei Gasthof Schwanenbräu', address: 'Am Marktplatz 2, 91320 Ebermannstadt',              url: 'http://www.schwanenbraeu.de',                                        distance: 11 },
  { cat: 'hotel',    name: 'Center Hotel Drive In',         address: 'Industriestraße 19, 96114 Hirschaid',               url: 'http://www.centerhotels.de/hirschaid/', phone: '09543 8260',          distance: 12 },
  { cat: 'hotel',    name: 'Hotel Göller',                  address: 'Nürnberger Straße 96–100, 96114 Hirschaid',         url: 'http://www.hotel-goeller.de/de',      phone: '09543 8240',           distance: 12 },
  { cat: 'gasthaus', name: 'Landgasthof Schrüfer',          address: 'Hauptstraße 27, 91361 Pinzberg',                    url: 'http://www.landgasthof-schruefer.de/', phone: '09191 70970',         distance: 15 },
  { cat: 'hotel',    name: 'Hotel Schuberths am Schloss',   address: 'Schloßstraße 18, 96155 Buttenheim',                 url: 'http://www.hotel-buttenheim.de/',     phone: '0179 5557249',         distance: null },
]

const INITIAL_SHOW = 6

const FAQ_COUNT = 7

const WITNESS_TABS = [
  {
    person: 'Kristin',
    witnesses: [
      { roleKey: 'contact_role_moh', name: 'Nadine Goodluck',    phone: '0176 56912013', slot: 'witness_k1' },
      { roleKey: 'contact_role_moh', name: 'Lena Rollbühler',    phone: '0175 6705709',  slot: 'witness_k2' },
    ],
  },
  {
    person: 'Daniel',
    witnesses: [
      { roleKey: 'contact_role_bm',  name: 'Stephan Weigl-Köthe', phone: '0152 03401586', slot: 'witness_d1' },
      { roleKey: 'contact_role_moh', name: 'Hanna Schrüfer',       phone: '0176 23883207', slot: 'witness_d2' },
    ],
  },
]

export function Hotels() {
  const { t, lang } = useLang()
  const ref = useFadeIn()
  const [filter, setFilter] = useState('all') // 'all' | 'hotel' | 'gasthaus'
  const [expanded, setExpanded] = useState(false)

  const filtered = filter === 'all' ? HOTELS : HOTELS.filter(h => h.cat === filter)
  const visible = expanded ? filtered : filtered.slice(0, INITIAL_SHOW)
  const hiddenCount = filtered.length - INITIAL_SHOW

  const FILTERS = [
    { key: 'all',      label: t('hotels_filter_all') },
    { key: 'hotel',    label: t('hotels_filter_hotel') },
    { key: 'gasthaus', label: t('hotels_filter_gasthaus') },
  ]

  const handleFilter = (key) => {
    setFilter(key)
    setExpanded(false)
  }

  return (
    <section
      id="hotels"
      aria-labelledby="hotels-heading"
      className="bg-cream-light py-20 md:py-28"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div ref={ref} className="text-center mb-10">
          <p className="section-label text-blue-muted mb-3">{t('hotels_label')}</p>
          <h2 id="hotels-heading" className="font-script text-4xl md:text-5xl text-navy">
            {t('hotels_title')}
          </h2>
          <FloralDivider className="mx-auto mt-4" color="#5C7A5C" />
          <p className="text-navy/60 text-base mt-4 max-w-md mx-auto">{t('hotels_intro')}</p>
        </div>

        {/* Filter tabs */}
        <div className="flex justify-center gap-2 mb-8" role="group" aria-label="Filter">
          {FILTERS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => handleFilter(key)}
              aria-pressed={filter === key}
              className={`text-xs tracking-widest uppercase px-4 py-2 border transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-accent ${
                filter === key
                  ? 'bg-navy text-cream border-navy'
                  : 'border-navy/20 text-navy/60 hover:border-navy/40 hover:text-navy'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visible.map((hotel) => (
            <article key={hotel.name} className="border border-blue-accent/20 bg-white p-5 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-script text-2xl text-navy leading-tight">{hotel.name}</h3>
                {hotel.distance != null && (
                  <span className="flex-shrink-0 text-[10px] tracking-widest uppercase text-blue-muted border border-blue-accent/20 px-2 py-0.5 mt-1">
                    {hotel.distance} km
                  </span>
                )}
              </div>

              {hotel.badge && (
                <p className="text-[10px] tracking-widest uppercase text-blue-accent">
                  {hotel.badge[lang] || hotel.badge.de}
                </p>
              )}

              <p className="text-navy/55 text-sm leading-relaxed flex-1">{hotel.address}</p>

              {hotel.phone && (
                <a
                  href={`tel:${hotel.phone.replace(/\s/g, '')}`}
                  className="text-sm text-navy/50 hover:text-blue-accent transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-accent"
                >
                  {t('hotels_phone')} {hotel.phone}
                </a>
              )}

              <a
                href={hotel.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${hotel.name} — ${t('hotels_book_aria')}`}
                className="self-start text-xs tracking-widest uppercase text-blue-accent hover:text-navy border border-blue-accent/40 hover:border-navy/40 px-3 py-1.5 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-accent"
              >
                {t('hotels_book')} ↗
              </a>
            </article>
          ))}
        </div>

        {/* Show more / less */}
        {filtered.length > INITIAL_SHOW && (
          <div className="text-center mt-8">
            <button
              onClick={() => setExpanded(e => !e)}
              className="text-xs tracking-widest uppercase border border-navy/20 text-navy/60 px-6 py-2.5 hover:bg-navy/5 hover:text-navy transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-accent"
            >
              {expanded
                ? t('hotels_show_less')
                : `${t('hotels_show_more')} (${hiddenCount})`}
            </button>
          </div>
        )}

        {/* Castle rooms highlight */}
        <div className="mt-10 border border-blue-accent/25 bg-blue-accent/5 px-6 py-4 max-w-xl mx-auto text-center">
          <p className="text-sm text-navy/75 leading-relaxed">{t('hotels_castle')}</p>
        </div>

        {/* Note */}
        <p className="text-center text-navy/45 text-xs leading-relaxed mt-6 max-w-lg mx-auto">
          {t('hotels_note')}{' '}
          <a
            href="http://www.forchheim-erleben.de/de/gastgeber/unterkunftsverzeichnis"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-blue-accent transition-colors duration-200"
          >
            {t('hotels_note_link')}
          </a>
          .
        </p>
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
          <h2 id="faq-heading" className="font-script text-4xl md:text-5xl text-cream">
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
                    className="w-full flex items-center justify-between px-6 py-4 text-left text-base text-cream/85 hover:text-cream transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-cream/60"
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
                  className="px-6 pb-4 text-base text-cream/65 leading-relaxed"
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

function WitnessCard({ w, t }) {
  return (
    <article className="border border-blue-accent/20 p-5 sm:p-6 text-center bg-white/60 flex flex-col items-center">
      <PhotoSlot
        slot={w.slot}
        alt={w.name}
        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto mb-4 overflow-hidden"
      />
      <p className="section-label text-blue-muted mb-2">{t(w.roleKey)}</p>
      <h3 className="font-display text-base sm:text-lg text-navy mb-3 leading-snug">{w.name}</h3>
      <a
        href={`tel:${w.phone.replace(/\s/g, '')}`}
        className="text-sm text-navy/65 hover:text-blue-accent transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-accent"
        aria-label={`${t('contact_phone')}: ${w.phone}`}
      >
        {w.phone}
      </a>
      {w.email && (
        <a
          href={`mailto:${w.email}`}
          className="text-sm text-navy/65 hover:text-blue-accent transition-colors duration-200 mt-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-accent"
          aria-label={`${t('contact_email')}: ${w.email}`}
        >
          {w.email}
        </a>
      )}
    </article>
  )
}

function GroupHeading({ person }) {
  return (
    <div className="text-center pb-1">
      <p className="font-script text-3xl text-navy mb-2">{person}</p>
      <FloralDivider className="w-full" color="#5C7A5C" />
    </div>
  )
}

export function Contact() {
  const { t } = useLang()
  const ref = useFadeIn()

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-cream-light py-20 md:py-28"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div ref={ref} className="text-center mb-14">
          <FloralSmall className="mx-auto mb-4" color="#5C7A5C" />
          <p className="section-label text-blue-muted mb-3">{t('contact_label')}</p>
          <h2 id="contact-heading" className="font-script text-4xl md:text-5xl text-navy">
            {t('contact_title')}
          </h2>
          <FloralDivider className="mx-auto mt-4" color="#5C7A5C" />
          <p className="text-navy/60 text-base mt-4">{t('contact_intro')}</p>
        </div>

        {/* Mobile / tablet: two stacked groups */}
        <div className="lg:hidden flex flex-col gap-10">
          {WITNESS_TABS.map((tab) => (
            <div key={tab.person}>
              <GroupHeading person={tab.person} />
              <div className="grid grid-cols-2 gap-4 mt-6">
                {tab.witnesses.map((w) => <WitnessCard key={w.slot} w={w} t={t} />)}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: Kristin left, Daniel right, gap in middle */}
        <div className="hidden lg:flex lg:gap-12">
          {WITNESS_TABS.map((tab) => (
            <div key={tab.person} className="flex-1">
              <GroupHeading person={tab.person} />
              <div className="grid grid-cols-2 gap-5 mt-6">
                {tab.witnesses.map((w) => <WitnessCard key={w.slot} w={w} t={t} />)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
