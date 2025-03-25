import { NextRequest, NextResponse } from 'next/server';

// Supported languages
export const supportedLanguages = ['en', 'de', 'it'];
export const defaultLanguage = 'en';

// Function to get the preferred language from the request
function getPreferredLanguage(request: NextRequest): string {
  // Check if the URL already has a language prefix
  const pathname = request.nextUrl.pathname;
  const pathnameHasLanguage = supportedLanguages.some(
    (lang) => pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`
  );
  
  if (pathnameHasLanguage) {
    return pathname.split('/')[1];
  }
  
  // Check the accept-language header
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const preferredLanguage = acceptLanguage
      .split(',')
      .map((lang) => {
        const [language, priority = '1'] = lang.trim().split(';q=');
        return { language: language.split('-')[0], priority: parseFloat(priority) };
      })
      .sort((a, b) => b.priority - a.priority)
      .find((lang) => supportedLanguages.includes(lang.language))?.language;
    
    if (preferredLanguage) {
      return preferredLanguage;
    }
  }
  
  // Default to English
  return defaultLanguage;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Skip for assets, api routes, etc.
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }
  
  // Check if the URL already has a language prefix
  const pathnameHasLanguage = supportedLanguages.some(
    (lang) => pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`
  );
  
  if (pathnameHasLanguage) {
    return NextResponse.next();
  }
  
  // Redirect to the preferred language
  const language = getPreferredLanguage(request);
  const newUrl = new URL(
    `/${language}${pathname === '/' ? '' : pathname}`,
    request.url
  );
  
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
