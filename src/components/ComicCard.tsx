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
      <div className="comic-card">
        <img 
          src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} 
          alt={comic.title} 
          className="comic-card__image"
        />
        <div className="comic-card__content">
          <h3 className="comic-card__title">{comic.title}</h3>
          <p className="comic-card__price">{formatPrice(comic.prices)}</p>
          <button className="comic-card__action" onClick={() => setShowModal(true)}>More info</button>
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