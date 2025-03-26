import { Metadata } from 'next';
import { getTranslation, services } from '@/lib/i18n';
import { supportedLanguages, defaultLanguage } from '@/middleware';
import Link from 'next/link';

// Generate metadata for the services page
export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = supportedLanguages.includes(params.lang) ? params.lang : defaultLanguage;
  
  const title = lang === 'en' 
    ? 'AI Solutions That Work While You Sleep | grait.io'
    : lang === 'de'
      ? 'KI-Lösungen, die arbeiten, während Sie schlafen | grait.io'
      : 'Soluzioni AI che lavorano mentre dormi | grait.io';
  
  const description = lang === 'en'
    ? 'No coding required – We handle the tech so you can focus on growth'
    : lang === 'de'
      ? 'Keine Programmierung erforderlich – Wir kümmern uns um die Technik, damit Sie sich auf das Wachstum konzentrieren können'
      : 'Nessuna programmazione richiesta – Gestiamo la tecnologia così puoi concentrarti sulla crescita';
  
  return {
    title,
    description,
  };
}

// Service card component
function ServiceCard({ 
  id, 
  title, 
  description, 
  icon, 
  lang 
}: { 
  id: string; 
  title: string; 
  description: string; 
  icon: string;
  lang: string;
}) {
  return (
    <div className="cyber-card group hover:border-cyber-purple transition-colors duration-300">
      <div className="text-5xl mb-6">{icon}</div>
      <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-cyber-blue transition-colors">
        {title}
      </h3>
      <p className="text-gray-300 mb-6">
        {description}
      </p>
      <Link 
        href={`/${lang}/services/${id}`} 
        className="cyber-button inline-block"
      >
        {getTranslation('common.learn_more', lang)}
      </Link>
    </div>
  );
}

