import React, { useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Comic } from '../types/types';
import ComicCard from './ComicCard';
import SkeletonCard from './SkeletonCard';
import Breadcrumbs from './Breadcrumbs';
import md5 from 'md5';

interface ComicListProps {
  activeFormat: string;
}

const ComicList: React.FC<ComicListProps> = ({ activeFormat }) => {
  const observerTarget = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  
  const limit = 20;
  const publicKey = process.env.REACT_APP_MARVEL_PUBLIC_KEY;
  const privateKey = process.env.REACT_APP_MARVEL_PRIVATE_KEY;
  const isProduction = process.env.REACT_APP_NODE_ENV === 'production';
  
  const fetchComics = async ({ pageParam = 0 }) => {
    let url = `https://gateway.marvel.com/v1/public/comics?apikey=${publicKey}&limit=${limit}&offset=${pageParam}`;
    
    if (isProduction) {
      if (!privateKey) {
        throw new Error('Marvel API private key is not configured');
      }
      const ts = new Date().getTime();
      const hash = md5(ts + privateKey + publicKey);
      url += `&ts=${ts}&hash=${hash}`;
    }
    
    if (activeFormat !== 'All') {
      url += `&format=${activeFormat.toLowerCase()}`;
    }
    
    const response = await axios.get(url);
    return response.data.data;
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['comics', activeFormat],
    queryFn: fetchComics,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.results.length < limit) return undefined;
      return pages.length * limit;
    },
    initialPageParam: 0,
  });

  // Set up the intersection observer for infinite scrolling
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
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
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // Scroll to top when filter changes
  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [activeFormat]);

  const comics = React.useMemo(() => {
    const uniqueComics = new Map<number, Comic>();
    data?.pages.forEach(page => {
      page.results.forEach((comic: Comic) => {
        if (!uniqueComics.has(comic.id)) {
          uniqueComics.set(comic.id, comic);
        }
      });
    });
    return Array.from(uniqueComics.values());
  }, [data]);

  const renderSkeletonCards = (count: number, prefix: string) => {
    return Array.from({ length: count }).map((_, index) => (
      <SkeletonCard key={`${prefix}-${index}`} />
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div ref={topRef}></div>
      
      <Breadcrumbs activeFormat={activeFormat} />
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          Failed to fetch comics. Please try again later.
        </div>
      )}
      
      <div 
        className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" 
        id="comic-list" 
        role="list"
      >
        {isFetching && !isFetchingNextPage ? (
          // Show skeleton cards for initial load
          renderSkeletonCards(20, 'skeleton')
        ) : (
          // Show actual comic cards
          comics.map((comic: Comic) => (
            <ComicCard key={comic.id} comic={comic} />
          ))
        )}
        
        {/* Show skeleton cards at the bottom when fetching more */}
        {isFetchingNextPage && renderSkeletonCards(20, 'skeleton-next')}
      </div>
      
      {hasNextPage && <div ref={observerTarget} className="h-20" aria-hidden="true"></div>}
    </div>
  );
};

export default ComicList; 