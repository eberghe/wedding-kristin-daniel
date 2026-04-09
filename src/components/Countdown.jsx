import { useState, useEffect } from 'react'
import { useLang } from '../i18n'

const WEDDING_DATE = new Date('2028-08-26T14:00:00')

function getTimeLeft() {
  const now = new Date()
  const diff = WEDDING_DATE - now
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

function pad(n) { return String(n).padStart(2, '0') }

export default function Countdown() {
  const { t } = useLang()
  const [time, setTime] = useState(getTimeLeft())

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  const units = [
    { value: time.days, label: t('countdown_days') },
    { value: time.hours, label: t('countdown_hours') },
    { value: time.minutes, label: t('countdown_minutes') },
    { value: time.seconds, label: t('countdown_seconds') },
  ]

  return (
    <div
      role="timer"
      aria-label={t('countdown_label')}
      aria-live="off"
      className="flex gap-4 sm:gap-8 justify-center items-end"
    >
      {units.map(({ value, label }, i) => (
        <div key={label} className="flex flex-col items-center">
          <span
            className="font-script italic text-3xl sm:text-4xl md:text-5xl text-navy leading-none"
            aria-label={`${value} ${label}`}
          >
            {pad(value)}
          </span>
          <span className="text-[10px] tracking-widest uppercase text-blue-muted mt-1">
            {label}
          </span>
          {i < units.length - 1 && (
            <span className="absolute" aria-hidden="true" />
          )}
        </div>
      ))}
    </div>
  )
}
