import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="inline-block w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin mr-2" />
  );
};