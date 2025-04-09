import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { Comic } from '../types/types';
import ComicCard from './ComicCard';
import Breadcrumbs from './Breadcrumbs';

interface ComicListProps {
  activeFormat: string;
}

const ComicList: React.FC<ComicListProps> = ({ activeFormat }) => {
  const [comics, setComics] = useState<Comic[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  
  // Create a ref for the observer target element
  const observerTarget = useRef<HTMLDivElement>(null);
  // Create a ref for the top of the list
  const topRef = useRef<HTMLDivElement>(null);
  
  const limit = 20;
  const publicKey = process.env.REACT_APP_MARVEL_PUBLIC_KEY;
  
  const fetchComics = useCallback(async (newOffset: number = 0) => {
    setLoading(true);
    try {
      let url = `https://gateway.marvel.com/v1/public/comics?apikey=${publicKey}&limit=${limit}&offset=${newOffset}`;
      
      if (activeFormat !== 'All') {
        url += `&format=${activeFormat.toLowerCase()}`;
      }
      
      const response = await axios.get(url);
      const newComics = response.data.data.results;
      
      if (newOffset === 0) {
        setComics(newComics);
      } else {
        setComics(prevComics => {
          const existingComicsMap = new Map(prevComics.map(comic => [comic.id, comic]));
          
          const uniqueNewComics = newComics.filter((comic: Comic) => !existingComicsMap.has(comic.id));
          
          return [...prevComics, ...uniqueNewComics];
        });
      }
      
      setHasMore(newComics.length === limit);
      setError(null); // Clear any previous errors on successful fetch
    } catch (err) {
      setError('Failed to fetch comics. Please try again later.');
      setHasMore(false); // Stop fetching more pages on error
      console.error('Error fetching comics:', err);
    } finally {
      setLoading(false);
    }
  }, [activeFormat, publicKey, limit]);
  
  const loadMore = useCallback(() => {
    if (!loading && hasMore && !error) { // Don't load more if there's an error
      const newOffset = offset + limit;
      setOffset(newOffset);
      fetchComics(newOffset);
    }
  }, [loading, hasMore, offset, limit, fetchComics, error]);
  
  // Set up the intersection observer for infinite scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loading && !error) { // Don't load more if there's an error
          loadMore();
        }
      },
      { threshold: 1.0 }
    );
    
    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }
    
    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [loadMore, hasMore, loading, error]);
  
  // Reset when filter changes and scroll to top
  useEffect(() => {
    // Reset pagination
    setOffset(0);
    // Clear existing comics first
    setComics([]);
    // Set loading state to show loading indicator
    setLoading(true);
    // Clear any previous errors
    setError(null);
    // Reset hasMore
    setHasMore(true);
    // Fetch new comics with the new filter
    fetchComics(0);
    
    // Scroll back to top when filter changes
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [activeFormat, fetchComics]);
  
  return (
    <div className="comic-list">
      {/* Reference to the top of the list */}
      <div ref={topRef} className="top-ref"></div>
      
      <Breadcrumbs activeFormat={activeFormat} />
      
      {error && <div className="error">{error}</div>}
      
      <div className="comic-list__grid">
        {comics.map((comic, index) => (
          <ComicCard key={`${comic.id}-${index}`} comic={comic} />
        ))}
      </div>
      
      {loading && (
        <div className="loading">
          <span className="loader"></span>
        </div>
      )}
      
      {/* Intersection observer target element */}
      {hasMore && <div ref={observerTarget} className="observer"></div>}
    </div>
  );
};

export default ComicList; 