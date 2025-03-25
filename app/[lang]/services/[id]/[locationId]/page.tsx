import { Metadata } from 'next';
import { getTranslation, services, locations } from '@/lib/i18n';
import { supportedLanguages, defaultLanguage } from '@/middleware';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Generate static params for all service + location combinations
export function generateStaticParams() {
  const params = [];
  
  for (const lang of supportedLanguages) {
    for (const service of services) {
      for (const location of locations) {
        params.push({
          lang,
          id: service.id,
          locationId: location.id,
        });
      }
    }
  }
  
  return params;
}

// Generate metadata for each service + location page
export async function generateMetadata({ 
  params 
}: { 
  params: { lang: string; id: string; locationId: string } 
}): Promise<Metadata> {
  const { lang, id, locationId } = params;
  const validLang = supportedLanguages.includes(lang) ? lang : defaultLanguage;
  
  // Find the service and location
  const service = services.find((s) => s.id === id);
  const location = locations.find((l) => l.id === locationId);
  
  if (!service || !location) {
    return {
      title: 'Page Not Found',
    };
  }
  
  const serviceTitle = getTranslation(service.translationKey, validLang);
  const locationTitle = getTranslation(location.translationKey, validLang);
  
  const title = `${serviceTitle} in ${locationTitle} | grait.io`;
  
  // Generate SEO-optimized description
  const descriptions = {
    ai_integration: {
      germany: {
        en: 'AI Integration & Automation services in Germany for manufacturing and industrial sectors. Enhance productivity with cutting-edge artificial intelligence solutions.',
        de: 'KI-Integrations- und Automatisierungsdienste in Deutschland für Fertigungs- und Industriesektoren. Steigern Sie die Produktivität mit modernsten KI-Lösungen.',
        it: 'Servizi di Integrazione e Automazione AI in Germania per i settori manifatturiero e industriale. Migliora la produttività con soluzioni di intelligenza artificiale all\'avanguardia.',
      },
      italy: {
        en: 'AI Integration & Automation services in Italy for design, fashion, and creative industries. Transform your business with innovative artificial intelligence solutions.',
        de: 'KI-Integrations- und Automatisierungsdienste in Italien für Design-, Mode- und Kreativbranchen. Transformieren Sie Ihr Unternehmen mit innovativen KI-Lösungen.',
        it: 'Servizi di Integrazione e Automazione AI in Italia per le industrie del design, della moda e creative. Trasforma la tua azienda con soluzioni di intelligenza artificiale innovative.',
      },
      uk: {
        en: 'AI Integration & Automation services in the UK for financial services and healthcare sectors. Optimize operations with powerful artificial intelligence solutions.',
        de: 'KI-Integrations- und Automatisierungsdienste in Großbritannien für Finanzdienstleistungen und Gesundheitssektoren. Optimieren Sie Abläufe mit leistungsstarken KI-Lösungen.',
        it: 'Servizi di Integrazione e Automazione AI nel Regno Unito per i settori dei servizi finanziari e sanitari. Ottimizza le operazioni con potenti soluzioni di intelligenza artificiale.',
      },
      us: {
        en: 'AI Integration & Automation services in the US for tech startups and enterprises. Scale your business with advanced artificial intelligence solutions.',
        de: 'KI-Integrations- und Automatisierungsdienste in den USA für Tech-Startups und Unternehmen. Skalieren Sie Ihr Unternehmen mit fortschrittlichen KI-Lösungen.',
        it: 'Servizi di Integrazione e Automazione AI negli Stati Uniti per startup tecnologiche e imprese. Scala la tua azienda con soluzioni di intelligenza artificiale avanzate.',
      },
      spain: {
        en: 'AI Integration & Automation services in Spain for businesses across sectors. Modernize your operations with effective artificial intelligence solutions.',
        de: 'KI-Integrations- und Automatisierungsdienste in Spanien für Unternehmen verschiedener Branchen. Modernisieren Sie Ihre Abläufe mit effektiven KI-Lösungen.',
        it: 'Servizi di Integrazione e Automazione AI in Spagna per aziende di vari settori. Modernizza le tue operazioni con efficaci soluzioni di intelligenza artificiale.',
      },
    },
    ai_coaching: {
      germany: {
        en: 'AI Coaching & Transformation services in Germany for Industry 4.0 adoption. Guide your team through digital transformation with expert AI coaching.',
        de: 'KI-Coaching & Transformationsdienste in Deutschland für die Einführung von Industrie 4.0. Führen Sie Ihr Team durch die digitale Transformation mit Experten-KI-Coaching.',
        it: 'Servizi di Coaching e Trasformazione AI in Germania per l\'adozione dell\'Industria 4.0. Guida il tuo team attraverso la trasformazione digitale con coaching AI esperto.',
      },
      italy: {
        en: 'AI Coaching & Transformation services in Italy for creative businesses. Empower your team with the skills needed for AI-driven innovation.',
        de: 'KI-Coaching & Transformationsdienste in Italien für Kreativunternehmen. Statten Sie Ihr Team mit den Fähigkeiten aus, die für KI-gestützte Innovation erforderlich sind.',
        it: 'Servizi di Coaching e Trasformazione AI in Italia per aziende creative. Dota il tuo team delle competenze necessarie per l\'innovazione guidata dall\'AI.',
      },
      uk: {
        en: 'AI Coaching & Transformation services in the UK for financial and healthcare organizations. Develop AI capabilities with strategic guidance and training.',
        de: 'KI-Coaching & Transformationsdienste in Großbritannien für Finanz- und Gesundheitsorganisationen. Entwickeln Sie KI-Fähigkeiten mit strategischer Anleitung und Schulung.',
        it: 'Servizi di Coaching e Trasformazione AI nel Regno Unito per organizzazioni finanziarie e sanitarie. Sviluppa capacità AI con guida strategica e formazione.',
      },
      us: {
        en: 'AI Coaching & Transformation services in the US for tech companies and startups. Accelerate AI adoption with expert coaching and strategic guidance.',
        de: 'KI-Coaching & Transformationsdienste in den USA für Technologieunternehmen und Startups. Beschleunigen Sie die KI-Einführung mit Expertencoaching und strategischer Anleitung.',
        it: 'Servizi di Coaching e Trasformazione AI negli Stati Uniti per aziende tecnologiche e startup. Accelera l\'adozione dell\'AI con coaching esperto e guida strategica.',
      },
      spain: {
        en: 'AI Coaching & Transformation services in Spain for organizations and educational institutions. Build AI capabilities with comprehensive training and support.',
        de: 'KI-Coaching & Transformationsdienste in Spanien für Organisationen und Bildungseinrichtungen. Bauen Sie KI-Fähigkeiten mit umfassender Schulung und Unterstützung auf.',
        it: 'Servizi di Coaching e Trasformazione AI in Spagna per organizzazioni e istituzioni educative. Costruisci capacità AI con formazione e supporto completi.',
      },
    },
    product_development: {
      germany: {
        en: 'AI Product & Service Development in Germany tailored to local market requirements. Create innovative AI-powered solutions for German businesses.',
        de: 'KI-Produkt- & Serviceentwicklung in Deutschland, zugeschnitten auf lokale Marktanforderungen. Erstellen Sie innovative KI-gestützte Lösungen für deutsche Unternehmen.',
        it: 'Sviluppo di Prodotti e Servizi AI in Germania adattati ai requisiti del mercato locale. Crea soluzioni innovative basate sull\'AI per le aziende tedesche.',
      },
      italy: {
        en: 'AI Product & Service Development in Italy for luxury and design sectors. Develop AI-enhanced products that combine technology with Italian creativity.',
        de: 'KI-Produkt- & Serviceentwicklung in Italien für Luxus- und Designsektoren. Entwickeln Sie KI-verbesserte Produkte, die Technologie mit italienischer Kreativität verbinden.',
        it: 'Sviluppo di Prodotti e Servizi AI in Italia per i settori del lusso e del design. Sviluppa prodotti potenziati dall\'AI che combinano tecnologia con creatività italiana.',
      },
      uk: {
        en: 'AI Product & Service Development in the UK for fintech and healthtech innovations. Create AI-powered solutions that address British market needs.',
        de: 'KI-Produkt- & Serviceentwicklung in Großbritannien für Fintech- und Healthtech-Innovationen. Erstellen Sie KI-gestützte Lösungen, die britische Marktbedürfnisse adressieren.',
        it: 'Sviluppo di Prodotti e Servizi AI nel Regno Unito per innovazioni fintech e healthtech. Crea soluzioni basate sull\'AI che rispondono alle esigenze del mercato britannico.',
      },
      us: {
        en: 'AI Product & Service Development in the US for global scaling. Build innovative AI solutions designed for the American market and beyond.',
        de: 'KI-Produkt- & Serviceentwicklung in den USA für globale Skalierung. Bauen Sie innovative KI-Lösungen, die für den amerikanischen Markt und darüber hinaus konzipiert sind.',
        it: 'Sviluppo di Prodotti e Servizi AI negli Stati Uniti per la scalabilità globale. Costruisci soluzioni AI innovative progettate per il mercato americano e oltre.',
      },
      spain: {
        en: 'AI Product & Service Development in Spain for Spanish and Latin American markets. Create AI solutions tailored to Spanish-speaking audiences.',
        de: 'KI-Produkt- & Serviceentwicklung in Spanien für spanische und lateinamerikanische Märkte. Erstellen Sie KI-Lösungen, die auf spanischsprachige Zielgruppen zugeschnitten sind.',
        it: 'Sviluppo di Prodotti e Servizi AI in Spagna per i mercati spagnoli e latinoamericani. Crea soluzioni AI adattate al pubblico di lingua spagnola.',
      },
    },
    workshops: {
      germany: {
        en: 'AI Workshops & Education in Germany for engineering and technical teams. Develop practical AI skills with specialized training programs.',
        de: 'KI-Workshops & Bildung in Deutschland für Ingenieur- und technische Teams. Entwickeln Sie praktische KI-Fähigkeiten mit spezialisierten Schulungsprogrammen.',
        it: 'Workshop e Formazione AI in Germania per team di ingegneria e tecnici. Sviluppa competenze AI pratiche con programmi di formazione specializzati.',
      },
      italy: {
        en: 'AI Workshops & Education in Italy for design and fashion professionals. Learn to leverage AI in creative processes with hands-on training.',
        de: 'KI-Workshops & Bildung in Italien für Design- und Modeprofis. Lernen Sie, KI in kreativen Prozessen mit praktischem Training zu nutzen.',
        it: 'Workshop e Formazione AI in Italia per professionisti del design e della moda. Impara a sfruttare l\'AI nei processi creativi con formazione pratica.',
      },
      uk: {
        en: 'AI Workshops & Education in the UK for financial and healthcare professionals. Gain practical AI skills relevant to British industries.',
        de: 'KI-Workshops & Bildung in Großbritannien für Finanz- und Gesundheitsfachleute. Erlangen Sie praktische KI-Fähigkeiten, die für britische Branchen relevant sind.',
        it: 'Workshop e Formazione AI nel Regno Unito per professionisti finanziari e sanitari. Acquisisci competenze AI pratiche rilevanti per le industrie britanniche.',
      },
      us: {
        en: 'AI Workshops & Education in the US for tech teams and entrepreneurs. Master cutting-edge AI technologies with advanced training programs.',
        de: 'KI-Workshops & Bildung in den USA für Tech-Teams und Unternehmer. Beherrschen Sie modernste KI-Technologien mit fortgeschrittenen Schulungsprogrammen.',
        it: 'Workshop e Formazione AI negli Stati Uniti per team tecnologici e imprenditori. Padroneggia tecnologie AI all\'avanguardia con programmi di formazione avanzati.',
      },
      spain: {
        en: 'AI Workshops & Education in Spain for businesses across sectors. Build AI literacy with comprehensive educational programs in Spanish context.',
        de: 'KI-Workshops & Bildung in Spanien für Unternehmen verschiedener Branchen. Bauen Sie KI-Kenntnisse mit umfassenden Bildungsprogrammen im spanischen Kontext auf.',
        it: 'Workshop e Formazione AI in Spagna per aziende di vari settori. Costruisci l\'alfabetizzazione AI con programmi educativi completi nel contesto spagnolo.',
      },
    },
  };
  
  const description = descriptions[id as keyof typeof descriptions]?.[locationId as keyof typeof descriptions.ai_integration]?.[validLang as keyof typeof descriptions.ai_integration.germany] || '';
  
  return {
    title,
    description,
  };
}

