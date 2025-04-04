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
    ai_workflow: {
      en: 'Automate 53% of repetitive tasks in your first month. We identify and eliminate your most time-consuming processes without disrupting your team.',
      de: 'Automatisieren Sie 53% der sich wiederholenden Aufgaben in Ihrem ersten Monat. Wir identifizieren und eliminieren Ihre zeitaufwändigsten Prozesse, ohne Ihr Team zu stören.',
      it: 'Automatizza il 53% delle attività ripetitive nel tuo primo mese. Identifichiamo ed eliminiamo i processi più dispendiosi in termini di tempo senza interrompere il tuo team.',
    },
    executive_mastery: {
      en: 'Become an AI-driven leader in 6 weeks. Our executive coaching program gives you the confidence to make strategic AI decisions without becoming a technical expert.',
      de: 'Werden Sie in 6 Wochen ein KI-gesteuerter Leader. Unser Executive-Coaching-Programm gibt Ihnen das Selbstvertrauen, strategische KI-Entscheidungen zu treffen, ohne ein technischer Experte zu werden.',
      it: 'Diventa un leader guidato dall\'AI in 6 settimane. Il nostro programma di coaching esecutivo ti dà la sicurezza di prendere decisioni strategiche sull\'AI senza diventare un esperto tecnico.',
    },
    product_launchpad: {
      en: 'Turn your ideas into revenue-generating AI tools. We handle the development while you focus on market strategy and customer acquisition.',
      de: 'Verwandeln Sie Ihre Ideen in umsatzgenerierende KI-Tools. Wir kümmern uns um die Entwicklung, während Sie sich auf Marktstrategie und Kundenakquise konzentrieren.',
      it: 'Trasforma le tue idee in strumenti AI che generano entrate. Gestiamo lo sviluppo mentre ti concentri sulla strategia di mercato e sull\'acquisizione di clienti.',
    },
    team_accelerator: {
      en: 'Make your entire team 3x more productive. Our training program empowers your employees to leverage AI in their daily work without technical barriers.',
      de: 'Machen Sie Ihr gesamtes Team 3x produktiver. Unser Trainingsprogramm befähigt Ihre Mitarbeiter, KI in ihrer täglichen Arbeit ohne technische Barrieren zu nutzen.',
      it: 'Rendi il tuo intero team 3 volte più produttivo. Il nostro programma di formazione consente ai tuoi dipendenti di sfruttare l\'AI nel loro lavoro quotidiano senza barriere tecniche.',
    },
  };
  
  const description = descriptions[id as keyof typeof descriptions]?.[validLang as keyof typeof descriptions.ai_workflow] || '';
  
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
  
  // Define types for service content
  type ServiceContent = {
    icon: string;
    benefits: {
      en: string[];
      de: string[];
      it: string[];
    };
    description: {
      en: string;
      de: string;
      it: string;
    };
    process: {
      en: string[];
      de: string[];
      it: string[];
    };
  };

  // Service-specific content
  const serviceContent: Record<string, ServiceContent> = {
    ai_workflow: {
      icon: '💰',
      benefits: {
        en: [
          '72-hour implementation guarantee',
          'No disruption to your current operations',
          '47% reduction in operational costs',
          'Reclaim 15+ hours per week for your team',
          'Zero technical knowledge required from you',
        ],
        de: [
          '72-Stunden-Implementierungsgarantie',
          'Keine Unterbrechung Ihrer aktuellen Abläufe',
          '47% Reduzierung der Betriebskosten',
          'Gewinnen Sie 15+ Stunden pro Woche für Ihr Team zurück',
          'Keine technischen Kenntnisse von Ihnen erforderlich',
        ],
        it: [
          'Garanzia di implementazione in 72 ore',
          'Nessuna interruzione delle operazioni correnti',
          'Riduzione del 47% dei costi operativi',
          'Recupera più di 15 ore settimanali per il tuo team',
          'Nessuna conoscenza tecnica richiesta da parte tua',
        ],
      },
      description: {
        en: 'Our AI Workflow Design service automates 53% of repetitive tasks in your first month. We identify and eliminate your most time-consuming processes without disrupting your team. No coding required – We handle the tech so you can focus on growth.',
        de: 'Unser KI-Workflow-Design-Service automatisiert 53% der sich wiederholenden Aufgaben in Ihrem ersten Monat. Wir identifizieren und eliminieren Ihre zeitaufwändigsten Prozesse, ohne Ihr Team zu stören. Keine Programmierung erforderlich – Wir kümmern uns um die Technik, damit Sie sich auf das Wachstum konzentrieren können.',
        it: 'Il nostro servizio di Design del flusso di lavoro AI automatizza il 53% delle attività ripetitive nel tuo primo mese. Identifichiamo ed eliminiamo i processi più dispendiosi in termini di tempo senza interrompere il tuo team. Nessuna programmazione richiesta – Gestiamo la tecnologia così puoi concentrarti sulla crescita.',
      },
      process: {
        en: [
          'Business Process Analysis (72 hours)',
          'Custom AI Roadmap Creation',
          '3 Priority Automation Opportunities',
          'Team Training (zero technical jargon)',
          '30-Day ROI Verification',
        ],
        de: [
          'Geschäftsprozessanalyse (72 Stunden)',
          'Erstellung einer maßgeschneiderten KI-Roadmap',
          '3 Prioritäts-Automatisierungsmöglichkeiten',
          'Team-Schulung (nicht-technisch)',
          '30-Tage-ROI-Überprüfung',
        ],
        it: [
          'Analisi dei processi aziendali (72 ore)',
          'Creazione di una roadmap AI personalizzata',
          '3 opportunità di automazione prioritaria',
          'Formazione del team (non tecnica)',
          'Verifica del ROI a 30 giorni',
        ],
      },
    },
    executive_mastery: {
      icon: '🚀',
      benefits: {
        en: [
          'Make confident AI decisions without technical expertise',
          'Develop a strategic AI vision for your company',
          'Understand AI opportunities specific to your industry',
          'Communicate effectively with technical teams',
          'Stay ahead of AI trends affecting your business',
        ],
        de: [
          'Treffen Sie selbstbewusste KI-Entscheidungen ohne technisches Fachwissen',
          'Entwickeln Sie eine strategische KI-Vision für Ihr Unternehmen',
          'Verstehen Sie KI-Möglichkeiten speziell für Ihre Branche',
          'Kommunizieren Sie effektiv mit technischen Teams',
          'Bleiben Sie KI-Trends voraus, die Ihr Geschäft beeinflussen',
        ],
        it: [
          'Prendi decisioni AI sicure senza competenze tecniche',
          'Sviluppa una visione strategica dell\'AI per la tua azienda',
          'Comprendi le opportunità AI specifiche per il tuo settore',
          'Comunica efficacemente con i team tecnici',
          'Rimani al passo con le tendenze AI che influenzano la tua attività',
        ],
      },
      description: {
        en: 'Our Executive AI Mastery program transforms you into an AI-driven leader in just 6 weeks, without requiring you to become a technical expert. We speak business, not binary - giving you the confidence to make strategic AI decisions.',
        de: 'Unser KI-Mastery-Programm für Führungskräfte verwandelt Sie in nur 6 Wochen in einen KI-gesteuerten Leader, ohne dass Sie ein technischer Experte werden müssen. Wir sprechen Geschäft, nicht Binärcode - und geben Ihnen das Selbstvertrauen, strategische KI-Entscheidungen zu treffen.',
        it: 'Il nostro programma di Padronanza AI per Dirigenti ti trasforma in un leader guidato dall\'AI in sole 6 settimane, senza richiedere che tu diventi un esperto tecnico. Parliamo di business, non di codice binario - dandoti la sicurezza di prendere decisioni strategiche sull\'AI.',
      },
      process: {
        en: [
          'AI Leadership Assessment',
          'Personalized Learning Roadmap',
          'Weekly 1:1 Executive Coaching Sessions',
          'Industry-Specific AI Strategy Development',
          'Ongoing Advisory Support',
        ],
        de: [
          'KI-Führungsbewertung',
          'Personalisierte Lern-Roadmap',
          'Wöchentliche 1:1 Executive Coaching-Sitzungen',
          'Branchenspezifische KI-Strategieentwicklung',
          'Laufende Beratungsunterstützung',
        ],
        it: [
          'Valutazione della leadership AI',
          'Roadmap di apprendimento personalizzata',
          'Sessioni settimanali di coaching esecutivo 1:1',
          'Sviluppo di strategie AI specifiche per il settore',
          'Supporto consultivo continuo',
        ],
      },
    },
    product_launchpad: {
      icon: '📱',
      benefits: {
        en: [
          'Turn your ideas into revenue without coding skills',
          'Launch new AI products in 60 days or less',
          'Create new revenue streams with minimal investment',
          'Gain competitive advantage in your market',
          'Own 100% of your product and intellectual property',
        ],
        de: [
          'Verwandeln Sie Ihre Ideen in Umsatz ohne Programmierkenntnisse',
          'Bringen Sie neue KI-Produkte in 60 Tagen oder weniger auf den Markt',
          'Schaffen Sie neue Einnahmequellen mit minimaler Investition',
          'Gewinnen Sie Wettbewerbsvorteile in Ihrem Markt',
          'Besitzen Sie 100% Ihres Produkts und geistigen Eigentums',
        ],
        it: [
          'Trasforma le tue idee in entrate senza competenze di programmazione',
          'Lancia nuovi prodotti AI in 60 giorni o meno',
          'Crea nuovi flussi di entrate con un investimento minimo',
          'Ottieni un vantaggio competitivo nel tuo mercato',
          'Possiedi il 100% del tuo prodotto e della proprietà intellettuale',
        ],
      },
      description: {
        en: 'Our AI Product Launchpad turns your ideas into revenue-generating AI tools without you writing a single line of code. We handle the development while you focus on market strategy and customer acquisition.',
        de: 'Unser KI-Produkt-Launchpad verwandelt Ihre Ideen in umsatzgenerierende KI-Tools, ohne dass Sie eine einzige Zeile Code schreiben müssen. Wir kümmern uns um die Entwicklung, während Sie sich auf Marktstrategie und Kundenakquise konzentrieren.',
        it: 'Il nostro AI Product Launchpad trasforma le tue idee in strumenti AI che generano entrate senza che tu scriva una singola riga di codice. Gestiamo lo sviluppo mentre ti concentri sulla strategia di mercato e sull\'acquisizione di clienti.',
      },
      process: {
        en: [
          'Idea Validation & Market Analysis',
          'Product Specification',
          'Rapid AI Development & Prototyping',
          'User Testing & Refinement',
          'Launch & Growth Strategy',
        ],
        de: [
          'Ideenvalidierung & Marktanalyse',
          'Produktspezifikation',
          'Schnelle KI-Entwicklung & Prototyping',
          'Benutzertests & Verfeinerung',
          'Start- & Wachstumsstrategie',
        ],
        it: [
          'Validazione dell\'idea e analisi di mercato',
          'Specifiche del prodotto',
          'Sviluppo AI rapido e prototipazione',
          'Test utente e perfezionamento',
          'Strategia di lancio e crescita',
        ],
      },
    },
    team_accelerator: {
      icon: '📈',
      benefits: {
        en: [
          'Triple team productivity without hiring more staff',
          'Eliminate tech barriers for non-technical employees',
          'Create a culture of AI innovation',
          'Reduce employee burnout from repetitive tasks',
          'Measurable ROI within 30 days',
        ],
        de: [
          'Verdreifachen Sie die Teamproduktivität ohne zusätzliche Mitarbeiter einzustellen',
          'Beseitigen Sie technische Barrieren für nicht-technische Mitarbeiter',
          'Schaffen Sie eine Kultur der KI-Innovation',
          'Reduzieren Sie Mitarbeiter-Burnout durch repetitive Aufgaben',
          'Messbarer ROI innerhalb von 30 Tagen',
        ],
        it: [
          'Triplica la produttività del team senza assumere più personale',
          'Elimina le barriere tecnologiche per i dipendenti non tecnici',
          'Crea una cultura dell\'innovazione AI',
          'Riduci il burnout dei dipendenti da attività ripetitive',
          'ROI misurabile entro 30 giorni',
        ],
      },
      description: {
        en: 'Our Team AI Accelerator makes your entire team 3x more productive without requiring any technical skills. Our training program empowers your employees to leverage AI in their daily work without technical barriers.',
        de: 'Unser Team KI-Beschleuniger macht Ihr gesamtes Team 3x produktiver, ohne technische Fähigkeiten zu erfordern. Unser Trainingsprogramm befähigt Ihre Mitarbeiter, KI in ihrer täglichen Arbeit ohne technische Barrieren zu nutzen.',
        it: 'Il nostro Team AI Accelerator rende il tuo intero team 3 volte più produttivo senza richiedere competenze tecniche. Il nostro programma di formazione consente ai tuoi dipendenti di sfruttare l\'AI nel loro lavoro quotidiano senza barriere tecniche.',
      },
      process: {
        en: [
          'Team AI Readiness Assessment',
          'Role-Specific AI Training Programs',
          'Custom AI Tool Implementation',
          'Workflow Optimization',
          'Ongoing Support & Skill Development',
        ],
        de: [
          'Team KI-Bereitschaftsbewertung',
          'Rollenspezifische KI-Schulungsprogramme',
          'Implementierung maßgeschneiderter KI-Tools',
          'Workflow-Optimierung',
          'Laufende Unterstützung & Kompetenzentwicklung',
        ],
        it: [
          'Valutazione della prontezza AI del team',
          'Programmi di formazione AI specifici per ruolo',
          'Implementazione di strumenti AI personalizzati',
          'Ottimizzazione del flusso di lavoro',
          'Supporto continuo e sviluppo delle competenze',
        ],
      },
    },
  };
  
  // Fallback to default content if service ID doesn't match
  const content = serviceContent[id] || serviceContent.ai_workflow;
  
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
  
  const getStartedText = validLang === 'en'
    ? 'Get Started'
    : validLang === 'de'
      ? 'Loslegen'
      : 'Inizia Ora';
  
  return (
    <>
      {/* Hero section */}
      <section className="relative py-20 overflow-hidden">
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
      
      {/* Process section */}
      <section className="py-20 bg-cyber-black">
        <div className="cyber-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-white">
              {processTitle}
            </h2>
            <div className="space-y-8">
              {content.process[validLang as keyof typeof content.process].map((step: string, index: number) => (
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
      <section className="py-20 bg-cyber-darkgray">
        <div className="cyber-container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-white">{ctaTitle}</h2>
            <p className="text-xl text-gray-300 mb-8">{ctaText}</p>
            <Link href={`/${validLang}/contact`} className="cyber-button">
              {getStartedText}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