// Main services page component
export default function ServicesPage({ params }: { params: { lang: string } }) {
  const lang = supportedLanguages.includes(params.lang) ? params.lang : defaultLanguage;
  
  const pageTitle = lang === 'en' 
    ? 'Our Services' 
    : lang === 'de' 
      ? 'Unsere Dienstleistungen' 
      : 'I Nostri Servizi';
  
  const pageSubtitle = lang === 'en'
    ? 'AI Solutions That Work While You Sleep - Zero Technical Knowledge Required'
    : lang === 'de'
      ? 'KI-Lösungen, die arbeiten, während Sie schlafen - Keine technischen Kenntnisse erforderlich'
      : 'Soluzioni AI che lavorano mentre dormi - Zero conoscenze tecniche richieste';
  
  const serviceDescriptions = {
    ai_workflow: {
      en: 'Automate 53% of repetitive tasks in your first month. Get back your Mondays and focus on growth while we handle all the technical details.',
      de: 'Automatisieren Sie 53% der sich wiederholenden Aufgaben in Ihrem ersten Monat. Gewinnen Sie Ihre Montage zurück und konzentrieren Sie sich auf Wachstum, während wir uns um alle technischen Details kümmern.',
      it: 'Automatizza il 53% delle attività ripetitive nel tuo primo mese. Riprendi i tuoi lunedì e concentrati sulla crescita mentre gestiamo tutti i dettagli tecnici.',
    },
    executive_mastery: {
      en: 'Become an AI-driven leader in 6 weeks. Our executive coaching program transforms how you make decisions - no tech jargon, just measurable business results.',
      de: 'Werden Sie in 6 Wochen ein KI-gesteuerter Leader. Unser Executive-Coaching-Programm verändert Ihre Entscheidungsfindung - kein Tech-Jargon, nur messbare Geschäftsergebnisse.',
      it: 'Diventa un leader guidato dall\'AI in 6 settimane. Il nostro programma di coaching esecutivo trasforma il tuo modo di prendere decisioni - nessun gergo tecnico, solo risultati aziendali misurabili.',
    },
    product_launchpad: {
      en: 'Turn your ideas into revenue-generating AI tools. Launch new products 79% faster while we handle 100% of the technical complexity.',
      de: 'Verwandeln Sie Ihre Ideen in umsatzgenerierende KI-Tools. Bringen Sie neue Produkte 79% schneller auf den Markt, während wir 100% der technischen Komplexität übernehmen.',
      it: 'Trasforma le tue idee in strumenti AI che generano entrate. Lancia nuovi prodotti il 79% più velocemente mentre gestiamo il 100% della complessità tecnica.',
    },
    team_accelerator: {
      en: 'Make your entire team 3x more productive. Our jargon-free training empowers everyone to use AI - no coding skills required, just business results.',
      de: 'Machen Sie Ihr gesamtes Team 3x produktiver. Unser Jargon-freies Training befähigt jeden, KI zu nutzen - keine Programmierkenntnisse erforderlich, nur Geschäftsergebnisse.',
      it: 'Rendi il tuo intero team 3 volte più produttivo. La nostra formazione senza gergo tecnico consente a tutti di utilizzare l\'AI - nessuna competenza di programmazione richiesta, solo risultati aziendali.',
    },
  };
  
  const serviceIcons = {
    ai_workflow: '💰',
    executive_mastery: '🚀',
    product_launchpad: '📱',
    team_accelerator: '📈',
  };
  
  const serviceStats = {
    ai_workflow: {
      en: '83% faster decision-making',
      de: '83% schnellere Entscheidungsfindung',
      it: 'Processo decisionale più rapido dell\'83%'
    },
    executive_mastery: {
      en: '47% reduction in operational costs',
      de: '47% Reduzierung der Betriebskosten',
      it: '47% di riduzione dei costi operativi'
    },
    product_launchpad: {
      en: '12.6x ROI average first year',
      de: '12,6x ROI durchschnittlich im ersten Jahr',
      it: '12,6x ROI medio nel primo anno'
    },
    team_accelerator: {
      en: '140 staff hours/month saved',
      de: '140 Arbeitsstunden/Monat eingespart',
      it: '140 ore di lavoro/mese risparmiate'
    }
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
            <h1 className="cyber-gradient-text text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              {pageTitle}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl">
              {pageSubtitle}
            </p>
          </div>
        </div>
      </section>
      
      {/* Services section */}
      <section className="py-20 bg-cyber-black">
        <div className="cyber-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              <span className="cyber-gradient-text">
                {lang === 'en' 
                  ? 'AI Solutions That Work While You Sleep' 
                  : lang === 'de'
                    ? 'KI-Lösungen, die arbeiten, während Sie schlafen'
                    : 'Soluzioni AI che lavorano mentre dormi'}
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
              {lang === 'en'
                ? 'Why 327 Founders Chose Us Last Quarter'
                : lang === 'de'
                  ? 'Warum 327 Gründer uns im letzten Quartal gewählt haben'
                  : 'Perché 327 Fondatori Ci Hanno Scelto Nell\'Ultimo Trimestre'}
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <div className="bg-cyber-blue/10 border border-cyber-blue/30 px-4 py-2 rounded-sm">
                <span className="text-white font-bold">
                  {lang === 'en' ? '72h Implementation Guarantee' : 
                   lang === 'de' ? '72h-Implementierungsgarantie' : 
                   'Garanzia di implementazione in 72h'}
                </span>
              </div>
              <div className="bg-cyber-purple/10 border border-cyber-purple/30 px-4 py-2 rounded-sm">
                <span className="text-white font-bold">
                  {lang === 'en' ? 'Zero Technical Jargon Policy' : 
                   lang === 'de' ? 'Null technischer Fachjargon' : 
                   'Politica Zero Gergo Tecnico'}
                </span>
              </div>
              <div className="bg-cyber-green/10 border border-cyber-green/30 px-4 py-2 rounded-sm">
                <span className="text-white font-bold">
                  {lang === 'en' ? '12-Month ROI Guarantee' : 
                   lang === 'de' ? '12-Monats-ROI-Garantie' : 
                   'Garanzia ROI di 12 mesi'}
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div key={service.id} className="cyber-card group hover:border-cyber-purple transition-colors duration-300">
                <div className="text-5xl mb-6">{serviceIcons[service.id as keyof typeof serviceIcons]}</div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-cyber-blue transition-colors">
                  {getTranslation(service.translationKey, lang)}
                </h3>
                <div className="bg-cyber-blue/10 inline-block px-3 py-1 rounded-sm mb-4">
                  <span className="text-cyber-blue text-sm font-bold">
                    {serviceStats[service.id as keyof typeof serviceStats][lang as keyof typeof serviceStats.ai_workflow]}
                  </span>
                </div>
                <p className="text-gray-300 mb-6">
                  {serviceDescriptions[service.id as keyof typeof serviceDescriptions][lang as keyof typeof serviceDescriptions.ai_workflow]}
                </p>
                <Link 
                  href={`/${lang}/services/${service.id}`} 
                  className="cyber-button inline-block"
                >
                  {getTranslation('common.learn_more', lang)}
                </Link>
              </div>
            ))}
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
                  ? 'Ready to transform your business with AI?' 
                  : lang === 'de' 
                    ? 'Bereit, Ihr Unternehmen mit KI zu transformieren?' 
                    : 'Pronto a trasformare la tua azienda con l\'AI?'}
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              {lang === 'en'
                ? 'Book your free AI Readiness Assessment today. No technical knowledge required - just bring your business challenges.'
                : lang === 'de'
                  ? 'Buchen Sie noch heute Ihre kostenlose KI-Bereitschaftsbewertung. Keine technischen Kenntnisse erforderlich - bringen Sie einfach Ihre Geschäftsherausforderungen mit.'
                  : 'Prenota oggi la tua valutazione gratuita di prontezza all\'AI. Non è richiesta alcuna conoscenza tecnica - porta solo le tue sfide aziendali.'}
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
