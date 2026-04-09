import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { supabase } from '../supabase'
import { useLang } from '../i18n'
import { getPhotoUrl } from '../utils/storage'
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts'

const PASSWORD = 'kristindaniel2026'
const COLORS = ['#697C9F', '#2E3D52', '#6E6C83', '#9BA8C0']
const PHOTO_SLOTS = ['hero', 'gifts', 'footer']
const SLIDER_SLOTS = Array.from({ length: 8 }, (_, i) => `slider_${i + 1}`)
const DRESSCODE_SLOTS = ['dresscode_1', 'dresscode_2', 'dresscode_3', 'dresscode_4', 'dresscode_5', 'dresscode_6']
const COLOR_KEYS = ['dresscode_color_1', 'dresscode_color_2', 'dresscode_color_3', 'dresscode_color_4']
const DEFAULT_DRESSCODE_COLORS = ['#697C9F', '#2E3D52', '#6E6C83', '#9BA8C0']

function Login({ onLogin }) {
  const { t } = useLang()
  const [pw, setPw] = useState('')
  const [error, setError] = useState(false)
  const inputRef = useRef(null)
  useEffect(() => { inputRef.current?.focus() }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (pw === PASSWORD) { onLogin() }
    else { setError(true); setPw(''); inputRef.current?.focus() }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="font-script italic text-4xl text-navy text-center mb-2">Kristin & Daniel</h1>
        <p className="text-center text-xs tracking-widest uppercase text-blue-muted mb-8">Admin</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="admin-pw" className="block text-xs tracking-widest uppercase text-navy/60 mb-1.5">
              {t('admin_password')}
            </label>
            <input
              id="admin-pw" ref={inputRef} type="password" value={pw}
              onChange={e => { setPw(e.target.value); setError(false) }}
              autoComplete="current-password"
              aria-invalid={error} aria-describedby={error ? 'pw-error' : undefined}
              className={`w-full border px-4 py-3 text-navy text-sm focus:outline-none transition-colors ${error ? 'border-red-400' : 'border-navy/20 focus:border-blue-accent'}`}
            />
            {error && <p id="pw-error" role="alert" className="text-red-500 text-xs mt-1.5">{t('admin_wrong_pw')}</p>}
          </div>
          <button type="submit" className="w-full bg-navy text-cream py-3 text-xs tracking-widest uppercase hover:bg-navy/80 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-accent">
            {t('admin_login')}
          </button>
        </form>
      </div>
    </div>
  )
}

