import { defineRouting } from 'next-intl/routing'
import { createNavigation } from 'next-intl/navigation'
import { pl, enUS } from 'date-fns/locale'
import { Locale as DateLocale } from 'date-fns'

export const SUPPORTED_LOCALES = ['pl', 'en'] as const
export type Locale = (typeof SUPPORTED_LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'en'

export const dateFormattersMap: { [key in (typeof SUPPORTED_LOCALES)[number]]: DateLocale } = {
  en: enUS,
  pl: pl,
}

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: SUPPORTED_LOCALES,

  // Used when no locale matches
  defaultLocale: DEFAULT_LOCALE,
})

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing)
