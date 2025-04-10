import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/Header';
import ComicList from './components/ComicList';
import { getStoredFilter } from './utils/storage';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => {
  const formats = ['Comic', 'Magazine', 'Digital Comic'];
  const [activeFormat, setActiveFormat] = useState<string>(getStoredFilter());

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col">
        <Header 
          formats={formats} 
          activeFormat={activeFormat} 
          setActiveFormat={setActiveFormat} 
        />
        <main className="flex-grow">
          <ComicList activeFormat={activeFormat} />
        </main>
        <footer className="bg-gray-100 py-4 text-center text-gray-600">
          <p>Data provided by Marvel. © 2025 Marvel</p>
        </footer>
      </div>
    </QueryClientProvider>
  );
};

export default App; 