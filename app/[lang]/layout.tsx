import { Metadata } from 'next';
import { supportedLanguages, defaultLanguage } from '@/middleware';

// Generate static params for all supported languages
export function generateStaticParams() {
  return supportedLanguages.map((lang) => ({ lang }));
}

// Generate metadata for each language
export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang || defaultLanguage;
  
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
    openGraph: {
      title,
      description,
      locale: lang === 'en' ? 'en_US' : lang === 'de' ? 'de_DE' : 'it_IT',
    },
    twitter: {
      title,
      description,
    },
  };
}

export default function LangLayout({
  children,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return children;
}
