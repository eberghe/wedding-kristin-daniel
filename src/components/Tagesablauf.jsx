import { useLang } from '../i18n'
import { FloralDivider } from './Florals'
import { useFadeIn } from '../hooks/useFadeIn'

function RingsIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="18" cy="26" r="10"/>
      <circle cx="30" cy="26" r="10"/>
      <path d="M22 18.5a10 10 0 0 1 8 0"/>
      <path d="M18 16a10 10 0 0 1 4.5 2"/>
    </svg>
  )
}

function ChampaignIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 8h12l-3 18H21L18 8Z"/>
      <line x1="24" y1="26" x2="24" y2="38"/>
      <line x1="18" y1="38" x2="30" y2="38"/>
      <path d="M15 11c1-1 3-1 4 0"/>
      <circle cx="33" cy="9" r="1" fill="currentColor"/>
      <circle cx="36" cy="6" r="0.8" fill="currentColor"/>
    </svg>
  )
}

function CakeIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="10" y="28" width="28" height="12" rx="1"/>
      <rect x="14" y="20" width="20" height="8"/>
      <rect x="17" y="14" width="14" height="6"/>
      <line x1="24" y1="14" x2="24" y2="10"/>
      <path d="M22 10c0-2 4-2 4 0"/>
    </svg>
  )
}

function DinnerIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="24" cy="26" r="13"/>
      <circle cx="24" cy="26" r="8"/>
      <line x1="15" y1="10" x2="15" y2="18"/>
      <line x1="33" y1="10" x2="33" y2="18"/>
      <path d="M12 10c0 4 6 4 6 8"/>
      <path d="M31 10v5a2 2 0 0 0 4 0v-5"/>
    </svg>
  )
}

function PartyIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 8h8l-2 16h-4L20 8Z"/>
      <path d="M28 8h8l-2 16h-4L28 8Z"/>
      <line x1="24" y1="24" x2="24" y2="36"/>
      <line x1="20" y1="24" x2="28" y2="24"/>
      <line x1="18" y1="36" x2="30" y2="36"/>
      <circle cx="14" cy="10" r="1.5" fill="currentColor"/>
      <circle cx="11" cy="14" r="1" fill="currentColor"/>
      <circle cx="35" cy="8" r="1" fill="currentColor"/>
    </svg>
  )
}

function CarIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 28h32v8H8z"/>
      <path d="M12 28l4-10h16l4 10"/>
      <circle cx="14" cy="36" r="3"/>
      <circle cx="34" cy="36" r="3"/>
      <path d="M20 18h8"/>
      <path d="M24 10c-2 0-3 1-4 3"/>
      <path d="M24 10c2 0 3 1 4 3"/>
      <path d="M22 7c0-2 4-2 4 0"/>
    </svg>
  )
}

const ITEMS = [
  { key: 'ceremony', time: '13:00', Icon: RingsIcon },
  { key: 'drinks',   time: '14:00', Icon: ChampaignIcon },
  { key: 'cake',     time: '16:00', Icon: CakeIcon },
  { key: 'dinner',   time: '18:00', Icon: DinnerIcon },
  { key: 'party',    time: '20:00', Icon: PartyIcon },
  { key: 'end',      time: '00:00', Icon: CarIcon },
]

export default function Tagesablauf() {
  const { t } = useLang()
  const ref = useFadeIn()

  return (
    <section id="tagesablauf" aria-labelledby="tagesablauf-heading" className="bg-navy text-cream py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div ref={ref} className="text-center mb-14">
          <p className="section-label text-cream/50 mb-3">{t('tagesablauf_label')}</p>
          <h2 id="tagesablauf-heading" className="font-script text-4xl md:text-5xl text-cream">
            {t('tagesablauf_title')}
          </h2>
          <FloralDivider className="mx-auto mt-4" color="#EFEEF5CC" />
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-4">
          {ITEMS.map(({ key, time, Icon }) => (
            <div key={key} className="flex flex-col items-center text-center gap-3">
              <div className="text-blue-accent/70">
                <Icon />
              </div>
              <p className="text-xs tracking-[0.2em] text-cream/50">{time}</p>
              <p className="font-script text-2xl text-cream leading-tight">{t(`tagesablauf_${key}`)}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-cream/35 text-xs tracking-wider mt-14 italic">
          {t('tagesablauf_note')}
        </p>
      </div>
    </section>
  )
}
