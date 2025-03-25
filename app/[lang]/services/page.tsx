import { Metadata } from 'next';
import { getTranslation, services } from '@/lib/i18n';
import { supportedLanguages, defaultLanguage } from '@/middleware';
import Link from 'next/link';

// Generate metadata for the services page
export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = supportedLanguages.includes(params.lang) ? params.lang : defaultLanguage;
  
  const title = lang === 'en' 
    ? 'Our Services | grait.io'
    : lang === 'de'
      ? 'Unsere Dienstleistungen | grait.io'
      : 'I Nostri Servizi | grait.io';
  
  const description = lang === 'en'
    ? 'Explore our AI integration, coaching, product development, and workshop services'
    : lang === 'de'
      ? 'Entdecken Sie unsere KI-Integrations-, Coaching-, Produktentwicklungs- und Workshop-Dienstleistungen'
      : 'Esplora i nostri servizi di integrazione AI, coaching, sviluppo prodotti e workshop';
  
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
    ? 'Comprehensive AI solutions to transform your business'
    : lang === 'de'
      ? 'Umfassende KI-Lösungen zur Transformation Ihres Unternehmens'
      : 'Soluzioni AI complete per trasformare la tua azienda';
  
  const serviceDescriptions = {
    ai_integration: {
      en: 'We integrate cutting-edge AI technologies into your existing systems and workflows, automating processes and enhancing decision-making capabilities.',
      de: 'Wir integrieren modernste KI-Technologien in Ihre bestehenden Systeme und Arbeitsabläufe, automatisieren Prozesse und verbessern die Entscheidungsfindungsfähigkeiten.',
      it: 'Integriamo tecnologie AI all\'avanguardia nei tuoi sistemi e flussi di lavoro esistenti, automatizzando i processi e migliorando le capacità decisionali.',
    },
    ai_coaching: {
      en: 'Our expert coaches guide your team through the AI transformation journey, providing training, strategy development, and implementation support.',
      de: 'Unsere erfahrenen Coaches begleiten Ihr Team durch die KI-Transformationsreise, bieten Schulungen, Strategieentwicklung und Implementierungsunterstützung.',
      it: 'I nostri coach esperti guidano il tuo team attraverso il percorso di trasformazione AI, fornendo formazione, sviluppo di strategie e supporto all\'implementazione.',
    },
    product_development: {
      en: 'We help you develop innovative AI-powered products and services that create new revenue streams and competitive advantages.',
      de: 'Wir helfen Ihnen bei der Entwicklung innovativer KI-gestützter Produkte und Dienstleistungen, die neue Einnahmequellen und Wettbewerbsvorteile schaffen.',
      it: 'Ti aiutiamo a sviluppare prodotti e servizi innovativi basati sull\'AI che creano nuovi flussi di entrate e vantaggi competitivi.',
    },
    workshops: {
      en: 'Our hands-on workshops provide your team with the knowledge and skills needed to leverage AI technologies effectively.',
      de: 'Unsere praktischen Workshops vermitteln Ihrem Team das Wissen und die Fähigkeiten, die für den effektiven Einsatz von KI-Technologien erforderlich sind.',
      it: 'I nostri workshop pratici forniscono al tuo team le conoscenze e le competenze necessarie per sfruttare efficacemente le tecnologie AI.',
    },
  };
  
  const serviceIcons = {
    ai_integration: '🔄',
    ai_coaching: '🧠',
    product_development: '⚙️',
    workshops: '📚',
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                id={service.id}
                title={getTranslation(service.translationKey, lang)}
                description={serviceDescriptions[service.id as keyof typeof serviceDescriptions][lang as keyof typeof serviceDescriptions.ai_integration]}
                icon={serviceIcons[service.id as keyof typeof serviceIcons]}
                lang={lang}
              />
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
                ? 'Contact us today to discuss your specific needs and how our services can help you achieve your goals.'
                : lang === 'de'
                  ? 'Kontaktieren Sie uns noch heute, um Ihre spezifischen Bedürfnisse zu besprechen und wie unsere Dienstleistungen Ihnen helfen können, Ihre Ziele zu erreichen.'
                  : 'Contattaci oggi per discutere delle tue esigenze specifiche e di come i nostri servizi possono aiutarti a raggiungere i tuoi obiettivi.'}
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
