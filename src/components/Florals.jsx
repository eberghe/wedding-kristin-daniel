// Hortensia / hydrangea inspired floral SVG decorations

export function FloralCorner({ className = '', color = '#697C9F', size = 120 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* Main stem */}
      <path d="M10 110 Q30 80 60 60 Q80 45 110 10" stroke={color} strokeWidth="0.8" strokeOpacity="0.5" fill="none"/>
      {/* Branch 1 */}
      <path d="M35 85 Q45 65 65 55" stroke={color} strokeWidth="0.6" strokeOpacity="0.4" fill="none"/>
      {/* Branch 2 */}
      <path d="M55 65 Q70 50 85 35" stroke={color} strokeWidth="0.6" strokeOpacity="0.4" fill="none"/>
      {/* Flower cluster 1 - top right */}
      <circle cx="105" cy="15" r="2.5" fill={color} fillOpacity="0.35"/>
      <circle cx="112" cy="10" r="2" fill={color} fillOpacity="0.25"/>
      <circle cx="98" cy="10" r="2" fill={color} fillOpacity="0.25"/>
      <circle cx="105" cy="6" r="2" fill={color} fillOpacity="0.25"/>
      <circle cx="110" cy="18" r="1.5" fill={color} fillOpacity="0.2"/>
      <circle cx="100" cy="20" r="1.5" fill={color} fillOpacity="0.2"/>
      {/* Flower cluster 2 - middle */}
      <circle cx="68" cy="52" r="2.2" fill={color} fillOpacity="0.3"/>
      <circle cx="74" cy="47" r="1.8" fill={color} fillOpacity="0.2"/>
      <circle cx="62" cy="46" r="1.8" fill={color} fillOpacity="0.2"/>
      <circle cx="68" cy="43" r="1.8" fill={color} fillOpacity="0.2"/>
      <circle cx="74" cy="55" r="1.5" fill={color} fillOpacity="0.15"/>
      {/* Flower cluster 3 - bottom left */}
      <circle cx="30" cy="88" r="2" fill={color} fillOpacity="0.28"/>
      <circle cx="36" cy="83" r="1.6" fill={color} fillOpacity="0.2"/>
      <circle cx="24" cy="83" r="1.6" fill={color} fillOpacity="0.2"/>
      <circle cx="30" cy="79" r="1.6" fill={color} fillOpacity="0.2"/>
      {/* Leaves */}
      <path d="M55 68 Q48 58 55 50 Q60 60 55 68Z" fill={color} fillOpacity="0.15"/>
      <path d="M75 48 Q85 42 90 50 Q80 54 75 48Z" fill={color} fillOpacity="0.12"/>
      <path d="M28 92 Q20 88 22 80 Q30 84 28 92Z" fill={color} fillOpacity="0.12"/>
    </svg>
  )
}

export function FloralDivider({ className = '', color = '#697C9F' }) {
  return (
    <svg
      width="200"
      height="30"
      viewBox="0 0 200 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <line x1="0" y1="15" x2="75" y2="15" stroke={color} strokeWidth="0.7" strokeOpacity="0.4"/>
      <line x1="125" y1="15" x2="200" y2="15" stroke={color} strokeWidth="0.7" strokeOpacity="0.4"/>
      {/* Center flower */}
      <circle cx="100" cy="15" r="3" fill={color} fillOpacity="0.4"/>
      <circle cx="92" cy="12" r="2" fill={color} fillOpacity="0.28"/>
      <circle cx="108" cy="12" r="2" fill={color} fillOpacity="0.28"/>
      <circle cx="92" cy="18" r="2" fill={color} fillOpacity="0.28"/>
      <circle cx="108" cy="18" r="2" fill={color} fillOpacity="0.28"/>
      <circle cx="100" cy="8" r="2" fill={color} fillOpacity="0.28"/>
      <circle cx="100" cy="22" r="2" fill={color} fillOpacity="0.28"/>
      {/* Small side accents */}
      <circle cx="82" cy="15" r="1.5" fill={color} fillOpacity="0.22"/>
      <circle cx="118" cy="15" r="1.5" fill={color} fillOpacity="0.22"/>
    </svg>
  )
}

export function FloralSmall({ className = '', color = '#697C9F' }) {
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none"
      xmlns="http://www.w3.org/2000/svg" className={className}
      aria-hidden="true" focusable="false">
      <circle cx="30" cy="30" r="4" fill={color} fillOpacity="0.4"/>
      <circle cx="20" cy="24" r="3" fill={color} fillOpacity="0.28"/>
      <circle cx="40" cy="24" r="3" fill={color} fillOpacity="0.28"/>
      <circle cx="20" cy="36" r="3" fill={color} fillOpacity="0.28"/>
      <circle cx="40" cy="36" r="3" fill={color} fillOpacity="0.28"/>
      <circle cx="30" cy="18" r="3" fill={color} fillOpacity="0.28"/>
      <circle cx="30" cy="42" r="3" fill={color} fillOpacity="0.28"/>
      <circle cx="13" cy="20" r="2" fill={color} fillOpacity="0.18"/>
      <circle cx="47" cy="20" r="2" fill={color} fillOpacity="0.18"/>
      <circle cx="13" cy="40" r="2" fill={color} fillOpacity="0.18"/>
      <circle cx="47" cy="40" r="2" fill={color} fillOpacity="0.18"/>
      <path d="M30 10 Q34 6 38 10 Q34 16 30 10Z" fill={color} fillOpacity="0.15"/>
      <path d="M30 50 Q26 54 22 50 Q26 44 30 50Z" fill={color} fillOpacity="0.15"/>
    </svg>
  )
}
