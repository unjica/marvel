import React from 'react';

interface ComicFilterProps {
  formats: string[];
  activeFormat: string;
  setActiveFormat: (format: string) => void;
}

const ComicFilter: React.FC<ComicFilterProps> = ({ formats, activeFormat, setActiveFormat }) => {
  return (
    <div className="flex space-x-2">
      <div className="flex flex-wrap gap-2">
        <button 
          className={`filter-btn ${
            activeFormat === 'All' 
              ? 'text-marvel-red' 
              : 'text-white hover:text-marvel-red'
          }`}
          onClick={() => setActiveFormat('All')}
        >
          All
        </button>
        {formats.map(format => (
          <button
            key={format}
            className={`filter-btn ${
              activeFormat === format 
                ? 'text-marvel-red' 
                : 'text-white hover:text-marvel-red'
            }`}
            onClick={() => setActiveFormat(format)}
          >
            {format}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ComicFilter; 