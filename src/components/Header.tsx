import React from 'react';
import ComicFilter from './ComicFilter';

interface HeaderProps {
  formats: string[];
  activeFormat: string;
  setActiveFormat: (format: string) => void;
}

const Header: React.FC<HeaderProps> = ({ formats, activeFormat, setActiveFormat }) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-black z-50">
      <div className="container mx-auto px-4 py-4 flex gap-4 items-center">
        <img 
          src="/logo2.svg" 
          alt="logo"
          className="h-12" 
        />
        <ComicFilter 
          formats={formats} 
          activeFormat={activeFormat} 
          setActiveFormat={setActiveFormat} 
        />
      </div>
    </header>
  );
};

export default Header; 