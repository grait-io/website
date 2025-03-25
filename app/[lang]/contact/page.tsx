import { Metadata } from 'next';
import { getTranslation } from '@/lib/i18n';
import { supportedLanguages, defaultLanguage } from '@/middleware';

// Generate metadata for the contact page
export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = supportedLanguages.includes(params.lang) ? params.lang : defaultLanguage;
  
  const title = lang === 'en' 
    ? 'Contact Us | grait.io'
    : lang === 'de'
      ? 'Kontaktieren Sie uns | grait.io'
      : 'Contattaci | grait.io';
  
  const description = lang === 'en'
    ? 'Get in touch with grait.io for AI integration and transformation services'
    : lang === 'de'
      ? 'Nehmen Sie Kontakt mit grait.io auf für KI-Integrations- und Transformationsdienstleistungen'
      : 'Mettiti in contatto con grait.io per servizi di integrazione e trasformazione AI';
  
  return {
    title,
    description,
  };
}

// Contact form component
function ContactForm({ lang }: { lang: string }) {
  const nameLabel = lang === 'en' ? 'Name' : lang === 'de' ? 'Name' : 'Nome';
  const emailLabel = lang === 'en' ? 'Email' : lang === 'de' ? 'E-Mail' : 'Email';
  const messageLabel = lang === 'en' ? 'Message' : lang === 'de' ? 'Nachricht' : 'Messaggio';
  const submitLabel = getTranslation('common.contact_us', lang);
  
  return (
    <form className="space-y-6">
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
        <label htmlFor="message" className="block text-white font-medium mb-2">
          {messageLabel}
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          className="cyber-input w-full"
          required
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

// Contact info component
function ContactInfo({ lang }: { lang: string }) {
  const contactTitle = lang === 'en' 
    ? 'Contact Information' 
    : lang === 'de' 
      ? 'Kontaktinformationen' 
      : 'Informazioni di contatto';
  
  const emailTitle = lang === 'en' ? 'Email' : lang === 'de' ? 'E-Mail' : 'Email';
  const telegramTitle = lang === 'en' ? 'Telegram' : lang === 'de' ? 'Telegram' : 'Telegram';
  
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white">{contactTitle}</h3>
      
      <div>
        <h4 className="text-cyber-blue font-medium mb-1">{emailTitle}</h4>
        <a href="mailto:info@grait.io" className="text-white hover:text-cyber-blue transition-colors">
          info@grait.io
        </a>
      </div>
      
      <div>
        <h4 className="text-cyber-blue font-medium mb-1">{telegramTitle}</h4>
        <a href="https://t.me/graitio" className="text-white hover:text-cyber-blue transition-colors">
          @graitio
        </a>
      </div>
    </div>
  );
}

// Main contact page component
export default function ContactPage({ params }: { params: { lang: string } }) {
  const lang = supportedLanguages.includes(params.lang) ? params.lang : defaultLanguage;
  
  const pageTitle = lang === 'en' 
    ? 'Get in Touch' 
    : lang === 'de' 
      ? 'Kontaktieren Sie uns' 
      : 'Contattaci';
  
  const pageSubtitle = lang === 'en'
    ? 'Have questions about our services? We\'d love to hear from you.'
    : lang === 'de'
      ? 'Haben Sie Fragen zu unseren Dienstleistungen? Wir würden gerne von Ihnen hören.'
      : 'Hai domande sui nostri servizi? Ci piacerebbe sentirti.';
  
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
      
      {/* Contact form section */}
      <section className="py-20 bg-cyber-black">
        <div className="cyber-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <ContactForm lang={lang} />
            </div>
            <div className="lg:col-span-1">
              <ContactInfo lang={lang} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
