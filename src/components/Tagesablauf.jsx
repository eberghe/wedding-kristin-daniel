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

const SVG_FILTER = 'brightness(0) invert(1)'

const STEPS = [
  { key: 'einlass',  icon: null,                      inline: DoorIcon },
  { key: 'ceremony', icon: '/images/rings.svg'                          },
  { key: 'drinks',   icon: '/images/glasses.svg'                        },
  { key: 'cake',     icon: '/images/cake.svg'                           },
  { key: 'dinner',   icon: '/images/fork.svg'                           },
  { key: 'party',    icon: '/images/disco.svg'                          },
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

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-10 sm:gap-x-12 lg:flex-nowrap lg:gap-x-0 lg:justify-between">
          {STEPS.map(({ key, icon, inline: Inline }) => (
            <div key={key} className="flex flex-col items-center gap-4 w-36 sm:w-40 lg:flex-1 lg:w-auto">

              {/* Icon */}
              <div className="h-16 flex items-center justify-center text-cream/80">
                {icon ? (
                  <img
                    src={icon}
                    alt=""
                    aria-hidden="true"
                    className="h-16 w-auto"
                    style={{ filter: SVG_FILTER, opacity: 0.8 }}
                  />
                ) : (
                  <Inline />
                )}
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
