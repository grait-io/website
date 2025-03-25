import { supportedLanguages, defaultLanguage } from '../middleware';

// Type for translations
export type Translations = {
  [key: string]: {
    [key: string]: string;
  };
};

// Dictionary of translations
export const translations: Translations = {
  // Navigation
  'nav.home': {
    en: 'Home',
    de: 'Startseite',
    it: 'Home',
  },
  'nav.services': {
    en: 'Services',
    de: 'Dienstleistungen',
    it: 'Servizi',
  },
  'nav.contact': {
    en: 'Contact',
    de: 'Kontakt',
    it: 'Contatto',
  },
  'nav.locations': {
    en: 'Locations',
    de: 'Standorte',
    it: 'Sedi',
  },
  
  // Services
  'services.ai_integration': {
    en: 'AI Integration & Automation',
    de: 'KI-Integration & Automatisierung',
    it: 'Integrazione e automazione AI',
  },
  'services.ai_coaching': {
    en: 'AI Coaching & Transformation',
    de: 'KI-Coaching & Transformation',
    it: 'Coaching e trasformazione AI',
  },
  'services.product_development': {
    en: 'Product & Service Development',
    de: 'Produkt- & Serviceentwicklung',
    it: 'Sviluppo di prodotti e servizi',
  },
  'services.workshops': {
    en: 'Workshops & Education',
    de: 'Workshops & Bildung',
    it: 'Workshop e formazione',
  },
  
  // Locations
  'locations.germany': {
    en: 'Germany',
    de: 'Deutschland',
    it: 'Germania',
  },
  'locations.italy': {
    en: 'Italy',
    de: 'Italien',
    it: 'Italia',
  },
  'locations.uk': {
    en: 'United Kingdom',
    de: 'Vereinigtes Königreich',
    it: 'Regno Unito',
  },
  'locations.us': {
    en: 'United States',
    de: 'Vereinigte Staaten',
    it: 'Stati Uniti',
  },
  'locations.spain': {
    en: 'Spain',
    de: 'Spanien',
    it: 'Spagna',
  },
  
  // Common
  'common.learn_more': {
    en: 'Learn More',
    de: 'Mehr erfahren',
    it: 'Scopri di più',
  },
  'common.contact_us': {
    en: 'Contact Us',
    de: 'Kontaktiere uns',
    it: 'Contattaci',
  },
  'common.get_started': {
    en: 'Get Started',
    de: 'Loslegen',
    it: 'Inizia ora',
  },
  
  // Homepage
  'home.hero.title': {
    en: 'AI Transformation for Your Business',
    de: 'KI-Transformation für Ihr Unternehmen',
    it: 'Trasformazione AI per la tua azienda',
  },
  'home.hero.subtitle': {
    en: 'Empowering creators with cutting-edge AI solutions',
    de: 'Wir stärken Kreative mit modernsten KI-Lösungen',
    it: 'Potenziamo i creatori con soluzioni AI all\'avanguardia',
  },
  
  // Footer
  'footer.rights': {
    en: 'All rights reserved',
    de: 'Alle Rechte vorbehalten',
    it: 'Tutti i diritti riservati',
  },
};

// Function to get a translation
export function getTranslation(key: string, lang: string = defaultLanguage): string {
  if (!translations[key]) {
    console.warn(`Translation key not found: ${key}`);
    return key;
  }
  
  if (!translations[key][lang]) {
    console.warn(`Translation not found for key ${key} in language ${lang}`);
    return translations[key][defaultLanguage] || key;
  }
  
  return translations[key][lang];
}

// Function to get alternate language URLs for SEO
export function getAlternateLanguageUrls(path?: string): { [key: string]: string } {
  if (!path) {
    // If path is undefined, return default URLs for each language
    return supportedLanguages.reduce((acc, lang) => {
      acc[lang] = `/${lang}`;
      return acc;
    }, {} as { [key: string]: string });
  }
  
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  const segments = cleanPath.split('/');
  const isRoot = segments.length === 1 && supportedLanguages.includes(segments[0]);
  
  // Remove language prefix if present
  const pathWithoutLang = supportedLanguages.includes(segments[0]) 
    ? segments.slice(1).join('/') 
    : cleanPath;
  
  // Generate URLs for each language
  return supportedLanguages.reduce((acc, lang) => {
    const langPath = isRoot || pathWithoutLang === '' 
      ? `/${lang}` 
      : `/${lang}/${pathWithoutLang}`;
    acc[lang] = langPath;
    return acc;
  }, {} as { [key: string]: string });
}

// Function to get localized slugs
export function getLocalizedSlug(key: string, lang: string = defaultLanguage): string {
  const slugTranslations: { [key: string]: { [key: string]: string } } = {
    'services.ai_integration': {
      en: 'ai-integration',
      de: 'ki-integration',
      it: 'integrazione-ai',
    },
    'services.ai_coaching': {
      en: 'ai-coaching',
      de: 'ki-coaching',
      it: 'coaching-ai',
    },
    'services.product_development': {
      en: 'product-development',
      de: 'produktentwicklung',
      it: 'sviluppo-prodotti',
    },
    'services.workshops': {
      en: 'workshops',
      de: 'workshops',
      it: 'workshop',
    },
    'locations.germany': {
      en: 'germany',
      de: 'deutschland',
      it: 'germania',
    },
    'locations.italy': {
      en: 'italy',
      de: 'italien',
      it: 'italia',
    },
    'locations.uk': {
      en: 'united-kingdom',
      de: 'vereinigtes-koenigreich',
      it: 'regno-unito',
    },
    'locations.us': {
      en: 'united-states',
      de: 'vereinigte-staaten',
      it: 'stati-uniti',
    },
    'locations.spain': {
      en: 'spain',
      de: 'spanien',
      it: 'spagna',
    },
  };
  
  if (!slugTranslations[key]) {
    console.warn(`Slug translation key not found: ${key}`);
    return key;
  }
  
  if (!slugTranslations[key][lang]) {
    console.warn(`Slug translation not found for key ${key} in language ${lang}`);
    return slugTranslations[key][defaultLanguage] || key;
  }
  
  return slugTranslations[key][lang];
}

// Service and location data
export const services = [
  {
    id: 'ai_integration',
    translationKey: 'services.ai_integration',
    icon: 'integration',
  },
  {
    id: 'ai_coaching',
    translationKey: 'services.ai_coaching',
    icon: 'coaching',
  },
  {
    id: 'product_development',
    translationKey: 'services.product_development',
    icon: 'product',
  },
  {
    id: 'workshops',
    translationKey: 'services.workshops',
    icon: 'workshop',
  },
];

export const locations = [
  {
    id: 'germany',
    translationKey: 'locations.germany',
  },
  {
    id: 'italy',
    translationKey: 'locations.italy',
  },
  {
    id: 'uk',
    translationKey: 'locations.uk',
  },
  {
    id: 'us',
    translationKey: 'locations.us',
  },
  {
    id: 'spain',
    translationKey: 'locations.spain',
  },
];
