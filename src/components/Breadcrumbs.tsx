import React from 'react';

interface BreadcrumbsProps {
  activeFormat: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ activeFormat }) => {
  return activeFormat !== 'All' ? (
    <div className="breadcrumbs">
      <span>Home</span> &gt; {activeFormat}s
    </div>
  ) : null;
};

export default Breadcrumbs; 