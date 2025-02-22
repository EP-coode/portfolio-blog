'use client'

import React, { createContext, useContext } from 'react'

import { getDictionary } from '../../../app/(frontend)/[locale]/dictionaries'

export interface TranslationContextData {
  t: Awaited<ReturnType<typeof getDictionary>>
}

// Create the context
const TranslationContext = createContext<TranslationContextData | undefined>(undefined)

export const TranslationContextProvider = async ({
  children,
  locale,
}: {
  locale: 'pl' | 'en'
  children: React.ReactNode
}) => {
  const dict = await getDictionary(locale)

  return <TranslationContext.Provider value={{ t: dict }}>{children}</TranslationContext.Provider>
}

// Custom hook to use the PostContext
export const useTranslation = () => useContext(TranslationContext)
