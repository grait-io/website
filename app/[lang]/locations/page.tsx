import { Metadata } from 'next';
import { getTranslation, locations } from '@/lib/i18n';
import { supportedLanguages, defaultLanguage } from '@/middleware';
import Link from 'next/link';

// Generate metadata for the locations page
export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = supportedLanguages.includes(params.lang) ? params.lang : defaultLanguage;
  
  const title = lang === 'en' 
    ? 'Our Locations | grait.io'
    : lang === 'de'
      ? 'Unsere Standorte | grait.io'
      : 'Le Nostre Sedi | grait.io';
  
  const description = lang === 'en'
    ? 'Explore grait.io AI transformation services across Germany, Italy, United Kingdom, United States, and Spain'
    : lang === 'de'
      ? 'Entdecken Sie grait.io KI-Transformationsdienste in Deutschland, Italien, Vereinigtes Königreich, Vereinigte Staaten und Spanien'
      : 'Esplora i servizi di trasformazione AI di grait.io in Germania, Italia, Regno Unito, Stati Uniti e Spagna';
  
  return {
    title,
    description,
  };
}

// Location card component
function LocationCard({ 
  id, 
  title, 
  lang 
}: { 
  id: string; 
  title: string; 
  lang: string;
}) {
  // Location-specific images and descriptions
  const locationInfo = {
    germany: {
      image: '🇩🇪',
      description: {
        en: 'Our German team specializes in AI integration for manufacturing and industrial automation.',
        de: 'Unser deutsches Team ist spezialisiert auf KI-Integration für Fertigung und industrielle Automatisierung.',
        it: 'Il nostro team tedesco è specializzato nell\'integrazione AI per la produzione e l\'automazione industriale.',
      },
    },
    italy: {
      image: '🇮🇹',
      description: {
        en: 'Our Italian office focuses on AI solutions for design, fashion, and creative industries.',
        de: 'Unser italienisches Büro konzentriert sich auf KI-Lösungen für Design, Mode und Kreativbranchen.',
        it: 'Il nostro ufficio italiano si concentra su soluzioni AI per design, moda e industrie creative.',
      },
    },
    uk: {
      image: '🇬🇧',
      description: {
        en: 'Our UK team delivers AI transformation for financial services and healthcare sectors.',
        de: 'Unser britisches Team liefert KI-Transformation für Finanzdienstleistungen und Gesundheitssektoren.',
        it: 'Il nostro team britannico fornisce trasformazione AI per i settori dei servizi finanziari e sanitari.',
      },
    },
    us: {
      image: '🇺🇸',
      description: {
        en: 'Our US operations specialize in AI coaching and product development for tech startups.',
        de: 'Unsere US-Operationen sind spezialisiert auf KI-Coaching und Produktentwicklung für Tech-Startups.',
        it: 'Le nostre operazioni negli Stati Uniti sono specializzate in coaching AI e sviluppo di prodotti per startup tecnologiche.',
      },
    },
    spain: {
      image: '🇪🇸',
      description: {
        en: 'Our Spanish team focuses on AI workshops and education for businesses across sectors.',
        de: 'Unser spanisches Team konzentriert sich auf KI-Workshops und Bildung für Unternehmen aller Branchen.',
        it: 'Il nostro team spagnolo si concentra su workshop e formazione AI per aziende di tutti i settori.',
      },
    },
  };
  
  return (
    <div className="cyber-card group hover:border-cyber-purple transition-colors duration-300">
      <div className="text-7xl mb-6">{locationInfo[id as keyof typeof locationInfo].image}</div>
      <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-cyber-blue transition-colors">
        {title}
      </h3>
      <p className="text-gray-300 mb-6">
        {locationInfo[id as keyof typeof locationInfo].description[lang as keyof typeof locationInfo.germany.description]}
      </p>
      <Link 
        href={`/${lang}/locations/${id}`} 
        className="cyber-button inline-block"
      >
        {getTranslation('common.learn_more', lang)}
      </Link>
    </div>
  );
}

// Main locations page component
export default function LocationsPage({ params }: { params: { lang: string } }) {
  const lang = supportedLanguages.includes(params.lang) ? params.lang : defaultLanguage;
  
  const pageTitle = lang === 'en' 
    ? 'Our Locations' 
    : lang === 'de' 
      ? 'Unsere Standorte' 
      : 'Le Nostre Sedi';
  
  const pageSubtitle = lang === 'en'
    ? 'Delivering AI transformation services across Europe and North America'
    : lang === 'de'
      ? 'KI-Transformationsdienste in Europa und Nordamerika'
      : 'Fornitura di servizi di trasformazione AI in Europa e Nord America';
  
  return (
    <>
      {/* Hero section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background effect */}
        <div className="absolute inset-0 bg-cyber-black">
          <div className="absolute inset-0 bg-cyber-radial opacity-30"></div>
          <div className="absolute top-0 left-0 right-0 h-px bg-cyber-blue/30"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-cyber-blue/30"></div>
        </div>
        
        <div className="cyber-container relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <h1 className="cyber-gradient-text text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              {pageTitle}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl">
              {pageSubtitle}
            </p>
          </div>
        </div>
      </section>
      
      {/* Locations section */}
      <section className="py-20 bg-cyber-black">
        <div className="cyber-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {locations.map((location) => (
              <LocationCard
                key={location.id}
                id={location.id}
                title={getTranslation(location.translationKey, lang)}
                lang={lang}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Global presence section */}
      <section className="py-20 bg-cyber-darkgray">
        <div className="cyber-container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-white">
              {lang === 'en' 
                ? 'Our Global Presence' 
                : lang === 'de' 
                  ? 'Unsere globale Präsenz' 
                  : 'La Nostra Presenza Globale'}
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              {lang === 'en'
                ? 'With teams across Europe and North America, we deliver localized AI transformation services tailored to regional business needs and cultural contexts.'
                : lang === 'de'
                  ? 'Mit Teams in ganz Europa und Nordamerika bieten wir lokalisierte KI-Transformationsdienste, die auf regionale Geschäftsanforderungen und kulturelle Kontexte zugeschnitten sind.'
                  : 'Con team in tutta Europa e Nord America, forniamo servizi di trasformazione AI localizzati, adattati alle esigenze aziendali regionali e ai contesti culturali.'}
            </p>
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="py-20 bg-cyber-black relative overflow-hidden">
        {/* Background effect */}
        <div className="absolute inset-0 bg-cyber-radial opacity-20"></div>
        
        <div className="cyber-container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              <span className="cyber-gradient-text">
                {lang === 'en' 
                  ? 'Ready to work with our global team?' 
                  : lang === 'de' 
                    ? 'Bereit, mit unserem globalen Team zu arbeiten?' 
                    : 'Pronto a lavorare con il nostro team globale?'}
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              {lang === 'en'
                ? 'Contact us today to discuss how our services can help your business, no matter where you are located.'
                : lang === 'de'
                  ? 'Kontaktieren Sie uns noch heute, um zu besprechen, wie unsere Dienstleistungen Ihrem Unternehmen helfen können, egal wo Sie sich befinden.'
                  : 'Contattaci oggi per discutere di come i nostri servizi possono aiutare la tua azienda, indipendentemente da dove ti trovi.'}
            </p>
            <Link 
              href={`/${lang}/contact`} 
              className="cyber-button text-lg px-8 py-4"
            >
              {getTranslation('common.contact_us', lang)}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
