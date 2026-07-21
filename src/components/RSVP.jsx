import { useState } from 'react'
import { useLang } from '../i18n'
import { FloralDivider } from './Florals'
import { useFadeIn } from '../hooks/useFadeIn'
import { supabase } from '../supabase'

const FOOD_KEYS = ['rsvp_food_meat', 'rsvp_food_vegetarian', 'rsvp_food_vegan', 'rsvp_food_fish']
const FOOD_VALUES = ['Fleisch/Meat', 'Vegetarisch/Vegetarian', 'Vegan', 'Fisch/Fish']

function FoodSelect({ label, value, onChange, id }) {
  const { t } = useLang()
  return (
    <div>
      <label htmlFor={id} className="block text-xs tracking-widest uppercase text-navy/60 mb-1.5">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        required
        className="w-full border border-navy/20 bg-white px-4 py-3 text-navy text-sm focus:border-blue-accent focus:outline-none transition-colors duration-200 appearance-none"
        aria-required="true"
      >
        <option value="">{t('rsvp_choose_food')}</option>
        {FOOD_KEYS.map((k, i) => (
          <option key={k} value={FOOD_VALUES[i]}>{t(k)}</option>
        ))}
      </select>
    </div>
  )
}

export default function RSVP() {
  const { t, lang } = useLang()
  const ref = useFadeIn()

  const [form, setForm] = useState({
    name: '',
    email: '',
    attending: '',
    guestCount: 0,
    guestNames: [],
    guestEmails: [],
    foodPreferences: [{ person: '', food: '' }],
    allergies: '',
    bringingCake: false,
    cakeType: '',
  })
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [cakeCount, setCakeCount] = useState(null)

  useEffect(() => {
    supabase.from('rsvp_responses').select('cake').not('cake', 'is', null).neq('cake', '')
      .then(({ data }) => setCakeCount(data?.length || 0))
  }, [])

  const set = (field, value) => setForm(f => ({ ...f, [field]: value }))

  const handleGuestCount = (e) => {
    const count = Math.max(0, Math.min(10, parseInt(e.target.value) || 0))
    const names = Array.from({ length: count }, (_, i) => form.guestNames[i] || '')
    const emails = Array.from({ length: count }, (_, i) => form.guestEmails[i] || '')
    const foods = Array.from({ length: count + 1 }, (_, i) => form.foodPreferences[i] || { person: '', food: '' })
    setForm(f => ({ ...f, guestCount: count, guestNames: names, guestEmails: emails, foodPreferences: foods }))
  }

  const handleGuestName = (i, value) => {
    const names = [...form.guestNames]
    names[i] = value
    const foods = [...form.foodPreferences]
    foods[i + 1] = { ...(foods[i + 1] || {}), person: value }
    setForm(f => ({ ...f, guestNames: names, foodPreferences: foods }))
  }

  const handleGuestEmail = (i, value) => {
    const emails = [...form.guestEmails]
    emails[i] = value
    setForm(f => ({ ...f, guestEmails: emails }))
  }

  const handleFood = (index, value) => {
    const foods = [...form.foodPreferences]
    foods[index] = { ...(foods[index] || {}), food: value }
    setForm(f => ({ ...f, foodPreferences: foods }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')

    const payload = {
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      attending: form.attending === 'yes',
      guest_count: form.guestCount,
      guest_names: form.guestNames.filter(Boolean),
      guest_emails: form.guestEmails.filter(Boolean),
      cake: form.bringingCake && form.cakeType.trim() ? form.cakeType.trim() : null,
      food_preferences: form.foodPreferences.map((fp, i) => ({
        person: i === 0 ? form.name : form.guestNames[i - 1] || `Gast ${i}`,
        food: fp.food || '',
      })),
      allergies: form.allergies.trim(),
      language: lang,
    }

    try {
      const { error } = await supabase.from('rsvp_responses').insert([payload])
      if (error) throw error
      setStatus('success')
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <section id="rsvp" className="bg-cream-light py-20 md:py-28" aria-labelledby="rsvp-heading">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <FloralDivider className="mx-auto mb-8" color="#5C7A5C" />
          <p
            role="alert"
            aria-live="assertive"
            className="font-script text-3xl md:text-4xl text-navy"
          >
            {t('rsvp_success')}
          </p>
          <FloralDivider className="mx-auto mt-8" color="#5C7A5C" />
        </div>
      </section>
    )
  }

  return (
    <section
      id="rsvp"
      aria-labelledby="rsvp-heading"
      className="bg-cream-light py-20 md:py-28"
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div ref={ref} className="text-center mb-12">
          <p className="section-label text-blue-muted mb-3">{t('rsvp_label')}</p>
          <h2 id="rsvp-heading" className="font-script text-4xl md:text-5xl text-navy">
            {t('rsvp_title')}
          </h2>
          <FloralDivider className="mx-auto mt-4" color="#5C7A5C" />
          <p className="text-navy/60 text-base mt-4">{t('rsvp_intro')}</p>
        </div>

        <form onSubmit={handleSubmit} noValidate aria-label={t('rsvp_title')}>
          {/* Name */}
          <div className="mb-5">
            <label htmlFor="rsvp-name" className="block text-xs tracking-widest uppercase text-navy/60 mb-1.5">
              {t('rsvp_name')} <span className="text-blue-accent" aria-label={t('rsvp_required')}>*</span>
            </label>
            <input
              id="rsvp-name"
              type="text"
              required
              aria-required="true"
              autoComplete="name"
              value={form.name}
              onChange={e => set('name', e.target.value)}
              placeholder={t('rsvp_name')}
              className="w-full border border-navy/20 bg-white px-4 py-3 text-navy text-sm placeholder:text-navy/30 focus:border-blue-accent focus:outline-none transition-colors duration-200"
            />
          </div>

          {/* Email */}
          <div className="mb-5">
            <label htmlFor="rsvp-email" className="block text-xs tracking-widest uppercase text-navy/60 mb-1.5">
              {t('rsvp_email')} <span className="text-blue-accent" aria-label={t('rsvp_required')}>*</span>
            </label>
            <input
              id="rsvp-email"
              type="email"
              required
              aria-required="true"
              autoComplete="email"
              value={form.email}
              onChange={e => set('email', e.target.value)}
              placeholder="email@beispiel.de"
              className="w-full border border-navy/20 bg-white px-4 py-3 text-navy text-sm placeholder:text-navy/30 focus:border-blue-accent focus:outline-none transition-colors duration-200"
            />
          </div>

          {/* Attendance */}
          <fieldset className="mb-6">
            <legend className="block text-xs tracking-widest uppercase text-navy/60 mb-3">
              {t('rsvp_attending_label')} <span className="text-blue-accent" aria-label={t('rsvp_required')}>*</span>
            </legend>
            <div className="flex flex-col sm:flex-row gap-3">
              {[
                { value: 'yes', label: t('rsvp_attending_yes') },
                { value: 'no', label: t('rsvp_attending_no') },
              ].map(({ value, label }) => (
                <label
                  key={value}
                  className={`flex items-center gap-3 border px-5 py-3 cursor-pointer transition-all duration-200 flex-1 ${
                    form.attending === value
                      ? 'border-blue-accent bg-blue-accent/5 text-navy'
                      : 'border-navy/20 text-navy/60 hover:border-blue-accent/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="attending"
                    value={value}
                    required
                    checked={form.attending === value}
                    onChange={() => set('attending', value)}
                    className="accent-blue-accent w-4 h-4"
                  />
                  <span className="text-sm">{label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {/* If attending: extra fields */}
          {form.attending === 'yes' && (
            <div aria-live="polite">
              {/* Guest count */}
              <div className="mb-5">
                <label htmlFor="rsvp-guest-count" className="block text-xs tracking-widest uppercase text-navy/60 mb-1.5">
                  {t('rsvp_guests_count')}
                </label>
                <p id="guest-count-hint" className="text-xs text-navy/40 mb-1">{t('rsvp_guests_count_help')}</p>
                <p className="text-sm font-semibold text-blue-accent mb-2 border border-blue-accent/30 bg-blue-accent/5 px-3 py-2">{t('rsvp_guests_note')}</p>
                <input
                  id="rsvp-guest-count"
                  type="number"
                  min="0"
                  max="10"
                  aria-describedby="guest-count-hint"
                  value={form.guestCount}
                  onChange={handleGuestCount}
                  className="w-24 border border-navy/20 bg-white px-4 py-3 text-navy text-sm focus:border-blue-accent focus:outline-none transition-colors duration-200"
                />
              </div>

              {/* Guest names + emails */}
              {form.guestNames.map((name, i) => (
                <div key={i} className="mb-5 grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={`guest-name-${i}`} className="block text-xs tracking-widest uppercase text-navy/60 mb-1.5">
                      {t('rsvp_guest_name')} {i + 1}
                    </label>
                    <input
                      id={`guest-name-${i}`}
                      type="text"
                      value={name}
                      onChange={e => handleGuestName(i, e.target.value)}
                      className="w-full border border-navy/20 bg-white px-4 py-3 text-navy text-sm placeholder:text-navy/30 focus:border-blue-accent focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor={`guest-email-${i}`} className="block text-xs tracking-widest uppercase text-navy/60 mb-1.5">
                      {t('rsvp_guest_email')} {i + 1}
                    </label>
                    <input
                      id={`guest-email-${i}`}
                      type="email"
                      value={form.guestEmails[i] || ''}
                      onChange={e => handleGuestEmail(i, e.target.value)}
                      placeholder="email@beispiel.de"
                      className="w-full border border-navy/20 bg-white px-4 py-3 text-navy text-sm placeholder:text-navy/30 focus:border-blue-accent focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              ))}

              {/* Cake counter */}
              {(() => {
                const CAKES_NEEDED = 18
                const committed = cakeCount ?? 0
                const remaining = Math.max(0, CAKES_NEEDED - committed - (form.bringingCake ? 1 : 0))
                const allCovered = committed >= CAKES_NEEDED
                return (
                  <div className="mb-5 border border-blue-accent/30 bg-blue-accent/5 p-5">
                    <p className="text-xs tracking-widest uppercase text-blue-accent mb-2">{t('rsvp_cake_title')}</p>
                    {allCovered && !form.bringingCake ? (
                      <p className="text-sm text-navy/70">{t('rsvp_cake_all_covered')}</p>
                    ) : (
                      <>
                        <p className="text-2xl font-display text-navy mb-3">
                          <span className="font-semibold">{remaining}</span>{' '}
                          <span className="text-navy/60 text-base">{t('rsvp_cake_of_18')}</span>
                        </p>
                        <button
                          type="button"
                          onClick={() => set('bringingCake', !form.bringingCake)}
                          className={`text-xs tracking-widest uppercase px-4 py-2.5 border transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-accent ${
                            form.bringingCake
                              ? 'bg-blue-accent text-white border-blue-accent'
                              : 'border-blue-accent/50 text-blue-accent hover:bg-blue-accent/10'
                          }`}
                        >
                          {form.bringingCake ? t('rsvp_cake_undo') : t('rsvp_cake_btn')}
                        </button>
                        {form.bringingCake && (
                          <div className="mt-4">
                            <label htmlFor="rsvp-cake-type" className="block text-xs tracking-widest uppercase text-navy/60 mb-1.5">
                              {t('rsvp_cake_type')}
                            </label>
                            <input
                              id="rsvp-cake-type"
                              type="text"
                              value={form.cakeType}
                              onChange={e => set('cakeType', e.target.value)}
                              placeholder={t('rsvp_cake_placeholder')}
                              className="w-full border border-navy/20 bg-white px-4 py-3 text-navy text-sm placeholder:text-navy/30 focus:border-blue-accent focus:outline-none transition-colors duration-200"
                            />
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )
              })()}
            </div>
          )}

          {/* Allergies */}
          <div className="mb-8">
            <label htmlFor="rsvp-allergies" className="block text-xs tracking-widest uppercase text-navy/60 mb-1.5">
              {t('rsvp_allergies')}
            </label>
            <textarea
              id="rsvp-allergies"
              rows={3}
              value={form.allergies}
              onChange={e => set('allergies', e.target.value)}
              placeholder={t('rsvp_allergies_placeholder')}
              className="w-full border border-navy/20 bg-white px-4 py-3 text-navy text-sm placeholder:text-navy/30 focus:border-blue-accent focus:outline-none transition-colors duration-200 resize-none"
            />
          </div>

          {status === 'error' && (
            <p role="alert" aria-live="assertive" className="text-red-600 text-sm mb-4">
              {t('rsvp_error')}
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'submitting' || !form.name || !form.email || !form.attending}
            className="w-full bg-navy text-cream py-4 text-sm tracking-widest uppercase hover:bg-navy/80 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-accent disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {status === 'submitting' ? t('rsvp_submitting') : t('rsvp_submit')}
          </button>
        </form>
      </div>
    </section>
  )
}
