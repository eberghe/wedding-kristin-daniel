import { supabase } from '../supabase'

const EXTS = ['jpg', 'jpeg', 'png', 'webp']
let _cache = null   // Set of filenames in the bucket
let _version = 0    // Incremented on every upload so URLs get a fresh ?v= param

async function getBucketFiles() {
  if (_cache) return _cache
  try {
    const { data } = await supabase.storage.from('wedding-photos').list('', { limit: 200 })
    _cache = new Set((data || []).map(f => f.name))
    if (!_version) _version = Date.now()
  } catch {
    _cache = new Set()
  }
  return _cache
}

/** Call after every successful upload to bust browser/CDN cache. */
export function invalidatePhotoCache() {
  _cache = null
  _version = Date.now()
}

/**
 * Returns the public URL for a slot (e.g. "hero", "slider_1").
 * Uses the bucket file list — no HEAD requests.
 * Appends ?v= so the browser always fetches fresh after an upload.
 */
export async function getPhotoUrl(slot) {
  const files = await getBucketFiles()
  for (const ext of EXTS) {
    const name = `${slot}.${ext}`
    if (files.has(name)) {
      const { data } = supabase.storage.from('wedding-photos').getPublicUrl(name)
      if (data?.publicUrl) return `${data.publicUrl}?v=${_version}`
    }
  }
  return null
}
