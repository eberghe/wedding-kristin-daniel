import { useLang } from '../i18n'
import { FloralDivider } from './Florals'
import PhotoSlot from './PhotoSlot'

export default function Footer() {
  const { t } = useLang()

  return (
    <footer className="relative bg-navy text-cream overflow-hidden" role="contentinfo">
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
      </div>
    </footer>
  )
}