function Stats({ data, t }) {
  const confirmed = data.filter(r => r.attending).length
  const declined = data.filter(r => !r.attending).length
  const totalGuests = data.filter(r => r.attending).reduce((s, r) => s + 1 + (r.guest_count || 0), 0)

  const rsvpData = [
    { name: t('admin_confirmed'), value: confirmed },
    { name: t('admin_declined'), value: declined },
  ].filter(d => d.value > 0)

  const foodMap = {}
  data.filter(r => r.attending).forEach(r => {
    ;(r.food_preferences || []).forEach(fp => {
      if (fp.food) foodMap[fp.food] = (foodMap[fp.food] || 0) + 1
    })
  })
  const foodData = Object.entries(foodMap).map(([name, value]) => ({ name, value }))

  const cards = [
    { label: t('admin_total_responses'), value: data.length },
    { label: t('admin_confirmed'), value: confirmed },
    { label: t('admin_declined'), value: declined },
    { label: t('admin_total_guests'), value: totalGuests },
  ]

  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map(c => (
          <div key={c.label} className="bg-white border border-navy/10 p-5 text-center">
            <p className="font-script italic text-4xl text-navy">{c.value}</p>
            <p className="text-xs tracking-widest uppercase text-blue-muted mt-1">{c.label}</p>
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white border border-navy/10 p-6">
          <h3 className="text-xs tracking-widest uppercase text-navy/60 mb-4">{t('admin_rsvp_quote')}</h3>
          {rsvpData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={rsvpData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value" paddingAngle={3}>
                  {rsvpData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip /><Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : <p className="text-navy/40 text-sm text-center py-10">{t('admin_no_data')}</p>}
        </div>
        <div className="bg-white border border-navy/10 p-6">
          <h3 className="text-xs tracking-widest uppercase text-navy/60 mb-4">{t('admin_food_dist')}</h3>
          {foodData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={foodData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EFEEF5" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="value" radius={[2,2,0,0]}>
                  {foodData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : <p className="text-navy/40 text-sm text-center py-10">{t('admin_no_data')}</p>}
        </div>
      </div>
    </div>
  )
}

function ConfirmModal({ title, message, confirmLabel, onConfirm, onCancel }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onCancel() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [onCancel])

  return createPortal(
    <div
      className="fixed inset-0 z-[200] bg-black/60 flex items-center justify-center px-4"
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
    >
      <div className="bg-white max-w-sm w-full p-7" onClick={e => e.stopPropagation()}>
        <h3 id="confirm-title" className="font-script italic text-2xl text-navy mb-2">{title}</h3>
        <p className="text-sm text-navy/65 leading-relaxed mb-7">{message}</p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-5 py-2.5 text-xs tracking-widest uppercase text-navy/60 border border-navy/20 hover:border-navy hover:text-navy transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-accent"
          >
            Abbrechen
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2.5 text-xs tracking-widest uppercase bg-red-600 text-white hover:bg-red-700 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}

function RSVPTable({ data, t, onDelete }) {
  const [filter, setFilter] = useState('')
  const [sortField, setSortField] = useState('created_at')
  const [sortDir, setSortDir] = useState('desc')
  const [deleteTarget, setDeleteTarget] = useState(null) // { id, name }

  const handleSort = (f) => {
    if (sortField === f) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortField(f); setSortDir('asc') }
  }

  const filtered = data
    .filter(r => !filter || r.name?.toLowerCase().includes(filter.toLowerCase()) || r.email?.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => {
      const av = a[sortField] ?? '', bv = b[sortField] ?? ''
      return sortDir === 'asc' ? (av > bv ? 1 : -1) : (av < bv ? 1 : -1)
    })

  const exportCSV = () => {
    const headers = [t('admin_col_name'), t('admin_col_email'), t('admin_col_attending'), t('admin_col_guests'), t('admin_col_food'), t('admin_col_allergies'), t('admin_col_date')]
    const rows = data.map(r => [
      r.name, r.email, r.attending ? 'Ja' : 'Nein', r.guest_count || 0,
      (r.food_preferences || []).map(fp => `${fp.person}: ${fp.food}`).join(' | '),
      r.allergies || '', new Date(r.created_at).toLocaleDateString('de-DE'),
    ])
    const csv = [headers, ...rows].map(row => row.map(c => `"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n')
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = 'rsvp-kristin-daniel.csv'; a.click()
    URL.revokeObjectURL(url)
  }

  const Th = ({ field, label }) => (
    <button onClick={() => handleSort(field)} className="flex items-center gap-1 hover:text-navy transition-colors focus-visible:outline-1 focus-visible:outline-blue-accent" aria-label={`Sortieren nach ${label}`}>
      {label}<span aria-hidden="true" className="text-blue-accent">{sortField === field ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}</span>
    </button>
  )

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <input type="search" value={filter} onChange={e => setFilter(e.target.value)}
          placeholder="Name oder E-Mail…" aria-label="Anmeldungen filtern"
          className="border border-navy/20 px-4 py-2.5 text-sm text-navy focus:border-blue-accent focus:outline-none flex-1" />
        <button onClick={exportCSV} className="bg-navy text-cream px-5 py-2.5 text-xs tracking-widest uppercase hover:bg-navy/80 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-accent whitespace-nowrap">
          {t('admin_export')} ↓
        </button>
      </div>
      {filtered.length === 0
        ? <p className="text-navy/40 text-sm text-center py-12">{t('admin_no_data')}</p>
        : (
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <table className="w-full text-sm border-collapse min-w-[760px]" aria-label="RSVP Anmeldungen">
              <thead>
                <tr className="bg-cream text-xs tracking-widest uppercase text-navy/60 text-left">
                  {[['name', t('admin_col_name')], ['email', t('admin_col_email')], ['attending', t('admin_col_attending')]].map(([f, l]) => (
                    <th key={f} className="px-4 py-3 font-medium"><Th field={f} label={l} /></th>
                  ))}
                  <th className="px-4 py-3 font-medium">{t('admin_col_guests')}</th>
                  <th className="px-4 py-3 font-medium">{t('admin_col_food')}</th>
                  <th className="px-4 py-3 font-medium">{t('admin_col_allergies')}</th>
                  <th className="px-4 py-3 font-medium"><Th field="created_at" label={t('admin_col_date')} /></th>
                  <th className="px-4 py-3 font-medium w-10" aria-label="Aktionen" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((r, i) => (
                  <tr key={r.id} className={`border-t border-navy/5 hover:bg-cream/60 transition-colors ${i % 2 ? 'bg-cream/20' : ''}`}>
                    <td className="px-4 py-3 font-medium text-navy">{r.name}</td>
                    <td className="px-4 py-3 text-navy/70">
                      <a href={`mailto:${r.email}`} className="hover:text-blue-accent transition-colors">{r.email}</a>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-0.5 text-xs ${r.attending ? 'bg-blue-accent/15 text-navy' : 'bg-navy/8 text-navy/50'}`}>
                        {r.attending ? '✓ ' + t('admin_confirmed') : '✗ ' + t('admin_declined')}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-navy/70">{r.guest_count || 0}</td>
                    <td className="px-4 py-3 text-navy/65 text-xs max-w-[160px]">
                      {(r.food_preferences || []).map((fp, fi) => (
                        <div key={fi}><span className="font-medium">{fp.person}:</span> {fp.food}</div>
                      ))}
                    </td>
                    <td className="px-4 py-3 text-navy/55 text-xs">{r.allergies || '—'}</td>
                    <td className="px-4 py-3 text-navy/45 text-xs whitespace-nowrap">{new Date(r.created_at).toLocaleDateString('de-DE')}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setDeleteTarget({ id: r.id, name: r.name })}
                        aria-label={`${r.name} löschen`}
                        className="text-navy/25 hover:text-red-500 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
                        title="Eintrag löschen"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      {deleteTarget && (
        <ConfirmModal
          title="Eintrag löschen?"
          message={`„${deleteTarget.name}" wird unwiderruflich aus der Anmeldeliste gelöscht. Diese Aktion kann nicht rückgängig gemacht werden.`}
          confirmLabel="Endgültig löschen"
          onConfirm={() => { onDelete(deleteTarget.id); setDeleteTarget(null) }}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </>
  )
}

function PhotoUpload({ t }) {
  const [statuses, setStatuses] = useState({})
  const [previews, setPreviews] = useState({})
  const labels = { hero: t('admin_upload_hero'), gifts: t('admin_upload_gifts'), footer: t('admin_upload_footer') }

  useEffect(() => {
    const allSlots = [...PHOTO_SLOTS, ...SLIDER_SLOTS]
    allSlots.forEach(async (slot) => {
      const url = await getPhotoUrl(slot)
      if (url) setPreviews(p => ({ ...p, [slot]: url }))
    })
  }, [])

  const handleUpload = async (slot, file) => {
    if (!file) return
    setStatuses(s => ({ ...s, [slot]: 'uploading' }))
    const reader = new FileReader()
    reader.onload = e => setPreviews(p => ({ ...p, [slot]: e.target.result }))
    reader.readAsDataURL(file)
    try {
      const { error } = await supabase.storage.from('wedding-photos').upload(`${slot}.jpg`, file, { upsert: true, contentType: file.type })
      if (error) throw error
      setStatuses(s => ({ ...s, [slot]: 'success' }))
    } catch {
      setStatuses(s => ({ ...s, [slot]: 'error' }))
    }
  }

  return (
    <div className="space-y-10">
      {/* Page photos */}
      <div>
        <h3 className="text-xs tracking-widest uppercase text-navy/60 mb-1">{t('admin_upload_page_title')}</h3>
        <p className="text-sm text-navy/50 mb-5 leading-relaxed">{t('admin_upload_page_desc')}</p>
        <div className="grid sm:grid-cols-3 gap-5">
          {PHOTO_SLOTS.map(slot => (
            <div key={slot} className="bg-white border border-navy/10 p-5">
              <h4 className="text-xs tracking-widest uppercase text-navy/60 mb-3">{labels[slot]}</h4>
              {previews[slot]
                ? <img src={previews[slot]} alt={`Vorschau ${labels[slot]}`} className="w-full h-36 object-cover grayscale mb-3" />
                : <div className="w-full h-36 bg-cream flex items-center justify-center mb-3" role="img" aria-label="Kein Foto"><span className="text-navy/25 text-xs tracking-wider uppercase">kein Foto</span></div>
              }
              <label htmlFor={`upload-${slot}`} className="block w-full text-center border border-navy/20 px-4 py-2.5 text-xs tracking-widest uppercase text-navy/70 hover:border-blue-accent hover:text-blue-accent transition-colors cursor-pointer">
                {statuses[slot] === 'uploading' ? 'Hochladen…' : statuses[slot] === 'success' ? '✓ Gespeichert' : statuses[slot] === 'error' ? '✗ Fehler' : t('admin_upload_btn')}
                <input id={`upload-${slot}`} type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={e => handleUpload(slot, e.target.files[0])} aria-label={`${labels[slot]} hochladen`} />
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Slider photos */}
      <div>
        <h3 className="text-xs tracking-widest uppercase text-navy/60 mb-1">{t('admin_upload_slider_title')}</h3>
        <p className="text-sm text-navy/50 mb-5 leading-relaxed">{t('admin_upload_slider_desc')}</p>
        <div className="grid sm:grid-cols-4 gap-4">
          {SLIDER_SLOTS.map((slot, i) => (
            <div key={slot} className="bg-white border border-navy/10 p-4">
              <h4 className="text-xs tracking-widest uppercase text-navy/50 mb-3">Foto {i + 1}</h4>
              {previews[slot]
                ? <img src={previews[slot]} alt={`Vorschau Slider ${i + 1}`} className="w-full aspect-square object-cover grayscale mb-3" />
                : <div className="w-full aspect-square bg-cream flex items-center justify-center mb-3" role="img" aria-label="Kein Foto"><span className="text-navy/25 text-xs tracking-wider uppercase">kein Foto</span></div>
              }
              <label htmlFor={`upload-${slot}`} className="block w-full text-center border border-navy/20 px-3 py-2 text-xs tracking-widest uppercase text-navy/70 hover:border-blue-accent hover:text-blue-accent transition-colors cursor-pointer">
                {statuses[slot] === 'uploading' ? 'Hochladen…' : statuses[slot] === 'success' ? '✓ Gespeichert' : statuses[slot] === 'error' ? '✗ Fehler' : t('admin_upload_btn')}
                <input id={`upload-${slot}`} type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={e => handleUpload(slot, e.target.files[0])} aria-label={`Slider Foto ${i + 1} hochladen`} />
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function DresscodeAdmin({ t }) {
  const [photoStatuses, setPhotoStatuses] = useState({})
  const [photoPreviews, setPhotoPreviews] = useState({})
  const [colors, setColors] = useState(DEFAULT_DRESSCODE_COLORS)
  const [colorStatus, setColorStatus] = useState(null)

  useEffect(() => {
    const loadColors = async () => {
      try {
        const { data } = await supabase
          .from('site_settings')
          .select('key, value')
          .in('key', COLOR_KEYS)
        if (data && data.length > 0) {
          const map = Object.fromEntries(data.map(r => [r.key, r.value]))
          setColors(COLOR_KEYS.map((k, i) => map[k] || DEFAULT_DRESSCODE_COLORS[i]))
        }
      } catch {}
    }
    const loadPreviews = async () => {
      DRESSCODE_SLOTS.forEach(async (slot) => {
        const url = await getPhotoUrl(slot)
        if (url) setPhotoPreviews(p => ({ ...p, [slot]: url }))
      })
    }
    loadColors()
    loadPreviews()
  }, [])

  const handlePhotoUpload = async (slot, file) => {
    if (!file) return
    setPhotoStatuses(s => ({ ...s, [slot]: 'uploading' }))
    const reader = new FileReader()
    reader.onload = e => setPhotoPreviews(p => ({ ...p, [slot]: e.target.result }))
    reader.readAsDataURL(file)
    try {
      const { error } = await supabase.storage.from('wedding-photos').upload(`${slot}.jpg`, file, { upsert: true, contentType: file.type })
      if (error) throw error
      setPhotoStatuses(s => ({ ...s, [slot]: 'success' }))
    } catch {
      setPhotoStatuses(s => ({ ...s, [slot]: 'error' }))
    }
  }

  const handleSaveColors = async () => {
    setColorStatus('saving')
    try {
      const rows = COLOR_KEYS.map((key, i) => ({ key, value: colors[i] }))
      const { error } = await supabase
        .from('site_settings')
        .upsert(rows, { onConflict: 'key' })
      if (error) throw error
      setColorStatus('saved')
      setTimeout(() => setColorStatus(null), 3000)
    } catch {
      setColorStatus('error')
      setTimeout(() => setColorStatus(null), 3000)
    }
  }

  return (
    <div className="space-y-10">
      {/* Color palette */}
      <div>
        <h3 className="text-xs tracking-widest uppercase text-navy/60 mb-1">{t('admin_dresscode_colors_title')}</h3>
        <p className="text-sm text-navy/50 mb-5 leading-relaxed">{t('admin_dresscode_colors_desc')}</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
          {colors.map((color, i) => (
            <div key={i} className="bg-white border border-navy/10 p-4 flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full border border-navy/10" style={{ backgroundColor: color }} />
              <label className="sr-only">{t('admin_dresscode_color')} {i + 1}</label>
              <input
                type="color"
                value={color}
                onChange={e => setColors(c => c.map((v, idx) => idx === i ? e.target.value : v))}
                aria-label={`${t('admin_dresscode_color')} ${i + 1}`}
                className="w-full h-8 cursor-pointer border border-navy/20 p-0.5 bg-white"
              />
              <span className="text-xs font-mono text-navy/50">{color}</span>
            </div>
          ))}
        </div>
        <button
          onClick={handleSaveColors}
          disabled={colorStatus === 'saving'}
          className="bg-navy text-cream px-6 py-2.5 text-xs tracking-widest uppercase hover:bg-navy/80 transition-colors disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-accent"
        >
          {colorStatus === 'saving' ? 'Speichern…' : colorStatus === 'saved' ? t('admin_dresscode_saved') : colorStatus === 'error' ? t('admin_dresscode_error') : t('admin_dresscode_save')}
        </button>
      </div>

      {/* Dresscode photos */}
      <div>
        <h3 className="text-xs tracking-widest uppercase text-navy/60 mb-1">{t('admin_dresscode_photos_title')}</h3>
        <p className="text-sm text-navy/50 mb-5 leading-relaxed">{t('admin_dresscode_photos_desc')}</p>
        <div className="grid sm:grid-cols-3 gap-4">
          {DRESSCODE_SLOTS.map((slot, i) => (
            <div key={slot} className="bg-white border border-navy/10 p-4">
              <h4 className="text-xs tracking-widest uppercase text-navy/50 mb-3">Foto {i + 1}</h4>
              {photoPreviews[slot]
                ? <img src={photoPreviews[slot]} alt={`Vorschau Foto ${i + 1}`} className="w-full aspect-[3/4] object-cover grayscale mb-3" />
                : <div className="w-full aspect-[3/4] bg-cream flex items-center justify-center mb-3" role="img" aria-label="Kein Foto">
                    <span className="text-navy/25 text-xs tracking-wider uppercase">kein Foto</span>
                  </div>
              }
              <label htmlFor={`upload-${slot}`} className="block w-full text-center border border-navy/20 px-3 py-2 text-xs tracking-widest uppercase text-navy/70 hover:border-blue-accent hover:text-blue-accent transition-colors cursor-pointer">
                {photoStatuses[slot] === 'uploading' ? 'Hochladen…' : photoStatuses[slot] === 'success' ? '✓ Gespeichert' : photoStatuses[slot] === 'error' ? '✗ Fehler' : t('admin_upload_btn')}
                <input
                  id={`upload-${slot}`}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="sr-only"
                  onChange={e => handlePhotoUpload(slot, e.target.files[0])}
                  aria-label={`Foto ${i + 1} hochladen`}
                />
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Admin() {
  const { t } = useLang()
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('weddingAdmin') === '1')
  const [tab, setTab] = useState('rsvp')
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const handleLogin = () => { sessionStorage.setItem('weddingAdmin', '1'); setAuthed(true) }
  const handleLogout = () => { sessionStorage.removeItem('weddingAdmin'); setAuthed(false) }

  const handleDeleteRsvp = async (id) => {
    await supabase.from('rsvp_responses').delete().eq('id', id)
    setData(prev => prev.filter(r => r.id !== id))
  }

  useEffect(() => {
    if (!authed) return
    setLoading(true)
    supabase.from('rsvp_responses').select('*').order('created_at', { ascending: false })
      .then(({ data: rows }) => { setData(rows || []); setLoading(false) })
  }, [authed])

  if (!authed) return <Login onLogin={handleLogin} />

  const TABS = [
    { id: 'rsvp', label: t('admin_rsvp_tab') },
    { id: 'stats', label: t('admin_stats_tab') },
    { id: 'photos', label: t('admin_photos_tab') },
    { id: 'dresscode', label: t('admin_dresscode_tab') },
  ]

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-navy text-cream px-4 sm:px-6 py-4 flex items-center justify-between">
        <div>
          <a href="/" className="font-script italic text-2xl text-cream hover:text-cream/80 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream/60">Kristin & Daniel</a>
          <p className="text-cream/40 text-xs tracking-widest uppercase">Admin Dashboard</p>
        </div>
        <button onClick={handleLogout} className="text-xs tracking-widest uppercase text-cream/60 hover:text-cream border border-cream/20 px-4 py-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream/60">
          {t('admin_logout')}
        </button>
      </header>

      <div className="bg-white border-b border-navy/10 px-4 sm:px-6" role="tablist" aria-label="Admin-Bereiche">
        <div className="flex max-w-5xl mx-auto">
          {TABS.map(tb => (
            <button key={tb.id} role="tab" aria-selected={tab === tb.id} aria-controls={`panel-${tb.id}`} id={`tab-${tb.id}`}
              onClick={() => setTab(tb.id)}
              className={`px-5 py-4 text-xs tracking-widest uppercase border-b-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-blue-accent ${tab === tb.id ? 'border-blue-accent text-navy' : 'border-transparent text-navy/40 hover:text-navy/70'}`}>
              {tb.label}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {loading
          ? <p className="text-navy/40 text-sm text-center py-16" aria-live="polite">Lädt…</p>
          : <>
            <div id="panel-rsvp" role="tabpanel" aria-labelledby="tab-rsvp" hidden={tab !== 'rsvp'}>
              {tab === 'rsvp' && <RSVPTable data={data} t={t} onDelete={handleDeleteRsvp} />}
            </div>
            <div id="panel-stats" role="tabpanel" aria-labelledby="tab-stats" hidden={tab !== 'stats'}>
              {tab === 'stats' && <Stats data={data} t={t} />}
            </div>
            <div id="panel-photos" role="tabpanel" aria-labelledby="tab-photos" hidden={tab !== 'photos'}>
              {tab === 'photos' && <PhotoUpload t={t} />}
            </div>
            <div id="panel-dresscode" role="tabpanel" aria-labelledby="tab-dresscode" hidden={tab !== 'dresscode'}>
              {tab === 'dresscode' && <DresscodeAdmin t={t} />}
            </div>
          </>
        }
      </main>
    </div>
  )
}
