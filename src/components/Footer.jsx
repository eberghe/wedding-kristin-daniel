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
        <p className="section-label text-cream/40 mb-4">26 · 08 · 2026</p>
        <h2 className="font-script italic text-5xl md:text-7xl text-cream leading-tight">
          Kristin
          <span className="block text-3xl md:text-4xl text-blue-accent py-2">&</span>
          Daniel
        </h2>
        <FloralDivider className="mx-auto my-6" color="#EFEEF5" />
        <p className="text-cream/40 text-xs tracking-widest uppercase">
          {t('footer_made')}
        </p>
      </div>
    </footer>
  )
}
