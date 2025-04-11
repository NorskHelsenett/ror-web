import { format, formatDistanceToNow } from 'date-fns'
import { nb } from 'date-fns/locale/nb'

/**
 * Localizes a date string to Norwegian Bokmål format.
 */
export function localizeDate(date: string | Date): string {
  if (!date || date === '0001-01-01T00:00:00Z' || date === '') {
    return 'Missing…'
  }
  return format(date, 'PPp', {
    locale: nb,
  })
}

export function localizeDistanceDate(date: string | Date, addSuffix: boolean = false): string {
  if (!date || date === '0001-01-01T00:00:00Z' || date === '') {
    return 'Missing…'
  }
  return formatDistanceToNow(date, {
    addSuffix,
  })
}
