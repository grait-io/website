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
  
  const title = `AI for ${locationTitle} Businesses - No Technical Expertise Required | grait.io`;
  
  const descriptions = {
    germany: {
      en: 'Future-proof your German business in 90 days - no AI expertise required. 72h implementation guarantee and 12-month ROI guarantee for manufacturing and industrial companies.',
      de: 'Machen Sie Ihr deutsches Unternehmen in 90 Tagen zukunftssicher - keine KI-Expertise erforderlich. 72-Stunden-Implementierungsgarantie und 12-Monats-ROI-Garantie für Fertigungs- und Industrieunternehmen.',
      it: 'Rendi la tua azienda tedesca a prova di futuro in 90 giorni - nessuna competenza AI richiesta. Garanzia di implementazione in 72 ore e garanzia ROI di 12 mesi per aziende manifatturiere e industriali.',
    },
    italy: {
      en: 'AI for Italian Excellence: Automate La Dolce Vita. Specialized solutions for design, fashion, and luxury brands with no technical jargon.',
      de: 'KI für italienische Exzellenz: Automatisieren Sie La Dolce Vita. Spezialisierte Lösungen für Design, Mode und Luxusmarken ohne technischen Fachjargon.',
      it: 'AI per l\'Eccellenza Italiana: Automatizza La Dolce Vita. Soluzioni specializzate per design, moda e marchi di lusso senza gergo tecnico.',
    },
    uk: {
      en: 'Transform your UK business with AI - no coding required. Specialized solutions for financial services and healthcare with measurable ROI in 30 days.',
      de: 'Transformieren Sie Ihr britisches Unternehmen mit KI - keine Programmierung erforderlich. Spezialisierte Lösungen für Finanzdienstleistungen und Gesundheitswesen mit messbarem ROI in 30 Tagen.',
      it: 'Trasforma la tua azienda britannica con l\'AI - nessuna programmazione richiesta. Soluzioni specializzate per servizi finanziari e sanitari con ROI misurabile in 30 giorni.',
    },
    us: {
      en: 'Make your US business 3x more productive with AI - no tech skills needed. Specialized solutions for tech startups and enterprises with 12.6x average first-year ROI.',
      de: 'Machen Sie Ihr US-Unternehmen mit KI 3x produktiver - keine technischen Kenntnisse erforderlich. Spezialisierte Lösungen für Tech-Startups und Unternehmen mit durchschnittlich 12,6-fachem ROI im ersten Jahr.',
      it: 'Rendi la tua azienda statunitense 3 volte più produttiva con l\'AI - nessuna competenza tecnica necessaria. Soluzioni specializzate per startup tecnologiche e imprese con ROI medio di 12,6 volte nel primo anno.',
    },
    spain: {
      en: 'Future-proof your Spanish business with AI - no technical expertise required. Specialized solutions for tourism, retail and education with 72h implementation guarantee.',
      de: 'Machen Sie Ihr spanisches Unternehmen mit KI zukunftssicher - keine technische Expertise erforderlich. Spezialisierte Lösungen für Tourismus, Einzelhandel und Bildung mit 72-Stunden-Implementierungsgarantie.',
      it: 'Rendi la tua azienda spagnola a prova di futuro con l\'AI - nessuna competenza tecnica richiesta. Soluzioni specializzate per turismo, vendita al dettaglio e istruzione con garanzia di implementazione in 72 ore.',
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
        en: 'Our German team helps manufacturing and industrial businesses automate repetitive tasks and boost productivity without requiring any technical expertise from you. We speak your business language, not tech jargon, and deliver measurable results in 72 hours.',
        de: 'Unser deutsches Team hilft Fertigungs- und Industrieunternehmen, repetitive Aufgaben zu automatisieren und die Produktivität zu steigern, ohne dass Sie technisches Fachwissen benötigen. Wir sprechen Ihre Geschäftssprache, nicht Tech-Jargon, und liefern messbare Ergebnisse in 72 Stunden.',
        it: 'Il nostro team tedesco aiuta le aziende manifatturiere e industriali ad automatizzare le attività ripetitive e aumentare la produttività senza richiedere alcuna competenza tecnica da parte tua. Parliamo il tuo linguaggio aziendale, non il gergo tecnico, e forniamo risultati misurabili in 72 ore.',
      },
      industries: {
        en: ['Manufacturing', 'Automotive', 'Industrial Automation', 'Engineering', 'Logistics'],
        de: ['Fertigung', 'Automobilindustrie', 'Industrielle Automatisierung', 'Ingenieurwesen', 'Logistik'],
        it: ['Produzione', 'Automotive', 'Automazione industriale', 'Ingegneria', 'Logistica'],
      },
      caseStudy: {
        en: {
          title: 'German Manufacturing Success Story',
          company: 'Precision Auto Parts GmbH',
          results: [
            '47% reduction in quality control costs',
            '83% faster production planning',
            '12.6x ROI in first year',
            'Implementation completed in just 14 days'
          ]
        },
        de: {
          title: 'Deutsche Fertigungserfolgsgeschichte',
          company: 'Präzisions-Autoteile GmbH',
          results: [
            '47% Reduzierung der Qualitätskontrollkosten',
            '83% schnellere Produktionsplanung',
            '12,6x ROI im ersten Jahr',
            'Implementierung in nur 14 Tagen abgeschlossen'
          ]
        },
        it: {
          title: 'Storia di successo nella produzione tedesca',
          company: 'Precision Auto Parts GmbH',
          results: [
            'Riduzione del 47% dei costi di controllo qualità',
            'Pianificazione della produzione più veloce dell\'83%',
            '12,6x ROI nel primo anno',
            'Implementazione completata in soli 14 giorni'
          ]
        }
      }
    },
    italy: {
      image: '🇮🇹',
      description: {
        en: 'Our Italian team specializes in AI for luxury brands, fashion houses, and creative studios. We integrate with Italian accounting systems (Fatture in Cloud, TeamSystem), comply with local regulations, and have native Italian-speaking AI experts who understand your business needs.',
        de: 'Unser italienisches Team ist spezialisiert auf KI für Luxusmarken, Modehäuser und Kreativstudios. Wir integrieren mit italienischen Buchhaltungssystemen (Fatture in Cloud, TeamSystem), entsprechen den lokalen Vorschriften und haben italienischsprachige KI-Experten, die Ihre Geschäftsanforderungen verstehen.',
        it: 'Il nostro team italiano è specializzato in AI per marchi di lusso, case di moda e studi creativi. Ci integriamo con i sistemi di contabilità italiani (Fatture in Cloud, TeamSystem), rispettiamo le normative locali e abbiamo esperti AI di madrelingua italiana che comprendono le tue esigenze aziendali.',
      },
      industries: {
        en: ['Fashion', 'Design', 'Luxury Goods', 'Creative Arts', 'Cultural Institutions'],
        de: ['Mode', 'Design', 'Luxusgüter', 'Kreative Künste', 'Kulturelle Einrichtungen'],
        it: ['Moda', 'Design', 'Beni di lusso', 'Arti creative', 'Istituzioni culturali'],
      },
      caseStudy: {
        en: {
          title: 'Italian Luxury Brand Success Story',
          company: 'Milano Leather Goods',
          results: [
            'Automated 80% of custom order processing',
            'Reduced customer service costs by €12k/month',
            'Implemented in 14 days during peak season',
            'Zero disruption to existing operations'
          ]
        },
        de: {
          title: 'Erfolgsgeschichte einer italienischen Luxusmarke',
          company: 'Milano Leather Goods',
          results: [
            'Automatisierung von 80% der Bearbeitung von Sonderanfertigungen',
            'Reduzierung der Kundendienstkosten um 12.000 €/Monat',
            'Implementierung in 14 Tagen während der Hochsaison',
            'Keine Unterbrechung der bestehenden Abläufe'
          ]
        },
        it: {
          title: 'Storia di successo di un marchio di lusso italiano',
          company: 'Milano Leather Goods',
          results: [
            'Automatizzato l\'80% dell\'elaborazione degli ordini personalizzati',
            'Riduzione dei costi del servizio clienti di €12k/mese',
            'Implementato in 14 giorni durante l\'alta stagione',
            'Zero interruzioni alle operazioni esistenti'
          ]
        }
      }
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
      caseStudy: {
        en: {
          title: 'UK Financial Services Success Story',
          company: 'London Investment Group',
          results: [
            '83% faster client onboarding process',
            '£240,000 annual cost savings',
            'Regulatory compliance improved by 95%',
            'Implementation completed in 21 days'
          ]
        },
        de: {
          title: 'Erfolgsgeschichte britischer Finanzdienstleistungen',
          company: 'London Investment Group',
          results: [
            '83% schnellerer Kundenonboarding-Prozess',
            '£240.000 jährliche Kosteneinsparungen',
            'Verbesserung der regulatorischen Compliance um 95%',
            'Implementierung in 21 Tagen abgeschlossen'
          ]
        },
        it: {
          title: 'Storia di successo dei servizi finanziari britannici',
          company: 'London Investment Group',
          results: [
            'Processo di onboarding dei clienti più veloce dell\'83%',
            'Risparmi annuali di £240.000',
            'Conformità normativa migliorata del 95%',
            'Implementazione completata in 21 giorni'
          ]
        }
      }
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
      caseStudy: {
        en: {
          title: 'US Tech Startup Success Story',
          company: 'InnovateTech Solutions',
          results: [
            'Reduced development time by 68%',
            'Increased customer acquisition by 3.5x',
            '$1.2M in additional revenue first year',
            'Scaled team productivity without adding headcount'
          ]
        },
        de: {
          title: 'Erfolgsgeschichte eines US-Tech-Startups',
          company: 'InnovateTech Solutions',
          results: [
            'Reduzierung der Entwicklungszeit um 68%',
            '3,5-fache Steigerung der Kundenakquise',
            '1,2 Mio. $ zusätzlicher Umsatz im ersten Jahr',
            'Skalierte Teamproduktivität ohne zusätzliche Mitarbeiter'
          ]
        },
        it: {
          title: 'Storia di successo di una startup tecnologica statunitense',
          company: 'InnovateTech Solutions',
          results: [
            'Tempo di sviluppo ridotto del 68%',
            'Acquisizione clienti aumentata di 3,5 volte',
            '1,2 milioni di $ di entrate aggiuntive nel primo anno',
            'Produttività del team scalata senza aggiungere personale'
          ]
        }
      }
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
      caseStudy: {
        en: {
          title: 'Spanish Tourism Success Story',
          company: 'Barcelona Hospitality Group',
          results: [
            '42% increase in booking conversions',
            '€8,500 monthly savings in operational costs',
            'Customer satisfaction improved by 37%',
            'Staff training completed in just 10 days'
          ]
        },
        de: {
          title: 'Erfolgsgeschichte im spanischen Tourismus',
          company: 'Barcelona Hospitality Group',
          results: [
            '42% Steigerung der Buchungskonversionen',
            '€8.500 monatliche Einsparungen bei Betriebskosten',
            'Kundenzufriedenheit um 37% verbessert',
            'Mitarbeiterschulung in nur 10 Tagen abgeschlossen'
          ]
        },
        it: {
          title: 'Storia di successo del turismo spagnolo',
          company: 'Barcelona Hospitality Group',
          results: [
            'Aumento del 42% nelle conversioni di prenotazione',
            'Risparmi mensili di €8.500 nei costi operativi',
            'Soddisfazione del cliente migliorata del 37%',
            'Formazione del personale completata in soli 10 giorni'
          ]
        }
      }
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
            
            {/* Key Stats Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 mb-8">
              <div className="bg-cyber-blue/10 border border-cyber-blue/30 p-6 text-center">
                <div className="text-2xl font-bold text-cyber-blue mb-2">
                  {validLang === 'en' ? '72h' : validLang === 'de' ? '72h' : '72h'}
                </div>
                <div className="text-gray-300">
                  {validLang === 'en' ? 'Implementation Guarantee' : 
                   validLang === 'de' ? 'Implementierungsgarantie' : 
                   'Garanzia di implementazione'}
                </div>
              </div>
              <div className="bg-cyber-purple/10 border border-cyber-purple/30 p-6 text-center">
                <div className="text-2xl font-bold text-cyber-purple mb-2">
                  {validLang === 'en' ? '0%' : validLang === 'de' ? '0%' : '0%'}
                </div>
                <div className="text-gray-300">
                  {validLang === 'en' ? 'Technical Jargon' : 
                   validLang === 'de' ? 'Technischer Jargon' : 
                   'Gergo tecnico'}
                </div>
              </div>
              <div className="bg-cyber-green/10 border border-cyber-green/30 p-6 text-center">
                <div className="text-2xl font-bold text-cyber-green mb-2">
                  {validLang === 'en' ? '12-Month' : validLang === 'de' ? '12-Monat' : '12-Mesi'}
                </div>
                <div className="text-gray-300">
                  {validLang === 'en' ? 'ROI Guarantee' : 
                   validLang === 'de' ? 'ROI-Garantie' : 
                   'Garanzia ROI'}
                </div>
              </div>
            </div>
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
      
      {/* Case Study section */}
      <section className="py-20 bg-cyber-black">
        <div className="cyber-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-white">
              {validLang === 'en' ? 'Success Story' : 
               validLang === 'de' ? 'Erfolgsgeschichte' : 
               'Storia di successo'}
            </h2>
            
            <div className="cyber-card border-cyber-purple">
              <h3 className="text-2xl font-bold mb-4 text-white">
                {content.caseStudy[validLang as keyof typeof content.caseStudy].title}
              </h3>
              <p className="text-xl text-cyber-purple mb-6">
                {content.caseStudy[validLang as keyof typeof content.caseStudy].company}
              </p>
              
              <div className="mb-6">
                <p className="text-gray-300 mb-4">
                  {validLang === 'en' ? 'Results achieved:' : 
                   validLang === 'de' ? 'Erzielte Ergebnisse:' : 
                   'Risultati raggiunti:'}
                </p>
                <ul className="space-y-2">
                  {content.caseStudy[validLang as keyof typeof content.caseStudy].results.map((result: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <div className="text-cyber-purple mr-2">✓</div>
                      <p className="text-gray-300">{result}</p>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-cyber-blue/10 border border-cyber-blue/30 p-4 rounded-sm">
                <p className="text-gray-300 italic">
                  {validLang === 'en' 
                    ? '"We thought AI was only for tech companies, but grAIt.io made it accessible for our business. No technical jargon, just measurable results."' 
                    : validLang === 'de'
                      ? '"Wir dachten, KI sei nur für Technologieunternehmen, aber grAIt.io hat sie für unser Unternehmen zugänglich gemacht. Kein technischer Fachjargon, nur messbare Ergebnisse."'
                      : '"Pensavamo che l\'AI fosse solo per aziende tecnologiche, ma grAIt.io l\'ha resa accessibile per la nostra azienda. Nessun gergo tecnico, solo risultati misurabili."'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services section */}
      <section className="py-20 bg-cyber-darkgray">
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
            <p className="text-xl text-gray-300 mb-6">
              {ctaText}
            </p>
            <p className="text-lg text-cyber-blue mb-10">
              {validLang === 'en'
                ? 'Only 3 spots left this quarter!'
                : validLang === 'de'
                  ? 'Nur noch 3 Plätze in diesem Quartal!'
                  : 'Solo 3 posti rimasti questo trimestre!'}
            </p>
            <Link 
              href={`/${validLang}/contact`} 
              className="cyber-button text-lg px-8 py-4"
            >
              {validLang === 'en' ? 'Book Free Assessment →' : 
               validLang === 'de' ? 'Kostenlose Bewertung buchen →' : 
               'Prenota valutazione gratuita →'}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
