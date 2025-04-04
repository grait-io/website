import { Metadata } from 'next';
import { getTranslation } from '@/lib/i18n';
import { supportedLanguages, defaultLanguage } from '@/middleware';
import Link from 'next/link';

// Generate metadata for the homepage
export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = supportedLanguages.includes(params.lang) ? params.lang : defaultLanguage;
  
  const title = lang === 'en' 
    ? 'Future-Proof Your Business in 90 Days - No AI Expertise Required | grait.io'
    : lang === 'de'
      ? 'Machen Sie Ihr Unternehmen in 90 Tagen zukunftssicher - Keine KI-Expertise erforderlich | grait.io'
      : 'Rendi la tua azienda a prova di futuro in 90 giorni - Nessuna competenza AI richiesta | grait.io';
  
  const description = lang === 'en'
    ? 'We implement customized AI systems so you can outpace competitors without becoming a tech expert. 72h implementation guarantee and 12-month ROI guarantee.'
    : lang === 'de'
      ? 'Wir implementieren maßgeschneiderte KI-Systeme, damit Sie der Konkurrenz voraus sind, ohne ein Technikexperte zu werden. 72h-Implementierungsgarantie und 12-Monats-ROI-Garantie.'
      : 'Implementiamo sistemi AI personalizzati così puoi superare i concorrenti senza diventare un esperto di tecnologia. Garanzia di implementazione in 72h e garanzia ROI di 12 mesi.';
  
  return {
    title,
    description,
  };
}

