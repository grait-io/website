import { Metadata } from 'next';
import { getTranslation, locations, services } from '@/lib/i18n';
import { supportedLanguages, defaultLanguage } from '@/middleware';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Generate static params for all location pages
export function generateStaticParams() {
  const params = [];
  
  for (const lang of supportedLanguages) {
    for (const location of locations) {
      params.push({
        lang,
        id: location.id,
      });
    }
  }
  
  return params;
}

// Generate metadata for each location page
export async function generateMetadata({ 
  params 
}: { 
  params: { lang: string; id: string } 
}): Promise<Metadata> {
  const { lang, id } = params;
  const validLang = supportedLanguages.includes(lang) ? lang : defaultLanguage;
  
  // Find the location
  const location = locations.find((l) => l.id === id);
  if (!location) {
    return {
      title: 'Location Not Found',
    };
  }
  
  const locationTitle = getTranslation(location.translationKey, validLang);
  
  const title = `${locationTitle} | grait.io`;
  
  const descriptions = {
    germany: {
      en: 'AI transformation services in Germany specializing in manufacturing and industrial automation.',
      de: 'KI-Transformationsdienste in Deutschland, spezialisiert auf Fertigung und industrielle Automatisierung.',
      it: 'Servizi di trasformazione AI in Germania specializzati in produzione e automazione industriale.',
    },
    italy: {
      en: 'AI solutions in Italy focusing on design, fashion, and creative industries.',
      de: 'KI-Lösungen in Italien mit Fokus auf Design, Mode und Kreativbranchen.',
      it: 'Soluzioni AI in Italia focalizzate su design, moda e industrie creative.',
    },
    uk: {
      en: 'AI transformation services in the UK for financial services and healthcare sectors.',
      de: 'KI-Transformationsdienste in Großbritannien für Finanzdienstleistungen und Gesundheitssektoren.',
      it: 'Servizi di trasformazione AI nel Regno Unito per i settori dei servizi finanziari e sanitari.',
    },
    us: {
      en: 'AI coaching and product development in the US for tech startups and enterprises.',
      de: 'KI-Coaching und Produktentwicklung in den USA für Tech-Startups und Unternehmen.',
      it: 'Coaching AI e sviluppo di prodotti negli Stati Uniti per startup tecnologiche e imprese.',
    },
    spain: {
      en: 'AI workshops and education in Spain for businesses across various sectors.',
      de: 'KI-Workshops und Bildung in Spanien für Unternehmen verschiedener Branchen.',
      it: 'Workshop e formazione AI in Spagna per aziende di vari settori.',
    },
  };
  
  const description = descriptions[id as keyof typeof descriptions]?.[validLang as keyof typeof descriptions.germany] || '';
  
  return {
    title,
    description,
  };
}

