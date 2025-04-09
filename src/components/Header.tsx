import React from 'react';
import ComicFilter from './ComicFilter';

interface HeaderProps {
  formats: string[];
  activeFormat: string;
  setActiveFormat: (format: string) => void;
}

const Header: React.FC<HeaderProps> = ({ formats, activeFormat, setActiveFormat }) => {
  return (
    <header className="app-header">
      <div className="app-header__content">
        <img 
          src="/logo2.svg" 
          alt="logo" 
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