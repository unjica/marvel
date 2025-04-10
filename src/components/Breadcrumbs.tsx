import React from 'react';

interface BreadcrumbsProps {
  activeFormat: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ activeFormat }) => {
  return activeFormat !== 'All' ? (
    <div aria-label="breadcrumb" className="text-gray-600 text-lg mb-6">
      <span>Home</span> &gt; {activeFormat}s
    </div>
  ) : null;
};

export default Breadcrumbs; 