import { Metadata } from 'next';
import { getTranslation } from '@/lib/i18n';
import { supportedLanguages, defaultLanguage } from '@/middleware';
import Link from 'next/link';

// Generate metadata for the homepage
export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = supportedLanguages.includes(params.lang) ? params.lang : defaultLanguage;
  
  const title = lang === 'en' 
    ? 'grait.io | AI Transformation Agency'
    : lang === 'de'
      ? 'grait.io | KI-Transformationsagentur'
      : 'grait.io | Agenzia di Trasformazione AI';
  
  const description = lang === 'en'
    ? 'Premium AI integration and coaching agency for business transformation'
    : lang === 'de'
      ? 'Premium KI-Integrations- und Coaching-Agentur für Unternehmenstransformation'
      : 'Agenzia premium di integrazione e coaching AI per la trasformazione aziendale';
  
  return {
    title,
    description,
  };
}

// Hero section component
function HeroSection({ lang }: { lang: string }) {
  const title = getTranslation('home.hero.title', lang);
  const subtitle = getTranslation('home.hero.subtitle', lang);
  const ctaText = getTranslation('common.get_started', lang);
  const learnMoreText = getTranslation('common.learn_more', lang);
  
  return (
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
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={`/${lang}/contact`} className="cyber-button">
              {ctaText}
            </Link>
            <Link href={`/${lang}/services`} className="border-2 border-cyber-blue px-6 py-3 text-white hover:bg-cyber-blue/10 transition-colors">
              {learnMoreText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// Services section component
function ServicesSection({ lang }: { lang: string }) {
  const services = [
    {
      id: 'ai_integration',
      title: getTranslation('services.ai_integration', lang),
      description: lang === 'en' 
        ? 'Seamlessly integrate AI into your existing workflows and systems'
        : lang === 'de'
          ? 'Integrieren Sie KI nahtlos in Ihre bestehenden Arbeitsabläufe und Systeme'
          : 'Integra perfettamente l\'AI nei tuoi flussi di lavoro e sistemi esistenti',
      icon: '🔄',
    },
    {
      id: 'ai_coaching',
      title: getTranslation('services.ai_coaching', lang),
      description: lang === 'en'
        ? 'Expert guidance to transform your business with AI technologies'
        : lang === 'de'
          ? 'Fachkundige Anleitung zur Transformation Ihres Unternehmens mit KI-Technologien'
          : 'Guida esperta per trasformare la tua azienda con le tecnologie AI',
      icon: '🧠',
    },
    {
      id: 'product_development',
      title: getTranslation('services.product_development', lang),
      description: lang === 'en'
        ? 'Develop innovative AI-powered products and services'
        : lang === 'de'
          ? 'Entwickeln Sie innovative KI-gestützte Produkte und Dienstleistungen'
          : 'Sviluppa prodotti e servizi innovativi basati sull\'AI',
      icon: '⚙️',
    },
    {
      id: 'workshops',
      title: getTranslation('services.workshops', lang),
      description: lang === 'en'
        ? 'Hands-on workshops and training for your team'
        : lang === 'de'
          ? 'Praktische Workshops und Schulungen für Ihr Team'
          : 'Workshop pratici e formazione per il tuo team',
      icon: '📚',
    },
  ];
  
  return (
    <section className="py-20 bg-cyber-black/90">
      <div className="cyber-container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="cyber-gradient-text">
              {lang === 'en' ? 'Our Services' : lang === 'de' ? 'Unsere Dienstleistungen' : 'I Nostri Servizi'}
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {lang === 'en' 
              ? 'Comprehensive AI solutions to transform your business'
              : lang === 'de'
                ? 'Umfassende KI-Lösungen zur Transformation Ihres Unternehmens'
                : 'Soluzioni AI complete per trasformare la tua azienda'}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div key={service.id} className="cyber-card group hover:border-cyber-purple transition-colors duration-300">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyber-blue transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-300 mb-4">
                {service.description}
              </p>
              <Link 
                href={`/${lang}/services/${service.id}`} 
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
          ))}
        </div>
      </div>
    </section>
  );
}

