import i18n from 'i18next'

type AnyObj = Record<string, any>

/**
 * Returns a localized value for a given object and base field.
 * Supports patterns:
 * - field: { fr: '...', en: '...', ar: '...' }
 * - field_fr / field_en / field_ar
 * - fallback to plain field
 */
export function getLocalized(obj: AnyObj | undefined | null, field: string, lang?: string): string | undefined {
  if (!obj) return undefined
  const locale = lang || (i18n && i18n.language) || 'fr'

  // 1) If obj[field] is an object with language keys
  const value = obj[field]
  if (value && typeof value === 'object') {
    if (typeof value[locale] === 'string') return value[locale]
    // try common fallbacks
    if (typeof value['fr'] === 'string') return value['fr']
    if (typeof value['en'] === 'string') return value['en']
    if (typeof value['ar'] === 'string') return value['ar']
  }

  // 2) Try field_{lang} pattern
  const keyWithUnderscore = `${field}_${locale}`
  if (typeof obj[keyWithUnderscore] === 'string') return obj[keyWithUnderscore]

  // 3) Try field{Lang} (capitalized) pattern
  const keyWithCapital = `${field}${locale.charAt(0).toUpperCase() + locale.slice(1)}`
  if (typeof obj[keyWithCapital] === 'string') return obj[keyWithCapital]

  // 4) Fallback to plain field value (string)
  if (typeof value === 'string') return value

  return undefined
}

export default getLocalized
