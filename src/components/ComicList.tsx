import React, { useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Comic } from '../types/types';
import ComicCard from './ComicCard';
import SkeletonCard from './SkeletonCard';
import Breadcrumbs from './Breadcrumbs';
import ErrorMessage from './ErrorMessage';
import { fetchComics } from '../utils/api';

interface ComicListProps {
  activeFormat: string;
}

const ComicList: React.FC<ComicListProps> = ({ activeFormat }) => {
  const observerTarget = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    refetch,
    isError,
  } = useInfiniteQuery({
    queryKey: ['comics', activeFormat],
    queryFn: ({ pageParam = 0 }) => fetchComics(activeFormat, pageParam),
    getNextPageParam: (lastPage) => {
      const offset = lastPage.offset + lastPage.limit;
      return offset < lastPage.total ? offset : undefined;
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
      { threshold: 0.1 }
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

  if (isError && error instanceof Error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div ref={topRef}></div>
        <Breadcrumbs activeFormat={activeFormat} />
        <ErrorMessage 
          error={error}
          onRetry={refetch}
          onReload={() => window.location.reload()}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div ref={topRef}></div>
      
      <Breadcrumbs activeFormat={activeFormat} />
      
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" id="comic-list" role="list">
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