// Service card component for location page
function ServiceCard({ 
  id, 
  title, 
  lang,
  locationId
}: { 
  id: string; 
  title: string; 
  lang: string;
  locationId: string;
}) {
  // Service descriptions specific to each location
  const serviceDescriptions = {
    germany: {
      ai_integration: {
        en: 'AI integration for German manufacturing and industrial automation sectors.',
        de: 'KI-Integration für deutsche Fertigungs- und industrielle Automatisierungssektoren.',
        it: 'Integrazione AI per i settori manifatturiero e di automazione industriale tedeschi.',
      },
      ai_coaching: {
        en: 'AI transformation coaching for German businesses adopting Industry 4.0.',
        de: 'KI-Transformations-Coaching für deutsche Unternehmen, die Industrie 4.0 einführen.',
        it: 'Coaching di trasformazione AI per le aziende tedesche che adottano l\'Industria 4.0.',
      },
      product_development: {
        en: 'AI product development tailored to German market requirements and regulations.',
        de: 'KI-Produktentwicklung, zugeschnitten auf deutsche Marktanforderungen und Vorschriften.',
        it: 'Sviluppo di prodotti AI adattati ai requisiti e alle normative del mercato tedesco.',
      },
      workshops: {
        en: 'Specialized AI workshops for German engineering and technical teams.',
        de: 'Spezialisierte KI-Workshops für deutsche Ingenieur- und technische Teams.',
        it: 'Workshop AI specializzati per team di ingegneria e tecnici tedeschi.',
      },
    },
    italy: {
      ai_integration: {
        en: 'AI integration for Italian design, fashion, and creative industries.',
        de: 'KI-Integration für italienische Design-, Mode- und Kreativbranchen.',
        it: 'Integrazione AI per le industrie italiane del design, della moda e creative.',
      },
      ai_coaching: {
        en: 'AI transformation coaching for Italian creative businesses and studios.',
        de: 'KI-Transformations-Coaching für italienische Kreativunternehmen und Studios.',
        it: 'Coaching di trasformazione AI per aziende e studi creativi italiani.',
      },
      product_development: {
        en: 'AI-enhanced product development for Italian luxury and design sectors.',
        de: 'KI-gestützte Produktentwicklung für italienische Luxus- und Designsektoren.',
        it: 'Sviluppo di prodotti potenziati dall\'AI per i settori italiani del lusso e del design.',
      },
      workshops: {
        en: 'Creative AI workshops for Italian design and fashion professionals.',
        de: 'Kreative KI-Workshops für italienische Design- und Modeprofis.',
        it: 'Workshop creativi di AI per professionisti italiani del design e della moda.',
      },
    },
    uk: {
      ai_integration: {
        en: 'AI integration for UK financial services and healthcare sectors.',
        de: 'KI-Integration für britische Finanzdienstleistungen und Gesundheitssektoren.',
        it: 'Integrazione AI per i settori dei servizi finanziari e sanitari del Regno Unito.',
      },
      ai_coaching: {
        en: 'AI transformation coaching for UK enterprises and public sector organizations.',
        de: 'KI-Transformations-Coaching für britische Unternehmen und Organisationen des öffentlichen Sektors.',
        it: 'Coaching di trasformazione AI per imprese e organizzazioni del settore pubblico del Regno Unito.',
      },
      product_development: {
        en: 'AI product development for UK fintech and healthtech innovations.',
        de: 'KI-Produktentwicklung für britische Fintech- und Healthtech-Innovationen.',
        it: 'Sviluppo di prodotti AI per innovazioni fintech e healthtech del Regno Unito.',
      },
      workshops: {
        en: 'Specialized AI workshops for UK financial and healthcare professionals.',
        de: 'Spezialisierte KI-Workshops für britische Finanz- und Gesundheitsfachleute.',
        it: 'Workshop AI specializzati per professionisti finanziari e sanitari del Regno Unito.',
      },
    },
    us: {
      ai_integration: {
        en: 'AI integration for US tech startups and enterprise systems.',
        de: 'KI-Integration für US-Tech-Startups und Unternehmenssysteme.',
        it: 'Integrazione AI per startup tecnologiche statunitensi e sistemi aziendali.',
      },
      ai_coaching: {
        en: 'AI transformation coaching for US tech companies and startups.',
        de: 'KI-Transformations-Coaching für US-Technologieunternehmen und Startups.',
        it: 'Coaching di trasformazione AI per aziende tecnologiche e startup statunitensi.',
      },
      product_development: {
        en: 'Innovative AI product development for US market and global scaling.',
        de: 'Innovative KI-Produktentwicklung für den US-Markt und globale Skalierung.',
        it: 'Sviluppo di prodotti AI innovativi per il mercato statunitense e la scalabilità globale.',
      },
      workshops: {
        en: 'Advanced AI workshops for US tech teams and entrepreneurs.',
        de: 'Fortgeschrittene KI-Workshops für US-Tech-Teams und Unternehmer.',
        it: 'Workshop AI avanzati per team tecnologici e imprenditori statunitensi.',
      },
    },
    spain: {
      ai_integration: {
        en: 'AI integration for Spanish businesses across various sectors.',
        de: 'KI-Integration für spanische Unternehmen verschiedener Branchen.',
        it: 'Integrazione AI per aziende spagnole di vari settori.',
      },
      ai_coaching: {
        en: 'AI transformation coaching for Spanish organizations and educational institutions.',
        de: 'KI-Transformations-Coaching für spanische Organisationen und Bildungseinrichtungen.',
        it: 'Coaching di trasformazione AI per organizzazioni e istituzioni educative spagnole.',
      },
      product_development: {
        en: 'AI product development tailored to Spanish and Latin American markets.',
        de: 'KI-Produktentwicklung, zugeschnitten auf spanische und lateinamerikanische Märkte.',
        it: 'Sviluppo di prodotti AI adattati ai mercati spagnoli e latinoamericani.',
      },
      workshops: {
        en: 'Comprehensive AI workshops and education programs for Spanish businesses.',
        de: 'Umfassende KI-Workshops und Bildungsprogramme für spanische Unternehmen.',
        it: 'Workshop e programmi educativi AI completi per aziende spagnole.',
      },
    },
  };
  
  const description = serviceDescriptions[locationId as keyof typeof serviceDescriptions]?.[id as keyof typeof serviceDescriptions.germany]?.[lang as keyof typeof serviceDescriptions.germany.ai_integration] || '';
  
  return (
    <div className="cyber-card group hover:border-cyber-purple transition-colors duration-300">
      <h3 className="text-xl font-bold mb-4 text-white group-hover:text-cyber-blue transition-colors">
        {title}
      </h3>
      <p className="text-gray-300 mb-6">
        {description}
      </p>
      <Link 
        href={`/${lang}/services/${id}`} 
        className="text-cyber-blue hover:text-cyber-purple flex items-center"
      >
        {getTranslation('common.learn_more', lang)}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-4 w-4 ml-1" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
}

// Location detail page component
export default function LocationPage({ 
  params 
}: { 
  params: { lang: string; id: string } 
}) {
  const { lang, id } = params;
  const validLang = supportedLanguages.includes(lang) ? lang : defaultLanguage;
  
  // Find the location
  const location = locations.find((l) => l.id === id);
  if (!location) {
    notFound();
  }
  
  const locationTitle = getTranslation(location.translationKey, validLang);
  
  // Location-specific content
  const locationContent = {
    germany: {
      image: '🇩🇪',
      description: {
        en: 'Our German team specializes in AI integration for manufacturing and industrial automation, helping businesses across Germany leverage artificial intelligence to enhance productivity, quality, and innovation in their operations.',
        de: 'Unser deutsches Team ist spezialisiert auf KI-Integration für Fertigung und industrielle Automatisierung und hilft Unternehmen in ganz Deutschland, künstliche Intelligenz zu nutzen, um Produktivität, Qualität und Innovation in ihren Betrieben zu verbessern.',
        it: 'Il nostro team tedesco è specializzato nell\'integrazione AI per la produzione e l\'automazione industriale, aiutando le aziende in tutta la Germania a sfruttare l\'intelligenza artificiale per migliorare produttività, qualità e innovazione nelle loro operazioni.',
      },
      industries: {
        en: ['Manufacturing', 'Automotive', 'Industrial Automation', 'Engineering', 'Logistics'],
        de: ['Fertigung', 'Automobilindustrie', 'Industrielle Automatisierung', 'Ingenieurwesen', 'Logistik'],
        it: ['Produzione', 'Automotive', 'Automazione industriale', 'Ingegneria', 'Logistica'],
      },
    },
    italy: {
      image: '🇮🇹',
      description: {
        en: 'Our Italian office focuses on AI solutions for design, fashion, and creative industries, bringing cutting-edge artificial intelligence capabilities to Italy\'s renowned creative and cultural sectors.',
        de: 'Unser italienisches Büro konzentriert sich auf KI-Lösungen für Design, Mode und Kreativbranchen und bringt modernste künstliche Intelligenzfähigkeiten in Italiens renommierte Kreativ- und Kultursektoren.',
        it: 'Il nostro ufficio italiano si concentra su soluzioni AI per design, moda e industrie creative, portando capacità di intelligenza artificiale all\'avanguardia nei rinomati settori creativi e culturali dell\'Italia.',
      },
      industries: {
        en: ['Fashion', 'Design', 'Luxury Goods', 'Creative Arts', 'Cultural Institutions'],
        de: ['Mode', 'Design', 'Luxusgüter', 'Kreative Künste', 'Kulturelle Einrichtungen'],
        it: ['Moda', 'Design', 'Beni di lusso', 'Arti creative', 'Istituzioni culturali'],
      },
    },
    uk: {
      image: '🇬🇧',
      description: {
        en: 'Our UK team delivers AI transformation for financial services and healthcare sectors, helping British organizations harness the power of artificial intelligence to improve services, efficiency, and outcomes.',
        de: 'Unser britisches Team liefert KI-Transformation für Finanzdienstleistungen und Gesundheitssektoren und hilft britischen Organisationen, die Kraft der künstlichen Intelligenz zu nutzen, um Dienstleistungen, Effizienz und Ergebnisse zu verbessern.',
        it: 'Il nostro team britannico fornisce trasformazione AI per i settori dei servizi finanziari e sanitari, aiutando le organizzazioni britanniche a sfruttare la potenza dell\'intelligenza artificiale per migliorare servizi, efficienza e risultati.',
      },
      industries: {
        en: ['Financial Services', 'Healthcare', 'Insurance', 'Public Sector', 'Education'],
        de: ['Finanzdienstleistungen', 'Gesundheitswesen', 'Versicherungen', 'Öffentlicher Sektor', 'Bildung'],
        it: ['Servizi finanziari', 'Sanità', 'Assicurazioni', 'Settore pubblico', 'Istruzione'],
      },
    },
    us: {
      image: '🇺🇸',
      description: {
        en: 'Our US operations specialize in AI coaching and product development for tech startups and enterprises, helping American companies innovate and scale with artificial intelligence technologies.',
        de: 'Unsere US-Operationen sind spezialisiert auf KI-Coaching und Produktentwicklung für Tech-Startups und Unternehmen und helfen amerikanischen Unternehmen, mit künstlichen Intelligenztechnologien zu innovieren und zu skalieren.',
        it: 'Le nostre operazioni negli Stati Uniti sono specializzate in coaching AI e sviluppo di prodotti per startup tecnologiche e imprese, aiutando le aziende americane a innovare e scalare con tecnologie di intelligenza artificiale.',
      },
      industries: {
        en: ['Technology', 'Software', 'E-commerce', 'Media', 'Telecommunications'],
        de: ['Technologie', 'Software', 'E-Commerce', 'Medien', 'Telekommunikation'],
        it: ['Tecnologia', 'Software', 'E-commerce', 'Media', 'Telecomunicazioni'],
      },
    },
    spain: {
      image: '🇪🇸',
      description: {
        en: 'Our Spanish team focuses on AI workshops and education for businesses across sectors, providing comprehensive training and knowledge transfer to organizations throughout Spain.',
        de: 'Unser spanisches Team konzentriert sich auf KI-Workshops und Bildung für Unternehmen aller Branchen und bietet umfassende Schulungen und Wissenstransfer für Organisationen in ganz Spanien.',
        it: 'Il nostro team spagnolo si concentra su workshop e formazione AI per aziende di tutti i settori, fornendo formazione completa e trasferimento di conoscenze alle organizzazioni in tutta la Spagna.',
      },
      industries: {
        en: ['Education', 'Tourism', 'Retail', 'Agriculture', 'Energy'],
        de: ['Bildung', 'Tourismus', 'Einzelhandel', 'Landwirtschaft', 'Energie'],
        it: ['Istruzione', 'Turismo', 'Vendita al dettaglio', 'Agricoltura', 'Energia'],
      },
    },
  };
  
  const content = locationContent[id as keyof typeof locationContent];
  
  // Section titles
  const overviewTitle = validLang === 'en' 
    ? 'Overview' 
    : validLang === 'de' 
      ? 'Überblick' 
      : 'Panoramica';
  
  const industriesTitle = validLang === 'en' 
    ? 'Industries We Serve' 
    : validLang === 'de' 
      ? 'Branchen, die wir bedienen' 
      : 'Industrie che serviamo';
  
  const servicesTitle = validLang === 'en' 
    ? 'Our Services in ' + locationTitle
    : validLang === 'de' 
      ? 'Unsere Dienstleistungen in ' + locationTitle
      : 'I Nostri Servizi in ' + locationTitle;
  
  const ctaTitle = validLang === 'en' 
    ? 'Ready to work with our ' + locationTitle + ' team?' 
    : validLang === 'de' 
      ? 'Bereit, mit unserem ' + locationTitle + '-Team zu arbeiten?' 
      : 'Pronto a lavorare con il nostro team in ' + locationTitle + '?';
  
  const ctaText = validLang === 'en'
    ? 'Contact us today to discuss how our services in ' + locationTitle + ' can help your business.'
    : validLang === 'de'
      ? 'Kontaktieren Sie uns noch heute, um zu besprechen, wie unsere Dienstleistungen in ' + locationTitle + ' Ihrem Unternehmen helfen können.'
      : 'Contattaci oggi per discutere di come i nostri servizi in ' + locationTitle + ' possono aiutare la tua azienda.';
  
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
            <div className="text-7xl mb-6">{content.image}</div>
            <h1 className="cyber-gradient-text text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              {locationTitle}
            </h1>
          </div>
        </div>
      </section>
      
      {/* Overview section */}
      <section className="py-20 bg-cyber-black">
        <div className="cyber-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-white">
              {overviewTitle}
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              {content.description[validLang as keyof typeof content.description]}
            </p>
          </div>
        </div>
      </section>
      
      {/* Industries section */}
      <section className="py-20 bg-cyber-darkgray">
        <div className="cyber-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-white">
              {industriesTitle}
            </h2>
            <div className="flex flex-wrap gap-4">
              {content.industries[validLang as keyof typeof content.industries].map((industry, index) => (
                <div key={index} className="bg-cyber-black/50 border border-cyber-blue/30 px-4 py-2 rounded-sm">
                  <span className="text-white">{industry}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Services section */}
      <section className="py-20 bg-cyber-black">
        <div className="cyber-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-white">
              {servicesTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service) => (
                <ServiceCard
                  key={service.id}
                  id={service.id}
                  title={getTranslation(service.translationKey, validLang)}
                  lang={validLang}
                  locationId={id}
                />
              ))}
            </div>
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
                {ctaTitle}
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              {ctaText}
            </p>
            <Link 
              href={`/${validLang}/contact`} 
              className="cyber-button text-lg px-8 py-4"
            >
              {getTranslation('common.contact_us', validLang)}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
