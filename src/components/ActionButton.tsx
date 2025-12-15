import React from 'react';
import { motion } from 'framer-motion';
import { LoadingSpinner } from './LoadingSpinner';

interface ActionButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ 
  onClick, 
  isLoading, 
  disabled = false, 
  children, 
  className = '' 
}) => {
  return (
    <motion.button
      whileHover={!disabled && !isLoading ? { scale: 1.02, y: -2 } : {}}
      whileTap={!disabled && !isLoading ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        bg-blue-600 hover:bg-blue-700 text-white font-semibold
        px-6 py-3 rounded-xl transition-all duration-300
        shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed
        disabled:transform-none flex items-center justify-center
        ${className}
      `}
    >
      {isLoading && <LoadingSpinner />}
      {children}
    </motion.button>
  );
};