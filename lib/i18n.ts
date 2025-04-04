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
  'services.ai_workflow': {
    en: 'AI Workflow Design',
    de: 'KI-Workflow-Design',
    it: 'Design del flusso di lavoro AI',
  },
  'services.executive_mastery': {
    en: 'Executive AI Mastery',
    de: 'KI-Mastery für Führungskräfte',
    it: 'Padronanza AI per Dirigenti',
  },
  'services.product_launchpad': {
    en: 'AI Product Launchpad',
    de: 'KI-Produkt Launchpad',
    it: 'Piattaforma di lancio prodotti AI',
  },
  'services.team_accelerator': {
    en: 'Team AI Accelerator',
    de: 'Team KI-Beschleuniger',
    it: 'Acceleratore AI per Team',
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
    'services.ai_workflow': {
      en: 'ai-workflow-design',
      de: 'ki-workflow-design',
      it: 'design-flusso-lavoro-ai',
    },
    'services.executive_mastery': {
      en: 'executive-ai-mastery',
      de: 'ki-mastery-fuehrungskraefte',
      it: 'padronanza-ai-dirigenti',
    },
    'services.product_launchpad': {
      en: 'ai-product-launchpad',
      de: 'ki-produkt-launchpad',
      it: 'piattaforma-lancio-prodotti-ai',
    },
    'services.team_accelerator': {
      en: 'team-ai-accelerator',
      de: 'team-ki-beschleuniger',
      it: 'acceleratore-ai-team',
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
    id: 'ai_workflow',
    translationKey: 'services.ai_workflow',
    icon: 'workflow',
  },
  {
    id: 'executive_mastery',
    translationKey: 'services.executive_mastery',
    icon: 'executive',
  },
  {
    id: 'product_launchpad',
    translationKey: 'services.product_launchpad',
    icon: 'product',
  },
  {
    id: 'team_accelerator',
    translationKey: 'services.team_accelerator',
    icon: 'team',
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
