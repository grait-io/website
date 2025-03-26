import { Metadata } from 'next';
import { supportedLanguages, defaultLanguage } from '@/middleware';

// Generate metadata for the contact page
export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = supportedLanguages.includes(params.lang) ? params.lang : defaultLanguage;
  
  const title = lang === 'en' 
    ? 'Free AI Readiness Assessment for Business Owners | grait.io'
    : lang === 'de'
      ? 'Kostenlose KI-Bereitschaftsbewertung für Unternehmer | grait.io'
      : 'Valutazione Gratuita di Prontezza all\'AI per Imprenditori | grait.io';
  
  const description = lang === 'en'
    ? 'Future-proof your business in 90 days - no AI expertise required. Book a founder-to-founder call or get a custom 12-month growth plan. No tech jargon.'
    : lang === 'de'
      ? 'Machen Sie Ihr Unternehmen in 90 Tagen zukunftssicher - keine KI-Expertise erforderlich. Buchen Sie ein Gründer-zu-Gründer-Gespräch oder erhalten Sie einen maßgeschneiderten 12-Monats-Wachstumsplan. Kein Tech-Jargon.'
      : 'Rendi la tua azienda a prova di futuro in 90 giorni - nessuna competenza AI richiesta. Prenota una chiamata da fondatore a fondatore o ottieni un piano di crescita personalizzato di 12 mesi. Nessun gergo tecnico.'
  
  return {
    title,
    description,
  };
}

