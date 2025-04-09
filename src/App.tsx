import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import ComicList from './components/ComicList';

const App: React.FC = () => {
  const formats = ['Comic', 'Magazine', 'Digital Comic'];
  const [activeFormat, setActiveFormat] = useState<string>('All');

  return (
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
  );
};

export default App; 