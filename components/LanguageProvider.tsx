"use client";

import React, { createContext, useContext, ReactNode } from 'react';
import { getTranslation } from '@/lib/i18n';
import { supportedLanguages, defaultLanguage } from '@/middleware';

// Define the context type
type LanguageContextType = {
  lang: string;
  t: (key: string) => string;
  isSupported: (lang: string) => boolean;
};

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  lang: defaultLanguage,
  t: (key: string) => key,
  isSupported: () => false,
});

// Hook to use the language context
export const useLanguage = () => useContext(LanguageContext);

// Props for the provider component
type LanguageProviderProps = {
  lang: string;
  children: ReactNode;
};

// Language provider component
export default function LanguageProvider({ lang, children }: LanguageProviderProps) {
  // Ensure the language is supported, otherwise use the default
  const currentLang = supportedLanguages.includes(lang) ? lang : defaultLanguage;
  
  // Translation function
  const t = (key: string) => getTranslation(key, currentLang);
  
  // Function to check if a language is supported
  const isSupported = (lang: string) => supportedLanguages.includes(lang);
  
  // Context value
  const contextValue = {
    lang: currentLang,
    t,
    isSupported,
  };
  
  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}
