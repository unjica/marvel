import React, { useState } from 'react';
import { Comic } from '../types/types';
import ComicDetailModal from './ComicDetailModal';
import { formatPrice } from '../utils/price';

interface ComicCardProps {
  comic: Comic;
}

const ComicCard: React.FC<ComicCardProps> = ({ comic }) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <div className="rounded-lg border-2 border-black overflow-hidden hover:shadow-xl hover:translate-y-[-5px] transition duration-200 flex flex-col gap-3 p-4">
        <img 
          src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} 
          alt={comic.title} 
          className="w-full mx-auto aspect-[2/3] object-contain"
        />
        <div className="h-full flex flex-col gap-2 items-center text-center">
          <h3 className="text-lg text-sm font-semibold line-clamp-2 mb-auto">{comic.title}</h3>
          <p className="text-lg font-medium">{formatPrice(comic.prices)}</p>
          <button 
            className="btn"
            onClick={() => setShowModal(true)}
          >
            More info
          </button>
        </div>
      </div>
      <ComicDetailModal 
        comic={comic} 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
      />
    </>
  );
};

export default ComicCard; 