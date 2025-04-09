import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import Header from './components/Header';
import ComicList from './components/ComicList';

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
  const [activeFormat, setActiveFormat] = useState<string>('All');

  return (
    <QueryClientProvider client={queryClient}>
      <div className="app-layout">
        <Header 
          formats={formats} 
          activeFormat={activeFormat} 
          setActiveFormat={setActiveFormat} 
        />
        <main className="app-main">
          <ComicList activeFormat={activeFormat} />
        </main>
        <footer className="app-footer">
          <p>Data provided by Marvel. © 2025 Marvel</p>
        </footer>
      </div>
    </QueryClientProvider>
  );
};

export default App; 