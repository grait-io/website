import { Metadata } from 'next';
import { getTranslation, services } from '@/lib/i18n';
import { supportedLanguages, defaultLanguage } from '@/middleware';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Generate static params for all service pages
export function generateStaticParams() {
  const params = [];
  
  for (const lang of supportedLanguages) {
    for (const service of services) {
      params.push({
        lang,
        id: service.id,
      });
    }
  }
  
  return params;
}

// Generate metadata for each service page
export async function generateMetadata({ 
  params 
}: { 
  params: { lang: string; id: string } 
}): Promise<Metadata> {
  const { lang, id } = params;
  const validLang = supportedLanguages.includes(lang) ? lang : defaultLanguage;
  
  // Find the service
  const service = services.find((s) => s.id === id);
  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }
  
  const serviceTitle = getTranslation(service.translationKey, validLang);
  
  const title = `${serviceTitle} | grait.io`;
  
  const descriptions = {
    ai_integration: {
      en: 'Our AI Integration & Automation services help businesses streamline operations and enhance decision-making with cutting-edge AI technologies.',
      de: 'Unsere KI-Integrations- und Automatisierungsdienste helfen Unternehmen, Abläufe zu optimieren und die Entscheidungsfindung mit modernsten KI-Technologien zu verbessern.',
      it: 'I nostri servizi di Integrazione e Automazione AI aiutano le aziende a semplificare le operazioni e migliorare il processo decisionale con tecnologie AI all\'avanguardia.',
    },
    ai_coaching: {
      en: 'Our AI Coaching & Transformation services guide your team through the AI adoption journey with expert training and implementation support.',
      de: 'Unsere KI-Coaching- und Transformationsdienste begleiten Ihr Team durch die KI-Einführung mit Expertentraining und Implementierungsunterstützung.',
      it: 'I nostri servizi di Coaching e Trasformazione AI guidano il tuo team attraverso il percorso di adozione dell\'AI con formazione esperta e supporto all\'implementazione.',
    },
    product_development: {
      en: 'Our Product & Service Development helps you create innovative AI-powered solutions that drive growth and competitive advantage.',
      de: 'Unsere Produkt- und Serviceentwicklung hilft Ihnen, innovative KI-gestützte Lösungen zu schaffen, die Wachstum und Wettbewerbsvorteile fördern.',
      it: 'Il nostro Sviluppo di Prodotti e Servizi ti aiuta a creare soluzioni innovative basate sull\'AI che guidano la crescita e il vantaggio competitivo.',
    },
    workshops: {
      en: 'Our Workshops & Education services provide hands-on training to equip your team with the skills needed to leverage AI effectively.',
      de: 'Unsere Workshop- und Bildungsdienste bieten praktisches Training, um Ihr Team mit den Fähigkeiten auszustatten, die für den effektiven Einsatz von KI erforderlich sind.',
      it: 'I nostri servizi di Workshop e Formazione forniscono formazione pratica per dotare il tuo team delle competenze necessarie per sfruttare efficacemente l\'AI.',
    },
  };
  
  const description = descriptions[id as keyof typeof descriptions]?.[validLang as keyof typeof descriptions.ai_integration] || '';
  
  return {
    title,
    description,
  };
}