// About section component
function AboutSection({ lang }: { lang: string }) {
  return (
    <section className="py-20 bg-gradient-to-b from-cyber-black to-cyber-darkgray">
      <div className="cyber-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">
              <span className="cyber-gradient-text">
                {lang === 'en' ? 'About grait.io' : lang === 'de' ? 'Über grait.io' : 'Chi è grait.io'}
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-6">
              {lang === 'en' 
                ? 'We are a premium AI transformation agency helping businesses leverage the power of artificial intelligence.'
                : lang === 'de'
                  ? 'Wir sind eine Premium-KI-Transformationsagentur, die Unternehmen hilft, die Kraft der künstlichen Intelligenz zu nutzen.'
                  : 'Siamo un\'agenzia premium di trasformazione AI che aiuta le aziende a sfruttare la potenza dell\'intelligenza artificiale.'}
            </p>
            <p className="text-gray-300 mb-8">
              {lang === 'en'
                ? 'Our team of experts combines deep technical knowledge with business acumen to deliver tailored AI solutions that drive real results. We believe in empowering creators and businesses with the tools they need to thrive in the AI-driven future.'
                : lang === 'de'
                  ? 'Unser Expertenteam kombiniert tiefes technisches Wissen mit unternehmerischem Scharfsinn, um maßgeschneiderte KI-Lösungen zu liefern, die echte Ergebnisse erzielen. Wir glauben daran, Kreative und Unternehmen mit den Werkzeugen auszustatten, die sie benötigen, um in der KI-gesteuerten Zukunft zu gedeihen.'
                  : 'Il nostro team di esperti combina profonde conoscenze tecniche con acume aziendale per fornire soluzioni AI su misura che producono risultati reali. Crediamo nell\'empowerment di creatori e aziende con gli strumenti di cui hanno bisogno per prosperare nel futuro guidato dall\'AI.'}
            </p>
            <Link 
              href={`/${lang}/contact`} 
              className="cyber-button"
            >
              {lang === 'en' ? 'Work With Us' : lang === 'de' ? 'Arbeiten Sie mit uns' : 'Lavora con noi'}
            </Link>
          </div>
          <div className="relative">
            <div className="aspect-square bg-cyber-blue/10 border border-cyber-blue/30 rounded-sm p-1">
              <div className="w-full h-full bg-cyber-black/80 flex items-center justify-center">
                <span className="text-9xl">🚀</span>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-2/3 aspect-square bg-cyber-purple/10 border border-cyber-purple/30 rounded-sm p-1">
              <div className="w-full h-full bg-cyber-black/80 flex items-center justify-center">
                <span className="text-6xl">💡</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Testimonials section component
function TestimonialsSection({ lang }: { lang: string }) {
  const testimonials = [
    {
      quote: lang === 'en'
        ? "grait.io transformed our business with their AI integration services. We've seen a 40% increase in efficiency."
        : lang === 'de'
          ? "grait.io hat unser Unternehmen mit ihren KI-Integrationsdiensten transformiert. Wir haben eine 40%ige Steigerung der Effizienz gesehen."
          : "grait.io ha trasformato la nostra azienda con i loro servizi di integrazione AI. Abbiamo visto un aumento del 40% dell'efficienza.",
      author: "Sarah Johnson",
      company: "TechCorp Inc.",
    },
    {
      quote: lang === 'en'
        ? "The AI coaching program provided by grait.io gave our team the skills we needed to innovate in our industry."
        : lang === 'de'
          ? "Das von grait.io angebotene KI-Coaching-Programm hat unserem Team die Fähigkeiten vermittelt, die wir für Innovationen in unserer Branche benötigten."
          : "Il programma di coaching AI fornito da grait.io ha dato al nostro team le competenze necessarie per innovare nel nostro settore.",
      author: "Michael Chen",
      company: "Innovate Solutions",
    },
    {
      quote: lang === 'en'
        ? "Working with grait.io on our product development was a game-changer. Their expertise in AI is unmatched."
        : lang === 'de'
          ? "Die Zusammenarbeit mit grait.io bei unserer Produktentwicklung war ein Wendepunkt. Ihre Expertise in KI ist unübertroffen."
          : "Lavorare con grait.io sul nostro sviluppo di prodotti è stato rivoluzionario. La loro competenza in AI è impareggiabile.",
      author: "Elena Rodriguez",
      company: "Future Systems",
    },
  ];
  
  return (
    <section className="py-20 bg-cyber-black">
      <div className="cyber-container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="cyber-gradient-text">
              {lang === 'en' ? 'What Our Clients Say' : lang === 'de' ? 'Was unsere Kunden sagen' : 'Cosa dicono i nostri clienti'}
            </span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="cyber-card">
              <div className="text-4xl text-cyber-blue mb-4">&ldquo;</div>
              <p className="text-gray-300 mb-6 italic">
                {testimonial.quote}
              </p>
              <div>
                <p className="font-bold text-white">{testimonial.author}</p>
                <p className="text-cyber-blue">{testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA section component
function CtaSection({ lang }: { lang: string }) {
  return (
    <section className="py-20 bg-cyber-black relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 bg-cyber-radial opacity-20"></div>
      
      <div className="cyber-container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            <span className="cyber-gradient-text">
              {lang === 'en' 
                ? 'Ready to Transform Your Business with AI?' 
                : lang === 'de' 
                  ? 'Bereit, Ihr Unternehmen mit KI zu transformieren?' 
                  : 'Pronto a trasformare la tua azienda con l\'AI?'}
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            {lang === 'en'
              ? 'Contact us today to discover how our AI solutions can help you stay ahead of the competition.'
              : lang === 'de'
                ? 'Kontaktieren Sie uns noch heute, um zu erfahren, wie unsere KI-Lösungen Ihnen helfen können, der Konkurrenz einen Schritt voraus zu sein.'
                : 'Contattaci oggi per scoprire come le nostre soluzioni AI possono aiutarti a rimanere un passo avanti rispetto alla concorrenza.'}
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
  );
}

// Main homepage component
export default function HomePage({ params }: { params: { lang: string } }) {
  const lang = supportedLanguages.includes(params.lang) ? params.lang : defaultLanguage;
  
  return (
    <>
      <HeroSection lang={lang} />
      <ServicesSection lang={lang} />
      <AboutSection lang={lang} />
      <TestimonialsSection lang={lang} />
      <CtaSection lang={lang} />
    </>
  );
}
