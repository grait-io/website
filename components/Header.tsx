"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from './LanguageProvider';
import { getAlternateLanguageUrls } from '@/lib/i18n';
import { usePathname } from 'next/navigation';
import { supportedLanguages } from '@/middleware';

export default function Header() {
  const { t, lang } = useLanguage();
  const pathname = usePathname();
  const alternateUrls = getAlternateLanguageUrls(pathname || '');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <header className="bg-cyber-black/90 backdrop-blur-md border-b border-cyber-blue/30 sticky top-0 z-50">
      <div className="cyber-container py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href={`/${lang}`} className="flex items-center">
            <img
              src="/images/logo.png"
              alt="grait.io logo"
              className="h-28 w-auto"
            />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href={`/${lang}`} 
              className="text-white hover:text-cyber-blue transition-colors"
            >
              {t('nav.home')}
            </Link>
            <Link 
              href={`/${lang}/services`} 
              className="text-white hover:text-cyber-blue transition-colors"
            >
              {t('nav.services')}
            </Link>
            <Link 
              href={`/${lang}/contact`} 
              className="text-white hover:text-cyber-blue transition-colors"
            >
              {t('nav.contact')}
            </Link>
            {/* TODO: Add actual links for Results and Why Us */}
            <Link 
              href={`/${lang}/#results`} // Placeholder link
              className="text-white hover:text-cyber-blue transition-colors"
            >
              {/* Using hardcoded text until translations are added */}
              {'Results'}
            </Link>
            <Link 
              href={`/${lang}/#why-us`} // Placeholder link
              className="text-white hover:text-cyber-blue transition-colors"
            >
              {/* Using hardcoded text until translations are added */}
              {'Why Us'}
            </Link>
            
            {/* Language Switcher */}
            <div className="relative group">
              <button className="flex items-center text-white hover:text-cyber-blue">
                <span className="uppercase">{lang}</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 ml-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute right-0 mt-2 w-24 bg-cyber-black border border-cyber-blue/50 shadow-lg rounded-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                {supportedLanguages.map((l) => (
                  <Link 
                    key={l} 
                    href={alternateUrls[l]} 
                    className={`block px-4 py-2 text-sm ${l === lang ? 'text-cyber-blue' : 'text-white hover:text-cyber-blue'}`}
                  >
                    {l.toUpperCase()}
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Contact Button */}
            <Link 
              href={`/${lang}/contact`} 
              className="cyber-button text-sm"
            >
              {/* Using hardcoded text until translations are added */}
              {'Book Free AI Assessment'}
            </Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-cyber-blue/30 pt-4">
            <div className="flex flex-col space-y-4">
              <Link 
                href={`/${lang}`} 
                className="text-white hover:text-cyber-blue transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.home')}
              </Link>
              <Link 
                href={`/${lang}/services`} 
                className="text-white hover:text-cyber-blue transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.services')}
              </Link>
              <Link 
                href={`/${lang}/contact`} 
                className="text-white hover:text-cyber-blue transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.contact')}
              </Link>
              {/* TODO: Add actual links for Results and Why Us */}
              <Link 
                href={`/${lang}/#results`} // Placeholder link
                className="text-white hover:text-cyber-blue transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {/* Using hardcoded text until translations are added */}
                {'Results'}
              </Link>
              <Link 
                href={`/${lang}/#why-us`} // Placeholder link
                className="text-white hover:text-cyber-blue transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {/* Using hardcoded text until translations are added */}
                {'Why Us'}
              </Link>
              
              {/* Language Switcher */}
              <div className="flex space-x-4 pt-2 border-t border-cyber-blue/30">
                {supportedLanguages.map((l) => (
                  <Link 
                    key={l} 
                    href={alternateUrls[l]} 
                    className={`${l === lang ? 'text-cyber-blue' : 'text-white hover:text-cyber-blue'}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {l.toUpperCase()}
                  </Link>
                ))}
              </div>
              
              {/* Contact Button */}
              <Link 
                href={`/${lang}/contact`} 
                className="cyber-button text-sm text-center mt-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {/* Using hardcoded text until translations are added */}
                {'Book Free AI Assessment'}
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
