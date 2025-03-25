import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { supportedLanguages } from "@/middleware";
import { getAlternateLanguageUrls } from "@/lib/i18n";
import LanguageProvider from "@/components/LanguageProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "grait.io | AI Transformation Agency",
    template: "%s | grait.io",
  },
  description: "Premium AI integration and coaching agency for business transformation",
  keywords: ["AI", "Artificial Intelligence", "Business Transformation", "AI Integration", "AI Coaching"],
  authors: [{ name: "grait.io" }],
  creator: "grait.io",
  publisher: "grait.io",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  metadataBase: new URL("https://grait.io"),
  alternates: {
    canonical: "/",
    languages: supportedLanguages.reduce((acc, lang) => {
      acc[lang] = `/${lang}`;
      return acc;
    }, {} as Record<string, string>),
  },
  openGraph: {
    title: "grait.io | AI Transformation Agency",
    description: "Premium AI integration and coaching agency for business transformation",
    url: "https://grait.io",
    siteName: "grait.io",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "grait.io | AI Transformation Agency",
    description: "Premium AI integration and coaching agency for business transformation",
    creator: "@graitio",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  // Generate alternate language URLs for SEO
  const alternateUrls = getAlternateLanguageUrls(params.lang);
  
  return (
    <html lang={params.lang || "en"}>
      <head>
        {/* Add alternate language links for SEO */}
        {Object.entries(alternateUrls).map(([lang, url]) => (
          <link 
            key={lang} 
            rel="alternate" 
            hrefLang={lang} 
            href={`https://grait.io${url}`} 
          />
        ))}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <LanguageProvider lang={params.lang || "en"}>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