// Contact form component
function ContactForm({ lang }: { lang: string }) {
  const nameLabel = lang === 'en' ? 'Your Name' : lang === 'de' ? 'Ihr Name' : 'Il Tuo Nome';
  const companyLabel = lang === 'en' ? 'Company' : lang === 'de' ? 'Unternehmen' : 'Azienda';
  const emailLabel = lang === 'en' ? 'Email' : lang === 'de' ? 'E-Mail' : 'Email';
  const revenueLabel = lang === 'en' ? 'Annual Revenue' : lang === 'de' ? 'Jahresumsatz' : 'Fatturato Annuale';
  const industryLabel = lang === 'en' ? 'Industry' : lang === 'de' ? 'Branche' : 'Settore';
  const painPointsLabel = lang === 'en' ? 'Top Business Challenge' : lang === 'de' ? 'Größte Geschäftsherausforderung' : 'Principale Sfida Aziendale';
  const painPointsPlaceholder = lang === 'en' 
    ? 'What business challenge are you hoping AI can solve? (No technical knowledge required)' 
    : lang === 'de' 
      ? 'Welche Geschäftsherausforderung hoffen Sie mit KI lösen zu können? (Keine technischen Kenntnisse erforderlich)' 
      : 'Quale sfida aziendale speri che l\'AI possa risolvere? (Non è richiesta conoscenza tecnica)';
  const submitLabel = lang === 'en' 
    ? 'Get Your 12-Month Growth Plan' 
    : lang === 'de' 
      ? 'Holen Sie sich Ihren 12-Monats-Wachstumsplan' 
      : 'Ottieni il tuo piano di crescita di 12 mesi';
  
  return (
    <form className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-white font-medium mb-2">
            {nameLabel}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="cyber-input w-full"
            required
          />
        </div>
        
        <div>
          <label htmlFor="company" className="block text-white font-medium mb-2">
            {companyLabel}
          </label>
          <input
            type="text"
            id="company"
            name="company"
            className="cyber-input w-full"
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className="block text-white font-medium mb-2">
            {emailLabel}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="cyber-input w-full"
            required
          />
        </div>
        
        <div>
          <label htmlFor="revenue" className="block text-white font-medium mb-2">
            {revenueLabel}
          </label>
          <select
            id="revenue"
            name="revenue"
            className="cyber-input w-full"
            required
          >
            <option value="">--</option>
            <option value="under1m">{lang === 'en' ? 'Under $1M' : lang === 'de' ? 'Unter 1 Mio. €' : 'Sotto 1M €'}</option>
            <option value="1m-5m">{lang === 'en' ? '$1M - $5M' : lang === 'de' ? '1 Mio. € - 5 Mio. €' : '1M € - 5M €'}</option>
            <option value="5m-20m">{lang === 'en' ? '$5M - $20M' : lang === 'de' ? '5 Mio. € - 20 Mio. €' : '5M € - 20M €'}</option>
            <option value="20m-50m">{lang === 'en' ? '$20M - $50M' : lang === 'de' ? '20 Mio. € - 50 Mio. €' : '20M € - 50M €'}</option>
            <option value="over50m">{lang === 'en' ? 'Over $50M' : lang === 'de' ? 'Über 50 Mio. €' : 'Oltre 50M €'}</option>
          </select>
        </div>
      </div>
      
      <div>
        <label htmlFor="industry" className="block text-white font-medium mb-2">
          {industryLabel}
        </label>
        <select
          id="industry"
          name="industry"
          className="cyber-input w-full"
          required
        >
          <option value="">--</option>
          <option value="manufacturing">{lang === 'en' ? 'Manufacturing' : lang === 'de' ? 'Fertigung' : 'Produzione'}</option>
          <option value="retail">{lang === 'en' ? 'Retail' : lang === 'de' ? 'Einzelhandel' : 'Vendita al dettaglio'}</option>
          <option value="finance">{lang === 'en' ? 'Financial Services' : lang === 'de' ? 'Finanzdienstleistungen' : 'Servizi finanziari'}</option>
          <option value="healthcare">{lang === 'en' ? 'Healthcare' : lang === 'de' ? 'Gesundheitswesen' : 'Sanità'}</option>
          <option value="technology">{lang === 'en' ? 'Technology' : lang === 'de' ? 'Technologie' : 'Tecnologia'}</option>
          <option value="education">{lang === 'en' ? 'Education' : lang === 'de' ? 'Bildung' : 'Istruzione'}</option>
          <option value="creative">{lang === 'en' ? 'Creative Industries' : lang === 'de' ? 'Kreativbranchen' : 'Industrie creative'}</option>
          <option value="other">{lang === 'en' ? 'Other' : lang === 'de' ? 'Andere' : 'Altro'}</option>
        </select>
      </div>
      
      <div>
        <label htmlFor="painPoints" className="block text-white font-medium mb-2">
          {painPointsLabel}
        </label>
        <textarea
          id="painPoints"
          name="painPoints"
          rows={4}
          className="cyber-input w-full"
          required
          placeholder={painPointsPlaceholder}
        ></textarea>
      </div>
      
      <div>
        <button type="submit" className="cyber-button w-full">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

// Fast track component
function FastTrack({ lang }: { lang: string }) {
  const fastTrackTitle = lang === 'en' 
    ? 'Founder-to-Founder Strategy Call' 
    : lang === 'de' 
      ? 'Gründer-zu-Gründer Strategiegespräch' 
      : 'Chiamata Strategica da Fondatore a Fondatore';
  
  const fastTrackDescription = lang === 'en'
    ? 'Book a 15-minute call with one of our founders who built and sold their own AI companies. We speak business, not binary! Get practical advice on how AI can solve your specific challenges.'
    : lang === 'de'
      ? 'Buchen Sie ein 15-minütiges Gespräch mit einem unserer Gründer, der seine eigenen KI-Unternehmen aufgebaut und verkauft hat. Wir sprechen Business, nicht Binärcode! Erhalten Sie praktische Ratschläge, wie KI Ihre spezifischen Herausforderungen lösen kann.'
      : 'Prenota una chiamata di 15 minuti con uno dei nostri fondatori che ha costruito e venduto le proprie aziende AI. Parliamo di business, non di codice binario! Ricevi consigli pratici su come l\'AI può risolvere le tue sfide specifiche.';
  
  const buttonText = lang === 'en'
    ? 'Book Free 15-Min Call →'
    : lang === 'de'
      ? 'Kostenloses 15-Min Gespräch buchen →'
      : 'Prenota chiamata gratuita di 15 min →';
  
  return (
    <div className="cyber-card h-full flex flex-col border-cyber-purple">
      <div className="absolute -top-4 left-0 right-0 text-center">
        <span className="bg-cyber-purple text-black text-sm font-bold px-4 py-1">
          {lang === 'en' ? 'MOST POPULAR' : 
           lang === 'de' ? 'AM BELIEBTESTEN' : 
           'PIÙ POPOLARE'}
        </span>
      </div>
      <h3 className="text-xl font-bold text-white mb-4">{fastTrackTitle}</h3>
      
      <p className="text-gray-300 mb-4 flex-grow">
        {fastTrackDescription}
      </p>
      
      <ul className="space-y-2 mb-6">
        <li className="flex items-start">
          <div className="text-cyber-purple mr-2">✓</div>
          <p className="text-gray-300 text-sm">
            {lang === 'en' ? 'Zero technical jargon guaranteed' : 
             lang === 'de' ? 'Null technischer Fachjargon garantiert' : 
             'Zero gergo tecnico garantito'}
          </p>
        </li>
        <li className="flex items-start">
          <div className="text-cyber-purple mr-2">✓</div>
          <p className="text-gray-300 text-sm">
            {lang === 'en' ? 'Practical business advice, not tech talk' : 
             lang === 'de' ? 'Praktische Geschäftsratschläge, kein Tech-Talk' : 
             'Consigli pratici di business, non discorsi tecnici'}
          </p>
        </li>
        <li className="flex items-start">
          <div className="text-cyber-purple mr-2">✓</div>
          <p className="text-gray-300 text-sm">
            {lang === 'en' ? 'No obligation, no sales pressure' : 
             lang === 'de' ? 'Keine Verpflichtung, kein Verkaufsdruck' : 
             'Nessun obbligo, nessuna pressione di vendita'}
          </p>
        </li>
      </ul>
      
      <div className="mt-auto">
        <a 
          href="https://calendly.com/grait-io/strategy" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-cyber-purple text-black font-bold px-6 py-3 w-full block text-center hover:bg-cyber-purple/90 transition-colors"
        >
          {buttonText}
        </a>
      </div>
    </div>
  );
}

// Guarantee badge component
function GuaranteeBadge({ lang }: { lang: string }) {
  const guaranteeText = lang === 'en'
    ? '100% Founder-to-Founder Consultation – No Sales Scripts, No Tech Jargon'
    : lang === 'de'
      ? '100% Gründer-zu-Gründer-Beratung – Keine Verkaufsskripte, Kein Tech-Jargon'
      : 'Consulenza 100% da Fondatore a Fondatore – Nessun Copione di Vendita, Nessun Gergo Tecnico';
  
  return (
    <div className="bg-cyber-blue/10 border-2 border-cyber-blue rounded-sm p-6 text-center">
      <div className="text-3xl mb-3">🛡️</div>
      <p className="text-white font-bold text-lg">{guaranteeText}</p>
    </div>
  );
}

// Scarcity component
function ScarcityBanner({ lang }: { lang: string }) {
  const scarcityText = lang === 'en'
    ? 'Only 3 Implementation Spots Left This Quarter!'
    : lang === 'de'
      ? 'Nur noch 3 Implementierungsplätze in diesem Quartal!'
      : 'Solo 3 posti di implementazione rimasti questo trimestre!';
  
  return (
    <div className="bg-cyber-purple/20 border border-cyber-purple rounded-sm p-4 text-center mb-8">
      <p className="text-cyber-purple font-bold text-lg">{scarcityText}</p>
    </div>
  );
}

// Main contact page component
export default function ContactPage({ params }: { params: { lang: string } }) {
  const lang = supportedLanguages.includes(params.lang) ? params.lang : defaultLanguage;
  
  const pageTitle = lang === 'en' 
    ? 'Book Your Free AI Readiness Assessment' 
    : lang === 'de' 
      ? 'Buchen Sie Ihre kostenlose KI-Bereitschaftsbewertung' 
      : 'Prenota la tua valutazione gratuita di prontezza all\'AI';
  
  const pageSubtitle = lang === 'en'
    ? 'No technical knowledge required - just bring your business challenges'
    : lang === 'de'
      ? 'Keine technischen Kenntnisse erforderlich - bringen Sie einfach Ihre Geschäftsherausforderungen mit'
      : 'Nessuna conoscenza tecnica richiesta - porta solo le tue sfide aziendali';
  
  const detailedAuditTitle = lang === 'en'
    ? 'Custom AI Business Blueprint'
    : lang === 'de'
      ? 'Maßgeschneiderter KI-Geschäftsplan'
      : 'Blueprint Aziendale AI Personalizzato';
  
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
      
      {/* Contact options section */}
      <section className="py-20 bg-cyber-black">
        <div className="cyber-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            <div className="lg:col-span-1">
              <FastTrack lang={lang} />
            </div>
            <div className="lg:col-span-1">
              <div className="cyber-card h-full">
                <h3 className="text-xl font-bold text-white mb-4">{detailedAuditTitle}</h3>
                <p className="text-gray-300 mb-6">
                  {lang === 'en' 
                    ? 'Get a personalized roadmap showing how AI can transform your specific business operations without disrupting your team or requiring technical expertise.'
                    : lang === 'de'
                      ? 'Erhalten Sie einen personalisierten Fahrplan, der zeigt, wie KI Ihre spezifischen Geschäftsabläufe transformieren kann, ohne Ihr Team zu stören oder technisches Fachwissen zu erfordern.'
                      : 'Ottieni una roadmap personalizzata che mostra come l\'AI può trasformare le tue specifiche operazioni aziendali senza disturbare il tuo team o richiedere competenze tecniche.'}
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <div className="text-cyber-blue mr-2">✓</div>
                    <p className="text-gray-300 text-sm">
                      {lang === 'en' ? '12-Month ROI Forecast' : 
                      lang === 'de' ? '12-Monats-ROI-Prognose' : 
                      'Previsione ROI a 12 mesi'}
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="text-cyber-blue mr-2">✓</div>
                    <p className="text-gray-300 text-sm">
                      {lang === 'en' ? 'Competitor Analysis' : 
                      lang === 'de' ? 'Wettbewerbsanalyse' : 
                      'Analisi della concorrenza'}
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="text-cyber-blue mr-2">✓</div>
                    <p className="text-gray-300 text-sm">
                      {lang === 'en' ? 'Implementation Timeline (No Tech Skills Required)' : 
                      lang === 'de' ? 'Implementierungszeitplan (Keine technischen Kenntnisse erforderlich)' : 
                      'Tempistica di implementazione (Nessuna competenza tecnica richiesta)'}
                    </p>
                  </li>
                </ul>
                <ContactForm lang={lang} />
              </div>
            </div>
          </div>
          
          <div className="mt-12 space-y-6">
            <ScarcityBanner lang={lang} />
            <GuaranteeBadge lang={lang} />
          </div>
        </div>
      </section>
    </>
  );
}
