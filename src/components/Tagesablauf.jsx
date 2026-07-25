import { useLang } from '../i18n'
import { FloralDivider } from './Florals'
import { useFadeIn } from '../hooks/useFadeIn'

function DoorIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 21h18"/>
      <path d="M9 21V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v16"/>
      <circle cx="14.5" cy="13" r="0.8" fill="currentColor" stroke="none"/>
    </svg>
  )
}

function RingsIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="13" r="5"/>
      <circle cx="15" cy="13" r="5"/>
      <path d="M12 8.5a5 5 0 0 1 3.5 1.5"/>
      <path d="M9 8a5 5 0 0 1 2 1"/>
    </svg>
  )
}

function ChampaignIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 3h8l-2 10h-4L8 3Z"/>
      <line x1="12" y1="13" x2="12" y2="21"/>
      <line x1="8" y1="21" x2="16" y2="21"/>
      <circle cx="17" cy="4" r="0.8" fill="currentColor" stroke="none"/>
      <circle cx="19" cy="2.5" r="0.6" fill="currentColor" stroke="none"/>
    </svg>
  )
}

function CakeIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 21H4a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1Z"/>
      <path d="M21 16H3v-3a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v3Z"/>
      <line x1="12" y1="9" x2="12" y2="5"/>
      <path d="M10 5c0-1.1 1-2 2-2s2 .9 2 2"/>
    </svg>
  )
}

function CameraIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
      <circle cx="12" cy="13" r="4"/>
    </svg>
  )
}

function DinnerIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="14" r="8"/>
      <line x1="12" y1="2" x2="12" y2="6"/>
      <path d="M8 2v3c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
    </svg>
  )
}

function PartyIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 18V5l12-2v13"/>
      <circle cx="6" cy="18" r="3"/>
      <circle cx="18" cy="16" r="3"/>
    </svg>
  )
}

const STEPS = [
  { key: 'einlass',  Icon: DoorIcon      },
  { key: 'ceremony', Icon: RingsIcon     },
  { key: 'drinks',   Icon: ChampaignIcon },
  { key: 'cake',     Icon: CakeIcon      },
  { key: 'photos',   Icon: CameraIcon    },
  { key: 'dinner',   Icon: DinnerIcon    },
  { key: 'party',    Icon: PartyIcon     },
]

export default function Tagesablauf() {
  const { t } = useLang()
  const ref = useFadeIn()

  return (
    <section id="tagesablauf" aria-labelledby="tagesablauf-heading" className="bg-navy text-cream py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div ref={ref} className="text-center mb-16">
          <p className="section-label text-cream/50 mb-3">{t('tagesablauf_label')}</p>
          <h2 id="tagesablauf-heading" className="font-script text-4xl md:text-5xl text-cream">
            {t('tagesablauf_title')}
          </h2>
          <FloralDivider className="mx-auto mt-4" color="#EFEEF5CC" />
        </div>

        {/* Steps — wrap on mobile, single row on lg */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-10 sm:gap-x-8 lg:flex-nowrap lg:gap-x-0 lg:justify-between">
          {STEPS.map(({ key, Icon }, i) => (
            <div
              key={key}
              className="flex flex-col items-center gap-4 w-36 sm:w-40 lg:flex-1 lg:w-auto"
            >
              {/* Icon */}
              <div className="w-20 h-20 rounded-full border border-cream/20 flex items-center justify-center text-cream/75 bg-cream/5">
                <Icon />
              </div>

              {/* Label */}
              <div className="text-center space-y-1.5 px-1">
                <p className={`text-sm sm:text-base leading-snug ${key === 'einlass' || key === 'ceremony' ? 'text-cream font-semibold' : 'text-cream/75'}`}>
                  {t(`tagesablauf_${key}`)}
                </p>
                {key === 'einlass' && (
                  <p className="text-xs text-cream/40 leading-snug">
                    {t('tagesablauf_einlass_sub')}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-cream/35 text-xs tracking-widest uppercase mt-14">
          {t('tagesablauf_note')}
        </p>
      </div>
    </section>
  )
}
