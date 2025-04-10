import React, { useState } from 'react';
import ComicFilter from './ComicFilter';

interface HeaderProps {
  formats: string[];
  activeFormat: string;
  setActiveFormat: (format: string) => void;
}

const Header: React.FC<HeaderProps> = ({ formats, activeFormat, setActiveFormat }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 bg-black z-50" role="banner">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          <img 
            src="/logo2.svg" 
            alt="Marvel Comics logo"
            className="h-12" 
          />
          
          {/* Hamburger menu button */}
          <button
            className="md:hidden text-white ml-auto"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 transition-transform duration-300" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
                className={`${isMenuOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                className={`${isMenuOpen ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
              />
            </svg>
          </button>

          {/* Desktop menu */}
          <div className="hidden md:block">
            <ComicFilter 
              formats={formats} 
              activeFormat={activeFormat} 
              setActiveFormat={setActiveFormat}
            />
          </div>
        </div>

        {/* Mobile menu */}
        <div 
          id="mobile-menu"
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen 
              ? 'max-h-96 opacity-100 mt-4' 
              : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <ComicFilter 
            formats={formats} 
            activeFormat={activeFormat} 
            setActiveFormat={setActiveFormat} 
          />
        </div>
      </div>
    </header>
  );
};

export default Header; 