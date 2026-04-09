import { useState, useEffect, useRef } from 'react'
import { useLang } from '../i18n'

const NAV_ITEMS = [
  { key: 'nav_home', href: '#home' },
  { key: 'nav_location', href: '#location' },
  { key: 'nav_rsvp', href: '#rsvp' },
  { key: 'nav_gifts', href: '#gifts' },
  { key: 'nav_dresscode', href: '#dresscode' },
  { key: 'nav_hotels', href: '#hotels' },
  { key: 'nav_faq', href: '#faq' },
  { key: 'nav_contact', href: '#contact' },
]

export default function Nav() {
  const { lang, switchLang, t } = useLang()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuRef = useRef(null)
  const hamburgerRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target) &&
          hamburgerRef.current && !hamburgerRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [menuOpen])

  // Trap focus in mobile menu
  useEffect(() => {
    if (!menuOpen || !menuRef.current) return
    const focusables = menuRef.current.querySelectorAll('a, button')
    if (focusables.length) focusables[0].focus()
    const handleKey = (e) => {
      if (e.key === 'Escape') { setMenuOpen(false); hamburgerRef.current?.focus() }
      if (e.key === 'Tab') {
        const first = focusables[0], last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [menuOpen])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
      role="banner"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo / Name */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="font-script italic text-xl text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-accent"
            aria-label="Kristin & Daniel — zurück zur Startseite"
          >
            K & D
          </a>

          {/* Desktop nav */}
          <nav aria-label={t('nav_aria')} className="hidden lg:flex items-center gap-6">
            {NAV_ITEMS.map(({ key, href }) => (
              <a
                key={key}
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                className="text-xs tracking-widest uppercase text-navy/70 hover:text-navy transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-accent"
              >
                {t(key)}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* Language switcher */}
            <div role="group" aria-label="Sprache / Language" className="flex gap-1">
              <button
                onClick={() => switchLang('de')}
                aria-pressed={lang === 'de'}
                aria-label="Deutsch"
                className={`px-2 py-1 text-xs border transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-blue-accent ${
                  lang === 'de'
                    ? 'bg-blue-accent text-white border-blue-accent'
                    : 'border-navy/20 text-navy/60 hover:border-blue-accent'
                }`}
              >
                🇩🇪
              </button>
              <button
                onClick={() => switchLang('en')}
                aria-pressed={lang === 'en'}
                aria-label="English"
                className={`px-2 py-1 text-xs border transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-blue-accent ${
                  lang === 'en'
                    ? 'bg-blue-accent text-white border-blue-accent'
                    : 'border-navy/20 text-navy/60 hover:border-blue-accent'
                }`}
              >
                🇬🇧
              </button>
            </div>

            {/* Hamburger - mobile */}
            <button
              ref={hamburgerRef}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
              className="lg:hidden flex flex-col gap-1.5 p-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-accent"
            >
              <span className={`block h-px w-5 bg-navy transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-px w-5 bg-navy transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-px w-5 bg-navy transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label={t('nav_aria')}
          className="lg:hidden bg-white/98 backdrop-blur-sm border-t border-navy/10"
        >
          <nav className="flex flex-col py-4 px-6 gap-1">
            {NAV_ITEMS.map(({ key, href }) => (
              <a
                key={key}
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                className="py-3 text-sm tracking-widest uppercase text-navy/70 hover:text-navy border-b border-navy/5 last:border-0 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-accent"
              >
                {t(key)}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