// Service + Location page component
export default function ServiceLocationPage({ 
  params 
}: { 
  params: { lang: string; id: string; locationId: string } 
}) {
  const { lang, id, locationId } = params;
  const validLang = supportedLanguages.includes(lang) ? lang : defaultLanguage;
  
  // Find the service and location
  const service = services.find((s) => s.id === id);
  const location = locations.find((l) => l.id === locationId);
  
  if (!service || !location) {
    notFound();
  }
  
  const serviceTitle = getTranslation(service.translationKey, validLang);
  const locationTitle = getTranslation(location.translationKey, validLang);
  
  // Service + Location specific content
  const contentByServiceAndLocation = {
    ai_integration: {
      germany: {
        icon: '🔄',
        image: '🇩🇪',
        useCases: {
          en: [
            'Automated quality control systems for German manufacturing',
            'Predictive maintenance for industrial equipment',
            'Supply chain optimization with AI analytics',
            'Smart factory implementations for Industry 4.0',
            'Process automation for German engineering firms',
          ],
          de: [
            'Automatisierte Qualitätskontrollsysteme für deutsche Fertigung',
            'Vorausschauende Wartung für Industrieanlagen',
            'Optimierung der Lieferkette mit KI-Analytik',
            'Smart Factory-Implementierungen für Industrie 4.0',
            'Prozessautomatisierung für deutsche Ingenieurbüros',
          ],
          it: [
            'Sistemi di controllo qualità automatizzati per la produzione tedesca',
            'Manutenzione predittiva per apparecchiature industriali',
            'Ottimizzazione della catena di approvvigionamento con analisi AI',
            'Implementazioni di fabbriche intelligenti per l\'Industria 4.0',
            'Automazione dei processi per aziende di ingegneria tedesche',
          ],
        },
        benefits: {
          en: [
            'Compliance with German industrial standards and regulations',
            'Integration with existing German manufacturing systems',
            'Local support and implementation teams',
            'Industry-specific AI solutions for German markets',
            'Reduced operational costs and increased efficiency',
          ],
          de: [
            'Einhaltung deutscher Industriestandards und Vorschriften',
            'Integration mit bestehenden deutschen Fertigungssystemen',
            'Lokale Support- und Implementierungsteams',
            'Branchenspezifische KI-Lösungen für deutsche Märkte',
            'Reduzierte Betriebskosten und erhöhte Effizienz',
          ],
          it: [
            'Conformità agli standard e alle normative industriali tedesche',
            'Integrazione con i sistemi di produzione tedeschi esistenti',
            'Team di supporto e implementazione locali',
            'Soluzioni AI specifiche per settore per i mercati tedeschi',
            'Costi operativi ridotti e maggiore efficienza',
          ],
        },
      },
      italy: {
        icon: '🔄',
        image: '🇮🇹',
        useCases: {
          en: [
            'AI-powered design tools for Italian fashion houses',
            'Automated production systems for luxury goods',
            'Creative process enhancement with AI',
            'Virtual showrooms and digital product experiences',
            'Supply chain optimization for Italian design firms',
          ],
          de: [
            'KI-gestützte Design-Tools für italienische Modehäuser',
            'Automatisierte Produktionssysteme für Luxusgüter',
            'Verbesserung des kreativen Prozesses mit KI',
            'Virtuelle Showrooms und digitale Produkterlebnisse',
            'Optimierung der Lieferkette für italienische Designfirmen',
          ],
          it: [
            'Strumenti di design basati sull\'AI per case di moda italiane',
            'Sistemi di produzione automatizzati per beni di lusso',
            'Miglioramento del processo creativo con AI',
            'Showroom virtuali ed esperienze di prodotto digitali',
            'Ottimizzazione della catena di approvvigionamento per aziende di design italiane',
          ],
        },
        benefits: {
          en: [
            'Solutions tailored to Italian creative industries',
            'Preservation of craftsmanship while enhancing with AI',
            'Local expertise in Italian design and fashion sectors',
            'Increased productivity without compromising quality',
            'Competitive advantage in luxury markets',
          ],
          de: [
            'Lösungen, die auf italienische Kreativbranchen zugeschnitten sind',
            'Bewahrung des Handwerks bei gleichzeitiger Verbesserung mit KI',
            'Lokale Expertise in italienischen Design- und Modesektoren',
            'Erhöhte Produktivität ohne Qualitätseinbußen',
            'Wettbewerbsvorteil in Luxusmärkten',
          ],
          it: [
            'Soluzioni su misura per le industrie creative italiane',
            'Preservazione dell\'artigianato migliorando con l\'AI',
            'Competenza locale nei settori del design e della moda italiani',
            'Aumento della produttività senza compromettere la qualità',
            'Vantaggio competitivo nei mercati del lusso',
          ],
        },
      },
      // Additional combinations for other locations...
    },
    ai_coaching: {
      germany: {
        icon: '🧠',
        image: '🇩🇪',
        useCases: {
          en: [
            'Digital transformation for German manufacturing companies',
            'AI strategy development for Mittelstand businesses',
            'Team upskilling for Industry 4.0 readiness',
            'Change management for AI adoption in traditional industries',
            'Executive coaching on AI leadership for German businesses',
          ],
          de: [
            'Digitale Transformation für deutsche Fertigungsunternehmen',
            'KI-Strategieentwicklung für Mittelstandsunternehmen',
            'Team-Upskilling für Industrie 4.0-Bereitschaft',
            'Change Management für KI-Einführung in traditionellen Branchen',
            'Executive Coaching zu KI-Führung für deutsche Unternehmen',
          ],
          it: [
            'Trasformazione digitale per aziende manifatturiere tedesche',
            'Sviluppo di strategie AI per le imprese del Mittelstand',
            'Miglioramento delle competenze del team per la prontezza all\'Industria 4.0',
            'Gestione del cambiamento per l\'adozione dell\'AI nelle industrie tradizionali',
            'Coaching esecutivo sulla leadership AI per le aziende tedesche',
          ],
        },
        benefits: {
          en: [
            'Customized approach for German business culture',
            'Industry-specific AI transformation roadmaps',
            'German-speaking coaches with local expertise',
            'Alignment with German regulatory requirements',
            'Practical implementation strategies for German market',
          ],
          de: [
            'Maßgeschneiderter Ansatz für deutsche Unternehmenskultur',
            'Branchenspezifische KI-Transformations-Roadmaps',
            'Deutschsprachige Coaches mit lokaler Expertise',
            'Abstimmung mit deutschen regulatorischen Anforderungen',
            'Praktische Implementierungsstrategien für den deutschen Markt',
          ],
          it: [
            'Approccio personalizzato per la cultura aziendale tedesca',
            'Roadmap di trasformazione AI specifiche per settore',
            'Coach di lingua tedesca con competenze locali',
            'Allineamento con i requisiti normativi tedeschi',
            'Strategie di implementazione pratica per il mercato tedesco',
          ],
        },
      },
      // Additional combinations for other locations...
    },
    // Additional service types...
  };
  
  // Default content for combinations not explicitly defined
  const defaultContent = {
    useCases: {
      en: [
        `${serviceTitle} implementation for ${locationTitle} businesses`,
        `${locationTitle}-specific ${serviceTitle.toLowerCase()} strategies`,
        `Custom ${serviceTitle.toLowerCase()} solutions for ${locationTitle} market needs`,
        `${serviceTitle} adoption in ${locationTitle} business environment`,
        `${locationTitle} regulatory compliance for ${serviceTitle.toLowerCase()} projects`,
      ],
      de: [
        `${serviceTitle} Implementierung für Unternehmen in ${locationTitle}`,
        `${locationTitle}-spezifische ${serviceTitle.toLowerCase()} Strategien`,
        `Maßgeschneiderte ${serviceTitle.toLowerCase()} Lösungen für ${locationTitle} Marktbedürfnisse`,
        `${serviceTitle} Einführung in ${locationTitle} Geschäftsumgebung`,
        `${locationTitle} regulatorische Compliance für ${serviceTitle.toLowerCase()} Projekte`,
      ],
      it: [
        `Implementazione di ${serviceTitle} per aziende in ${locationTitle}`,
        `Strategie di ${serviceTitle.toLowerCase()} specifiche per ${locationTitle}`,
        `Soluzioni personalizzate di ${serviceTitle.toLowerCase()} per le esigenze del mercato di ${locationTitle}`,
        `Adozione di ${serviceTitle} nell'ambiente aziendale di ${locationTitle}`,
        `Conformità normativa di ${locationTitle} per progetti di ${serviceTitle.toLowerCase()}`,
      ],
    },
    benefits: {
      en: [
        `Local expertise in ${locationTitle} markets`,
        `Solutions tailored to ${locationTitle} business needs`,
        `Compliance with ${locationTitle} regulations and standards`,
        `${locationTitle}-based implementation and support teams`,
        `Industry-specific knowledge for ${locationTitle} sectors`,
      ],
      de: [
        `Lokale Expertise in ${locationTitle} Märkten`,
        `Lösungen, die auf ${locationTitle} Geschäftsbedürfnisse zugeschnitten sind`,
        `Einhaltung von ${locationTitle} Vorschriften und Standards`,
        `${locationTitle}-basierte Implementierungs- und Support-Teams`,
        `Branchenspezifisches Wissen für ${locationTitle} Sektoren`,
      ],
      it: [
        `Competenza locale nei mercati di ${locationTitle}`,
        `Soluzioni su misura per le esigenze aziendali di ${locationTitle}`,
        `Conformità alle normative e agli standard di ${locationTitle}`,
        `Team di implementazione e supporto basati in ${locationTitle}`,
        `Conoscenza specifica del settore per i settori di ${locationTitle}`,
      ],
    },
  };
  
  // Get content for this specific combination, or use default
  const specificContent = contentByServiceAndLocation[id as keyof typeof contentByServiceAndLocation]?.[locationId as keyof (typeof contentByServiceAndLocation)['ai_integration']];
  
  const content = {
    icon: specificContent?.icon || (service.icon || '🔧'),
    image: specificContent?.image || (locationId === 'germany' ? '🇩🇪' : locationId === 'italy' ? '🇮🇹' : locationId === 'uk' ? '🇬🇧' : locationId === 'us' ? '🇺🇸' : '🇪🇸'),
    useCases: specificContent?.useCases || defaultContent.useCases,
    benefits: specificContent?.benefits || defaultContent.benefits,
  };
  
  // Section titles
  const pageTitle = `${serviceTitle} in ${locationTitle}`;
  
  const overviewTitle = validLang === 'en' 
    ? 'Overview' 
    : validLang === 'de' 
      ? 'Überblick' 
      : 'Panoramica';
  
  const useCasesTitle = validLang === 'en' 
    ? 'Use Cases' 
    : validLang === 'de' 
      ? 'Anwendungsfälle' 
      : 'Casi d\'uso';
  
  const benefitsTitle = validLang === 'en' 
    ? 'Benefits' 
    : validLang === 'de' 
      ? 'Vorteile' 
      : 'Vantaggi';
  
  const ctaTitle = validLang === 'en' 
    ? `Ready to implement ${serviceTitle} in ${locationTitle}?` 
    : validLang === 'de' 
      ? `Bereit, ${serviceTitle} in ${locationTitle} zu implementieren?` 
      : `Pronto a implementare ${serviceTitle} in ${locationTitle}?`;
  
  // Generate overview text based on service and location
  const overviewText = {
    en: `Our ${serviceTitle} services in ${locationTitle} are designed to help businesses leverage artificial intelligence to gain competitive advantage. With local expertise and global best practices, we deliver tailored solutions that address the specific needs and challenges of the ${locationTitle} market.`,
    de: `Unsere ${serviceTitle} Dienstleistungen in ${locationTitle} sind darauf ausgelegt, Unternehmen dabei zu helfen, künstliche Intelligenz zu nutzen, um Wettbewerbsvorteile zu erzielen. Mit lokaler Expertise und globalen Best Practices liefern wir maßgeschneiderte Lösungen, die auf die spezifischen Bedürfnisse und Herausforderungen des ${locationTitle}-Marktes eingehen.`,
    it: `I nostri servizi di ${serviceTitle} in ${locationTitle} sono progettati per aiutare le aziende a sfruttare l'intelligenza artificiale per ottenere un vantaggio competitivo. Con competenze locali e migliori pratiche globali, forniamo soluzioni su misura che rispondono alle esigenze e alle sfide specifiche del mercato di ${locationTitle}.`,
  };
  
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
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-5xl">{content.icon}</span>
              <span className="text-5xl">+</span>
              <span className="text-5xl">{content.image}</span>
            </div>
            <h1 className="cyber-gradient-text text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {pageTitle}
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
              {overviewText[validLang as keyof typeof overviewText]}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <Link 
                href={`/${validLang}/services/${id}`} 
                className="cyber-card group hover:border-cyber-purple transition-colors duration-300 flex flex-col items-center text-center p-6"
              >
                <div className="text-4xl mb-4">{content.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-cyber-blue transition-colors">
                  {serviceTitle}
                </h3>
                <p className="text-gray-300">
                  {validLang === 'en' 
                    ? 'Learn more about our service' 
                    : validLang === 'de' 
                      ? 'Erfahren Sie mehr über unseren Service' 
                      : 'Scopri di più sul nostro servizio'}
                </p>
              </Link>
              <Link 
                href={`/${validLang}/locations/${locationId}`} 
                className="cyber-card group hover:border-cyber-purple transition-colors duration-300 flex flex-col items-center text-center p-6"
              >
                <div className="text-4xl mb-4">{content.image}</div>
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-cyber-blue transition-colors">
                  {locationTitle}
                </h3>
                <p className="text-gray-300">
                  {validLang === 'en' 
                    ? 'Learn more about our location' 
                    : validLang === 'de' 
                      ? 'Erfahren Sie mehr über unseren Standort' 
                      : 'Scopri di più sulla nostra sede'}
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Use Cases section */}
      <section className="py-20 bg-cyber-darkgray">
        <div className="cyber-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-white">
              {useCasesTitle}
            </h2>
            <ul className="space-y-4">
              {content.useCases[validLang as keyof typeof content.useCases].map((useCase: string, index: number) => (
                <li key={index} className="flex items-start">
                  <div className="text-cyber-blue mr-4">✓</div>
                  <p className="text-gray-300">{useCase}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      
      {/* Benefits section */}
      <section className="py-20 bg-cyber-black">
        <div className="cyber-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-white">
              {benefitsTitle}
            </h2>
            <ul className="space-y-4">
              {content.benefits[validLang as keyof typeof content.benefits].map((benefit: string, index: number) => (
                <li key={index} className="flex items-start">
                  <div className="text-cyber-blue mr-4">✓</div>
                  <p className="text-gray-300">{benefit}</p>
                </li>
              ))}
            </ul>
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
              {validLang === 'en'
                ? `Contact us today to discuss how our ${serviceTitle} services in ${locationTitle} can help your business.`
                : validLang === 'de'
                  ? `Kontaktieren Sie uns noch heute, um zu besprechen, wie unsere ${serviceTitle} Dienstleistungen in ${locationTitle} Ihrem Unternehmen helfen können.`
                  : `Contattaci oggi per discutere di come i nostri servizi di ${serviceTitle} in ${locationTitle} possono aiutare la tua azienda.`}
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
