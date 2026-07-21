import { useState } from 'react'
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
]

const IBAN = 'DE79500105175825619244'

export default function Gifts() {
  const { t } = useLang()
  const ref = useFadeIn()
  const [copied, setCopied] = useState(false)

  const copyIban = () => {
    navigator.clipboard.writeText(IBAN)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section
      id="gifts"
      aria-labelledby="gifts-heading"
      className="bg-cream-light py-20 md:py-28"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div ref={ref} className="text-center mb-14">
          <p className="section-label text-blue-muted mb-3">{t('gifts_label')}</p>
          <h2 id="gifts-heading" className="font-script text-4xl md:text-5xl text-navy">
            {t('gifts_title')}
          </h2>
          <FloralDivider className="mx-auto my-4" color="#5C7A5C" />
          <p className="text-navy/65 text-base leading-relaxed max-w-lg mx-auto">
            {t('gifts_intro')}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-8 md:gap-12 mb-14 max-w-2xl mx-auto">
          {GIFTS.map(({ key, Icon }) => (
            <div key={key} className="text-center">
              <div className="flex justify-center mb-5 text-blue-accent">
                <Icon />
              </div>
              <h3 className="font-script text-3xl text-navy mb-3">
                {t(`gifts_${key}`)}
              </h3>
              <p className="text-navy/65 text-base leading-relaxed">
                {t(`gifts_${key}_text`)}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-xs tracking-widest uppercase text-navy/50 mb-3">{t('gifts_iban_label')}</p>
          <div className="inline-flex items-center gap-4 border border-navy/20 px-6 py-4 bg-white">
            <span className="font-display text-lg tracking-widest text-navy select-all">{IBAN}</span>
            <button
              onClick={copyIban}
              className="text-xs tracking-widest uppercase text-blue-accent border border-blue-accent/40 px-3 py-1.5 hover:bg-blue-accent/10 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-accent whitespace-nowrap"
            >
              {copied ? t('gifts_iban_copied') : t('gifts_iban_copy')}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
