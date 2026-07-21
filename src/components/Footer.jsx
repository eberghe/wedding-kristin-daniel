import { useState, useEffect, useRef } from 'react'
import { useLang } from '../i18n'
import { FloralDivider } from './Florals'
import PhotoSlot from './PhotoSlot'

export default function Footer() {
  const { t } = useLang()
  const footerRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 }
    )
    if (footerRef.current) observer.observe(footerRef.current)
    return () => observer.disconnect()
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer ref={footerRef} className="relative bg-navy text-cream overflow-hidden" role="contentinfo">
      {/* <!-- Replace with actual couple photo: footer background --> */}
      <PhotoSlot
        slot="footer"
        alt=""
        className="absolute inset-0 w-full h-full opacity-20"
      />
      <div className="relative z-10 py-20 md:py-28 text-center px-4">
        <img
          src="/images/k-d_logo.svg"
          alt="Kristin & Daniel"
          className="mx-auto mb-8 w-40 md:w-56"
          style={{ filter: 'brightness(0) invert(1)', opacity: 0.9 }}
        />
        <p className="section-label text-cream/40 mb-4">13 · 08 · 2027</p>
        <FloralDivider className="mx-auto my-6" color="#EFEEF5" />
        <p className="text-cream/40 text-xs tracking-widest uppercase">
          {t('footer_made')}
        </p>

        <button
          onClick={scrollToTop}
          aria-label="Nach oben scrollen"
          className={`mt-12 mx-auto flex flex-col items-center gap-2 text-cream/40 hover:text-cream/80 transition-all duration-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream/50 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 19V5M5 12l7-7 7 7"/>
          </svg>
          <span className="text-[9px] tracking-[0.3em] uppercase">Nach oben</span>
        </button>
      </div>
    </footer>
  )
}
