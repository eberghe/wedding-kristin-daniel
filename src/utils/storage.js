import { supabase } from '../supabase'

const EXTS = ['jpg', 'jpeg', 'png', 'webp']
let _cache = null // Set of filenames currently in the bucket

async function getBucketFiles() {
  if (_cache) return _cache
  try {
    const { data } = await supabase.storage.from('wedding-photos').list('', { limit: 200 })
    _cache = new Set((data || []).map(f => f.name))
  } catch {
    _cache = new Set()
  }
  return _cache
}

/** Call this after a successful upload so the next getPhotoUrl reflects the new file. */
export function invalidatePhotoCache() {
  _cache = null
}

/**
 * Returns the public URL for a slot (e.g. "hero", "slider_1") by checking
 * which extension actually exists in the bucket — no HEAD requests needed.
 */
export async function getPhotoUrl(slot) {
  const files = await getBucketFiles()
  for (const ext of EXTS) {
    const name = `${slot}.${ext}`
    if (files.has(name)) {
      const { data } = supabase.storage.from('wedding-photos').getPublicUrl(name)
      return data?.publicUrl || null
    }
  }
  return null
}
