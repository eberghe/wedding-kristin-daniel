import { useLang } from '../i18n'
import { FloralDivider } from './Florals'
import { useFadeIn } from '../hooks/useFadeIn'

function DoorIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 21h18"/>
      <path d="M9 21V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v16"/>
      <circle cx="14.5" cy="13" r="0.8" fill="currentColor" stroke="none"/>
    </svg>
  )
}

function RingsIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="13" r="5"/>
      <circle cx="15" cy="13" r="5"/>
      <path d="M12 8.5a5 5 0 0 1 3.5 1.5"/>
      <path d="M9 8a5 5 0 0 1 2 1"/>
    </svg>
  )
}

function ChampaignIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 3h8l-2 10h-4L8 3Z"/>
      <line x1="12" y1="13" x2="12" y2="21"/>
      <line x1="8" y1="21" x2="16" y2="21"/>
      <circle cx="17" cy="4" r="0.7" fill="currentColor" stroke="none"/>
      <circle cx="19" cy="2.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  )
}

function CakeIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 21H4a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1Z"/>
      <path d="M21 16H3v-3a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v3Z"/>
      <line x1="12" y1="9" x2="12" y2="5"/>
      <path d="M10 5c0-1.1 1-2 2-2s2 .9 2 2"/>
    </svg>
  )
}

function CameraIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
      <circle cx="12" cy="13" r="4"/>
    </svg>
  )
}

function DinnerIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="14" r="8"/>
      <line x1="12" y1="2" x2="12" y2="6"/>
      <path d="M8 2v3c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
    </svg>
  )
}

function PartyIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 18V5l12-2v13"/>
      <circle cx="6" cy="18" r="3"/>
      <circle cx="18" cy="16" r="3"/>
    </svg>
  )
}

const STEPS = [
  { key: 'einlass',   Icon: DoorIcon,      hasTime: true  },
  { key: 'ceremony',  Icon: RingsIcon,     hasTime: true  },
  { key: 'drinks',    Icon: ChampaignIcon, hasTime: false },
  { key: 'cake',      Icon: CakeIcon,      hasTime: false },
  { key: 'photos',    Icon: CameraIcon,    hasTime: false },
  { key: 'dinner',    Icon: DinnerIcon,    hasTime: false },
  { key: 'party',     Icon: PartyIcon,     hasTime: false },
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

        {/* Horizontal steps — scrollable on mobile */}
        <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 pb-4">
          <div className="flex items-start min-w-max sm:min-w-0 sm:justify-center gap-0 mx-auto">
            {STEPS.map(({ key, Icon, hasTime }, i) => (
              <div key={key} className="flex items-start">
                {/* Step */}
                <div className="flex flex-col items-center gap-3 w-28 sm:w-32">
                  {/* Icon circle */}
                  <div className="w-14 h-14 rounded-full border border-cream/25 flex items-center justify-center text-cream/80 bg-cream/5 flex-shrink-0">
                    <Icon />
                  </div>
                  {/* Label */}
                  <div className="text-center px-1">
                    <p className={`text-xs leading-snug ${hasTime ? 'text-cream font-semibold' : 'text-cream/75'}`}>
                      {t(`tagesablauf_${key}`)}
                    </p>
                    {key === 'einlass' && (
                      <p className="text-[10px] text-cream/45 mt-1 leading-snug">
                        {t('tagesablauf_einlass_sub')}
                      </p>
                    )}
                  </div>
                </div>

                {/* Arrow */}
                {i < STEPS.length - 1 && (
                  <div className="flex items-center mt-6 px-1 text-cream/20 flex-shrink-0" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 6l6 6-6 6"/>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-cream/35 text-xs tracking-widest uppercase mt-10">
          {t('tagesablauf_note')}
        </p>
      </div>
    </section>
  )
}
