import React from 'react';
import { Comic } from '../types/types';
import { formatPrice } from '../utils/price';

interface ComicDetailModalProps {
  comic: Comic;
  isOpen: boolean;
  onClose: () => void;
}

interface Character {
  name: string;
}

interface Creator {
  name: string;
  role: string;
}

const ComicDetailModal: React.FC<ComicDetailModalProps> = ({ comic, isOpen, onClose }) => {
  if (!isOpen) return null;

  const getReleaseDate = (dates: { type: string, date: string }[]) => {
    const releaseDate = dates.find(date => date.type === 'focDate');
    if (!releaseDate?.date) return 'Unknown';
    
    const date = new Date(releaseDate.date);
    // Check if the date is valid
    if (isNaN(date.getTime())) return 'Unknown';
    
    return date.toLocaleDateString('sl-SI');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 relative">
        <button 
          className="absolute top-1 right-1 text-marvel-red"
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="p-6 flex flex-col md:flex-row gap-6">
          <img 
            src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} 
            alt={comic.title}
            className="w-[163px] object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://via.placeholder.com/150x225?text=No+Image';
            }}
          />
          
          <div className="w-full md:w-2/3">
            <h2 className="text-lg font-bold mb-4">{comic.title}</h2>

            <div className="space-y-2 mb-6">
              <p className="truncate text-ellipsis"><b>Year of release:</b> {getReleaseDate(comic.dates)}</p>
              <p className="truncate text-ellipsis"><b>Format:</b> {comic.format || 'Unknown'}</p>
              <p className="truncate text-ellipsis"><b>Pages:</b> {comic.pageCount || 'Unknown'}</p>
              {comic.characters && comic.characters.items && comic.characters.items.length > 0 && (
                <p className="truncate text-ellipsis">
                  <b>Characters:</b> {comic.characters.items.map((char: Character) => char.name).join(', ')}
                </p>
              )}
              {comic.creators && comic.creators.items && comic.creators.items.length > 0 && (
                <p className="truncate text-ellipsis">
                  <b>Creators:</b> {comic.creators.items.map((creator: Creator) => `${creator.name} (${creator.role})`).join(', ')}
                </p>
              )}
              {comic.diamondCode && (
                <p className="truncate text-ellipsis"><b>Diamond Code:</b> {comic.diamondCode}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <p className="text-lg font-bold">{formatPrice(comic.prices)}</p>
              <button 
                className="btn"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComicDetailModal; 