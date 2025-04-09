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
    return releaseDate ? new Date(releaseDate.date).toLocaleDateString() : 'Unknown';
  };

  return (
    <div className="modal">
      <div className="modal__content">
        <button className="modal__close" onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-full h-full">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="modal__body">
          <div className="modal__thumbnail">
            <img 
              src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} 
              alt={comic.title}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://via.placeholder.com/150x225?text=No+Image';
              }}
            />
          </div>
          <div className="modal__details">
            <h2>{comic.title}</h2>

            <div className="modal__details-container">
              <p><b>Year of release:</b> {getReleaseDate(comic.dates)}</p>
              <p><b>Format:</b> {comic.format || 'Unknown'}</p>
              <p><b>Pages:</b> {comic.pageCount || 'Unknown'}</p>
              {comic.characters && comic.characters.items && comic.characters.items.length > 0 && (
                <p>
                  <b>Characters:</b> {comic.characters.items.map((char: Character) => char.name).join(', ')}
                </p>
              )}
              {comic.creators && comic.creators.items && comic.creators.items.length > 0 && (
                <p>
                  <b>Creators:</b> {comic.creators.items.map((creator: Creator) => `${creator.name} (${creator.role})`).join(', ')}
                </p>
              )}
              {comic.diamondCode && (
                <p><b>Diamond Code:</b> {comic.diamondCode}</p>
              )}
            </div>

            <div className="modal__price-container">
              <p className="modal__price">{formatPrice(comic.prices)}</p>
              <button className="comic-card__action" onClick={onClose}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComicDetailModal; 