// Service detail page component
export default function ServicePage({ 
  params 
}: { 
  params: { lang: string; id: string } 
}) {
  const { lang, id } = params;
  const validLang = supportedLanguages.includes(lang) ? lang : defaultLanguage;
  
  // Find the service
  const service = services.find((s) => s.id === id);
  if (!service) {
    notFound();
  }
  
  const serviceTitle = getTranslation(service.translationKey, validLang);
  
  // Service-specific content
  const serviceContent = {
    ai_integration: {
      icon: '🔄',
      benefits: {
        en: [
          'Seamless integration with existing systems',
          'Automated workflows and processes',
          'Enhanced decision-making capabilities',
          'Reduced operational costs',
          'Improved efficiency and productivity',
        ],
        de: [
          'Nahtlose Integration mit bestehenden Systemen',
          'Automatisierte Arbeitsabläufe und Prozesse',
          'Verbesserte Entscheidungsfindungsfähigkeiten',
          'Reduzierte Betriebskosten',
          'Verbesserte Effizienz und Produktivität',
        ],
        it: [
          'Integrazione perfetta con i sistemi esistenti',
          'Flussi di lavoro e processi automatizzati',
          'Capacità decisionali migliorate',
          'Costi operativi ridotti',
          'Efficienza e produttività migliorate',
        ],
      },
      description: {
        en: 'Our AI Integration & Automation services help businesses seamlessly incorporate artificial intelligence into their existing systems and workflows. We identify opportunities for automation, develop custom AI solutions, and ensure smooth implementation with minimal disruption to your operations.',
        de: 'Unsere KI-Integrations- und Automatisierungsdienste helfen Unternehmen, künstliche Intelligenz nahtlos in ihre bestehenden Systeme und Arbeitsabläufe zu integrieren. Wir identifizieren Automatisierungsmöglichkeiten, entwickeln maßgeschneiderte KI-Lösungen und sorgen für eine reibungslose Implementierung mit minimaler Unterbrechung Ihrer Abläufe.',
        it: 'I nostri servizi di Integrazione e Automazione AI aiutano le aziende a incorporare perfettamente l\'intelligenza artificiale nei loro sistemi e flussi di lavoro esistenti. Identifichiamo opportunità di automazione, sviluppiamo soluzioni AI personalizzate e garantiamo un\'implementazione fluida con minime interruzioni alle tue operazioni.',
      },
      process: {
        en: [
          'Assessment of current systems and workflows',
          'Identification of AI integration opportunities',
          'Custom solution design and development',
          'Implementation and testing',
          'Training and ongoing support',
        ],
        de: [
          'Bewertung aktueller Systeme und Arbeitsabläufe',
          'Identifizierung von KI-Integrationsmöglichkeiten',
          'Maßgeschneiderte Lösungsgestaltung und -entwicklung',
          'Implementierung und Tests',
          'Schulung und laufende Unterstützung',
        ],
        it: [
          'Valutazione dei sistemi e flussi di lavoro attuali',
          'Identificazione delle opportunità di integrazione AI',
          'Progettazione e sviluppo di soluzioni personalizzate',
          'Implementazione e test',
          'Formazione e supporto continuo',
        ],
      },
    },
    ai_coaching: {
      icon: '🧠',
      benefits: {
        en: [
          'Accelerated AI adoption',
          'Customized transformation roadmap',
          'Skill development for your team',
          'Change management support',
          'Long-term AI strategy development',
        ],
        de: [
          'Beschleunigte KI-Einführung',
          'Maßgeschneiderte Transformations-Roadmap',
          'Kompetenzentwicklung für Ihr Team',
          'Unterstützung beim Change Management',
          'Entwicklung einer langfristigen KI-Strategie',
        ],
        it: [
          'Adozione accelerata dell\'AI',
          'Roadmap di trasformazione personalizzata',
          'Sviluppo delle competenze per il tuo team',
          'Supporto alla gestione del cambiamento',
          'Sviluppo di una strategia AI a lungo termine',
        ],
      },
      description: {
        en: 'Our AI Coaching & Transformation services guide your organization through the journey of adopting and leveraging artificial intelligence. We provide expert coaching, training, and strategic guidance to help your team develop the skills and mindset needed to thrive in the AI-driven future.',
        de: 'Unsere KI-Coaching- und Transformationsdienste begleiten Ihre Organisation durch den Prozess der Einführung und Nutzung künstlicher Intelligenz. Wir bieten Expertencoaching, Schulungen und strategische Anleitung, um Ihrem Team zu helfen, die Fähigkeiten und Denkweise zu entwickeln, die für den Erfolg in der KI-gesteuerten Zukunft erforderlich sind.',
        it: 'I nostri servizi di Coaching e Trasformazione AI guidano la tua organizzazione attraverso il percorso di adozione e sfruttamento dell\'intelligenza artificiale. Forniamo coaching esperto, formazione e guida strategica per aiutare il tuo team a sviluppare le competenze e la mentalità necessarie per prosperare nel futuro guidato dall\'AI.',
      },
      process: {
        en: [
          'AI readiness assessment',
          'Customized transformation strategy',
          'Executive and team training programs',
          'Implementation support and guidance',
          'Ongoing coaching and evaluation',
        ],
        de: [
          'KI-Bereitschaftsbewertung',
          'Maßgeschneiderte Transformationsstrategie',
          'Schulungsprogramme für Führungskräfte und Teams',
          'Implementierungsunterstützung und Anleitung',
          'Fortlaufendes Coaching und Evaluation',
        ],
        it: [
          'Valutazione della prontezza all\'AI',
          'Strategia di trasformazione personalizzata',
          'Programmi di formazione per dirigenti e team',
          'Supporto e guida all\'implementazione',
          'Coaching e valutazione continui',
        ],
      },
    },
    product_development: {
      icon: '⚙️',
      benefits: {
        en: [
          'Innovative AI-powered solutions',
          'New revenue streams',
          'Competitive market advantage',
          'Enhanced customer experience',
          'Scalable and future-proof products',
        ],
        de: [
          'Innovative KI-gestützte Lösungen',
          'Neue Einnahmequellen',
          'Wettbewerbsvorteil auf dem Markt',
          'Verbesserte Kundenerfahrung',
          'Skalierbare und zukunftssichere Produkte',
        ],
        it: [
          'Soluzioni innovative basate sull\'AI',
          'Nuovi flussi di entrate',
          'Vantaggio competitivo sul mercato',
          'Esperienza cliente migliorata',
          'Prodotti scalabili e a prova di futuro',
        ],
      },
      description: {
        en: 'Our Product & Service Development helps you create innovative AI-powered solutions that drive growth and competitive advantage. We work with you from concept to launch, leveraging artificial intelligence to develop products and services that meet market needs and create new revenue opportunities.',
        de: 'Unsere Produkt- und Serviceentwicklung hilft Ihnen, innovative KI-gestützte Lösungen zu schaffen, die Wachstum und Wettbewerbsvorteile fördern. Wir arbeiten mit Ihnen vom Konzept bis zur Markteinführung und nutzen künstliche Intelligenz, um Produkte und Dienstleistungen zu entwickeln, die den Marktbedürfnissen entsprechen und neue Umsatzmöglichkeiten schaffen.',
        it: 'Il nostro Sviluppo di Prodotti e Servizi ti aiuta a creare soluzioni innovative basate sull\'AI che guidano la crescita e il vantaggio competitivo. Lavoriamo con te dal concetto al lancio, sfruttando l\'intelligenza artificiale per sviluppare prodotti e servizi che soddisfano le esigenze del mercato e creano nuove opportunità di reddito.',
      },
      process: {
        en: [
          'Market research and opportunity identification',
          'Concept development and validation',
          'AI solution design and prototyping',
          'Development and testing',
          'Launch and market strategy',
        ],
        de: [
          'Marktforschung und Identifizierung von Chancen',
          'Konzeptentwicklung und -validierung',
          'KI-Lösungsdesign und Prototyping',
          'Entwicklung und Tests',
          'Start- und Marktstrategie',
        ],
        it: [
          'Ricerca di mercato e identificazione delle opportunità',
          'Sviluppo e convalida del concetto',
          'Progettazione della soluzione AI e prototipazione',
          'Sviluppo e test',
          'Strategia di lancio e di mercato',
        ],
      },
    },
    workshops: {
      icon: '📚',
      benefits: {
        en: [
          'Practical AI skills development',
          'Customized learning experiences',
          'Hands-on training with real-world applications',
          'Team capability building',
          'Ongoing educational support',
        ],
        de: [
          'Praktische KI-Kompetenzentwicklung',
          'Maßgeschneiderte Lernerfahrungen',
          'Praktisches Training mit realen Anwendungen',
          'Aufbau von Teamfähigkeiten',
          'Fortlaufende Bildungsunterstützung',
        ],
        it: [
          'Sviluppo di competenze AI pratiche',
          'Esperienze di apprendimento personalizzate',
          'Formazione pratica con applicazioni reali',
          'Sviluppo delle capacità del team',
          'Supporto educativo continuo',
        ],
      },
      description: {
        en: 'Our Workshops & Education services provide hands-on training to equip your team with the skills needed to leverage AI effectively. We offer customized workshops, training programs, and educational resources designed to build AI literacy and practical capabilities across your organization.',
        de: 'Unsere Workshop- und Bildungsdienste bieten praktisches Training, um Ihr Team mit den Fähigkeiten auszustatten, die für den effektiven Einsatz von KI erforderlich sind. Wir bieten maßgeschneiderte Workshops, Schulungsprogramme und Bildungsressourcen, die darauf ausgerichtet sind, KI-Kenntnisse und praktische Fähigkeiten in Ihrer gesamten Organisation aufzubauen.',
        it: 'I nostri servizi di Workshop e Formazione forniscono formazione pratica per dotare il tuo team delle competenze necessarie per sfruttare efficacemente l\'AI. Offriamo workshop personalizzati, programmi di formazione e risorse educative progettate per costruire l\'alfabetizzazione AI e le capacità pratiche in tutta la tua organizzazione.',
      },
      process: {
        en: [
          'Needs assessment and learning objectives definition',
          'Customized workshop and curriculum design',
          'Interactive training sessions',
          'Practical exercises and case studies',
          'Evaluation and follow-up support',
        ],
        de: [
          'Bedarfsanalyse und Definition der Lernziele',
          'Maßgeschneidertes Workshop- und Lehrplandesign',
          'Interaktive Trainingssitzungen',
          'Praktische Übungen und Fallstudien',
          'Evaluation und Nachbetreuung',
        ],
        it: [
          'Valutazione delle esigenze e definizione degli obiettivi di apprendimento',
          'Progettazione personalizzata di workshop e curriculum',
          'Sessioni di formazione interattive',
          'Esercizi pratici e casi di studio',
          'Valutazione e supporto di follow-up',
        ],
      },
    },
  };
  
  const content = serviceContent[id as keyof typeof serviceContent];
  
  // Section titles
  const overviewTitle = validLang === 'en' 
    ? 'Overview' 
    : validLang === 'de' 
      ? 'Überblick' 
      : 'Panoramica';
  
  const benefitsTitle = validLang === 'en' 
    ? 'Benefits' 
    : validLang === 'de' 
      ? 'Vorteile' 
      : 'Vantaggi';
  
  const processTitle = validLang === 'en' 
    ? 'Our Process' 
    : validLang === 'de' 
      ? 'Unser Prozess' 
      : 'Il Nostro Processo';
  
  const ctaTitle = validLang === 'en' 
    ? 'Ready to get started?' 
    : validLang === 'de' 
      ? 'Bereit loszulegen?' 
      : 'Pronto per iniziare?';
  
  const ctaText = validLang === 'en'
    ? 'Contact us today to discuss how our services can help your business.'
    : validLang === 'de'
      ? 'Kontaktieren Sie uns noch heute, um zu besprechen, wie unsere Dienstleistungen Ihrem Unternehmen helfen können.'
      : 'Contattaci oggi per discutere di come i nostri servizi possono aiutare la tua azienda.';
  
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
            <div className="text-7xl mb-6">{content.icon}</div>
            <h1 className="cyber-gradient-text text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              {serviceTitle}
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
      
      {/* Benefits section */}
      <section className="py-20 bg-cyber-darkgray">
        <div className="cyber-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-white">
              {benefitsTitle}
            </h2>
            <ul className="space-y-4">
              {content.benefits[validLang as keyof typeof content.benefits].map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <div className="text-cyber-blue mr-4">✓</div>
                  <p className="text-gray-300">{benefit}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      
      {/* Process section */}
      <section className="py-20 bg-cyber-black">
        <div className="cyber-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-white">
              {processTitle}
            </h2>
            <div className="space-y-8">
              {content.process[validLang as keyof typeof content.process].map((step, index) => (
                <div key={index} className="flex">
                  <div className="flex-shrink-0 w-12 h-12 bg-cyber-blue/20 border border-cyber-blue flex items-center justify-center rounded-full mr-6">
                    <span className="text-cyber-blue font-bold">{index + 1}</span>
                  </div>
                  <div>
                    <p className="text-gray-300 text-lg">{step}</p>
                  </div>
                </div>
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