// Hero section component
function HeroSection({ lang }: { lang: string }) {
  const title = lang === 'en'
    ? "Future-Proof Your Business in 90 Days - No AI Expertise Required"
    : lang === 'de'
      ? "Zukunftssicher Ihr Unternehmen in 90 Tagen - Keine KI-Expertise erforderlich"
      : "Rendi la tua azienda a prova di futuro in 90 giorni - Nessuna competenza AI richiesta";
  const subtitle = lang === 'en'
    ? "We implement customized AI systems so you can outpace competitors without becoming a tech expert"
    : lang === 'de'
      ? "Wir implementieren maßgeschneiderte KI-Systeme, damit Sie der Konkurrenz voraus sind, ohne ein Technikexperte zu werden"
      : "Implementiamo sistemi AI personalizzati così puoi superare i concorrenti senza diventare un esperto di tecnologia";
  const ctaText = lang === 'en'
    ? "Book Free AI Readiness Assessment →"
    : lang === 'de'
      ? "Kostenlose KI-Bereitschaftsbewertung buchen →"
      : "Prenota una valutazione gratuita di prontezza AI →";
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1 text-left">
            <h1 className="cyber-gradient-text text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {title}
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-xl">
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
          <div className="order-1 md:order-2 flex justify-center mb-8 md:mb-0">
            <div className="relative w-full max-w-md">
              <div className="aspect-video bg-cyber-blue/10 border border-cyber-blue/30 rounded-sm p-1 transform -rotate-3">
                <div className="w-full h-full bg-cyber-black/80 flex items-center justify-center">
                  <span className="text-4xl">😓📊</span>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-2/3 aspect-video bg-cyber-purple/10 border border-cyber-purple/30 rounded-sm p-1 transform rotate-3">
                <div className="w-full h-full bg-cyber-black/80 flex items-center justify-center">
                  <span className="text-4xl">😎📈</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
// Core Value Proposition section component
function ValuePropsSection({ lang }: { lang: string }): JSX.Element {
  const valueProps = [
    {
      icon: '⚡',
      title: lang === 'en'
        ? '72h AI Implementation Guarantee'
        : lang === 'de'
          ? '72h KI-Implementierungsgarantie'
          : 'Garanzia di implementazione AI in 72h',
      description: lang === 'en'
        ? 'We deliver working AI solutions within 3 business days or your money back'
        : lang === 'de'
          ? 'Wir liefern funktionierende KI-Lösungen innerhalb von 3 Werktagen oder Sie erhalten Ihr Geld zurück'
          : 'Consegniamo soluzioni AI funzionanti entro 3 giorni lavorativi o rimborsiamo'
    },
    {
      icon: '🚫🤖',
      title: lang === 'en'
        ? 'Zero Technical Jargon Policy'
        : lang === 'de'
          ? 'Kein Technik-Jargon'
          : 'Niente gergo tecnico',
      description: lang === 'en'
        ? 'We explain everything in plain business terms you can understand'
        : lang === 'de'
          ? 'Wir erklären alles in einfachen Geschäftsbedingungen, die Sie verstehen können'
          : 'Spieghiamo tutto in termini aziendali semplici che puoi capire'
    },
    {
      icon: '📈',
      title: lang === 'en'
        ? '12-Month Future-Proof ROI Guarantee'
        : lang === 'de'
          ? '12-Monats-Zukunftssichere ROI-Garantie'
          : 'Garanzia ROI a prova di futuro di 12 mesi',
      description: lang === 'en'
        ? 'We guarantee measurable results or we\'ll work for free until you get them'
        : lang === 'de'
          ? 'Wir garantieren messbare Ergebnisse oder arbeiten kostenlos, bis Sie sie erhalten'
          : 'Garantiamo risultati misurabili o lavoriamo gratuitamente finché non li ottieni'
    },
    {
      icon: '✨',
      title: lang === 'en'
        ? '24/7 White-Glove Support'
        : lang === 'de'
          ? '24/7 Premium-Support'
          : 'Supporto premium 24/7',
      description: lang === 'en'
        ? 'Dedicated account manager and priority support whenever you need it'
        : lang === 'de'
          ? 'Dedizierter Account-Manager und Prioritäts-Support, wann immer Sie ihn benötigen'
          : 'Account manager dedicato e supporto prioritario ogni volta che ne hai bisogno'
    }
  ];

  return (
    <section className="py-20 bg-cyber-darkgray" id="why-us">
      <div className="cyber-container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="cyber-gradient-text">
              {lang === 'en' 
                ? 'Why 327 Founders Chose Us Last Quarter' 
                : lang === 'de'
                  ? 'Warum 327 Gründer uns im letzten Quartal gewählt haben'
                  : 'Perché 327 fondatori ci hanno scelto nell\'ultimo trimestre'}
            </span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {valueProps.map((prop, index) => (
            <div key={index} className="cyber-card">
              <div className="text-4xl mb-4">{prop.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-white">{prop.title}</h3>
              <p className="text-gray-300">{prop.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Services section component
function ServicesSection({ lang }: { lang: string }) {
  const services = [
    {
      id: 'ai_workflow',
      title: getTranslation('services.ai_workflow', lang),
      description: lang === 'en'
        ? 'Automate 53% of repetitive tasks in your first month'
        : lang === 'de'
          ? 'Automatisieren Sie 53% der sich wiederholenden Aufgaben in Ihrem ersten Monat'
          : 'Automatizza il 53% delle attività ripetitive nel tuo primo mese',
      icon: '💰',
    },
    {
      id: 'executive_mastery',
      title: getTranslation('services.executive_mastery', lang),
      description: lang === 'en'
        ? 'Become an AI-driven leader in 6 weeks'
        : lang === 'de'
          ? 'Werden Sie in 6 Wochen ein KI-gesteuerter Leader'
          : 'Diventa un leader guidato dall\'AI in 6 settimane',
      icon: '🚀',
    },
    {
      id: 'product_launchpad',
      title: getTranslation('services.product_launchpad', lang),
      description: lang === 'en'
        ? 'Turn your ideas into revenue-generating AI tools'
        : lang === 'de'
          ? 'Verwandeln Sie Ihre Ideen in umsatzgenerierende KI-Tools'
          : 'Trasforma le tue idee in strumenti AI che generano entrate',
      icon: '📱',
    },
    {
      id: 'team_accelerator',
      title: getTranslation('services.team_accelerator', lang),
      description: lang === 'en'
        ? 'Make your entire team 3x more productive'
        : lang === 'de'
          ? 'Machen Sie Ihr gesamtes Team 3x produktiver'
          : 'Rendi il tuo intero team 3 volte più produttivo',
      icon: '📈',
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
    <section className="py-20 bg-gradient-to-b from-cyber-black to-cyber-darkgray" id="why-us">
      <div className="cyber-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">
              <span className="cyber-gradient-text">
                {lang === 'en' ? 'We Speak Your Language: Business Growth, Not Tech Talk' : 
                 lang === 'de' ? 'Wir sprechen Ihre Sprache: Geschäftswachstum, nicht Tech-Talk' : 
                 'Parliamo la tua lingua: crescita aziendale, non gergo tecnico'}
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-6">
              {lang === 'en' 
                ? 'As former founders ourselves, we know you need solutions - not science projects.'
                : lang === 'de'
                  ? 'Als ehemalige Gründer selbst wissen wir, dass Sie Lösungen brauchen - keine Wissenschaftsprojekte.'
                  : 'Come ex fondatori, sappiamo che hai bisogno di soluzioni, non di progetti scientifici.'}
            </p>
            <p className="text-gray-300 mb-4">
              {lang === 'en'
                ? 'Our 3-step process:'
                : lang === 'de'
                  ? 'Unser 3-Schritte-Prozess:'
                  : 'Il nostro processo in 3 fasi:'}
            </p>
            <ul className="list-disc list-inside text-gray-300 mb-8 space-y-2">
              <li>
                {lang === 'en'
                  ? 'Translate your business goals into AI requirements'
                  : lang === 'de'
                    ? 'Übersetzen Ihrer Geschäftsziele in KI-Anforderungen'
                    : 'Traduciamo i tuoi obiettivi aziendali in requisiti AI'}
              </li>
              <li>
                {lang === 'en'
                  ? 'Implement while you focus on core operations'
                  : lang === 'de'
                    ? 'Implementieren, während Sie sich auf Kernoperationen konzentrieren'
                    : 'Implementiamo mentre ti concentri sulle operazioni principali'}
              </li>
              <li>
                {lang === 'en'
                  ? 'Maintain systems so you stay ahead of competitors'
                  : lang === 'de'
                    ? 'Systeme warten, damit Sie der Konkurrenz voraus bleiben'
                    : 'Manteniamo i sistemi in modo che tu rimanga un passo avanti rispetto ai concorrenti'}
              </li>
            </ul>
            <p className="text-gray-300 mb-8 font-bold">
              {lang === 'en'
                ? 'No PhDs needed – just measurable results.'
                : lang === 'de'
                  ? 'Keine Doktortitel nötig - nur messbare Ergebnisse.'
                  : 'Non servono PhD - solo risultati misurabili.'}
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
function TestimonialsSection({ lang }: { lang: string; id?: string }) {
  const testimonials = [
    {
      quote: lang === 'en'
        ? "I thought AI was for tech bros - grAIt.io gave me a 30% revenue boost without me touching a single line of code"
        : lang === 'de'
          ? "Ich dachte, KI wäre etwas für Tech-Experten - grAIt.io hat mir einen 30%igen Umsatzschub beschert, ohne dass ich eine einzige Codezeile anfassen musste"
          : "Pensavo che l'AI fosse solo per esperti di tecnologia - grAIt.io mi ha dato un aumento del 30% delle entrate senza che toccassi una sola riga di codice",
      author: "Maria L.",
      company: lang === 'en' ? "Fashion E-Commerce Founder" : lang === 'de' ? "Gründerin eines Mode-E-Commerce" : "Fondatrice di E-Commerce di Moda",
    },
    {
      quote: lang === 'en'
        ? "Finally an agency that speaks business, not binary! We automated 140 staff hours/month in Week 1"
        : lang === 'de'
          ? "Endlich eine Agentur, die Geschäfts- und nicht Binärsprache spricht! Wir haben in der ersten Woche 140 Arbeitsstunden/Monat automatisiert"
          : "Finalmente un'agenzia che parla la lingua degli affari, non il binario! Abbiamo automatizzato 140 ore di lavoro/mese nella prima settimana",
      author: "James R.",
      company: lang === 'en' ? "Restaurant Chain Owner" : lang === 'de' ? "Besitzer einer Restaurantkette" : "Proprietario di Catena di Ristoranti",
    },
    {
      quote: lang === 'en'
        ? "From overwhelmed to AI-powered in 3 weeks. They translated everything into terms I could understand as a non-technical founder"
        : lang === 'de'
          ? "Von überfordert zu KI-gestützt in 3 Wochen. Sie haben alles in Begriffe übersetzt, die ich als nicht-technischer Gründer verstehen konnte"
          : "Da sopraffatto a potenziato dall'AI in 3 settimane. Hanno tradotto tutto in termini che potevo capire come fondatore non tecnico",
      author: "David K.",
      company: lang === 'en' ? "Consulting Firm Owner" : lang === 'de' ? "Inhaber einer Beratungsfirma" : "Proprietario di Società di Consulenza",
    },
  ];
  
  return (
    <section className="py-20 bg-cyber-black" id="results">
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
                ? 'Ready to Future-Proof Your Business?' 
                : lang === 'de' 
                  ? 'Bereit, Ihr Unternehmen zukunftssicher zu machen?' 
                  : 'Pronto a rendere la tua azienda a prova di futuro?'}
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-6">
            {lang === 'en'
              ? 'Book your free AI Readiness Assessment today.'
              : lang === 'de'
                ? 'Buchen Sie noch heute Ihre kostenlose KI-Bereitschaftsbewertung.'
                : 'Prenota oggi la tua valutazione gratuita di prontezza all\'AI.'}
          </p>
          <p className="text-lg text-cyber-blue mb-10">
            {lang === 'en'
              ? 'Only 3 spots left this week!'
              : lang === 'de'
                ? 'Nur noch 3 Plätze diese Woche!'
                : 'Solo 3 posti rimasti questa settimana!'}
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
      <ValuePropsSection lang={lang} />
      <ServicesSection lang={lang} />
      <TestimonialsSection lang={lang} />
      <AboutSection lang={lang} />
      <CtaSection lang={lang} />
    </>
  );
}
