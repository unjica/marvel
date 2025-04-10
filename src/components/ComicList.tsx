import React, { useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Comic } from '../types/types';
import ComicCard from './ComicCard';
import Breadcrumbs from './Breadcrumbs';

interface ComicListProps {
  activeFormat: string;
}

const ComicList: React.FC<ComicListProps> = ({ activeFormat }) => {
  const observerTarget = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  
  const limit = 20;
  const publicKey = process.env.REACT_APP_MARVEL_PUBLIC_KEY;
  
  const fetchComics = async ({ pageParam = 0 }) => {
    let url = `https://gateway.marvel.com/v1/public/comics?apikey=${publicKey}&limit=${limit}&offset=${pageParam}`;
    
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div ref={topRef}></div>
      
      <Breadcrumbs activeFormat={activeFormat} />
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          Failed to fetch comics. Please try again later.
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {comics.map((comic: Comic) => (
          <ComicCard key={comic.id} comic={comic} />
        ))}
      </div>
      
      {(isFetching || isFetchingNextPage) && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
      )}
      
      {hasNextPage && <div ref={observerTarget} className="h-20"></div>}
    </div>
  );
};

export default ComicList; 