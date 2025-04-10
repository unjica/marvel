import React from 'react';
import { setStoredFilter } from '../utils/storage';

interface ComicFilterProps {
  formats: string[];
  activeFormat: string;
  setActiveFormat: (format: string) => void;
}

const ComicFilter: React.FC<ComicFilterProps> = ({ formats, activeFormat, setActiveFormat }) => {
  const handleFormatChange = (format: string) => {
    setActiveFormat(format);
    setStoredFilter(format);
  };

  return (
    <div 
      className="flex flex-col md:flex-row md:space-x-2" 
      role="navigation" 
      aria-label="Comic format filter"
    >
      <div className="flex flex-col md:flex-row gap-2" role="tablist">
        <button 
          className={`filter-btn transition-colors duration-200 ${
            activeFormat === 'All' 
              ? 'text-marvel-red' 
              : 'text-white hover:text-marvel-red'
          }`}
          onClick={() => handleFormatChange('All')}
          role="tab"
          aria-selected={activeFormat === 'All'}
          aria-controls="comic-list"
        >
          All
        </button>
        {formats.map(format => (
          <button
            key={format}
            className={`filter-btn transition-colors duration-200 ${
              activeFormat === format 
                ? 'text-marvel-red' 
                : 'text-white hover:text-marvel-red'
            }`}
            onClick={() => handleFormatChange(format)}
            role="tab"
            aria-selected={activeFormat === format}
            aria-controls="comic-list"
          >
            {format}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ComicFilter; 