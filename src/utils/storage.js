import { supabase } from '../supabase'

const EXTS = ['jpg', 'jpeg', 'png', 'webp']

/**
 * Tries common image extensions in order and returns the first working public URL.
 * Returns null if none found or Supabase is not configured.
 */
export async function getPhotoUrl(slot) {
  for (const ext of EXTS) {
    try {
      const { data } = supabase.storage.from('wedding-photos').getPublicUrl(`${slot}.${ext}`)
      if (data?.publicUrl) {
        const res = await fetch(data.publicUrl, { method: 'HEAD' }).catch(() => null)
        if (res && res.ok) return data.publicUrl
      }
    } catch {}
  }
  return null
}
