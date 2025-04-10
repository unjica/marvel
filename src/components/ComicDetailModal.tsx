import React, { useEffect } from 'react';
import { Comic } from '../types/types';
import { formatPrice } from '../utils/price';
import { motion, AnimatePresence } from 'framer-motion';

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
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscKey);
    }

    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  const getReleaseDate = (dates: { type: string, date: string }[]) => {
    const releaseDate = dates.find(date => date.type === 'focDate');
    if (!releaseDate?.date) return 'Unknown';
    
    const date = new Date(releaseDate.date);
    // Check if the date is valid
    if (isNaN(date.getTime())) return 'Unknown';
    
    return date.toLocaleDateString('sl-SI');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal"
          className="fixed inset-0 z-50 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="comic-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="absolute inset-0 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="modal-content"
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 relative w-fit md:min-w-[650px]"
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            <button 
              className="absolute top-1 right-1 text-marvel-red"
              onClick={onClose}
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
      
            <div className="p-6 flex flex-col md:flex-row gap-6">
              <img 
                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} 
                alt={comic.title}
                className="w-[163px] object-contain"
                loading="lazy"
              />
              
              <div className="w-full md:w-2/3">
                <h2 id="comic-modal-title" className="font-bold mb-4">{comic.title}</h2>

                <div 
                  className="space-y-2 mb-6 text-sm" 
                  role="region" 
                  aria-label="Comic details"
                >
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
                  <p className="text-xl font-bold">{formatPrice(comic.prices)}</p>
                  <button 
                    className="btn"
                    onClick={onClose}
                    aria-label="Close modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ComicDetailModal; 