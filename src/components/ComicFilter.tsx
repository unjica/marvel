import React from 'react';

interface ComicFilterProps {
  formats: string[];
  activeFormat: string;
  setActiveFormat: (format: string) => void;
}

const ComicFilter: React.FC<ComicFilterProps> = ({ formats, activeFormat, setActiveFormat }) => {
  return (
    <div className="filter">
      <div className="filter__list">
        <button 
          className={activeFormat === 'All' ? 'filter__button--active' : 'filter__button'} 
          onClick={() => setActiveFormat('All')}
        >
          All
        </button>
        {formats.map(format => (
          <button
            key={format}
            className={activeFormat === format ? 'filter__button--active' : 'filter__button'}
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